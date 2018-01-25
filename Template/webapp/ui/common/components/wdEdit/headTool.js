// 工具条初始化
function initTool(_this, objs) {
	var toolDiv = document.createElement('div');
	toolDiv.className = "wd-edittoolbox";
	for(var i = 0; i < objs.toolbar.length; i++) {
		toolDiv.appendChild(addtool(objs, objs.toolbar[i]));
	}
	_this[0].appendChild(toolDiv);
};

// 加载工具条
function addtool(objs, toolname) {
	var obj = document.createElement('div')
	switch(toolname) {
		case "bold":
			obj.className = "wd-toolbox wd-bold";
			obj.id = objs.id + "_B";
			obj.innerHTML = "B";
			obj.title = "加粗";
			$(obj).bind("click", function() {
				addActiveClass(objs, this);
				jQuery("#" + objs.id).wdEditAddFontStyle({
					fontType: "b",
					objs: objs
				});
			})

			break;
		case "italic":
			obj.className = "wd-toolbox wd-italic";
			obj.innerHTML = "I";
			obj.id = objs.id + "_I";
			obj.title = "斜体";
			$(obj).bind("click", function() {
				addActiveClass(objs, this);
				jQuery("#" + objs.id).wdEditAddFontStyle({
					fontType: "i",
					objs: objs
				});
			});
			break;
		case "underline":
			obj.className = "wd-toolbox wd-underline";
			obj.title = "下划线";
			obj.innerHTML = "U";
			obj.id = objs.id + "_U";
			$(obj).bind("click", function() {
				addActiveClass(objs, this);
				jQuery("#" + objs.id).wdEditAddFontStyle({
					fontType: "u",
					objs: objs
				});
			});
			break;
		case "simpleupload":
			obj.className = "wd-toolbox wd-insertimage";
			obj.title = "上传图片";
			obj.id = objs.id + "_insertimage";

			var input = document.createElement("input");
			input.id = objs.id + "simpleupload_file";
			input.type = "file";
			input.className = "wd-file";
			$(input).bind("change", function() {
				if(this.files) {
					var file = this.files[0];
					upload(objs, file);
					addImageEle(objs);

					var simpleupload_file = document.getElementById(objs.id + "simpleupload_file");
					simpleupload_file.value = "";
					objs.uploadOptions.addFiles = {};
					var obj_p = $("#" + objs.id).find(".wd-editp");
					wdedit_moveEnd(obj_p[obj_p.length - 1]);

					if($("#wd_editImgWrap").length == 0) {
						insertImgOpt(objs);
						addImgOptBox(objs);
					}
				}
			});
			obj.appendChild(input);
			break;
		case "insertimage":
			obj.className = "wd-toolbox wd-insertimages";
			obj.title = "多图上传";
			obj.id = objs.id + "_insertimage";
			$(obj).bind("click", function() {
				if($("#wd_editChosenWrap").length == 0) {
					insertImg(objs);
				}
				$("#wd_editBg").css({
					display: "block",
					height: $(document).height()
				});
				$("#wd_editChosenWrap").show();
			});
			break;
		case "formula":
			obj.className = "wd-toolbox wd-formula";
			obj.title = "公式编辑";
			obj.innerHTML = "∑";
			obj.id = objs.id + "_formula";
			$(obj).bind("click", function() {
				jQuery("#" + obj.id).wdFormula({
					targetBox: $("#wd-editeditbox_yl-editBox")[0].lastChild
				});
			});
			break;
	}

	return obj;
};

// 增加选中样式
function addActiveClass(objs, obj) {
	if($(obj).hasClass("wd-edittoolbox-active")) {
		$(obj).removeClass("wd-edittoolbox-active");
	} else {
		$(obj).addClass("wd-edittoolbox-active");
	}
	if(arrayObj.length == 0) {
		var obj_p = $("#" + objs.id).find(".wd-editp");
		wdedit_moveEnd(obj_p[obj_p.length - 1]);
		getWindowSelectObjs(objs);
	}
}

// 清除工具条激活样式
function toolClearActive(objs) {
	$("#" + objs.id + "_B").removeClass("wd-edittoolbox-active");
	$("#" + objs.id + "_I").removeClass("wd-edittoolbox-active");
	$("#" + objs.id + "_U").removeClass("wd-edittoolbox-active");
};

// 添加工具条激活样式,只根据起始对象做显示
function toolAddActive(objs, clickObj) {
	if(wdedit_getNodeName(clickObj) == "b") {
		$("#" + objs.id + "_B").addClass("wd-edittoolbox-active");
	}
	if(wdedit_getNodeName(clickObj) == "i") {
		$("#" + objs.id + "_I").addClass("wd-edittoolbox-active");
	}
	if(wdedit_getNodeName(clickObj) == "u") {
		$("#" + objs.id + "_U").addClass("wd-edittoolbox-active");
	}
	if(!clickObj.parentNode.className) {
		toolAddActive(objs, clickObj.parentNode)
	}
};