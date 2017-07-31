/**
 * Created by lenovo on 2017/7/28.
 */
(function () {

    function Order(superView) {

        this.superView=$(superView);
        this.sumPrice=null;

    }
    Order.prototype.addOrder=function () {

        $.post(PRODUCT_HOST+ORDER+"?&status=add&token="+localStorage.getItem("token"),{address_id:"1403",total_prices:"222"},function (result) {
            console.log(result);
        });


    };
    Order.prototype.lookOrder=function () {
        var self=this;
        $.get(PRODUCT_HOST+ORDER,{token:localStorage.getItem("token")},function (data) {
            console.log(data);
            var payTitle=$("<div>填写并核对信息</div>");
            var payAddress=$("<div class='payAddress-container'><p class='payAddress-title'>送货地址</p><button class='payAddress-button'>添加收货地址</button></div>");
            var payWay=$("<div class='payWay-container'><div class='payWay-title'>支付方式</div><button class='toPay'>货到付款</button><button class='toPay'>在线支付</button></div>");
            var payMessage=$("<div class='payMessage-container'><div class='payMessage-title'>订单详情</div></div>");
            var payMessageTitle=$("<div class='payMessageTitle-container'><p class='payMessageTitle-goods'>商品</p><p class='payMessageTitle-number'>数量</p><p class='payMessageTitle-price'>单价(元)</p><p class='payMessageTitle-sumPrice'>小计(元)</p></div>");

            self.superView.append(payTitle);
            self.superView.append(payAddress);
            self.superView.append(payWay);
            self.superView.append(payMessage);
            self.superView.append(payMessageTitle);

            new Address().lookAddress(payAddress);
            $(".payAddress-container").css({
                width:"1200px",
                float:"left",
                "border-top":"2px solid red",
                "margin-top":"10px"
            });
            $(".payAddress-title").css({
                height:"30px",
                width:"100%",
                "line-height":"30px",
                color:"white",
                "margin-top":"10px",
                "background-color":"grey",
                float:"left"
            });
            $(".payAddress-button").css({
                border:"none",
                "background-color":"red",
                color:"white",
                "margin-top":"5px",
                width:"150px",
                height:"30px",
                "line-height":"30px",
                float:"right"
            });
            $(".payWay-container").css({
                width:"1200px",
                height:"100px",
                "border-top":"2px solid red",
                "margin-top":"10px",
                float:"left"
            });
            $(".payWay-title").css({
                height:"30px",
                width:"100%",
                "line-height":"30px",
                color:"white",
                "margin-top":"10px",
                "background-color":"grey",
                float:"left"
            });
            $(".toPay").css({
                width:"150px",
                height:"50px",
                "background-color":"red",
                "line-height":"50px",
                color:"white",
                float:"left",
                "margin-left":"10px",
                "margin-top":"5px",
                border:"none"
            });
            $(".payMessage-container").css({

                width:"1200px",
                "border-top":"2px solid red",
                "margin-top":"10px",
                float:"left"
            });
            $(".payMessage-title").css({
                height:"30px",
                width:"100%",
                "line-height":"30px",
                color:"white",
                "margin-top":"10px",
                "background-color":"grey",
                float:"left"
            });
            $(".payMessageTitle-container").css({
                height:"100px",
                width:"1200px",
                "border-top":"1px solid red",
                "margin-top":"5px",
                float:"left"
            });
            $(".payMessageTitle-goods").css({
                width:"310px",
                height:"100px",
                "line-height":"100px",
                "text-align":"center",
                "margin-left":"5px",
                float:"left"
            });
            $(".payMessageTitle-number").css({
                width:"40px",
                height:"100px",
                "line-height":"100px",
                "text-align":"center",
                "margin-left":"100px",
                float:"left"
            });
            $(".payMessageTitle-price").css({
                width:"100px",
                height:"100px",
                "line-height":"100px",
                "text-align":"center",
                "margin-left":"220px",
                float:"left"
            });
            $(".payMessageTitle-sumPrice").css({
                width:"100px",
                height:"100px",
                "line-height":"100px",
                "text-align":"center",
                "margin-left":"200px",
                float:"left"
            });
            $(".payAddress-button").click(function () {
                new Address().showAddress();
            });
            data.data.forEach(function (datas) {
                datas.goods_list.forEach(function (item) {
                    var items=$("<div class='payGoods-container'><div class='goodsMessage'><img src='"+item.goods_thumb+"' alt='' class='goodsMessage-img'><span class='goodsMessage-name'>"+item.goods_name+"</span></div><span class='goodsMessage-number'>"+item.goods_number+"</span><span class='goodsMessage-price'>"+item.goods_price+"元</span><span class='goodsMessage-sumPrice'>"+item.goods_number*item.goods_price+"元</span></div>");
                    console.log(self.sumPrice);
                    self.superView.append(items);
                });

            });
            $(".payGoods-container").css({
                width:"1200px",
                height:"100px",
                "border-top":"1px solid red",
                float:"left"
            });
            $(".goodsMessage").css({
                width:"310px",
                height:"100px",
                "margin-left":"5px",
                float:"left",
                overflow:"hidden"

            });
            $(".goodsMessage-img").css({
                width:"100px",
                height:"100px",
                float:"left"
            });
            $(".goodsMessage-name").css({
                float:"left",
                "line-height":"100px",
                width:"200px"

            });
            $(".goodsMessage-number").css({
                width:"40px",
                height:"100px",
                "line-height":"100px",
                "text-align":"center",
                "margin-left":"100px",
                float:"left"
            });
            $(".goodsMessage-price").css({
                width:"100px",
                height:"100px",
                "line-height":"100px",
                "text-align":"center",
                "margin-left":"220px",
                float:"left"
            });
            $(".goodsMessage-sumPrice").css({
                width:"100px",
                height:"100px",
                "line-height":"100px",
                "text-align":"center",
                "margin-left":"200px",
                float:"left"
            });
            var submit=$("<div class='submit-container'><div class='submit-title'>提交订单</div><button class='submit-button'>提交订单</button><p>总价</p></div>");
            self.superView.append(submit);
            $(".submit-container").css({
                width:"1200px",
                height:"80px",
                "border-top":"1px solid red",
                "margin-top":"20px",
                float:"left"
            });
            $(".submit-title").css({
                width:"1200px",
                height:"30px",
                "margin-top":"10px",
                "background-color":"grey",
                color:"white",
                "line-height":"30px"
            });
            $(".submit-button").css({
                width:"100px",
                height:"30px",
                "texy-align":"center",
                "line-height":"30px",
                "background-color":"red",
                color:"white",
                "margin-top":"5px",
                border:"none",
                float:"left"
            });
            $(".submit-container p").css({
                float:"left",
                "margin-top":"10px"
            })
        })




    };

    window.Order=Order;


})();