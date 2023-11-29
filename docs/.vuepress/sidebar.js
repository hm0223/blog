module.exports = {
    // db节点
    '/db/es/': require('../db/es/sidebar'),
    '/db/mongodb/': require('../db/mongodb/sidebar'),
    '/db/mysql/': require('../db/mysql/sidebar'),
    '/db/redis/': require('../db/redis/sidebar'),

    // java frameworks节点
    '/java/frameworks-java/mybatis/': require('../java/frameworks-java/mybatis/sidebar'),
    '/java/frameworks-java/spring/': require('../java/frameworks-java/spring/sidebar'),
    '/java/frameworks-java/spring-mvc/': require('../java/frameworks-java/spring-mvc/sidebar'),
    '/java/frameworks-java/spring-boot/': require('../java/frameworks-java/spring-boot/sidebar'),

    // java micro节点
    '/java/micro-service/dubbo/': require('../java/micro-service/dubbo/sidebar'),
    '/java/micro-service/netty/': require('../java/micro-service/netty/sidebar'),
    '/java/micro-service/spring-cloud/': require('../java/micro-service/spring-cloud/sidebar'),
    '/java/micro-service/zookeeper/': require('../java/micro-service/zookeeper/sidebar'),

    // java middle节点
    '/java/juc/': require('../java/juc/sidebar'),
    '/java/tools/': require('../java/tools/sidebar'),
    '/java/jvm/': require('../java/jvm/sidebar'),
    '/java/nio/': require('../java/nio/sidebar'),
    '/java/jdk-features/': require('../java/jdk-features/sidebar'),
    '/java/design-pattern/': require('../java/design-pattern/sidebar'),
    '/java/data-structures-algorithms/': require('../java/data-structures-algorithms/sidebar'),

    // middle-ware节点
    '/middle-ware/job/': require('../middle-ware/job/sidebar'),
    '/middle-ware/mq/': require('../middle-ware/mq/sidebar'),
    '/middle-ware/fdfs/': require('../middle-ware/fdfs/sidebar'),

    // linux节点
    '/linux/vim/': require('../linux/vim/sidebar'),
    '/linux/shell/': require('../linux/shell/sidebar'),

    // front-end节点
    '/front-end/': require('../front-end/sidebar'),

}
