/**
 * Created by lenovo on 2017/7/24.
 */
(function () {

    function Login(success) {
        this.showLogin(success);
    }
    Login.prototype.showLogin=function (success) {

        var loginContainer=$("<div class='loginContainer'></div>");
        var closeButton=$("<button class='closeButton'>关闭</button>");
        var usernameInput=$("<p><input type='text' placeholder='请输入用户名'></p>");
        var passwordInput=$("<p><input type='password' placeholder='请输入密码'></p>");
        var loginButton=$("<button>登录</button>");

        loginContainer.css({
            width:"400px",
            height:"300px",
            "background-color":"#2AB5B5",
            border:"5px solid #B51FA0",
            position:"absolute",
            left:"50%",
            top:"50%",
            "box-sizing":"border-box",
            margin:"-150px -200px"
        });
        var inputCSS={
            padding:"20px 0",
            width:"300px",
            margin:"0 auto",
            "text-align":"center"
        };
        usernameInput.css(inputCSS);
        passwordInput.css(inputCSS);
        loginButton.css({

            "margin":"20px 150px",
            width:"100px",
            height:"30px",
            "line-height":"30px",
            border:"none"
        });
        closeButton.css({
            float:"right",
            color:"white",
            padding:"5px",
            border:"none",
            "background-color":"#B51FA0"
        });
        closeButton.click(function () {
            loginContainer.fadeOut(1000,function () {
                this.remove();
            });
        });
        loginButton.click(function () {
            $.post(PRODUCT_HOST+LOGIN, {status:"login",username:usernameInput.children().val(),password:passwordInput.children().val()}, function (data) {

                console.log(data);
                if(data.code==0){
                    localStorage.setItem("token",data.data.token);
                    loginContainer.slideUp(500,function () {
                loginContainer.remove();

                        success(data.data);
                    })
                }else {
                    alert(data.message)
                }
                }
            )
        });

        loginContainer.append(closeButton);
        loginContainer.append(usernameInput);
        loginContainer.append(passwordInput);
        loginContainer.append(loginButton);

        $(document.body).append(loginContainer);
    };


    window.Login=Login;
})();