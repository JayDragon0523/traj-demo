(function () {
    require.config({
        paths: {
            echarts: "echarts",
        },
    });

    var data = genData();
    console.log(data);
    require(
        [
            "echarts",
            "echarts/chart/main",
            "echarts/chart/map",
        ],
        function (echarts, BMapExtension) {
            $('#main').css({
                height: $('body').height(),
                width: $('body').width()
            });

            // 初始化地图
            var BMapExt = new BMapExtension($('#main')[0], BMap, echarts, {
                enableMapClick: false
            });
            var map = BMapExt.getMap();
            var container = BMapExt.getEchartsContainer();

            var startPoint = {
                // x: 113.328755, //天河城
                // y: 23.135588
                x: 120.136391,
                y: 30.295331

            };

            var point = new BMap.Point(startPoint.x, startPoint.y);
            map.centerAndZoom(point, 17);
            map.enableScrollWheelZoom(true);
            // 地图自定义样式
            map.setMapStyle({
                styleJson: [
                    {
                        'featureType': 'land',     //调整土地颜色
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#081734'
                        }
                    },
                    {
                        'featureType': 'building',   //调整建筑物颜色
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#04406F'
                        }
                    },
                    {
                        'featureType': 'building',   //调整建筑物标签是否可视
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'highway',     //调整高速道路颜色
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#015B99'
                        }
                    },
                    {
                        'featureType': 'highway',    //调整高速名字是否可视
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'arterial',   //调整一些干道颜色
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#003051'
                        }
                    },
                    {
                        'featureType': 'arterial',
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'green',
                        'elementType': 'geometry',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'water',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#044161'
                        }
                    },
                    {
                        'featureType': 'subway',    //调整地铁颜色
                        'elementType': 'geometry.stroke',
                        'stylers': {
                            'color': '#003051'
                        }
                    },
                    {
                        'featureType': 'subway',
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'railway',
                        'elementType': 'geometry',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'railway',
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'all',     //调整所有的标签的边缘颜色
                        'elementType': 'labels.text.stroke',
                        'stylers': {
                            'color': '#313131'
                        }
                    },
                    {
                        'featureType': 'all',     //调整所有标签的填充颜色
                        'elementType': 'labels.text.fill',
                        'stylers': {
                            'color': '#FFFFFF'
                        }
                    },
                    {
                        'featureType': 'manmade',
                        'elementType': 'geometry',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'manmade',
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'local',
                        'elementType': 'geometry',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'local',
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'subway',
                        'elementType': 'geometry',
                        'stylers': {
                            'lightness': -65
                        }
                    },
                    {
                        'featureType': 'railway',
                        'elementType': 'all',
                        'stylers': {
                            'lightness': -40
                        }
                    },
                    {
                        'featureType': 'boundary',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#8b8787',
                            'weight': '1',
                            'lightness': -29
                        }
                    }
                ]
            });

            option = {

                color: ['gold', 'aqua', 'lime'],
                title: {
                    text: '',
                    subtext: '',
                    x: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    hideDelay: 4000,
                    formatter: function (d) {
                        console.log(d)
                        var jw = '经度：' + d.value[0] + '<br/>'
                        jw += '纬度：' + d.value[1]
                        return jw
                    }
                },
                color: ['gold', 'red'],
                //图例属性
                legend: {
                    data: ['上班轨迹(甲)', '逛街购物轨迹(乙,丙)'],
                    x: 'left',
                    orient: 'vertical',
                    padding: [30, 15, 15, 30],
                    textStyle: {
                        fontSize: 17,
                        color: 'rgb(204,204,204)',
                    },
                    selected: {
                        '上班轨迹(甲)': true,
                        '逛街购物轨迹(乙,丙)': false,
                    },
                    selectedMode: 'single',
                },
                /*
                toolbox: {
                    show : true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                       mark : {show: true},
                       dataView : {show: true, readOnly: false},
                       restore : {show: true},
                       saveAsImage : {show: true}
                    }
                },*/
                //画图的类型
                series: [
                    {
                        name: '上班轨迹(甲)',
                        type: 'map',
                        mapType: 'none',
                        data: [],

                        markLine: {
                            Symbol: ['none', 'arrow'],
                            symbolSize: ['0', '0.1'],
                            smooth: true,
                            smooth: 0,
                            effect: {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle: {
                                color: 'red',
                                normal: {
                                    color: function (param) {
                                        return (param.data[0].value.colorValue);
                                    },
                                    borderWidth: 3,
                                    lineStyle: {
                                        type: 'solid',
                                        width: 3,
                                        shadowBlur: 10
                                    },
                                    label: {show: false, value: '天河城'}
                                }
                            },

                            data: [
                                [{name: 'p1'}, {name: 'p2', value: {colorValue: 'gold'}}],
                                [{name: 'p2'}, {name: 'p3', value: {colorValue: 'gold'}}],
                                [{name: 'p3'}, {name: 'p4', value: {colorValue: 'gold'}}],
                                [{name: 'p4'}, {name: 'p5', value: {colorValue: 'gold'}}],
                                [{name: 'p5'}, {name: 'p6', value: {colorValue: 'gold'}}],
                                [{name: 'p6'}, {name: 'p7', value: {colorValue: 'gold'}}],
                                [{name: 'p7'}, {name: 'p8', value: {colorValue: 'gold'}}],
                                [{name: 'p8'}, {name: 'p9', value: {colorValue: 'gold'}}],
                                [{name: 'p9'}, {name: 'p10', value: {colorValue: 'gold'}}],
                                [{name: 'p10'}, {name: 'p11', value: {colorValue: 'gold'}}],
                                [{name: 'p11'}, {name: 'p12', value: {colorValue: 'gold'}}],
                                [{name: 'p12'}, {name: 'p13', value: {colorValue: 'gold'}}],
                                [{name: 'p13'}, {name: 'p14', value: {colorValue: 'gold'}}],
                                [{name: 'p14'}, {name: 'p15', value: {colorValue: 'gold'}}]
                            ]
                        },
                        markPoint: {
                            symbol: 'image://./image/location.svg',
                            symbolSize: function (v) {
                                return v / 5
                            },
                            effect: {
                                show: true,
                                type: 'bounce',
                                period: 3,
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                    },
                                },
                                emphasis: {
                                    label: {
                                        show: false,
                                    },
                                },
                            },
                            //设置起始点与终点提示
                            data: [
                                {
                                    name: 'p1', value: 50,
                                    tooltip: {
                                        formatter: '时间:8:30am<br/>出发地:中海锦城南苑'
                                    },
                                },
                                {
                                    name: 'p16', value: 100,
                                    tooltip: {
                                        formatter: '天河城<br/>经度:113.328755<br/>纬度:23.137588'
                                    },
                                },
                                {
                                    name: 'p15', value: 50,
                                    tooltip: {
                                        formatter: '时间:10:00am<br/>目的地:富力盈隆广场'
                                    },
                                },
                            ],
                        },
                        geoCoord: {
                            /*'p1':[113.317568,23.135959],
                            'p2':[113.317783,23.135278],
                            'p3':[113.321489,23.135432],
                            'p4':[113.321525,23.135282],
                            'p5':[113.321592,23.13517],
                            'p6':[113.321799,23.135083],
                            'p7':[113.322158,23.135141],
                            'p8':[113.322374,23.135378],
                            'p9':[113.321992,23.135847],
                            'p10':[113.322243,23.13949],
                            'p11':[113.322396,23.1397],
                            'p12':[113.328163,23.13943],
                            'p13':[113.334945,23.139033],
                            'p14':[113.334658,23.133217],
                            'p15':[113.33313,23.13222],
                            'p16':[113.328755, 23.137588]*/
                            'p1': [120.259892, 30.324162],
                            'p2': [120.141111, 30.333951],
                            'p3': [120.154891, 30.265311],
                            'p4': [120.197461, 30.233011],
                            'p5': [120.154771, 30.261311],
                            'p6': [120.136391, 30.295331],
                            'p7': [120.136391, 30.295331],
                            'p8': [120.136391, 30.295331],
                            'p9': [120.136391, 30.295331],
                            'p10': [120.136391, 30.295331],
                            'p11': [120.179131, 30.285541],
                            'p12': [120.154771, 30.261311],
                            'p13': [120.175361, 30.245321],
                            'p14': [120.154891, 30.265311],
                            'p15': [120.225731, 30.276371],
                            'p16': [30.280511, 120.219231]
                        }
                    },


                    {
                        name: '逛街购物轨迹(乙,丙)',
                        type: 'map',
                        mapType: 'none',
                        data: [],

                        markLine: {
                            Symbol: ['none', 'arrow'],
                            symbolSize: ['0', '0.1'],
                            smooth: true,
                            smooth: 20,
                            effect: {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle: {
                                color: 'red',
                                normal: {
                                    color: function (param) {
                                        return (param.data[0].value.colorValue);
                                    },
                                    borderWidth: 3,
                                    lineStyle: {
                                        type: 'solid',
                                        width: 3,
                                        shadowBlur: 10
                                    },
                                    label: {show: false, value: '天河城'}
                                }
                            },

                            data: [
                                [{name: 's1'}, {name: 's2', value: {colorValue: 'gold'}}],
                                [{name: 's2'}, {name: 's3', value: {colorValue: 'gold'}}],
                                [{name: 's3'}, {name: 's4', value: {colorValue: 'gold'}}],
                                [{name: 's4'}, {name: 's10', value: {colorValue: 'gold'}}],
                                [{name: 's10'}, {name: 's11', value: {colorValue: 'gold'}}],
                                [{name: 's5'}, {name: 's6', value: {colorValue: 'gold'}}],
                                [{name: 's6'}, {name: 's7', value: {colorValue: 'gold'}}],
                                [{name: 's7'}, {name: 's8', value: {colorValue: 'gold'}}],
                                [{name: 's8'}, {name: 's9', value: {colorValue: 'gold'}}],
                                [{name: 's9'}, {name: 's10', value: {colorValue: 'gold'}}],
                                [{name: 's10'}, {name: 's11', value: {colorValue: 'gold'}}],
                            ]
                        },
                        markPoint: {
                            symbol: 'emptyCircle',
                            symbolSize: function (v) {
                                return v / 5
                            },
                            effect: {
                                show: true,
                                type: 'scale',
                                period: 10,
                                color: 'gold',
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                    },
                                },
                                emphasis: {
                                    label: {
                                        show: false,
                                    },
                                },
                            },
                            data: [
                                {
                                    name: 's1', value: 50,
                                    tooltip: {
                                        formatter: '小乙<br/>时间:8:30am<br/>出发地:东兴小区'
                                    },
                                },
                                {
                                    name: 's5', value: 50,
                                    tooltip: {
                                        formatter: '小丙<br/>时间:8:10am<br/>出发地:冼村'
                                    },
                                },
                                {
                                    name: 's10', value: 50,
                                    //tooltip:{
                                    //   formatter:'目的地天河城<br/>经度:113.328755<br/>纬度:23.137588'
                                    //},
                                },
                                {
                                    name: 's11', value: 100,
                                    tooltip: {
                                        formatter: '时间:10:00am<br/>目的地:天河城购物广场<br/>小乙与小丙成功会合<br/>开始一天的逛街之旅'
                                    },
                                },
                            ],
                        },
                        geoCoord: {
                            's1': [113.319283, 23.129146],
                            's2': [113.321817, 23.129877],
                            's3': [113.32776, 23.129612],
                            's4': [113.328069, 23.136798],
                            's5': [113.336953, 23.131398],
                            's6': [113.336163, 23.132711],
                            's7': [113.331384, 23.132976],
                            's8': [113.330916, 23.132212],
                            's9': [113.330701, 23.13681],
                            's10': [113.329749, 23.137463],
                            's11': [113.328976, 23.137949],
                        }
                    },

                ]
            };


            var myChart = BMapExt.initECharts(container);
            window.onresize = myChart.onresize;
            BMapExt.setOption(option);
        }
    );
})();
function genData() {
    var nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
    var legendData = [];
    var seriesData = [];
    for (var i = 0; i < 50; i++) {
        var name = Math.random() > 0.65
            ? makeWord(4, 1) + '·' + makeWord(3, 0)
            : makeWord(2, 1);
        legendData.push(name);
    }

    return {
        legendData: legendData,
        seriesData: $.getJSON("js/traj-data.json")
    };

    function makeWord(max, min) {
        var nameLen = Math.ceil(Math.random() * max + min);
        var name = [];
        for (var i = 0; i < nameLen; i++) {
            name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        }
        return name.join('');
    }
}

