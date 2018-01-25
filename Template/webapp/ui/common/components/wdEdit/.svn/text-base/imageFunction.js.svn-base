// 上传
function upload(objs, file, key) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", objs.uploadOptions.script, false);
	var formData = new FormData();
	formData.append("files", file);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// 从服务器的response获得数据
			var obj = $.parseJSON(xhr.response);
			var _files = obj.msgObj;
			for (var i = 0; i < _files.length; i++) {
				if (obj.successFlg == true) {
					objs.uploadOptions.addFiles[_files[i].fileId] = _files[i];
					if (objs.uploadOptions.map_Files) {
						$("#" + key).find(".wd-editFileSingleOpt").remove();
						$("#" + key).find(".wd_editFileSuccess").show();
						objs.uploadOptions.map_Files[key] = "";
					}
				}
			}
		}
	}
	xhr.send(formData);
};

// 添加image对象到编辑区
function addImageEle(objs) {
	var startObjbox = arrayObjClickPoint.startObjBox;
	var start = arrayObjClickPoint.start;
	var end = arrayObjClickPoint.end;
	var addFiles = objs.uploadOptions.addFiles;
	var img_str = document.createElement("div");
	for (var key in addFiles) {
		var img = document.createElement("img");
		img.id = newGuid();
		img.src = objs.uploadOptions.showUrl + addFiles[key].fileId;
		img.title = addFiles[key].fileName;
		img.alt = addFiles[key].fileName;
		img_str.appendChild(img);
		$(img).bind("click", function() {
			showImgOpt(this);
		});
	}
	var startObjNode = arrayObjClickPoint[0].startObjNode;
	if (!startObjbox) {
		wdedit_addAndRemObjOrHtml(startObjbox, img_str.children, true);
	} else {
		if (!arrayObjClickPoint.selectText) {
			var str = startObjNode.substring(0, start) + img_str + startObjNode.substring(end);
			wdedit_addAndRemObjOrHtml(startObjbox, str, true);
		} else {
			var endObjNode = arrayObjClickPoint.endObjNode;
			if (startObjNode != endObjNode) {

			} else {

			}
			wdedit_addAndRemObjOrHtml(startObjbox, img_str, true);
		}
	}
};

// 图片操作
function insertImgOpt(objs) {
	var edit_cont = document.createElement("div");
	edit_cont.id = "edit_cont";
	edit_cont.className = "edit-popup-cont";
	var _span = document.createElement("span");
	_span.innerHTML = "属性：";
	edit_cont.appendChild(_span);

	var edit = document.createElement("span");
	edit.className = "eidtImg-edit";
	edit.innerHTML = "修改";
	$(edit).bind("click", function() {
		$("#wd_editBg").css({
			display: "block",
			height: $(document).height()
		});
		$("#wd_editImgWrap").show();
		$("#wd_editImgWrap").attr("rel", $("#edit_cont").attr("rel"));
	});
	edit_cont.appendChild(edit);
	$("#wd-editeditbox_" + objs.id)[0].appendChild(edit_cont);

	$(document).click(function(e) {
		var target = $(e.target);
		if (target[0].id != $("#edit_cont").attr("rel")) {
			$("#edit_cont").hide();
		}
	});
};

