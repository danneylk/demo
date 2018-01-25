


window.onload=function(){
	GetUserName()
	
//编辑当前选中课件
$('body').on("click",".beike_bottom_bianj",function(){
	var  li_id=$(this).parents('li').attr('id');
	alert("编辑当前ID"+li_id+"内容")
})
//删除当前选中课件
$('body').on("click",".beike_bottom_shanchu",function(){
	var  li_=$(this).parents('li')
	var  li_id=$(this).parents('li').attr('id');
	alert("删除当前ID"+li_id+"内容")
li_.remove()
})

	
}
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
//退出
function SignOut(){
	alert("退出系统")
}

//刷新页面
function reload_html(){
	window.location.reload();
}
//移动至
function MoveTo(){
	alert("移动至")
	
}
//导出课件包
function Export(){
	alert("导出课件包")
}
//发送给学生
function SendTo(){
	alert("发送给学生")
}

//选择教材book
//学科 Subject 
//版本 Edition
//年级 Grade
//教材 MaterialIDID	
//[01]教材目录 学科-版本-年级-教材
function book(){
MaterialMenu=[
    {"Subject": "A语文", 
        "Edition": [
            {
                "name": "B北京师范大学",
                "submenu": [
                    {
                        "name": "C1年级",
                        "submenu": [
                            {
                                "name": "D语文一年级北师大上册",
                                "MaterialID":"Material1",      
                            },
                             {
                                "name": "D语文一年级北师大中册",
                                "MaterialID":"Material2",     
                            }
                
                        ]
                    },
                      {
                        "name": "C2年级",
                        "submenu": [
                            {
                                "name": "D语文2年级北师大上册",
                                "MaterialID":"Material2",      
                            },
                             {
                                "name": "D语文2年级北师大中册",
                                "MaterialID":"Material3",     
                            },
                             {
                                "name": "D北师2年级大下册",
                                "MaterialID":"Material4",                                
                            }
                        ]
                    },
                      {
                        "name": "C3年级",
                        "submenu": [
                            {
                                "name": "D语文3年级北师大上册",
                                "MaterialID":"Material5",      
                            },
                             {
                                "name": "D语文3年级北师大中册",
                                "MaterialID":"Material6",     
                            },
                             {
                                "name": "D语文3年级北师大下册",
                                "MaterialID":"Material7",
                                
                            }
                        ]
                    }
                ]
            },
            {
                "name": "B北京出版社",
                "submenu": [
                    {
                        "name": "一年级",
                        "submenu": [
                            {
                                "name": "D语文一年级北出上册",
                                "MaterialID":"Material8",      
                            },
                             {
                                "name": "D语文一年级北出中册",
                                "MaterialID":"Material9",     
                            },
                             {
                                "name": "D语文一年级北出下册",
                                "MaterialID":"Material10",
                                 
                            }
                        ]
                    },
                      {
                        "name": "二年级",
                        "submenu": [
                            {
                                "name": "D语文二年级北出上册",
                                "MaterialID":"Material11",      
                            },
                             {
                                "name": "D语文二年级北出中册",
                                "MaterialID":"Material12",     
                            },
                             {
                                "name": "D语文二年级北出下册",
                                "MaterialID":"Material13",                  
                            }
                        ]
                    }
                ]
            },
               {
                "name": "B河北教育出版社",
                "submenu": [
                    {
                        "name": "C一年级",
                        "submenu": [
                            {
                                "name": "D语文一年级河北教育出上册",
                                "MaterialID":"Material14",      
                            },
                             {
                                "name": "D语文一年级河北教育出中册",
                                "MaterialID":"Material15",     
                            },
                             {
                                "name": "D语文一年级河北教育出下册",
                                "MaterialID":"Material16",
                                 
                            }
                        ]
                    },
                      {
                        "name": "C二年级",
                        "submenu": [
                            {
                                "name": "D语文二年级河北教育出上册",
                                "MaterialID":"Material17",      
                            },
                             {
                                "name": "D语文二年级河北教育出上册",
                                "MaterialID":"Material18",     
                            },
                             {
                                "name": "D语文二年级河北教育出上册",
                                "MaterialID":"Material19",
                            }
                        ]
                    }
                ]
            },
        ]
    },
 //////学科
      {"Subject": "A数学", 
        "Edition": [
            {
                "name": "B河南师范大学",
                "submenu": [
                    {
                        "name": "C1数学一年级",
                        "submenu": [
                            {
                                "name": "D数学一年级北师大上册",
                                "MaterialID":"Material20",      
                            },
                             {
                                "name": "D数学一年级北师大中册",
                                "MaterialID":"Material21",     
                            },
                             {
                                "name": "D数学北师一年级大下册",
                                "MaterialID":"Material22",                                
                            }
                        ]
                    },
                      {
                        "name": "C数学二年级",
                        "submenu": [
                            {
                                "name": "D数学二年级北师大上册",
                                "MaterialID":"Material23",      
                            },
                             {
                                "name": "D数学二年级北师大中册",
                                "MaterialID":"Material24",     
                            },
                             {
                                "name": "D数学二年级北师大下册",
                                "MaterialID":"Material25",
                                 
                            }
                        ]
                    }
                ]
            },
            {
                "name": "B北京出版社",
                "submenu": [
                    {
                        "name": "数学一年级",
                        "submenu": [
                            {
                                "name": "D数学一年级北出上册",
                                "MaterialID":"Material26",      
                            },
                             {
                                "name": "D数学一年级北出中册",
                                "MaterialID":"Material27",     
                            },
                             {
                                "name": "D数学一年级北出下册",
                                "MaterialID":"Material28",
                                 
                            }
                        ]
                    },
                      {
                        "name": "数学二年级",
                        "submenu": [
                            {
                                "name": "D数学二年级北出上册",
                                "MaterialID":"Material29",      
                            },
                             {
                                "name": "D数学二年级北出中册",
                                "MaterialID":"Material30",     
                            },
                             {
                                "name": "D数学二年级北出下册",
                                "MaterialID":"Material31",                                
                            }
                        ]
                    }
                ]
            },
              
        ]
    },
];
return MaterialMenu;
}

//[02]课本目录
function GetTextMenu(mulu){	
mulu=[
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
                "kejianID":"kejian3",
                 
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

return eval(mulu)

}

//[03]课本内容
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
