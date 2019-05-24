require(["../../static/conf/config.js"], function() {
    require(["jquery","vali","jq.cookie"], function($) {
      
        var errorMsg;
        var tpl;
        $("#register").validate({
            rules:{
                username:{
                    required:true,
                    checkPhone:[],
                  
                },
                password:{
                    required:true,
                    rangelength:[6,20],
                    checkPsw:[]

                },
                spass:{
                    required:true,
                    equalTo:"#inputPassword1",
                },
                accept:{
                    required:"#checkbox:checked",
                }

            },
            messages:{
                username:{
                    required:"请输入手机号",
                    rangelength:"不能为空！"
                },
                password:{
                    required:"请输入密码",
                    rangelength:"请设置登录密码",
                
                },
                spass:{
                    required:"请再次输入密码",
                    equalTo: "两次密码输入不一致",
                },
                accept:{
                    required:"请勾选同意协议"
                }
            }

        });
        $.validator.addMethod("checkPhone",function(value,element){
            var length = value.length;
            var regPhone =  /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
            return this.optional(element) || (length ==11) && regPhone.test(value);
        },"	手机号码格式错误")
        // $.validator.addMethod("checkexist",function(value,element){
        //     var exist = $.cookie('name');
        //     return this.optional(element) ||  (exist === value);
        // },"	手机号码已被注册！")
        
        $.validator.addMethod("checkPsw",function(value,element,params){
            var regPhone =  /(?![A-Za-z]+$)/;
            return this.optional(element) || regPhone.test(value);
        },'密码设置不符合要求')
        
       
            
    })

})