
    //获取from表单
    $('#from').bootstrapValidator({
           //配置输入框图标
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        //设置校验规则
        fields: {
            username:{
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min:2,
                        max:6,
                        message: "用户名长度必须是2-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password:{
               validators: {
                notEmpty: {
                    message: "密码不能为空"
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: "密码长度必须是6-12位"
                },
                callback: {
                    message: "密码错误"
                }
               }
            }
        }
    })


    //发送ajax请求
    $('#from').on("success.form.bv",function(e){
        //阻止默认事件
        e.preventDefault();
        //发送请求
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:{
                username:$('#username').val(),
                password:$('#password').val()
            },
            dataType:"json",
            success:function(res){
               //成功跳转页面
               if(res.success){
                location.href = "login.html"
               }
               //1000用户名错误
               if(res.error === 1000){
                //    alert("用户名不存在在")
                $('#from').data('bootstrapValidator').updateStatus("username","INVALID","callback");
               }
               //1001密码错误
               if(res.error === 1001){
                //    alert("密码错误")
                $('#from').data('bootstrapValidator').updateStatus("password","INVALID","callback");
               }
            }
        })
    })



    //重置表单校验状态
    $('.reset').on('click',function(){
        //获取实列调用方法
        $(from).data('bootstrapValidator').resetForm();
    })
