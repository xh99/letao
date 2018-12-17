$(function () {
    //表单插件
    $("#form").bootstrapValidator({
        //增加校验图标
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        //指定校验字段
        fields: {
            //校验用户名，对应表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须为2-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            //校验密码
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    })
})

//发送Ajax请求
$(function(){
    $("#form").on('success.form.bv',function(e){
        //阻止表单默认事件
        e.preventDefault();
        //发送请求
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:{
                username:$('#username').val(),
                password:$('#password').val()
            },
            success:function(res){
                // console.log(res);
                if(res.success == true){
                    location.href = "index.html"
                }
                if(res.error === 1001){
                    // alert('密码错误')
                    $("#form").data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
                if(res.error === 1000){
                    // alert('用户名不存在')
                    $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback')
                    
                }
            }
        })
    })

    //重置表单数据
    $('.resett').on('click',function(){

        $("#form").data('bootstrapValidator').resetForm()
    })
})