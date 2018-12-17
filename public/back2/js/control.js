//发送ajax请求
$(function(){
    //当前页
    var currentPage = 1;
    //一页的数据
    var pageSize = 5;
   //用户id
   var userId;
   //用户要修改成的状态
    var userDelete;

    radmo();

    function radmo(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:'json',
            success:function(res){
                // console.log(res);
                // console.log(res.success);
                var htmlStr = template("userTpl", res);
                $("tbody").html( htmlStr );
    
                // 分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:res.page,
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked:function(a,b,c,page){
                        // console.log(page);
                        //点击哪页就获取到哪页的数据
                        currentPage = page
                        
                        //重新渲染页面
                        radmo();
                    }
                })
            }
        })
    }


    //修改状态
    $('tbody').on('click','button',function(){
        // console.log(666);
        $('#userModal').modal('show');
        userId = $(this).parent().data('id');
        // console.log(userId);
        userDelete = $(this).hasClass('btn-success') ? 1 : 0;
    })

    //点击确定按钮发送请求
    $(".user").on('click',function(){
     
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id: userId,
                isDelete: userDelete,
            },
            dataType:"json",
            success:function(res){
                // console.log(res);
                if(res.success){
                    //隐藏修改岑
                    $('#userModal').modal('hide');
                    //渲染页面
                    radmo();
                }
            }
        })
        // console.log(userId);
    })
})