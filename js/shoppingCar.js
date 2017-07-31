/**
 * Created by lenovo on 2017/7/27.
 */
(function () {

    function Shopping() {

    }
    Shopping.prototype.updateCar=function (goodsID,num) {

        $.post(PRODUCT_HOST+SHOPPINGCAR+"?token="+localStorage.getItem("token"),{goods_id:goodsID,number:num},function (result) {
            console.log(result);
        })

    };
    window.Shopping=Shopping;
})();