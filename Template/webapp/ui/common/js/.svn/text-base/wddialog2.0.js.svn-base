(function($) {
	// ##################################### 全局变量定义，可修改 #####################################start
	var cookiename = "language"; // 国际化cookiename
	var alertFunName = (typeof(dialog2alertFunName) != "undefined") ? dialog2alertFunName : "alert";
	var errorFunName = (typeof(dialog2errorFunName) != "undefined") ? dialog2errorFunName : "error";
	var successFunName = (typeof(dialog2successFunName) != "undefined") ? dialog2successFunName : "success";
	var confirmFunName = (typeof(dialog2confirmFunName) != "undefined") ? dialog2confirmFunName : "confirm";
	var dialogFunName = (typeof(dialog2dialogFunName) != "undefined") ? dialog2dialogFunName : "dialog";
	// ##################################### 全局变量定义，可修改 #####################################end
	var zindex = document.createElement('input');
	zindex.id = "wddialog-zindex";
	zindex.type = "hidden";
	zindex.value = "10000";
	document.body.appendChild(zindex);
	// ##################################### 国际化处理 #####################################start
	var span1; // 提示
	var span2; // 确 定
	var span3; // 当前处理失败
	var span4; // 当前处理成功
	var span5; // 取 消
	var language = "zh";
	var arr, reg = new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)");

	if(document.cookie.match(reg) == null) {
		language = "zh";
	} else {
		arr = document.cookie.match(reg);
		language = unescape(arr[2]);
	}
	//	var language;
	//	if (navigator.browserLanguage) { // ie
	//		language = navigator.browserLanguage.toUpperCase();
	//	} else {
	//		language = navigator.language.toUpperCase();
	//	}
	switch(language) {
		case "zh": // 中文
			span1 = "提示";
			span2 = "确 定";
			span3 = "当前处理失败";
			span4 = "当前处理成功";
			span5 = "取 消";
			break;
		case "en": // 英文
			span1 = "Reminder";
			span2 = "OK";
			span3 = "Current process failed";
			span4 = "Current process succeeded";
			span5 = "Cancel";
			break;
		default:
			span1 = "提示";
			span2 = "确 定";
			span3 = "当前处理失败";
			span4 = "当前处理成功";
			span5 = "取 消";
			break;
	};
	// ##################################### 国际化处理 #####################################end
	// 设置弹出框可移动
	var o = {};

	function FramitemMove(className, objs) {
		$(document.body).bind("selectstart", function() {
			return false;
		})
		$("." + className).mousedown(function(e) {
			o.iTop = $(this).position().top - e.pageY;
			o.iLeft = $(this).position().left - e.pageX;
			$this = $(this);

			$("." + className).bind("mousemove", function(e) {
				var iLeft = e.pageX + o.iLeft;
				var iTop = e.pageY + o.iTop;
				// 左限制
				if(iLeft - parseInt(objs.width / 2) < 0) {
					iLeft = parseInt(objs.width / 2);
				}
				// 右限制
				var paddingwidth = 0;
				if(objs.windowPaddingFlg) {
					paddingwidth = 16;
				} else {
					paddingwidth = 4;
				}
				if(iLeft + parseInt(objs.width / 2) + paddingwidth > window.innerWidth) {
					iLeft = window.innerWidth - parseInt(objs.width / 2) - paddingwidth;
				}
				// 顶限制
				if(iTop < 10) {
					iTop = 10;
				}
				// 底限制
				if(iTop + objs.height > window.innerHeight) {
					iTop = window.innerHeight - objs.height;
				}
				$this.css({
					'left': iLeft + "px",
					'top': iTop + "px"
				})
			});

			$("." + className).bind("mouseup", function() {
				$("." + className).unbind("mousemove");
				$("." + className).unbind("mouseup");
			});
		});
	};
	////////////////////////////////////////////////////////////////////////提示框重写
	// txt 显示文本
	// title弹出框标题
	// fn关闭按钮回调函数
	this[alertFunName] = function(objs, spantitle, fn) {
		var temptxt = "";
		var callBackFun = "";
		if(typeof(objs) != "object") {
			temptxt = objs;
			if(fn) {
				callBackFun = fn;
			}
		}
		var defaults = {
			headHeight: 40, /////////////////////////////////////new
			bottonHeight: 40, /////////////////////////////////////new
			title: span1,
			hideimg: false,
			windowflg: true,
			showTitle: true,
			shieldcolor: '#333',
			windowBackgroundColor: "#F6F6F6", /////////////////////////////////////new
			showbuttonarealine: false, /////////////////////////////////////new
			headbuttonareaflg: true,
			windowPaddingFlg: false, /////////////////////////////////////new
			width: 450,
			height: 150,
			innerhtml: null
		}
		var objs = $.extend(defaults, objs);

		if(temptxt != "") {
			objs.txt = temptxt;
		}
		if(callBackFun) {
			objs.callBackFun = callBackFun;
		}

		//		document.documentElement.style.overflowY = 'hidden';
		if(objs.height > window.screen.availHeight - 40 || !objs.height) {
			objs.height = window.screen.availHeight - 40 - 40;
		}
		if(objs.width > window.document.body.clientWidth || !objs.width) {
			objs.width = window.document.body.clientWidth;
		}
		var uuid = new Date().getTime();
		if(objs.showTitle) {
			if(!objs.title) {
				objs.title = span1; //"提示";
			}
		} else {
			objs.title = "";
		}
		var shield = document.createElement("DIV");
		shield.id = "shield" + uuid;
		shield.className = "shield";
		shield.style.backgroundColor = objs.shieldcolor;
		shield.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 1;
		var alertFram = document.createElement("DIV");
		alertFram.id = "alertFram" + uuid;
		alertFram.className = "Framitem";
		alertFram.style.marginLeft = "-" + parseInt(objs.width / 2) + "px";
		alertFram.style.width = objs.width + "px";
		alertFram.style.height = objs.height + "px";
		alertFram.style.length = objs.height + "px";
		alertFram.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 2;
		var ulCss = "";
		var tempAdd = 0;
		if(objs.windowflg) {
			if(objs.windowPaddingFlg) {
				ulCss = "padding: 0 8px 8px 8px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 8;
			} else {
				ulCss = "padding: 2px 2px 2px 2px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 2;
			}
		}

		strHtml = "<ul class='ulstyle' style='" + ulCss + "'>";
		if(objs.headbuttonareaflg) {
			strHtml += " <li class='lititlestyle' style='cursor: move;'><div class='lititledeteilstyle'>" + objs.title + "</div><div id='wd-alert-X" + uuid + "' class='lititlectrlstyle' onclick='doalertOk(\"" + uuid + "\")'></div></li>";
		}
		var templineheight = "line-height:" + (objs.height - objs.bottonHeight) + "px;";
		var temppadding = "padding-left: 30px;padding-right: 30px;";
		if(objs.innerhtml) {
			templineheight = "overflow-y: auto;overflow-x:hidden;line-height:normal;";
			temppadding = "padding:0;";
		}
		strHtml += " <li class='liitemstyle' style='height:" + (objs.height - objs.bottonHeight + tempAdd) + "px;" + templineheight + "'><div class='txtbox' style='" + temppadding + "'>";
		if(objs.innerhtml) {
			strHtml += objs.innerhtml;
		} else {
			if(objs.hideimg) {
				strHtml += " <div class='itemimg itemimgalert' style='display:none'></div>";
				strHtml += " <div class='itemtxt itemtxtalert' style='width:400px;margin:0'>" + objs.txt + "<div><div></li>";
			} else {
				strHtml += " <div class='itemimg itemimgalert'></div>";
				strHtml += " <div class='itemtxt itemtxtalert'>" + objs.txt + "<div><div></li>";
			}
		}

		var showLineStyle = "";
		if(objs.showbuttonarealine) {
			showLineStyle = "border-top: 1px solid #f2f2f2;"
		}
		var bottonBackgroundColor = "background-color:" + objs.windowBackgroundColor + " ;"
		if(objs.buttons != undefined) {
			strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'>";
			var backgroundClass;
			var styleText = "";
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonClass != undefined) {
					backgroundClass = objs.buttons[i].buttonClass;
				} else {
					backgroundClass = "libuttonokstyle";
				}
				if(objs.buttons[i].hideflg) {
					styleText = " style='display:none' ";
				} else {
					styleText = "";
				}
				strHtml += " <input id='" + objs.buttons[i].buttonId + "' " + styleText + " class='" + backgroundClass + "' type='button' value='" + objs.buttons[i].buttonName + "' onclick='doalertFunction(\"" + uuid + "\",\"" + objs.buttons[i].buttonName + "\")' />";
			}
			strHtml += " <div></li>";
		} else {
			strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'><input id='wd-alert-ok" + uuid + "' class='libuttonokstyle' type='button' value='" + span2 + "' onclick='doalertOk(\"" + uuid + "\")' /><div></li>";

		}
		strHtml += "</ul>";
		alertFram.innerHTML = strHtml;
		document.body.appendChild(alertFram);
		document.body.appendChild(shield);

		//		if (objs.height - objs.bottonHeight - $(".txtbox").height() > 0) {
		//			$(".txtbox").css("padding-top", ((objs.height - objs.bottonHeight - $(".txtbox").height()) / 2) + "px")
		//		}

		$("#alertFram" + uuid).animate({
			top: '100px'
		}, "fast");
		if($("#wd-alert-ok" + uuid).length > 0) $("#wd-alert-ok" + uuid).focus();
		// 文字过多居中显示处理
		if($(".itemtxtalert").length > 0) {
			if($(".itemtxtalert")[0].scrollHeight > 50) {
				var tempheight = parseInt($(".itemtxtalert")[0].scrollHeight - 50) / 2;
				if(parseInt($(".itemtxtalert")[0].clientHeight - tempheight) > 0) {
					//					$(".itemtxtalert")[0].style.marginTop = parseInt($(".itemtxtalert")[0].clientHeight - tempheight) + "px";
					if(objs.hideimg) {
						$(".itemtxtalert")[0].style.marginTop = "0px";
					} else {
						$(".itemtxtalert")[0].style.marginTop = "10px";
					}

				} else {
					$(".itemtxtalert")[0].style.marginTop = "10px";
				}
				if(parseInt($(".itemtxtalert")[0].clientHeight + tempheight) < 100) {
					//					$(".itemtxtalert")[0].style.height = parseInt($(".itemtxtalert")[0].clientHeight + tempheight) + "px";
					$(".itemtxtalert")[0].style.height = "100px";
				} else {
					$(".itemtxtalert")[0].style.height = "100px";
				}
			}
		}
		document.getElementById('wddialog-zindex').value = parseInt(document.getElementById('wddialog-zindex').value) + 2;

		this.doalertFunction = function(selfuuid, buttonName) {
			//			document.documentElement.style.overflowY = 'auto';
			document.body.removeChild(document.getElementById("alertFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
			$(document.body).unbind("selectstart");
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonName == buttonName && objs.buttons[i].buttonFunction) {
					objs.buttons[i].buttonFunction.call();
				}
			}
		}

		this.doalertOk = function(selfuuid) {
			//			document.documentElement.style.overflowY = "auto";
			document.body.removeChild(document.getElementById("alertFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
			$(document.body).unbind("selectstart");
			if(objs.callBackFun) {
				objs.callBackFun.call();
			}
		}
		document.getElementById("alertFram" + uuid).focus();
		// 移动
		FramitemMove("Framitem", objs);
	}

	////////////////////////////////////////////////////////////////////////提示框重写
	// txt 显示文本
	// title弹出框标题
	// fn关闭按钮回调函数
	this[errorFunName] = function(objs) {
		var temptxt = ""
		if(typeof(objs) != "object") {
			temptxt = objs;
		}
		var defaults = {
			headHeight: 40, /////////////////////////////////////new
			bottonHeight: 40, /////////////////////////////////////new
			title: span3,
			windowflg: true,
			showTitle: true,
			shieldcolor: '#333',
			windowBackgroundColor: "#F6F6F6", /////////////////////////////////////new
			showbuttonarealine: false, /////////////////////////////////////new
			headbuttonareaflg: true,
			windowPaddingFlg: false, /////////////////////////////////////new
			width: 450,
			height: 150,
			innerhtml: null
		}
		var objs = $.extend(defaults, objs);
		if(temptxt != "") {
			objs.txt = temptxt;
		}
		//		document.documentElement.style.overflowY = 'hidden';
		if(objs.height > window.screen.availHeight - 40 || !objs.height) {
			objs.height = window.screen.availHeight - 40 - 40;
		}
		if(objs.width > window.document.body.clientWidth || !objs.width) {
			objs.width = window.document.body.clientWidth;
		}
		var uuid = new Date().getTime();
		if(objs.showTitle) {
			if(!objs.title) {
				objs.title = span1; //"提示";
			}
		} else {
			objs.title = "";
		}
		var shield = document.createElement("DIV");
		shield.id = "shield" + uuid;
		shield.className = "shield";
		shield.style.backgroundColor = objs.shieldcolor;
		shield.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 1;
		var errorFram = document.createElement("DIV");
		errorFram.id = "errorFram" + uuid;
		errorFram.className = "Framitem";
		errorFram.style.marginLeft = "-" + parseInt(objs.width / 2) + "px";
		errorFram.style.width = objs.width + "px";
		errorFram.style.height = objs.height + "px";
		errorFram.style.length = objs.height + "px";
		errorFram.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 2;
		var ulCss = "";
		var tempAdd = 0;
		if(objs.windowflg) {
			if(objs.windowPaddingFlg) {
				ulCss = "padding: 0 8px 8px 8px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 8;
			} else {
				ulCss = "padding: 2px 2px 2px 2px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 2;
			}
		}

		strHtml = "<ul class='ulstyle' style='" + ulCss + "'>";
		var templineheight = "line-height:" + (objs.height - objs.bottonHeight) + "px;";
		var temppadding = "padding-left: 30px;padding-right: 30px;";
		if(objs.innerhtml) {
			templineheight = "overflow-y: auto;overflow-x:hidden;line-height:normal;";
			temppadding = "padding:0;";
		}
		if(objs.headbuttonareaflg) {
			strHtml += " <li class='lititlestyle' style='cursor: move;'><div class='lititledeteilstyle'>" + objs.title + "</div><div id='wd-error-X" + uuid + "' class='lititlectrlstyle' onclick='doerrorOk(\"" + uuid + "\")'></div></li>";
		}

		if(objs.innerhtml) {
			strHtml += "<li class='liitemstyle' style='height:" + (objs.height - objs.bottonHeight + tempAdd) + "px;" + templineheight + "'><div class='txtbox'>" + objs.innerhtml + "</div></li>";
		} else {
			strHtml += " <li class='liitemstyle' style='height:" + (objs.height - objs.bottonHeight + tempAdd) + "px;" + templineheight + "'><div class='txtbox'><div class='itemimg itemimgerror'></div><div class='itemtxt itemtxtalert' style='" + temppadding + "'>" + objs.txt + "<div><div></li>";
		}

		var showLineStyle = "";
		if(objs.showbuttonarealine) {
			showLineStyle = "border-top: 1px solid #f2f2f2;"
		}
		var bottonBackgroundColor = "background-color:" + objs.windowBackgroundColor + " ;"
		if(objs.buttons != undefined) {
			strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'>";
			var backgroundClass;
			var styleText = "";
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonClass != undefined) {
					backgroundClass = objs.buttons[i].buttonClass;
				} else {
					backgroundClass = "libuttonokstyle";
				}

				if(objs.buttons[i].hideflg) {
					styleText = " style='display:none' ";
				} else {
					styleText = "";
				}
				strHtml += " <input " + styleText + " class='" + backgroundClass + "' type='button' value='" + objs.buttons[i].buttonName + "' onclick='doerrorFunction(\"" + uuid + "\",\"" + objs.buttons[i].buttonName + "\")' />";
			}
			strHtml += " <div></li>";
		} else {
			strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'><input id='wd-alert-ok" + uuid + "' class='libuttonokstyle' type='button' value='" + span2 + "' onclick='doerrorOk(\"" + uuid + "\")' /><div></li>";

		}

		strHtml += "</ul>";
		errorFram.innerHTML = strHtml;
		document.body.appendChild(errorFram);
		document.body.appendChild(shield);
		$("#errorFram" + uuid).animate({
			top: '100px'
		}, "fast");
		// 文字过多居中显示处理
		if($(".itemtxtalert").length > 0) {
			if($(".itemtxtalert")[0].scrollHeight > 50) {
				var tempheight = parseInt($(".itemtxtalert")[0].scrollHeight - 50) / 2;
				if(parseInt($(".itemtxtalert")[0].clientHeight - tempheight) > 0) {
					$(".itemtxtalert")[0].style.marginTop = parseInt($(".itemtxtalert")[0].clientHeight - tempheight) + "px";
				} else {
					$(".itemtxtalert")[0].style.marginTop = "10px";
				}
				if(parseInt($(".itemtxtalert")[0].clientHeight + tempheight) < 100) {
					$(".itemtxtalert")[0].style.height = parseInt($(".itemtxtalert")[0].clientHeight + tempheight) + "px";
				} else {
					$(".itemtxtalert")[0].style.height = "100px";
				}
			}
		}
		document.getElementById('wddialog-zindex').value = parseInt(document.getElementById('wddialog-zindex').value) + 2;

		if(objs.height - objs.bottonHeight - $(".txtbox").height() > 0) {
			$(".txtbox").css("padding-top", ((objs.height - objs.bottonHeight - $(".txtbox").height()) / 2) + "px")
		}

		this.doerrorFunction = function(selfuuid, buttonName) {
			//			document.documentElement.style.overflowY = "auto";
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonName == buttonName && objs.buttons[i].buttonFunction) {
					objs.buttons[i].buttonFunction.call();
				}
			}
			document.body.removeChild(document.getElementById("errorFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
			$(document.body).unbind("selectstart");
		}

		this.doerrorOk = function(selfuuid) {
			//			document.documentElement.style.overflowY = "auto";
			if(objs.callBackFun) {
				objs.callBackFun.call();
			}
			document.body.removeChild(document.getElementById("errorFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
			$(document.body).unbind("selectstart");
		}

		document.getElementById("errorFram" + uuid).focus();

		FramitemMove("Framitem", objs);
	}

	////////////////////////////////////////////////////////////////////////成功提示框重写
	// txt 显示文本
	// title弹出框标题
	// fn关闭按钮回调函数
	this[successFunName] = function(objs) {
		var temptxt = ""
		if(typeof(objs) != "object") {
			temptxt = objs;
		}
		var defaults = {
			headHeight: 40, /////////////////////////////////////new
			bottonHeight: 40, /////////////////////////////////////new
			title: span4,
			windowflg: true,
			showTitle: true,
			buttonareaflg: true,
			shieldcolor: '#333',
			windowBackgroundColor: "#F6F6F6", /////////////////////////////////////new
			windowPaddingFlg: false, /////////////////////////////////////new
			headbuttonareaflg: true,
			showbuttonarealine: false, /////////////////////////////////////new
			width: 450,
			height: 150,
			innerhtml: null
		}
		var objs = $.extend(defaults, objs);

		if(temptxt != "") {
			objs.txt = temptxt;
		}
		//		document.documentElement.style.overflowY = 'hidden';
		if(objs.height > window.screen.availHeight - 40 || !objs.height) {
			objs.height = window.screen.availHeight - 40 - 40;
		}
		if(objs.width > window.document.body.clientWidth || !objs.width) {
			objs.width = window.document.body.clientWidth;
		}

		var uuid = new Date().getTime();
		if(objs.showTitle) {
			if(!objs.title) {
				objs.title = span1; //"提示";
			}
		} else {
			objs.title = "";
		}
		var shield = document.createElement("DIV");
		shield.id = "shield" + uuid;
		shield.className = "shield";
		shield.style.backgroundColor = objs.shieldcolor;
		shield.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 1;
		var successFram = document.createElement("DIV");
		successFram.id = "successFram" + uuid;
		successFram.className = "Framitem";
		successFram.style.marginLeft = "-" + parseInt(objs.width / 2) + "px";
		successFram.style.width = objs.width + "px";
		successFram.style.height = objs.height + "px";
		successFram.style.length = objs.height + "px";
		successFram.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 2;

		var ulCss = "";
		var tempAdd = 0;
		if(objs.windowflg) {
			if(objs.windowPaddingFlg) {
				ulCss = "padding: 0 8px 8px 8px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 8;
			} else {
				ulCss = "padding: 2px 2px 2px 2px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 2;
			}
		}
		var templineheight = "line-height:" + (objs.height - objs.bottonHeight) + "px;";
		var temppadding = "padding-left: 30px;padding-right: 30px;";
		if(objs.innerhtml) {
			templineheight = "overflow-y: auto;overflow-x:hidden;line-height:normal;";
			temppadding = "padding:0;";
		}

		strHtml = "<ul class='ulstyle' style='" + ulCss + "'>";
		if(objs.headbuttonareaflg) {
			strHtml += " <li class='lititlestyle' style='cursor: move;'><div class='lititledeteilstyle'>" + objs.title + "</div><div id='wd-success-X" + uuid + "' class='lititlectrlstyle' onclick='dosuccessOk(\"" + uuid + "\")'></div></li>";
		}

		var innerHTML = "";
		if(objs.innerhtml) {
			strHtml += "<li class='liitemstyle' style='height:" + (objs.height - objs.bottonHeight + tempAdd) + "px;" + templineheight + "'><div class='txtbox' style='" + temppadding + "'>" + objs.innerhtml + "</div></li>";
		} else {
			strHtml += " <li class='liitemstyle' style='height:" + (objs.height - objs.bottonHeight + tempAdd) + "px;" + templineheight + "'><div class='txtbox' style='" + temppadding + "'><div class='itemimg itemimgsuccess'></div><div class='itemtxt itemtxtalert'>" + objs.txt + "<div><div></li>";
		}
		var bottonBackgroundColor = "background-color:" + objs.windowBackgroundColor + " ;"
		if(objs.buttonareaflg != false) {
			var showLineStyle = "";
			if(objs.showbuttonarealine) {
				showLineStyle = "border-top: 1px solid #f2f2f2;"
			}
			if(objs.buttons != undefined) {
				strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'>";
				var backgroundClass;
				var styleText = "";
				for(var i = 0; i < objs.buttons.length; i++) {
					if(objs.buttons[i].buttonClass != undefined) {
						backgroundClass = objs.buttons[i].buttonClass;
					} else {
						backgroundClass = "libuttonokstyle";
					}

					if(objs.buttons[i].hideflg) {
						styleText = " style='display:none' ";
					} else {
						styleText = "";
					}
					strHtml += " <input " + styleText + " class='" + backgroundClass + "' type='button' value='" + objs.buttons[i].buttonName + "' onclick='dosuccessFunction(\"" + uuid + "\",\"" + objs.buttons[i].buttonName + "\")' />";
				}
				strHtml += " <div></li>";
			} else {
				strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle style='" + showLineStyle + "''><input id='wd-alert-ok" + uuid + "' class='libuttonokstyle' type='button' value='" + span2 + "' onclick='dosuccessOk(\"" + uuid + "\")' /><div></li>";

			}
		}

		strHtml += "</ul>";
		successFram.innerHTML = strHtml;
		document.body.appendChild(successFram);
		document.body.appendChild(shield);
		$("#successFram" + uuid).animate({
			top: '100px'
		}, "fast");
		// 文字过多居中显示处理
		if($(".itemtxtalert").length > 0) {
			if($(".itemtxtalert")[0].scrollHeight > 50) {
				var tempheight = parseInt($(".itemtxtalert")[0].scrollHeight - 50) / 2;
				if(parseInt($(".itemtxtalert")[0].clientHeight - tempheight) > 0) {
					$(".itemtxtalert")[0].style.marginTop = parseInt($(".itemtxtalert")[0].clientHeight - tempheight) + "px";
				} else {
					$(".itemtxtalert")[0].style.marginTop = "10px";
				}
				if(parseInt($(".itemtxtalert")[0].clientHeight + tempheight) < 100) {
					$(".itemtxtalert")[0].style.height = parseInt($(".itemtxtalert")[0].clientHeight + tempheight) + "px";
				} else {
					$(".itemtxtalert")[0].style.height = "100px";
				}
			}
		}
		document.getElementById('wddialog-zindex').value = parseInt(document.getElementById('wddialog-zindex').value) + 2;

		if(objs.height - objs.bottonHeight - $(".txtbox").height() > 0) {
			$(".txtbox").css("padding-top", ((objs.height - objs.bottonHeight - $(".txtbox").height()) / 2) + "px")
		}

		this.dosuccessFunction = function(selfuuid, buttonName) {
			//			document.documentElement.style.overflowY = "auto";
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonName == buttonName && objs.buttons[i].buttonFunction) {
					objs.buttons[i].buttonFunction.call();
				}
			}
			document.body.removeChild(document.getElementById("successFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
		}

		this.dosuccessOk = function(selfuuid) {
			//			document.documentElement.style.overflowY = "auto";
			if(document.getElementById("successFram" + selfuuid) == null) return;
			if(objs.callBackFun) {
				objs.callBackFun.call();
			}
			if(document.getElementById("successFram" + selfuuid) != null) {
				document.body.removeChild(document.getElementById("successFram" + selfuuid));
				document.body.removeChild(document.getElementById("shield" + selfuuid));
			}
		}
		document.getElementById("successFram" + uuid).focus();

		setTimeout(function() {
			dosuccessOk(uuid)
		}, 2000);
		FramitemMove("Framitem", objs);
	}

	////////////////////////////////////////////////////////////////////////询问框重写
	// txt 显示文本
	// title弹出框标题
	// fnok确定按钮回调函数
	// fncanle取消按钮回调函数
	this[confirmFunName] = function(objs) {
		var defaults = {
			headHeight: 40, /////////////////////////////////////new
			bottonHeight: 40, /////////////////////////////////////new
			title: span1,
			windowflg: true,
			showTitle: true,
			shieldcolor: '#333',
			windowBackgroundColor: "#F6F6F6", /////////////////////////////////////new
			width: 450,
			height: 150,
			windowPaddingFlg: false, /////////////////////////////////////new
			headbuttonareaflg: true,
			showbuttonarealine: false, /////////////////////////////////////new
			innerhtml: null
		}
		var objs = $.extend(defaults, objs);

		//		document.documentElement.style.overflowY = 'hidden';
		if(objs.height > window.screen.availHeight - 40 || !objs.height) {
			objs.height = window.screen.availHeight - 40 - 40;
		}
		if(objs.width > window.document.body.clientWidth || !objs.width) {
			objs.width = window.document.body.clientWidth;
		}
		var uuid = new Date().getTime();
		if(objs.showTitle) {
			if(!objs.title) {
				objs.title = span1; //"提示";
			}
		} else {
			objs.title = "";
		}
		var shield = document.createElement("DIV");
		shield.id = "shield" + uuid;
		shield.className = "shield";
		shield.style.backgroundColor = objs.shieldcolor;
		shield.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 1;
		var confirmFram = document.createElement("DIV");
		confirmFram.id = "confirmFram" + uuid;
		confirmFram.className = "Framitem";
		confirmFram.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 2;
		confirmFram.style.marginLeft = "-" + parseInt(objs.width / 2) + "px";
		confirmFram.style.width = objs.width + "px";
		confirmFram.style.height = objs.height + "px";
		confirmFram.style.length = objs.height + "px";

		var ulCss = "";
		var tempAdd = 0;
		if(objs.windowflg) {
			if(objs.windowPaddingFlg) {
				ulCss = "padding: 0 8px 8px 8px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 8;
			} else {
				ulCss = "padding: 2px 2px 2px 2px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 2;
			}
		}
		var templineheight = "line-height:" + (objs.height - objs.bottonHeight) + "px;";
		var temppadding = "padding-left: 30px;padding-right: 30px;";
		if(objs.innerhtml) {
			templineheight = "overflow-y: auto;overflow-x:hidden;line-height:normal;";
			temppadding = "padding:0;";
		}
		strHtml = "<ul class='ulstyle' style='" + ulCss + "'>";
		if(objs.headbuttonareaflg) {
			strHtml += " <li class='lititlestyle' style='cursor: move;'><div class='lititledeteilstyle'>" + objs.title + "</div><div id='wd-confirm-X" + uuid + "' class='lititlectrlstyle' onclick='doconfirmCanle(\"" + uuid + "\")'></div></li>";
		}
		var innerHTML = "";
		if(objs.innerhtml) {
			innerHTML = "<li class='liitemstyle' style='height:" + (objs.height - objs.bottonHeight + tempAdd) + "px;" + templineheight + "'><div class='txtbox' style='" + temppadding + "'>" + objs.innerhtml + "</div></li>";
		} else {
			innerHTML = " <li class='liitemstyle' style='height:" + (objs.height - objs.bottonHeight + tempAdd) + "px;" + templineheight + "'><div class='txtbox' style='" + temppadding + "'><div class='itemimg itemimgconfirm'></div><div class='itemtxt itemtxtalert'>" + objs.txt + "<div><div></li>";
		}
		strHtml += innerHTML;

		var showLineStyle = "";
		if(objs.showbuttonarealine) {
			showLineStyle = "border-top: 1px solid #f2f2f2;"
		}
		var bottonBackgroundColor = "background-color:" + objs.windowBackgroundColor + " ;"
		if(objs.buttons != undefined) {
			strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'>";
			var backgroundClass;
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonClass != undefined) {
					backgroundClass = objs.buttons[i].buttonClass;
				} else {
					backgroundClass = "libuttonokstyle";
				}
				if(objs.buttons[i].hideflg) {
					styleText = " style='display:none' ";
				} else {
					styleText = "";
				}
				strHtml += " <input " + styleText + " class='" + backgroundClass + "' type='button' value='" + objs.buttons[i].buttonName + "' onclick='doconfirmFunction(\"" + uuid + "\",\"" + objs.buttons[i].buttonName + "\")' />";
			}
			strHtml += " <div></li>";
		} else {
			strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'>";
			strHtml += " <input id='wd-confirm-ok" + uuid + "' class='libuttonokstyle' type='button' value='" + span2 + "' onclick='doconfirmOk(\"" + uuid + "\")' />";
			strHtml += " <input id='wd-confirm-cancel" + uuid + "' class='libuttonokstyle' type='button' value='" + span5 + "' onclick='doconfirmCanle(\"" + uuid + "\")' />";
			strHtml += " <div></li>";
		}

		strHtml += "</ul>";
		confirmFram.innerHTML = strHtml;
		document.body.appendChild(confirmFram);
		document.body.appendChild(shield);
		$("#confirmFram" + uuid).animate({
			top: '100px'
		}, "fast");
		// 文字过多居中显示处理
		if($(".itemtxtalert").length > 0) {
			if($(".itemtxtalert")[0].scrollHeight > 50) {
				var tempheight = parseInt($(".itemtxtalert")[0].scrollHeight - 50) / 2;
				if(parseInt($(".itemtxtalert")[0].clientHeight - tempheight) > 0) {
					$(".itemtxtalert")[0].style.marginTop = parseInt($(".itemtxtalert")[0].clientHeight - tempheight) + "px";
				} else {
					$(".itemtxtalert")[0].style.marginTop = "10px";
				}
				if(parseInt($(".itemtxtalert")[0].clientHeight + tempheight) < 100) {
					$(".itemtxtalert")[0].style.height = parseInt($(".itemtxtalert")[0].clientHeight + tempheight) + "px";
				} else {
					$(".itemtxtalert")[0].style.height = "100px";
				}
			}
		}
		document.getElementById('wddialog-zindex').value = parseInt(document.getElementById('wddialog-zindex').value) + 2;

		if(objs.height - objs.bottonHeight - $(".txtbox").height() > 0) {
			$(".txtbox").css("padding-top", ((objs.height - objs.bottonHeight - $(".txtbox").height()) / 2) + "px")
		}

		this.doconfirmFunction = function(selfuuid, buttonName) {
			//			document.documentElement.style.overflowY = "auto";
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonName == buttonName && objs.buttons[i].buttonFunction) {
					objs.buttons[i].buttonFunction.call();
				}
			}

			document.body.removeChild(document.getElementById("confirmFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
		}

		this.doconfirmOk = function(selfuuid) {
			//			document.documentElement.style.overflowY = "auto";
			if(objs.successCallBackFun) {
				objs.successCallBackFun.call();
			}
			document.body.removeChild(document.getElementById("confirmFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
		}
		this.doconfirmCanle = function(selfuuid) {
			//			document.documentElement.style.overflowY = "auto";
			if(objs.cancelCallBackFun) {
				objs.cancelCallBackFun.call();
			}
			document.body.removeChild(document.getElementById("confirmFram" + selfuuid));
			document.body.removeChild(document.getElementById("shield" + selfuuid));
		}
		document.getElementById("confirmFram" + uuid).focus();

		FramitemMove("Framitem", objs);
	}

	////////////////////////////////////////////////////////////////////////询问框重写
	// url 展示页面路径
	// title弹出框标题
	// width弹出框宽度
	// height弹出框高度
	// fnok确定按钮回调函数
	// fncanle取消按钮回调函数
	this[dialogFunName] = function(objs) {
		if(!objs.overflowy){
			if(document.documentElement.style.overflowY == "") {
				document.documentElement.style.overflowY = "hidden";
			}
		}
		var defaults = {
			headHeight: 40, /////////////////////////////////////new
			bottonHeight: 40, /////////////////////////////////////new
			positionTop:30,
			title: span1,
			windowflg: true,
			showTitle: true,
			width: 520,
			height: 250,
			buttonareaflg: true,
			shieldcolor: '#333',
			windowBackgroundColor: "#F6F6F6", /////////////////////////////////////new
			windowPaddingFlg: false, /////////////////////////////////////new
			headbuttonareaflg: true,
			showbuttonarealine: false, /////////////////////////////////////new
			maxbuttonshowFlg: true // 显示顶部最大操作，默认显示
		}
		var objs = $.extend(defaults, objs);

		var uuid = new Date().getTime();
		if(objs.showTitle) {
			if(!objs.title) {
				objs.title = span1; //"提示";
			}
		} else {
			objs.title = "";
		}

		if(objs.height > window.innerHeight - 40 || !objs.height) {
			objs.height = window.innerHeight - 40 - 40;
		}

		if(objs.width > window.document.body.clientWidth || !objs.width) {
			objs.width = window.document.body.clientWidth;
		}
		var shield = document.createElement("DIV");
		shield.id = "shield" + uuid;
		shield.className = "shield";
		shield.style.backgroundColor = objs.shieldcolor;
		shield.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 1;
		var condialog = document.createElement("DIV");
		condialog.className = "condialog";
		condialog.id = "condialog" + uuid;
		condialog.style.position = "fixed";
		condialog.style.left = "50%";
		condialog.style.top = objs.positionTop + "px";
		condialog.style.marginLeft = "-" + parseInt(objs.width / 2) + "px";
		condialog.style.width = objs.width + "px";
		condialog.style.height = objs.height + "px";
		if(objs.windowflg) {
			condialog.style.background = "#ccc";
		}
		condialog.style.textAlign = "center";
		condialog.style.zIndex = parseInt(document.getElementById('wddialog-zindex').value) + 2;

		var ulCss = "";
		var padding = "8px";
		var tempAdd = 0;
		if(objs.windowflg) {
			if(objs.windowPaddingFlg) {
				ulCss = "padding: 0 8px 8px 8px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 8;
			} else {
				ulCss = "padding: 2px 2px 2px 2px;background: " + objs.windowBackgroundColor + ";";
				tempAdd = 2;
			}
		}
		strHtml = "<ul class='ulstyle' style='" + ulCss + "'>";
		if(objs.headbuttonareaflg) {
			strHtml += " <li class='lititlestyle'><div class='lititledeteilstyle' style='padding-left:" + padding + "'>" + objs.title + "</div>";

			if(objs.headbuttons) {
				for(var i = 0; i < objs.headbuttons.length; i++) {
					strHtml += " <input name='" + uuid + "' style='border:0;float: right;margin-right: 8px;' title='" + objs.headbuttons[i].buttontitle + "' type='button' id='" + objs.headbuttons[i].buttonid + "' class='" + objs.headbuttons[i].buttonclass + "' onclick='doDialogHeadBtnFunction" + uuid + "(\"" + uuid + "\",\"" + objs.headbuttons[i].buttonid + "\")'></input>";
				}
			} else {
				strHtml += " <input style='border:0' name='" + uuid + "' type='button' id='wd-condialog-X" + uuid + "' class='lititlectrlstyle' onclick='dodialogCanle" + uuid + "(\"" + uuid + "\")'></input>";
			}
			if(objs.maxbuttonshowFlg) {
				strHtml += " <input style='border:0' name='" + uuid + "' type='button' id='wd-condialog-B" + uuid + "' class='bigstyle' onclick='dodialogBig" + uuid + "(\"" + uuid + "\")'></input>";
			}
			strHtml += " </li>";
		}
		var bordersytle = "";
		if(!objs.buttonareaflg) {
			bordersytle = ";border-radius: 4px";
		}
		var tempHeigth = objs.height; // - objs.headHeight - objs.bottonHeight;
		if(objs.innerhtml) {
			if(typeof(objs.innerhtml) == "function") {
				strHtml += " <li name='" + uuid + "' id='ad-main" + uuid + "' class='liitemstyledialog' style='height:" + tempHeigth + "px " + bordersytle + "'>" + objs.innerhtml.call() + "</li>";
			} else {
				strHtml += " <li name='" + uuid + "' id='ad-main" + uuid + "' class='liitemstyledialog' style='height:" + tempHeigth + "px " + bordersytle + "'>" + objs.innerhtml + "</li>";
			}
		} else {
			strHtml += " <li name='" + uuid + "' class='liitemstyledialog' style='height:" + tempHeigth + "px" + bordersytle + "'><iframe class='wd-dialog-iframe' src=" + objs.url + " id='ad-main" + uuid + "' name='ad-main' width='100%' height='" + objs.height + "px' border='1px' frameborder='0'></iframe></li>";
		}
		var bottonBackgroundColor = "background-color:" + objs.windowBackgroundColor + " ;"
		if(objs.buttonareaflg != false) {
			var showLineStyle = "";
			if(objs.showbuttonarealine) {
				showLineStyle = "border-top: 1px solid #f2f2f2;"
			}
			if(objs.buttons != undefined) {
				strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'>";
				var backgroundClass;
				var styleText = "";
				for(var i = 0; i < objs.buttons.length; i++) {
					if(objs.buttons[i].buttonClass != undefined) {
						backgroundClass = objs.buttons[i].buttonClass;
					} else {
						backgroundClass = "libuttonokstyle";
					}
					if(objs.buttons[i].hideflg) {
						styleText = " style='display:none' ";
					}
					strHtml += " <input name='" + uuid + "' id='" + objs.buttons[i].buttonId + "' " + styleText + " class='wddialogzdybut " + backgroundClass + "' type='button' value='" + objs.buttons[i].buttonName + "' onclick='dodialogFunction" + uuid + "(\"" + uuid + "\",\"" + objs.buttons[i].buttonName + "\")' />";
				}
				strHtml += " <div></li>";
			} else {
				strHtml += " <li class='libuttonareastyle' style='height:" + objs.bottonHeight + "px;line-height:" + objs.bottonHeight + "px;" + bottonBackgroundColor + "'><div class='libuttonareadivboxstyle' style='" + showLineStyle + "'>";
				strHtml += " <input name='" + uuid + "'  id='wd-condialog-ok" + uuid + "' class='libuttonokstyle' type='button' value='" + span2 + "' onclick='dodialogOk" + uuid + "(\"" + uuid + "\")' />";
				strHtml += " <input name='" + uuid + "'  id='wd-condialog-cancel" + uuid + "' class='libuttoncanlestyle' type='button' value='" + span5 + "' onclick='dodialogCanle" + uuid + "(\"" + uuid + "\")' />";
				strHtml += " <div></li>";
			}
		}
		strHtml += "</ul>";
		condialog.innerHTML = strHtml;
		document.body.appendChild(condialog);
		document.body.appendChild(shield);
		document.getElementById('wddialog-zindex').value = parseInt(document.getElementById('wddialog-zindex').value) + 2;
		//		$("#condialog" + uuid).animate({
		//			top: '100px'
		//		}, "fast");

		if(!objs.innerhtml) {
			var iframe = document.getElementById('ad-main' + uuid);
			if(iframe.attachEvent) {
				iframe.attachEvent("onload", function() {
					var input = document.createElement('input');
					input.style.width = "1px";
					input.style.border = "0px";
					input.id = "wd-dialog-temp";
					document.getElementById('ad-main' + uuid).contentDocument.body.appendChild(input);
					document.getElementById('ad-main' + uuid).contentDocument.getElementById("wd-dialog-temp").focus();
					document.getElementById('ad-main' + uuid).contentDocument.getElementById("wd-dialog-temp").style.display = "none";
					if(objs.loadFrameFun) {
						objs.loadFrameFun.call(iframe);
					}
				});
			} else {
				iframe.onload = function() {
					var input = document.createElement('input');
					input.style.width = "1px";
					input.style.border = "0px";
					input.id = "wd-dialog-temp";
					document.getElementById('ad-main' + uuid).contentDocument.body.appendChild(input);
					document.getElementById('ad-main' + uuid).contentDocument.getElementById("wd-dialog-temp").focus();
					document.getElementById('ad-main' + uuid).contentDocument.getElementById("wd-dialog-temp").style.display = "none";
					if(objs.loadFrameFun) {
						objs.loadFrameFun.call(this);
					}
				};
			}
		}

		this["dodialogFunction" + uuid] = function(selfuuid, buttonName) {
			for(var i = 0; i < objs.buttons.length; i++) {
				if(objs.buttons[i].buttonName == buttonName && objs.buttons[i].buttonFunction) {
					objs.buttons[i].buttonFunction.call();
				}
			}
		}

		this["doDialogHeadBtnFunction" + uuid] = function(selfuuid, buttonId) {
			for(var i = 0; i < objs.headbuttons.length; i++) {
				if(objs.headbuttons[i].buttonid == buttonId) {
					objs.headbuttons[i].buttonFun.call();
				}
			}
		}

		this["dodialogOk" + uuid] = function(selfuuid) {
			if(document.documentElement.style.overflowY == "hidden") {
				document.documentElement.style.overflowY = "";
			}
			if(objs.successCallBackFun) {
				objs.successCallBackFun.call();
			}
		}
		this["dodialogCanle" + uuid] = function(selfuuid) {
			if(document.documentElement.style.overflowY == "hidden") {
				document.documentElement.style.overflowY = "";
			}
			var subuuid = document.activeElement.name;
			if(objs.cancelCallBackFun) {
				objs.cancelCallBackFun.call();
			}
			document.body.removeChild(document.getElementById("condialog" + subuuid));
			document.body.removeChild(document.getElementById("shield" + subuuid));
		};
		this["dodialogBig" + uuid] = function(selfuuid) {
			var subuuid = document.activeElement.name;
			if(document.activeElement.className == "bigstyle") {
				document.activeElement.className = "deoxidizetyle";
				$("#condialog" + subuuid).animate({
					top: "0px",
					left: "4px",
					marginLeft: "0px",
					width: window.document.body.clientWidth + "px",
					height: window.innerHeight - 50 + "px"
				});
				$("#condialog" + subuuid).find('.liitemstyledialog').animate({
					height: window.innerHeight - objs.headHeight - objs.bottonHeight + "px"
				});
			} else {
				document.activeElement.className = "bigstyle";
				var tempHeigth = objs.height - objs.headHeight - objs.bottonHeight;
				$("#condialog" + subuuid).find('.liitemstyledialog').animate({
					height: tempHeigth + "px"
				});
				$("#condialog" + subuuid).animate({
					top: "30px",
					left: "50%",
					marginLeft: "-" + parseInt(objs.width / 2) + "px",
					width: objs.width + "px",
					height: objs.height + "px"
				});
			}

			$(document.activeElement).blur();
		};
		document.getElementById("condialog" + uuid).focus();
		//		document.body.onselectstart = function() {
		//			return false;
		//		};

		if(!objs.innerhtml) {
			Win = document.getElementById('ad-main' + uuid).contentWindow; //$("#ad-main" + uuid).contents(); // 获取子页面对象
			WinObj = document.getElementById('ad-main' + uuid).contentWindow; // 获取子页面方法
		} else {
			Win = document.getElementById('ad-main' + uuid);
			WinObj = document.getElementById('ad-main' + uuid);
		}

		this["winColsed" + uuid] = function(opt, fn) {
			if(document.documentElement.style.overflowY == "hidden") {
				document.documentElement.style.overflowY = "";
			}
			if(opt == undefined) {
				subuuid = document.activeElement.name;
			} else {
				subuuid = opt;
			}
			if(fn) {
				fn.call();
			}
			document.body.removeChild(document.getElementById("condialog" + subuuid));
			document.body.removeChild(document.getElementById("shield" + subuuid));
		}

		// 关闭方法
		Win.Closed = function(opt, fn) {
			if(opt == undefined) {
				eval("winColsed" + document.activeElement.name).call();
			} else {
				eval("winColsed" + opt).call('', opt, fn);
			}
		};
		//		FramitemMove("condialog");
		return this;
	};
})(jQuery);

// 关闭弹出框（对外开放）
function wdDialogClosed(flg) {
	if(document.documentElement.style.overflowY == "hidden") {
		document.documentElement.style.overflowY = "auto";
	}
	var subuuid = $(".wd-" + flg + "-iframe")[0].id.split('ad-main')[1];
	var ctrlName;
	switch(flg) {
		case "dialog":
			ctrlName = "condialog";
			break;
	}
	document.body.removeChild(document.getElementById(ctrlName + subuuid));
	document.body.removeChild(document.getElementById("shield" + subuuid));
};

function wdGetIframeId(exceptionFlg) {
	var subuuid = "";
	if(exceptionFlg == undefined) {
		subuuid = document.activeElement.name;
	} else {
		subuuid = document.activeElement.id.replace('ad-main', '');
	}

	return subuuid;
}

function wdGetIframeObj(exceptionFlg) {
	var subuuid = "";
	if(exceptionFlg == undefined) {
		subuuid = document.activeElement.name;
	} else {
		subuuid = document.activeElement.id.replace('ad-main', '');
	}
	if(document.getElementById('ad-main' + subuuid).nodeName != "LI") {
		return document.getElementById('ad-main' + subuuid).contentWindow;
	} else {
		return document.getElementById('ad-main' + subuuid);
	}
}

// 按钮交替显示
function wdDialogButtonChange(btns) {
	var wdshowbuttonId = btns.wdshowbuttonId.split(",");
	var wdhidebuttonid = btns.wdhidebuttonid.split(",");
	$(".wddialogzdybut").hide();
	for(var i = 0; i < wdshowbuttonId.length; i++) {
		$("#" + wdshowbuttonId[i]).show();
	}
	for(var i = 0; i < wdhidebuttonid.length; i++) {
		$("#" + wdhidebuttonid[i]).hide();
	}
}