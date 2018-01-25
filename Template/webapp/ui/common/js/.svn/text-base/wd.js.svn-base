/*
 JS MVC职责划分
 M 模型
 	业务模型：业务逻辑、流程、状态、规则（核心）
 	数据模型：业务数据、数据校验、增删改查（AJAX）
 V 视图
 	视图（核心）：定义、管理、配置
	模板：定义、配置、管理
	组件：定义、配置、管理
	用户事件配置（核心）、管理
	用户输入校验、配置、管理
 C 控制器/分发器
 	事件分发（核心）、模型分发、视图分发
	不做数据处理、业务处理，即业务无关
	扩展：权限控制、异常处理等
	C是JSMVC框架的核心，实现集中式配置和管理，可以有多个控制器
 * */
var appAddress = getRequestAddressUrl("app"); //前端地址127.0.0.1 、192.168.253.1、ml.wd.com
var mainPageTemplateId = "wd_templateId"; // 菜单切换模板id
var wd_back = new Array(); // 记录页面跳转信息
var dom_focus = new Array(); // 控件焦点集合
var fontfamily = "微软雅黑";
//////////////////////////////////////国际化定义变量start
var wd_language_msg_close_zh = "关闭";
var wd_language_msg_again_zh = "再试一次";
var wd_language_msg_dataloadeerror_zh = "数据加载失败";
var wd_language_msg_notempty_zh = "不能为空";
var wd_language_msg_valiadtemsglength_zh = "输入内容不能超过{2}个汉字，{1}个字母或数字";
var wd_language_msg_valiadtemsgemail_zh = "请输入有效的电子邮件地址";
var wd_language_msg_valiadtemsgphone_zh = "请输入有效的电话号码";
var wd_language_msg_valiadtemsgnumber_zh = "仅允许输入数字,且最小可输入{0}，最多可输入{1}位";
var wd_language_msg_browserversion_zh = "您的浏览器版本过低，可能导致部分功能无法正常使用，建议使用IE10及以上版本，请升级浏览器后再使用。";
/********************/
var wd_language_msg_close_en = "Close";
var wd_language_msg_again_en = "Try again";
var wd_language_msg_dataloadeerror_en = "Data load is failed";
var wd_language_msg_notempty_en = " cannot be empty";
var wd_language_msg_valiadtemsglength_en = " less than {1} characters！";
var wd_language_msg_valiadtemsgemail_en = " Please input valid E-mail address";
var wd_language_msg_valiadtemsgphone_en = " Please input valid telephone number";
var wd_language_msg_valiadtemsgnumber_en = "仅允许输入数子,且最小可输入{0}，最多可输入{1}位";
var wd_language_msg_browserversion_en = " Your browser version is too low, which may result in partial functions being not applied normally; IE10 or above is advised to be applied; please update the browser, and then apply it.";
//////////////////////////////////////国际化定义变量end
//////////////////////////////////////应用 边缘方法
//var t = document.createElement('script');
//t.src = getRequestAddressUrl("components").replace("components/", "") + "js/wd_boder.js";
//t.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(t);
if(!Array.prototype.map) {
	Array.prototype.map = function(callback) {
		// 获取数组长度
		var len = this.length;
		if(typeof callback != "function") {
			throw new TypeError();
		}
		// 创建跟原数组相同长度的新数组，用于承载经回调函数修改后的数组元素
		var newArr = new Array(len);
		// thisArg为callback 函数的执行上下文环境
		var thisArg = arguments[1];
		for(var i = 0; i < len; i++) {
			if(i in this) {
				newArr[i] = callback.call(thisArg, this[i], i, this);
			}
		}
		return newArr;
	}
};
String.prototype.lengthb = function() {
	var cArr = this.match(/[^\x00-\xff]/ig);
	return this.length + (cArr == null ? 0 : cArr.length);
};
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.array = function() {
	var _ = new Array();
	var _l = this.length;
	for(var i = 0; i < _l; i++) {
		_[i] = this.substring(i, i + 1);
	}
	return _
};
$(function() {
	// 浏览器版本提示
	var BrowserVersion = getBrowserVersion();
	if(BrowserVersion == "IE 6" || BrowserVersion == "IE 7" || BrowserVersion == "IE 8" || BrowserVersion == "IE 9") {
		var browshieldbox = document.createElement('div');
		browshieldbox.style.zIndex = "9998";
		browshieldbox.id = "wd_browshieldbox";
		browshieldbox.style.height = "150px";
		browshieldbox.style.width = "100%";
		browshieldbox.style.position = "absolute";
		browshieldbox.style.top = "0px";
		browshieldbox.style.backgroundColor = "#FFFFCC";
		browshieldbox.style.opacity = "0.9";
		browshieldbox.style.filter = "alpha(opacity=90)";
		document.body.appendChild(browshieldbox);
		var browshieldtextbox = document.createElement('div');
		browshieldtextbox.style.zIndex = "9999";
		browshieldtextbox.id = "wd_browshieldtextbox";
		browshieldtextbox.style.width = "700px";
		browshieldtextbox.style.height = "100px";
		browshieldtextbox.style.position = "absolute";
		browshieldtextbox.style.top = "20px";
		browshieldtextbox.style.marginLeft = "50%";
		browshieldtextbox.style.left = "-350px";

		var browshieldtextimg = document.createElement("div");
		browshieldtextimg.style.width = "94px";
		browshieldtextimg.style.styleFloat = "left";
		browshieldtextimg.style.height = "94px";
		browshieldtextimg.style.marginTop = "2px";
		browshieldtextimg.style.background = "url(" + getRequestAddressUrl("components").replace("components/", "") + "/images/u8.png)";
		browshieldtextbox.appendChild(browshieldtextimg);

		var browshieldtexttext = document.createElement('div');
		browshieldtexttext.style.width = "500px";
		browshieldtexttext.style.styleFloat = "left";
		browshieldtexttext.style.marginLeft = "50px";
		browshieldtexttext.style.marginTop = "30px";
		browshieldtexttext.style.fontSize = "20px";
		browshieldtexttext.style.color = "#333333";
		browshieldtexttext.innerHTML = eval("wd_language_msg_browserversion_" + getLanguageFromCookie());
		browshieldtextbox.appendChild(browshieldtexttext);

		document.body.appendChild(browshieldtextbox);

		setTimeout(function() {
			G("#wd_browshieldbox").fadeOut(600);
			G("#wd_browshieldtextbox").fadeOut(600);
		}, 8000);
	}
	// 校验提示框
	var wdcheckdiv = document.createElement('div');
	wdcheckdiv.id = "wd-vaildateTip";
	wdcheckdiv.style.display = "none";
	var wdcheckspanmsg = document.createElement('span');
	wdcheckspanmsg.id = "wd-vaildateTipMsg";
	wdcheckdiv.appendChild(wdcheckspanmsg);
	document.body.appendChild(wdcheckdiv);
	// 处理国际化 文字字体
	if(getLanguageFromCookie() == "zh") {
		fontfamily = "微软雅黑";
	}
	$("body").css("font-family", fontfamily);
	$("html").css("font-family", fontfamily);
});
// 处理共通回退
window.onpopstate = function(event) {
	backurl();
};

