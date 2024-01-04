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