# APISIX-ADMIN发布系统前端

本项目完成APISIX-ADMIN发布系统前端部分

## 安装依赖

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```


项目部署
docker run -d --name apisix-dashboard-self-nginx -p 9999:80 nginx
docker cp default.conf apisix-dashboard-self-nginx:/etc/nginx/conf.d
docker cp apisix-admin-web apisix-dashboard-self-nginx:/opt