function G(id) {
	if($(id).length > 0) {
		return $(id);
	} else if($("#" + id).length == 1) {
		return $("#" + id)[0];
	} else if($("." + id).length > 0) {
		return $("." + id);
	} else {
		return false;
	}
};
var WD = function() {};
var wdSecurity = function() {}; // 安全
wdSecurity.prototype.encryption = function(value) { // 加密
	var arr = value.array().map(function(_value, index, arr) {
		return _value.charCodeAt();
	})
	var retStr = "";
	arr.map(function(_value, index, arr) {
		retStr = retStr + _value + "!";
	})
	return retStr.substring(0, retStr.length - 1);
};
wdSecurity.prototype.decrypt = function(value) { // 解密
	var arr = value.split('!');
	var retStr = "";
	for(var i = 0; i < arr.length; i++) {
		retStr = retStr + String.fromCharCode(arr[i]);
	}
	return retStr;
};
//control
/*
           第一参数：为button节点id或者样式
           第二参数：为需要注册的触发事件
           第三参数：事件触发函数
           第四参数：需要传递的参数。
*/
WD._Control = function(id, even, fun, arr) {
	if(G(id) instanceof jQuery) {
		G(id).each(function() {
			if(even.substring(0, 2) != "un") {
				if(even != "hover") {
					// 屏蔽wd-checkbox、wd-radio点击事件
					if(this.className.indexOf("wd-checkbox-check") == -1 && this.className.indexOf("wd-checkbox-check-active") == -1 && this.className.indexOf("wd-radio-check") == -1 && this.className.indexOf("wd-radio-check-active") == -1) {
						this["on" + even] = function() {
							dom_focus[dom_focus.length] = this;
							fun.call(this, arr);
						};
					}
				} else if(even == "hover") {
					this["onmouseover"] = function() {
						if(arr) {
							fun[0].call(this, arr[0]);
						} else {
							fun[0].call(this);
						}
					};
					this["onmouseout"] = function() {
						if(arr && arr.length == 2) {
							fun[1].call(this, arr[1]);
						} else {
							fun[1].call(this);
						}
					};
				}
			} else { // 解绑事件
				this["on" + even.substring(2, even.length)] = null;
			}
		})
	} else {
		if(even.substring(0, 2) != "un") {
			if(even != "hover") {
				_ = G(id);
				if(_) {
					if(_.className.indexOf("wd-radio") >= 0 || _.className.indexOf("wd-check") >= 0) {
						if(_.className.indexOf("wd-radio-readonly") == -1) {
							$(_).next()[0]["on" + even] = function() {
								dom_focus[dom_focus.length] = this;
								fun.call(_, arr);
							}
							$(_).next().next()[0]["on" + even] = function() {
								dom_focus[dom_focus.length] = this;
								fun.call(_, arr);
							}
						}
					} else {
						G(id)["on" + even] = function() {
							dom_focus[dom_focus.length] = this;
							fun.call(this, arr);
						};
					}
				}
			} else if(even == "hover") {
				G(id)["onmouseover"] = function() {
					if(arr) {
						fun[0].call(this, arr[0]);
					} else {
						fun[0].call(this);
					}

				};
				G(id)["onmouseout"] = function() {
					if(arr && arr.length == 2) {
						fun[1].call(this, arr[1]);
					} else {
						fun[1].call(this);
					}

				};
			}
		} else { // 解绑事件
			G(id)["on" + even.substring(2, even.length)] = null;
		}
	}
};
// 绑定事件
WD.Control = function(settings) {
	for(var i = 0; i < settings.length; i++) {
		WD._Control(settings[i][0], settings[i][1], settings[i][2], settings[i][3]);
	}
};
// model
// 监听实体对象改变事件
this.on = function(ctrl, fn) {
	this[ctrl.replace(':', '_')] = function(model) {
		fn.call(this, model);
	};
};
// 实体定义
WD.Model = function(attributes) {
	var _this = this;
	this._view = null;
	this.collection = null;
	// 参数说明
	this.arguments = arguments;
	// 请求url集合
	this.requertsetting = {};
	// 重新加载实体
	this.reloadmodel = function(realTimeFlg) {
		if(!realTimeFlg) { // 不再加载model
			this._view.show();
		} else {
			crossDomainAjax(this.wdsearch, function(data) {
				_this._view.show(data);
			});
		}
	};
	this._setview = function(opt) {
		_this._view = opt;
	};
	// 实体对象
	this.jsonData = {};
	this._jsonData = "";
	if(typeof(attributes) == "object") {
		var addflg = true;
		for(var o in attributes) {
			if(typeof(attributes[o]) != "string") {
				addflg = false;
				break;
			}
		}
		if(addflg) {
			this.jsonData = attributes;
		}
	}
	// 获取值方法
	this.get = function(code) {
		return this.jsonData[code];
	};
	// 设置值
	this.set = function(setJson, stringflg) {
		if(stringflg) {
			_this._jsonData = {};
		}
		for(var o in setJson) {
			var changeflg = false;
			if(this.jsonData[o] || this.jsonData[o] == 0) {
				if(this.jsonData[o] != setJson[o]) {
					changeflg = true;
				}
				this.jsonData[o] = setJson[o];
				if(stringflg) {
					this._jsonData[o] = setJson[o];
				}
				try {
					if(eval("change_" + o) && changeflg) {
						eval("change_" + o).call(null, this);
					}
				} catch(e) {

				}
			} else {
				changeflg = true;
				this.jsonData[o] = setJson[o];
				if(stringflg) {
					this._jsonData[o] = setJson[o];
				}
				try {
					if(eval("change_" + o) && changeflg) {
						eval("change_" + o).call(null, this);
					}
				} catch(e) {

				}
			}
		}
		if(stringflg) {
			_this._jsonData = JSON.stringify(_this._jsonData)
		}
	};
	// 根据key删除实体对象
	this.unset = function(jsonkey) {
		for(var o in jsonkey) {
			if(jsonkey[o]) {
				$.each(this.jsonData[o], function() {});
			} else {
				delete this.jsonData[o];
			}
		}
	};
	// 清除实体对象
	this.clear = function() {
		this.jsonData = {};
	};
	// 获取实体请求集合
	this.url = function() {
		return this.requertsetting;
	};
	// 根据key判断实体中是否包含对象
	this.has = function(jsonkey) {
		if(this.jsonData[jsonkey] == undefined) {
			return false;
		} else {
			return true;
		}
	};
	// 1.无参数，使用持久化的实体进行数据库操作
	// 2.一个参数，使用持久化的实体进行数据库操作，并且参数为回调方法参数（出参，类型非bool型）
	// 3.两个参数，第一个参数为操作数据库对象（入参），第二个参数为回调方法参数（出参，类型非bool型）
	// 4.两个参数，第一个参数为回调方法参数（出参），第二个参数使用转义后（string）的实体操作数据库
	// 5.一个参数，使用转义后（string）的实体操作数据库（类型bool型）
	this.fetch = function() {
		if(arguments.length == 0) {
			_this.searchparameter = null;
			this.wdsearch.dataobj = this.jsonData;
		} else if(arguments.length == 1) {
			if(typeof arguments[0] != "boolean") {
				for(o in arguments[0]) {
					this.wdsearch.dataobj[o] = arguments[0][o];
				}
				_this.searchparameter = null;
			} else {
				if(arguments[0]) {
					_this.searchparameter = null;
					this.wdsearch.dataobj = this._jsonData;
				} else {
					_this.searchparameter = null;
					this.wdsearch.dataobj = this.jsonData;
				}
			}
		} else if(arguments.length == 2) {
			if(typeof arguments[1] != "boolean") {
				// 补充查询条件
				for(o in arguments[0]) {
					this.wdsearch.dataobj[o] = arguments[0][o];
				}
				_this.searchparameter = arguments[1];
			} else {
				if(arguments[1]) {
					this.wdsearch.dataobj = this._jsonData;
					_this.searchparameter = arguments[0];
				} else {
					this.wdsearch.dataobj = this.jsonData;
					_this.searchparameter = arguments[0];
				}
			}
		}
		var _v = document.activeElement;
		if(_v && _v.nodeName.toUpperCase() == "BODY") {
			_v = dom_focus[dom_focus.length - 1];
		}
		crossDomainAjax(this.wdsearch, function(data) {
			_this.jsonData = data;
			if(_this.searchcallback) {
				data["_dom"] = _v;
				eval(_this.searchcallback).call(this, data, _this.searchparameter);
			}
		});
	};
	this.save = function() {
		// 模拟多态处理
		if(arguments.length == 0) {
			_this.saveparameter = null;
			this.wdsave.dataobj = this.jsonData;
		} else if(arguments.length == 1) {
			if(typeof arguments[0] != "boolean") {
				this.wdsave.dataobj = this.jsonData;
				_this.saveparameter = arguments[0];
			} else {
				if(arguments[0]) {
					_this.saveparameter = null;
					this.wdsave.dataobj = this._jsonData;
				} else {
					_this.saveparameter = null;
					this.wdsave.dataobj = this.jsonData;
				}
			}
		} else if(arguments.length == 2) {
			if(typeof arguments[1] != "boolean") {
				this.wdsave.dataobj = arguments[0];
				_this.saveparameter = arguments[1];
			} else {
				if(arguments[1]) {
					this.wdsave.dataobj = this._jsonData;
					_this.saveparameter = arguments[0];
				} else {
					this.wdsave.dataobj = this.jsonData;
					_this.saveparameter = arguments[0];
				}
			}
		}

		var _v = document.activeElement;
		if(_v && _v.nodeName.toUpperCase() == "BODY") {
			_v = dom_focus[dom_focus.length - 1];
		}
		crossDomainAjax(this.wdsave, function(data) {
			if(_this.savecallback) {
				data["_dom"] = _v;
				eval(_this.savecallback).call(this, data, _this.saveparameter);
			}
		});
	};
	this.update = function() {
		if(arguments.length == 0) {
			_this.updateparameter = null;
			this.wdupdate.dataobj = this.jsonData;
		} else if(arguments.length == 1) {
			if(typeof arguments[0] != "boolean") {
				this.wdupdate.dataobj = this.jsonData;
				_this.updateparameter = arguments[0];
			} else {
				if(arguments[0]) {
					_this.updateparameter = null;
					this.wdupdate.dataobj = this._jsonData;
				} else {
					_this.updateparameter = null;
					this.wdupdate.dataobj = this.jsonData;
				}
			}
		} else if(arguments.length == 2) {
			if(typeof arguments[1] != "boolean") {
				this.wdupdate.dataobj = arguments[0];
				_this.updateparameter = arguments[1];
			} else {
				if(arguments[1]) {
					this.wdupdate.dataobj = this._jsonData;
					_this.updateparameter = arguments[0];
				} else {
					this.wdupdate.dataobj = this.jsonData;
					_this.updateparameter = arguments[0];
				}
			}
		}

		var _v = document.activeElement;
		if(_v && _v.nodeName.toUpperCase() == "BODY") {
			_v = dom_focus[dom_focus.length - 1];
		}
		crossDomainAjax(this.wdupdate, function(data) {
			if(_this.updatecallback) {
				data["_dom"] = _v;
				eval(_this.updatecallback).call(this, data, _this.updateparameter);
			}
		});
	};
	this.destroy = function() {
		if(arguments.length == 0) {
			_this.deleteparameter = null;
			this.wddelete.dataobj = this.jsonData;
		} else if(arguments.length == 1) {
			if(typeof arguments[0] != "boolean") {
				this.wddelete.dataobj = this.jsonData;
				_this.deleteparameter = arguments[0];
			} else {
				if(arguments[0]) {
					_this.deleteparameter = null;
					this.wddelete.dataobj = this._jsonData;
				} else {
					_this.deleteparameter = null;
					this.wddelete.dataobj = this.jsonData;
				}
			}
		} else if(arguments.length == 2) {
			if(typeof arguments[1] != "boolean") {
				this.wddelete.dataobj = arguments[0];
				_this.deleteparameter = arguments[1];
			} else {
				if(arguments[1]) {
					this.wddelete.dataobj = this._jsonData;
					_this.deleteparameter = arguments[0];
				} else {
					this.wddelete.dataobj = this.jsonData;
					_this.deleteparameter = arguments[0];
				}
			}
		}
		var _v = document.activeElement;
		if(_v && _v.nodeName.toUpperCase() == "BODY") {
			_v = dom_focus[dom_focus.length - 1];
		}
		crossDomainAjax(this.wddelete, function(data) {
			if(_this.deletecallback) {
				_this.clear();
				data["_dom"] = _v;
				eval(_this.deletecallback).call(this, data, _this.deleteparameter);
			}
		});
	};
	this._setRequestSetting = function(setting, key) {
		var opts = {};
		// json请求地址、例外请求地址
		if(setting["jsonurl"]) {
			if(typeof setting["jsonurl"] == "function") {
				opts.url = setting["jsonurl"].call();
			} else {
				opts.url = setting["jsonurl"];
			}
		}
		// 真实请求地址
		if(setting["requesturl"]) {
			if(typeof setting["requesturl"] == "function") {
				opts.requesturl = setting["requesturl"].call();
			} else {
				opts.requesturl = setting["requesturl"];
			}
		}
		// 请求超时
		if(setting["timeout"]) {
			opts.timeout = setting["timeout"];
		} else {
			opts.timeout = 10000;
		}
		// 请求参数
		if(setting["requestdata"]) {
			opts.dataobj = setting["requestdata"];
		} else {
			opts.dataobj = {};
		}
		// 是否使用例外、json请求地址（在真实环境下）
		if(setting["redirecturl"]) {
			opts.redirectUrl = setting["redirecturl"];
		}
		// 例外请求类型
		if(setting["requesttype"]) {
			opts.requestType = setting["requesttype"];
		}
		// 是否需要加载等待动画
		if(setting["waitflg"]) {
			opts.waitFlg = setting["waitflg"];
		}
		// 链接方式
		if(setting["contenttype"]) {
			opts.contentType = setting["contenttype"];
		}
		// 请求地址key
		if(setting["addressKey"]) {
			opts.addressKey = setting["addressKey"];
		}
		// 同步异步
		if(setting["async"] != undefined && setting["async"] != "undefined") {
			opts.async = setting["async"];
		}
		// 是否跨域
		if(setting["crossdomain"]) {
			opts.crossdomain = setting["crossdomain"];
		}
		// 是否序列化
		if(setting["traditional"]) {
			opts.traditional = setting["traditional"];
		}

		this["wd" + key] = opts; // 注册对象
	};
	// 实例化方法
	this.initialize = function() {
		for(var i = 0; i < this.arguments.length; i++) {
			if(typeof(this.arguments[i]) == "object") {
				for(var o in this.arguments[i]) {
					// 调用继承的实例化方法
					if(o == "initialize") {
						eval(this.arguments[i][o]).call();
					}
					// 初始化继承的实体数据
					else if(o == "defaults") {
						this.jsonData = this.arguments[i][o];
					} else if(o == "collection") {
						this.collection = this.arguments[i][o];
					} else if(o == "requertsetting") {
						this.requertsetting = this.arguments[i][o];
						if(this.collection) {
							var _b = {};
							for(var s in this.requertsetting) {
								if(_b[this.requertsetting[s]["modelkey"]]) {
									_i = _b[this.requertsetting[s]["modelkey"]].length;
									_b[this.requertsetting[s]["modelkey"]][_i] = this.requertsetting[s]
								} else {
									_b[this.requertsetting[s]["modelkey"]] = [];
									_b[this.requertsetting[s]["modelkey"]][0] = this.requertsetting[s]
								}
							}
							for(var k in _b) {
								_name = k;
								var k = new WD.Model.extend({
									initialize: function() {

									},
									requertsetting: _b[k]
								});
								this.collection.add(_name, k);
							}
						} else {
							for(var s in this.requertsetting) {
								var key = this.requertsetting[s]["requestkey"];
								this[key + "callback"] = this.requertsetting[s]["callback"]; // 注册回调方法
								this[key + "parameter"] = this.requertsetting[s]["parameter"]; // 注册回调参数
								this._setRequestSetting(this.requertsetting[s], key); // 注册请求对象参数
								if(key == "search") { // 处理查询接口属性，并初始化页面
									crossDomainAjax(this.wdsearch, function(data) {
										_this.jsonData = data;
										if(_this.searchcallback) {
											eval(_this.searchcallback).call(this, data, _this.searchparameter);
										}
									});
								} else if(key != "search" && key != "save" && key != "update" && key != "delete") { // 其他自定义后台请求接口
									this[key] = function() { // 注册自定义事件
										var name, opt, parameter, forid, fn;
										if(arguments.length == 1) {
											name = arguments[0];
										} else if(arguments.length == 2) {
											name = arguments[0];
											opt = arguments[1];
											this["wd" + name].dataobj = opt;
										} else if(arguments.length == 3) {
											name = arguments[0];
											opt = arguments[1];

											if(typeof arguments[2] == "object") {
												this["wd" + name].dataobj = opt;
												parameter = arguments[2];
											} else if(typeof arguments[2] == "function") {
												this["wd" + name].dataobj = opt;
												fn = arguments[2];
											} else {
												// 表格特殊处理
												for(o in opt) {
													this["wd" + name].dataobj[o] = opt[o];
												}
												forid = arguments[2];
											}
										}
										var _v = document.activeElement;
										if(_v && _v.nodeName.toUpperCase() == "BODY") {
											_v = dom_focus[dom_focus.length - 1];
										}
										if(parameter) {
											_this[name + "parameter"] = parameter;
										} else {
											_this[name + "parameter"] = null;
										}
										crossDomainAjax(this["wd" + name], function(data) {
											// 表格特殊处理
											if(forid) {
												_hidehead = _this._view.partlist[forid].data.hidehead;
												_this._view.partlist[forid].replace(data, null, forid,_hidehead);
											}
											// 特殊回调
											if(fn) {
												fn.call(this, data);
											} else {
												// 真实回调
												if(_this[name + "callback"]) {
													data["_dom"] = _v;
													eval(_this[name + "callback"]).call(this, data, _this[name + "parameter"]);
												}
											}
										});
									}
								}
							}
						}
					}
					// 注册自定义方法
					else {
						if(typeof(this.arguments[i][o]) == "function") {
							this[o] = this.arguments[i][o];
						}
					}
				}
			} else {
				//alert(this.arguments[i]);
			}
		}
	};
	this.initialize.apply(this);
};
// 实体扩展
WD.Model.extend = function() {
	WD.Model.apply(this, arguments); // 继承父对象
	this.initialize = function() {
		WD.Model.apply(this, arguments);
	};
};
// 实体数组
WD.Collection = function(attributes) {
	var _this = this;
	// 参数说明
	this.arguments = arguments;
	// 实体集合
	this.collent = new Array();
	// 实体集合长度
	this.length = 0;
	// 添加实体方法
	this.add = function(modelname, model) {
		var addFlg = true;
		for(var i = 0; i < this.collent.length; i++) {
			if(this.collent[i].name == modelname) {
				addFlg = false;
				break;
			}
		}
		if(addFlg) {
			this.collent.push({
				"name": modelname,
				"value": model
			});
			this.length = this.collent.length;
		}
	};
	// 获取实体
	this.get = function(model) {
		for(var i = 0; i < this.collent.length; i++) {
			if(this.collent[i].name == model) {
				return this.collent[i].value;
			}
		}
	};
	// 判断是否存在
	this.has = function(model) {
		var _flg = false;
		for(var i = 0; i < _this.collent.length; i++) {
			if(_this.collent[i]["name"] == model) {
				_flg = true;
				break;
			}
		}
		return _flg;
	};
	// 删除实体
	this.remove = function(model) {
		for(var i = 0; i < this.collent.length; i++) {
			if(this.collent[i] == model) {
				this.collent.pop(model);
				this.length = this.collent.length;
			}
		}
	};
	// 重新设置实体
	this.reset = function() {
		for(var i = 0; i < this.collent.length; i++) {
			_model = this.collent[i]
			this.collent.pop(_model);
			this.length = this.collent.length;
		}
	};
	// 遍历实体
	this.each = function(models, func) {
		for(var i = 0; i < models.collent.length; ++i) {
			func(models.collent[i]);
		}
	};
	// 实例化方法
	this.initialize = function() {
		for(var i = 0; i < this.arguments.length; i++) {
			if(typeof(this.arguments[i]) == "object") {
				for(var o in this.arguments[i]) {
					// 调用继承的实例化方法
					if(o == "initialize") {
						eval(this.arguments[i][o]).call();
					} else {
						if(typeof(this.arguments[i][o]) == "function") {
							this[o] = this.arguments[i][o];
						}
					}
				}
			} else {
				//alert(this.arguments[i]);
			}
		}
	};

	this.initialize.apply(this);
};
// 实体数组扩展
WD.Collection.extend = function() {
	WD.Collection.apply(this, arguments);
};

