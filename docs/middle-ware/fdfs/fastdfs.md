# FastDFS

## 1.什么是分布式文件系统

分布式文件系统（Distributed File System）是指文件系统管理的物理存储资源不一定直接连接在本地节点上，而是通过计算机网络与节点相连。 

通俗来讲：

- 传统文件系统管理的文件就存储在本机。
- 分布式文件系统管理的文件存储在很多机器，这些机器通过网络连接，要被统一管理。无论是上传或者访问文件，都需要通过管理中心来访问

## 2.什么是FastDFS

FastDFS是由淘宝的余庆先生所开发的一个轻量级、高性能的开源分布式文件系统。用纯C语言开发，功能丰富：

- 文件存储
- 文件同步
- 文件访问（上传、下载）
- 存取负载均衡
- 在线扩容

适合有大容量存储需求的应用或系统。同类的分布式文件系统有谷歌的GFS、HDFS（Hadoop）、TFS（淘宝）等。

## 3.FastDFS的架构

### 3.1.架构图

先上图：

 ![1526205318630](/v-blog/img/middle-ware/fastdfs/1526205318630.png)

FastDFS两个主要的角色：Tracker Server 和 Storage Server 。

- Tracker Server：跟踪服务器，主要负责调度storage节点与client通信，在访问上起负载均衡的作用，和记录storage节点的运行状态，是连接client和storage节点的枢纽。 
- Storage Server：存储服务器，保存文件和文件的meta data（元数据），每个storage server会启动一个单独的线程主动向Tracker cluster中每个tracker server报告其状态信息，包括磁盘使用情况，文件同步情况及文件上传下载次数统计等信息
- Group：文件组，多台Storage Server的集群。上传一个文件到同组内的一台机器上后，FastDFS会将该文件即时同步到同组内的其它所有机器上，起到备份的作用。不同组的服务器，保存的数据不同，而且相互独立，不进行通信。 
- Tracker Cluster：跟踪服务器的集群，有一组Tracker Server（跟踪服务器）组成。
- Storage Cluster ：存储集群，有多个Group组成。

### 3.2.上传和下载流程

> 上传

 ![1526205664373](/v-blog/img/middle-ware/fastdfs/1526205664373.png)

1. Client通过Tracker server查找可用的Storage server。
2. Tracker server向Client返回一台可用的Storage server的IP地址和端口号。
3. Client直接通过Tracker server返回的IP地址和端口与其中一台Storage server建立连接并进行文件上传。
4. 上传完成，Storage server返回Client一个文件ID，文件上传结束。

> 下载

 ![1526205705687](/v-blog/img/middle-ware/fastdfs/1526205705687.png)

1. Client通过Tracker server查找要下载文件所在的的Storage server。
2. Tracker server向Client返回包含指定文件的某个Storage server的IP地址和端口号。
3. Client直接通过Tracker server返回的IP地址和端口与其中一台Storage server建立连接并指定要下载文件。
4. 下载文件成功。



## 4.安装和使用

### 4.1 准备资源

#### 4.1.1 准备安装资源

准备如下资源：https://github.com/happyfish100 并上传到linux下的`/home/svm/fastdfs`目录

```
FastDFS_v5.08.tar.gz
fastdfs-nginx-module_v1.16.tar.gz
libfastcommon-master.zip
libevent-2.0.22-stable.tar.gz
```

#### 4.1.2 Ubuntu 安装

本文以Ubuntu 18.04 64位操作系统为例进行安装

- 第一步：安装Git
  fastdfs依赖libfastcommon，需要从github上clone到本地编译安装。因此首先需要安装git。

```shell
apt-get install git
```

- 第二步：克隆libfastcommon库

```shell
git clone https://github.com/happyfish100/libfastcommon.git
```

- 第三步：安装libfastcommon依赖  进入libfastcommon目录，依次执行脚本：

```shell
# 安装 make
sudo apt-get install make
# 编译
./make.sh
# 安装
./make.sh install
```

- 第四步：设置环境变量和软链接
  在32位ubuntu中，libfastcommon会安装在/usr/lib 中，64位系统则安装在 /usr/lib64 中

依次执行以下命令：（根据自己的操作系统选择路径）

```shell
# 在etc的profile中配置环境变量、 我是64位系统，所以为lib64
export LD_LIBRARY_PATH=/usr/lib64/
# 软链接（这里也有lib64）
ln -s /usr/lib64/libfastcommon.so /usr/local/lib/libfastcommon.so
```

