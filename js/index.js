/**
 * Created by lenovo on 2017/7/24.
 */
function init() {

    $(".header-top-register").click(function () {

        new Register().showRegister();

    });

    $(".header-top-login").click(function () {
        new Login(function (user) {
            $(".header-top-menu .header-top-menu-first").html("<a href='#'>"+user.username+"</a>")
        });
    });


    new Search(".goodList");

    new Goods(".goodList").createHotGoods();



    new Navigate().createView(function (event) {
        console.log(event);
        $(".goodList").empty();
        $(".bannerContainer").remove();
        $(".star").remove();
        new Goods(".goodList").createNavGoods(event.data.cat_id,function (events) {
            $(".goodList").empty();
            new Goods(".goodList").createGoodMessage(events.data.goods_id,function (event) {
                console.log(event);
                new Shopping().updateCar(event.data.data[0].goods_id,event.data.num);
                console.log(event.data.num);
            });
        });
    });

    $(".header-top-shopping-car").click(function () {
        new CheckCar(".goodList").createCarView();
    });

    // new Goods(".goodList").createNavGoods(function (events) {
    //
    //     new Goods(".goodList").createGoodMessage(events.data.goods_id);
    // })
    new  corouselView.Corouse("#banner-left",[{imagePath:"image/header/hot1.jpg"},{imagePath:"image/header/hot2.jpg"}],200,400).putSuperView().startTimer(3000).createControlButton();
    new  corouselView.Corouse("#banner-center",[{imagePath:"image/header/TB1BunHRVXXXXagaXXXXXXXXXXX-750-340.jpg"},{imagePath:"image/header/TB1jT3mRVXXXXXnXXXXXXXXXXXX-750-340.jpg"}],750,400).putSuperView().startTimer(3000).createControlButton();

    $(".header-top-order").click(function () {

        $(".goodList").empty();
        new Order(".goodList").lookOrder();
    });



}



init();