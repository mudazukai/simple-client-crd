# SimpleJob

## Setup
```bash
kind create cluster --name=simple-job-fn --config=config/kind.yaml --image=kindest/node:v1.15.7
kubectl apply -f config/crd/batch.hideto0710.github.com_simplejobs.yaml
npm run kpt:type-create
```

## Run
```bash
mkdir -p dist/config
kpt fn source config/samples |
kpt fn run --image hideto0710/expand-simplejob-cr:dev |
kpt fn sink dist/config
```
