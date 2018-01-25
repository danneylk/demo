//
//function CoursewareJson(kejianjson){
//	CoursewareCont(kejianjson);
//	
//}
function GetCoursewareJson(kejian){
	CoursewareCont(kejian)	
	Coursewareconter(kejian)
}
var kejian=CoursewareCont(kejian);
function Coursewareconter(kejian){	
	$(".swiper-wrapper").children().remove()
	json_length=kejian.kejian.length;
	console.log(json_length)
	var tab_num = Math.ceil(json_length/4) //除4向上取整	
	var a = kejian.kejian
	if(json_length > 2) {	
		if($( ".swiper-container:has(two_style)")||$( ".swiper-container:has(one_style)")){
			var swiper_container_html='<div class="swiper-wrapper"></div>' +
			        '<div class="swiper-pagination"></div>'+
			        '<div class="swiper-button-next"></div>'+
			        '<div class="swiper-button-prev"></div>'
	      $(".swiper-container").html(swiper_container_html) 
		}	      			
		for(var i = 0; i < tab_num; i++) {				
			var waper = $('<div class="swiper-slide"><div class="shouke"><div class="shouke_count"><ul class="more_style clear"></ul></div></div></div>')
			$(".swiper-wrapper").append(waper) //添加父级容器
			var arr = [];
			var start = ((i + 1) * 4) - 4; //截取开始值
			var end = ((i + 1) * 4); //截取结束值
			arr.length = 0; //清空身前数组
			arr.push(a.slice(start, end)) //截取0-3 4-7 8-11...添加到数组arr
			var thtml = "";
			for(var j = 0; j < arr[0].length; j++) {
				thtml += '<li id="'+
			       arr[0][j].resourcesId+
			      '"'+
			      'data="'+ 
			       arr[0][j].resourcesdizhi+
			      '"'+
			      'index="'+ 
			       arr[0][j].index+
					'"><img src="' +
					arr[0][j].img +
					'"/><h1>' +
					arr[0][j].firstName +
					'</h1><p><span>上传时间:' +
					arr[0][j].time +
					'</span><span>文件大小:' +
					arr[0][j].size +
					'</span></p></a></li>'			
			}
			$(".shouke_count ul").eq(i).html(thtml);
		}
		
			
   var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });
		
	} else if(json_length == 1) {
		$('.swiper-container').children().remove();
		var waper = '<ul class="one_style"></ul>'
		$(".swiper-container").append(waper) //添加父级容器
		var thtml = "";
		thtml += '<li id="'+
			      a[0].resourcesId+
			      '"'+
			      'data="'+ 
			      a[0].resourcesdizhi+
			      '"'+
			      'index="'+ 
			      a[0].index+
			  '"' +
			'><img src="' +
			a[0].img +
			'"/><h1>' +
			a[0].firstName +
			'</h1><p><span>上传时间:' +
			a[0].time +
			'</span><span>文件大小:' +
			a[0].size +
			'</span></p></li>'
		$(".swiper-container ul").html(thtml)
	} else if(json_length == 2) {
		$('.swiper-container').children().remove();
		console.log($(".swiper-container").html())
		var waper = '<ul class="two_style"></ul>'
		$(".swiper-container").html(waper) //添加父级容器	
		var thtml = "";
		for(var i = 0; i < 2; i++) {
			thtml += '<li id="'+
			      a[i].resourcesId+
			      '"'+
			      'data="'+ 
			      a[i].resourcesdizhi+
			      '"'+
			      'index="'+ 
			      a[i].index+
			  '"' +
				'><img src="' +
				a[i].img +
				'"/><h1>' +
				a[i].firstName +
				'</h1><p><span>上传时间:' +
				a[i].time +
				'</span><span>文件大小:' +
				a[i].size +
				'</span></p></li>'
		}
		$(".swiper-container ul").html(thtml)
	}
}



