
# Generate the key file, if not do this step, &2 will show error
openssl genpkey -out mpw.key -algorithm Ed25519

#  Generate certificates for the user. The common name is mpw, the org is edit
openssl req -new -key mpw.key -out mpw.csr -subj "/CN=mpw,/O=edit"

# Create a CertificateSigningRequest(csr)
# <<EOF vs <<\EOF
# <<EOF can run shell in inside
# <<EOF can't run shel in inside
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: mpw
spec:
  request: $(cat mpw.csr | base64)
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400  # one day
  usages:
  - client auth
EOF

kubectl certificate approve mpw

# generate crt use the csr's certificate
kubectl get csr/mpw -o jsonpath="{.status.certificate}" | base64 -d > mpw.crt

# copy the k8s config and change config in the mpw-kube-config
cp ~/.kube/config mpw-kube-config

# add user to mpw-kube-config
kubectl --kubeconfig mpw-kube-config config set-credentials mpw --client-key mpw.key --client-certificate mpw.csr --embed-certs=true

#  Create new context, if the cluster name is same as the exist cluster, the cluster will be modify.
kubectl --kubeconfig mpw-kube-config config set-context mpw --cluster kind-kind --user mpw

# This will replace the config temporary, after you restart, this value will missing
export KUBECONFIG="$(pwd)/mpw-kube-config"

# Switch to new context you create or modified
kubectl config use-context mpw

kubectl create namespace auth-testing

#Add RBAC(Role-Based Access Control)
# Add a pod-manage role, resource is pods, operation is create, list, get, namespace is auth-testing
# kubectl create role pod-manager --verb=create,list,get --resource=pod --namespace=auth-testing
kubectl create clusterrole pod-manager --verb=create,list,get --resource=pod

# Add culsterrolebinding and binding it to role: pod-manager and user is mpw
# kubectl create rolebinding mpw-pod-manager --role=pod-manager --user=mpw --namespace=auth-testing
kubectl create clusterrolebinding mpw-pod-manager --clusterrole=pod-manager --user=mpw

# Test user auth
kubectl auth can-i create deployments --namespace=auth-testing --as=mpw

kubectl auth can-i create secrets --namespace=auth-testing --as=mpw

kubectl auth can-i get pods --namespace=auth-testing --as=mpw

