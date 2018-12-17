
//进度条
$(document).ajaxStart(function() {
    NProgress.start();
  });

  $(document).ajaxStop(function() {
    NProgress.done();
  });

//判断管理员登陆
$.ajax({
    url:"/employee/checkRootLogin",
    type:"get",
    dataType:"json",
    success:function(res){
        // console.log(res);
        if(res.error === 400){
            location.href = "login.html"
        }
    }
})


   
$(function(){
    //点击分类管理实现二级分类展示
    $('.let_nav .fen').on('click',function(){
        // console.log(66);
        $('.let_nav .child').stop().slideToggle();
    })

    //点击标题左侧菜单按钮左侧导航收起
    $('.let_title .shou').on('click',function(){
        // console.log(6666);
        $('.let_left').toggleClass('active');
        $('.let_right').toggleClass('active');
        $('.let_title').toggleClass('active');
    })

    //点击退出发送ajax请求退出到登陆页
    $('.over').on('click',function(){
        // console.log(666);
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            dataType:"json",
            success: function(res){
                // console.log(res);
                if(res.success === true){
                    location.href = "login.html"
                }
            }
        })
    })


})

