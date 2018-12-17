$(function(){
    var currentPage = 1;//当前页
    var pageSize = 5;//一页的数据
    render()
  function render(){
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        success:function(res){
            // console.log(res);
            var htmlStr = template('firstTpl', res);
            $('tbody').html(htmlStr)

            // 分页
            $('#pagintor').bootstrapPaginator({
        
                bootstrapMajorVersion:3,

                currentPage:res.page,//要展示的相应页面
                totalPages:Math.ceil(res.total / res.size),//总页数
                onPageClicked:function(a,b,c,page){
                    // console.log(page);
                    currentPage = page;
                    //重新渲染页面
                    render();
                }
            })
        }
    })
  }

  //添加内容
  $('.succ').on("click",function(){
    $('#fistModal').modal('show')
  })

  //表单校验
  $('#form').bootstrapValidator({
      feedbackIcons: {
          valid:"glyphicon glyphicon-ok",
          invalid:"glyphicon glyphicon-remove",
          validating:"glyphicon glyphicon-refresh"
      },
      fields: {
        categoryName: {
            validators: {
                notEmpty: {
                    message:"请输入一级分类名称"
                }
            }
        }
      }
  })
  
  //表单验证成功事件
  $('#form').on('success.form.bv',function(e){
      //阻止默认事件
      e.preventDefault();
      
    //   console.log(666);
    $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        data:$('#form').serialize(),
        dataType:"json",
        success:function(res){
            // console.log(res);
            if(res.success){
                //关闭模态框
                $('#fistModal').modal('hide')
                //渲染页面
                render()
                //重置表单
                $("#form").data('bootstrapValidator').resetForm(true)
            }
        }
    })
  })
})