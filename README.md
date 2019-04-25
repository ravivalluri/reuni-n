# Reunión

### [Live in Kubernetes]
##### [Step by Step how to deploy on Google Cloud GKE](GCLOUD.md)
## Frontend (Angular 7)
### Build Process Docker
```docker build .```
### Build Process NG
#### Run 
```npm install && ng serve```
#### Build 
```npm install && ng build --prod```

## Backend (Nodejs)
### Build Process Docker
```docker build ./backend/```
### Build Process
#### Run 
```npm install && node index.js```

## Frontend + Backend + Mongodb
### Build Process
```docker-compose up --build```
