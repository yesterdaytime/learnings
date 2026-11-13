# Shell Command

<details>
  <summary>SSH</summary>
  ## Enter another computer
    
    ssh [user]@[host]

</details>

# K8s Command

我们不用记所有的命令对应的参数，只需知道存在什么命令，还有命令的作用即可

<details>
    <summary>All Command Command</summary>
    
    Basic Commands (Beginner):
      create          用file或stdin创建resource，resource存在，报错                 kubectl create -f | kubectl create -f - <<EOF EOF
      expose          创建一个service，port和target-port与service对应               kubectl expose deploy|pod|service|rc|rs --port=80 --target-port=8080
      run             创建一个pod，运行一个image                                    kubectl run nginx --image=nginx ...
      set             更改resource中的特定属性，也可以list env                       kubectl set env|image|resources|selector|serviceaccount|subject resources

    Basic Commands (Intermediate):
      explain         获取resource的描述和解释                                      kubectl explain pods
      get             获取resource list,  可以输出详情-o                            kubectl get [resources]
      edit            修改resource，会打开一个vim，然后可以编辑                       kubectl edit [resources] [resource name]
      delete          delete resource                                            kubectl delete [resources] [resource name]

    Deploy Commands:
      rollout         版本还原，可以用history和undo做，也可以用status                 kubectl rollout undo|status|history|puase|resume
      scale           调度pod资源，对象为管理pod的resource                           kubectl scale --current-replicas=2 --replicas=3 [resources]
      autoscale       根据资源自动调度，max必须                                      kubectl autoscale rc foo --max=5 --cpu-percent=80

    Cluster Management Commands:
      certificate     接受或拒绝一个证书                                            kubectl certificate approve|deny
      cluster-info    获取cluster info,cluster info 不能通过get获取
      top             获取pod或node的CPU/memory使用情况
      cordon          设置node节点不可用，已经部署的资源不受影响                        kubectl cordon [node name]
      uncordon        设置节点可用                                                 kubectl uncordon [node name]
      drain           驱逐节点上的资源                                              kubectl drain [node name]
      taint           Update the taints on one or more nodes

    Troubleshooting and Debugging Commands:
      describe        显示资源详情，可以看event定位问题                               kubectl describe [resources]
      logs            显示pod日志                                                  kubectl logs [pod name]
      attach          进入到pod container的主进程中
      exec            提交命令到container，可以通过-t保留打开的container              kubectl exec
      port-forward    映射local port和pod 或service的port相连，可以测试service,pod   kubectl port-forward
      proxy
      cp              Copy files and directories to and from containers
      auth            Inspect authorization
      debug           Create debugging sessions for troubleshooting workloads and nodes
      events          List events                                                kubectl events -oyaml

    Advanced Commands:
      diff            Diff the live version against a would-be applied version
      apply           根据文件或者目录，创建或更新资源
      patch           修改资源的某个属性
      replace         replace存在的资源
      wait            wait资源创建成功或其他条件
      kustomize       Build a kustomization target from a directory or URL

    Settings Commands:
      label           更新各个资源的label
      annotate        更新annotations
      completion      Output shell completion code for the specified shell (bash, zsh, fish, or powershell)

    Subcommands provided by plugins:

    Other Commands:
      api-resources   list all resoures
      api-versions    list version
      config          Modify kubeconfig files
      plugin          Provides utilities for interacting with plugins
      version         Print the client and server version information

</details>

<details>
    <summary>Helm</summary>

</details>

资源库的创建和k8s init暂时可以不用考虑。Docker hub 满足大部分需求，k8s init 在不同的环境中init 命令是不同的

# 所有资源

