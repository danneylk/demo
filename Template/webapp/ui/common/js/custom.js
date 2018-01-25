/*dialog2.0配置参数start***************************************************/
var dialog2alertFunName = "alert";
var dialog2errorFunName = "error";
var dialog2successFunName = "success";
var dialog2confirmFunName = "confirm";
var dialog2dialogFunName = "dialog";
/*dialog2.0配置参数end***************************************************/

/*登录配置*/
var noLoginCode = "4002";
var userLoginUrl = "http://127.0.0.1/ptyhzx-dlzc/";

/*图片地址*/
var imageUrl = "http://112.124.119.179:8089/";


//图片加载失败
function getInitialImg(obj, img){
	if(!img){
		img = "http://" + apphost + "/webapp/ui/common/images/default_logo.png";
	}else{
		img = "http://" + apphost + "/webapp/ui/" + img;
	}
	obj.src= img;
}

/* 日期框样式配置参数start***************************************************/
var datebackcolor = "#fafafa" // 日期框背景颜色
var dateboxboder = "0px solid #999999" // 日期框边框颜色
var hourselectcolor = "#5b9ce8" // 小时选中颜色
var minuteselectcolor = "#5b9ce8" // 分钟选中颜色
var secondselectcolor = "#5b9ce8" // 秒选中颜色
var premonthdatecolor = "#cccccc" // 上月日期数字颜色
var currentmonthweekcolor = "#f00" // 本月周末日期数字颜色
var weekbackcolor = "#fafafa" // 星期背景色
var monthselectcolor = "#5b9ce8" // 月选中颜色
var yearselectcolor = "#5b9ce8" // 年选中颜色
/*日期框样式配置参数end***************************************************/
/*下拉框 配置参数end***************************************************/
var selectbackgroundcolor = "#5b9ce8"// 被选中的背景颜色
var selecttextcolor= "#ffffff" // 被选中的文字颜色
var unselecttextcolor= "#000000" // 未被选中的文字颜色
var selectboxbackgroundcolor= "#FFFFFF" // 码表选择区背景颜色
/*下拉框 样式配置参数end***************************************************/

//滑动时靠顶
$(document).scroll(function() {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	scrollTop > 30 ? $('.o-btnBox').addClass('tabfixed') : $('.o-btnBox').removeClass('tabfixed');
})

$(document).scroll(function() {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	scrollTop > 30 ? $('.leftmunu ul').addClass('tabfixed') : $('.leftmunu ul').removeClass('tabfixed');
})

function gotoPage(url) {
	window.location.href = url
}

// 美化滚动条 需要在main.js 之前引入jquery.nicescroll.js
$(document).ready(
		function() {
			if (!$.nicescroll) {
				return
			}else{
				$("html").niceScroll({
					cursorcolor: "#666",
					autohidemode: false,
					background: "#cccccc",
					cursorborder: "0px solid #fff",
					spacebarenabled: true,
					railpadding: {
						top: 0,
						right: 2,
						left: 0,
						bottom: 0
					},
					grabcursorenabled: true
				});
			}
			// 查询区，更多查询按钮
			if($("#moreSearch")) {
				$("#moreSearch").click(function() {
					$("#moreSearch").toggleClass("more", "slow");
					$(".moreSearch").toggle("fast");
				})
			}
		})
//下拉框插件
function initSelectInput(key, obj) {
	if(key) {
		var keyArr = key.split('_');
		var keyArr_key = keyArr[1].toUpperCase();
	}
	var _mbList = [];
	if(typeof obj == "object") {
		for(var i = 0; i < obj.length; i++) {
			var temp = {
				"code": obj[i].code,
				"codedesc": obj[i].name
			};
			_mbList.push(temp);
		}
	}
	store.set(keyArr_key, JSON.stringify(_mbList));
	selecttextInfo();
}

// 右侧，返回顶部
var fhdbbox;
var fhdb = "<div id='totop'>返回顶部</div>";
$(window).load(function() {
	if(fhdbbox != false) {
		$(document.body).append(fhdb);
	}
});
$(function() {
	$(function() {
		$(window).scroll(function() {
			if($(window).scrollTop() > 50) {
				$("#totop").fadeIn();
			} else {
				$("#totop").fadeOut();
			}
		});
		$("body").on('click',"#totop", function() {
			$('body,html').animate({
				scrollTop: 0
			}, 200);

		});
	});
});

//wuitab切换代码
(function($){
		$.fn.wuitab=function(mouse){
		var TabNav=$(this).find('.tabBar>span')	
		var TabCon=$(this).find(".tabCon")
		TabNav.on(mouse,function(){
			var index=$(this).index();
			$(this).addClass('current').siblings().removeClass('current');
			TabCon.eq(index).css('display','block').siblings('.tabCon').hide()
		})
		}
})($)