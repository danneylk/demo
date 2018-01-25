var appAddress = getRequestAddressUrl("app"); //前端地址127.0.0.1 、192.168.253.1、ml.wd.com
var requestType = "app"; //请求类型 app原型；request系统
var mainPageTemplateId = "wd_templateId"; // 菜单切换模板id
var menuBox = 'hp-menu'; // 菜单容器表示，可以是id也可是样式但要保证唯一
var mainBox = 'hp-main-box'; // 页面主题容器表示，可以是id也可是样式但要保证唯一
var wd_back = new Array(); // 记录页面跳转信息
//////////////////////////////////////国际化定义变量start
var wd_language_msg_close_zh = "关闭";
var wd_language_msg_again_zh = "再试一次";
var wd_language_msg_dataloadeerror_zh = "数据加载失败";
//////////////////////////////////////国际化定义变量end
$(function() {
	/******************************************************* 获取提示旧版本信息，使用时将注释打开start ************************************/

	/******************************************************* 获取提示旧版本信息，使用时将注释打开end ************************************/
});
/******************************************************* 获取提示旧版本信息start ************************************/
// 获取提示信息old
function gettipmsg() {
	var language = getLanguageFromCookie("language");
	var json = "{";
	jQuery.i18n.properties({ //加载资浏览器语言对应的资源文件
		name: "common_tip", //资源文件名称
		path: appAddress + "app/i18n/common/", //资源文件路径
		language: language, //语言类型
		mode: 'map', //用Map的方式使用资源文件中的值
		callback: function() { //加载成功后设置显示内容
			for(var key in $.i18n.map) {
				var value = $.i18n.map[key];
				json = json + "'" + key + "':" + "'" + value + "',"
			}
			json = json.substring(0, json.length - 1) + "}";
			if(localStorage.getItem("tip") == null) {
				localStorage.setItem("tip", json);
			} else {
				var tmpjson = eval("(" + json + ")"); // 实时数据
				var tmpstor = eval("(" + localStorage.getItem("tip") + ")"); // 页面缓存

				if(parseInt(tmpjson.string_version) > parseInt(tmpstor.string_version)) {
					localStorage.setItem("tip", json);
				}
			}
		}
	});
}
// 根据key加载提示信息old
function getTipInfo(key) {
	if(!localStorage.getItem("tip")) gettipmsg();
	var json = eval("(" + localStorage.getItem("tip") + ")");
	return json[key];
};
/******************************************************* 获取提示旧版本信息end ************************************/
/******************************************************* 获取提示新版本信息start ************************************/
// 提示信息路径，回调方法，是否为后台返回方式（可为空）
function getTipMsgFromJs(url, fn, actionFlg) {
	if($("#wd-tip").length == 0) {
		var t = document.createElement('script');
		var tid = "wd-tip";
		t.src = appAddress + "app/msg/" + url // 测试地址
		t.type = 'text/javascript';

		//if (actionFlg) tid = "wd-actionTip";

		t.id = tid;
		document.getElementsByTagName('head')[0].appendChild(t);

		t.onload = function() {
			if(fn) fn.call();
		};
		// ie8处理
		t.onreadystatechange = function() {
			if(getBrowserVersionIE8())
				if(fn) fn.call();
		}
	} else {
		if(fn) fn.call();
	}
};
/******************************************************* 获取提示新版本信息end ************************************/
function getInternationalizationInfo(url) {
	var language = getLanguageFromCookie();
	var jsondata;
	if(store.get(url + language)) {
		jsondata = store.get(url + language);
	} else {
		$.ajax({
			type: "get",
			url: appAddress + "app/i18n/" + url + "_" + language + ".properties",
			async: false,
			success: function(data) {
				jsondata = eval("(" + data + ")");
				store.set(url + language, jsondata)
			}
		});
	}
	return jsondata;
};
// 判断浏览器版本是否为ie8
function getBrowserVersionIE8(flg) {
	var browser = navigator.appName
	var b_version = navigator.appVersion
	var version = b_version.split(";");
	var trim_Version = (version[1]) ? version[1].replace(/[ ]/g, "") : version[0].replace(/[ ]/g, "");
	if(browser == "Microsoft Internet Explorer" && trim_Version.toUpperCase().split('.')[0] == "MSIE8") {
		return true;
	} else {
		return false;
	}
};
// 获取浏览器版本
function getBrowserVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var version = "";
	var browsers = navigator.appName;
	var b_version = navigator.appVersion;
	var version = b_version.split(";");
	var trim_Version = (version[1]) ? version[1].replace(/[ ]/g, "") : version[0].replace(/[ ]/g, "");
	var isOpera = userAgent.indexOf("Opera") > -1;
	if(userAgent.indexOf("Opera") > -1) {
		return "Opera"
	} else if(userAgent.indexOf("Firefox") > -1) {
		return "FF";
	} else if(userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	} else if(userAgent.indexOf("Safari") > -1) {
		return "Safari";
	} else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		if(browsers == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
			version = "IE 6";
		} else if(browsers == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
			version = "IE 7";
		} else if(browsers == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
			version = "IE 8";
		} else if(browsers == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
			version = "IE 9";
		} else if(browsers == "Microsoft Internet Explorer" && trim_Version == "MSIE10.0") {
			version = "IE 10";
		}
	} else if(browsers = "Netscape" && trim_Version == "WOW64") {
		version = "IE 11";
	}
	return version;
};
// 判断是否为json对象
function checkJson(obj) {
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
	return isjson;
};
// 页面跳转方法
// openType打开方式
// targetId目标页面id
// boxId模板id
// headjsurl动态引用json地址
function pageChange(targetId, openType, headjsurl, parameters, languagedata) {
	if(checkJson(languagedata) && checkJson(parameters)) {
		languagedata = jsonjoin(languagedata, parameters);
	}

	if(!checkJson(languagedata) && checkJson(parameters)) {
		languagedata = parameters;
	}

	$("#multivaildateTip").hide();
	var jsarray = "";
	var cssarray = ""
	var url = "";
	var fn = "";
	$.ajax({
		type: "get",
		url: appAddress + headjsurl + "?time=" + new Date().getTime(),
		dataType: "json",
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i].pageid == targetId) {
					cssarray = data[i].cssurl;
					url = data[i].pageurl;
					fn = data[i].pagefun;
					jsarray = data[i].jsurlarray;
					break;
				}
			}
			switch(openType) {
				case "template":
					loadHeadJs(jsarray, cssarray, function() {
						getTemplate(url, mainPageTemplateId, function() {
							if(fn != "") {
								if(parameters) eval(fn).call('', parameters);
								else eval(fn).apply();
							}
						}, languagedata);
					});
					break;
				case "open":
					window.open(data[i].pageurl);
					break;
				case "location":
					window.location = data[i].pageurl;
					break;
			}
		}
	});
};