- 第五步：下载、解压并安装FastDFS
  FastDFS的Github下载地址为：https://github.com/happyfish100/fastdfs/releases

```shell
# 在需要安装目录下执行：
wget https://github.com/happyfish100/fastdfs/archive/V6.04.tar.gz
# 解压
tar xzf V6.04.tar.gz
# 进入解压目录 编译
./make.sh
# 安装
./make.sh install
```

- 第六步 安装Nignx模块：详见4.4

```shell
git clone https://github.com/happyfish100/fastdfs-nginx-module.git
```



### 4.2 安装依赖

FastDFS运行需要一些依赖，在课前资料提供的虚拟中已经安装好了这些依赖，如果大家想要从头学习，可以按下面方式安装：

#### 4.2.1 安装GCC依赖

GCC用来对C语言代码进行编译运行，使用yum命令安装：

```shell
sudo yum -y install gcc
```

#### 4.2.2 安装unzip工具

unzip工具可以帮我们对压缩包进行解压

```shell
sudo yum install -y unzip zip
```

#### 4.2.3 安装libevent

```shell
sudo yum -y install libevent
```

#### 4.2.4 安装Nginx所需依赖

```shell
sudo yum -y install pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

#### 4.2.5 安装libfastcommon-master

这个没有yum包，只能通过编译安装：

- 解压刚刚上传的`libfastcommon-master.zip`

  ```shell
  tar -xvf libfastcommon-master.zip
  ```

- 进入解压完成的目录：

  ```shell
  cd libfastcommon-master
  ```

- 编译并且安装：

  ```shell
  sudo ./make.sh 
  sudo ./makesh install
  ```

到这里为止，所有依赖都已经安装完毕，接下来我们安装FastDFS：



### 4.3 安装FastDFS

#### 4.3.1 编译安装

这里我们也采用编译安装，步骤与刚才的编译安装方式一样：

- 解压

  ```shell
  tar -xvf V6.04.tar.gz
  ```

- 进入目录

  ```he
  cd  fastdfs-6.04
  ```

- 编译并安装

  ```shell
  sudo ./make.sh 
  sudo ./make.sh install
  ```

- 校验安装结果

1）安装完成，我们应该能在`/etc/init.d/`目录，通过命令`ll /etc/init.d/ | grep fdfs`看到FastDFS提供的启动脚本：

![image-20200421171410168](/v-blog/img/middle-ware/fastdfs/image-20200421171410168.png)

其中：

- `fdfs_trackerd` 是tracker启动脚本
- `fdfs_storaged` 是storage启动脚本



2）我们可以在 `/etc/fdfs`目录，通过命令查看到以下配置文件模板：

 ![image-20200421171410172](/v-blog/img/middle-ware/fastdfs/image-20200421171602462.png)

其中：

- `tarcker.conf.sample` 是tracker的配置文件模板
- `storage.conf.sample` 是storage的配置文件模板
- `client.conf.sample` 是客户端的配置文件模板



#### 4.3.2 启动tracker

FastDFS的tracker和storage在刚刚的安装过程中，都已经被安装了，因此我们安装这两种角色的方式是一样的。不同的是，两种需要不同的配置文件。

我们要启动tracker，就修改刚刚看到的`tarcker.conf`，并且启动`fdfs_trackerd`脚本即可。

- 编辑tracker配置

首先我们将模板文件进行赋值和重命名：

```shell
sudo cp tracker.conf.sample tracker.conf
sudo vim tracker.conf
```

打开`tracker.conf`，修改`base_path`配置：

```shell
base_path=/svm/fdfs/tracker # tracker的数据和日志存放目录
```

- 创建目录

刚刚配置的目录可能不存在，我们创建出来

```shell
sudo mkdir -p /svm/fdfs/tracker
```

- 启动tracker

  我们可以使用 `sh /etc/init.d/fdfs_trackerd` 启动，不过安装过程中，fdfs已经被设置为系统服务，我们可以采用熟悉的服务启动方式：

```shell
sudo service fdfs_trackerd start # 启动fdfs_trackerd服务，停止用stop
# 或者
sh /etc/init.d/fdfs_trackerd start | stop | restart 
```

另外，我们可以通过以下命令，设置tracker开机启动：

```shell
sudo chkconfig fdfs_trackerd on

