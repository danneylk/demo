(function($) {
	var span1; 
	var span2;
	var span3;
	var span4; 
	var span5;
	var span6;
	var span7; 
	var span8;
	var span9;
	var span10;
	var span11; 
	var span12;
	var span13;
	var span14; 
	var span15;
	var span16;
	var span17; 
	var span18;
	var span19;
	var span20; 
	var span21;
	var span23;
	var span24; 
	var span25;
	var span26;
	var language;
	var cookiename = "language"; // 国际化cookiename
	var arr, reg = new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)");
	if(document.cookie.match(reg) == null) {
		language = "zh";
	} else {
		arr = document.cookie.match(reg);
		language = unescape(arr[2]);
	}
	switch(language) {
		case "zh": // 中文
			span1 = "公式编辑器";
			span2 = "多图上传";
			span3 = "点击选择图片";
			span4 = "继续添加";
			span5 = "开始上传";
			span6 = "确定";
			span7 = "取消";
			span8 = "选中";
			span9 = "张图片，共";
			span10 = "还有";
			span11 = "个未上传文件";
			span12 = "上传的类型不对";
			span13 = "属性：";
			span14 = "修改";
			span15 = "图片设置";
			span16 = "大小：";
			span17 = "宽度";
			span18 = "高度";
			span19 = "边框：";
			span20 = "边距：";
			span21 = "描述：";
			span23 = "加粗";
			span24 = "斜体";
			span25 = "下划线";
			span26 = "上传图片";
			break;
		case "en": // 英文
			span1 = "Formula editor";
			span2 = "Upload pictures";
			span3 = "Click for picture";
			span4 = "Add";
			span5 = "Upload";
			span6 = "OK";
			span7 = "Cancel";
			span8 = "Selected";
			span9 = "pictures，all";
			span10 = "have";
			span11 = "files unupload";
			span12 = "The type of upload is incorrect";
			span13 = "Attribute：";
			span14 = "Edit";
			span15 = "Picture settings";
			span16 = "Size：";
			span17 = "Width";
			span18 = "Height";
			span19 = "Frame：";
			span20 = "Margin：";
			span21 = "Describe：";
			span23 = "Bold";
			span24 = "Italic";
			span25 = "Underline";
			span26 = "Upload";
			break;
		default:
			span1 = "公式编辑器";
			span2 = "多图上传";
			span3 = "点击选择图片";
			span4 = "继续添加";
			span5 = "开始上传";
			span6 = "确定";
			span7 = "取消";
			span8 = "选中";
			span9 = "张图片，共";
			span10 = "还有";
			span11 = "个未上传文件";
			span12 = "上传的类型不对";
			span13 = "属性：";
			span14 = "修改";
			span15 = "图片设置";
			span16 = "大小：";
			span17 = "宽度";
			span18 = "高度";
			span19 = "边框：";
			span20 = "边距：";
			span21 = "描述：";
			span23 = "加粗";
			span24 = "斜体";
			span25 = "下划线";
			span26 = "上传图片";
			break;
	}
	var ie = getBrowserVersion().indexOf("IE") != -1 ? true : false;
	var ff = getBrowserVersion().indexOf("FF") != -1 ? true : false;
	var _settings = {};
	var arrayObjClickPoint = new Array();
	var paragraphObj = {};
	$.fn.setDisabled = function() {
		// 不可编辑
		var _tool = $("#" + this[0].id).find(".wd-toolbox");
		for(var i = 0; i < _tool.length; i++) {
			$(_tool[i]).addClass("wd-toolbox-default");
			if($(_tool[i]).find(".wd-file").length > 0) {
				$(_tool[i]).find(".wd-file")[0].disabled = true;
			}
		}
		var _edit = $("#" + this[0].id).find(".wd-editeditbox");
		_edit[0].contentEditable = "false";
		var _editP = $("#" + this[0].id).find(".wd-editp");
		for(var j = 0; j < _editP.length; j++) {
			if($(_editP[j]).hasClass("Img")) {
				$(_editP[j]).addClass("wd-toolbox-default");
			}
		}
	}
	$.fn.setEnabled = function() {
		// 可编辑
		var _tool = $("#" + this[0].id).find(".wd-toolbox");
		for(var i = 0; i < _tool.length; i++) {
			$(_tool[i]).removeClass("wd-toolbox-default");
			if($(_tool[i]).find(".wd-file").length > 0) {
				$(_tool[i]).find(".wd-file")[0].disabled = false
			}
		}
		var _edit = $("#" + this[0].id).find(".wd-editeditbox");
		_edit[0].contentEditable = "true";
		var _editP = $("#" + this[0].id).find(".wd-editp");
		for(var j = 0; j < _editP.length; j++) {
			if($(_editP[j]).hasClass("Img")) {
				$(_editP[j]).removeClass("wd-toolbox-default");
			}
		}
	}
	$.fn.getContent = function() {
		var retFlag = false;
		var obj_p = $("#wd-editeditbox_" + this[0].id).find(".wd-editp");
		for(var j = 0; j < obj_p.length; j++) {
			if(getLastChildNode(obj_p[j]).innerHTML != "<br>" && getLastChildNode(obj_p[j]).innerHTML != "") {
				retFlag = true;
			}
		}
		if(retFlag) {
			// 获取带格式内容
			if(document.getElementById("edit_cont")) {
				document.getElementById("edit_cont").style.display = "none";
				document.getElementById(this[0].id).appendChild(document.getElementById("edit_cont"));
			}
			var imgOpt = $("#wd-editeditbox_" + this[0].id).find(".wd-editFileSingleOpt");
			for(var i = 0; i < imgOpt.length; i++) {
				imgOpt[i].style.display = "none";
			}
			return $("#wd-editeditbox_" + this[0].id)[0].innerHTML;
		} else {
			return "";
		}
	};
	$.fn.getContentTxt = function() {
		// 获取纯文本内容
		var contentTxt = getSpeCont(this[0].id, "1");
		return contentTxt;
	};
	$.fn.getContentImg = function() {
		// 获取所有图片
		var contentTxt = getSpeCont(this[0].id, "2");
		return contentTxt;
	}
	$.fn.setContent = function(content, isAppendTo) {
		var _id = this[0].id;
		if(isAppendTo) {
			$("#wd-editeditbox_" + _id)[0].innerHTML += content;
			scrollBottom($("#wd-editeditbox_" + _id)[0]);
		} else {
			if(content){
				$("#wd-editeditbox_" + _id)[0].innerHTML = content;
			}
		}

		if($("#wd_editImgWrap")){
			insertImgOpt(_settings[_id]);
			if($("#wd_editImgWrap").length == 0){
				addImgOptBox(_settings[_id]);
			}
		}

		// 添加事件
		var arrImg = $("#wd-editeditbox_" + _id).find(".wd-editImgWrap");
		for(var i = 0; i < arrImg.length; i++) {
			$(arrImg[i]).bind("mouseenter", function() {
				if(!$(this).parent().hasClass("wd-toolbox-default")) {
					$(this).parent().find(".wd-editFileSingleOpt").stop().slideDown("100");
				}
			});
			$(arrImg[i]).bind("mouseleave", function() {
				$(this).parent().find(".wd-editFileSingleOpt").stop().slideUp("100");
			});
			$(arrImg[i].childNodes[0]).bind("click", function() {
				if(!$(this).parent().parent().hasClass("wd-toolbox-default")) {
					var _img = this;
					showImgOpt(_settings[_id], _img);
					return false;
				}
			});
			// 上移
			var up = $(arrImg[i]).find(".wd-editImgUp")[0];
			$(up).bind("click", function() {
				moveImg(this.parentNode.parentNode, this, "up");
			});
			// 下移
			var down = $(arrImg[i]).find(".wd-editImgDown")[0];
			$(down).bind("click", function() {
				moveImg(this.parentNode.parentNode, this, "down");
			});
			// 修改
			var edit = $(arrImg[i]).find(".wd-eidtImgEdit")[0];
			$(edit).bind('click', function() {
				if(!$(this).parent().hasClass("wd-toolbox-default")) {
					document.getElementById("wd_editBg").style.display = "block";
					document.getElementById("wd_editBg").style.height = document.height;
					document.getElementById("wd_editImgWrap").style.display = "block";
					document.getElementById("wd_editImgWrap").setAttribute("rel", this.parentNode.previousSibling.id);
					var _img = this.parentNode.previousSibling;
					showImgOpt(_settings[_id], _img);
				}
			});
			// 删除
			var del = $(arrImg[i]).find(".wd-eidtImgDel")[0];
			$(del).bind('click', function(e) {
				document.getElementById("edit_cont").style.display = "none";
				document.getElementById(_id).appendChild(document.getElementById("edit_cont"));
				$(this.parentNode.parentNode.parentNode).remove();
			});
		}
	};
	$.fn.wdEditStarter = function(objs) {
		var _this = this;
		// 默认值处理
		var defaults = {
			model: null,
			id: _this[0].id,
			toolbar: ['bold', 'italic', 'underline', 'simpleupload', 'insertimage', 'formula'],
			width: "100%",
			height: "300",
			clock: true,

			uploadOptions: {
				showUrl: getRequestAddressUrl("file"),
				delUrl: getRequestAddressUrl("filedelete"),
				script: getRequestAddressUrl("fileupload"),
				totalSize: 0,
				addFiles: {},
				map_Files: {}
			}
		}
		var objs = $.extend(defaults, objs);
		_settings[this[0].id] = objs;

		var jsurl = [];
		for(i = 0; i < objs.toolbar.length; i++) {
			var jsJson = {};
			var cssarray = [];
			// 公式编辑
			if(objs.toolbar[i] == "formula") {
				// js处理
				var Formulajsurl = "";
				var Formulacssurl = "";
				if(getRequestAddressUrl("components")){
					Formulajsurl = "wdFormula/wdFormula.js";
					Formulacssurl = "wdFormula/wdFormula.css";
				}else{
					Formulajsurl = "ui/common/components/wdFormula/wdFormula.js";
					Formulacssurl = "ui/common/components/wdFormula/wdFormula.css";
				}
				jsJson = {
					"jsurl": Formulajsurl,
					"version": "1.0",
					"title": span1
				}
				jsurl.push(jsJson);
				// css处理
				cssarray = [Formulacssurl];
				addCss(cssarray[0], cssarray, 0);
			}
		}

		if(jsurl.length > 0) {
			serieslLoadScripts(jsurl, function() {
				// 鼠标抬起时记录选中信息
				/*$(document.body).bind('mouseup', function() {
					getWindowSelectObjs(objs);
				});*/
				// 初始化
				init(_this, objs);
			});
		} else {
			// 鼠标抬起时记录选中信息
			/*$(document.body).bind('mouseup', function() {
				getWindowSelectObjs(objs);
			});*/
			// 初始化
			init(_this, objs);
		}
	};

	function init(_this, objs) {
		// 加载工具条
		var toolDiv = document.createElement('div');
		toolDiv.className = "wd-edittoolbox";
		for(var i = 0; i < objs.toolbar.length; i++) {
			toolDiv.appendChild(addtool(objs, objs.toolbar[i]));
		}
		// 记录加载p的计数
		var recordpcount = document.createElement('input');
		recordpcount.id = "wd-recordpcount_" + objs.id;
		recordpcount.value = "0";
		recordpcount.type = "hidden";
		toolDiv.appendChild(recordpcount);
		_this[0].appendChild(toolDiv);

		// 加载文本编辑区
		var editDiv = document.createElement('div');
		editDiv.className = "wd-editeditbox";
		editDiv.contentEditable = "true";
		editDiv.id = "wd-editeditbox_" + objs.id;
		editDiv.style.height = objs.height + "px";
		editDiv.appendChild(addp(objs, editDiv));
		if(objs.width.indexOf('%') == -1) editDiv.style.width = objs.width + "px";
		else editDiv.style.width = objs.width;
		// 文本编辑器被点击时光标默认在最后一个p上
		$(editDiv).click(function(e) {
			var _this = this;
			getWindowSelectObjs(objs);
//			setArrayObjClickPoint();

			var target = $(e.target);
			if(target[0].id != $("#edit_cont").attr("rel") && $("#edit_cont").length > 0) {
				$("#edit_cont").hide();
				$("#" + objs.id)[0].appendChild($("#edit_cont")[0]);
			}
		});

		$(editDiv).bind("keydown", function(e) {
			if(e && e.keyCode == 13) { // 回车
				/*if(window.event)
					window.event.returnValue = false;
				else
					e.preventDefault(); //for firefox
				var sel = window.getSelection();
				var parentStart = getParentNode(sel.anchorNode);
				var allLength = getText(parentStart).length; // 当前p的字符总长度
				if((sel.anchorNode.className == "wd-editp" && sel.anchorNode.innerHTML == "<br>") || (sel.anchorNode.nodeValue == "<br>")) {
					allLength = 0;
				}
				var mouseLength = getMouseLen(parentStart); // 鼠标所在位置

				// 如果鼠标位置长度等于所有子元素长度则创建一个新P
				var curObj = paragraphObj.curObj;
				if(mouseLength == allLength) {
					var parea = addp(objs);
					if(curObj.className.indexOf("wd-editp") != -1) {
						$(curObj).after(parea);
					} else if(getParentNode(curObj) && getParentNode(curObj).className.indexOf("wd-editp") == -1) {
						$(getParentNode(curObj)).after(parea);
					} else {
						$("#wd-editeditbox_" + objs.id)[0].appendChild(parea);
					}
					paragraphObj["curObj"] = parea;

					var arrStyle = getFontStyle(objs);
					$.each(arrStyle, function(i) {
						addFontStyle(objs, arrStyle[i], parea);
					});
					moveFocus(parea);
				} else {
					fuseObj(objs, mouseLength);
				}*/
			} else if(e && e.keyCode == 8 || e.keyCode == 46) { // 退格和删除
				// 最后一个p不删除
				var sel = window.getSelection();
				var _this = getParentNode(sel.anchorNode);
				if((sel.anchorNode.className == "wd-editp" && (sel.anchorNode.innerHTML == "<br>" || sel.anchorNode.innerHTML == "")) || (sel.anchorNode.nodeValue == "<br>" && sel.anchorNode.nodeValue == "")) {
					var allPCount = $("#" + objs.id).find('p').length; // 所有的p
					var thisIndex = $(_this).index(); // 当前p的位置
					if(allPCount >= 1) {
						if(window.event)
							window.event.returnValue = false;
						else
							e.preventDefault(); //for firefox
						if(e.keyCode == 8) { //退格光标定位到上一个p最后
							if($(_this).prev() && $(_this).prev()[0] && $(_this).prev()[0].className.indexOf("Img") == -1) {
								moveEnd($(_this).prev()[0]);
								$(_this).remove();
							}
						} else { // 删除光标定位到下一个第一个
							if($(_this).next() && $(_this).next()[0].className.indexOf("Img") == -1) {
								if(thisIndex < allPCount) { // 删除的不是最后一个
									moveFocus($(_this).next()[0]);
								} else {
									moveEnd($(_this).prev()[0]);
								}
								$(_this).remove();
							}
						}
					}
				} else if(arrayObjClickPoint.length > 0) {
					var startObj = getParentNode(arrayObjClickPoint[0].startObjNode);
					var endObj = getParentNode(arrayObjClickPoint[0].endObjNode);
					if(startObj == endObj) {
						var parentStart = getParentNode(window.getSelection().anchorNode);
						if(parentStart && parentStart.className.indexOf("Img") != -1) {
							if(window.event)
								window.event.returnValue = false;
							else
								e.preventDefault(); //for firefox
							moveFocus($(parentStart).next()[0]);
							$(parentStart).remove();
						} else {
							if(e.keyCode == 8) {
								if(window.getSelection().anchorOffset == 0) {
									var preObj = $(_this).prev()[0];
									if(preObj && preObj.className.indexOf("Img") == -1) {
										if(window.event)
											window.event.returnValue = false;
										else
											e.preventDefault(); //for firefox
										moveEnd(preObj);
										var childNode = getLastChildNode(preObj);
										var nextChildNode = getLastChildNode(_this);
										if(childNode.innerHTML == "<br>" && nextChildNode.innerHTML != "<br>" && nextChildNode.innerHTML != "") {
											childNode.innerHTML = "";
										}
										var iCount = nextChildNode.childNodes.length;
										for(var i = 0; i < iCount; i++) {
											childNode.appendChild(nextChildNode.childNodes[0]);
										}
										getWindowSelectObjs(objs);
										paragraphObj.curObj = preObj;
										$(_this).remove();
									} else if(preObj && preObj.className.indexOf("Img") != -1) {
										if(window.event)
											window.event.returnValue = false;
										else
											e.preventDefault(); //for firefox
									}
								}else if(sel.focusOffset == '1' && sel.anchorNode.previousSibling.localName == 'span' && sel.anchorNode.previousSibling.previousSibling.className == "divbox"){
									//解决公式退格删除问题
									if(window.event)
										window.event.returnValue = false;
									else
										e.preventDefault(); //for firefox
									sel.anchorNode.previousSibling.previousSibling.remove();
									sel.anchorNode.previousSibling.remove();
									sel.anchorNode.remove();
								}
							} else {
								var nextObj = $(_this).next()[0];
								var allLength = getText(parentStart).length;
								if(window.getSelection().anchorOffset == allLength && nextObj && nextObj.className.indexOf("Img") != -1) {
									if(window.event)
										window.event.returnValue = false;
									else
										e.preventDefault(); //for firefox
								}
								if(nextObj && nextObj.className.indexOf("Img") == -1 && nextObj.childNodes.length > 0 && !window.getSelection().toString()) {
									if(window.getSelection().anchorOffset == allLength) {
										if(window.event)
											window.event.returnValue = false;
										else
											e.preventDefault(); //for firefox
										var childNode = getLastChildNode(_this);
										var nextChildNode = getLastChildNode(nextObj);
										if(childNode.innerHTML == "<br>" && nextChildNode.innerHTML != "<br>" && nextChildNode.innerHTML != "") {
											childNode.innerHTML = "";
										}
										var iCount = nextChildNode.childNodes.length;
										for(var i = 0; i < iCount; i++) {
											childNode.appendChild(nextChildNode.childNodes[0]);
										}
										$(nextObj).remove();
									}
								}
							}
						}
					}
				}
			}
			var obj_p = $("#" + objs.id).find('.wd-editp');
			if(obj_p.length == 0) {
				var _div = document.getElementById("wd-editeditbox_" + objs.id);
				var _text = "";
				if(_div.innerHTML != "<br>" && _div.innerHTML != "") {
					_text = _div.innerHTML;
				}
				_div.innerHTML = "";
				var _addp = addp(objs);
				if(_text) {
					_addp.innerHTML = _text;
				}
				_div.appendChild(_addp);
				moveFocus(_addp);
				paragraphObj["curObj"] = _addp;
				var arrStyle = getFontStyle(objs);
				$.each(arrStyle, function(i) {
					addFontStyle(objs, arrStyle[i], _addp);
				});
			}
		});

		_this[0].appendChild(editDiv);
		
		if(objs.model && objs.model.jsonData[_this[0].id]) {
			$("#" + _this[0].id).setContent(objs.model.jsonData[objs.id], false);
		}
	}

	// 获取光标位置信息
	function setArrayObjClickPoint() {
		var selectObj = window.getSelection();
		if(selectObj.anchorNode) {
			var startObj = selectObj.anchorNode.parentNode;
			var startObjNode = selectObj.anchorNode;
			var startObjPreObj = (selectObj.anchorNode.previousElementSibling) ? selectObj.anchorNode.previousElementSibling : selectObj.anchorNode.previousSibling;
			var startObjNextObj = (selectObj.anchorNode.nextElementSibling) ? selectObj.anchorNode.nextElementSibling : selectObj.anchorNode.nextSibling;
			var endObj = selectObj.focusNode.parentNode;
			var endObjPreObj = (selectObj.focusNode.previousElementSibling) ? selectObj.focusNode.previousElementSibling : selectObj.focusNode.previousSibling;
			var endObjNextObj = (selectObj.focusNode.nextElementSibling) ? selectObj.focusNode.nextElementSibling : selectObj.focusNode.nextSibling;
			var endObjNode = selectObj.focusNode;
			arrayObjClickPoint.pop(arrayObjClickPoint.length);
			arrayObjClickPoint.push({ // 记录选择对象待处理信息
				"startObjBox": startObj, // 选中文本起始对象（P）
				"endObjBox": endObj, // 选中文本终止对象（P）
				"selectText": selectObj.toString(),
				"startObjPreObj": startObjPreObj, // 选中对象前一个对象（strong）
				"startObjNextObj": startObjNextObj, // 选中对象后一个对象（strong）
				"start": selectObj.anchorOffset, // 选中文本在起始对象中的位置
				"end": selectObj.focusOffset, // 选中文本在终止对象中的位置
				"startObjNode": startObjNode, // 当前选中文本对象(strong)
				"endObjNode": endObjNode
			});
		}
	}

	// 加载编辑区p
	function addp(objs) {
		var editp = document.createElement('p');
		editp.className = "wd-editp";
		//$(editp).attr("contenteditable", "true");
		editp.name = $("#wd-recordpcount_" + objs.id).val();

		if(ie) {
			editp.innerHTML = '';
		} else if(ff) {
			editp.innerHTML = '&nbsp';
		} else {
			editp.innerHTML = '<br>';
		}

		$("#wd-recordpcount_" + objs.id).val(parseInt($("#wd-recordpcount_" + objs.id).val()) + 1); // 设置下一个p的id
		return editp;
	};

	// 获取光标所在位置
	function getMouseLen(obj) {
		var mouseLength = 0;
		var lastChild = getLastChildNode(obj);
		var iCount = lastChild.childNodes.length; // 当前操作p的所有子对象数量
		if(obj.childNodes.length > 0) {
			for(var i = 0; i < iCount; i++) {
				if(!(lastChild.childNodes[i].classList && lastChild.childNodes[i].classList.contains("divbox"))) {
					// 如果是当前子元素是回车元素
					if(lastChild.childNodes[i] == window.getSelection().anchorNode) {
						mouseLength = mouseLength + window.getSelection().anchorOffset;
						break;
					} else { // 如果不是叠加子元素长度
						if(window.getSelection().anchorOffset != 0) {
							var temp = getElementText(lastChild.childNodes[i]);
							if(temp && lastChild.innerHTML != "<br>" && lastChild.innerHTML != "") {
								mouseLength = mouseLength + temp.length;
							}
						}
					}
				} else {
					mouseLength = mouseLength + lastChild.childNodes[i].outerText.length;
				}
			}
		}
		return mouseLength;
	}

	// 融合对象
	function fuseObj(objs, mouseLength, tempObj) {
		var sel = window.getSelection();
		var curObj = paragraphObj.curObj;
		var selectedText = "";
		if(sel.anchorNode.wholeText) {
			selectedText = sel.anchorNode.wholeText;
		} else {
			selectedText = getLastChildNode(sel.anchorNode).innerText;
		}
		var parea = addp(objs);
		// 获取回车后对象集合
		if(selectedText) {
			var lastText = selectedText.substring(mouseLength, selectedText.length);
			var _obj = getLastChildNode(curObj);
			_obj.innerHTML = selectedText.substring(0, mouseLength);
			if(_obj.innerHTML == "") {
				_obj.innerHTML = "<br>";
			}
			parea.innerHTML = lastText;
		}
		if(tempObj) {
			$(tempObj).after(parea);
			$(curObj).after(tempObj);
		} else {
			$(curObj).after(parea);
		}
		moveFocus(parea);
		paragraphObj["curObj"] = parea;
		var arrStyle = getFontStyle(objs);
		$.each(arrStyle, function(i) {
			addFontStyle(objs, arrStyle[i], parea);
		});
	}

	// 获取当前对象信息
	function getWindowSelectObjs(objs) {
		if(window.getSelection) {
			var selectObj = window.getSelection();
			if(selectObj.anchorNode) {
				var startObj = selectObj.anchorNode.parentNode;
				var startObjNode = selectObj.anchorNode;

				if(getParentNode(startObjNode) && getParentNode(startObjNode).className.indexOf("wd-editp") != -1) {
					paragraphObj["curObj"] = getParentNode(startObjNode);
				}

				var arrNode = setFontStyle(objs);
				var obj_p = find(document.getElementById(objs.id), "wd-editp");
				if(!(obj_p.length == 1 && (paragraphObj.curObj.innerHTML == "<br>" || paragraphObj.curObj.innerHTML == ""))) {
					if(!contains(arrNode, "b")) {
						$("#" + objs.id + "_B").removeClass("wd-edittoolbox-active");
					}
					if(!contains(arrNode, "i")) {
						$("#" + objs.id + "_I").removeClass("wd-edittoolbox-active");
					}
					if(!contains(arrNode, "u")) {
						$("#" + objs.id + "_U").removeClass("wd-edittoolbox-active");
					}
				}
			}
		}
	};

	// 添加处理的结果到p上
	function addAndRemObjOrHtml(remObj, addStr, flg, objs) {
		if(flg) {
			var curObj = paragraphObj.curObj;
			if(curObj.innerHTML == "<br>" || curObj.innerHTML == "" || getLastChildNode(curObj).innerHTML == "<br>" || getLastChildNode(curObj).innerHTML == "") {
				if($(addStr).find("img").length > 0) {
					if($(paragraphObj.curObj).next(".wd-editp").length > 0) {
						paragraphObj.curObj = addStr[0];
						$(remObj).after(addStr);
						$(remObj).remove();
						moveFocus($(paragraphObj.curObj).next(".wd-editp")[0]);
					} else {
						$(remObj).before(addStr);
					}
				}
			} else {
				if($(addStr).find("img").length > 0) {
					var allLength = getText(remObj).length; // 当前p的字符总长度
					var mouseLength = getMouseLen(remObj); // 鼠标所在位置
					if(mouseLength == allLength) {
						if($(paragraphObj.curObj).next(".wd-editp").length == 0) {
							var addP = addp(objs);
							$(addStr).after(addP);
							$(remObj).after(addStr);
							moveFocus(addP);
							paragraphObj["curObj"] = addP;
						} else {
							$(remObj).after(addStr);
							moveFocus(paragraphObj.newObj);
							paragraphObj["curObj"] = paragraphObj.newObj;
							paragraphObj["newObj"] = "";
						}
					} else if(mouseLength == 0) {
						$(remObj).before(addStr);
					} else {
						fuseObj(objs, mouseLength, addStr);
					}
				} else {
					$(remObj).after(addStr);
					$(remObj).remove();
				}
			}
		} else {
			return addStr;
		}
	};

	// 获取对象的值
	function getElementText(obj) {
		return(obj.innerHTML) ? obj.innerHTML : obj.nodeValue;
	};

	function getText(obj) {
		return(obj.innerText) ? obj.innerText : obj.textContent;
	}

	// 获取父节点,p或者p下一个
	function getParentNode(present) {
		if(present == null) {
			return null;
		}
		if(present.className && present.className.indexOf("wd-editp") != -1) {
			return present;
		} else {
			return getParentNode(present.parentNode);
		}
	};

	// 获取子节点
	function getLastChildNode(present) {
		if(present == null) {
			return null;
		}
		var childNode = present.childNodes;
		if(childNode.length > 0 && childNode[0].childNodes.length > 0 && !childNode[0].classList.contains("divbox")) {
			return getLastChildNode(childNode[0]);
		} else if(childNode.length > 0) {
			return childNode[0].parentNode;
		} else {
			return present;
		}
	}

	// 获取p的最后一个对象
	function getLastNode(present) {
		return present.childNodes[present.childNodes.length - 1];
	};

	// 多图上传
	function insertImg(objs) {
		// 遮罩层背景
		if($("#wd_editBg").length == 0) {
			var editBg = document.createElement("div");
			editBg.id = "wd_editBg";
			editBg.className = "wd-editBg";
			document.body.appendChild(editBg);
		}

		// 遮罩层
		var editChosenWrap = document.createElement("div");
		// 标题
		editChosenWrap.id = "wd_editChosenWrap";
		editChosenWrap.className = "wd-editChosenWrap";
		var editChosenTop = document.createElement("div");
		editChosenTop.className = "wd-editChosenTop";
		var editChosenTit = document.createElement("span");
		editChosenTit.className = "wd-editChosenTit";
		editChosenTit.innerHTML = span2;
		editChosenTop.appendChild(editChosenTit);
		var editChosenClose = document.createElement("span");
		editChosenClose.className = "wd-editChosenClose";
		$(editChosenClose).bind("click", function() {
			closeInsertImg(objs);
		});
		editChosenTop.appendChild(editChosenClose);
		editChosenWrap.appendChild(editChosenTop);
		// 内容
		var editChosenCont = document.createElement("div");
		editChosenCont.className = "wd-editChosenCont";
		// 上传图片初始页面
		var editChosen = document.createElement("div");
		editChosen.id = "wd_editChosen";
		editChosen.className = "wd-editChosen";
		var editUloadWrap = document.createElement("div");
		editUloadWrap.className = "wd-editUploadWrap";
		var editUploadImage = document.createElement("div");
		editUploadImage.className = "wd-editUploadImage";
		editUloadWrap.appendChild(editUploadImage);
		var editChosenPic = document.createElement("a");
		editChosenPic.className = "wd-editChosenPic";
		var span_0 = document.createElement("span");
		span_0.innerHTML = span3;
		editChosenPic.appendChild(span_0);
		var fileAdd_select = document.createElement("input");
		fileAdd_select.id = "fileAdd_select";
		fileAdd_select.type = "file";
		fileAdd_select.accept = "image/*";
		fileAdd_select.multiple = "multiple";
		fileAdd_select.className = "wd-file";
		$(fileAdd_select).bind("change", function() {
			fileSelect(objs, this);
		});
		editChosenPic.appendChild(fileAdd_select);
		editUloadWrap.appendChild(editChosenPic);
		editChosen.appendChild(editUloadWrap);
		editChosenCont.appendChild(editChosen);
		// 上传页面
		var editFileWrap = document.createElement("div");
		editFileWrap.id = "wd_editFileWrap";
		editFileWrap.className = "wd-editFileWrap wd-editNone";

		var editFileTop = document.createElement("div");
		editFileTop.className = "wd-editFileTop";
		var editFileDesc = document.createElement("div");
		editFileDesc.id = "wd_editFileDesc";
		editFileDesc.className = "wd-editFileDesc";
		editFileTop.appendChild(editFileDesc);

		var editFileOpt = document.createElement("div");
		editFileOpt.className = "wd-editFileOpt";
		var editAdd = document.createElement("a");
		editAdd.className = "wd-editFileBtn wd-editAdd";
		var span_4 = document.createElement("span");
		span_4.innerHTML = span4;
		editAdd.appendChild(span_4);
		var fileAdd = document.createElement("input");
		fileAdd.id = "fileAdd_continue";
		fileAdd.type = "file";
		fileAdd.accept = "image/*";
		fileAdd.multiple = "multiple";
		fileAdd.className = "wd-file";
		$(fileAdd).bind("change", function() {
			fileSelect(objs, this);
		});
		editAdd.appendChild(fileAdd);
		editFileOpt.appendChild(editAdd);
		var editUpload = document.createElement("input");
		editUpload.type = "button";
		editUpload.className = "wd-editFileBtn wd-editUpload";
		editUpload.value = span5;
		$(editUpload).bind("click", function() {
			uploadFiles(objs);
		});
		editFileOpt.appendChild(editUpload);
		editFileTop.appendChild(editFileOpt);
		editFileWrap.appendChild(editFileTop);

		var editFileList = document.createElement("ul");
		editFileList.className = "wd-editFileList";
		var editFiles = document.createElement("div");
		editFiles.id = "wd_editFiles";
		editFiles.className = "wd-editFiles";
		editFileList.appendChild(editFiles);
		var editFileAddBox = document.createElement("li");
		editFileAddBox.id = "wd_editFileAddBox";
		editFileAddBox.className = "wd-editFileAddBox";
		var fileAdd_box = document.createElement("input");
		fileAdd_box.id = "fileAdd_box";
		fileAdd_box.type = "file";
		fileAdd_box.accept = "image/*";
		fileAdd_box.multiple = "multiple";
		fileAdd_box.className = "wd-file";
		$(fileAdd_box).bind("change", function() {
			fileSelect(objs, this);
		});
		editFileAddBox.appendChild(fileAdd_box);
		editFileList.appendChild(editFileAddBox);
		editFileWrap.appendChild(editFileList);
		editChosenCont.appendChild(editFileWrap);
		// 操作区
		var editChosenBottom = document.createElement("div");
		editChosenBottom.className = "wd-editChosenBottom";
		var editChosen_qd = document.createElement("input");
		editChosen_qd.type = "button";
		editChosen_qd.className = "wd-editChosenBtn";
		editChosen_qd.value = span6;
		$(editChosen_qd).bind("click", function() {
			insertImages(objs);
		});
		editChosenBottom.appendChild(editChosen_qd);
		var editChosen_qx = document.createElement("input");
		editChosen_qx.type = "button";
		editChosen_qx.className = "wd-editChosenBtn";
		editChosen_qx.value = span7;
		$(editChosen_qx).bind("click", function() {
			closeInsertImg(objs);
		});
		editChosenBottom.appendChild(editChosen_qx);
		editChosenCont.appendChild(editChosenBottom);
		editChosenWrap.appendChild(editChosenCont);

		document.body.appendChild(editChosenWrap);

		getImageDesc(objs);
	}

	// 获取图片上传描述 
	function getImageDesc(objs) {
		var editFileDesc = document.getElementById("wd_editFileDesc");

		var desc_sc = document.createElement("div");
		desc_sc.id = "edit_descSc";
		var span_1 = document.createElement("span");
		span_1.innerHTML = span8;
		desc_sc.appendChild(span_1);
		var editFileSum = document.createElement("span");
		editFileSum.id = "wd_editFileSum";
		editFileSum.innerHTML = "0";
		desc_sc.appendChild(editFileSum);
		var span_2 = document.createElement("span");
		span_2.innerHTML = span9;
		desc_sc.appendChild(span_2);
		var editFileSize = document.createElement("span");
		editFileSize.id = "wd_editFileSize";
		editFileSize.innerHTML = "0";
		desc_sc.appendChild(editFileSize);
		var span_3 = document.createElement("span");
		span_3.innerHTML = "。";
		desc_sc.appendChild(span_3);
		editFileDesc.appendChild(desc_sc);

		var desc_wsc = document.createElement("div");
		desc_wsc.id = "edit_descWsc";
		desc_wsc.className = "wd-editDescWsc";
		var span_5 = document.createElement("span");
		span_5.innerHTML = span10;
		desc_wsc.appendChild(span_5);
		var editFileSum_Wsc = document.createElement("span");
		editFileSum_Wsc.id = "wd_editFileSum_wsc";
		editFileSum_Wsc.innerHTML = "0";
		desc_wsc.appendChild(editFileSum_Wsc);
		var span_6 = document.createElement("span");
		span_6.innerHTML = span11;
		desc_wsc.appendChild(span_6);
		editFileDesc.appendChild(desc_wsc);
	}

	// 选择图片
	function fileSelect(objs, sender) {
		$("#wd_editChosen").hide();
		$("#wd_editChosenWrap #wd_editFileWrap").removeClass("wd-editNone");
		$("#edit_descWsc").hide();
		$("#edit_descSc").show();
		if(sender.files) {
			var _src = "";
			var size = 0;
			var files = sender.files;
			for(i = 0; i < files.length; i++) {
				if (sender.accept.split("/")[0] != files[i].type.split("/")[0]) {
					alert(span12);
					return false;
				}
				var id = newGuid();
				objs.uploadOptions.map_Files[id] = files[i];
				// Firefox 因安全性问题已无法直接通过 input[file].value 获取完整的文件路径
				//_src = sender.files[0].getAsDataURL();
				_src = window.URL.createObjectURL(files[i]);
				size = files[i].size;
				var _li = document.createElement("li");
				_li.id = id;
				var _size = document.createElement("input");
				_size.className = "fileSize";
				_size.type = "hidden";
				_size.value = size;
				_li.appendChild(_size);
				var _opt = document.createElement("div");
				_opt.className = "wd-editFileSingleOpt";
				var _del = document.createElement("div");
				_del.className = "wd-editFileDel";
				$(_del).bind("click", function() {
					var delId = $(this).parent().parent("li")[0].id;
					for(var key in objs.uploadOptions.map_Files) {
						if(delId == key) {
							delete objs.uploadOptions.map_Files[key];
							break;
						}
					}

					var totalSum = $("#wd_editFileSum").html();
					$("#wd_editFileSum").html(parseInt(totalSum) - 1);
					var fileSize = $(this).parent().parent("li").find(".fileSize").val();
					objs.uploadOptions.totalSize = parseFloat(objs.uploadOptions.totalSize) - parseFloat(fileSize);
					var _totalSize = 0;
					if(objs.uploadOptions.totalSize >= 1024) {
						_totalSize = (objs.uploadOptions.totalSize / 1024).toFixed(2);
						if(_totalSize >= 1024) {
							_totalSize = (_totalSize / 1024).toFixed(2);
							_totalSize += "MB";
						} else {
							_totalSize += "KB";
						}
					}
					$("#wd_editFileSize").html(_totalSize);
					if((parseInt(totalSum) - 1) == 0) {
						$(".wd-editFileDesc").hide();
					}
					$(this).parent().parent("li").remove();
				})
				_opt.appendChild(_del);
				_li.appendChild(_opt);
				$(_li).bind("mouseenter", function() {
					$(this).find(".wd-editFileSingleOpt").stop().slideDown("100");
				});
				$(_li).bind("mouseleave", function() {
					$(this).find(".wd-editFileSingleOpt").stop().slideUp("100");
				});
				var _img = document.createElement("img");
				_img.src = _src;
				_li.appendChild(_img);
				var _success = document.createElement("span");
				_success.className = "wd_editFileSuccess";
				_li.appendChild(_success);
				document.getElementById("wd_editFiles").appendChild(_li);
				// 上传文件描述
				var totalSum = $("#wd_editFileSum").html();
				$(".wd-editFileDesc").show();
				$("#wd_editFileSum").html(parseInt(totalSum) + 1);
				objs.uploadOptions.totalSize = parseFloat(objs.uploadOptions.totalSize) + parseFloat(size);
				var _totalSize = 0;
				if(objs.uploadOptions.totalSize >= 1024) {
					_totalSize = (objs.uploadOptions.totalSize / 1024).toFixed(2);
					if(_totalSize >= 1024) {
						_totalSize = (_totalSize / 1024).toFixed(2);
						_totalSize += "MB";
					} else {
						_totalSize += "KB";
					}
				}
				$("#wd_editFileSize").html(_totalSize);
			}
			var file1 = document.getElementById("fileAdd_select");
			file1.value = "";
			var file2 = document.getElementById("fileAdd_continue");
			file2.value = "";
			var file3 = document.getElementById("fileAdd_box");
			file3.value = "";
		}
	}

	// 批量上传
	function uploadFiles(objs) {
		for(var key in objs.uploadOptions.map_Files) {
			if(objs.uploadOptions.map_Files[key]) {
				upload(objs, objs.uploadOptions.map_Files[key], key);
			}
		}
	}

	// 上传
	function upload(objs, file, key) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", objs.uploadOptions.script, false);
		var formData = new FormData();
		formData.append("files", file);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				// 从服务器的response获得数据
				var obj = $.parseJSON(xhr.response);
				var _files = obj.msgObj;
				for(var i = 0; i < _files.length; i++) {
					if(obj.successFlg == true) {
						objs.uploadOptions.addFiles[_files[i].fileId] = _files[i];
						if(objs.uploadOptions.map_Files) {
							$("#" + key).find(".wd-editFileSingleOpt").remove();
							$("#" + key).find(".wd_editFileSuccess").show();
							objs.uploadOptions.map_Files[key] = "";
						}
					}
				}
			}
		}
		xhr.send(formData);
	}

	// 多图上传-关闭
	function closeInsertImg(objs) {
		$("#wd_editBg").hide();
		$("#wd_editChosenWrap").hide();
		objs.uploadOptions.totalSize = 0;
		objs.uploadOptions.addFiles = {};
		objs.uploadOptions.map_Files = {};
		$("#wd_editFileSum").html(0);
		$("#wd_editFileSize").html("0KB");
		$("#wd_editChosenWrap #wd_editFileWrap").addClass("wd-editNone");
		$("#wd_editFiles").html("");
		$("#wd_editChosen").show();
		var obj_p = $("#" + objs.id).find(".wd-editp");
		moveEnd(obj_p[obj_p.length - 1]);
	}

	// 多图上传-确定
	function insertImages(objs) {
		var sum = getImageSum(objs);
		if(parseInt(sum) > 0) {
			$("#wd_editFileSum_wsc").html(sum);
			$("#edit_descSc").hide();
			$("#edit_descWsc").show();
		} else {
			addImageEle(objs);
			if($("#wd_editImgWrap")){
				insertImgOpt(objs);
				if($("#wd_editImgWrap").length == 0) {
					addImgOptBox(objs);
				}
			}
			closeInsertImg(objs);
		}
	}

	// 获取未上传文件个数
	function getImageSum(objs) {
		var sum = 0;
		for(var key in objs.uploadOptions.map_Files) {
			if(objs.uploadOptions.map_Files[key]) {
				sum += 1;
			}
		}
		return sum;
	}

	// 添加image对象到编辑区
	function addImageEle(objs) {
		var img_str = document.createElement("span");
		var addFiles = objs.uploadOptions.addFiles;
		for(var key in addFiles) {
			var imgWrap = document.createElement("span");
			imgWrap.className = "wd-editImgWrap";

			var img = document.createElement("img");
			img.id = newGuid();
			img.src = objs.uploadOptions.showUrl + addFiles[key].fileId;
			img.title = addFiles[key].fileName;
			img.alt = addFiles[key].fileName;
			$(img).bind("click", function() {
				var _img = this;
				showImgOpt(objs, _img);
				return false;
			});
			imgWrap.appendChild(img); // 当前挪动

			var imgOpt = document.createElement("span");
			imgOpt.className = "wd-editFileSingleOpt";

			var del = document.createElement("span");
			del.className = "wd-eidtImgDel";
			imgOpt.appendChild(del);

			var down = document.createElement("span");
			down.className = "wd-editImgDown";
			$(down).bind("click", function() {
				moveImg(imgWrap, this, "down");
			});
			imgOpt.appendChild(down);

			var up = document.createElement("span");
			up.className = "wd-editImgUp";
			$(up).bind("click", function() {
				moveImg(imgWrap, this, "up");
			});
			imgOpt.appendChild(up);
			imgWrap.appendChild(imgOpt);

			$(imgWrap).bind("mouseenter", function() {
				$(this).parent().find(".wd-editFileSingleOpt").stop().slideDown("100");
			});
			$(imgWrap).bind("mouseleave", function() {
				$(this).parent().find(".wd-editFileSingleOpt").stop().slideUp("100");
			});

			var imgP = addp(objs);
			$(imgP).addClass("Img");
			$(imgP).attr("contenteditable", "false");
			imgP.innerHTML = "";
			imgP.appendChild(imgWrap);
			$(imgP).click(function(e) {
				var target = $(e.target);
				if(target[0].id != $("#edit_cont").attr("rel")) {
					$("#edit_cont").hide();
					$("#" + objs.id)[0].appendChild($("#edit_cont")[0]);
				}
			});

			$(del).bind("click", function() {
				var _imgObj = $(this).parent().parent().parent();
				var _nextObj = $(_imgObj).next()[0];
				paragraphObj.curObj = _nextObj;
				document.getElementById("edit_cont").style.display = "none";
				document.getElementById(objs.id).appendChild(document.getElementById("edit_cont"));
				$(_imgObj).remove();
			});

			img_str.appendChild(imgP);
			var curObj = paragraphObj.curObj;
			if(curObj.innerHTML != "<br>" && curObj.innerHTML != "" && getLastChildNode(curObj).innerHTML != "<br>" && getLastChildNode(curObj).innerHTML != "") {
				if($(paragraphObj.curObj).next(".wd-editp").length != 0) {
					paragraphObj["newObj"] = $(paragraphObj.curObj).next(".wd-editp")[0];
				}
			}
			addAndRemObjOrHtml(paragraphObj.curObj, img_str.children, true, objs);
		}
	}

	// 图片移动
	function moveImg(moveImg, moveToImg, moveDir) {
		var curImg = $(moveImg).parent(".wd-editp")[0];
		if(moveDir == "up") {
			var obj = $(moveToImg).parents(".wd-editp");
			$(obj).prevAll().each(function() {
				if($(this).hasClass("Img")) {
					moveToImg = this;
					return false;
				}
			});
		} else {
			var obj = $(moveToImg).parents(".wd-editp");
			$(obj).nextAll().each(function() {
				if($(this).hasClass("Img")) {
					moveToImg = this;
					return false;
				}
			});
		}
		if(moveToImg && $(moveToImg).hasClass("Img")) {
			var tempObj = $(moveToImg).find(".wd-editImgWrap"); // 被挪动的
			if(tempObj) {
				moveToImg.appendChild(moveImg);
				curImg.appendChild(tempObj[0]);
			}
		}
	}

	// 图片操作
	function insertImgOpt(objs) {
		var edit_cont = document.createElement("div");
		edit_cont.id = "edit_cont";
		edit_cont.className = "edit-popup-cont";
		var _span = document.createElement("span");
		_span.innerHTML = span13;
		edit_cont.appendChild(_span);

		var edit = document.createElement("span");
		edit.className = "eidtImg-edit";
		edit.innerHTML = span14;
		$(edit).bind("click", function() {
			$("#wd_editBg").css({
				display: "block",
				height: $(document).height()
			});
			$("#wd_editImgWrap").show();
			$("#wd_editImgWrap").attr("rel", $("#edit_cont").attr("rel"));
		});
		edit_cont.appendChild(edit);
		$("#" + objs.id)[0].appendChild(edit_cont);
	}

	// 图片操作区位置
	function showImgOpt(objs, obj) {
		var _left = $(obj)[0].offsetLeft;
		var _top = $(obj)[0].offsetTop;
		var width = $(obj).width();
		var height = $(obj).height();

		$(obj).parent(".wd-editImgWrap").after(document.getElementById("edit_cont"));
		$("#edit_cont").show();
		$("#edit_cont").attr("rel", obj.id);
		var border = 0;
		if(obj.border) {
			border = parseInt(obj.border);
		}
		$("#edit_cont").css({
			top: parseInt(_top + height) + 2 * border + "px",
			left: parseInt(_left) + "px"
		});

		$("#wd_editImgWidth").val(obj.width);
		$("#wd_editImgHeight").val(obj.height);
		if(obj.border) {
			$("#wd_editImgBorder").val(obj.border);
		} else {
			$("#wd_editImgBorder").val(0);
		}
		if(obj.vspace) {
			$("#wd_editImgPadding").val(obj.vspace);
		} else {
			$("#wd_editImgPadding").val(0);
		}
		$("#wd_editImgDesc").val(obj.alt);
	}

	// 设置图片
	function addImgOptBox(objs) {
		// 遮罩层背景
		if($("#wd_editBg").length == 0) {
			var editBg = document.createElement("div");
			editBg.id = "wd_editBg";
			editBg.className = "wd-editBg";
			document.body.appendChild(editBg);
		}
		var editImgWrap = document.createElement("div");
		// 标题
		editImgWrap.id = "wd_editImgWrap";
		editImgWrap.className = "wd-editChosenWrap";
		var editImgTop = document.createElement("div");
		editImgTop.className = "wd-editChosenTop";
		var editImgTit = document.createElement("span");
		editImgTit.className = "wd-editChosenTit";
		editImgTit.innerHTML = span15;
		editImgTop.appendChild(editImgTit);
		var editImgClose = document.createElement("span");
		editImgClose.className = "wd-editChosenClose";
		$(editImgClose).bind("click", function() {
			closeImgOpt(objs);
		});
		editImgTop.appendChild(editImgClose);
		editImgWrap.appendChild(editImgTop);
		// 内容
		var editImgCont = document.createElement("div");
		editImgCont.className = "wd-editChosenCont";
		// 设置
		var editImgPro = document.createElement("div");
		editImgPro.id = "wd_editFileWrap";
		editImgPro.className = "wd-editFileWrap wd-editImg";
		var _table = document.createElement("table");
		_table.className = "wd-editTable";

		var _trSize = document.createElement("tr");
		var _thSize = document.createElement("th");
		_thSize.innerHTML = span16;
		_trSize.appendChild(_thSize);
		var _tdSize = document.createElement("td");
		var span1 = document.createElement("span");
		span1.innerHTML = span17;
		_tdSize.appendChild(span1);
		var inputWidth = document.createElement("input");
		inputWidth.id = "wd_editImgWidth";
		inputWidth.className = "wd-editInput wd-eidtWidth40";
		_tdSize.appendChild(inputWidth);
		var span2 = document.createElement("span");
		span2.innerHTML = "px&nbsp;&nbsp;"+span18;
		span2.className = "wd-eidtUnit";
		_tdSize.appendChild(span2);
		var inputHeight = document.createElement("input");
		inputHeight.id = "wd_editImgHeight";
		inputHeight.className = "wd-editInput wd-eidtWidth40";
		_tdSize.appendChild(inputHeight);
		var span3 = document.createElement("span");
		span3.innerHTML = "px";
		span3.className = "wd-eidtUnit";
		_tdSize.appendChild(span3);
		_trSize.appendChild(_tdSize);
		_table.appendChild(_trSize);

		var _trBorder = document.createElement("tr");
		var _thBorder = document.createElement("th");
		_thBorder.innerHTML = span19;
		_trBorder.appendChild(_thBorder);
		var _tdBorder = document.createElement("td");
		var inputBorder = document.createElement("input");
		inputBorder.id = "wd_editImgBorder";
		inputBorder.className = "wd-editInput";
		_tdBorder.appendChild(inputBorder);
		var span4 = document.createElement("span");
		span4.innerHTML = "px";
		span4.className = "wd-eidtUnit";
		_tdBorder.appendChild(span4);
		_trBorder.appendChild(_tdBorder);
		_table.appendChild(_trBorder);

		var _trPadding = document.createElement("tr");
		var _thPadding = document.createElement("th");
		_thPadding.innerHTML = span20;
		_trPadding.appendChild(_thPadding);
		var _tdPadding = document.createElement("td");
		var inputPadding = document.createElement("input");
		inputPadding.id = "wd_editImgPadding";
		inputPadding.className = "wd-editInput";
		_tdPadding.appendChild(inputPadding);
		var span5 = document.createElement("span");
		span5.innerHTML = "px";
		span5.className = "wd-eidtUnit";
		_tdPadding.appendChild(span5);
		_trPadding.appendChild(_tdPadding);
		_table.appendChild(_trPadding);

		var _trDesc = document.createElement("tr");
		var _thDesc = document.createElement("th");
		_thDesc.innerHTML = span21;
		_trDesc.appendChild(_thDesc);
		var _tdDesc = document.createElement("td");
		var inputDesc = document.createElement("input");
		inputDesc.id = "wd_editImgDesc";
		inputDesc.className = "wd-editInput";
		_tdDesc.appendChild(inputDesc);
		_trDesc.appendChild(_tdDesc);
		_table.appendChild(_trDesc);

		editImgPro.appendChild(_table);
		editImgCont.appendChild(editImgPro);
		// 操作区
		var editImgBottom = document.createElement("div");
		editImgBottom.className = "wd-editChosenBottom";
		var editImg_qd = document.createElement("input");
		editImg_qd.type = "button";
		editImg_qd.className = "wd-editChosenBtn";
		editImg_qd.value = span6;
		$(editImg_qd).bind("click", function() {
			var id = $("#wd_editImgWrap").attr("rel");
			var _width = $("#wd_editImgWidth").val();
			if(_width) {
				$("#" + id).css({
					width: _width,
				});
				$("#" + id).next()[0].style.width = parseInt(_width) + "px";
			}
			var _height = $("#wd_editImgHeight").val();
			if(_height) {
				$("#" + id).css({
					height: _height
				});
			}
			$("#" + id).attr("border", $("#wd_editImgBorder").val());
			var space = $("#wd_editImgPadding").val();
			if(space) {
				$("#" + id).attr("vspace", space);
				$("#" + id).attr("hspace", space);
				$("#" + id).next()[0].style.marginTop = space + "px";
				$("#" + id).next()[0].style.marginLeft = space + "px";
			}
			$("#" + id).attr("alt", $("#wd_editImgDesc").val());
			closeImgOpt(objs);
		});
		editImgBottom.appendChild(editImg_qd);
		var editImg_qx = document.createElement("input");
		editImg_qx.type = "button";
		editImg_qx.className = "wd-editChosenBtn";
		editImg_qx.value = span7;
		$(editImg_qx).bind("click", function() {
			closeImgOpt(objs);
		});
		editImgBottom.appendChild(editImg_qx);
		editImgCont.appendChild(editImgBottom);
		editImgWrap.appendChild(editImgCont);

		document.body.appendChild(editImgWrap);
	}

	// 设置图片-关闭
	function closeImgOpt(objs) {
		$("#wd_editBg").hide();
		$("#wd_editImgWrap").hide();
	}

	// 获取操作节点name（strong、i、u、text）
	function getNodeName(obj) {
		return obj.nodeName.toLowerCase().replace('#', '');
	};

	// 是否包含
	function contains(arr, str) {
		var flag = false;
		$.each(arr, function(i) {
			if(arr[i] == str) {
				flag = true;
				return false;
			}
		})
		return flag;
	}

	// 定位光标到对象最后
	function moveEnd(obj) {
		if(window.getSelection) { //ie11 10 9 ff safari
			obj.focus(); //解决ff不获取焦点无法定位问题
			var range = window.getSelection(); //创建range
			range.selectAllChildren(obj); //range 选择obj下所有子内容
			range.collapseToEnd(); //光标移至最后
		} else if(document.selection) { //ie10 9 8 7 6 5
			var range = document.selection.createRange(); //创建选择对象
			range.moveToElementText(obj); //range定位到obj
			range.collapse(false); //光标移至最后
			range.select();
		}
	};

	// 光标定位到对象开始
	function moveFocus(obj) {
		if(window.getSelection) { //ie11 10 9 ff safari
			obj.focus(); //解决ff不获取焦点无法定位问题
			var range = window.getSelection(); //创建range
			range.selectAllChildren(obj); //range 选择obj下所有子内容
			range.collapseToStart(); //光标移至开始
		} else if(document.selection) { //ie10 9 8 7 6 5
			var range = document.selection.createRange(); //创建选择对象
			range.moveToElementText(obj); //range定位到obj
			range.collapse(true); //光标移至开始
			range.select();
		}
	}

	// 获取已选择样式
	function getFontStyle(objs) {
		var arrStyle = [];
		var fontStyles = $("#" + objs.id).find(".wd-toolbox");
		$.each(fontStyles, function(i) {
			if($(fontStyles[i]).hasClass("wd-edittoolbox-active")) {
				var node = fontStyles[i].getAttribute("rel");
				arrStyle.push(node);
			}
		});
		return arrStyle;
	}

	// 设置已有样式
	function setFontStyle(objs, curObj, arrNode) {
		if(!curObj) {
			curObj = paragraphObj.curObj;
			arrNode = [];
		}
		if(curObj && curObj.childNodes.length != 0) {
			var childNode = curObj.childNodes[0];
			var nodeName = getNodeName(curObj.childNodes[0]);
			if(nodeName == "b") {
				arrNode.push("b");
				$("#" + objs.id + "_B").addClass("wd-edittoolbox-active");
			} else if(nodeName == "em") {
				arrNode.push("i");
				$("#" + objs.id + "_I").addClass("wd-edittoolbox-active");
			} else if(nodeName == "span" && childNode.style.textDecoration == "underline") {
				arrNode.push("u");
				$("#" + objs.id + "_U").addClass("wd-edittoolbox-active");
			}

			if(getNodeName(childNode) != "text" && curObj.innerHTML != "<br>" && curObj.innerHTML != "") {
				setFontStyle(objs, childNode, arrNode);
			} else {
				return arrNode;
			}
		} else {
			arrNode = getFontStyle(objs);
		}
		return arrNode;
	}

	// 工具栏操作
	function addActiveClass(objs, obj, fontType) {
		if(!$(obj).hasClass("wd-toolbox-default")) {
			initCursorPos(objs);
			if($(obj).hasClass("wd-edittoolbox-active")) {
				$(obj).removeClass("wd-edittoolbox-active");
				removeFontStyle(objs, fontType);
			} else {
				$(obj).addClass("wd-edittoolbox-active");
				addFontStyle(objs, fontType);
			}
		}
	}

	// 添加字体样式
	function addFontStyle(objs, fontType, curObj) {
		if(!curObj) {
			curObj = paragraphObj.curObj; // 当前待操作对象
		}
		if(fontType == "b") {
			var strong = document.createElement("b");
			curObj = append(curObj, strong);
		}
		if(fontType == "i") {
			var em = document.createElement("em");
			curObj = append(curObj, em);
		}
		if(fontType == "u") {
			var span = document.createElement("span");
			span.style.textDecoration = "underline";
			curObj = append(curObj, span);
		}
	};

	// 元素追加
	function append(curObj, newObj) {
		for(var i = 0; i < curObj.childNodes.length; i++) {
			newObj.appendChild(curObj.childNodes[i]);
			i--;
		}
		curObj.appendChild(newObj);
		return curObj;
	}

	// 移除字体样式
	function removeFontStyle(objs, fontType, curObj) {
		if(!curObj) {
			curObj = paragraphObj.curObj;
		}
		var childNode = curObj.childNodes[0];
		var nodeName = getNodeName(curObj.childNodes[0]);
		if((fontType == "b" && nodeName == "b") || (fontType == "i" && nodeName == "em") || (fontType == "u" && nodeName == "span") || curObj.innerHTML == "<br>" || curObj.innerHTML == "") {
			if(curObj.innerHTML != "<br>" && curObj.innerHTML != "") {
				var _nodeLen = childNode.childNodes.length;
				for(var i = 0; i < _nodeLen; i++) {
					curObj.appendChild(childNode.childNodes[0]);
				}
				curObj.removeChild(childNode);
			}
			return false;
		} else {
			if(getNodeName(childNode) != "text") {
				removeFontStyle(objs, fontType, childNode);
			} else {
				return false;
			}
		}
	};

	// 设置光标初始位置
	function initCursorPos(objs) {
		var obj_p = $("#" + objs.id).find(".wd-editp");
		var wdEditstart_gb = "";
		if(paragraphObj.curObj){
			wdEditstart_gb = $(paragraphObj.curObj).parents(".wd-editbox").attr("id");
		}
		if(!paragraphObj.curObj || wdEditstart_gb != objs.id) {
			paragraphObj["curObj"] = obj_p[obj_p.length - 1];
			moveEnd(obj_p[obj_p.length - 1]);
		}
	}

	// 获取内容
	function getSpeCont(id, spetype) {
		var cont = "";
		var childNodes = document.getElementById("wd-editeditbox_" + id).childNodes;
		for(var i = 0; i < childNodes.length; i++) {
			var _node = childNodes[i];
			if(spetype == "1") {
				if(_node && _node.className.indexOf("Img") == -1) {
					if(_node.innerHTML != "<br>" && _node.innerHTML != "") {
						cont = cont + _node.innerText;
					}
				}
			} else if(spetype == "2") {
				if(_node && _node.className.indexOf("Img") != -1) {
					if(cont) {
						cont = cont + ",";
					}
					var _img = $(_node).find("img");
					cont = cont + _img[0].src;
				}
			}
		}
		return cont;
	};

	// 加载工具条
	function addtool(objs, toolname) {
		var obj = document.createElement('div')
		switch(toolname) {
			case "bold":
				obj.className = "wd-toolbox wd-bold";
				obj.id = objs.id + "_B";
				obj.innerHTML = "B";
				obj.title = span23;
				obj.setAttribute("rel", "b");
				$(obj).bind("click", function() {
					var _this = this;
					addActiveClass(objs, _this, "b");
				})

				break;
			case "italic":
				obj.className = "wd-toolbox wd-italic";
				obj.innerHTML = "Ⅰ";
				obj.id = objs.id + "_I";
				obj.title = span24;
				obj.setAttribute("rel", "i");
				$(obj).bind("click", function() {
					var _this = this;
					addActiveClass(objs, _this, "i");
				});
				break;
			case "underline":
				obj.className = "wd-toolbox wd-underline";
				obj.title = span25;
				obj.innerHTML = "U";
				obj.id = objs.id + "_U";
				obj.setAttribute("rel", "u");
				$(obj).bind("click", function() {
					var _this = this;
					addActiveClass(objs, _this, "u");
				});
				break;
			case "simpleupload":
				obj.className = "wd-toolbox wd-insertimage";
				obj.title = span26;
				obj.id = objs.id + "_insertimage";

				var input = document.createElement("input");
				input.id = objs.id + "simpleupload_file";
				input.type = "file";
				input.accept = "image/*";
				input.className = "wd-file";
				$(input).bind("change", function() {
					if(this.files) {
						if (this.accept.split("/")[0] != this.files[0].type.split("/")[0]) {
							alert(span12);
							return false;
						}
						initCursorPos(objs);

						var file = this.files[0];
						upload(objs, file);
						var simpleupload_file = document.getElementById(objs.id + "simpleupload_file");
						simpleupload_file.value = "";

						addImageEle(objs);
						objs.uploadOptions.addFiles = {};

						if($("#wd_editImgWrap")){
							insertImgOpt(objs);
							if($("#wd_editImgWrap").length == 0){
								addImgOptBox(objs);
							}
						}
					}
				});
				obj.appendChild(input);
				break;
			case "insertimage":
				obj.className = "wd-toolbox wd-insertimages";
				obj.title = span2;
				obj.id = objs.id + "_insertimage";
				$(obj).bind("click", function() {
					if(!$(this).hasClass("wd-toolbox-default")) {
						initCursorPos(objs);
						if($("#wd_editImgWrap") && $("#wd_editChosenWrap").length == 0) {
							insertImg(objs);
						}
						$("#wd_editBg").css({
							display: "block",
							height: $(document).height()
						});
						$("#wd_editChosenWrap").show();
					}
				});
				break;
			case "formula":
				obj.className = "wd-toolbox wd-formula";
				obj.title = span1;
				obj.innerHTML = "∑";
				obj.id = objs.id + "_formula";
				$(obj).bind("click", function() {
					if(!$(this).hasClass("wd-toolbox-default")) {
						/*var _setformula = "";
						if(paragraphObj.curObj){
							_setformula = paragraphObj.curObj;
						}else{
							_setformula = $("#wd-editeditbox_yl-editBoxStarter")[0].lastChild;
						}*/
						jQuery("#" + obj.id).wdFormula({
							targetBox: $("#wd-editeditbox_yl-editBoxStarter")[0].lastChild
						});
					}
				});
				break;
		}

		return obj;
	}
})(jQuery);