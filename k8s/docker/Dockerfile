FROM nginx:least

# RUN groupadd -r mygroup && useradd -r -g mygroup myuser
# USER myuser:mygroup

COPY ./dist/ /usr/share/nginx/html/
COPY ./deployment/nginx.conf /etc/etc/nginx/conf.d

RUN groupadd -r nginx && useradd -r -g nginx nginx
USER nginx:nginx


# 暴露 Nginx 默认端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