# 如果是ubuntu
sudo apt-get update
sudo apt-get install sysv-rc-conf
sudo sysv-rc-conf fdfs_trackerd on
```



#### 1.3.3 启动storage

我们要启动tracker，就修改刚刚看到的`tarcker.conf`，并且启动`fdfs_trackerd`脚本即可。

- 编辑storage配置

首先我们将模板文件进行赋值和重命名：

```shell
sudo cp storage.conf.sample storage.conf
sudo vim storage.conf
```

打开`storage.conf`，修改`base_path`配置：

```shell
base_path=/svm/fdfs/storage # storage的数据和日志存放目录
store_path0=/svm/fdfs/storage # storage的上传文件存放路径
tracker_server=10.211.55.6:22122 # tracker的地址
```

- 创建目录

刚刚配置的目录可能不存在，我们创建出来

```shell
sudo mkdir -p /svm/fdfs/storage
```

- 启动storage

  我们可以使用 `sh /etc/init.d/fdfs_storaged` 启动，同样我们可以用服务启动方式：

```shell
sudo service fdfs_storaged start  # 启动fdfs_storaged服务，停止用stop
# 启动
sh /etc/init.d/fdfs_storaged start | stop | restart
```

另外，我们可以通过以下命令，设置tracker开机启动：

```shell
sudo chkconfig fdfs_storaged on

# 如果是ubuntu
sudo apt-get update
sudo apt-get install sysv-rc-conf
sudo sysv-rc-conf fdfs_storaged on
```



最后，通过`ps -ef | grep fdfs` 查看进程：

![image-20200421175630416](/v-blog/img/middle-ware/fastdfs/image-20200421175630416.png)



### 4.4 安装Nginx及FastDFS模块



#### 4.4.1 FastDFS的Nginx模块

- 下载

  ```shell
  git clone https://github.com/happyfish100/fastdfs-nginx-module.git
  ```


- 配置config文件

  ```shell
  # 进入配置目录
  cd /home/svm/fastdfs/fastdfs-nginx-module/src/
  # 修改配置
  vim config
  # 执行下面命令（将配置中的/usr/local改为/usr）：
  :%s+/usr/local/+/usr/+g
  ```

- 配置mod_fastdfs.conf

  ```shell
  # 将src目录下的mod_fastdfs.conf复制到 /etc/fdfs目录：
  sudo cp mod_fastdfs.conf /etc/fdfs/
  # 编辑该文件
  sudo vim /etc/fdfs/mod_fastdfs.conf
  ```

- 修改一下配置：

  ```shell
  connect_timeout=10                  		# 客户端访问文件连接超时时长（单位：秒）
  tracker_server=10.211.55.6:22122  			# tracker服务IP和端口
  url_have_group_name=true            		# 访问链接前缀加上组名
  store_path0=/svm/fdfs/storage        		# 文件存储路径
  ```

- 复制 FastDFS的安装目录中的部分配置文件到/etc/fdfs目录

  ```shell
  cd /home/svm/fastdfs/fastdfs-6.04/conf/
  cp http.conf mime.types /etc/fdfs/
  ```

  

#### 4.4.2 安装Nginx

- 下载 

  官网地址: `http://nginx.org/en/download.html`  下载稳定版

  ```shell
  # 或者直接下载
  wget http://nginx.org/download/nginx-1.18.0.tar.gz
  ```

- 解压

  ```shell
  tar -xvf nginx-1.18.0.tar.gz
  ```

- 配置

  ```shell
  # 进入安装目录并执行以下指令
  sudo ./configure --prefix=/opt/nginx --sbin-path=/usr/bin/nginx --add-module=/home/svm/fastdfs/fastdfs-nginx-module/src
  ```

- 编译安装

  ```shell
  # 安装环境GCC / PCRE / zlib
  sudo yum -y install pcre pcre-devel zlib zlib-devel openssl openssl-devel
  
  # 编译安装
  sudo make && sudo make install
  ```


