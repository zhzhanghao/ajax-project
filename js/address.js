/**
 * Created by lenovo on 2017/7/31.
 */
(function () {

    function Address() {


        // this.lookAddress();

    }
    Address.prototype.showAddress=function () {

        var addressContainer=$("<div class='addressContainer'></div>");
        var addressCloseButton=$("<button class='addressCloseButton'>关闭</button>");
        var provinceAddress=$("<select>收货地址: 省份：<option value='北京市'>北京市</option><option value='上海市'>上海市</option><option value='河北省'>河北省</option><option value='天津市'>天津市</option></select>");
        var cityAddress=$("<select>城市：<option value='北京市'>北京市</option><option value='上海市'>上海市</option><option value='石家庄'>石家庄</option><option value='天津市'>天津市</option></select>");
        var districtAddress=$("<select>城市：<option value='密云区'>密云区</option><option value='闵行区'>闵行区</option><option value='燕郊'>燕郊</option><option value='天津城区'>天津城区</option></select>");
        var consignee=$("<div><span>收货人：</span><input type='text' class='consignee'></div>");
        var detailAddress=$("<div><span>详细地址：</span><input type='text' class='detailAddress'></div>");
        var phone=$("<div><span>电话：</span><input type='text' class='phone'></div>");
        var saveButton=$("<button class='saveButton'>保存地址</button>");
        var addButton=$("<button class='addButton'>添加地址</button>");
        addressContainer.css({
            width:"700px",
            height:"500px",
            "background-color":"white",
            border:"1px solid grey",
            position:"absolute",
            left:"50%",
            top:"100%",
            "box-sizing":"border-box",
            margin:"-150px -200px"
        });
        addressCloseButton.css({
            float:"right",
            border:"none",
            width:"50px",
            height:"30px",
            "text-align":"center",
            "line-height":"30px",
            "background-color":"grey",
            color:"white"
        });
        provinceAddress.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"180px"
        });
        cityAddress.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"10px"
        });
        districtAddress.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"10px"
        });
        consignee.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"180px"
        });
        detailAddress.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"180px"
        });
        phone.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"180px"
        });
        saveButton.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"180px",
            border:"none",
            width:"200px",
            height:"30px",
            "text-align":"center",
            "line-height":"30px",
            "background-color":"grey",
            color:"white"
        });
        addButton.css({
            float:"left",
            "margin-top":"40px",
            "margin-left":"180px",
            border:"none",
            width:"200px",
            height:"30px",
            "text-align":"center",
            "line-height":"30px",
            "background-color":"grey",
            color:"white"
        });
        addressCloseButton.click(function () {
            addressContainer.fadeOut(1000,function () {
                this.remove();
            });
        });
        saveButton.click(function () {
            $.post(PRODUCT_HOST+ADDRESS+"?status=add&token="+localStorage.getItem("token"),{address_name:provinceAddress.val(),country:"中国",province:provinceAddress.val(),city:cityAddress.val(),district:$(".districtAddress").val(),consignee:$(".consignee").val(),mobile:$(".phone").val(),address:$(".districtAddress").val(),zip_code:$(".phone").val()},function (data) {
                console.log(data);

            })
        });
        var self=this;
        addButton.click(function () {

            $(".getGoods-container").remove();
            self.lookAddress(".payAddress-container",function (data) {
                console.log(data)
            });
            addressContainer.fadeOut(1000,function () {
                this.remove();
            });
        });
        addressContainer.append(addressCloseButton);
        addressContainer.append(provinceAddress);
        addressContainer.append(cityAddress);
        addressContainer.append(districtAddress);
        addressContainer.append(consignee);
        addressContainer.append(detailAddress);
        addressContainer.append(phone);
        addressContainer.append(saveButton);
        addressContainer.append(addButton);
        $(document.body).append(addressContainer);


    };

    Address.prototype.lookAddress=function (superView){

        $.get(PRODUCT_HOST+ADDRESS,{token:localStorage.getItem("token")},function (result) {
            console.log(result);
            result.data.forEach(function (item) {
                var items=$("<div class='getGoods-container'><div class='getGoods-address'><p>收货地址："+item.province+"</p><p>"+item.city+"</p><p>"+item.district+"</p><p>"+item.address+"</p></div><p class='getGoods-consignee'> 收件人："+item.consignee+"</p><p class='getGoods-mobile'>电话："+item.mobile+"</p></div>");
                var deleteButton=$("<button class='getGoods-deleteButton'>-</button>");
                items.append(deleteButton);
                $(superView).append(items);
                // callback(item.address_id);

                deleteButton.click((function (goodsID,superItem) {

                    return function () {
                        superItem.remove();
                        $.get(PRODUCT_HOST+ADDRESS,{status:"delete",token:localStorage.getItem("token"),address_id:goodsID},function (result) {
                            console.log(result);

                        })
                    }
                })(item.address_id,items))
            });
            $(".getGoods-container").css({
                width:"1200px",
                height:"50px",
                border:"2px solid red",
                float:"left",
                "margin-top":"5px"
            });
            $(".getGoods-address").css({
                height:"50px",
                width:"500px",
                "padding-left":"25px",
                float:"left"
            });
            $(".getGoods-container p").css({
                "line-height":"50px",
                float:"left"
            });
            $(".getGoods-consignee").css({
                height:"50px",
                width:"110px",
                "padding-left":"25px",
                float:"left"
            });
            $(".getGoods-mobile").css({
                height:"50px",
                width:"160px",
                "padding-left":"25px",
                float:"left"
            });
            $(".getGoods-deleteButton").css({
                height:"35px",
                width:"35px",
                "border":"2px solid red ",
                "border-radius":"50%",
                float:"right",
                "margin-top":"7px",
                "margin-right":"10px",
                "font-weight":"bold"
            });



        })
        return this;

   };
    window.Address=Address;

})();