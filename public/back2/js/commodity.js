$(function(){
    var currentPage = 1;
    var pageSize = 3;
    var imgArr = [];
    render();
    function render(){
        $.ajax({
            type:'get',
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(res){
                // console.log(res);
                var htmlStr = template("comTpl",res);
                $('tbody').html(htmlStr)

                // 分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:res.page,//当前页
                    totalPages:Math.ceil(res.total / res.size),//总页数
                   
                    onPageClicked:function(event, originalEvent, type,page){
                    //   console.log(page);
                        currentPage = page
                        render();
                    }
                  });
            }
        })
    }

    //点击添加按钮遮盖层显示
    $('.comBtn').click(function(){
        $('#comModal').modal('show')

        //发送ajax请求获取数据
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:'json',
            success:function(res){
                // console.log(res);
               var htmlStr = template('comTpls',res);
               $('#ull').html(htmlStr)
            }
        })
    })

    //选中下拉菜单选项上面控件改变名字
    $('#ull').on('click','a',function(){
        // console.log(666);
        var txt = $(this).text();
        $('.stre').text(txt)

        //把id赋值给隐藏域
        $('[name="brandId"]').val($(this).data('id'))

        //去掉校验
        $("#form").data('bootstrapValidator').updateStatus('brandId','VALID')
    })

    //图片上传
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        //   console.log(data);
          var result = {
            picName:data.result.picName,
            picAddr:data.result.picAddr
          }
        //   console.log(result);
          imgArr.unshift(result);//把图片路径保存在数组里 每次传进来的时候都是最新的在前面
        //   console.log(JSON.stringify(imgArr));
       
          $('#imgBox').prepend('<img src="'+ data.result.picAddr +'" width="100">')

          //保证图片不会超过三张 大于三种就让最后一张自动删除
          if(imgArr.length > 3){
            //   console.log(666);
            //删除最久的那张
           $('#imgBox img:last-of-type').remove();
           //还要删除数组里最后面的那一张一直保持3张
           imgArr.pop();  //push pop shift unshift
        //    console.log(imgArr);
          }
          if(imgArr.length === 3){
               //去掉校验
            $("#form").data('bootstrapValidator').updateStatus('inputsrc','VALID')
          }
        }   
    });


    //校验
    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
         //3. 指定校验字段
        fields: {
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                    message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                    message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                    message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                      }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                      }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                    message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                    message: '请输入商品价格'
                    }
                }
            },
            inputsrc: {
                validators: {
                    //不能为空
                    notEmpty: {
                    message: '请上传3张图片'
                    }
                }
            },
        }
    })


    //提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var info = $('#form').serialize();
        info += '&picArr=' + JSON.stringify(imgArr)
        // console.log(sc);
        $.ajax({
            url:"/product/addProduct",
            type:"post",
            data:info,
            dataType:"json",
            success:function(res){
                // console.log(res);
                if(res.success){
                    //关闭模态框
                    $('#comModal').modal('hide')
                    //重置表单项
                    $("#form").data('bootstrapValidator').resetForm(true)
                    //手动重置
                    $('.stre').text('请选择二级分类')
                    $('#imgBox img').remove()
                    //重新渲染页面
                    render()
                }
            }
        })
    });
})