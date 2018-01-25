// 判断是从先向后选还是从后先前选(true 前；false后)
function wdedit_checkStartEnd(startObjNode, endObjNode) {
	var parentStart = wdedit_getParentNode(startObjNode, false);
	var parentEnd = wdedit_getParentNode(endObjNode, false);
	if ($(parentStart).index() > $(parentEnd).index()) {
		return false;
	}
	if (startObjNode == startObjNode) {
		return true;
	} else if (startObjNode.nextSibling != null && startObjNode.nextSibling != endObjNode) {
		return wdedit_checkStartEnd(startObjNode.nextSibling, endObjNode);
	} else if (startObjNode.nextSibling != null && startObjNode.nextSibling == endObjNode) {
		return true;
	} else if (startObjNode.nextSibling == null && endObjNode.nextSibling == null) {
		return true;
	} else {
		return false;
	}
};

// 获取父节点,p或者p下一个
function wdedit_getParentNode(present, flg) {
	if (present == null) {
		return null;
	}
	if (flg) {
		if (present.parentNode.className == "wd-editp") {
			return present;
		} else {
			return wdedit_getParentNode(present.parentNode, flg);
		}
	}
	if (present.className == "wd-editp") {
		return present;
	} else {
		return wdedit_getParentNode(present.parentNode, flg);
	}
};

// 获取操作节点name（strong、i、u、text）
function wdedit_getNodeName(obj) {
	return obj.nodeName.toLowerCase().replace('#', '');
};

// 获取p的最后一个对象
function wdedit_getLastNode(present) {
	return present.childNodes[present.childNodes.length - 1];
};

// 获取对象的值
function wdedit_getElementText(obj) {
	return (obj.innerText) ? obj.innerText : obj.nodeValue;
};

// 获取当前处理的p的位置
function wdedit_getIndex(present, fontType) {
	var retFlg = "";
	var startObj = wdedit_getParentNode(arrayObj[0].startObjBox, false);
	var endObj = wdedit_getParentNode(arrayObj[0].endObjBox, false);
	present = wdedit_getParentNode(present, false)

	if (present == startObj && present == endObj) {
		retFlg = "0"; // 第一个并且是最后一个
	} else {
		retFlg = "1";
	}

	return retFlg;
};

// 添加处理的结果到p上
function wdedit_addAndRemObjOrHtml(remObj, addStr, flg) {
	if (flg) {
		if (!remObj) {
			if ($(remObj).html() == "<br>") {
				$(remObj).html(addStr);
			} else {
				$(remObj).append(addStr);
			}
		} else {
			$(remObj).after(addStr);
			$(remObj).remove();
		}
	} else {
		return addStr;
	}
};