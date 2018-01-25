var webApiAddress = "http://127.0.0.1:9023/";            //后台API地址
var webPageAddress = "http://127.0.0.1:9024/App/";       //Web页面访问地址 


//解析URL参数
function GetQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
// 共通请求方法(C端)
// requesturl 请求地址地址
// dataParam 参数
// requestType请求类型,无特殊情况此值传null
// successCallback 成功回调
// errorCallback 失败回调
function crossDomainAjaxForC(requesturl, dataParam, requestType, successCallback, errorCallback) {
	var ajaxtype = "";
	var ajaxurl = "";

	ajaxurl = webApiAddress + requesturl;
	ajaxtype = requestType;

	// 处理特殊请求类型
	if (requestType)
		ajaxtype = requestType.toUpperCase();
	var temp = new Date().getTime();

	if (requestType == "GET") { //Get操作
		// 处理参数
	    if (dataParam != "")
		    ajaxurl = ajaxurl + "?" + dataParam;

		$.ajax({
			type : "GET",
			url : ajaxurl,
			data : {},
			processData : false,
			contentType : false,
			success : function (data) {
				if (successCallback)
					successCallback.call('', data);
			},
			error : function (mess) {
				if (errorCallback)
					errorCallback.call('', mess);
			}
		});
	} else { //POST操作
		if (dataParam == undefined) {
			dataParam = "{[]}";
		}
		
		dataParam = JSON.stringify(dataParam);
		$.ajax({
			type : "POST",
			url : ajaxurl,
			async : false,
			dataType: 'JSON',
			data: dataParam,
			crossDomain : true,
			contentType : "application/json",
			success : function (data) {
				if (successCallback)
					successCallback.call('', data);
			},
			error : function (mess) {
				if (errorCallback)
					errorCallback.call('', mess);
			}
		});
	}
};
