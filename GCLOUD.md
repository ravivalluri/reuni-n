# Login on Gcloud
```
gcloud auth login
```
# Set Project and (Zone/Region)
```
gcloud config set project reunion
```
* If you are working with zonal clusters, set your default compute zone:
```
gcloud config set compute/zone europe-west1-b
```
* If you are working with regional clusters, set your default compute region:
```
gcloud config set compute/region europe-west1
```
# Create Cluster
###### It will cost you about 10€ per month (it is a suggestion only few free to change)
```
gcloud container clusters create reunion-cluster-001 --zone europe-west1-b --num-nodes 2 --machine-type g1-small --preemptible
```

# Create the Configmaps

##### Check the "charts" fouders for samples

```
cp charts/configmap.yaml.sample charts/configmap.yaml
cp backend/charts/configmap.yaml.sample backend/charts/configmap.yaml
cp ngrok/charts/configmap.yaml.sample ngrok/charts/configmap.yaml
```

# Install Skaffold
* [How to install](https://skaffold.dev/docs/getting-started/)
# install Docker
* [How to install](https://docs.docker.com/install/)
# Config Docker to connect with your Container Registry
```
gcloud auth configure-docker
```
# Run Skaffold
```
skaffold deploy
```
# Workload list
* reunion-frontend
* reunion-backend
* ngrok-wernight
# MongoDB Atlas
[click here to create your own free tier mongodb cluster](https://cloud.mongodb.com)