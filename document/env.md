# 环境搭建

### 更新apt

    apt-get update

### 安装配置nginx

    安装nginx

    apt-get install nginx
    
    测试是否安装成功
    
    nginx -v
    netstat -anpt | grep 80
    ps -AHf | grep nginx 
    
    配置nginx
    
    /etc/nginx/sites-enabled/zhouhuajian.website.conf
    
    server {
        listen 80;
        server_name zhouhuajian.website;
        root /www/zhouhuajian.website;

        location / {
            expires 1m;
            index index.html index.php;
        }

        location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
    }
    
    nginx -t 
    nginx -s reload

### 安装配置php php-fpm

    apt-get install php7.2
    apt-get install php7.2-fpm
    
    测试
    
    service php-fpm restart
    netstat -anpt | grep 9000
    ps -AHf | grep php
    php-fpm -b 127.0.0.1:9000
    
### 安装配置mysql 

    apt install mysql-server mysql-client
    
    测试
    
    netstat -anpt | grep 3306
    ps -AHf | grep mysql
    
    配置远程登录
    
    mysql --user root
    USE `mysql`;
    
    增加远程登录用户
    GRANT ALL PRIVILEGES ON *.* TO 'work'@'%' IDENTIFIED BY 'Work123!@#' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    SELECT `host`,`user` FROM `user`;
    
    修改配置支持远程登录
    修改/etc/mysql/my.conf
    bind-address = 127.0.0.1
    改为bind-address = 0.0.0.0
    service mysql restart
    mysqld_safe 
    
    云服务器防火墙开启3306端口
    
    使用navicat测试
    
### 安装进程控制工具Supervisor

    apt-get install supervisor
    
    退出nginx php-fpm mysql 
    service nginx stop
    service php-fpm stop
    service mysql stop
    
    配置supervisor
    [program:nginx]
    command=nginx -g "daemon off;"
    process_name=%(program_name)s
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=10
    startretries=3
    stdout_logfile=/tmp/supervisor_nginx.log
    redirect_stderr=true

    [program:php-cgi]
    command=php-cgi -b 127.0.0.1:9000
    process_name=%(program_name)s
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=10
    startretries=3
    stdout_logfile=/tmp/supervisor_php-cgi.log
    redirect_stderr=true	

    [program:mysqld]
    command=mysqld
    process_name=%(program_name)s
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=10
    startretries=3
    stdout_logfile=/tmp/supervisor_mysqld.log
    redirect_stderr=true	
    
    service supervisor restart
    
### 安装服务管理工具

    增加sysv-rc-conf安装源
    deb http://archive.ubuntu.com/ubuntu/ trusty main universe restricted multiverse
    
    apt-get update
    apt-get install sysv-rc-conf
    
    管理服务 关闭nginx mysql等的开机自启动
    
    