- 可能会出现的异常：

  ```shell
  # 可能的报错：
  /usr/include/fastdfs/fdfs_define.h:15:27: fatal error: common_define.h: No such file or directory
  
  # 解决方案：修改fastdfs-nginx-module/src/config文件，然后重新回到配置阶段
  ngx_module_incs="/usr/include/fastdfs /usr/include/fastcommon/"
  CORE_INCS="$CORE_INCS /usr/include/fastdfs /usr/include/fastcommon/"
  # 配置
  sudo ./configure --prefix=/opt/nginx --sbin-path=/usr/bin/nginx --add-module=/home/svm/fastdfs/fastdfs-nginx-module/src
  # ln -s /usr/include/fast* /usr/local/include/
  # 编译安装
  sudo make && sudo make install
  ```

- 配置nginx整合fastdfs-module模块

  我们需要修改nginx配置文件，在/opt/nginx/config/nginx.conf文件中：

  ```shell
  sudo vim  /opt/nginx/conf/nginx.conf
  ```

  将文件中，原来的`server 80{ ...}` 部分代码替换为如下代码：

  ```nginx
      server {
          listen       80;
          server_name  xyz.image.com;
  
      	# 监听域名中带有group的，交给FastDFS模块处理
          location ~/group([0-9])/ {
              ngx_fastdfs_module;
          }
  
          location / {
              root   html;
              index  index.html index.htm;
          }
  
          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   html;
          }
          
      }
  ```

- 启动

  ```shell
  nginx # 启动
  nginx -s stop # 停止
  nginx -s reload # 重新加载配置
  ```

- 设置nginx开机启动

  创建一个开机启动的脚本：

  ```shell
  vim /etc/init.d/nginx
  ```

  添加以下内容：

  ```sh
  #!/bin/sh
  #
  # nginx - this script starts and stops the nginx daemon
  #
  # chkconfig:   - 85 15
  # description:  NGINX is an HTTP(S) server, HTTP(S) reverse \
  #               proxy and IMAP/POP3 proxy server
  # processname: nginx
  # config:      /etc/nginx/nginx.conf
  # config:      /etc/sysconfig/nginx
  # pidfile:     /var/run/nginx.pid
  
  # Source function library.
  . /etc/rc.d/init.d/functions
  
  # Source networking configuration.
  . /etc/sysconfig/network
  
  # Check that networking is up.
  [ "$NETWORKING" = "no" ] && exit 0
  
  nginx="/usr/bin/nginx"
  prog=$(basename $nginx)
  
  NGINX_CONF_FILE="/opt/nginx/conf/nginx.conf"
  
  [ -f /etc/sysconfig/nginx ] && . /etc/sysconfig/nginx
  
  lockfile=/var/lock/subsys/nginx
  
  make_dirs() {
     # make required directories
     user=`$nginx -V 2>&1 | grep "configure arguments:.*--user=" | sed 's/[^*]*--user=\([^ ]*\).*/\1/g' -`
     if [ -n "$user" ]; then
        if [ -z "`grep $user /etc/passwd`" ]; then
           useradd -M -s /bin/nologin $user
        fi
        options=`$nginx -V 2>&1 | grep 'configure arguments:'`
        for opt in $options; do
            if [ `echo $opt | grep '.*-temp-path'` ]; then
                value=`echo $opt | cut -d "=" -f 2`
                if [ ! -d "$value" ]; then
                    # echo "creating" $value
                    mkdir -p $value && chown -R $user $value
                fi
            fi
         done
      fi
  }
  
  start() {
      [ -x $nginx ] || exit 5
      [ -f $NGINX_CONF_FILE ] || exit 6
      make_dirs
      echo -n $"Starting $prog: "
      daemon $nginx -c $NGINX_CONF_FILE
      retval=$?
      echo
      [ $retval -eq 0 ] && touch $lockfile
      return $retval
  }
  
  stop() {
      echo -n $"Stopping $prog: "
      killproc $prog -QUIT
      retval=$?
      echo
      [ $retval -eq 0 ] && rm -f $lockfile
      return $retval
  }
  
  restart() {
      configtest || return $?
      stop
      sleep 1
      start
  }
  
  reload() {
      configtest || return $?
      echo -n $"Reloading $prog: "
      killproc $nginx -HUP
      RETVAL=$?
      echo
  }
  
  force_reload() {
      restart
  }
  
  configtest() {
    $nginx -t -c $NGINX_CONF_FILE
  }
  
  rh_status() {
      status $prog
  }
  
  rh_status_q() {
      rh_status >/dev/null 2>&1
  }
  
  case "$1" in
      start)
          rh_status_q && exit 0
          $1
          ;;
      stop)
          rh_status_q || exit 0
          $1
          ;;
      restart|configtest)
          $1
          ;;
      reload)
          rh_status_q || exit 7
          $1
          ;;
      force-reload)
          force_reload
          ;;
      status)
          rh_status
          ;;
      condrestart|try-restart)
          rh_status_q || exit 0
              ;;
      *)
          echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
          exit 2
  esac
  
  ```

