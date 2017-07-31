/**
 * Created by lenovo on 2017/7/27.
 */
(function () {

    function CheckCar(superView) {

        this.superView=$(superView);


    }
    CheckCar.prototype.watch = function (value) {
        this.value = value;
        // console.log(this.value);

    };

    CheckCar.prototype.createCarView=function () {

        var self=this;
        $.get(PRODUCT_HOST+SHOPPINGCAR,{token:localStorage.getItem("token")},function (result) {
            console.log(result);
            $(".goodList").empty();
            $(".section-container-two-head").children().text("购物车");
            var fixation=$("<div class='car-container'><label class='car-choose'><input type='checkbox'  checked>全选</label><span class='car-goods'>商品</span><span class='car-num'>数量</span><span class='car-price'>单价(元)</span><span class='car-sum'>小计(元)</span><span class='car-tools'>删除/购买</span></div>");
            self.superView.append(fixation);

            $(".car-container").css({
                width:"1200px",
                height:"100px",
                "font-size":"20px",
                "border-top":"1px solid red"
            });

            $(".car-choose").css({
                "margin-left":"40px",
                "margin-top":"40px",
                float:"left"
            });
            $(".car-goods").css({
                width:"300px",
                height:"100px",
                "line-height":"100px",
                "margin-left":"40px",
                float:"left",
                "text-align":"center"
            });
            $(".car-num").css({
                width:"100px",
                "line-height":"100px",
                float:"left",
                "padding-left":"40px",
                "text-align":"center"
            });

            $(".car-price").css({
                width:"100px",
                float:"left",
                "margin-left":"100px",
                "line-height":"100px",
                "text-align":"center"
            });
            $(".car-sum").css({
                width:"100px",
                float:"left",
                "margin-left":"100px",
                "line-height":"100px",
                "text-align":"center"
            });
            $(".car-tools").css({
                float:"left",
                "margin-left":"130px",
                "line-height":"100px",
                "text-align":"center"
            });


            result.data.forEach(function (item) {

                var items=$("<div class='car-container-single'><label><input type='checkbox' class='car-choose-single' checked></label><img src='"+item.goods_thumb+"' alt='' class='car-img-single'><div class='car-goods-single-container'><span class='car-goods-single'>"+item.goods_name+"</span></div></div>");
                var num=$("<div class='car-num-single'></div>");
                var price=$("<span class='car-price-single'>"+item.goods_price+"元</span>");
                var sum=$("<span class='car-sum-single'>"+item.goods_price*item.goods_number+".00元</span>");

                var deleteButton=$("<button class='car-delete-single'>删除</button>");
                var subButton=$("<button>-</button>");
                var input=$("<input type='text' value='"+item.goods_number+"' class='car-input'>");
                var addButton=$("<button>+</button>");
                subButton.click(function (inputView,sum,price) {

                    return function () {
                        var value = parseInt(inputView.val());
                        --value;
                        value = value<=1?1:value;
                        inputView.val(value);
                        // callback(value);
                        self.watch(value);
                        sum.text(price*value+".00元");
                        addnum+=price*value;
                    }
                }(input,sum,item.goods_price));

                addButton.click(function (inputView,sum,price,addnum) {
                    return function () {
                        var value = parseInt(inputView.val());
                        ++value;
                        value = value>=10?10:value;
                        inputView.val(value);
                        // callback(self.value);
                        self.watch(value);
                        sum.text(price*value+".00元");
                        addnum-=price*value;


                    }
                }(input,sum,item.goods_price));

                addButton.css({
                    width:"30px",
                    height:"30px",
                    "text-align":"center",
                    float:"left"
                });
                input.css({
                    width:"30px",
                    height:"26px",
                    "text-align":"center",
                    float:"left"
                });
                subButton.css({
                    width:"30px",
                    height:"30px",
                    "text-align":"center",
                    float:"left"
                });
                num.append(subButton);
                num.append(input);
                num.append(addButton);
                items.append(num);
                items.append(price);
                items.append(sum);
                items.append(deleteButton);
                self.superView.append(items);
                deleteButton.click(function () {
                    $(this).parent().remove();
                    new Shopping().updateCar(item.goods_id,0);
                });
            });
            var bottomItem=$("<div></div>")
            var sumPrice=$("<span class='sumPrice'>总计 元</span>");
            var allDelete=$("<button class='allDelete'>批量删除</button>");
            var submitMenu=$("<button class='submitMenu'>提交订单</button>");
            bottomItem.append(allDelete);
            bottomItem.append(sumPrice);
            bottomItem.append(submitMenu);
            bottomItem.css({
                width:"1200px",
                height:"36px",
                "border-top":"1px solid red",
                float:"left"
            });
            allDelete.css({
                width:"80px",
                height:"30px",
                color:"white",
                "background-color":"red",
                "margin-top":"3px",
                "margin-left":"40px",
                float:"left",
                border:"none"
            });
            sumPrice.css({
                float:"left",
                "line-height":"36px",
                "margin-left":"100px"
            });
            submitMenu.css({
                height:"36px",
                width:"80px",
                color:"white",
                "background-color":"red",
                float:"right",
                "margin-right":"60px",
                "margin-top":"3px",
                border:"none"
            });
            self.superView.append(bottomItem);
            submitMenu.click(function () {
                new Order().addOrder();
            });

            $(".car-container-single").css({
                width:"1200px",
                height:"100px",
                "font-size":"20px",
                "border-top":"1px solid red"
            });

            $(".car-choose-single").css({
                "margin-left":"40px",
                "margin-top":"45px",
                float:"left"
            });
            $(".car-img-single").css({
                width:"100px",
                height:"100px",
                "padding-left":"40px",
                float:"left"
            });
            $(".car-goods-single-container").css({
                width:"200px",
                height:"100px",
                overflow:"hidden",
                float:"left"
            });
            $(".car-goods-single").css({
                "line-height":"100px"
            });
            $(".car-num-single").css({
                width:"100px",
                height:"30px",
                float:"left",
                "margin-left":"80px",
                "margin-top":"35px"
            });
            $(".car-price-single").css({
                width:"100px",
                float:"left",
                "margin-left":"120px",
                "line-height":"100px"
            });
            $(".car-sum-single").css({
                width:"100px",
                float:"left",
                "margin-left":"100px",
                "line-height":"100px"
            });
            $(".car-delete-single").css({
                float:"left",
                "margin-left":"130px",
                "margin-top":"35px"
            });



        })

    };


    window.CheckCar=CheckCar;

})();


