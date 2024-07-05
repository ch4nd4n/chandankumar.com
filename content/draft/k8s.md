---
title: Running Nginx on Kubernetes
author: Chandan Kumar
date: 2023-03-08
tags: [kubernetes, nginx]
---

A Puny article about running nginx on Kubernetes.

We will start by creating a Kubernetes cluster, then we will create a Nginx deployment,
and finally we will expose the Nginx deployment to the outside world.
you can use the minikube tool. Minikube is a lightweight Kubernetes cluster that can be run on your local machine.

```bash
kubectl get nodes
kubectl config view
kubectl get po -A # Gets you everything
kubectl -n kube-system get po
kubectl create deployment deleteme --image=nginx
kubectrl get deployments
kubectl get pods
kubectl delete deployment deleteme
```

Running nginx using kubectl. Like previous example we will create nginx deployment

```sh
kubectl create deployment nginx --image=nginx
```

Above step will create a deployment named "nginx" with a single replica, using the official nginx image from Docker Hub.

```sh
kubectl get deployments # This shows the current deployments
kubectl describe deployment nginx
```

Will use expose to create service to expose deployment to the outside world, allowing clients to access the nginx containers through a stable, load-balanced endpoint.

```sh
kubectl expose deployment nginx --port=80 --type=LoadBalancer
```

```sh
kubectl get services
```

Refs:

[1](https://minikube.sigs.k8s.io/docs/start/)