// 动态加载css
// url需加载css
// cssarray需要加载的集合
// num当前需要加载的位置
function addCss(url, cssarray, num) {
	// 处理重复加载
	if(document.getElementById(url) == null) {
		var t = document.createElement('link');
		t.href = appAddress + url; // 测试地址
		t.rel = 'stylesheet';
		t.className = "wd-headCss";
		t.id = url;
		document.getElementsByTagName('head')[0].appendChild(t);
	}
	num = num + 1;

	if(cssarray[num]) addCss(cssarray[num], cssarray, num);
}

// 动态加载js
// url需加载js
// jsarray需要加载的集合
// num当前需要加载的位置
// fn回调方法
function addJs(jsobj, jsarray, num, fn) {
	// 处理重复加载
	if(document.getElementById(jsobj.jsurl) == null) {
		var t = document.createElement('script');
		t.src = appAddress + jsobj.jsurl + "?version=" + jsobj.version;
		t.type = 'text/javascript';
		t.className = "wd-headJs";
		t.id = jsobj.jsurl;
		document.getElementsByTagName('head')[0].appendChild(t);
		num = num + 1;
		if(jsarray[num]) {
			t.onload = function() {
				addJs(jsarray[num], jsarray, num, fn);
			};
			// ie8处理
			t.onreadystatechange = function() {
				if(getBrowserVersionIE8())
					addJs(jsarray[num], jsarray, num, fn);
			}
		} else {
			t.onload = function() {
				if(fn) fn.call();
			};
		}
	} else {
		num = num + 1;
		if(jsarray[num]) {
			addJs(jsarray[num], jsarray, num, fn);
		} else {
			try {
				var browser = navigator.appName
				var b_version = navigator.appVersion
				var version = b_version.split(";");
				var trim_Version = version[1].replace(/[ ]/g, "");
				if(trim_Version.toUpperCase().split('.')[0] != "MSIE8") {
					if(fn) fn.call();
				}
			} catch(e) {
				if(fn) fn.call();
			}
		}
	}
}

// 动态加载js对外接口
// jsurl需加载js文件集合，‘，’分割
// cssurl需要加载css文件集合，‘，’分割
// fn回调方法
function loadHeadJs(jsurl, cssurl, fn) {
	// css处理
	if(cssurl != "") {
		var cssarray = cssurl.split(',');
		addCss(cssarray[0], cssarray, 0);
	}
	// js处理
	if(jsurl.length != 0) {
		serieslLoadScripts(jsurl, fn);
		//		if (getBrowserVersionIE8())
		//			if (fn) fn.call();
	} else {
		if(fn) fn.call();
	}
};

