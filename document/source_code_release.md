# 阿里云ECS Ubuntu 18.04 代码发布

### Git代码发布

    sudo apt-get install git
    git --version
    
    设置Git
    
    git config --global user.name "zhouhuajian"
    邮件可随便填
    git config --global user.email "test@zhouhuajian.website"
    
    cd / 
    mkdir www
    cd www
    git clone git@github.com:zhouhuajian-website/zhouhuajian-website.git zhouhuajian.website
    
    设置github访问权限
    
    邮件可随便填
    ssh-keygen -t rsa -C "test@test.com"
    cd ~/.ssh
    cat id_rsa.pub
    复制到github设置的ssh 名称可随便填
    
    git clone git@github.com:zhouhuajian-website/zhouhuajian-website.git zhouhuajian.website
    


    
    
