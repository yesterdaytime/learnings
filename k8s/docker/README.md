# Install Docker

## Use Colima
Docker desktop need pay some money, so we can use the [colima](https://github.com/abiosoft/colima)

### Mac Install

1. /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. brew install docker
4. brew install docker-compose
5. brew install colima
6. colima start
7. colima status 
8. colima stop (if you are done using docker) 

Errors: 
    failed to download "...ubuntu-23.10-minimal-cloudimg-arm64.qcow2": Get "...": dial tcp 20.205.243.166:443: i/o timeout
        kill sshd process and restart the colima
    
    Waiting for the essential requirement 1 of 5: ssh
        colima start --arch x86_64

### Other install

1. please check the github repo of the [colima](https://github.com/abiosoft/colima)

## Other way
    linux

        cd /etc/yum.repos.d/
        wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
        yum install -y docker-ce
        systemctl enable --now docker


# Docker command

    docker search   # search image from local
    docker pull     # pull image from docker hub 
    docker push     # push image from docker hub 
    docker images   # list docker images 
    docker rmi      # remove the image
    docker run      # run the image, -P will assign the port automation, -p will set the port use user set.
    docker build      # Create image.

    docker ps –a -l # list the container
    docker stop     # stop the container
    docker rm       # remove the container
    docker start    # start a container
    docker attach | exec 
    # attach: when the docker starts, it will create a new process in your computer, attach will use this process and into the container. This will affect the docker.
    # exec: it will create a new process in your computer, and operate the container, if this process is killed, don't affect the container process. 

    docker save     # save the image as a tar file in the local
    docker load     # load image from the tar file. 
    docker tag      # add a tag to the image

# Docker file command

Dockerfile every command is one layout, if see the same layout in the other image, the docker pull won't pull it again. If you install some management tool, like yum, clearing the cache will decrease the image size.

    FROM      #  base image, if you want to do some system image, can't use this.

    RUN       # run some commands in this command, like cp, mv, sed, clear cache
    
    VOLUME    # config the storage

    CMD       # some start command

    EXPOSE    # expose the port that which user can visit from the outside. 

# Docker service
This command want to do some thing like k8s, you can use this command config the docker service, it support the replicas(like 5), it will create 1 image and 5 containers.

If you want to run this command, you must confirm you are use docker swarm generate the node, run `docker swarm init`, it will tell you how to join the computer to the swarm. If you forget the token, you can run this command see the full command: `docker swarm join-token worker`

Of course, you can close the swarm model: `docker swarm leave`, before you leave, you can find the managers in the `docker info`, after you leave, you can't find it.

You can remove it use `docker service rm`


# Docker compose

docker compose在本地run docker，默认是在build中指定自己本地的Dockerfile, 也可以用hub上的docker image。docker compose可以批量启动不同的docker, 对多个service，是比较有效的搭建本地环境的方法。没有重试机制，稳定性不能保证，只能用于本地测试，如果是线上项目，建议还是k8s。

    1. Create compose.yaml and give the ports mapping
            browser visit port:docker expose port
    2. run docker compose up
    3. visit the link and check if it fine.

Commands
    
    默认运行的file是当前路径下的compose.yaml，如果没有且没有指定 -f, 会报错

    docker compose run 
        根据 compose.yaml 运行里面所有的配置好的docker, 加上对应的service 和service 属性，可以get到所有的对应的参数， example: docker compose run web env, 看  web service 下的environment.
    
    docker compose stop
        根据 compose.yaml 停掉里面所有的配置好的docker
    
    docker compose ls
        list所有的compose project
    

