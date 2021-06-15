FROM centos:7
RUN yum install -y epel-release && \
  yum install -y nginx

COPY default.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
##RUN rm /etc/nginx/nginx.conf.default

CMD /usr/sbin/nginx -g 'daemon off;'