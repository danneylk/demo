//用户信息
$(function(){

//用户名
GetUserName()
function GetUserName(){
	//获取user_name
	var UserName='user_name';	
	$(".home_user .usename").html(UserName)
}

//跳转到备课
function Lesson(){
	window.location.href='http://192.168.17.160:8020/A19-Teaching/webapp/app/jsp/qt/beike.html';
}

})


//系统最小化
function SystemMinimization(){
	alert("系统最小化")
	
}


//退出
function SignOut(){
	alert("退出系统")
}

//家庭作业
function Homework(){
	alert("家庭作业")
}

//学情分析
function Learning(){
	alert("学情分析")
}
//班级管理
function ClassManagement(){
	alert("班级管理")
}

//考试测评
function ExaminationEvaluation(){
	alert("考试测评")
}

//系统设置
function SystemSetting(){
	alert("系统设置")
}