// 串行加载js集合
function serieslLoadScripts(scripts, callback) {
	var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
	var s = new Array();
	var last = scripts.length - 1
	var recursiveLoad = function(i) { //递归
		s[i] = document.createElement("script");
		s[i].setAttribute("type", "text/javascript");
		//		s[i].onload = s[i].onreadystatechange = function() {
		//			if (!0 || this.readyState == "loaded" || this.readyState == "complete") {
		//				this.onload = this.onreadystatechange = null;
		//				this.parentNode.removeChild(this);
		//				if (i != last) recursiveLoad(i + 1);
		//				else if (typeof(callback) == "function") callback();
		//			}
		//		}
		s[i].onload = function() {
			if(!0 || this.readyState == "loaded" || this.readyState == "complete") {
				this.onload = null;
				this.parentNode.removeChild(this);
				if(i != last) {
					recursiveLoad(i + 1);
				} else if(typeof(callback) == "function") {
					callback();
				}
			}
		};
		s[i].onreadystatechange = function() {
			if(getBrowserVersion() == "IE 8") {
				if(!0 || this.readyState == "loaded" || this.readyState == "complete") {
					if(i != last) {
						recursiveLoad(i + 1);
					} else if(typeof(callback) == "function") {
						callback();
					}
				}
			}
		}
		s[i].setAttribute("src", appAddress + scripts[i].jsurl + "?version=" + scripts[i].version);
		HEAD.appendChild(s[i]);

	};
	recursiveLoad(0);
};
// 并行加载js集合
function parallelLoadScripts(scripts, callback) {
	var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
	var s = new Array();
	var loaded = 0;
	for(var i = 0; i < scripts.length; i++) {
		s[i] = document.createElement("script");
		s[i].setAttribute("type", "text/javascript");
		s[i].onload = s[i].onreadystatechange = function() {
			if(!0 || this.readyState == "loaded" || this.readyState == "complete") {
				loaded++;
				this.onload = this.onreadystatechange = null;
				this.parentNode.removeChild(this);
				if(loaded == scripts.length && typeof(callback) == "function") callback();
			}
		};
		s[i].setAttribute("src", appAddress + scripts[i].jsurl + "?version=" + scripts[i].version);
		HEAD.appendChild(s[i]);
	}
};

// 加载页面js,css
function loadPageJsCss(targetId, openType, headjsurl) {
	var jsarray = "";
	var cssarray = ""
	var url = "";
	var fn = "";
	$.ajax({
		type: "get",
		url: appAddress + headjsurl + "?time=" + new Date().getTime(),
		dataType: "json",
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i].pageid == targetId) {
					cssarray = data[i].cssurl;
					url = data[i].pageurl;
					fn = data[i].pagefun;
					jsarray = data[i].jsurlarray;
					break;
				}
			}
			switch(openType) {
				case "template":
					loadHeadJs(jsarray, cssarray);
					break;
			}
		}
	});
}

// 获取服务端语言类型，并设置本地cookie
function getLanguageFromCookie() {
	var name = "language";
	var language = getCookie(name);
	if(!language) {
		language = "zh";

		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(language) + ";expires=" + exp.toGMTString();
	}
	return language;
};
// 根据cookie名获取值
function getCookie(name) {
	//	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	//	if (arr = document.cookie.match(reg))
	//		return arr[2];
	//	else
	//		return null;
	var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
	var arrCookie = getCookie.split(";") //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
	var tips; //声明变量tips
	for(var i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
		var arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
		if(name == arr[0]) { //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
			tips = arr[1]; //将cookie的值赋给变量tips
			break; //终止for循环遍历
		}
	}
	return tips;
};
// 根据cookie名删除值
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// 国际化处理,新版本不再需要国际化部分old
function loadProperties(ractive, pagename, language) {
	jQuery.i18n.properties({ //加载资浏览器语言对应的资源文件
		name: pagename, //资源文件名称
		path: appAddress + "app/i18n/demo/", //资源文件路径
		language: language, //语言类型
		mode: 'map', //用Map的方式使用资源文件中的值
		callback: function() { //加载成功后设置显示内容
			for(var key in $.i18n.map) {
				var value = $.i18n.map[key];
				ractive.set(key, value);
			}
			// 处理title
			var index = location.pathname.lastIndexOf("/");
			var page = location.pathname.substring(index + 1).split(".")[0];
			var key = "i18n_" + page + "_title";
			document.title = $.i18n.prop(key);
		}
	});
};

//获取页面参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURIComponent(r[2]);
	return null;
};

// 获取string串指定参数
function getParam(params, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = params.match(reg);
	if(r != null) return decodeURIComponent(r[2]);
	return null;
}

/**
 * Description: 加载缓存
 *    后台返回值格式：{"info":[{"codeclass":"XBDM","version":0,"data":[{"code":"1","codedesc":"男"},{"code":"2","codedesc":"女"}]},{"codeclass":"XXDM","version":0,"data":[{"code":"1","codedesc":"A"},{"code":"2","codedesc":"B"}]}]}
 * @param codeclass_arr 将要加载至缓存的codeclass代码组织成数组形式参数
 */
