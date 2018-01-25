$(function(){
	 $(document).ajaxComplete(function(event,xhr,options){
		 if(xhr.responseText == noLoginCode){
			 //window.location.href="http://120.26.80.59/opcenter-consumer/page/zcdl/login.html";
			 // 当前窗体
			 var childWin = window.location.href;
			 // 父级窗体
			 var parentWin = window.parent.location.href;
			 // 判断是否有打开子窗体
			 var redirectUrl = encodeURIComponent(parentWin);
			 if (childWin != parentWin) {
				 window.parent.location.href = userLoginUrl + "app/jsp/main/login.html?redirectURL=" + redirectUrl;
				 //window.parent.location.href = manager.consumerLoginPath + "page/zcdl/login.html";
			 } else {
				 window.location.href = userLoginUrl + "app/jsp/main/login.html?redirectURL=" + redirectUrl;
				 //window.location.href = manager.consumerLoginPath + 'page/zcdl/login.html';
			 }
		 }
	 });
});