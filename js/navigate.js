/**
 * Created by lenovo on 2017/7/26.
 */
(function () {

    function Navigate() {

        // this.createView();

    }
    Navigate.prototype.loadData=function (callback) {
        $.get(PRODUCT_HOST+CATEGORY,function (data) {
            callback(data);
        })

    };
    Navigate.prototype.createView=function (action) {
        this.loadData(function (result) {
            var info=result.data;

            info.forEach(function (item) {
               var ele = $("<li class='nav-li'><a href=''>"+item.cat_name+"</a></li>");

                $(".nav").append(ele);
                ele.click(function (event) {
                    event.data = item;
                    action(event);
                })
            });
            $(".nav-li").css({
                float:"left",
                width:"10%",
                height:"100%",
                "text-align":"center"
            });
            $(".nav-li").hover(function () {
                $(this).css({
                    "background-color":"yellow"
                })
            },function () {
                $(this).css({
                    "background-color":"red"
                })
            })
        })
    };

    window.Navigate=Navigate;
})();