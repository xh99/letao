$(function () {
    var currentPage = 1;//当前页
    var pageSize = 5;//一页的数据
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: "json",
            success: function (res) {
                // console.log(res);
                var htmlStr = template('userTpl', res)
                $('tbody').html(htmlStr)

                // 分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: res.page,//要展示的对应页面
                    totalPages: Math.ceil(res.total / res.size),//总页数

                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        currentPage = page;
                        //渲染页面
                        render();
                    }
                });
            }
        })
    }


    //点击按钮模态框展示
    $('.userId').click(function () {
        $('#userModal').modal('show')

        //发送ajax请求渲染下拉菜单
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: "json",
            success: function (res) {
                // console.log(res);
                var htmlStr = template('selctTpl', res)
                $('#ull').html(htmlStr)
            }
        })
    })



    //点击对应的那条渲染到上面
    $('#ull').on('click', 'a', function () {
        // console.log(666);
        var str = $(this).text();
        // console.log(str);
        $('.fg .stre').text(str)

        //把获取到的内容再赋值给隐藏域
        var cat = $(this).data('id')
        $('[name="categoryId"]').val(cat);
        //把验证状态修改
        $("#form").data('bootstrapValidator').updateStatus('categoryId','VALID')
    })


    //文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //   console.log(data.result.picAddr);
            var url = data.result.picAddr
            $('#magse').attr('src', url)

            //把路径也给隐藏域
            $('[name="brandLogo"]').val(url)

            //修改状态图标
            $("#form").data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    });


    //校验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
         excluded: [],
          //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
         //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    })


    //发送请求
    $("#form").on("success.form.bv", function( e ) {
        // 阻止默认的提交
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType:"json",
            success:function(res){
                // console.log(res);
                if(res.success){
                    //重新渲染第一页
                    currentPage = 1
                    render()
                    //关闭模态框
                    $("#userModal").modal('hide');
                    //清空表单
                    $("#form").data('bootstrapValidator').resetForm(true)

                    //手动清除按钮和图片
                    $('.fg .stre').text("请选择一级分类")

                    $('#magse').attr('src','./images/none.png');
                }
            }
        })
        // console.log($('#form').serialize());
      })

})