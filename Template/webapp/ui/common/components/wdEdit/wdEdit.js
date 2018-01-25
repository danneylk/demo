(function($) {
	var ie = getBrowserVersion().indexOf("IE") != -1 ? true : false;
	var arrayObj = new Array();
	var arrayObjClickPoint = new Array();

	$.fn.wdEditSetSelectObj = function(options) {
		arrayObj = options.arrayObj;
	};
	$.fn.wdEditSetClickObj = function(options) {
		arrayObjClickPoint = options.arrayObjClickPoint;
	};

	$.fn.wdEdit = function(objs) {
		var _this = this;
		// 默认值处理
		var defaults = {
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

		var jsurl = [];
		jsurl = [{
			"jsurl": "ui/common/components/wdEdit/baseFunction.js",
			"version": "1.0",
			"title": "基本方法"
		}, {
			"jsurl": "ui/common/components/wdEdit/targetSeletcObj.js",
			"version": "1.0",
			"title": "获取选中对象方法"
		}, {
			"jsurl": "ui/common/components/wdEdit/headTool.js",
			"version": "1.0",
			"title": "工具栏头部处理方法"
		}, {
			"jsurl": "ui/common/components/wdEdit/imageFunction.js",
			"version": "1.0",
			"title": "工具栏头部处理方法"
		}]

		for(i = 0; i < objs.toolbar.length; i++) {
			var jsJson = {};
			var cssarray = [];
			// 公式编辑
			if(objs.toolbar[i] == "formula") {
				// js处理
				jsJson = {
					"jsurl": "ui/common/components/wdFormula/wdFormula.js",
					"version": "1.0",
					"title": "公式编辑器"
				}				
				jsurl.push(jsJson);
				// css处理
				cssarray = ["ui/common/components/wdFormula/wdFormula.css"];
				addCss(cssarray[0], cssarray, 0);
			}
		}

		serieslLoadScripts(jsurl, function() {
			// 鼠标抬起时记录选中信息
			$(document.body).bind('mouseup', function() {
				getWindowSelectObjs(objs);
			});
			// 初始化
			init(_this, objs);
		});

	};

	function init(_this, objs) {
		// 加载工具条
		initTool(_this, objs);
		// 加载文本编辑区
		var editDiv = document.createElement('div');
		$(editDiv).attr("contenteditable", "true");
		editDiv.className = "wd-editeditbox";
		editDiv.id = "wd-editeditbox_" + objs.id;
		editDiv.style.height = objs.height + "px";
		editDiv.appendChild(addp(objs, editDiv));
		if(objs.width.indexOf('%') == -1) editDiv.style.width = objs.width + "px";
		else editDiv.style.width = objs.width;
		// 文本编辑器被点击时光标默认在最后一个p上
		$(editDiv).bind('click', function() {
			setArrayObjClickPoint(objs);
		});
		_this[0].appendChild(editDiv);
	};

	// 加载编辑区p
	function addp(objs, editDiv) {
		var editp = document.createElement('p');
		editp.className = "wd-editp";
		editp.innerHTML = ie ? '' : '<br>';
		$(editp).bind('click', function() {

		});
		return editp;
	};

	// 获取字体设置标记
	function getFontActive(fontType, objs) {
		if(fontType == "b") {
			return $("#" + objs.id + "_B").hasClass("wd-edittoolbox-active");
		} else if(fontType == "i") {
			return $("#" + objs.id + "_I").hasClass("wd-edittoolbox-active");
		} else {
			return $("#" + objs.id + "_U").hasClass("wd-edittoolbox-active");
		}
	};

	// 递归给选中对象集合加样式
	function againStyle(nextObj, fontType, objs) {
		// 获取字体设置标记
		var fontActive = getFontActive(fontType, objs);
		// 获取当前处理的对象的类型
		var curFont = wdedit_getNodeName(nextObj);
		var curFlg = true; // 当前对象和处理对象是否一致(默认一致或者为text)
		if(curFont == "text" || curFont == fontType) {
			curFlg = true;
		} else {
			curFlg = false;
		}
		// 在改变之前获取下一个对象
		var nextsibling = "";
		if(nextObj.nextSibling && objs.clock) {
			nextsibling = nextObj.nextSibling;
		}
		// 判断是否为最后一个
		if(nextObj == arrayObj[0].endObjNode || nextObj == arrayObj[0].endObjBox) {
			nextsibling = "";
			objs.clock = false;
		}
		if(nextObj != arrayObj[0].endObjNode) { // 判断是否为最后一个（不是）
			if(wdedit_getNodeName(nextObj) == fontType) { // 如果当前处理对象的就是对应处理后的对象
				if(fontActive) { // 如果是粗体并且当前设置就是粗体则不处理
					if(nextsibling) {
						againStyle(nextsibling, fontType, objs);
					}
				} else {
					selectedText = nextObj.innerHTML.substring(0, arrayObj[0].end);
					tempStr1 = "<" + fontType + ">" + nextObj.innerHTML.substring(arrayObj[0].end, nextObj.innerHTML.length) + "</" + fontType + ">";
					wdedit_addAndRemObjOrHtml(nextObj, selectedText + tempStr1, true);

					if(nextsibling) {
						againStyle(nextsibling, fontType, objs);
					}
				}
			} else {
				if(fontActive) {
					if(curFlg) { // 判断是否对对象加对象
						selectedText = "<" + fontType + ">" + nextObj.nodeValue.substring(0, nextObj.nodeValue.length) + "</" + fontType + ">"; //////
						wdedit_addAndRemObjOrHtml(nextObj, selectedText, true);
					} else {
						againStyle(nextObj.childNodes[0], fontType, objs)
					}
				}
				if(nextsibling) {
					againStyle(nextsibling, fontType, objs);
				}
			}
		} else {
			if(fontActive) { // 如果是粗体并且当前设置就是粗体则不处理
				selectedText = "<" + fontType + ">" + nextObj.nodeValue.substring(0, arrayObj[0].end) + "</" + fontType + ">";
				tempStr1 = nextObj.nodeValue.substring(arrayObj[0].end, nextObj.nodeValue.length)
				wdedit_addAndRemObjOrHtml(nextObj, selectedText + tempStr1, true);
			}
		}

		objs.clock = true;
	};

	// 除第一个添加样式
	function fontStyleOther(FontObj, fontType, objs) {
		FontObj = FontObj[0];
		var iCount = FontObj.childNodes.length;
		var selectedText = "";
		var tempStr1 = "";
		var nextFlg = true;
		// 获取字体设置标记
		var fontActive = getFontActive(fontType, objs);
		for(var i = 0; i < iCount; i++) {
			if(fontActive) { // 加粗体
				var parentNodeName = wdedit_getNodeName(FontObj.childNodes[i]); // 父容器对象类型
				var parentStrat = "<" + parentNodeName + ">";
				var parentEnd = "</" + parentNodeName + ">";
				if(parentNodeName != fontType) {
					// 最后一个
					if(arrayObj[0].endObjBox == FontObj.childNodes[i] || arrayObj[0].endObjNode == FontObj.childNodes[i]) {
						var tmpText = wdedit_getElementText(FontObj.childNodes[i]);
						selectedText = "<" + fontType + ">" + tmpText.substring(0, arrayObj[0].end) + "</" + fontType + ">";
						tempStr1 = tmpText.substring(arrayObj[0].end);
						wdedit_addAndRemObjOrHtml(FontObj.childNodes[i], selectedText + tempStr1, true);
						nextFlg = false;
						break;
					} else {
						selectedText = parentStrat + "<" + fontType + ">" + wdedit_getElementText(FontObj.childNodes[i]) + "</" + fontType + ">" + parentEnd;
						wdedit_addAndRemObjOrHtml(FontObj.childNodes[i], selectedText, true);
					}
				} else {
					// 最后一个
					if(arrayObj[0].endObjBox == FontObj.childNodes[i] || arrayObj[0].endObjNode == FontObj.childNodes[i]) {
						nextFlg = false;
						break;
					}
				}
			} else { // 去掉粗体
				if(wdedit_getNodeName(FontObj.childNodes[i]) == fontType) {
					// 最后一个
					if(arrayObj[0].endObjBox == FontObj.childNodes[i] || arrayObj[0].endObjNode == FontObj.childNodes[i]) {
						selectedText = FontObj.childNodes[i].innerHTML.substring(0, arrayObj[0].end);
						tempStr1 = "<" + fontType + ">" + FontObj.childNodes[i].innerHTML.substring(arrayObj[0].end) + "</" + fontType + ">";
						wdedit_addAndRemObjOrHtml(FontObj.childNodes[i], selectedText + tempStr1, true);
						nextFlg = false;
						break;
					} else {
						selectedText = FontObj.childNodes[i].innerHTML;
						wdedit_addAndRemObjOrHtml(FontObj.childNodes[i], selectedText, true);
					}
				} else {
					// 最后一个
					if(arrayObj[0].endObjBox == FontObj.childNodes[i] || arrayObj[0].endObjNode == FontObj.childNodes[i]) {
						nextFlg = false;
						break;
					}
				}
			}
		}

		if($(FontObj).next().length > 0 && nextFlg) {
			fontStyleOther($(FontObj).next(), fontType, objs);
		}
	};

	// FontObj：当前操作对象
	// preObj：当前操作的前一个对象
	// nextObj：当前操作的后一个对象
	// startObjBox：起始的对象
	// endObjBox：终止的对象
	// objs：实例化对象
	function fontStyleOne(FontObj, preObj, nextObj, startObjBox, endObjBox, objs, fontType) {
		var tempStr1 = "";
		var tempStr2 = "";
		var selectedText = "";
		// 在改变之前获取下一个对象
		var nextsibling = "";
		// 获取字体设置标记
		var fontActive = getFontActive(fontType, objs);
		if(arrayObj[0].startObjNode.nextSibling && arrayObj[0].startObjNode != arrayObj[0].endObjNode) {
			nextsibling = arrayObj[0].startObjNode.nextSibling;
		}
		// 处理对象加对象获取下一个操作对象
		var parentNextObj = wdedit_getParentNode(arrayObj[0].startObjNode, true); // 获取p下第一个对象
		if(parentNextObj != arrayObj[0].startObjNode) {
			nextsibling = parentNextObj.nextSibling;
		}

		if(!nextObj && !preObj && wdedit_getNodeName(startObjBox) != fontType && wdedit_getNodeName(endObjBox) != fontType) { // 第一次加样式
			if(arrayObj[0].startObjNode == arrayObj[0].endObjNode) { // 选中对象中没有其他对象
				selectedText = FontObj.innerHTML.substring(arrayObj[0].start, arrayObj[0].end);
				tempStr1 = FontObj.innerHTML.substring(0, arrayObj[0].start);
				tempStr2 = FontObj.innerHTML.substring(arrayObj[0].end);
				selectedText = "<" + fontType + ">" + selectedText + "</" + fontType + ">";
				FontObj.innerHTML = wdedit_addAndRemObjOrHtml(null, tempStr1 + selectedText + tempStr2, false);
			} else {
				selectedText = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].startObjNode.nodeValue.length);
				selectedText = "<" + fontType + ">" + selectedText + "</" + fontType + ">";
				tempStr1 = arrayObj[0].startObjNode.nodeValue.substring(0, arrayObj[0].start);
				wdedit_addAndRemObjOrHtml(arrayObj[0].startObjNode, tempStr1 + selectedText, true);
				if(nextsibling != "") {
					againStyle(nextsibling, fontType, objs);
				}
			}
		} else if(preObj && wdedit_getNodeName(startObjBox) != fontType && wdedit_getNodeName(endObjBox) != fontType) { // 前一个是对象并且光标不在粗体内
			if(arrayObj[0].startObjNode == arrayObj[0].endObjNode) { // 选中对象中没有其他对象
				selectedText = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].end);
				tempStr1 = arrayObj[0].startObjNode.nodeValue.substring(0, arrayObj[0].start);
				tempStr2 = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].end);
				selectedText = "<" + fontType + ">" + selectedText + "</" + fontType + ">";
				wdedit_addAndRemObjOrHtml(arrayObj[0].startObjNode, tempStr1 + selectedText + tempStr2, true);
			} else { // 选中对象中有其他对象
				tempStr1 = arrayObj[0].startObjNode.nodeValue.substring(0, arrayObj[0].start);
				selectedText = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].startObjNode.nodeValue.length);
				selectedText = "<" + fontType + ">" + selectedText + "</" + fontType + ">";
				wdedit_addAndRemObjOrHtml(arrayObj[0].startObjNode, tempStr1 + selectedText, true);
				if(nextsibling != "") {
					againStyle(nextsibling, fontType, objs);
				}
			}
		} else if(!preObj && nextObj && wdedit_getNodeName(startObjBox) != fontType && wdedit_getNodeName(endObjBox) != fontType) { // 前一个没有，后一个是对象并且光标不在粗体内
			if(arrayObj[0].end - arrayObj[0].start >= 0) {
				if(checkNextIncludeSelect(nextObj)) {
					selectedText = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].end);
				} else {
					selectedText = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].startObjNode.nodeValue.length);
				}
				tempStr1 = arrayObj[0].startObjNode.nodeValue.substring(0, arrayObj[0].start);
				tempStr2 = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].end);
				selectedText = "<" + fontType + ">" + selectedText + "</" + fontType + ">";
				wdedit_addAndRemObjOrHtml(arrayObj[0].startObjNode, tempStr1 + selectedText + tempStr2, true);
			} else {
				selectedText = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].startObjNode.nodeValue.length);
				tempStr1 = arrayObj[0].startObjNode.nodeValue.substring(0, arrayObj[0].start);
				selectedText = "<" + fontType + ">" + selectedText + "</" + fontType + ">";
				wdedit_addAndRemObjOrHtml(arrayObj[0].startObjNode, tempStr1 + selectedText, true);
			}
			if(nextsibling != "") {
				againStyle(nextsibling, fontType, objs);
			}
		}
		if(wdedit_getNodeName(startObjBox) == fontType || wdedit_getNodeName(startObjBox) == fontType && wdedit_getNodeName(endObjBox) == fontType) { // 光标开始在粗体中,去掉粗体，全部显示非粗体
			if(arrayObj[0].startObjBox.nextSibling && arrayObj[0].startObjBox != arrayObj[0].endObjBox) {
				nextsibling = arrayObj[0].startObjBox.nextSibling;
			}
			if(arrayObj[0].startObjNode == arrayObj[0].endObjNode) { // 开始和结束都在同一个对象中
				tempStr1 = "<" + fontType + ">" + arrayObj[0].startObjNode.nodeValue.substring(0, arrayObj[0].start) + "</" + fontType + ">";
				tempStr2 = "<" + fontType + ">" + arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].end) + "</" + fontType + ">";
				selectedText = arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].end);
				wdedit_addAndRemObjOrHtml(arrayObj[0].startObjBox, tempStr1 + selectedText + tempStr2, true);
			} else { // 夸对象处理
				if(!fontActive) {
					if(startObjBox.innerHTML.substring(0, arrayObj[0].start) != "") {
						tempStr1 = "<" + fontType + ">" + startObjBox.innerHTML.substring(0, arrayObj[0].start) + "</" + fontType + ">";
					}
					selectedText = startObjBox.innerHTML.substring(arrayObj[0].start, startObjBox.innerHTML.length);
					wdedit_addAndRemObjOrHtml(startObjBox, tempStr1 + selectedText, true);
				}
				if(nextsibling != "") {
					againStyle(nextsibling, fontType, objs);
				}
			}
		}
		if(wdedit_getNodeName(startObjBox) != fontType && wdedit_getNodeName(endObjBox) == fontType) { // 结束在粗体中，将前面不是粗体的部分改为粗体
			tempStr1 = arrayObj[0].startObjNode.nodeValue.substring(0, arrayObj[0].start)
			tempStr2 = "<" + fontType + ">" + arrayObj[0].startObjNode.nodeValue.substring(arrayObj[0].start, arrayObj[0].startObjNode.nodeValue.length) + "</" + fontType + ">";
			wdedit_addAndRemObjOrHtml(arrayObj[0].startObjNode, tempStr1 + tempStr2, true);

			if(nextsibling != "") {
				againStyle(nextsibling, fontType, objs);
			}
		}
	};

	// 判断处理对象的下一个对象是否在选中中；true不在；false在
	function checkNextIncludeSelect(obj) {
		var present = wdedit_getParentNode(obj, false); // 下一个对象的父容器P
		var iCount = present.childNodes.length; // 父容器中的对象总数
		var endObj = wdedit_getParentNode(arrayObj[0].endObjBox, false); // 选中最后对象的父容器P
		var nextCount;
		var endCount;
		if($(present).index() == $(endObj).index()) { // 判断下一个和最后一个P是否为同一个
			for(var i = 0; i < iCount; i++) {
				if(present.childNodes[i] == obj) {
					nextCount = i;
				}
				if(present.childNodes[i] == arrayObj[0].endObjNode) {
					endCount = i;
				}
			}
			if(nextCount < endCount) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	};

	// 融合相似的对象
	function fuseElement(present, objs, fontType) {
		var iCount = present.childNodes.length;
		var addItem = present.childNodes[0];
		var addValue = wdedit_getElementText(addItem);
		var addType = wdedit_getNodeName(present.childNodes[0]);
		var tempValue = "";
		for(var i = 1; i < iCount; i++) {
			if(wdedit_getNodeName(present.childNodes[i]) == addType) {
				tempValue = wdedit_getElementText(present.childNodes[i]);

				addValue = addValue + tempValue;
				if(addType == fontType) {
					addItem.innerHTML = addValue;
				} else {
					addItem.nodeValue = addValue;
				}

				$(present.childNodes[i]).remove();
				iCount = iCount - 1;
				i = i - 1;
			} else {
				addItem = present.childNodes[i];
				addValue = wdedit_getElementText(addItem);
				addType = wdedit_getNodeName(present.childNodes[i]);
			}
		}

		iCount = present.childNodes.length;
		for(var i = 0; i < iCount; i++) {
			if(wdedit_getNodeName(present.childNodes[i]) == fontType) {
				if(present.childNodes[i].innerHTML == "") {
					$(present.childNodes[i]).remove();
				}
			}
		}
	};

	// 添加字体样式
	$.fn.wdEditAddFontStyle = function(options) {
		addFontStyle(options.fontType, options.objs);
	};

	function addFontStyle(fontType, objs) {
		var selectedText = "";
		var tempStr1 = "";
		var tempStr2 = "";
		var parentNode = "";
		if(arrayObj.length == 0) {
			var present = arrayObjClickPoint[0].startObjNode;
			if(fontType == "b") {
				var strong = document.createElement("b");
				present.strong.outerHTML;
			} else if(fontType == "i") {
				var em = document.createElement("em");
				present.innerHTML = em.outerHTML;
			} else if(fontType == "u") {
				var span = document.createElement("span");
				span.style.textDecoration = "underline";
				present.innerHTML = span.outerHTML;
			}
		} else {
			var present = arrayObj[0].startObjBox;
			var startObjBox = arrayObj[0].startObjBox;
			var endObjBox = arrayObj[0].endObjBox;
			if(wdedit_getIndex(present, fontType) == "0") { // 第一个并且是最后一个
				parentNode = wdedit_getParentNode(present, false);

				fontStyleOne(present, arrayObj[0].startObjPreObj, arrayObj[0].startObjNextObj, startObjBox, endObjBox, objs, fontType);

				fuseElement(parentNode, objs, fontType);
			} else if(wdedit_getIndex(present, fontType) != "0") {
				parentNode = wdedit_getParentNode(present, false);

				fontStyleOne(present, arrayObj[0].startObjPreObj, arrayObj[0].startObjNextObj, startObjBox, wdedit_getLastNode(present), objs, fontType);

				fuseElement(parentNode, objs, fontType);

				if($(parentNode).next().length > 0) {
					fontStyleOther($(parentNode).next(), fontType, objs);
				}
			}
		}
	};
})(jQuery);