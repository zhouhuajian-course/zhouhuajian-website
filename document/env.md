# 阿里云ECS Ubuntu 18.04 环境搭建

### apt

    Advanced Packaging Tool
    https://help.ubuntu.com/18.04/serverguide/apt.html

### 更新软件索引

    apt update
    
### 安装配置nginx

    安装nginx

    apt install nginx
    
    测试是否安装成功
    
    nginx -v
    netstat -anpt | grep 80
    ps -AHf | grep nginx 
    http://39.99.150.120/
    
    配置阿里云防火墙
    
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
    
    cd / 
    mdir www 
    cd www 
    mkdir zhouhuajian.website
    
    http://zhouhuajian.website/

### 安装配置php-fpm

    apt install php-fpm
    
    测试
    
    netstat -anpt | grep 9000
    ps -AHf | grep php
    # php-fpm -b 127.0.0.1:9000
    
    FastCGI 9000
    /etc/php/7.2/fpm/pool.d/www.conf
    注释listen = /run/php/php7.2-fpm.sock
    添加listen = 127.0.0.1:9000
    
    重启php-fpm
    service php7.2-fpm restart
    
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
    /etc/mysql/mysql.conf.d/mysqld.cnf
    bind-address = 127.0.0.1
    改为bind-address = 0.0.0.0
    service mysql restart
    mysqld_safe 
    
    云服务器防火墙开启3306端口
   
    使用navicat测试
    
### 服务管理工具sysv-rc-conf

    增加sysv-rc-conf安装源
    deb http://archive.ubuntu.com/ubuntu/ trusty main universe restricted multiverse
    
    apt update
    apt install sysv-rc-conf
    
### 进程管理工具htop

    apt install htop
    
### 安装进程控制工具Supervisor

    apt install supervisor
    
    退出nginx php-fpm mysql 
    service nginx stop
    service php7.2-fpm stop
    service mysql stop
    
    测试前台运行
    /usr/sbin/nginx -g "daemon off;"
    /usr/sbin/php-fpm7.2 --nodaemonize
    /usr/sbin/mysqld
    # /usr/bin/mysqld_safe
    mkdir /var/run/mysqld
    chown mysql:mysql /var/run/mysqld
    
    
    配置supervisor
    /etc/supervisor/conf.d/programs.conf
    使用编辑器Shift+Tab消除空格
    
    [program:nginx]
    command=/usr/sbin/nginx -g "daemon off;"
    process_name=%(program_name)s
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=10
    startretries=3
    stdout_logfile=/var/log/supervisor/supervisor_nginx.log
    redirect_stderr=true
    [program:php-fpm7.2]
    command=/usr/sbin/php-fpm7.2 --nodaemonize
    process_name=%(program_name)s
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=10
    startretries=3
    stdout_logfile=/var/log/supervisor/supervisor_php-fpm7.2.log
    redirect_stderr=true
    [program:mysqld]
    command=/usr/sbin/mysqld
    process_name=%(program_name)s
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=10
    startretries=3
    stdout_logfile=/var/log/supervisor/supervisor_mysqld.log
    redirect_stderr=true
    
    service supervisor restart
    pstree检查
    sysv-rc-conf关闭nginx mysql php-fpm的开机自启动
    
    
