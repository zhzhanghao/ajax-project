/**
 * Created by lenovo on 2017/7/26.
 */
(function () {

    function Goods(superView) {

        this.superView=$(superView);

    }
    // 热门商品列表
    Goods.prototype.hotGoods=function (callback) {
        $.get(PRODUCT_HOST + GOODS,{page:1,pagesize:10},function (data) {
            callback(data);
        })
    };
    Goods.prototype.createHotGoods=function () {
        var self=this;
        this.hotGoods(function (info) {

            info.data.forEach(function (item) {

                var ele=$("<div class='hotGoods'><p class='hotGoods-name' style='display: none'>"+item.goods_name+"</p><img src='image/header/TB1czH5PXXXXXbNXpXXXXXXXXXX-136-122.png' alt='' class='hotGoods-new'><img src='"+item.goods_thumb+"' alt='' class='hotGoods-img'><p class='hotGoods-price'>￥"+item.price+"</p><p class='hotGoods-des'>&nbsp&nbsp&nbsp"+item.goods_desc+"</p></div>");
               self.superView.append(ele);

            });
            $(".hotGoods").css({
                width: "200px",
                height: "400px",
                "border-top": "1px solid red",
                float: "left",
                position:"relative",
                "margin-left":"35px",
            });

            $(".hotGoods").hover(function () {
                $(this).children(".hotGoods-name").css({
                    "display":"block",
                    position:"absolute",
                    "z-index":"99",
                    "background-color":"white"
                });

            },function () {
                $(this).children(".hotGoods-name").css({
                    "display":"none",
                    position:"absolute",
                    "z-index":"99"
                });

            });

            $(".hotGoods-new").css({
                width: "45px",
                height: "45px",
                position:"absolute",
                left:"15px",
                "z-index":"70"
            });
            $(".hotGoods-img").css({
                width: "200px",
                height: "200px"

            });
            $(".hotGoods-price").css({
                color:"red",
                "font-size":"20px",
                "font-weight":"bold"
            });
            $(".hotGoods-des").css({
                "padding-top":"5px"
            })




        });
    };
    //商品列表
    Goods.prototype.navGoods=function (id,callback) {
        $.get(PRODUCT_HOST + GOODS,{cat_id:id,page:1,pagesize:10},function (data) {
            callback(data);
        })
    };
    Goods.prototype.createNavGoods=function (goodsID,action) {
        var self=this;
        this.navGoods(goodsID,function (result) {
            console.log(result);
            result.data.forEach(function (item) {
               var items= $("<div class='hotGoods'><p class='hotGoods-name' style='display: none'>"+item.goods_name+"</p><img src='image/header/TB1czH5PXXXXXbNXpXXXXXXXXXX-136-122.png' alt='' class='hotGoods-new'><img src='"+item.goods_thumb+"' alt='' class='hotGoods-img'><p class='hotGoods-price'>￥"+item.price+"</p><p class='hotGoods-des'>&nbsp&nbsp&nbsp"+item.goods_desc+"</p></div>");
                self.superView.append(items);
                items.click(function (event) {
                    event.data=item;
                    action(event);
                })
            })
            $(".hotGoods").css({
                width: "200px",
                height: "400px",
                "border-top": "1px solid red",
                float: "left",
                position:"relative",
                "margin-left":"35px",
            });

            $(".hotGoods").hover(function () {
                $(this).children(".hotGoods-name").css({
                    "display":"block",
                    position:"absolute",
                    "z-index":"99",
                    "background-color":"white"
                });

            },function () {
                $(this).children(".hotGoods-name").css({
                    "display":"none",
                    position:"absolute",
                    "z-index":"99"
                });

            });

            $(".hotGoods-new").css({
                width: "45px",
                height: "45px",
                position:"absolute",
                left:"15px",
                "z-index":"70"
            });
            $(".hotGoods-img").css({
                width: "200px",
                height: "200px"

            });
            $(".hotGoods-price").css({
                color:"red",
                "font-size":"20px",
                "font-weight":"bold"
            });
            $(".hotGoods-des").css({
                "padding-top":"5px"
            })
        })
    };
    //商品详情
    Goods.prototype.goodMessage=function (id,callback) {
        $.get(PRODUCT_HOST + GOODS,{goods_id:id,page:1,pagesize:10},function (data) {
            callback(data);
        })
    };
    Goods.prototype.count=function(superEle,maxNum,callback) {
        var subButton=$("<button>-</button>");
        var input=$("<input type='text' value='1' class='car-input'>");
        var addButton=$("<button>+</button>");
        this.value = parseInt(input.val());
        var self=this;
        subButton.click(function () {

            --self.value;
            self.value=self.value<1?1:self.value;
            input.val(self.value);
            callback(self.value);

        });
        addButton.click(function () {

            ++self.value;
            self.value=self.value>maxNum?maxNum:self.value;
            input.val(self.value);
            callback(self.value);

        });

        addButton.css({
            width:"55px",
            height:"50px",
            "text-align":"center",
            float:"left"
        });
        input.css({
            width:"50px",
            height:"46px",
            "text-align":"center",
            float:"left"
        });
        subButton.css({
            width:"55px",
            height:"50px",
            "text-align":"center",
            float:"left"
        });
        superEle.append(subButton);
        superEle.append(input);
        superEle.append(addButton);



    }
    Goods.prototype.createGoodMessage=function (goodID,action) {
        var self=this;
        this.id = goodID;

        this.goodMessage(goodID,function (result) {
            console.log(result);
            var items=result.data[0];
            console.log(items);
            var message=$("<div><img src='"+items.goods_thumb+"' alt='' class='goodImg'><p class='good-name'>"+items.goods_name+"</p><p class='good-price'>￥"+items.price+"</p><p class='good-des'>"+items.goods_desc+"</p></div>");
            var countView = $("<div class='count'></div>");
            var toolView = $("<div class='button'><button class='pay'>立即购买</button><button class='addShoppingCar'>加入购物车</button></div>");
            message.append(countView);
            message.append(toolView);

            self.count(countView,10,function (results) {
                console.log(results);
                self.num=results;
            })
            self.superView.append(message);
            $(".goodImg").css({
                width:"435px",
                height:"435px",
                float:"left",
                border:"1px solid red"
            });
            $(".good-name").css({
                "font-size":"20px",
                "padding-top":"60px",
                "margin-left":"40px",
                width:"500px",
                float:"left"
            });
            $(".good-price").css({
                "font-size":"20px",
                "padding-top":"40px",
                "margin-left":"40px",
                width:"500px",
                float:"left",
                color:"red"
            });
            $(".good-des").css({
                "font-size":"20px",
                "padding-top":"40px",
                "margin-left":"40px",
                width:"500px",
                float:"left"
            });
            $(".count").css({
                float:"left",
                width:"500px",
                height:"54px",
                "margin-left":"40px",
                "padding-top":"40px"

            });
            $(".button").css({
                float:"left",
                "padding-top":"40px"
            });
            $(".pay").css({
                width:"150px",
                height:"50px",
                "background-color":"red",
                "text-align":"center",
                "line-height":"50px",
                color:"white",
                "margin-left":"40px",
                border:"none"
            });
            $(".addShoppingCar").css({
                width:"150px",
                height:"50px",
                "background-color":"red",
                "text-align":"center",
                "line-height":"50px",
                color:"white",
                "margin-left":"60px",
                border:"none"
            });
            $(".addShoppingCar").click(function (event) {
                result.num = self.num;
                event.data=result;
                action(event);
                // self.num;
                // self.goods_id
            })

        })
    };

    window.Goods=Goods;
})();