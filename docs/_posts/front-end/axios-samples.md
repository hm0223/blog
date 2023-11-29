## 1、异步查询工具axios

异步查询数据，自然是通过ajax查询，大家首先想起的肯定是jQuery。但jQuery与MVVM的思想不吻合，而且ajax只是jQuery的一小部分。因此不可能为了发起ajax请求而去引用这么大的一个库。

### 1.1axios入门

Vue官方推荐的ajax请求框架叫做：axios，看下demo：

![1526033988251](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526033988251.png)

axios的Get请求语法：

```js
axios.get("/item/category/list?pid=0") // 请求路径和请求参数拼接
    .then(function(resp){
    	// 成功回调函数
	})
    .catch(function(){
    	// 失败回调函数
	})
// 参数较多时，可以通过params来传递参数
axios.get("/item/category/list", {
        params:{
            pid:0
        }
	})
    .then(function(resp){})// 成功时的回调
    .catch(function(error){})// 失败时的回调
```

axios的POST请求语法：

比如新增一个用户

```js
axios.post("/user",{
    	name:"Jack",
    	age:21
	})
    .then(function(resp){})
    .catch(function(error){})
```

- 注意，POST请求传参，不需要像GET请求那样定义一个对象，在对象的params参数中传参。post()方法的第二个参数对象，就是将来要传递的参数

PUT和DELETE请求与POST请求类似

### 1.2axios的全局配置

而在我们的项目中，已经引入了axios，并且进行了简单的封装，在src下的http.js中：

 ![1526034150067](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526034150067.png)

http.js中对axios进行了一些默认配置：

```js
import Vue from 'vue'
import axios from 'axios'
import config from './config'
// config中定义的基础路径是：http://api.leyou.com/api
axios.defaults.baseURL = config.api; // 设置axios的基础请求路径
axios.defaults.timeout = 2000; // 设置axios的请求时间

Vue.prototype.$http = axios;// 将axios赋值给Vue原型的$http属性，这样所有vue实例都可使用该对象

```

- http.js中导入了config的配置，还记得吗？

  ![1526041205846](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526041205846.png)

- http.js对axios进行了全局配置：`baseURL=config.api`，即`http://api.leyou.com/api`。因此以后所有用axios发起的请求，都会以这个地址作为前缀。

- 通过`Vue.property.$http = axios`，将`axios`赋值给了 Vue原型中的`$http`。这样以后所有的Vue实例都可以访问到$http，也就是访问到了axios了。

### 1.3测试一下：

我们在组件`MyBrand.vue`的getDataFromServer方法，通过$http发起get请求，测试查询品牌的接口，看是否能获取到数据：

   ![1526048221750](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526048079191.png)

网络监视：

 ![1526048143014](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526048143014.png)

控制台结果：

![1526048275064](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526048275064.png)

可以看到，在请求成功的返回结果response中，有一个data属性，里面就是真正的响应数据。

响应结果中与我们设计的一致，包含3个内容：

- total：总条数，目前是165
- items：当前页数据
- totalPage：总页数，我们没有返回

### 1.4异步加载品牌数据

虽然已经通过ajax请求获取了品牌数据，但是刚才的请求没有携带任何参数，这样显然不对。我们后端接口需要5个参数：

- page：当前页，int
- rows：每页大小，int
- sortBy：排序字段，String
- desc：是否为降序，boolean
- key：搜索关键词，String

而页面中分页信息应该是在pagination对象中，我们通过浏览器工具，查看pagination中有哪些属性：

 ![](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526042136135.png)

分别是：

- descending：是否是降序，对应请求参数的desc
- page：当前页，对应参数的page
- rowsPerpage：每页大小，对应参数中的rows
- sortBy：排序字段，对应参数的sortBy

缺少一个搜索关键词，这个应该是通过v-model与输入框绑定的属性：search。这样，所有参数就都有了。



另外，不要忘了把查询的结果赋值给brands和totalBrands属性，Vuetify会帮我们渲染页面。



接下来，我们完善请求参数：

```js
// 发起请求
this.$http.get("/item/brand/page",{
        params:{
            key: this.search, // 搜索条件
            page: this.pagination.page,// 当前页
            rows: this.pagination.rowsPerPage,// 每页大小
            sortBy: this.pagination.sortBy,// 排序字段
            desc: this.pagination.descending// 是否降序
        }
    }).then(resp => { // 这里使用箭头函数
        // 将得到的数据赋值给本地属性
        this.brands = resp.data.items;
        this.totalBrands = resp.data.total;
        // 完成赋值后，把加载状态赋值为false
        this.loading = false;
    })
```

查看网络请求：

 ![1526049810351](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526049810351.png)

效果：

![1526049139244](F:\视频+笔记+资料\7乐优商城\day06-后台管理页面\assets\1526049139244.png)



## 2、请求参数格式错误

### 2.1原因分析

我们填写表单并提交，发现报错了：

 ![1526180888663](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526180888663.png)

查看控制台的请求详情：

 ![1526180937974](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526180937974.png)



发现请求的数据格式是JSON格式。

> 原因分析：

axios处理请求体的原则会根据请求数据的格式来定：

- 如果请求体是对象：会转为json发送

- 如果请求体是String：会作为普通表单请求发送，但需要我们自己保证String的格式是键值对。

  如：name=jack&age=12

### 2.2.QS工具

QS是一个第三方库，我们可以用`npm install qs --save`来安装。不过我们在项目中已经集成了，大家无需安装：

 ![1526181889564](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526181889564.png)

这个工具的名字：QS，即Query String，请求参数字符串。

什么是请求参数字符串？例如： name=jack&age=21

QS工具可以便捷的实现 JS的Object与QueryString的转换。



在我们的项目中，将QS注入到了Vue的原型对象中，我们可以通过`this.$qs`来获取这个工具：

我们将`this.$qs`对象打印到控制台：

```js
created(){
    console.log(this.$qs);
}
```

发现其中有3个方法：

 ![1526181747560](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526181747560.png)

这里我们要使用的方法是stringify，它可以把Object转为QueryString。



测试一下，使用浏览器工具，把qs对象保存为一个临时变量：

 ![1526182053758](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526182053758.png)

然后调用stringify方法：

 ![1526182230872](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526182230872.png)

成功将person对象变成了 name=jack&age=21的字符串了



### 2.3.解决问题

修改页面，对参数处理后发送：

![1526181301670](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526181301670.png)

然后再次发起请求：

 ![1526181331443](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526181331443.png)

发现请求成功：

 ![1526181358204](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526181358204.png)

参数格式：

 ![1526181384653](F:/%E8%A7%86%E9%A2%91+%E7%AC%94%E8%AE%B0+%E8%B5%84%E6%96%99/7%E4%B9%90%E4%BC%98%E5%95%86%E5%9F%8E/day08-%E5%93%81%E7%89%8C%E7%AE%A1%E7%90%86/assets/1526181384653.png)

数据库：

 ![1526181553737]()