WD.View = function(attributes) {
	_this = this;
	this.partlist = {};
	this.actionlist = {};
	this.subviewarray = null;
	this.subview = {};
	this._addsubview = function(viewkey, viewobj) {
		this.subview[viewkey] = viewobj;
	};
	this._ = function(jsondata) {
		var _ = "";
		for(var o in jsondata) {
			if(typeof(jsondata[o]) == "object") {
				_ = _ + _this._(jsondata[o])
			} else {
				if(jsondata[o].indexOf("{{") == -1) {
					_ = _ + jsondata[o] + "\n";
				}
			}
		}
		return _;
	};
	this._actionReplace = function(data) {
		var _id = this.data.id;
		var _tempdata = this.data[_id];
		var _actionarray = $("#" + _id).attr("name").replace("{{", "").replace("}}", "").split(' ');
		var _modelname, _requestname;
		for(var o in _tempdata) {
			delete _tempdata["0"];
			delete _tempdata["_"];
		}
		for(var i = 0; i < _actionarray.length; i++) {
			if(_actionarray[i].split('=')[0] == "modelname") {
				_modelname = _actionarray[i].split('=')[1];
			}
			if(_actionarray[i].split('=')[0] == "requestkey") {
				_requestname = _actionarray[i].split('=')[1];
			}
		}
		eval(_modelname.trim())[_requestname.trim()](_requestname.trim(), this.data.jsondata, function(opt) {
			for(var o in _tempdata) {
				if(typeof(_tempdata[o]) == "object") {
					_tempdata[o] = changeEachData(_tempdata[o], opt, null, null, null);
				} else {
					var _temparray = _tempdata[o].split("{{");
					var _temp = _temparray[0];
					for(var j = 1; j < _temparray.length; j++) {
						var _a = getModelValue(opt, _temparray[j].split("}}")[0].split('.'));
						if(_a || _a == 0 || _a == "") {
							_temp = _temp + _a + _temparray[j].split("}}")[1];
						} else {
							_temp = _temp + _temparray[j].split("}}")[1];
						}
					}
					_tempdata[o] = _temp;
				}
			}
			// 还原
			var responseData = "";
			for(var o in _tempdata) {
				if(typeof(_tempdata[o]) != "object") {
					if(_tempdata[o].indexOf("{{each") == -1) {
						responseData = responseData + _tempdata[o] + "\n";
					}
				} else {
					responseData = responseData + getJsonValue(_tempdata[o]);
				}
			}
			$("#" + _id)[0].innerHTML = responseData;
		});
	};
	this._parentAppend = function(data, fn) {
		var _viewId = _this.jsonData.id;
		var _id = this.data.id;
		var _tempdata = this.data[_id];
		for(var o in _tempdata) {
			delete _tempdata["0"];
			delete _tempdata["_"];
		}
		var _ = ""
		for(var o in _tempdata) {
			_ = changeEachData(_tempdata[o], data, null, null, null)
		}
		var _html = "";
		for(var o in _) {
			if(typeof(_[o]) == "object") {
				_html = _html + _this._(_[o]);
			} else {
				if(_[o].indexOf("{{") == -1) {
					_html = _html + _[o] + "\n";
				}
			}
		}
		$("#" + _id)[0].innerHTML = $("#" + _id)[0].innerHTML + _html;
		pagePostProcessing(_viewId);
		if(fn) {
			fn.call();
		}
	};
	this._getCheckValue = function(tableid,flg){
		var _cv = "";
		var _name = "";
		if(!flg){
			_name = ".wd-check";
		}else{
			_name = ".wd-radio";
		}
		$("#" + tableid).find(_name).each(function(){
			if($(this)[0].nodeName == "INPUT" && $(this)[0].checked && $(this)[0].value){
				_cv = _cv + $(this)[0].value + ",";
			}
		});
		return _cv.substring(0,_cv.length-1);
	};
	this._parentReplace = function(data, fn, forid,hidehead) {
		var _viewId = _this.jsonData.id;
		var _id = this.data.id;
		var _tempdata = this.data[_id];
		for(var o in _tempdata) {
			delete _tempdata["0"];
			delete _tempdata["_"];
		}
		var _ = ""
		for(var o in _tempdata) {
			_ = changeEachData(_tempdata[o], data, null, null, null)
		}
		var _html = "";
		for(var o in _) {
			if(typeof(_[o]) == "object") {
				_html = _html + _this._(_[o]);
			} else {
				if(_[o].indexOf("{{") == -1) {
					_html = _html + _[o] + "\n";
				}
			}
		}
		// 表格处理
		if(forid) {
			if(!hidehead){
				_html = $("#" + forid).find("tr").eq(0)[0].outerHTML + _html;
			}
		}
		$("#" + _id)[0].innerHTML = _html;
		pagePostProcessing(_viewId);
		if(fn) {
			fn.call();
		}
	};
	this._lodepage = function(opt, fn) {
		// 自定义homelink地址
		var customlinkurl = "";
		if("undefined" != typeof customhomelinkurl) {
			customlinkurl = customhomelinkurl;
		}
		var homelinkurl = (opt.jsonData.homelinkurl) ? opt.jsonData.homelinkurl : customlinkurl;

		if(store.get(opt.jsonData.homelinkkey)) {
			loadsrc = store.get(opt.jsonData.homelinkkey)[opt.jsonData.homelinkkey];
			opt.jsonData.internationaurl = loadsrc.internationaurl;
			var _viewid = (loadsrc.templateid) ? loadsrc.templateid : mainPageTemplateId;
			if(_viewid.indexOf('#') == -1 && _viewid.indexOf('.') == -1) {
				_viewid = "#" + _viewid;
			}
			opt.jsonData.id = _viewid;
			loadHeadJs(loadsrc.jsurlarray, loadsrc.cssurl, function() {
				loadsrc = store.get(opt.jsonData.homelinkkey)[opt.jsonData.homelinkkey];
				var setting = {
					url: loadsrc.pageurl,
					urlversion: loadsrc.pageversion,
					id: (loadsrc.templateid) ? loadsrc.templateid : mainPageTemplateId,
					internationaurl: loadsrc.internationaurl,
					internationaversion: loadsrc.internationaversion,
					parameters: (opt.jsonData.parameters) ? opt.jsonData.parameters : {},
					pageloadefn: fn,
					model: (opt.jsonData.model) ? opt.jsonData.model : null,
					view: opt
				};
				if(!_this.jsonData._subflg) {
					addurl(setting);
					if(wd_back.length > 1 && getBrowserVersion().split(' ')[0] != "IE") {
//						history.pushState(null, "", "");
//						history.replaceState(null, "", "");
					}
				}
				if(fn) {
					getTemplate(setting, eval(fn), opt);
				} else {
					getTemplate(setting, null, opt);
				}
			});
		} else {
			$.ajax({
				type: "get",
				url: appAddress + "app/json/" + homelinkurl + "mvchomelink.json?time=" + new Date().getTime(),
				dataType: "json",
				success: function(data) {
					store.set(opt.jsonData.homelinkkey, data);
					var loadsrc = data[opt.jsonData.homelinkkey];
					opt.jsonData.internationaurl = loadsrc.internationaurl;
					var _viewid = (loadsrc.templateid) ? loadsrc.templateid : mainPageTemplateId;
					if(_viewid.indexOf('#') == -1 && _viewid.indexOf('.') == -1) {
						_viewid = "#" + _viewid;
					}
					opt.jsonData.id = _viewid;
					loadHeadJs(loadsrc.jsurlarray, loadsrc.cssurl, function() {
						var setting = {
							url: loadsrc.pageurl,
							urlversion: loadsrc.pageversion,
							id: (loadsrc.templateid) ? loadsrc.templateid : mainPageTemplateId,
							internationaurl: loadsrc.internationaurl,
							internationaversion: loadsrc.internationaversion,
							parameters: (opt.jsonData.parameters) ? opt.jsonData.parameters : {},
							pageloadefn: fn,
							model: opt.jsonData.model
						};
						addurl(setting);
						if(wd_back.length > 1 && getBrowserVersion().split(' ')[0] != "IE") {
//							history.pushState(null, "", "");
//							history.replaceState(null, "", "");
						}
						if(fn) {
							getTemplate(setting, eval(fn), opt);
						} else {
							getTemplate(setting, null, opt);
						}
					});
				}
			})
		}
	};
	this._validaterules = {
		rules: {
			"Length": {
				"message": eval("wd_language_msg_valiadtemsglength_" + getLanguageFromCookie()),
				"validator": function(value, param) {
					var len = value.replace(/[^\x00-\xff]/g, '**').trim().length;
					param[2] = (param[1] / 2).toString().split('.')[0];
					if(len == 0) return true;
					return len <= param[1]
				}
			},
			"Email": {
				"message": eval("wd_language_msg_valiadtemsgemail_" + getLanguageFromCookie()),
				"validator": function(value) {
					return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
						.test(value);
				}
			},
			"Phone": {
				"message": eval("wd_language_msg_valiadtemsgphone_" + getLanguageFromCookie()), //'请输入有效的电话号码',
				"validator": function(value, param) {
					var len = value.trim().length;
					return len <= param[0] && /^[0-9\|,|#|\-|$|&|*|@|!|%|^|\(|\)|\+|_|\= ]+$/i.test(value);
				}
			},
			"onlyNumber": {
				validator: function(value, param) {
					var len = value.trim().length;
					return len >= param[0] && len <= param[1] && /^[0-9]+$/i.test(value);
				},
				"message": eval("wd_language_msg_valiadtemsgnumber_" + getLanguageFromCookie())
			}
		}
	};
	// 参数说明
	this.arguments = arguments;
	// 对象
	this.jsonData = {};
	// 获取国际化json对象
	this.internation = function() {
		return getInternationalizationInfo(this.jsonData.internationaurl, commonversion);
	};
	this.check = function(otherMsg) {
		var msg = "";
		$(_this.jsonData.id).find(".wd-validation").each(function() {
			// 处理必填
			if($(this).data('required') && $(this).val().trim() == "") {
				msg = msg + $(this).data('msg') + "：" + eval("wd_language_msg_notempty_" + getLanguageFromCookie()) + "<br>";
			}
			// 处理其他规则
			if($(this).data('validtype')) {
				var result = /([a-zA-Z_]+)(.*)/.exec($(this).data('validtype'));
				var value = $(this).val();
				var rule = _this._validaterules.rules[result[1]];

				if(value && rule) {
					var param = eval(result[2]);
					if(!rule['validator'](value, param)) {
						var message = rule['message'];
						if(param) {
							for(var k = 0; k < param.length; k++) {
								message = message.replace(new RegExp("\\{" + k + "\\}", "g"), param[k]);
							}
						}
						message = $(this).data('msg') + "：" + message;
						msg = msg + message + "<br/>";
					}
				}
			}
		});
		if(otherMsg && typeof otherMsg == "string") {
			msg = msg + otherMsg;
		}else if(otherMsg && typeof otherMsg == "function"){
			msg = msg + otherMsg.call();
		}
		if(msg != "") {
			alert(msg);
			return false;
		} else {
			return true;
		}

	};
	// 根据页面对象获取最新mode
	this.getmodel = function(model, fn) {
		var checkboxdata = {}; // 临时保存checkbox键值对应
		var tempJson = {}; // 临时set对象
		// 获取input
		$(_this.jsonData.id).find("input").each(function() {
			if(this.type == "text" && this.className.indexOf("WDInput") == -1) { // 普通文本框处理
				tempJson[this.id] = this.value;
				model.set(tempJson);
			} else if(this.type == "text" && this.className.indexOf("WDInput") != -1) { // 码表框处理
				tempJson[this.id.split('_')[1].toLowerCase()] = document.getElementById(this.id.split('_')[1].toUpperCase()) ? document.getElementById(this.id.split('_')[1].toUpperCase()).value : '';
				model.set(tempJson);
			} else if(this.type == "radio") { // 单选框处理
				if($(this).next()[0].className.indexOf('wd-radio-check-active') != -1) {
					tempJson[this.id.split('_')[0]] = this.id.split('_')[1];
					model.set(tempJson);
				}
			} else if(this.type == "checkbox") { // 多选框处理
				if($(this).next()[0].className.indexOf('wd-checkbox-check-active') != -1) {
					if(checkboxdata[this.id.split('_')[0]]) {
						checkboxdata[this.id.split('_')[0]] = checkboxdata[this.id.split('_')[0]] + "," + this.id.split('_')[1];
					} else {
						checkboxdata[this.id.split('_')[0]] = this.id.split('_')[1];
					}
				}
			}
		});
		// 获取textarea
		$(_this.jsonData.id).find("textarea").each(function() {
			tempJson[this.id] = this.value;
			model.set(tempJson);
		});

		// checkbox后续处理
		for(var o in checkboxdata) {
			tempJson[o] = checkboxdata[o];
			model.set(tempJson);
		}

		if(fn) {
			fn.call();
		}
	};
	this.show = function(opt) {
		if(opt) {
			this.jsonData.model.jsonData = opt;
		}
		_this._lodepage(this, this._callback);
	};
	this._callback = function() {};
	// 实例化方法
	this.initialize = function() {
		for(var i = 0; i < this.arguments.length; i++) {
			if(typeof(this.arguments[i]) == "object") {
				for(var o in this.arguments[i]) {
					// 调用继承的实例化方法
					if(o == "initialize") {
						if(_this.arguments[i]["defaults"].homelinkkey) {
							_this._callback = this.arguments[i][o];
							_this._lodepage(_this, this.arguments[i][o]);
						}
					} else if(o == "defaults") {
						_this.jsonData = this.arguments[i][o];
						if(this.arguments[i][o].model) {
							if(_this.arguments[i][o].model._setview) {
								_this.arguments[i][o].model._setview(_this);
							} else {
								_this.arguments[i][o].model["jsonData"] = _this.arguments[i][o].model;
							}
						}
						if(this.arguments[i][o].subviewarray) {
							_this.subviewarray = this.arguments[i][o].subviewarray;
						}
					} else {
						if(typeof(this.arguments[i][o]) == "function") {
							this[o] = this.arguments[i][o];
						}
					}
				}
			}
		}
	};
	this.initialize.apply(this);
};

WD.View.extend = function() {
	WD.View.apply(this, arguments);
};
//捕获后退键 作用于Firefox、Opera
//document.onkeypress = banBackSpace;
//捕获后退键 作用于IE、Chrome 
document.onkeydown = banBackSpace;
//处理键盘事件 捕获后退、刷新键（Backspace、F5）密码或单行、多行文本框除外 
function banBackSpace(e) {
	var ev = e || window.event; //获取event对象 
	var obj = ev.target || ev.srcElement; //获取事件源 
	var t = obj.type || obj.getAttribute('type'); //获取事件源类型 
	//获取作为判断条件的事件类型 
	var vReadOnly = obj.getAttribute('readonly');
	var vEnabled = obj.getAttribute('enabled');
	var vContentEditable = obj.getAttribute('contentEditable');
	//处理null值情况 
	vReadOnly = (vReadOnly == null) ? false : vReadOnly;
	vEnabled = (vEnabled == null) ? true : vEnabled;
	vContentEditable = (vContentEditable == null) ? true : vContentEditable;
	//并且readonly属性为true或enabled属性为false的，则退格键失效 
	if(ev.keyCode == 8) {
		if(t == undefined) {
			var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") &&
				(vReadOnly == true || vEnabled != true || vContentEditable == "true")) ? true : false;
			// 处理可编辑div
			if(vContentEditable == "true") {
				flag1 = true;
			}
			//判断 
			if(flag1) {
				//				return false;
			} else {
				backurl();
				return false;
			}
		}
	} else if(ev.keyCode == 116) {
		ev.keyCode = 0;
		ev.cancelBubble = true;
		refurbishurl();
		return false;
	}
};
// 判断是否为pc端
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("PAD", "Android", "iPhone", "iPad");
	var flag = true;
	for(var v = 0; v < Agents.length; v++) {
		if(userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = Agents[v];
			break;
		}
	}
	return flag;
};
// 加载国际化数据
function getInternationalizationInfo(url, version) {
	var language = getLanguageFromCookie();
	var jsondata;
	if(store.get(url + language + version)) {
		jsondata = store.get(url + language + version);
	} else {
		$.ajax({
			type: "get",
			url: appAddress + url + "_" + language + ".properties",
			async: false,
			success: function(data) {
				jsondata = eval("(" + data + ")");
				if(requestType != "app") {
					store.set(url + language + version, jsondata);
				}
			}
		});
	}
	return jsondata;
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
// 动态加载css
// url需加载css
// cssarray需要加载的集合
// num当前需要加载的位置
function addCss(url, cssarray, num) {
	// 处理重复加载
	if(document.getElementById(url) == null) {
		var t = document.createElement('link');
		if(url.indexOf('ui/') >= 0) {
			t.href = appAddress + url; // 测试地址
		} else {
			t.href = getRequestAddressUrl("components") + url;
		}
		t.rel = 'stylesheet';
		t.className = "wd-headCss";
		t.id = url;
		document.getElementsByTagName('head')[0].appendChild(t);
	}
	num = num + 1;

	if(cssarray[num]) addCss(cssarray[num], cssarray, num);
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
		s[i].setAttribute("charset", "UTF-8");
		s[i].onreadystatechange = function() {
			if(getBrowserVersion() == "IE 8") {
				if(!0 || this.readyState == "loaded" || this.readyState == "complete") {
					//					this.onreadystatechange = null;
					if(i != last) {
						recursiveLoad(i + 1);
					} else if(typeof(callback) == "function") {
						callback();
					}
				}
			}
		}
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
		if(scripts[i].jsurl.indexOf('ui/') >= 0) {
			s[i].setAttribute("src", appAddress + scripts[i].jsurl + "?version=" + scripts[i].version);
		} else {
			s[i].setAttribute("src", getRequestAddressUrl("components") + scripts[i].jsurl + "?version=" + scripts[i].version);
		}
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
		if(scripts[i].jsurl.indexOf('ui/') >= 0) {
			s[i].setAttribute("src", appAddress + scripts[i].jsurl + "?version=" + scripts[i].version);
		} else {
			s[i].setAttribute("src", getRequestAddressUrl("components") + scripts[i].jsurl + "?version=" + scripts[i].version);
		}
		HEAD.appendChild(s[i]);
	}
};
// 获取服务端语言类型，并设置本地cookie
function getLanguageFromCookie() {
	var name = "language";
	var language = getCookie(name);
	if(!language) {
		try {
			language = CookieDefault;
		} catch(e) {
			language = "zh";
		}
		var domainarray = document.domain.split('.');
		var domain = domainarray[domainarray.length - 2] + "." + domainarray[domainarray.length - 1];
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		//domain
		document.cookie = name + "=" + escape(language) + ";path=/;expires=" + exp.toGMTString();
	}
	return language;
};

