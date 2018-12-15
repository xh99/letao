$(function(){
    //柱状图
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main1'));

        // 指定图表的配置项和数据
        var option = {
            //标题
            title: {
                text: '2018年注册人数'
            },
            //提示框
            tooltip: {},
            //
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"],
                // data: [{
                //     value: '1月',
                //     // 突出周一
                //     textStyle: {
                //         fontSize: 20,
                //         color: 'red'
                //     }
                // }],
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [500, 2000, 360, 1000, 1000, 200]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
})


$(function(){
    //饼状图
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main2'));

        // 指定图表的配置项和数据
        var option = {
            title : {
                text: '热门品牌销售',
                subtext: '2017年6月',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['阿迪王','耐克','阿迪达斯','乔丹','新百伦']
            },
            series : [
                {
                    name: '品牌',
                    type: 'pie',
                    radius : '60%',
                    center: ['50%', '60%'],
                    data:[
                        {value:3350, name:'阿迪王'},
                        {value:3100, name:'耐克'},
                        {value:234, name:'阿迪达斯'},
                        {value:135, name:'乔丹'},
                        {value:1548, name:'新百伦'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
})