function setCodeMap(codeclass_arr, callback) {
	var url = getRequestAddressUrl("codemap");
	var param_json = {};
	for(var j = 0; j < codeclass_arr.length; j++) {
		param_json[codeclass_arr[j]] = getCodeClassVersion(codeclass_arr[j]);
	}
	var param_str = JSON.stringify(param_json);
	$.ajax({
		type: "POST",
		url: url,
		data: "clv=" + param_str,
		dataType: "json",
		success: function(data) {
			if(data.info != undefined && data.info != null && data.info.length > 0) {
				for(var i = 0; i < data.info.length; i++) {
					var codeClass = data.info[i].codeclass;
					delete data.info[i]["codeclass"];
					store.set(codeClass, "{\"data\":" + JSON.stringify(data.info[i].data) + ",\"version\":" + JSON.stringify(data.info[i].version) + "}");
				}
			}
			if(callback != undefined && callback != null) {
				callback();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			return;
		}
	});
}

/**
 * Description:获取codeclass当前缓存版本信息
 * @param codeclass
 * @returns
 */
function getCodeClassVersion(codeclass) {
	var codeclass_json = store.get(codeclass);

	if(codeclass_json == undefined) {
		return -1;
	}
	if(typeof codeclass_json == 'string') {
		codeclass_json = eval("(" + codeclass_json + ")");
	}
	if(!codeclass_json.data) {
		return -1;
	}

	return codeclass_json.version;
};
//生成32位随机码
function newGuid() {
	var guid = "";
	for(var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
	}
	return guid;
};
// 返回顶部
function goTop() {
	$("body,html").animate({
		scrollTop: 0
	}, 500);
	return false;
};

function getRequestAddressUrl(addKey) {
	var retUrl = "";
	for(var i = 0; i < requestAddressList.length; i++) {
		if(requestAddressList[i].addressKey == addKey) {
			retUrl = requestAddressList[i].url;

			break;
		}
	}

	return retUrl;
}
// 共通请求方法(C端)
// url 原型地址
// requesturl 真实开发地址
// dataobj 参数
// requestType请求类型,无特殊情况此值传null
// waitFlg 是否需要显示等待
// successCallback 成功回调
// errorCallback 失败回调
function crossDomainAjaxForC(url, requesturl, dataobj, specialRequestType, waitFlg, successCallback, errorCallback, addressKey) {
	var requestAddress = "";
	// 判断是否有请求地址key，如果没有默认获取设定好的key
	requestAddress = getRequestAddressUrl(addressKey);

	var activeEle = document.activeElement;
	if(activeEle.nodeName != "BODY")
		activeEle.disabled = true;
	var ajaxtype = "";
	var ajaxurl = "";
	if(requestType == "app") {
		ajaxurl = appAddress + url;
		ajaxtype = "GET";
	} else {
		ajaxurl = requestAddress + requesturl;
		ajaxtype = "POST";
	}
	// 处理特殊请求类型
	if(specialRequestType) ajaxtype = specialRequestType.toUpperCase();
	var temp = new Date().getTime();

	if(requestType == "GET") {
		// 处理参数
		if(dataobj != "") ajaxurl = ajaxurl + "?" + dataobj + "&time=" + temp;
		else ajaxurl = ajaxurl + "?time=" + temp;
		$.ajax({
			type: "GET",
			url: ajaxurl,
			data: {},
			processData: false,
			contentType: false,
			success: function(data) {
				if(successCallback) successCallback.call('', data);
			},
			error: function(mess) {
				if(errorCallback) errorCallback.call('', mess);
			}
		});
	} else {
		if(dataobj == undefined) {
			dataobj = "{[]}";
		}

		var dataobj = JSON.stringify(dataobj);
		$.ajax({
			type: "POST",
			url: ajaxurl,
			async: false,
			dataType: 'json',
			data: dataobj,
			crossDomain: true,
			contentType: "application/json",
			success: function(data) {
				if(successCallback) successCallback.call('', data);
			},
			error: function(mess) {
				if(errorCallback) errorCallback.call('', mess);
			}
		});
	}
};
// 共通请求方法
// url 原型地址
// requesturl 真实开发地址
// dataobj 参数
// requestType请求类型,无特殊情况此值传null
// waitFlg 是否需要显示等待
// successCallback 成功回调
// errorCallback 失败回调
var wd_common_token = false;
var wd_common_url = "";
// 清洗json中undefined、null 转换成‘’
function chacgeundefnull(jsondata) {
	for(var o in jsondata) {
		if(typeof jsondata[o] == "object") {
			if(jsondata[o] == null) {
				jsondata[o] = "";
			} else {
				chacgeundefnull(jsondata[o])
			}
		} else {
			if(jsondata[o] == undefined) {
				jsondata[o] = "";
			}
		}
	}

	return jsondata;
}

function crossDomainAjax(opts) {
	$(".wdAjaxWaitDiv").remove();
	var defaults = {
		requesturl: null, // 后台请求地址
		dataobj: "{[]}", // 请求参数
		redirectUrl: false, // 例外请求地址
		requestType: null, // 例外请求类型
		waitFlg: false, // 是否需要加载等待动画
		contentType: "application/x-www-form-urlencoded",
		addressKey: "", // 请求地址key
		async: true
	}
	removeWaitDiv("waitSubmit");
	removeWaitDiv("errorSubmit");
	removeWaitDiv("timeOutSubmit");
	var opts = $.extend(defaults, opts);
	var requestAddress = getRequestAddressUrl(opts.addressKey);
	opts.dataobj = chacgeundefnull(opts.dataobj);
	var ajaxtype = "";
	var ajaxurl = "";
	if(opts.redirectUrl) {
		ajaxurl = opts.url;
	} else if(requestType == "app") {
		ajaxurl = appAddress + opts.url;
		ajaxtype = "GET";
	} else {
		ajaxurl = requestAddress + opts.requesturl;
		ajaxtype = "POST";
	}
	// 处理特殊请求类型
	if(opts.requestType) ajaxtype = opts.requestType;
	var temp = new Date().getTime();

	var timeOuteSecode = 10000; // 超时设置10s

	if(wd_common_token == true && wd_common_url == ajaxurl) return;
	wd_common_token = true;
	wd_common_url = ajaxurl;

	////////////////////////////////////
	//	ajaxtype = "POST";
	//	ajaxurl = "http://172.16.3.218:9101/wd-gzh/gzh/01/100002316/01/demo/test";
	//	requestType = "request";
	//	dataobj = {
	//		"id": "fuck",
	//		"shzt": 1
	//	};
	////////////////////////////////////

	if(ajaxurl.indexOf('?') != -1) {
		ajaxurl = ajaxurl + "&time=" + temp;
	} else {
		ajaxurl = ajaxurl + "?time=" + temp;
	}
	// 添加等待
	if(opts.waitFlg) {
		//		createWaitDiv("wait.gif", ajaxurl);
		createWaitDiv("wait.gif", "waitSubmit");
	}
	$.ajax({
		type: ajaxtype,
		dataType: 'json',
		url: ajaxurl,
		data: opts.dataobj,
		async: opts.async,
		timeout: timeOuteSecode,
		contentType: opts.contentType,
		success: function(data) {
			wd_common_token = false;
			if(opts.waitFlg) {
				//removeWaitDiv(ajaxurl);
				removeWaitDiv("waitSubmit");
			}
			if(opts.successCallback) {
				opts.successCallback.call('', data);
			}
		},
		error: function(XMLHttpRequest, txtStatus, errorThrown) {
			wd_common_token = false;
			if(opts.waitFlg) {
				//removeWaitDiv(ajaxurl);
				removeWaitDiv("waitSubmit");
			}
			//			createWaitDiv("error.gif", ajaxurl, function() {
			//				crossDomainAjax(opts)
			//			});
			createWaitDiv("error.png", "errorSubmit", function() {
				crossDomainAjax(opts)
			});
			//if (opts.errorCallback) opts.errorCallback.call();
		},
		complete: function(XMLHttpRequest, status) {
			wd_common_token = false;
			if(opts.waitFlg) {
				//				removeWaitDiv(ajaxurl);
				removeWaitDiv("waitSubmit");
			}
			if(status == 'timeout') {
				//alert("超时");
				//				createWaitDiv("time.gif", ajaxurl, function() {
				//					crossDomainAjax(opts)
				//				});
				createWaitDiv("error.png", "timeOutSubmit", function() {
					crossDomainAjax(opts)
				});
			}　　
		}
	});
};

// 创建等待层
function createWaitDiv(imgFlg, id, fn) {
	if($("#" + id).length > 0) {
		return false;
	}
	var waitDiv = document.createElement('div');
	waitDiv.className = "wdAjaxWaitDiv";
	waitDiv.id = id;
	var item = document.createElement('div');
	item.className = "wdWaitImg";
	item.style.background = "url(" + appAddress + "ui/common/images/frameWork/" + imgFlg + ")";
	waitDiv.appendChild(item);
	var msg = document.createElement('span');
	msg.innerHTML = eval("wd_language_msg_dataloadeerror_" + getLanguageFromCookie()); //数据加载失败;
	msg.className = "wdWaitMsg";
	waitDiv.appendChild(msg);
	document.body.appendChild(waitDiv);

	var spanTitle = document.createElement('span');
	switch(imgFlg) {
		case "error.png":
		case "error.png":
			spanTitle.innerHTML = eval("wd_language_msg_close_" + getLanguageFromCookie()); //关闭
			spanTitle.className = "wdWaitClose";
			$(spanTitle).bind('click', function() {
				removeWaitDiv(id);
			});
			waitDiv.appendChild(spanTitle);
			var testDiv = document.createElement('span');
			testDiv.innerHTML = eval("wd_language_msg_again_" + getLanguageFromCookie()); //再试一次
			testDiv.className = "wdWaitAgain";
			waitDiv.appendChild(testDiv);
			$(testDiv).bind('click', function() {
				removeWaitDiv(id);
				if(fn) {
					fn.call();
				}
			})
			break;
	}
};
// 移除等待层
function removeWaitDiv(id) {
	//	if(document.getElementById(id))
	//		document.body.removeChild(document.getElementById(id));
	if($("#" + id).length > 0) {
		$("#" + id).remove();
	}
};
// 加载模板
function getTemplate(url, id, fn, parameters) {
	if(typeof(parameters) == "string") parameters = {};
	$.get(appAddress + url, function(template) {
		var ractive = new Ractive({
			el: id,
			template: template,
			data: parameters,
			oncomplete: function() {
				if(fn) fn.call("", ractive);
			}
		});
	});
}
/**
 * Description: 获取codedesc,未找到对应desc返回undefined
 * @param codeclass
 * @param code
 * @returns
 */
function getCodeDescByCodeClass(codeclass, code) {
	if(!code) return code;
	var codes = code.split(",");
	var codeclass_json = store.get(codeclass);
	if(!codeclass_json) return code;
	if(typeof codeclass_json == 'string') {
		codeclass_json = eval("(" + codeclass_json + ")");
	}
	var code_arr = codeclass_json.data;
	if(codeclass_json.data == undefined) {
		code_arr = codeclass_json;
	}
	var codesdesc = "";
	for(var i = 0; i < code_arr.length; i++) {
		for(var j = 0; j < codes.length; j++) {
			if(code_arr[i].code == codes[j].replace(/(^\s*)|(\s*$)/g, "")) {
				codesdesc += code_arr[i].codedesc + ",";
			}
		}
	}
	if(codesdesc != "") {
		return codesdesc.substring(0, codesdesc.length - 1);
	} else {
		return code;
	}
};

//返回上一模板  参数说明：地址，方法名称，参数，是否国际化，国际化文件
function pageback(url, fnName, fnParam, isGjh, jsondataGjh) {
	if(fnParam && !fnParam.hasPreStep) {
		minuurlarray();
	}
	var pageInfo = {
		url: url,
		fnName: fnName,
		fnParam: fnParam,
		isTrack: false,
		isGjh: isGjh,
		jsondataGjh: jsondataGjh
	}
	addurl(pageInfo);
}

function minuurlarray() {
	wd_back.pop(wd_back.length - 1);
}

function addurl(obj) {
	if(wd_back.length == 0) {
		wd_back[wd_back.length] = obj;
	} else if(wd_back[wd_back.length - 1].url != obj.url) {
		wd_back[wd_back.length] = obj;
	}
};
// 返回操作
function backurl(boxId) {
	var isTrack = wd_back[wd_back.length - 1].isTrack;
	var isGjh = wd_back[wd_back.length - 1].isGjh;
	if(isTrack != undefined && isTrack == false) {
		if(isGjh) {
			getTemplate(wd_back[wd_back.length - 1].url, boxId, function() {
				var fnName = wd_back[wd_back.length - 1].fnName;
				var fnParam = wd_back[wd_back.length - 1].fnParam;
				wd_back.pop(wd_back.length - 1);
				if(fnParam == undefined || fnParam == null) {
					eval(fnName).apply();
				} else {
					eval(fnName).call('', fnParam);
				}
			}, wd_back[wd_back.length - 1].jsondataGjh);
		} else {
			getTemplate(wd_back[wd_back.length - 1].url, boxId, function() {
				var fnName = wd_back[wd_back.length - 1].fnName;
				var fnParam = wd_back[wd_back.length - 1].fnParam;
				wd_back.pop(wd_back.length - 1);
				if(fnParam == undefined || fnParam == null) {
					eval(fnName).apply();
				} else {
					eval(fnName).call('', fnParam);
				}
			});
		}

	} else {
		getTemplate(wd_back[wd_back.length - 2].url, boxId, function() {
			wd_back.pop(wd_back.length - 1);
			eval(wd_back[wd_back.length - 1].fnName).apply();
		});
	}
};
/**
 * Description: 创建瀑布流泳道
 * @param opts.targetId 添加目标元素ID
 * @param opts.roadWidth 泳道宽度
 * @param opts.isShowScroll 是否显示滚动条
 * @param opts.leftPad 目标元素左边距
 * @param opts.rightPad 目标元素右边距
 * @returns 创建泳道元素数组
 */
function createFallsRoad(opts) {
	var leftPad = parseInt(opts.leftPad);
	var rightPad = parseInt(opts.rightPad);
	var roadWidth = parseInt(opts.roadWidth);
	$('#' + opts.targetId).css("padding-left", leftPad + "px");
	$('#' + opts.targetId).css("padding-right", rightPad + "px");
	var conWidth = $('#' + opts.targetId).outerWidth() - leftPad - rightPad;
	if(opts.isShowScroll == undefined || opts.isShowScroll) {
		conWidth = conWidth - 18;
	}
	var roadNum = parseInt(conWidth / roadWidth);
	var roadSpace;
	if(((conWidth % roadWidth) / (roadNum - 1)) < 10) {
		roadNum = roadNum - 1;
		roadSpace = parseInt((roadWidth + parseInt(conWidth % roadWidth)) / (roadNum - 1));
	} else {
		roadNum = parseInt((conWidth / roadWidth).toString().split('.')[0]);
		roadSpace = ((conWidth % roadWidth) / (roadNum - 1)).toString().split('.')[0];
	}
	//var fallsRoadList = new Array();
	for(var r = 0; r < roadNum; r++) {
		var roadDiv = document.createElement("div");
		roadDiv.className = "pull-left";
		roadDiv.style.width = roadWidth + "px";
		roadDiv.id = "wd-fallsRoad" + r;
		if(r != 0) roadDiv.style.marginLeft = roadSpace + "px";
		$('#' + opts.targetId).append(roadDiv);

		//fallsRoadList.push(roadDiv);
	}

	//return fallsRoadList;
};
/**
 * 
 * @param {Object} targetId
 * @param {Object} ele
 */
function setDataFallsRoad(targetId, ele) {
	var objList = $("#" + targetId).children("div[id^='wd-fallsRoad']");
	var minHeight = 0;
	var eleIndex = 0;
	$.each(objList, function(a) {
		if(a == 0) {
			minHeight = $(objList[a]).outerHeight();
		} else {
			if(minHeight > $(objList[a]).outerHeight()) {
				minHeight = $(objList[a]).outerHeight();
				eleIndex = a;
			}
		}
	});
	$(objList[eleIndex]).append(ele);

	if($(objList[eleIndex]).attr('isuser') == undefined) {
		$(objList[eleIndex]).attr('isuser', '1');
	}
}
/**
 * 
 * @param {Object} targetId
 */
function delFallsRoad(targetId) {
	var objList = $("#" + targetId).children("div[id^='wd-fallsRoad']");
	var roadWidth = 0;
	var roadSpace = "";
	$.each(objList, function(a) {
		if($(objList[a]).attr('isuser') == '1') {
			if($(objList[a]).outerHeight() == 0) {
				if(a == 0) {
					roadWidth = $(objList[a]).next().width();
					roadSpace = $(objList[a]).next().css("margin-left");
					$(objList[a]).next().css("margin-left", "0px");
					$(objList[a]).remove();

				} else {
					roadWidth = $(objList[a]).width();
					roadSpace = $(objList[a]).css("margin-left");
					$(objList[a]).remove();
				}

				var id = $("#" + targetId).children(":last").attr('id');
				var curIndex = parseInt(id.substr(12, 1)) + 1;

				var roadDiv = document.createElement("div");
				roadDiv.className = "pull-left";
				roadDiv.style.width = roadWidth + "px";
				roadDiv.id = "wd-fallsRoad" + curIndex;
				roadDiv.style.marginLeft = roadSpace;
				$('#' + targetId).append(roadDiv);
				return false;

			}
		}
	});
};
/**
 * 懒加载请求数据
 * @param {Object} mat_opts
 */
function wdLazyLoadData(mat_opts) {
	var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); //浏览器的高度加上滚动条的高度

	if($(document).height() <= totalheight) { //当文档的高度小于或者等于总的高度的时候，开始动态加载数据
		//加载数据
		crossDomainAjax(mat_opts);
	}
};
/**
 * 
 */
