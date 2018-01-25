

// 课件列表
//获取授课页面传来的课件目录id
CoursewareList()
function CoursewareList(){
	var kejianmulu='kejian2'
	var CoursewareMunu=CoursewareCont(kejianmulu);  	
	var li_html="";
	for (var i=0;i<CoursewareMunu.kejian.length;i++) {
		  li_html +='<li'+ 
		            ' '+
				 	'id="'+
				 	CoursewareMunu.kejian[i].resourcesId+
				 	'"><span>'+
				 	'<img src="'+
				 	CoursewareMunu.kejian[i].img_min+
				 	'"></span><p>'+
				 	CoursewareMunu.kejian[i].firstName+
				 	'</p></li>'
			}
		$(".cont_scroll ul").html(li_html);
	console.log(CoursewareMunu.kejian[0].img_min)
}

//实物投影
function Physicalprojection(){
	alert('实物投影')
}
//二维码
function QrCode(){
	alert('二维码')
	
}
//学科演示工具
function SubjectDemonstration(){
	alert('学科演示工具')
}

//系统最小化
function SystemMinimization(){
	alert("系统最小化")	
}

//退出
function SignOut(){
	alert("退出系统")
}

//随机答
//班级选择 学生选择
//grade[1,2,3...]  grade年级 cla班级 Student学生
function ClassJson(){
	classJson={
		"grade1":[{  "grade": [{ "grade":"一年级" },],  
		 	          "cla": [{ "class_name":"一班" },],
			          "Student": [{ "firstName":" tu001" , "src":"../../../ui/qt/images/header01.jpg" }, 
			                      {"firstName":" tu004" , "src":"../../../ui/qt/images/header01.jpg" }]},               
			                    {
			                    "cla": [{ "class_name":"二班" },], 
			          "Student": [{ "firstName":"一年级二班stu001" , "src":"../../../ui/qt/images/header01.jpg" }, 
			                         {"firstName":"一年级二班stu004" , "src":"../../../ui/qt/images/header01.jpg" }]},  
			                    {
			                   "cla": [{ "class_name":"三班" },], 
			          "Student": [{ "firstName":"一年级三班stu001" , "src":"../../../ui/qt/images/header01.jpg" },			                     
			                      {"firstName":"一年级三班stu004" , "src":"../../../ui/qt/images/header01.jpg" }]},  
			                             
			                    {
			                   "cla": [{ "class_name":"四班" },], 
			          "Student": [{ "firstName":"一年级四班stu001" , "src":"../../../ui/qt/images/header01.jpg" }, 			                         
			                         {"firstName":"一年级四班stu004" , "src":"../../../ui/qt/images/header01.jpg" }]},  
						    ],
						    
		"grade2":[{   "grade": [{ "grade":"二年级" },],			   	
			   	               "cla": [{ "class_name":"一班" },],
			               "Student": [{ "firstName":"二年级一班stu001" , "src":"../../../ui/qt/images/header01.jpg" }, 
			                           {"firstName":"二年级一班stu004" , "src":"../../../ui/qt/images/header04.jpg" }]},  
			                    {
			                    "cla": [{ "class_name":"二班" },],
			                  "Student": [{ "firstName":"二年级二班stu001" , "src":"../../../ui/qt/images/header01.jpg" },
			                              {"firstName":"二年级二班stu004" , "src":"../../../ui/qt/images/header01.jpg" }]},          
			                    {
			                    "cla": [{ "class_name":"三班" },],
			          "Student": [{ "firstName":"二年级三班stu001" , "src":"../../../ui/qt/images/header01.jpg" },
			                         {"firstName":"二年级三班stu004" , "src":"../../../ui/qt/images/header01.jpg" }]},  
			                    {
			                  "cla": [{ "class_name":"四班" },],
			          "Student": [{ "firstName":"二年级四班stu001" , "src":"../../../ui/qt/images/header01.jpg" },			                        
			                         {"firstName":"二年级四班stu004" , "src":"../../../ui/qt/images/header01.jpg" }]},  
						    ]	
						    
						    
	}
	return classJson;
}
