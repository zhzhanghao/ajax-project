/**
 * Created by lenovo on 2017/7/27.
 */
(function () {

    function Search(superView) {
        this.superView=$(superView);
        this.searchGoods();
    }

    Search.prototype.searchGoods=function () {
        var self=this;
        $(".header-search-button").click(function () {
            var searchText=$(".header-search-input").val();
            $.get(PRODUCT_HOST+GOODS,{search_text:searchText,page:1,pagesize:10},function (result) {
                $(".goodList").empty();
                result.data.forEach(function (item) {
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
            })
        })

    };

    window.Search=Search;
})();