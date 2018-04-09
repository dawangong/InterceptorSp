#### InterceptorSp
- 在建立连接后监听readystatechange
- 用Object.defineProperty更改responseText属性为可读可写

#### 概述：为数据返回之前提供一些操作空间
#### 使用：
    Intercept(function(that){
    //your code
    })
    //that(参数)指向xhr对象