- 修改文件权限，并加入服务列表

  ```shell
  # 修改权限
  chmod 777 /etc/init.d/nginx 
  # 添加到服务列表
  chkconfig --add /etc/init.d/nginx
  ```

- 设置开机启动

  ```shell
  chkconfig nginx on
  sysv-rc-conf nginx on # Ubuntu
  ```

  

## 5.java客户端

余庆先生提供了一个Java客户端，但是作为一个C程序员，写的java代码可想而知。

这里推荐一个开源的FastDFS客户端，支持SpringBoot2.0。

配置使用极为简单，支持连接池，支持自动生成缩略图，狂拽酷炫吊炸天啊，有木有。

地址：[tobato/FastDFS_client](https://github.com/tobato/FastDFS_Client)

![image-20200422145431789](/v-blog/img/middle-ware/fastdfs/image-20200422145431789.png)



### 5.1.引入依赖

```xml
<dependency>
    <groupId>com.github.tobato</groupId>
    <artifactId>fastdfs-client</artifactId>
    <version>1.27.2</version>
</dependency>
```



### 5.2.引入配置类

纯java配置：

```java
@Configuration
@Import(FdfsClientConfig.class)
// 解决jmx重复注册bean的问题
@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
public class FastClientImporter {
}
```

### 5.3.编写FastDFS属性

```yaml
fdfs:
  so-timeout: 1501
  connect-timeout: 601
  thumb-image: # 缩略图
    width: 60
    height: 60
  tracker-list: # tracker地址 可以有多个(集群)
    - 10.211.55.6:22122
```

### 5.4.测试

```java
package xyz.huwenfeng.fdfs;

@SpringBootTest
class FdfsApplicationTests {

    @Test
    void contextLoads() {
    }

    @Autowired
    private FastFileStorageClient storageClient;

    @Autowired
    private ThumbImageConfig thumbImageConfig;

    @Test
    public void testUpload() throws FileNotFoundException {
        File file = new File("/v-blog/img/middle-ware/fastdfs/ps.jpg");
        // 上传并且生成缩略图
        StorePath storePath = this.storageClient.uploadFile(
                new FileInputStream(file), file.length(), "jpg", null);
        // 带分组的路径
        System.out.println(storePath.getFullPath());
        // 不带分组的路径
        System.out.println(storePath.getPath());
    }

    @Test
    public void testUploadAndCreateThumb() throws FileNotFoundException {
        File file = new File("/v-blog/img/middle-ware/fastdfs/ps.jpg");
        // 上传并且生成缩略图
        StorePath storePath = this.storageClient.uploadImageAndCrtThumbImage(
                new FileInputStream(file), file.length(), "jpg", null);
        // 带分组的路径
        System.out.println(storePath.getFullPath());
        // 不带分组的路径
        System.out.println(storePath.getPath());
        // 获取缩略图路径
        String path = thumbImageConfig.getThumbImagePath(storePath.getPath());
        System.out.println(path);
    }

}
```

结果：

```
run testUpload();
group1/M00/00/00/CtM3Bl6fzfmAeqYXAGAtzfWv0Og796.jpg
M00/00/00/CtM3Bl6fzfmAeqYXAGAtzfWv0Og796.jpg

run testUploadAndCreateThumb();
group1/M00/00/00/CtM3Bl6fzmaAKJGxAGAtzfWv0Og860.jpg
M00/00/00/CtM3Bl6fzmaAKJGxAGAtzfWv0Og860.jpg
M00/00/00/CtM3Bl6fzmaAKJGxAGAtzfWv0Og860_60x60.jpg
```



内容地址：

```shell
# 我的host里面添加了 10.211.55.6   xyz.image.com  
# 10.211.55.6对应我fastdfs的服务器ip
http://xyz.image.com/group1/M00/00/00/CtM3Bl6fzmaAKJGxAGAtzfWv0Og860.jpg
```

![image-20200422132036043](/v-blog/img/middle-ware/fastdfs/image-20200422132036043.png)