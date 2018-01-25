var arrayObj = new Array();
var arrayObjClickPoint = new Array();
// 获取光标位置信息
function setArrayObjClickPoint(objs) {
	var selectObj = window.getSelection();
	if (selectObj.anchorNode) {
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
		if (objs) {
			jQuery("#" + objs.id).wdEditSetClickObj({
				arrayObjClickPoint: arrayObjClickPoint
			});
		}
	}
};

// 获取当前对象信息
function getWindowSelectObjs(objs) {
	if (window.getSelection) {
		var selectObj = window.getSelection();
		var selectedText = selectObj.toString();
		var startObj = '';
		var startObjNode = '';
		var startObjPreObj = '';
		var startObjNextObj = '';
		var endObj = '';
		var endObjPreObj = '';
		var endObjNextObj = '';
		var endObjNode = '';
		if (selectedText != "") {
			arrayObj.pop(arrayObj.length);
			startObj = selectObj.anchorNode.parentNode;
			startObjNode = selectObj.anchorNode;
			startObjPreObj = (selectObj.anchorNode.previousElementSibling) ? selectObj.anchorNode.previousElementSibling : selectObj.anchorNode.previousSibling;
			startObjNextObj = (selectObj.anchorNode.nextElementSibling) ? selectObj.anchorNode.nextElementSibling : selectObj.anchorNode.nextSibling;
			endObj = selectObj.focusNode.parentNode;
			endObjPreObj = (selectObj.focusNode.previousElementSibling) ? selectObj.focusNode.previousElementSibling : selectObj.focusNode.previousSibling;
			endObjNextObj = (selectObj.focusNode.nextElementSibling) ? selectObj.focusNode.nextElementSibling : selectObj.focusNode.nextSibling;
			endObjNode = selectObj.focusNode;

			// 处理反向选择用
			if (startObjNode == endObjNode && selectObj.anchorOffset > selectObj.focusOffset) { // 反向选中并且中间无对象
				arrayObj.push({ // 记录选择对象待处理信息
					"startObjBox": endObj, // 选中文本起始对象（P）
					"startObjNode": endObjNode, // 当前选中文本对象(strong)
					"startObjPreObj": endObjPreObj, // 选中对象前一个对象（strong）
					"startObjNextObj": endObjNextObj, // 选中对象后一个对象（strong）
					"endObjBox": startObj, // 选中文本终止对象（P）
					"start": selectObj.focusOffset, // 选中文本在起始对象中的位置
					"end": selectObj.anchorOffset, // 选中文本在终止对象中的位置
					"endObjNode": startObjNode
				});
			} else {
				if (wdedit_checkStartEnd(startObjNode, endObjNode)) {
					arrayObj.push({ // 记录选择对象待处理信息
						"startObjBox": startObj, // 选中文本起始对象（P）
						"startObjNode": startObjNode, // 当前选中文本对象(strong)
						"startObjPreObj": startObjPreObj, // 选中对象前一个对象（strong）
						"startObjNextObj": startObjNextObj, // 选中对象后一个对象（strong）
						"endObjBox": endObj, // 选中文本终止对象（P）
						"start": selectObj.anchorOffset, // 选中文本在起始对象中的位置
						"end": selectObj.focusOffset, // 选中文本在终止对象中的位置
						"endObjNode": endObjNode
					});
				} else { // 反向选中中间有对象
					arrayObj.push({ // 记录选择对象待处理信息
						"startObjBox": endObj, // 选中文本起始对象（P）
						"startObjNode": endObjNode, // 当前选中文本对象(strong)
						"startObjPreObj": endObjPreObj, // 选中对象前一个对象（strong）
						"startObjNextObj": endObjNextObj, // 选中对象后一个对象（strong）
						"endObjBox": startObj, // 选中文本终止对象（P）
						"start": selectObj.focusOffset, // 选中文本在起始对象中的位置
						"end": selectObj.anchorOffset, // 选中文本在终止对象中的位置
						"endObjNode": startObjNode
					});
				}
			}

			jQuery("#" + objs.id).wdEditSetSelectObj({
				arrayObj: arrayObj
			});

			// 清除工具条激活样式
			toolClearActive(objs);
			// 添加工具条激活样式
			toolAddActive(objs, startObj);

		} else {
			// 清除工具条激活样式
			toolClearActive(objs);
			// 添加工具条激活样式
			toolAddActive(objs, selectObj.anchorNode.parentNode);
			
			setArrayObjClickPoint(objs);
		}
	}
};