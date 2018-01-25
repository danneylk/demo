//获取用户名
function GetUserName(){
	//获取user_name
	var UserName='user_name';	
	$(".usename").html(UserName)
}

//返回首页
function Returnhome(){
	window.location.href="home.html";
}
//系统最小化
function SystemMinimization(){
	alert("系统最小化")
	
}
//实物投影
function Physicalprojection(){
	alert('实物投影')
}

//智慧课堂
function Intelligentclassroom(){
	alert("智慧课堂")
}

//[01]教材选择Teaching Selection
//mulujson 对应GetTextMenu()testMenu testMenu1 testMenu…
function TeachingSelection(){	
	teaching=[{"name":"教材",
                    "munu": [ 
                    { "name": "人民出版社语文", "mulujson": "testMenu" },
                    { "name": "内蒙古版社语文", "mulujson": "testMenu1" },
                    { "name": "湖南版社语文", "mulujson": "testMenu2" },
                    { "name": "河北出版社语文", "mulujson": "testMenu3" },
                    { "name": "中国出版社语文", "mulujson": "testMenu4" },
                    { "name": "人民出版社语文", "mulujson": "testMenu5" } 
                ]}]		
	return teaching;	
}
//[02]教材目录
function GetTextMenu(mulu){	
testMenu=[
    {
        "name": "111111级菜单",
        "submenu": [
            {
                "name": "111B1级菜单",
                "kejianID":"kejian1",
                 
            },
            {
                "name": "111B2级菜单",
                "kejianID":"kejian2",
                 
            }
        ]
    },
    {
        "name": "111A级菜单", 
        "submenu": [
            {
                "name": "111B1级菜单",
                "kejianID":"",
                 
            },
            {
                "name": "B2111级菜单",
                "submenu": [
                    {
                        "name": "C1111级菜单",
                        "submenu": [
                            {
                                "name": "D111级菜单",
                                "kejianID":"",
                                 
                            }
                        ]
                    },
                    {
                        "name": "C111级菜单",
                        "kejianID":"",
                         
                    }
                ]
            },
            {
                "name": "B3111级菜单",
                "kejianID":"",
                 
            },
            {
                "name": "B4111级菜单",
                "submenu": [
                    {
                        "name": "C111级菜单",
                        "submenu": [
                            {
                                "name": "D111级菜单",
                                   "submenu": [
                                    {
                                        "name": "1E111级菜单",
                                        "kejianID":"",
                                         
                                    },
                                    {
                                        "name": "1E111级菜单",
                                        "kejianID":"",
                                         
                                    }
                                ]
                            },
                            {
                                "name": "D111级菜单",
                                "submenu": [
                                    {
                                        "name": "2E111级菜单",
                                        "kejianID":"",
                                         
                                    },
                                    {
                                        "name": "2E111级菜单",
                                        "kejianID":"",
                                         
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "C111级菜单",
                        "kejianID":"",
                         
                    }
                ]
            },
            {
                "name": "B5111级菜单",
                "kejianID":"",
                 
            }
        ]
    },
];
testMenu1=[
    {
        "name": "2222级菜单",
        "submenu": [
            {
                "name": "B1级菜单",
                "kejianID":"kejian3",
                 
            },
            {
                "name": "B2级菜单",
                "kejianID":"kejian4",
                 
            }
        ]
    },
    {
        "name": "A级菜单", 
        "submenu": [
            {
                "name": "B1级菜单",
                "kejianID":"",
                 
            },
            {
                "name": "B2级菜单",
                "submenu": [
                    {
                        "name": "C1级菜单",
                        "submenu": [
                            {
                                "name": "D级菜单",
                                "kejianID":"",
                                 
                            }
                        ]
                    },
                    {
                        "name": "C级菜单",
                        "kejianID":"",
                         
                    }
                ]
            },
            {
                "name": "B3级菜单",
                "kejianID":"",
                 
            },
            {
                "name": "B4级菜单",
                "submenu": [
                    {
                        "name": "C级菜单",
                        "submenu": [
                            {
                                "name": "D级菜单",
                                   "submenu": [
                                    {
                                        "name": "1E级菜单",
                                        "kejianID":"",
                                         
                                    },
                                    {
                                        "name": "1E级菜单",
                                        "kejianID":"",
                                         
                                    }
                                ]
                            },
                            {
                                "name": "D级菜单",
                                "submenu": [
                                    {
                                        "name": "2E级菜单",
                                        "kejianID":"",
                                         
                                    },
                                    {
                                        "name": "2E级菜单",
                                        "kejianID":"",
                                         
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "C级菜单",
                        "kejianID":"",
                         
                    }
                ]
            },
            {
                "name": "B5级菜单",
                "kejianID":"",
                 
            }
        ]
    },
];
testMenu2=[
    {
        "name": "333级菜单",
        "submenu": [
            {
                "name": "B1级菜单",
                "kejianID":"kejian1",
                 
            },
            {
                "name": "B2级菜单",
                "kejianID":"kejian2",
                 
            }
        ]
    },
    {
        "name": "A级菜单", 
        "submenu": [
            {
                "name": "B1级菜单",
                "kejianID":"",
                 
            },
            {
                "name": "B2级菜单",
                "submenu": [
                    {
                        "name": "C1级菜单",
                        "submenu": [
                            {
                                "name": "D级菜单",
                                "kejianID":"",
                                 
                            }
                        ]
                    },
                    {
                        "name": "C级菜单",
                        "kejianID":"",
                         
                    }
                ]
            },
            {
                "name": "B3级菜单",
                "kejianID":"",
                 
            },
            {
                "name": "B4级菜单",
                "submenu": [
                    {
                        "name": "C级菜单",
                        "submenu": [
                            {
                                "name": "D级菜单",
                                   "submenu": [
                                    {
                                        "name": "1E级菜单",
                                        "kejianID":"",
                                         
                                    },
                                    {
                                        "name": "1E级菜单",
                                        "kejianID":"",
                                         
                                    }
                                ]
                            },
                            {
                                "name": "D级菜单",
                                "submenu": [
                                    {
                                        "name": "2E级菜单",
                                        "kejianID":"",
                                         
                                    },
                                    {
                                        "name": "2E级菜单",
                                        "kejianID":"",
                                         
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "C级菜单",
                        "kejianID":"",
                         
                    }
                ]
            },
            {
                "name": "B5级菜单",
                "kejianID":"",
                 
            }
        ]
    },
];

return eval(mulu)

}

//[03]教材内容
//kejian1对应 GetTextMenu() kejianID
function CoursewareCont(Courseware){
kejian1={
			"kejian": [
			{ "firstName":"三年级二班地理第第十课时15", "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId001","index":"1"}		
			]}  
kejian2={
			"kejian": [
			{ "firstName":"kejian2" , "img_min":"../../../ui/qt/images/u283.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId","index":"1" },
			{ "firstName":"三年级二班地理第三章第五课时2" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId1","index":"2"  },
			{ "firstName":"三年级二班地理第三章第十课时3" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId2" ,"index":"3" },
			{ "firstName":"三年级二班地章第五节第十课时4" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m" ,"resourcesdizhi":"sjcq.html","resourcesId":"resourcesId3","index":"4" },
			{ "firstName":"三年级二班地理第三章第5" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId4","index":"5"  },
			{ "firstName":"三年级二班地章第五节第十课时6" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId5","index":"6"  },
			{ "firstName":"三年级地理第三章第五节第十课时7" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId6","index":"7"  },
			{ "firstName":"三年级二班地理第节第十课时8" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId7","index":"8"  },
			{ "firstName":"三年级二班第三章第五节第十9" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId8","index":"9"  },
			{ "firstName":"三年级二班第三章第五节第十10" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId9","index":"10"  },
			{ "firstName":"三年级二班地理第第十课时11" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId10","index":"11"  },
			{ "firstName":"三年级二班地理第第十课时12" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId11","index":"12"  },
			{ "firstName":"三年级二班地理第第十课时13" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html" ,"resourcesId":"resourcesId12","index":"13" },
			{ "firstName":"三年级二班地理第第十课时14" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId13","index":"14"  },
			{ "firstName":"三年级二班地理第节第十课时8" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId14","index":"15"  },
			{ "firstName":"三年级二班第三章第五节第十9" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html" ,"resourcesId":"resourcesId15","index":"16" },
			{ "firstName":"三年级二班地理第第十课时15" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId16","index":"17"  }		
			]} 			
kejian3={
			"kejian": [
			{ "firstName":"kejian2" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId1","index":"1"  },
			{ "firstName":"三年级二班地理第第十课时15" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId2","index":"2"  }		
			]}  
kejian4={
			"kejian": [
			{ "firstName":"kejian4" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId1","index":"1"  },
			{ "firstName":"kejian1[01]" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId2","index":"2"  },
			{ "firstName":"kejian1[02]" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u83.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId3","index":"3" },
			{ "firstName":"三年级二班地理第第十课时15" , "img_min":"../../../ui/qt/images/u261.png" , "img":"../../../ui/qt/images/u85.png","time":"2017.03.04","size":"20m","resourcesdizhi":"sjcq.html","resourcesId":"resourcesId4","index":"4"}		
			]}  			
return eval(Courseware)

}
