# JD Site Demo

## hosts 

C:\Windows\System32\drivers\etc\hosts 
```
127.0.0.1 www.airchinacc.com
```

## build

```
docker build -t primary-site-demo:v1 .
```


## run 

```
 docker  run -d --name primary-site-demo1 -p 3000:3000 primary-site-demo:v1
```