// 设置图片
function addImgOptBox(objs) {
	// 遮罩层背景
	if ($("#wd_editBg").length == 0) {
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
	editImgTit.innerHTML = "图片设置";
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
	_thSize.innerHTML = "大小：";
	_trSize.appendChild(_thSize);
	var _tdSize = document.createElement("td");
	var span1 = document.createElement("span");
	span1.innerHTML = "宽度";
	_tdSize.appendChild(span1);
	var inputWidth = document.createElement("input");
	inputWidth.id = "wd_editImgWidth";
	inputWidth.className = "wd-editInput wd-eidtWidth40";
	_tdSize.appendChild(inputWidth);
	var span2 = document.createElement("span");
	span2.innerHTML = "px 高度";
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
	_thBorder.innerHTML = "边框：";
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
	_thPadding.innerHTML = "边距：";
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
	_thDesc.innerHTML = "描述：";
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
	editImg_qd.value = "确定";
	$(editImg_qd).bind("click", function() {
		var id = $("#wd_editImgWrap").attr("rel");
		$("#" + id).css({
			width: $("#wd_editImgWidth").val(),
			height: $("#wd_editImgHeight").val()
		})
		$("#" + id).attr("border", $("#wd_editImgBorder").val());
		$("#" + id).attr("vspace", $("#wd_editImgPadding").val());
		$("#" + id).attr("hspace", $("#wd_editImgPadding").val());
		$("#" + id).attr("alt", $("#wd_editImgDesc").val());
		closeImgOpt(objs);
	});
	editImgBottom.appendChild(editImg_qd);
	var editImg_qx = document.createElement("input");
	editImg_qx.type = "button";
	editImg_qx.className = "wd-editChosenBtn";
	editImg_qx.value = "取消";
	$(editImg_qx).bind("click", function() {
		closeImgOpt(objs);
	});
	editImgBottom.appendChild(editImg_qx);
	editImgCont.appendChild(editImgBottom);
	editImgWrap.appendChild(editImgCont);

	document.body.appendChild(editImgWrap);
};

// 图片操作区位置
function showImgOpt(obj) {
	var _left = $(obj)[0].offsetLeft;
	var _top = $(obj)[0].offsetTop;
	var width = $(obj).width();
	var height = $(obj).height();

	$("#edit_cont").show();
	$("#edit_cont").attr("rel", obj.id);
	$("#edit_cont").css({
		top: parseInt(_top + height) + "px",
		left: parseInt(_left) + "px"
	});

	$("#wd_editImgWidth").val(obj.width);
	$("#wd_editImgHeight").val(obj.height);
	if (obj.border) {
		$("#wd_editImgBorder").val(obj.border);
	} else {
		$("#wd_editImgBorder").val(0);
	}
	if (obj.vspace) {
		$("#wd_editImgPadding").val(obj.vspace);
	} else {
		$("#wd_editImgPadding").val(0);
	}
	$("#wd_editImgDesc").val(obj.alt);
};

// 设置图片-关闭
function closeImgOpt(objs) {
	$("#wd_editBg").hide();
	$("#wd_editImgWrap").hide();
};

// 获取未上传文件个数
function getImageSum(objs) {
	var sum = 0;
	for (var key in objs.uploadOptions.map_Files) {
		if (objs.uploadOptions.map_Files[key]) {
			sum += 1;
		}
	}
	return sum;
};

// 多图上传
function insertImg(objs) {
	// 遮罩层背景
	if ($("#wd_editBg").length == 0) {
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
	editChosenTit.innerHTML = "多图上传";
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
	span_0.innerHTML = "点击选择图片";
	editChosenPic.appendChild(span_0);
	var fileAdd_select = document.createElement("input");
	fileAdd_select.id = "fileAdd_select";
	fileAdd_select.type = "file";
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
	span_4.innerHTML = "继续添加";
	editAdd.appendChild(span_4);
	var fileAdd = document.createElement("input");
	fileAdd.id = "fileAdd_continue";
	fileAdd.type = "file";
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
	editUpload.value = "开始上传";
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
	editChosen_qd.value = "确定";
	$(editChosen_qd).bind("click", function() {
		insertImages(objs);
	});
	editChosenBottom.appendChild(editChosen_qd);
	var editChosen_qx = document.createElement("input");
	editChosen_qx.type = "button";
	editChosen_qx.className = "wd-editChosenBtn";
	editChosen_qx.value = "取消";
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
	span_1.innerHTML = "选中";
	desc_sc.appendChild(span_1);
	var editFileSum = document.createElement("span");
	editFileSum.id = "wd_editFileSum";
	editFileSum.innerHTML = "0";
	desc_sc.appendChild(editFileSum);
	var span_2 = document.createElement("span");
	span_2.innerHTML = "张图片，共";
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
	span_5.innerHTML = "还有";
	desc_wsc.appendChild(span_5);
	var editFileSum_Wsc = document.createElement("span");
	editFileSum_Wsc.id = "wd_editFileSum_wsc";
	editFileSum_Wsc.innerHTML = "0";
	desc_wsc.appendChild(editFileSum_Wsc);
	var span_6 = document.createElement("span");
	span_6.innerHTML = "个未上传文件";
	desc_wsc.appendChild(span_6);
	editFileDesc.appendChild(desc_wsc);
}

// 选择图片
function fileSelect(objs, sender) {
	$("#wd_editChosen").hide();
	$("#wd_editFileWrap").show();
	$("#edit_descWsc").hide();
	$("#edit_descSc").show();
	if (sender.files) {
		var _src = "";
		var size = 0;
		var files = sender.files;
		for (i = 0; i < files.length; i++) {
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
				for (var key in objs.uploadOptions.map_Files) {
					if (delId == key) {
						delete objs.uploadOptions.map_Files[key];
						break;
					}
				}

				var totalSum = $("#wd_editFileSum").html();
				$("#wd_editFileSum").html(parseInt(totalSum) - 1);
				var fileSize = $(this).parent().parent("li").find(".fileSize").val();
				objs.uploadOptions.totalSize = parseFloat(objs.uploadOptions.totalSize) - parseFloat(fileSize);
				var _totalSize = 0;
				if (objs.uploadOptions.totalSize >= 1024) {
					_totalSize = Math.ceil(objs.uploadOptions.totalSize / 1024).toFixed(2);
					if (_totalSize >= 1024) {
						_totalSize = Math.ceil(objs.uploadOptions.totalSize / 1024).toFixed(2);
						_totalSize += "M";
					} else {
						_totalSize += "K";
					}
				}
				$("#wd_editFileSize").html(_totalSize);
				if ((parseInt(totalSum) - 1) == 0) {
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
			if (objs.uploadOptions.totalSize >= 1024) {
				_totalSize = (objs.uploadOptions.totalSize / 1024).toFixed(2);
				if (_totalSize >= 1024) {
					_totalSize = (objs.uploadOptions.totalSize / 1024).toFixed(2);
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
	for (var key in objs.uploadOptions.map_Files) {
		if (objs.uploadOptions.map_Files[key]) {
			upload(objs, objs.uploadOptions.map_Files[key], key);
		}
	}
};

// 多图上传-关闭
function closeInsertImg(objs) {
	$("#wd_editBg").hide();
	$("#wd_editChosenWrap").hide();
	objs.uploadOptions.totalSize = 0;
	objs.uploadOptions.addFiles = {};
	objs.uploadOptions.map_Files = {};
	$("#wd_editFileSum").html(0);
	$("#wd_editFileSize").html("0KB");
	$("#wd_editFileWrap").hide();
	$("#wd_editFiles").html("");
	$("#wd_editChosen").show();
	var obj_p = $("#" + objs.id).find(".wd-editp");
	wdedit_moveEnd(obj_p[obj_p.length - 1]);
}

// 多图上传-确定
function insertImages(objs, align) {
	var sum = getImageSum(objs);
	if (parseInt(sum) > 0) {
		$("#wd_editFileSum_wsc").html(sum);
		$("#edit_descSc").hide();
		$("#edit_descWsc").show();
	} else {
		addImageEle(objs);
		if ($("#wd_editImgWrap").length == 0) {
			insertImgOpt(objs);
			addImgOptBox(objs);
		}
		closeInsertImg(objs);
	}
}