String.prototype.lengthb = function() {
	var cArr = this.match(/[^\x00-\xff]/ig);
	return this.length + (cArr == null ? 0 : cArr.length);
};

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

// 组合json
function jsonjoin(sorJosn, tarJosn) {
	sorJosn.push = function(o) {
		//如果o是object  
		if(typeof(o) == 'object')
			for(var p in o) this[p] = o[p];
	};
	sorJosn.push(
		tarJosn
	)

	return sorJosn;
}
/**
 * 校验editor长度
 */
function checkEditorLen(strVal, maxLen) {
	var flag = true;
	var sum = 0;
	if(strVal != undefined && strVal != null && strVal != "") {
		for(var i = 0; i < strVal.length; i++) {
			if((strVal.charCodeAt(i) >= 0) && (strVal.charCodeAt(i) <= 255))
				sum += 1;
			else
				sum += 2;
		}
	}
	if(sum > maxLen) {
		flag = false;
	}
	return flag;
};
/**
 * 获取该日期在本年的天数和星期数
 * @param {Object} d 计算日期
 */
function getDayWeekCountForDay(d) {
	var d1 = new Date(d);
	var d2 = new Date(d);
	d2.setMonth(0);
	d2.setDate(1);
	var rq = d1 - d2;
	var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
	var s2 = Math.ceil(s1 / 7);
	return {
		"day": s1,
		"week": s2
	};
};
// 改变页面主题容器高度，适用于左右风格布局
function changePageHeight() {
	var menuObj;
	var mainObj;
	if($("#" + menuBox).length > 0) menuObj = $("#" + menuBox);
	else menuObj = $("." + menuBox);
	if($("#" + mainObj).length > 0) mainObj = $("#" + mainBox);
	else mainObj = $("." + mainBox);

	if(menuObj.length > 0 && mainObj.length > 0) {
		if($(mainObj).height() < $(menuObj).height())
			$(mainObj)[0].style.height = $(menuObj).height() + "px";
	}
};

