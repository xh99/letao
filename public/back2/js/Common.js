//进度条效果
$( document ).ajaxStart(function() {
    NProgress.start();//进度条效果
  });
  $( document ).ajaxStop(function() {
    //关闭进度条
    setTimeout(function(){
        NProgress.done();
    },500)
   
  });

//点击分类管理展示二级菜单
$('.category').on('click',function(){
    $('.let_slide').slideToggle()
})


//点击菜单栏按钮左侧栏出去其余变宽
$('.slipn').on('click',function(){
    // console.log(6666);
    // 左侧出去
    $('.let_sidebar').toggleClass('active');
    $('.let_box').toggleClass('active');
    $('.let_above').toggleClass('active')
})


//点击退出
$('.quit').on('click',function(){
    // console.log(666);
    //发送Ajax请求
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function(res){
            // console.log(res.success);
            if(res.success === true){
                location.href = "index.html"
            }
        }
    })
})

//判断是否登陆
$.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function(res){
        // console.log(res);
        //未登录跳回登陆页
        if(res.error === 400){
            location.href = "index.html"
        }
    }
})
