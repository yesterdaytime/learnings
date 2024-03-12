# Helm command

    helm repo add [name] [link]: add repo

    helm search [command] [name]: search repo
    	command:
    		hub:  search for charts in the [Artifact Hub](https://artifacthub.io/) or your own hub instance

    helm create name [flags]: create a chart finder, you can edit it base on your project.

    helm install [NAME] [CHART] [flags]: install chart, chart doesn't exist
    helm upgrade [RELEASE] [CHART] [flags]: Upgrade release to a new version of a chart, chart should be exist.