function resetMainBoxHeight() {
	var mainObj;
	if($("#" + mainObj).length > 0) mainObj = $("#" + mainBox);
	else mainObj = $("." + mainBox);
	$(mainObj)[0].style.height = "auto";
};

/**
 * ajax请求全局设置，如果没有session或者session失效自动跳转
 * loginAddress: 登录地址
 * indexAddress: 登录后的跳转地址
 */
var loginAddress = appAddress + getRequestAddressUrl("loginAddress");
var indexAddress = appAddress + getRequestAddressUrl("indexAddress");
$.ajaxSetup({
	type: 'POST',
	complete: function(xhr, status) {
		var sessionStatus = xhr.getResponseHeader('sessionstatus');
		if(sessionStatus == 'timeout') {
			var top = getTopWinow();
			top.location.href = loginAddress + "?redirectURL=" + indexAddress;
		}
	}
});

/** 
 * 在页面中任何嵌套层次的窗口中获取顶层窗口 
 * @return 当前页面的顶层窗口对象 
 */
function getTopWinow() {
	var p = window;
	while(p != p.parent) {
		p = p.parent;
	}
	return p;
}
/**
 * 滚动到对象底部
 */
function scrollBottom(obj) {
	obj.scrollTop = obj.scrollHeight;
}
// 关闭控件飘窗共通处理方法
function wdControlClose(event){
	if(typeof(closeEW) == "function"){
		closeEW(event);
	}
	
	if(typeof(closeLabelEW) == "function"){
		closeLabelEW(event);
	}
};
//格式化时间 服务器返回时间格式为yyyyMMddHHmmssSSS 17位字符串
//将服务器时间修改为yyyy-MM-dd HH:mm 的基本格式
function formatCreateTimeByBase(createTime) {
	if (!createTime) {
		console.log("时间传入值为空。");
		return;
	}
	if (createTime.length > 12) {
		var year = createTime.slice(0, 4);
		var month = createTime.slice(4, 6);
		var day = createTime.slice(6, 8);
		var hour = createTime.slice(8, 10);
		var minute = createTime.slice(10, 12)
		var newTimeStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
		return newTimeStr;
	} else {
		return createTime;
	}
}