| NAME                              | SHORTNAMES | APIVERSION                      | NAMESPACED | KIND                             |
| --------------------------------- | ---------- | ------------------------------- | ---------- | -------------------------------- |
| bindings                          |            | v1                              | true       | Binding                          |
| componentstatuses                 | cs         | v1                              | false      | ComponentStatus                  |
| configmaps                        | cm         | v1                              | true       | ConfigMap                        |
| endpoints                         | ep         | v1                              | true       | Endpoints                        |
| events                            | ev         | v1                              | true       | Event                            |
| limitranges                       | limits     | v1                              | true       | LimitRange                       |
| namespaces                        | ns         | v1                              | false      | Namespace                        |
| nodes                             | no         | v1                              | false      | Node                             |
| persistentvolumeclaims            | pvc        | v1                              | true       | PersistentVolumeClaim            |
| persistentvolumes                 | pv         | v1                              | false      | PersistentVolume                 |
| pods                              | po         | v1                              | true       | Pod                              |
| podtemplates                      |            | v1                              | true       | PodTemplate                      |
| replicationcontrollers            | rc         | v1                              | true       | ReplicationController            |
| resourcequotas                    | quota      | v1                              | true       | ResourceQuota                    |
| secrets                           |            | v1                              | true       | Secret                           |
| serviceaccounts                   | sa         | v1                              | true       | ServiceAccount                   |
| services                          | svc        | v1                              | true       | Service                          |
| mutatingwebhookconfigurations     |            | admissionregistration.k8s.io/v1 | false      | MutatingWebhookConfiguration     |
| validatingadmissionpolicies       |            | admissionregistration.k8s.io/v1 | false      | ValidatingAdmissionPolicy        |
| validatingadmissionpolicybindings |            | admissionregistration.k8s.io/v1 | false      | ValidatingAdmissionPolicyBinding |
| validatingwebhookconfigurations   |            | admissionregistration.k8s.io/v1 | false      | ValidatingWebhookConfiguration   |
| customresourcedefinitions         | crd,crds   | apiextensions.k8s.io/v1         | false      | CustomResourceDefinition         |
| apiservices                       |            | apiregistration.k8s.io/v1       | false      | APIService                       |
| controllerrevisions               |            | apps/v1                         | true       | ControllerRevision               |
| daemonsets                        | ds         | apps/v1                         | true       | DaemonSet                        |
| deployments                       | deploy     | apps/v1                         | true       | Deployment                       |
| replicasets                       | rs         | apps/v1                         | true       | ReplicaSet                       |
| statefulsets                      | sts        | apps/v1                         | true       | StatefulSet                      |
| selfsubjectreviews                |            | authentication.k8s.io/v1        | false      | SelfSubjectReview                |
| tokenreviews                      |            | authentication.k8s.io/v1        | false      | TokenReview                      |
| localsubjectaccessreviews         |            | authorization.k8s.io/v1         | true       | LocalSubjectAccessReview         |
| selfsubjectaccessreviews          |            | authorization.k8s.io/v1         | false      | SelfSubjectAccessReview          |
| selfsubjectrulesreviews           |            | authorization.k8s.io/v1         | false      | SelfSubjectRulesReview           |
| subjectaccessreviews              |            | authorization.k8s.io/v1         | false      | SubjectAccessReview              |
| horizontalpodautoscalers          | hpa        | autoscaling/v2                  | true       | HorizontalPodAutoscaler          |
| cronjobs                          | cj         | batch/v1                        | true       | CronJob                          |
| jobs                              |            | batch/v1                        | true       | Job                              |
| certificatesigningrequests        | csr        | certificates.k8s.io/v1          | false      | CertificateSigningRequest        |
| leases                            |            | coordination.k8s.io/v1          | true       | Lease                            |
| endpointslices                    |            | discovery.k8s.io/v1             | true       | EndpointSlice                    |
| events                            | ev         | events.k8s.io/v1                | true       | Event                            |
| flowschemas                       |            | flowcontrol.apiserver.k8s.io/v1 | false      | FlowSchema                       |
| prioritylevelconfigurations       |            | flowcontrol.apiserver.k8s.io/v1 | false      | PriorityLevelConfiguration       |
| ingressclasses                    |            | networking.k8s.io/v1            | false      | IngressClass                     |
| ingresses                         | ing        | networking.k8s.io/v1            | true       | Ingress                          |
| ipaddresses                       | ip         | networking.k8s.io/v1            | false      | IPAddress                        |
| networkpolicies                   | netpol     | networking.k8s.io/v1            | true       | NetworkPolicy                    |
| servicecidrs                      |            | networking.k8s.io/v1            | false      | ServiceCIDR                      |
| runtimeclasses                    |            | node.k8s.io/v1                  | false      | RuntimeClass                     |
| poddisruptionbudgets              | pdb        | policy/v1                       | true       | PodDisruptionBudget              |
| clusterrolebindings               |            | rbac.authorization.k8s.io/v1    | false      | ClusterRoleBinding               |
| clusterroles                      |            | rbac.authorization.k8s.io/v1    | false      | ClusterRole                      |
| rolebindings                      |            | rbac.authorization.k8s.io/v1    | true       | RoleBinding                      |
| roles                             |            | rbac.authorization.k8s.io/v1    | true       | Role                             |
| deviceclasses                     |            | resource.k8s.io/v1              | false      | DeviceClass                      |
| resourceclaims                    |            | resource.k8s.io/v1              | true       | ResourceClaim                    |
| resourceclaimtemplates            |            | resource.k8s.io/v1              | true       | ResourceClaimTemplate            |
| resourceslices                    |            | resource.k8s.io/v1              | false      | ResourceSlice                    |
| priorityclasses                   | pc         | scheduling.k8s.io/v1            | false      | PriorityClass                    |
| csidrivers                        |            | storage.k8s.io/v1               | false      | CSIDriver                        |
| csinodes                          |            | storage.k8s.io/v1               | false      | CSINode                          |
| csistoragecapacities              |            | storage.k8s.io/v1               | true       | CSIStorageCapacity               |
| storageclasses                    | sc         | storage.k8s.io/v1               | false      | StorageClass                     |
| volumeattachments                 |            | storage.k8s.io/v1               | false      | VolumeAttachment                 |
| volumeattributesclasses           | vac        | storage.k8s.io/v1               | false      | VolumeAttributesClass            |