function getRequestAddressUrl(addKey) {
	var language = getLanguageFromCookie();
	var retUrl = "";
//	if(addKey) {
//		if(typeof(environmentType) == "undefined" || environmentType == "kf") {
//			retUrl = requestAddressList[addKey].url; // 开发路径
//		} else if(environmentType == "test") {
//			retUrl = requestAddressList[addKey].testurl; // 测试路径
//		} else if(environmentType == "demo") {
//			retUrl = requestAddressList[addKey].demourl; // 演示路径
//		} else if(environmentType == "product") { // 生成路径
//			if(requestAddressList[addKey].porducturllist) {
//				retUrl = requestAddressList[addKey].porducturllist[apphost];
//			} else {
//				retUrl = requestAddressList[addKey].producturl;
//			}
//		}
//	}
//	// 根据语言导入后台提示信息对照表
//	if(!store.get("msgCode" + msgversion)) {
//		if(addKey == "app") {
//			$.ajax({
//				type: "get",
//				url: retUrl + "app/i18n/msgCode_" + language + ".properties",
//				async: false,
//				success: function(data) {
//					store.set("msgCode" + msgversion, data);
//				}
//			});
//		}
//	}
	return retUrl;
};
// 共通请求方法
// url 原型地址
// requesturl 真实开发地址
// dataobj 参数
// requestType请求类型,无特殊情况此值传null
// waitFlg 是否需要显示等待
// successCallback 成功回调
var wd_common_token = false;
var wd_common_url = "";
// 清洗json中undefined、null 转换成‘’
function chacgeundefnull(jsondata) {
	if(jsondata != "{[]}" && typeof jsondata == "string") {
		jsondata = eval("(" + jsondata + ")");
	}
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
			} else {
				jsondata[o] = jsondata[o].toString().trim();
				//				jsondata[o] = jsondata[o].toString().replace('<', '&lt;');
				//				jsondata[o] = jsondata[o].toString().replace('>', '&gt;');
			}
		}
	}

	return jsondata;
}

function defaultRequestData(setting) {
	var defaults = {
		requesturl: null, // 后台请求地址
		dataobj: "{[]}", // 请求参数
		redirectUrl: false, // 例外请求地址
		requestType: null, // 例外请求类型
		waitFlg: false, // 是否需要加载等待动画
		contentType: "application/x-www-form-urlencoded", // c端使用application/json
		addressKey: "", // 请求地址key
		async: true,
		crossdomain: false,
		traditional: false // 系列化
	}
	return $.extend(defaults, setting);
}

