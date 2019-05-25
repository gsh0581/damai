require(["../../static/conf/config.js"], function() {
    require(["jquery","vali","jq.cookie"], function($) {
        $("#login-form").validate({
            rules:{
                username:{
                    required:true,
                },
                password:{
                    required:true,
                }
            },
            messages:{
                username:{
                    required:"请输入手机号码",
                },
                password:{
                    required:"请输入密码",
                },
            }

        });
        $(".register").on("click",function(){
            window.location.href="http://localhost:9999/pages/register/register.html"
        })
    })

})