//格式化时间 
//dateTime 需要格式化的时间（格式为：2016-08-05 11:00:00）
// 格式化之后返回时间的格式为：2016年08月05日 11:00
function formatDateTime(dateTime) {
	console.log("dateTime------>" + dateTime);
	if (!dateTime) {
		console.log("时间传入值为空。");
		return;
	}
	if (dateTime.length == 19) {
		var year = dateTime.slice(0, 4);
		var month = dateTime.slice(5, 7);
		var day = dateTime.slice(8, 10);
		var hour = dateTime.slice(11, 13);
		var minute = dateTime.slice(14, 16)
		var newTimeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
		return newTimeStr;
	} else {
		return dateTime;
	}
}

//格式化时间 服务器返回时间格式为yyyyMMddHHmmssSSS 17位字符串
//将服务器时间修改为yyyy年MM月dd日 HH:mm 的基本格式
//createTime 服务器返回时间
// value 国际化后的时间标志 （年，月，日）
function formatCreateTimeByChina(createTime) {
	if (!createTime) {
		console.log("时间传入值为空。");
		return;
	}
	if (createTime.length > 12) {
		var year = createTime.slice(0, 4);
		var month = createTime.slice(4, 6);
		var day = createTime.slice(6, 8);
		var hour = createTime.slice(8, 10);
		var minute = createTime.slice(10, 12)
		var newTimeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
		return newTimeStr;
	} else {
		return createTime;
	}
}