function crossDomainAjax(opts, fn) {
	// 处理按钮重复提交
	var activeEle = false;
	try {
		activeEle = document.activeElement;
		if(activeEle.nodeName != "BODY") {
			activeEle.disabled = true;
		}
	} catch(e) {

	}
	removeWaitDiv("waitSubmit");
	removeWaitDiv("errorSubmit");
	removeWaitDiv("timeOutSubmit");

	var opts = defaultRequestData(opts);
	var requestAddress = getRequestAddressUrl(opts.addressKey);
	var jsonString = false;
	if(typeof opts.dataobj == "string") {
		jsonString = true;
	}
	opts.dataobj = chacgeundefnull(opts.dataobj);
	if(jsonString) {
		opts.dataobj = JSON.stringify(opts.dataobj);
	}
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
	if(opts.requestType) {
		ajaxtype = opts.requestType;
	}
	var temp = new Date().getTime();
	var timeOuteSecode = opts.timeout; // 超时设置10s
	if(wd_common_token == true && wd_common_url == ajaxurl) return;
	wd_common_token = true;
	wd_common_url = ajaxurl;

	if(ajaxurl.indexOf('?') != -1) {
		ajaxurl = ajaxurl + "&time=" + temp;
	} else {
		ajaxurl = ajaxurl + "?time=" + temp;
	}
	// 添加等待
	if(opts.waitFlg) {
		createWaitDiv("wait.gif", "waitSubmit");
		//////////////////////////
		//				createWaitDiv("error.png", "errorSubmit", function() {
		//					crossDomainAjax(opts)
		//				});
		//////////////////////////
	}
	$.ajax({
		type: ajaxtype,
		dataType: 'json',
		url: ajaxurl,
		data: opts.dataobj,
		async: opts.async,
		crossDomain: opts.crossdomain,
		timeout: timeOuteSecode,
		contentType: opts.contentType,
		traditional: opts.traditional,
		//		beforeSend: function(request) {
		//              request.setRequestHeader("Wd-Token", "6906a947-bd3e-49d7-a914-73015afffaac");
		//          }, 
		success: function(data) {
			if(activeEle) {
				activeEle.disabled = false;
			}
			wd_common_token = false;
			if(opts.waitFlg) {
				removeWaitDiv("waitSubmit");
			}
			if(fn) {
				fn.call('', data);
			}
		},
		error: function(XMLHttpRequest, txtStatus, errorThrown) {
				if(activeEle) {
					activeEle.disabled = false;
				}
				wd_common_token = false;
				if(opts.waitFlg) {
					removeWaitDiv("waitSubmit");
				}
				createWaitDiv("error.png", "errorSubmit", function() {
					crossDomainAjax(opts)
				});
			}
			//		,
			//		complete: function(XMLHttpRequest, status) {
			//			if(activeEle) {
			//				activeEle.disabled = false;
			//			}
			//			wd_common_token = false;
			//			if(opts.waitFlg) {
			//				removeWaitDiv("waitSubmit");
			//			}
			//			if(status == 'timeout') {
			//				createWaitDiv("error.png", "timeOutSubmit", function() {
			//					crossDomainAjax(opts)
			//				});
			//			}　　
			//		}
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
	if(imgFlg == "wait.gif") {
		item.style.height = "130px";
		imgFlg = "wait_" + getLanguageFromCookie() + ".gif";
	}
	item.style.background = "url(" + appAddress + "ui/common/images/frameWork/" + imgFlg + ")";
	waitDiv.appendChild(item);
	if(imgFlg == "error.png") {
		var msg = document.createElement('span');
		msg.innerHTML = eval("wd_language_msg_dataloadeerror_" + getLanguageFromCookie()); //数据加载失败;
		msg.className = "wdWaitMsg";
		waitDiv.appendChild(msg);
	}
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
	if($("#" + id).length > 0) {
		$("#" + id).remove();
	}
};
// 加载模板
// settings.url:模板url
// settings.id:模板容器id
// settings.parameters:加载模板参数
// settings.internationaurl：国际化地址
// fn:回调方法
function getTemplate(settings, fn, view) {
	try { // 调用行为记录
		if(motionrecord && typeof(motionrecord) == "function") {
			motionrecord(settings.url);
		}
	} catch(e) {}
	// 删除提交处理start
	removeWaitDiv("waitSubmit");
	removeWaitDiv("errorSubmit");
	removeWaitDiv("timeOutSubmit");
	// 删除提交处理end
	$("#wd-vaildateTip").hide();
	if(!settings.parameters) {
		settings.parameters = {};
	}
	if(typeof(settings.parameters) == "string") {
		settings.parameters = {};
	}
	if(settings.internationaurl) {
		var languagedata = getInternationalizationInfo(settings.internationaurl, settings.internationaversion);
		if(checkJson(languagedata) && checkJson(settings.parameters)) {
			settings.parameters = jsonjoin(languagedata, settings.parameters);
		}
	}
	if(settings.parameters.i18n_title) {
		document.title = settings.parameters.i18n_title;
	}
	if(settings.id.indexOf('#') == -1 && settings.id.indexOf('.') == -1) {
		settings.id = "#" + settings.id;
	}
	var themeUrl = appAddress + settings.url;
	// 设置移动端主题
	if(IsPC() != true) {
		var tempflg = IsPC().toUpperCase();
		if(tempflg == "ANDROID" || tempflg == "IPHONE") { // 手机
			themeUrl = themeUrl.split('.html')[0] + "_app" + ".html";
		} else if(tempflg == "IPAD" || tempflg == "PAD") { // 平板
			themeUrl = themeUrl.split('.html')[0] + "_pad" + ".html";
		}
	}
	var urlversion = (settings.urlversion) ? settings.urlversion : commonversion;
	if(store.get(themeUrl + urlversion)) {
		var responsJson = store.get(themeUrl + urlversion);
		if(settings.model) {
			// 处理循环,判断
			for(var o in responsJson) {
				if(typeof(responsJson[o]) == "object") {
					responsJson[o] = changeEachData(responsJson[o], settings.model.jsonData, null, null, view);
				} else {
					var _temparray = responsJson[o].split("{{");
					var _temp = _temparray[0];
					for(var j = 1; j < _temparray.length; j++) {
						var _a = getModelValue(settings.model.jsonData, _temparray[j].split("}}")[0].split('.'));
						if(_a || _a == 0 || _a == "") {
							_temp = _temp + _a + _temparray[j].split("}}")[1];
						} else {
							_temp = _temp + _temparray[j].split("}}")[1];
						}
					}
					responsJson[o] = _temp;
				}
			}
		}
		// 还原
		var responseData = "";
		for(var o in responsJson) {
			if(typeof(responsJson[o]) != "object") {
				if(responsJson[o].indexOf("{{each") == -1) {
					responseData = responseData + responsJson[o] + "\n";
				}
			} else {
				responseData = responseData + getJsonValue(responsJson[o]);
			}
		}
		$(settings.id)[0].innerHTML = responseData;
		pagePostProcessing(settings.id);
		$("body,html").animate({
			scrollTop: 0
		}, 200);
		// 处理字体样式
		setInternationalizationStyle();
		// 绑定日期控件
		setWdDate(settings.id);
		// 注册验证
		if(view) {
			setViewCheck(view);
			if(view.subviewarray) {
				for(var i = 0; i < view.subviewarray.length; i++) {
					var _temp = new WD.View.extend({
						defaults: {
							model: settings.model,
							homelinkkey: view.subviewarray[i]["pagekey"],
							_subflg: true
						},
						initialize: function() {
							view._addsubview(view.subviewarray[i]["pagekey"], _temp);
							view.subviewarray[i]["loadecallback"].call();
						}
					});
				}
			}
			if(view.actionlist) {
				for(var k in view.actionlist) {
					view.actionlist[k]["action"](view.actionlist[k]["data"]);
				}
			}
		}
		if(fn) fn.call("", settings.parameters);
	} else {
		$.ajax({
			type: "get",
			url: themeUrl,
			async: false,
			success: function(data) {
				var responseDataList = data.split('\n');
				// 解析json,国际化处理
				var responsJson = {};
				// 当前操作json子对象
				var tempJsonArray = new Array();
				tempJsonArray[tempJsonArray.length] = responsJson;
				// 同级if位置
				var tempiflocation = new Array();
				var elseflg = false;
				var elseflgJson;
				var elseifflg = false;
				var elseifJson;
				for(var i = 0; i < responseDataList.length; i++) {
					if(responseDataList[i].indexOf("{{pageTurningstart") >= 0) { // 翻页处理 调用 table.js
						elseflg = false;
						elseifflg = false;
						tempJsonArray[tempJsonArray.length - 1][i] = {};
						tempJsonArray[tempJsonArray.length] = tempJsonArray[tempJsonArray.length - 1][i];
						tempJsonArray[tempJsonArray.length - 1]["page"] = responseDataList[i];
					}else if(responseDataList[i].indexOf("{{emptytablestart") >= 0){ // 空表格处理
						elseflg = false;
						elseifflg = false;
						tempJsonArray[tempJsonArray.length - 1][i] = {};
						tempJsonArray[tempJsonArray.length] = tempJsonArray[tempJsonArray.length - 1][i];
						tempJsonArray[tempJsonArray.length - 1]["emptytable"] = responseDataList[i];
					} else if(responseDataList[i].indexOf("{{incloud") >= 0) {
						elseflg = false;
						elseifflg = false;
						responsJson[i] = changeLanguageData(changeIncloudData(responseDataList[i]), settings.parameters);
					} else if(responseDataList[i].indexOf("{{each") >= 0) {
						elseflg = false;
						elseifflg = false;
						tempJsonArray[tempJsonArray.length - 1][i] = {};
						tempJsonArray[tempJsonArray.length] = tempJsonArray[tempJsonArray.length - 1][i];
						tempJsonArray[tempJsonArray.length - 1]["each"] = responseDataList[i];
					} else if(responseDataList[i].indexOf("{{partstart") >= 0) {
						elseflg = false;
						elseifflg = false;
						tempJsonArray[tempJsonArray.length - 1][i] = {};
						tempJsonArray[tempJsonArray.length] = tempJsonArray[tempJsonArray.length - 1][i];
						tempJsonArray[tempJsonArray.length - 1]["part"] = responseDataList[i];
					} else if(responseDataList[i].indexOf("{{action") >= 0) {
						elseflg = false;
						elseifflg = false;
						tempJsonArray[tempJsonArray.length - 1][i] = {};
						tempJsonArray[tempJsonArray.length] = tempJsonArray[tempJsonArray.length - 1][i];
						tempJsonArray[tempJsonArray.length - 1]["action"] = responseDataList[i];
					} else if(responseDataList[i].indexOf("{{if") >= 0) {
						elseflg = false;
						elseifflg = false;
						tempJsonArray[tempJsonArray.length - 1][i] = {};
						tempJsonArray[tempJsonArray.length - 1][i]["if-elseif-else"] = "if-elseif-else";
						tempiflocation[tempiflocation.length] = tempJsonArray[tempJsonArray.length - 1][i];
						tempJsonArray[tempJsonArray.length - 1][i][i + "_if"] = {};
						tempJsonArray[tempJsonArray.length] = tempJsonArray[tempJsonArray.length - 1][i][i + "_if"];
						tempJsonArray[tempJsonArray.length - 1]["if"] = responseDataList[i];
					} else if(responseDataList[i].indexOf("{{elseif") >= 0) {
						elseflg = false;
						elseifflg = true;
						var iflocation = tempiflocation[tempiflocation.length - 1];
						iflocation[i + "_elseif"] = {};
						elseifJson = iflocation[i + "_elseif"];
						iflocation[i + "_elseif"]["elseif"] = responseDataList[i];
					} else if(responseDataList[i].indexOf("{{else}}") >= 0) {
						elseflg = true;
						elseifflg = false;
						var iflocation = tempiflocation[tempiflocation.length - 1];
						iflocation[i + "_else"] = {};
						elseflgJson = iflocation[i + "_else"];
						iflocation[i + "_else"]["else"] = responseDataList[i];
					} else {
						if(responseDataList[i].indexOf("{{end each}}") >= 0) {
							tempJsonArray.pop(tempJsonArray.length - 1);
						} else if(responseDataList[i].indexOf("{{endpart}}") >= 0) {
							tempJsonArray.pop(tempJsonArray.length - 1);
						} else if(responseDataList[i].indexOf("{{endpageTurning}}") >= 0) {
							tempJsonArray.pop(tempJsonArray.length - 1);
						} else if(responseDataList[i].indexOf("{{endemptytable}}") >= 0) {
							tempJsonArray.pop(tempJsonArray.length - 1);
						} else if(responseDataList[i].indexOf("{{endaction}}") >= 0) {
							tempJsonArray.pop(tempJsonArray.length - 1);
						} else if(responseDataList[i].indexOf("{{endif}}") >= 0) {
							tempJsonArray.pop(tempJsonArray.length - 1);
							tempiflocation.pop(tempiflocation.length - 1);
							elseflg = false;
							elseifflg = false;
						} else {
							if(elseflg) {
								elseflgJson[i] = changeLanguageData(responseDataList[i], settings.parameters);
							} else if(elseifflg) {
								elseifJson[i] = changeLanguageData(responseDataList[i], settings.parameters);
							} else {
								tempJsonArray[tempJsonArray.length - 1][i] = changeLanguageData(responseDataList[i], settings.parameters);
							}
						}
					}
				}
				// 缓存处理
				if(requestType != "app") {
					store.set(themeUrl + urlversion, responsJson);
				}
				if(settings.model) {
					// 处理循环,判断
					for(var o in responsJson) {
						if(typeof(responsJson[o]) == "object") {
							responsJson[o] = changeEachData(responsJson[o], settings.model.jsonData, null, null, view);
						} else {
							var _temparray = responsJson[o].split("{{");
							var _temp = _temparray[0];
							for(var j = 1; j < _temparray.length; j++) {
								var _a = getModelValue(settings.model.jsonData, _temparray[j].split("}}")[0].split('.'));
								if(_a || _a == 0 || _a == "") {
									_temp = _temp + _a + _temparray[j].split("}}")[1];
								} else {
									_temp = _temp + _temparray[j].split("}}")[1];
								}
							}
							responsJson[o] = _temp;
						}
					}
				}

				// 还原
				var responseData = "";
				for(var o in responsJson) {
					if(typeof(responsJson[o]) != "object") {
						if(responsJson[o].indexOf("{{each") == -1) {
							responseData = responseData + responsJson[o] + "\n";
						}
					} else {
						responseData = responseData + getJsonValue(responsJson[o]);
					}
				}
				$(settings.id)[0].innerHTML = responseData;
				pagePostProcessing(settings.id);
				$("body,html").animate({
					scrollTop: 0
				}, 200);
				// 处理字体样式
				setInternationalizationStyle();
				// 绑定日期控件
				setWdDate(settings.id);
				// 注册验证
				if(view) {
					setViewCheck(view);
					if(view.subviewarray) {
						for(var i = 0; i < view.subviewarray.length; i++) {
							var _temp = new WD.View.extend({
								defaults: {
									model: settings.model,
									homelinkkey: view.subviewarray[i]["pagekey"],
									_subflg: true
								},
								initialize: view.subviewarray[i]["loadecallback"]
							});
							view._addsubview(view.subviewarray[i]["pagekey"], _temp)
						}
					}
					if(view.actionlist) {
						for(var k in view.actionlist) {
							view.actionlist[k]["action"](view.actionlist[k]["data"]);
						}
					}
				}
				if(fn) fn.call("", settings.parameters);
			}
		});
	}
};

function _checkfordom(obj, view) {
	var _v;
	var _this = obj;
	if($(_this).data('required') && $(_this).val().trim() == "") {
		_v = $(_this).data("msg") + eval("wd_language_msg_notempty_" + getLanguageFromCookie());
	}
	// 处理其他规则
	if($(_this).data('validtype')) {
		var result = /([a-zA-Z_]+)(.*)/.exec($(_this).data('validtype'));
		var value = $(_this).val();
		var rule = view._validaterules.rules[result[1]];

		if(value && rule) {
			var param = eval(result[2]);
			if(!rule['validator'](value, param)) {
				var message = rule['message'];
				if(param) {
					for(var k = 0; k < param.length; k++) {
						message = message.replace(new RegExp("\\{" + k + "\\}", "g"), param[k]);
					}
				}
				_v = $(_this).data('msg') + "：" + message;
			}
		}
	}
	if(_v) {
		$("#wd-vaildateTipMsg")[0].innerHTML = _v;
		var poz = $(_this).offset();
		var _tipLeft = poz.left + $(_this).outerWidth() + 3;
		var _tipTop = poz.top;
		if($(_this).data('class')) {
			$("#wd-vaildateTip").css({
				top: _tipTop,
				left: _tipLeft,
				width: "auto",
				display: "block",
				position: "absolute",
				padding: "2px 4px",
			});
			$("#wd-vaildateTip")[0].className = $(_this).data('class');
		} else {
			$("#wd-vaildateTip").css({
				top: _tipTop,
				left: _tipLeft,
				width: $(_this).width(),
				display: "block",
				position: "absolute",
				padding: "2px 4px",
				border: "1px solid #666",
				backgroundColor: "#ffc",
				textAlign: "left",
				color: "#222",
				fontSize: "12px",
			});
		}
	} else {
		$("#wd-vaildateTip").hide();
	}
};

function setViewCheck(view) {
	$(view.jsonData.id).find(".wd-validation").each(function() {
		$(this).bind('click', function() {
			_checkfordom(this, view);
		});
		$(this).bind('blur', function() {
			_checkfordom(this, view);
		});
	});
};

function getJsonValue(obj) {
	var str = "";
	for(var o in obj) {
		if(typeof(obj[o]) == "object") {
			str = str + getJsonValue(obj[o]);
		} else {
			if(obj[o].indexOf("{{each") == -1) {
				str = str + obj[o] + "\n";
			}
		}
	}
	return str;
};

function setWdDate(id) {
	if(id.indexOf('#') == -1 && id.indexOf('.') == -1) {
		id = "#" + id;
	}
	$(id + ' .Wdate').focus(function() {
		var dateFmt = ($(this).data("datefmt")) ? $(this).data("datefmt") : "yyyy-MM-dd";
		var mindate = ($(this).data("mindate")) ? $(this).data("mindate") : "1900-01-01";
		var maxdate = ($(this).data("maxdate")) ? $(this).data("maxdate") : "2099-12-31";
		var defvalue = $(this).val();

		jQuery(this).wdDate({
			defvalue: defvalue,
			dateFmt: dateFmt,
			mindate: mindate,
			maxdate: maxdate
		});
	})
};

function setInternationalizationStyle() {
	$("input[type=text]").css("font-family", fontfamily);
	$("input[type=button]").css("font-family", fontfamily);
	$("textarea").css("font-family", fontfamily);
	$("a").css("font-family", fontfamily);
};

// 获取多选组id
function checkWdCheckGroupBox(obj) {
	if($(obj)[0].className.indexOf("wd-check-groupbox") != -1) {
		return obj;
	}
	if($(obj)[0].parentNode.nodeName.toUpperCase() != "BODY" && $(obj)[0].className.indexOf("wd-check-groupbox") == -1) {
		return checkWdCheckGroupBox($(obj)[0].parentNode);
	} else if($(obj)[0].parentNode.nodeName.toUpperCase() == "BODY" && $(obj)[0].className.indexOf("wd-check-groupbox") == -1) {
		return false;
	}
};

function addWdCheckBox(id) {
	$(id).find(".wd-check").each(function() {
		var _this = this;
		if(!$(_this).hasClass("wd-_")) {
			$(_this).addClass("wd-_");
			if(!document.getElementById("wd_checkBox_" + _this.id)) {
				// checkbox控件
				var div = document.createElement('div');
				div.id = "wd_checkBox_" + _this.id;
				div.className = "wd-checkbox-check" + " " + _this.className + " group_" + _this.name;
				// this.value真实数据库值
				// this.id.split('_')[1]码表值
				// 如果相等设置为选中
				if(this.value && this.id) {
					if(this.value.indexOf(this.id.split('_')[1]) != -1) {
						div.classList.add("wd-checkbox-check-active");
					}
				}
				// 替换样式,改为只读模式
				if($(_this).hasClass('wd-check-readonly')) {
					//div.className = "wd-checkbox-readonly" + " " + _this.className + " group_" + _this.name;
					div.classList.add("wd-checkbox-readonly");
				}
				// 赋初值
				if($(_this).hasClass("wd-check-active")) {
					div.classList.add("wd-checkbox-check-active");
					_this.checked = true;
				}
				$(div).bind('click', function() {
					// 屏蔽只读复选框
					if($(this).hasClass("wd-check-readonly")) {
						return false;
					}
					var __this = this;
					if(this.className.indexOf("wd-checkbox-check-active") != -1) { // 取消
						$(this).removeClass("wd-checkbox-check-active");
						$(this).addClass("wd-checkbox-check");
						_this.checked = false;
						$(".group_" + _this.id).each(function() {
							if(!$(this).hasClass("wd-check-readonly")) {
								$(this).removeClass("wd-checkbox-check-active");
								$(this).addClass("wd-checkbox-check");
								$(this).prev()[0].checked = false;
							}
						});
						// 处理多选框,取消选中状态
						if($(this).hasClass("group_" + _this.name)) {
							$($("#" + _this.name).next()[0]).removeClass("wd-checkbox-check-active");
							$($("#" + _this.name).next()[0]).addClass("wd-checkbox-check");

							var groupbox = checkWdCheckGroupBox(this.parentNode);
							if(groupbox) {
								$(groupbox).addClass("wd-check-allfalse");
								$(groupbox).removeClass("wd-check-alltrue");
							}
						}
					} else { // 选中
						$(this).removeClass("wd-checkbox-check");
						$(this).addClass("wd-checkbox-check-active");
						_this.checked = true;
						$(".group_" + _this.id).each(function() {
							if(!$(this).hasClass("wd-check-readonly")) {
								$(this).removeClass("wd-checkbox-check");
								$(this).addClass("wd-checkbox-check-active");
								$(this).prev()[0].checked = true;
							}
						});
						// 处理多选框,添加选中状态
						if($(this).hasClass("group_" + _this.name)) {
							var allSelectFlg = true;
							$(".group_" + _this.name).each(function() {
								if(!$(this).hasClass('wd-checkbox-check-active') && !$(this).hasClass("wd-check-readonly")) {
									allSelectFlg = false;
									return false
								}
							});
							if(allSelectFlg) {
								$($("#" + _this.name).next()[0]).removeClass("wd-checkbox-check");
								$($("#" + _this.name).next()[0]).addClass("wd-checkbox-check-active");
								var groupbox = checkWdCheckGroupBox(__this.parentNode);
								if(groupbox) {
									$(groupbox).addClass("wd-check-alltrue");
									$(groupbox).removeClass("wd-check-allfalse");
								}
							}
						}
					}
					// 多选按钮处理
					$(_this).click(); // 执行本身点击事件
				});
				$(div).insertAfter($(this));
				// lable控件
				if($(div).next().length > 0 && !$(div).hasClass("wd-nolink")) {
					var tempClass = $(div).next()[0].className;
					$(div).next()[0].className = "wd-checkbox-lable" + " " + tempClass;
					$($(div).next()[0]).bind('click', function() {
						$(div).click();
					});
				} else {
					if(!$(div).hasClass("wd-nolink")) {
						div.style.margin = "0 auto";
						div.style.float = "none";
					}
				}
				$(this).hide();
			}
		}
	});
};

function addWdRadioButton(id) {
	$(id).find(".wd-radio").each(function() {
		var _this = this;
		if(!$(_this).hasClass("wd-_")) {
			$(_this).addClass("wd-_");
			// radio控件
			var div = document.createElement('div');
			div.id = "wd_radio_" + _this.id;
			div.className = "wd-radio-check " + _this.name + " " + _this.className;
			// this.value真实数据库值
			// this.id.split('_')[1]码表值
			// 如果相等设置为选中
			if(this.value == this.id.split('_')[1]) {
				div.classList.add("wd-radio-check-active");
			}
			// 赋初值
			if($(_this).hasClass("wd-radio-active")) {
				div.classList.add("wd-radio-check-active");
				_this.checked = true;
			}
			$(div).bind('click', function() {
				// 屏蔽只读复选框
				if($(this).hasClass("wd-radio-readonly")) {
					return false;
				}
				if(!_this.checked) { // 选中
					// 隐藏域处理
					$("[name=" + _this.name + "]").each(function() {
						this.checked = false;
						$(this).next().addClass("wd-radio-check");
						$(this).next().removeClass("wd-radio-check-active");
					});
					$(this).removeClass("wd-radio-check");
					$(this).addClass("wd-radio-check-active");
					_this.checked = true;
				}
			});
			$(div).insertAfter($(this));

			// lable控件
			if($(div).next().length > 0 && !$(div).hasClass("wd-nolink")) {
				var tempClass = $(div).next()[0].className;
				$(div).next()[0].className = "wd-checkbox-lable" + " " + tempClass;
				$($(div).next()[0]).bind('click', function() {
					if($(div).hasClass("wd-radio-readonly")) {
						return false;
					}
					if(!_this.checked) { // 选中
						// 隐藏域处理
						$("[name=" + _this.name + "]").each(function() {
							this.checked = false;
							$(this).next().addClass("wd-radio-check");
							$(this).next().removeClass("wd-radio-check-active");
						});

						$(div).removeClass("wd-radio-check");
						$(div).addClass("wd-radio-check-active");
						_this.checked = true;
					}
				});
			} else {
				div.style.margin = "0 auto";
				div.style.float = "none";
			}

			$(this).hide();
		}
	});
};

function addWdImgCut(id, obj) {
	if(obj.src.indexOf("?") == -1) {
		obj.src = obj.src + "?rw=" + obj.width + "&rh=" + obj.height;
	} else {
		$(obj).unbind("load");
	}
};
// 判断是否有wd-count样式
function checkWdContent(obj) {
	if($(obj)[0].className.indexOf("wd-content") != -1) {
		return true;
	}
	if($(obj)[0].parentNode.nodeName.toUpperCase() != "BODY" && $(obj)[0].parentNode.className.indexOf("wd-content") == -1) {
		return checkWdContent($(obj)[0].parentNode);
	} else if($(obj)[0].parentNode.nodeName.toUpperCase() == "BODY" && $(obj)[0].parentNode.className.indexOf("wd-content") == -1) {
		return false;
	} else {
		return true;
	}
};
// 自动显示统一处理
var speed = 200;
var art;
var b = "<b>|</b>";
var i = 0;
var p;
var mm = "";

function addWdAutoShow(id) {
	$(id).find(".wd-autoshow").each(function() {
		$(this).hide();
		art = $(this)[0].innerHTML;
		$(this)[0].innerHTML = b;
		$(this).show();
		arWord(this);
	});
};

function addWdThumbnailDisplay(id) {
	$(id).find(".wd-autothumbnaildisplay").each(function() {
		if(!$(this).is(":hidden") && $(this).find(".wd-textp").length == 0) {
			var tempValue = this.innerText;
			var boxheight = $(this).height()
			this.innerText = "";
			var autoflg = true;
			var textp = document.createElement('p');
			textp.title = tempValue;
			textp.className = "wd-textp";
			this.appendChild(textp);
			for(i = 0; i < tempValue.length; i++) {
				textp.innerText = textp.innerText + tempValue[i].replace(' ', '  ');
				if($(textp).outerHeight(true) > boxheight) {
					autoflg = false;
					textp.innerText = textp.innerText.substring(0, textp.innerText.length - 3) + "...";
					break;
				}
			}

			if(autoflg) {
				$(this)[0].style.height = "auto";
			}
		}
	});
};

// 模板后续处理
var wd_mousermove_arraylist = [];
var wd_mousermove_domid = "";

function pagePostProcessing(id) {
	// 取消关闭监听
	document.body.onbeforeunload = null;

	// 如果没有wd框架样式直接跳走,不做处理
	if(!checkWdContent(id)) {
		return;
	}
	// 自动处理是否添加页面跳转拦截
	if($(id).hasClass("wd-onbeforeunload")) {
		document.body.onbeforeunload = function() {
			if($(id).attr("beforeUnload") && typeof(eval($(id).attr("beforeUnload"))) == "function") {
				eval($(id).attr("beforeUnload")).call();
			}
			return $(id).attr("showMsg");
		}
	}
	// 自动处理多行显示省略
	if($(id).find(".wd-autothumbnaildisplay").length > 0) {
		addWdThumbnailDisplay(id);
	}
	// 自动处理记录用户鼠标热点
	if($(id).find(".wd-customerTrack").length > 0) {
		$(id).find(".wd-customerTrack").bind("mousemove", function(e) {
			wd_mousermove_domid = this.id
			wd_mousermove_arraylist.push(e.offsetX + ":" + e.offsetY);
		});
		$(id).find(".wd-customerTrack").bind("mouseout", function(e) {
			//alert("movelength=" + wd_mousermove_arraylist.length + ";id=" + wd_mousermove_domid);
			//wd_mousermove_arraylist = [];
			//wd_mousermove_domid = "";
		});
	}

	// 自动显示统一处理
	if($(id).find(".wd-autoshow").length > 0) {
		addWdAutoShow(id)
	}
	// checkbox统一处理
	if($(id).find(".wd-check").length > 0) {
		addWdCheckBox(id)
	}
	// radio统一处理
	if($(id).find(".wd-radio").length > 0) {
		addWdRadioButton(id);
	}
	// img裁剪统一处理
	if($(id).find(".wd-img-cut").length > 0) {
		$(id).find(".wd-img-cut").each(function() {
			var _this = this;
			if(!$(_this).hasClass("wd-_")) {
				$(_this).addClass("wd-_");
				// 添加父容器
				var boxStyle = "width:" + this.width + "px;height:" + this.height + "px;";
				if($(this).hasClass("wd-float-left")) {
					boxStyle = boxStyle + "float:left;"
				} else if($(this).hasClass("wd-float-right")) {
					boxStyle = boxStyle + "float:right;"
				}
				if(this.border != "") {
					boxStyle = boxStyle + "border:" + this.border + ";";
				}
				var boxClass = "wd-img-cutbox";
				if($(this).hasClass("wd-img-enlarge")) {
					boxClass = boxClass + " wd-img-enlargebox";
				}
				$(this).wrap("<div class= '" + boxClass + "' style='" + boxStyle + "'></div>");
				var _src = this.src;
				if($(this).data("default")) { // 设置默认图片
					this.src = $(this).data("default");
				}
				if(_src.indexOf("?") == -1) {
					this.src = _src + "?rw=" + this.width + "&rh=" + this.height;
				}
				// 重新设置宽高
				if(this.complete) {
					addWdImgCut(id, _this);
				} else {
					this.onload = null;
					this.onload = function() {
						addWdImgCut(id, _this);
					}
				}
				this.onerror = function() {
					this.src = $(this).data("default");
				}
			}
		});
	}
	// img缩放统一处理
	if($(id).find(".wd-img-zoom").length > 0) {
		$(id).find(".wd-img-zoom").each(function() {
			var zoomWidth = 0;
			var zoomHeight = 0;
			var zoomBorder = "";

			if(this.width) {
				if(getBrowserVersion() == "FF" || getBrowserVersion().split(' ')[0] == "IE") { // 火狐,IE特殊处理
					var tempwidth = this.parentNode.style.width.replace('px', '');
					if(tempwidth == "") {
						tempwidth = "100%";
					}
					if(tempwidth != "100%" && tempwidth < this.width) {
						zoomWidth = tempwidth;
					} else {
						zoomWidth = this.width;
					}
				} else {
					zoomWidth = this.width;
				}
			} else {
				zoomWidth = this.parentNode.style.width.replace('px', '');
			}

			if(this.height) {
				if(getBrowserVersion() == "FF" || getBrowserVersion().split(' ')[0] == "IE") { // 火狐,IE特殊处理
					var tempheight = this.parentNode.style.height.replace('px', '');
					if(tempheight == "") {
						tempheight = "100%";
					}
					if(tempheight != "100%" && tempheight < this.height) {
						zoomHeight = tempheight;
					} else {
						zoomHeight = this.height;
					}
				} else {
					zoomHeight = this.height;
				}
			} else {
				zoomHeight = this.parentNode.style.height.replace('px', '');
			}

			if(this.border) {
				zoomBorder = this.border;
			} else {
				zoomBorder = this.parentNode.style.border;
				this.parentNode.style.border = "none";
			}

			// 添加父容器
			var boxStyle = "width:" + zoomWidth + "px;height:" + zoomHeight + "px;";
			if($(this).hasClass("wd-float-left")) {
				boxStyle = boxStyle + "float:left;"
			} else if($(this).hasClass("wd-float-right")) {
				boxStyle = boxStyle + "float:right;"
			}
			if(zoomBorder != "") {
				boxStyle = boxStyle + "border:" + zoomBorder + ";line-height: " + (zoomHeight - 2) + "px;";
			} else {
				boxStyle = boxStyle + "line-height: " + zoomHeight + "px;";
			}
			var boxClass = "wd-img-zoombox";
			if($(this).hasClass("wd-img-enlarge")) {
				boxClass = boxClass + " wd-img-enlargebox";
			}
			$(this).wrap("<div class='" + boxClass + "' style='" + boxStyle + "'></div>");
			// 自身处理
			this.removeAttribute("width");
			this.removeAttribute("height");
			this.style.maxWidth = "100%";
			this.style.maxHeight = "100%";
		});
	}
};
// 替换引入html片段
function changeIncloudData(responseData) {
	var temparray = responseData.split('src=')[1];
	var incloudsrc = temparray.split('}}')[0];
	$.ajax({
		type: "get",
		url: appAddress + incloudsrc,
		async: false,
		success: function(data) {
			responseData = data;
		}
	});
	return responseData;
};

function changeLanguageData(str, languageData) {
	var temp = str.split('{{');
	str = temp[0];
	temp.map(function(value, index, arr) {
		if(index > 0) { // 从第二个开始
			var _landata = (languageData[value.split('}}')[0]]) ? languageData[value.split('}}')[0]] : "{{" + value.split('}}')[0] + "}}";
			str = str + _landata + value.split('}}')[1];
		}
	});
	return str;
};

function _getcrtvalue(ifper, ifnext) {
	var _ = "";
	if(typeof ifper == "object") {
		_ = ifper;
	} else {
		if(ifnext.substring(0, 1) == "\"") {
			_ = "\"" + ifper + "\"";
		} else if(ifnext.substring(0, 1) == "\'") {
			_ = "\'" + ifper + "\'";
		} else {
			_ = ifper;
		}
	}
	return _;
};

function _checkvalue(checkper, checknext, checksign) {
	if(checknext && typeof checknext != "object") {
		checknext = checknext.toString();
	}
	var _ret = false;
	if(checkper && typeof checkper != "object") {
		checkper = checkper.toString();
		if(checkper.split('%').length > 1) { // 求余数
			checkper = parseInt(checkper.split('%')[0]) % parseInt(checkper.split('%')[1]);
		} else if(checkper.split('+').length > 1) { // 求合数
			checkper = parseInt(checkper.split('+')[0]) + parseInt(checkper.split('+')[1]);
		} else if(checkper.split('-').length > 1) { // 求减数
			checkper = parseInt(checkper.split('-')[0]) - parseInt(checkper.split('-')[1]);
		} else if(checkper.split('*').length > 1) { // 求乘数
			checkper = parseInt(checkper.split('*')[0]) * parseInt(checkper.split('*')[1]);
		} else if(checkper.split('/').length > 1) { // 求除数
			checkper = parseInt(checkper.split('/')[0]) / parseInt(checkper.split('/')[1]);
		}
		if(checksign == "==") {
			if(checkper == checknext) {
				_ret = true;
			}
		} else if(checksign == "!=") {
			if(checkper != checknext) {
				_ret = true;
			}
		} else if(checksign == ">") {
			if(parseInt(checkper) > parseInt(checknext)) {
				_ret = true;
			}
		} else if(checksign == "<") {
			if(parseInt(checkper) < parseInt(checknext)) {
				_ret = true;
			}
		} else if(checksign == ">=") {
			if(parseInt(checkper) >= parseInt(checknext)) {
				_ret = true;
			}
		} else if(checksign == "<=") {
			if(parseInt(checkper) <= parseInt(checknext)) {
				_ret = true;
			}
		}
	} else if(checkper && typeof checkper == "object") { // 判断对象 是否为null
		if(checksign == "==") {
			if(checkper instanceof Array) {
				if(checkper.length == 0) {
					_ret = true;
				}
			} else {
				_ret = true;
				for(var prop in checkper) {
					_ret = false;
					break;
				}
			}
		} else if(checksign == "!=") {
			if(checkper instanceof Array) {
				if(checkper.length != 0) {
					_ret = true;
				}
			} else {
				_ret = false;
				for(var prop in checkper) {
					_ret = true;
					break;
				}
			}
		}
	} else if(!checkper) { // 单独属性判断空
		if(checksign == "==") {
			if(!checkper) {
				_ret = true;
			}
		} else if(checksign == "!=") {
			if(checkper) {
				_ret = true;
			}
		}
	}
	return _ret;
};

function changeEachData(obj, modelData, parentobj, index, view, icount, parenteachkey) {
	var k = (index) ? index : 0;
	var tempJson = {};
	var first = true;
	var firstvalue = "";
	var firstarray;
	var eacharray;
	var eachlength = 0;
	var eachkey = "";
	var eachjson = {};
	var partarray;
	var actionarray;
	var ifarray;
	var pagearray;
	var endemptytablearray;
	if(obj["part"]) {
		firstvalue = obj["part"].replace('\t', '').replace('{{', '').trim();
		firstvalue = firstvalue.replace('}}', '');
		firstarray = firstvalue.split(' ');
		var _id;
		var _hidehead = false;
		var _fortable = false;
		for(var i = 1;i<firstarray.length;i++){
			if(firstarray[i].split("=")[0] == "forid"){
				_fortable = true;
				_id = firstarray[i].split("=")[1];
			}else if(firstarray[i].split("=")[0] == "id"){
				_id = firstarray[i].split("=")[1];
				obj[0] = "<div id='" + _id + "'>";
				obj["_"] = "</div>";
			}else if(firstarray[i].split("=")[0] == "hidehead"){
				_hidehead = firstarray[i].split("=")[1];
			}
		}
		if(view) {
			view.partlist[_id] = {};
			view.partlist[_id]["data"] = {}
			view.partlist[_id]["data"]["id"] = _id;
			view.partlist[_id]["data"]["hidehead"] = _hidehead;
			view.partlist[_id]["data"][_id] = obj;
			view.partlist[_id]["append"] = view._parentAppend;
			view.partlist[_id]["replace"] = view._parentReplace;
			if(_fortable){
				view.partlist[_id]["getcheck"] = view._getCheckValue;
			}
		}
		partarray = obj;
		delete obj["part"];
	}
	if(obj["emptytable"]){
		delete obj["emptytable"];
		endemptytablearray = obj;
	}
	if(obj["page"]){
		pagearray = changePageTurningData(obj);
	}
	if(obj["action"]) {
		eachjson = (parentobj) ? parentobj : modelData;
		firstvalue = obj["action"].replace('\t', '').replace('{{', '').replace('}}', '').trim();
		firstarray = firstvalue.split(' ');
		var _id;
		var _jsondata = {};
		for(var i = 0; i < firstarray.length; i++) {
			// 获取id
			if(firstarray[i].indexOf('id=') != -1) {
				_id = firstarray[i].split('=')[1];
				if(_id.indexOf('+')) {
					for(var o in eachjson) {
						if(_id.indexOf('+') != -1 && o == _id.split('+')[1].split('.')[1]) {
							_id = _id.split('+')[0] + eachjson[o];
						}
					}
				}
			}
			// 获取参数
			if(firstarray[i].indexOf('data=') != -1) {
				_array = firstarray[i].split('=')[1].split(';');
				for(var j = 0; j < _array.length; j++) {
					_key = _array[j].split('.')[1];
					_jsonkey = _key;
					if(_key.indexOf('[') != -1) {
						_jsonkey = _key.split('[')[0];
						_key = _key.split('[')[1].replace(']', '')
					}
					_value = '';
					for(var o in eachjson) {
						if(o == _jsonkey) {
							_value = eachjson[o];
						}
					}
					_jsondata[_key] = _value;
				}
			}
		}

		obj[0] = "<div id='" + _id + "' name='" + obj["action"].replace('\t', '').replace('\n', '') + "'>";
		obj["_"] = "</div>";

		if(view) {
			view.actionlist[_id] = {};
			view.actionlist[_id]["data"] = {}
			view.actionlist[_id]["data"]["id"] = _id;
			view.actionlist[_id]["data"]["jsondata"] = _jsondata;
			view.actionlist[_id]["data"][_id] = obj;
			view.actionlist[_id]["action"] = view._actionReplace;
		}
		actionarray = obj;
	}
	// each属性
	if(obj["each"]) {
		eachjson = (parentobj) ? parentobj : modelData;
		firstvalue = obj["each"].trim().replace('\t', '').replace('{{', '').trim();
		firstvalue = firstvalue.trim().replace('}}', '');
		firstarray = firstvalue.split(' ');
		eacharray = firstarray;
		var _length = 1;
		if(parentobj) {
			_length = eacharray[3].split('.').length - 1
		}
		eachjson = getValue(eachjson, eacharray[3].split('.'), _length);
		eachkey = eacharray[1];
		eachlength = eachjson.length;
	}
	if(obj["if-elseif-else"]) {
		ifjson = (parentobj) ? parentobj : modelData;
		for(var o in obj) {
			if(obj[o] != "if-elseif-else") {
				var _b = false;
				if(obj[o]["if"]) {
					firstvalue = obj[o]["if"].trim().replace('\t', '').replace('{{', '').trim();
					firstvalue = firstvalue.trim().replace('}}', '');
					firstarray = firstvalue.split(' ');
					_ifpre = "";
					if(firstarray[1].split('.')[1].indexOf("index") != -1) {
						_ifpre = firstarray[1].split('.')[1].replace('index', icount);
					} else {
						_ifpre = getValue(ifjson, firstarray[1].split('.'), 1);
					}
					_ifvalue = _getcrtvalue(_ifpre, firstarray[3]);
					if(_checkvalue(_ifvalue, firstarray[3], firstarray[2])) {
						ifarray = obj[o];
						_b = true;
					}
				}
				if(_b) {
					break;
				}
				if(obj[o]["elseif"]) {
					firstvalue = obj[o]["elseif"].trim().substring(2, obj[o]["elseif"].length);
					firstvalue = firstvalue.trim().substring(0, firstvalue.length - 2);
					firstarray = firstvalue.split(' ');
					_ifpre = "";
					if(firstarray[1].split('.')[1].indexOf("index") != -1) {
						_ifpre = firstarray[1].split('.')[1].replace('index', icount);
					} else {
						_ifpre = ifjson[firstarray[1].split('.')[1]]
					}
					_ifvalue = _getcrtvalue(_ifpre, firstarray[3]);
					if(_checkvalue(_ifvalue, firstarray[3], firstarray[2])) {
						ifarray = obj[o];
						_b = true;
					}
				}
				if(_b) {
					break;
				}
				if(obj[o]["else"]) {
					ifarray = obj[o];
				}
			}
		}
	}
	if(endemptytablearray){
		_ = "";
		for(var o in endemptytablearray) {
			_ = _ + endemptytablearray[o];
		}
		return _
	}
	if(partarray) {
		for(var o in partarray) {
			if(typeof(partarray[o]) == "object") {
				tempJson[k] = changeEachData(partarray[o], modelData, null, k, view);
			} else {
				tempJson[k] = partarray[o];
			}
			k = k + 1;
		}
	}
	if(pagearray){
		tempJson[k] = pagearray;
		k = k + 1;
	}
	if(actionarray) {
		tempJson[k] = actionarray["0"] + actionarray["_"];
		k = k + 1;
	}
	if(eacharray) {
		for(var i = 0; i < eachlength; i++) {
			for(var o in obj) {
				if(typeof(obj[o]) == "object") {
					// 当前对象,实体对象,each对象,所有处理行数,view实体,当前处理行数,循环使用的key
					tempJson[k] = changeEachData(obj[o], modelData, eachjson[i], k, view, i + 1, eachkey)
				} else {
					var temp = obj[o].replace(new RegExp("\\{{" + eachkey + ".index" + "\\}}", "g"), (i + 1));
					if(parenteachkey) {
						temp = temp.replace(new RegExp("\\{{" + parenteachkey + ".index" + "\\}}", "g"), icount);
					}
					var _array;
					var _imgflg = false;
					var _parentflg = false;
					if(temp.indexOf("{{ftp.") > 0) {
						_array = temp.split("{{ftp." + eachkey + ".");
						_imgflg = true;
					} else {
						// 处理本次对象
						_array = temp.split("{{" + eachkey + ".");
						_imgflg = false;
					}
					if(_array.length > 1) {
						temp = _array[0];
						for(var j = 1; j < _array.length; j++) {
							var _ = _getvalue(eachjson[i], _array[j].split('}}')[0])
							if(_ || _ == 0) {
								if(_imgflg) {
									temp = temp + getRequestAddressUrl("file") + eachjson[i][_array[j].split('}}')[0]] + _array[j].split('}}')[1];
								} else {
									var _v = "";
									for(var o = 1; o < _array[j].split('}}').length; o++) {
										if(o != _array[j].split('}}').length - 1) {
											_v = _v + _array[j].split('}}')[o] + "}}";
										} else {
											_v = _v + _array[j].split('}}')[o]
										}
									}
									temp = temp + _ + _v;
								}
							} else {
								temp = temp + "" + _array[j].split('}}')[1];
							}
						}
					}
					// 处理父对象
					_array = temp.split("{{" + parenteachkey + ".");
					if(_array.length > 1) {
						if(_array.length > 1) {
							temp = _array[0];
							for(var j = 1; j < _array.length; j++) {
								if(parentobj[_array[j].split('}}')[0]] || parentobj[_array[j].split('}}')[0]] == 0) {
									if(_imgflg) {
										temp = temp + getRequestAddressUrl("file") + parentobj[_array[j].split('}}')[0]] + _array[j].split('}}')[1];
									} else {
										temp = temp + parentobj[_array[j].split('}}')[0]] + _array[j].split('}}')[1];
									}
								} else {
									temp = temp + "" + _array[j].split('}}')[1];
								}
							}
						}
						tempJson[k] = temp;
					} //else {
					var _arraycode = temp.split('{{code_');
					var _arrayformat = temp.split('{{format_');
					if(_arraycode.length == 1 && _arrayformat.length == 1 && temp.indexOf('{{each') == -1) {
						var _temparray = temp.split("{{");
						var _temp = _temparray[0];
						for(var jj = 1; jj < _temparray.length; jj++) {
							var _a = getModelValue(modelData, _temparray[jj].split("}}")[0].split('.'));
							if(_a || _a == 0 || _a == "") {
								_temp = _temp + _a + _temparray[jj].split("}}")[1];
							} else {
								_temp = _temp + _temparray[jj].split("}}")[1];
							}
						}
						tempJson[k] = _temp;
					} else if(_arraycode.length > 1) {
						var _a = _arraycode[0];
						for(var l = 1; l < _arraycode.length; l++) {
							_a = _a + getCodeDescByCode(_arraycode[l].split('.')[0].toUpperCase(), getValue(eachjson[i], _arraycode[l].split('_code}}')[0].split('.'), 2)) + _arraycode[l].split('_code}}')[1];
						}
						tempJson[k] = _a;
					} else if(_arrayformat.length > 1) {
						var _a = _arrayformat[0];
						for(var l = 1; l < _arrayformat.length; l++) {
							var _date = new WD.Date();
							var _v = getValue(eachjson[i], _arrayformat[l].split('_format}}')[0].split('.'), 2);
							// 如果参数类型不合法转成int再处理
							if(new Date(_v).toLocaleDateString() == "Invalid Date") {
								_v = parseInt(_v);
							}
							_a = _a + _date.formatDate(_v, _arrayformat[l].split('_format}}')[0].split('.')[0]) + _arrayformat[l].split('_format}}')[1];
						}
						tempJson[k] = _a;
					}
					//}
				}

				k = k + 1;
			}
		}
	}

	if(ifarray) {
		for(var o in ifarray) {
			if(typeof(ifarray[o]) == "object") {
				tempJson[k] = changeEachData(ifarray[o], modelData, parentobj, k, view, icount, parenteachkey);
				k = k + 1;
			} else {
				if(ifarray[o].indexOf("{{else}}") == -1 && ifarray[o].indexOf("{{elseif") == -1 && ifarray[o].indexOf("{{if") == -1) {
					var _array = "";
					if(parenteachkey) {
						_array = ifarray[o].replace(new RegExp("\\{{" + parenteachkey + ".index" + "\\}}", "g"), icount).split("{{")
					} else {
						_array = ifarray[o].split("{{")
					}
					var temp = _array[0];
					for(var i = 1; i < _array.length; i++) {
						var _a = getModelValue(ifjson, _array[i].split("}}")[0].split('.'));
						if(_a || _a == 0 || _a == "") {
							temp = temp + _a + _array[i].split("}}")[1];
						} else {
							temp = temp + _array[i].split("}}")[1];
						}
					}
					tempJson[k] = temp;
					k = k + 1;
				}
			}
		}
	}
	return tempJson;
};

function getModelValue(jsondata, valuelist) {
	var _value;
	var _first = valuelist[0].substring(0, 5);
	if(_first == "code_") {
		_value = getCodeDescByCode(valuelist[0].split('_')[1].toUpperCase(), getValue(jsondata, valuelist, 2, true));
	} else if(valuelist[0] == "ftp") {
		_value = getRequestAddressUrl("file") + getValue(jsondata, valuelist, 2);
	} else if(valuelist[0].split('_')[0] == "format") {
		var _date = new WD.Date();
		var _v = getValue(jsondata, valuelist, 2, true)
			// 如果参数类型不合法转成int再处理
		if(new Date(_v).toLocaleDateString() == "Invalid Date") {
			_v = parseInt(_v);
		}
		_value = _date.formatDate(_v, valuelist[0].split('_')[1]);
	} else {
		_value = getValue(jsondata, valuelist, 1);
	}

	return _value;
};

function _getvalue(json, keyvalue) {
	var _ = "";
	if(keyvalue) {
		if(keyvalue.indexOf('-') > 0) {
			_ = parseInt(json[keyvalue.split('-')[0]]) - parseInt(keyvalue.split('-')[1]);
		} else if(keyvalue.indexOf('+') > 0) {
			_ = parseInt(json[keyvalue.split('+')[0]]) + parseInt(keyvalue.split('+')[1]);
		} else if(keyvalue.indexOf('*') > 0) {
			_ = parseInt(json[keyvalue.split('*')[0]]) * parseInt(keyvalue.split('*')[1]);
		} else if(keyvalue.indexOf('/') > 0) {
			_ = parseInt(json[keyvalue.split('/')[0]]) / parseInt(keyvalue.split('/')[1]);
		} else if(keyvalue.indexOf('%') > 0) {
			_ = parseInt(json[keyvalue.split('%')[0]]) % parseInt(keyvalue.split('%')[1]);
		} else {
			_ = json[keyvalue];
		}
	}
	return _;
};

function getValue(jsondata, valuelist, starti, codeflg) {
	var _value;
	if(codeflg) {
		var _ = "";
		for(var i = 0; i < valuelist[starti].split('_').length - 1; i++) {
			_ = _ + valuelist[starti].split('_')[i] + "_";
		}
		_value = _getvalue(jsondata, _.substring(0, _.length - 1));
	} else {
		_value = _getvalue(jsondata, valuelist[starti]); //jsondata[valuelist[starti]];
	}
	for(var i = (starti + 1); i < valuelist.length; i++) {
		if(!_value) {
			_value = "";
		} else {
			if(_value instanceof Array) {
				break;
			}
			_value = _getvalue(_value, valuelist[i]); //_value[valuelist[i]];
		}
	}
	return _value;
};

function addurl(obj) {
	if(wd_back.length == 0) {
		wd_back[wd_back.length] = obj;
	} else if(wd_back[wd_back.length - 1].url != obj.url) {
		wd_back[wd_back.length] = obj;
	}
};
//---------------------------------------------------------------------
// 返回操作
function backurl() {
	if(wd_back.length == 1) {
		return;
	}
	wd_back.pop(wd_back.length - 1);
	var jsonData = wd_back[wd_back.length - 1];
	getTemplate(jsonData, function() {
		if(jsonData.pageloadefn != "") {
			if(jsonData.parameters) {
				eval(jsonData.pageloadefn).call('', jsonData.parameters);
			} else {
				eval(jsonData.pageloadefn).apply();
			}
		}
	}, jsonData.view);
};
//-----------------------------------------------------------------------------
function refurbishurl() {
	var jsonData = wd_back[wd_back.length - 1];
	getTemplate(jsonData, function() {
		if(jsonData.pageloadefn != "") {
			if(jsonData.parameters) {
				eval(jsonData.pageloadefn).call('', jsonData.parameters);
			} else {
				eval(jsonData.pageloadefn).apply();
			}
		}
	});
};

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
};

function arWord(obj) {
	if(i < art.length) {
		w = art.substr(i, 1);
		mm += (w == "<") ? m = art.substr(i, art.substr(i).indexOf(">") + 1) : w;
		p = (w == "<") ? art.substr(i).indexOf(">") + 1 : 1;
		$(obj)[0].innerHTML = mm + b;
		//		id("con").scrollTop = id("con").scrollHeight - id("con").clientHeight;
		i += p;
		window.setTimeout(_arWord(obj), speed);
	} else {
		$(obj)[0].innerHTML = art + b;
	}
};

function _arWord(obj) {
	return function() {
		arWord(obj);
	}
};
// 根据cookie名删除值
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
// 根据cookie名获取值
function getCookie(name) {
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
};
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
//获取页面参数
function getQueryString(name) {
	var _ = null;
	if(window.location.href.split('?')[1]) {
		var locationval = window.location.href.split('?')[1];
		locationvalarray = locationval.split('&')
		locationvalarray.map(function(value, index, array) {
			if(value.split('=')[0] == name) {
				_ = value.split('=')[1];
			}
		});
	}
	return _;
};
//获取页面参数（获取加密参数）
function getQueryStringByDecrypt(name) {
	var _ = null;
	if(window.location.href.split('?')[1]) {
		var locationval = window.location.href.split('?')[1];
		locationvalarray = locationval.split('&')
		locationvalarray.map(function(value, index, array) {
			if(value.split('=')[0] == name) {
				var encryption = new wdSecurity();
				_ = encryption.decrypt(value.split('=')[1]);
			}
		});
	}
	return _;
};
/**
 * ajax请求全局设置，如果没有session或者session失效自动跳转
 * loginAddress: 登录地址
 * indexAddress: 登录后的跳转地址
 */
var loginAddress = getRequestAddressUrl("loginAddress");
var indexAddress = getRequestAddressUrl("indexAddress");
$.ajaxSetup({
	type: 'POST',
	complete: function(xhr, status) {
		var sessionStatus = xhr.getResponseHeader('sessionstatus');
		if(sessionStatus == 'timeout') {
			var top = getTopWinow();
			if(loginAddress.indexOf("?redirectURL") >=0){
				if(loginAddress.split('?redirectURL=')[1] == ""){
					top.location.href = loginAddress + indexAddress;
				}else{
					top.location.href = loginAddress;
				}
			}else{
				top.location.href = loginAddress + "?redirectURL=" + indexAddress;
			}
		}
	}
});
function getTopWinow() {
	var p = window;
	while(p != p.parent) {
		p = p.parent;
	}
	return p;
}