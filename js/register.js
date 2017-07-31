/**
 * Created by lenovo on 2017/7/27.
 */
(function () {

    function Register() {

    }

    Register.prototype.showRegister=function () {

        var registerContainer=$("<div class='registerContainer'></div>");
        var closeButton=$("<button class='closeButton'>关闭</button>");
        var usernameInput=$("<p><input type='text' placeholder='请输入用户名'></p>");
        var passwordInput=$("<p><input type='password' placeholder='请输入密码'></p>");
        var registerButton=$("<button>注册</button>");

        registerContainer.css({
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
        registerButton.css({

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
            registerContainer.stop().fadeOut(1000,function () {
                this.remove();
            });
        });
        registerButton.click(function () {
            $.post(PRODUCT_HOST+REGISTER, {status:"register",username:usernameInput.children().val(),password:passwordInput.children().val()}, function (data) {

                    console.log(data);
                    if(data.code==0){
                        registerContainer.slideUp(500,function () {
                            registerContainer.remove();
                        })
                    }else {
                        alert(data.message)
                    }
                }
            )
        });


        registerContainer.append(closeButton);
        registerContainer.append(usernameInput);
        registerContainer.append(passwordInput);
        registerContainer.append(registerButton);

        $(document.body).append(registerContainer);
    };


    window.Register=Register;
})();