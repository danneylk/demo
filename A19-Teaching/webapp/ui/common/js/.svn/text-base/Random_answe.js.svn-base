	
	//随机答
	//json key grade1 grade2 grade3 
	//grade年级
	//cla 班级
	//student firstname姓名 src头像
    var json=ClassJson()
    init(0,0);//页面数据预设默认json.grade[0].grade[0]
    var itemsNum = $(".items").length;//获取items个数
    var grade_num=JSONLength(json);//获取json..grade个数  
    console.log(grade_num)
    var grade=$(".grade")//班级容器
    var grade_class=$(".grade_class")//年级容器
    var gardnum="0";//年级默认设置//index()索引
    var classnum="";//
    
	//获取jsonkey的个数
	function JSONLength(obj) {
	var size = 0, key;
	for (key in obj) {
	if (obj.hasOwnProperty(key)) size++;
	}
	return size;
	};    
   
  ///////////////////////////////////////  
    $(".grade").on("click","li",function(){  
    	gardnum=$(this).index()//获取当前index();
    	$(this).addClass('active').siblings('li').removeClass('active')//选中样式切换
    	class_write_init(gardnum);//运行年级方法;
   
    })
 ////////////////////////////////////////////   
     $(".grade_class").on("click","li",function(){   
     	var classindex=$(this).index()
    	classnum=gardnum+"a"+classindex.toString()//获取年级与班级的组合
    	$(this).addClass('active').siblings('li').removeClass('active')//选中样式切换    	
    	if(classnum==gardnum+"a"+classindex.toString()){
    		var nianji=parseInt(classnum.split("a")[0]);
    		var banji=parseInt(classnum.split("a")[1])	
    		var nianjiname=json["grade"+(nianji+1)][0].grade[0].grade//获取年级的名字
    		var banjiname=json["grade"+(nianji+1)][banji].cla[0].class_name//获取班级的名字    
    $(".left-con h2").html(nianjiname+banjiname)
    init(nianji, banji);//重写班级数据
    var stunum=json["grade"+(nianji+1)][banji].Student.length;    
    itemsNumer(stunum)//预设头像显示样式
    itemsNum = $(".items").length;//重新获取items长度//
//for (var i=0;i<json["grade"+(nianji+1)][banji].Student.length;i++) {
//	console.log(json["grade"+(nianji+1)][banji].Student[i].firstName)
//}

    	}
})
    grade_write_init();//年级
    function grade_write_init() {
    	var grade_html = "";
    	for(var i = 0; i < grade_num; i++) {
    		grade_html += '<li>' + json["grade" + (i + 1)][0].grade[0].grade + '</li>';
    		console.log(grade_html)
    		grade.html(grade_html)
    	}
    	console.log(json.grade2.length)
    }
    class_write_init(0);//班级
	function class_write_init(gradenum){
	var grade_class_html="";
    for (var j=0;j<json["grade"+(gradenum+1)].length;j++){	
			grade_class_html +='<li>'+json["grade"+(gradenum+1)][j].cla[0].class_name+'</li>';	
					
	//console.log(json["grade"+(i+1)][j].cla[0].class_name)	
	}
	grade_class.html(grade_class_html)
	}
 $(".grade li").eq(0).addClass('active')//默认选中一年级
 $(".grade_class li").eq(0).addClass('active')//默认选中一班

//////////////////////////
	function init(nianji,banji){
		var i = 0;
		var a = 0;
		var _html = "";	
		$("#students").addClass("Morethan20");
		
		for (var i=0;i<json["grade"+(nianji+1)][banji].Student.length;i++) {			
			_html += '<div class="items"><div class="bg-black"></div>'+
			          '<img src="'+
			          json["grade"+(nianji+1)][banji].Student[i].src+
			          '"/><p>'+ 
			         json["grade"+(nianji+1)][banji].Student[i].firstName+
			          '</p></div>'
			
//	console.log(json["grade"+(nianji+1)][banji].Student[i].firstName)
}
		$("#students").html(_html);
	}
      //设置学生显示样式
	   function  itemsNumer(stunum) {							
				if(stunum >0 && stunum <= 40 ){
					console.log(2222)
					$("#students").removeClass('Morethan50').removeClass("Morethan40").addClass("Morethan20");
				}
				if(stunum> 40&& stunum <= 50 ){
					$("#students").removeClass('Morethan20').removeClass("Morethan50").addClass("Morethan40");
				}
				if(stunum> 50 ){
					$("#students").removeClass('Morethan20').removeClass("Morethan40").addClass("Morethan50");
					
				}
			}



 ///22222222222222222222/////循环选择		       
				var g_Interval = 40;//循环速度
				var g_Timer;
				var running = false;
			//开始循环选择
			function beginRndNum(){				
						running = true;
						clearTimeout(g_Timer)
						beginTimer();	
						console.log(2222)
					    $(".stop").addClass("addchose");
			}					
			//选择停止 append——box并写入内容
			function  stopRndNum(){					
					    running = false;
					clearTimeout(g_Timer);					
			if($(".stop").hasClass('addchose')){
			var num=updateRndNum();	//获取随机数	
			var box_img=$(".items").eq(num).find('img').attr('src');//获取学生头像
			var box_txt=$(".items").eq(num).find('p').html()//获取学生姓名
            var box_html = '<div class="tanchu">'+
							'<div class="tc-container">'+
								'<div class="line"></div>'+
								'<div class="content">'+
									'<div class="head">'+
										'<img src="'+
										box_img+
										'" />'+
										'<p>'+
										box_txt+
										'</p>'+
									'</div>'+
									'<div class="button">'+
										'<p>有请该同学来作答</p>'+
										'<a href="##" class="button_sure">确定</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
                            '<div class="tanchu_bg"></div>'+
						    '</div>'
					$('body').append(box_html);//添加box弹窗      
					           //弹窗动画配置					        
					    	$(".tanchu").show(100)
					      	$('.tc-container').animo({
					            animation: "bounceInDown",
					            duration:1,//持续时间
					            keep:true //只执行一次
					       })     						          
				$(".stop").removeClass("addchose");
				console.log(num)
				console.log(itemsNum)
					}else {
						 running = false;
						clearTimeout(g_Timer);	
						
					}
				}	
				//随机math 返回num//
				function updateRndNum(){
					var num = Math.floor(Math.random()*itemsNum);
					$(".items").eq(num).addClass('active').siblings().removeClass('active');
					return num;
				}				
				function beginTimer(){
					g_Timer = setTimeout(beat, g_Interval);
				}			
				function beat() {
					g_Timer = setTimeout(beat, g_Interval);
					updateRndNum();
				}
				//清除弹窗
				$("body").on("click",".button_sure",function(){
				      $('.tanchu').remove()
				});		
	
///////333333333333333333333333/班级切换

$(function() {
	$(".switch-class").on("click", function() {
		$(".tipes").show()

		$(".tipes .content").animo({ animation: "bounceInDown", duration: 1, keep: true })
	})
	$(".tipes i").on("click", function() {
		$(".tipes").hide(200)
		$(".tipes .content").animo({
			animation: "zoomOut",
			duration: 0.5, //持续时间
			keep: true //只执行一次
		})
	})
	$(".cclose").on("click", function() {
		$(".tipes").hide(200)
		$(".tipes .content").animo({
			animation: "zoomOut",
			duration: 0.5, //持续时间
			keep: true //只执行一次
		})
	})
})