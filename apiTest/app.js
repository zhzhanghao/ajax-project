/**
 * Created by Administrator on 2017/7/27.
 */

function 注册() {
    var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var name = chars[parseInt(Math.random()*chars.length)]+parseInt(Math.random()*100000);

    var url = "http://h6.duchengjiu.top/shop/api_user.php";
    var parm = {status:"register",username:name,password:"111111"};
    $.post(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 登录() {
    var url = "http://h6.duchengjiu.top/shop/api_user.php";
    var parm = {status:"login",username:"c20964",password:"111111"};
    $.post(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);

        localStorage.setItem("username",result.data.username);
        localStorage.setItem("token",result.data.token);
        localStorage.setItem("user_id",result.data.user_id);
    });
}

function 获取商品分类() {
    var url = "http://h6.duchengjiu.top/shop/api_cat.php";
    $.get(url,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 获取热门商品() {
    var url = "http://h6.duchengjiu.top/shop/api_goods.php";
    $.get(url,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 搜索商品() {
    var url = "http://h6.duchengjiu.top/shop/api_goods.php";
    var parm = {search_text:"热"};
    $.get(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 获取商品分类中的商品列表() {
    var url = "http://h6.duchengjiu.top/shop/api_goods.php";
    var parm = {cat_id:45};
    $.get(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 获取一个具体的商品详情() {
    var url = "http://h6.duchengjiu.top/shop/api_goods.php";
    var parm = {goods_id:33710};
    $.get(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

//----------------------------------
//token 只要登录 就会更新
/*
Storage 用于保存数据到本地
通过键值对的方式保存
setItem 保存
getItem 获取保存的内容


localStorage 只要不清缓存 保存的数据 一直存在
sessionStorage 只要关闭掉浏览器 就会被清除

 localStorage.setItem("key","value");
 localStorage.getItem("key");
*/

// localStorage.setItem("name","xiaoming");
// alert(localStorage.getItem("name"));


function 更新购物车() {
    var url = "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token");
    var parm = {goods_id:283261,number:2};
    $.post(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 查看购物车() {
    var url = "http://h6.duchengjiu.top/shop/api_cart.php";
    var parm = {token:localStorage.getItem("token")};
    $.get(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 添加用户地址信息() {

    var url = "http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token="+localStorage.getItem("token");
    var parm = {address_name:"地址的名字",consignee:"收货人",country:"国家",province:"省",city:"城市",district:"区",address:"地址",zip_code:"邮政编码",mobile:"18612962314",email:"11@11.cn",tel:8862345};
    $.post(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 查看用户地址信息() {

    var url = "http://h6.duchengjiu.top/shop/api_useraddress.php";
    var parm = {token:localStorage.getItem("token")};
    $.get(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 删除用户地址信息() {

    //address_id 是查看 调用查看用户地址信息 时候可以找到
    var url = "http://h6.duchengjiu.top/shop/api_useraddress.php";
    var parm = {token:localStorage.getItem("token"),status:"delete",address_id:"1241"};
    $.get(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 下订单() {
    var url = "http://h6.duchengjiu.top/shop/api_order.php?status=add&token="+localStorage.getItem("token");
    var parm = {address_id:"1241",total_prices:"222"};
    $.post(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 取消订单() {
    var url = "http://h6.duchengjiu.top/shop/api_order.php?status=add&token="+localStorage.getItem("token");
    var parm = {address_id:"1241",total_prices:"222"};
    $.post(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}

function 查看订单列表() {

    var url = "http://h6.duchengjiu.top/shop/api_order.php";
    var parm = {token:localStorage.getItem("token")};
    $.get(url,parm,function (result) {
        document.write(result.message);
        console.log(result.data);
    });
}


// 注册();
// 登录();
// 获取商品分类();
// 获取商品分类中的商品列表();
// 获取一个具体的商品详情();
// 搜索商品();
// 更新购物车();
// 查看购物车();
// 添加用户地址信息();
// 查看用户地址信息();
// 删除用户地址信息();
// 下订单();
// 取消订单();
// 查看订单列表();