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
        }
    });


    // //表单校验
    // $('#form').bootstrapValidator({
    //     //2. 指定校验时的图标显示，默认是bootstrap风格
    //     feedbackIcons: {
    //         valid: 'glyphicon glyphicon-ok',
    //         invalid: 'glyphicon glyphicon-remove',
    //         validating: 'glyphicon glyphicon-refresh'
    //     },
    //     //3. 指定校验字段
    //     fields: {
    //         //校验用户名，对应name表单的name属性
    //         username: {
    //             validators: {
    //                 //不能为空
    //                 notEmpty: {
    //                     message: '用户名不能为空'
    //                 },
    //                 //长度校验
    //                 stringLength: {
    //                     min: 6,
    //                     max: 30,
    //                     message: '用户名长度必须在6到30之间'
    //                 },
    //                 //正则校验
    //                 regexp: {
    //                     regexp: /^[a-zA-Z0-9_\.]+$/,
    //                     message: '用户名由数字字母下划线和.组成'
    //                 }
    //             }
    //         },
    //     }

    // })
    
})