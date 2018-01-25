(function($) {
	var arrayObj = new Array();
	var mlid = "mlid_";
	var sjmlid = "sjmlid_";
	var mltext = "mltext_";
	var mlinput = "mlinput_";
	var mljdcj = "mljdcj_";
	var mlbj = "mlbj_";
	var mltj = "mltj_";
	var mlsc = "mlsc_";
	var mlss = "mlss_";
	var mlsy = "mlsy_";
	var mlxy = "mlxy_";
	var mlxz = "mlxz_";
	var mlqyjy = "mlqyjy_";
	var mlss = "mlss_";
	var mlcj = 1;
	var replaceCode = "#";
	var deleteTitle;
	var notUpMoveTitle;
	var notDownMoveTitle;
	var waiting;
	var newleaf;
	var nameEmptyAlert;
	var checkNameLength;
	var checkMaxLevel;
	var cookiename = "language";
	var language;
	var editTip;
	var addTip;
	var deleteTip;
	var upTip;
	var downTip;
	var enableTip;
	var disableTip;
	var searchTip;
	var arr, reg = new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)");
	if (document.cookie.match(reg) == null) {
		language = "zh";
	} else {
		arr = document.cookie.match(reg);
		language = unescape(arr[2]);
	}

	switch (language) {
		case "zh": // 中文
			deleteTitle = "确认要删除么？";
			notUpMoveTitle = "已经是顶级节点，不能再上移";
			notDownMoveTitle = "已经是末级节点，不能再下移";
			waiting = "处理中请等待。。。";
			newleaf = "新节点";
			nameEmptyAlert = "名称不能为空！";
			checkNameLength = "输入内容不能超过{1}个汉字，{0}个字母或数字";
			checkMaxLevel = "最大层级不能超过{0}层";
			editTip = "修改";
			addTip = "新增";
			deleteTip = "删除";
			upTip = "上移";
			downTip = "下移";
			enableTip = "启用";
			disableTip = "禁用";
			havebanned = "[已禁用]";
			searchTip = "搜索";
			break;
		case "en": // 英文
			deleteTitle = "Are you sure you want to delete?";
			notUpMoveTitle = "It's the top node and cannot move up.";
			notDownMoveTitle = "It's the end node and cannot move down.";
			waiting = "Processing, please wait.";
			newleaf = "New node";
			nameEmptyAlert = "The name should NOT be empty!";
			checkNameLength = "Content should NOT exceed {1} Chinese characters, {0} letters or numbers.";
			checkMaxLevel = "The maximum level should NOT exceed {0}.";
			editTip = "Modify";
			addTip = "Add";
			deleteTip = "Delete";
			upTip = "Move up";
			downTip = "Move down";
			enableTip = "Enable";
			disableTip = "Disable";
			havebanned = "[banned]";
			searchTip = "Search";
			break;
		default:
			deleteTitle = "确认要删除么？";
			notUpMoveTitle = "已经是顶级节点，不能再上移";
			notDownMoveTitle = "已经是末级节点，不能再下移";
			waiting = "处理中请等待。。。";
			newleaf = "新节点";
			nameEmptyAlert = "名称不能为空！";
			checkNameLength = "输入内容不能超过{1}个汉字，{0}个字母或数字";
			checkMaxLevel = "最大层级不能超过{0}层";
			editTip = "修改";
			addTip = "新增";
			deleteTip = "删除";
			upTip = "上移";
			downTip = "下移";
			enableTip = "启用";
			disableTip = "禁用";
			havebanned = "[已禁用]";
			searchTip = "搜索";
			break;
	}
	// 格式化id
	function numformat(num, formatnum) {
		var strings;
		if (num.toString().length < formatnum.length) {
			var temp = formatnum.substring(0, formatnum.length - num.toString().length);
			strings = "" + temp + "" + num;
		} else {
			strings = num;
		}

		return "" + strings;
	};

	// 目录更新
	function mlupdate(obj) {
		$(".wd_zjml_title").removeClass("titleactive");
		$(".wd_zjml_title").attr("contenteditable", "false");

		$('#' + mltext + obj.id.replace(mlbj, '')).addClass("titleactive");
		$('#' + mltext + obj.id.replace(mlbj, '')).attr("contenteditable", "true");


		var len = $('#' + mltext + obj.id.replace(mlbj, ''))[0].innerHTML.length;
		var updateobj = document.getElementById(mltext + obj.id.replace(mlbj, ''));

		$('#' + mltext + obj.id.replace(mlbj, '')).focus();
	};
	// 目录新增
	function mladd(obj, mlcj, data, objs, _this) {
		var uuid = new Date;
		uuid = uuid.getTime();
		if (data != undefined) {
			uuid = data.id;
		}
		var appobj = document.getElementById(mlid + obj.id.replace(mltj, ''));
		var bjmlid = mlid + obj.id.replace(mltj, '');
		if (objs.customnewleaf) newleaf = objs.customnewleaf;
		var jsondata = {
			id: uuid,
			text: data.text,
			addshow: data.addshow,
			deleteshow: data.deleteshow,
			moveupshow: data.moveupshow,
			movedownshow: data.movedownshow,
			updateshow: data.updateshow,
			updateFlag: data.updateFlag,
			enableshow: data.enableshow,
			searchshow: data.searchshow,
			count: data.count
		};

		addZjml(appobj, jsondata, bjmlid, mlcj, objs, _this);
	};
	// 目录删除
	function mldelete(obj) {
		var sjobjid = $("#" + obj.id.replace(mlsc, sjmlid)).val();
		var sjspanid = $("#" + obj.id.replace(mlsc, sjmlid)).val().replace(mlid, mlss)
		$("#" + mlid + obj.id.replace(mlsc, '')).remove();
		var iCount = $("#" + sjobjid).find('li').length;
		// 处理节点样式，改变为叶子
		if (iCount == 0) {
			$("#" + sjspanid).removeClass("ssactive");
			$("#" + sjspanid).removeClass("ss");
			$("#" + sjspanid).addClass("leaf");
		}
	};
	// 目录收缩
	function mlshrink(obj,objs,mlcj) {
		if (obj.className == 'ssactive') {
			$(obj).removeClass('ssactive');
			$(obj).addClass('ss');
			if(objs && objs.showallFlg){
				$("#" + mlid + obj.id.replace(mlss, '')).find('li').hide();
			}else{
				$("#" + mlid + obj.id.replace(mlss, '')).children('.zjmldiv').hide();
			}
		} else {
			$(obj).removeClass('ss');
			$(obj).addClass('ssactive');
			if(objs && objs.showallFlg){
				$("#" + mlid + obj.id.replace(mlss, '')).find('li').show();
				var liCount = $("#" + mlid + obj.id.replace(mlss, '')).find('li').length;
				for (var i = 0; i < liCount; i++) {
					if ($("#" + mlid + obj.id.replace(mlss, '')).find('li')[i].firstChild.className == 'ss') {
						$($("#" + mlid + obj.id.replace(mlss, '')).find('li')[i].firstChild).removeClass('ss');
						$($("#" + mlid + obj.id.replace(mlss, '')).find('li')[i].firstChild).addClass('ssactive');
					}
				}
			}else{
				if($("#" + mlid + obj.id.replace(mlss, '')).find('li').length ==0){
					var postData = {
						"pid": $(obj).parent()[0].id.replace("mlid_","")
					}
					crossDomainAjax(objs, objs.childurl, postData, function(data) {
						if(data.rows && data.rows.length>0){
							data = data.rows;
						}
						if(data){
							var sz = parseInt(obj.name) + 1;
							for (var i = 0; i < data.length; i++) {
								addZjml($(obj).parent()[0], data[i], $(obj).parent()[0].id, mlcj , objs, $(obj).parents(".zjmldiv"));
							}
						}
						if (objs.childFun) {
							objs.childFun.call('', data);
						}
					});
				}else{
					$("#" + mlid + obj.id.replace(mlss, '')).children('.zjmldiv').show();
				}
			}
		}
	};
	// 获取上移下移目标位置
	function getindex(obj, flg, mltype, lilength, objs) {
		var index = $(".wd_zjml li").index($("#" + mlid + obj.id.replace(mltype, ''))) + (parseInt(objs.indexflg) * flg); // 待操作控件index
		if (index < lilength) {
			var twosjid = $("#" + sjmlid + obj.id.replace(mltype, '')).val(); // 当前上级id
			var onesjid = $("#" + sjmlid + $(".wd_zjml li").eq(index)[0].id.replace(mlid, '')).val(); //待操作上级id
			if (twosjid != onesjid) {
				objs.indexflg = parseInt(objs.indexflg) + 1;
				getindex(obj, flg, mltype, lilength, objs);
			} else {
				objs.indexflg = index;
			}
		} else {
			objs.indexflg = index;
		}
	};
	// 上移
	function mlup(oneobj, twoobj, objs) {
		$(oneobj).insertAfter($(twoobj));
		objs.indexflg = 1;
	};
	// 下移
	function mldwon(oneobj, twoobj, objs) {
		$(twoobj).insertAfter($(oneobj));
		objs.indexflg = 1;
	};
	var clickdbclickflg;
	// 添加目录结构，处理N级目录
	function addZjml(appobj, jsondata, sjmlids, mlcj, objs, _this) {
		var _objthis = _this;
		var div = document.createElement('div'); // 容器
		div.className = "zjmldiv";
		var li = document.createElement('li');
		li.id = mlid + jsondata.id;
		li.className = mlid + jsondata.id;
		li.style.paddingLeft = parseInt((mlcj - 1) * 10) + "px";
		// 处理收缩
		if (jsondata.children != undefined && jsondata.children.length >0) {
			var spanss = document.createElement('div');
			spanss.id = mlss + jsondata.id;
			if(jsondata.mljb){
				spanss.name = jsondata.mljb;
			}
			spanss.className = "ssactive";
			$(spanss).bind('click', function() {
				mlshrink(this,objs,parseInt(mlcj));
			});
			li.appendChild(spanss);
		} else {
			if(jsondata.haveChildFlg){
				var spanss = document.createElement('div');
				spanss.id = mlss + jsondata.id;
				if(jsondata.mljb){
					spanss.name = jsondata.mljb;
				}
				if(jsondata.children != undefined && jsondata.children.length >0){
					spanss.className = "ssactive";
				}else{
					spanss.className = "ss";
				}
				$(spanss).bind('click', function() {
					mlshrink(this,objs,parseInt(mlcj));
				});
				li.appendChild(spanss);
			}else{
				var spanss = document.createElement('div');
				spanss.id = mlss + jsondata.id;
				spanss.className = "leaf";
				li.appendChild(spanss);
			}
		}
		// 添加checkbox
		if (objs.checkflg) {
			var treeCheck = document.createElement("input");

			if (objs.singleSelectionFlg) {
				treeCheck.type = "radio";
				treeCheck.name = "wdtreecheck" + objs.objid;
			} else {
				treeCheck.type = "checkbox";

				$(treeCheck).bind('click', function() {
					var checkedflg = this.checked;
					$(this.parentNode.parentNode).find('.wdtreecheckbox').each(function() {
						this.checked = checkedflg;
					});
					checkparent(this);
				});
			}
			if($(appobj).find('.wdtreecheckbox').prop("checked")){
				treeCheck.checked = "checked";
			}
			var selecttext = objs.selecttext.split(',');
			var tmpvalue = "";
			for (var i = 0; i < selecttext.length; i++) {
				tmpvalue += selecttext[i] + ":'" + jsondata[selecttext[i]] + "',";
			}
			tmpvalue = tmpvalue.substring(0, tmpvalue.length - 1);
			treeCheck.text = tmpvalue;
			treeCheck.id = mlxz + jsondata.id;
			treeCheck.value = jsondata.id;
			treeCheck.className = "wdtreecheckbox wdtreecheck" + objs.objid;
			li.appendChild(treeCheck);
		}
		//处理是否禁用
		var disablespan = document.createElement('span');
		disablespan.style.display = "none";
		disablespan.className = "wdtreebanned";
		disablespan.innerHTML = havebanned;
		disablespan.style.float = "left";
		// 处理标题
		var wdtreeinput = document.createElement('input');
		wdtreeinput.style.display = "none";
		wdtreeinput.className = "titleactive";
		wdtreeinput.value = jsondata.text;
		wdtreeinput.name = jsondata.text;
		wdtreeinput.style.height = "24px";
		wdtreeinput.style.lineHeight = "24px";
		wdtreeinput.style.float = "left";
		wdtreeinput.id = mlinput + jsondata.id;
		var span = document.createElement('label');
		span.name = jsondata.text;
		span.innerHTML = jsondata.text;
		span.title = jsondata.text;
		$(span).attr("for", mlxz + jsondata.id);
		span.style.float = "left";
		span.style.maxWidth = objs.nameMaxViweLength + "px";
		span.className = "wd_zjml_title";
		span.id = mltext + jsondata.id;

		$(span).bind('click', function() {
			var _this = this;
			$(".wd_zjml_title").each(function() {
				$(this).removeClass("wd_zjml_title_action");
			})
			var selecttext1 = objs.selecttext.split(',');
			var tmpvalue1 = "";
			for (var i = 0; i < selecttext1.length; i++) {
				tmpvalue1 += jsondata[selecttext1[i]] + "#";
			}
			var id = tmpvalue1.substring(0,tmpvalue1.length-1);
			$(this).addClass("wd_zjml_title_action");
			clickdbclickflg = false;
			window.setTimeout(cc, 800)

			function cc() {
				if (clickdbclickflg != false) return;

				if (objs.clickFun) {
					if (!$(_this).hasClass("titleactive"))
						objs.clickFun.call('', id);
				}
			}
		});

		if (jsondata.updateFlag || jsondata.updateFlag == undefined) {
			// 屏蔽回车键
			$(span).bind('keypress', function(event) {
				if (event.keyCode == "13") window.event.returnValue = false;
			});
			$(span).bind('dblclick', function() {
				clickdbclickflg = true;
				$("#" + objs.objid).find("input").hide();
				$("#" + objs.objid).find("label").show();

				$(span).removeAttr("for");
				wdtreeinput.style.display = "block";
				$(this.parentNode).children('label').hide();
				$(wdtreeinput).focus();
			})
			$(wdtreeinput).bind('blur', function() {
				if (!objs.token) return false;
				$(span).attr("for", mlxz + jsondata.id);
				objs.token = false;
				var _this = this;
				// 处理输入空
				if (this.value.trim().replace('<br>', '') == "") { // replace('<br>','') 处理火狐
					var msg = "";
					if (objs.nameRequiredTip != undefined) {
						msg = objs.nameRequiredTip;
					} else {
						msg = nameEmptyAlert;
					}
					if (!objs.bootFlg) {
						alert(msg, '', function() {
							$(_this).focus()
						});
					} else {
						$.bootboxAlert('', msg, null, "error");
					}
					objs.token = true;
					return false;
				}

				if (this.value != this.name) {
					// 处理输入大小
					var lenValue = this.value.trim();
					var len = 0;
					for (i = 0; i < lenValue.length; i++) {
						if (lenValue.charCodeAt(i) > 256) {
							len += 2;
						} else {
							len++;
						}
					}

					if (len > parseInt(objs.nameMaxLength)) {
						var param = [parseInt(objs.nameMaxLength), (parseInt(objs.nameMaxLength) / 2).toString().split('.')[0]]

						for (var k = 0; k < param.length; k++) {
							checkNameLength = checkNameLength.replace(new RegExp("\\{" + k + "\\}", "g"), param[k]);
						}

						if (!objs.bootFlg) {
							alert(checkNameLength, '', function() {
								$(_this).focus()
							});
						} else {
							$.bootboxAlert('', checkNameLength, null, "error");
						}
						objs.token = true;
						return false;
					}
					var updateText = this.value.trim();
					var updateid = this.id.replace(mlinput, '');
					var postData = {
						"id": this.id.replace(mlinput, ''),
						"name": this.value.trim()
					}
					objs.ctrl = "update";
					crossDomainAjax(objs, objs.url.replace(replaceCode, objs.nameUpdateFunctionName), postData, function(data) {
						objs.token = true;
						if(data && data.result == false){
							$("#" + _this.id.replace(mltext, mlinput))[0].value = $("#" + _this.id.replace(mlinput, mltext))[0].title;
						}else{
							$("#" + _this.id.replace(mlinput, mltext))[0].title = updateText;
							$("#" + _this.id.replace(mlinput, mltext))[0].name = updateText;
							$("#" + _this.id.replace(mlinput, mltext)).html(updateText);
						}
						$(_this.parentNode).find('label').show();
						$(_this).hide();
						if (objs.renameFun) {
							var returnData = {
								"id": updateid,
								"name": updateText,
								"data":data
							}
							objs.renameFun.call('', returnData);
						}
					});
				} else {
					objs.token = true;
					$(_this.parentNode).find('label').show();
					$(_this).hide();
				}
			})
		}
		li.appendChild(span);
		li.appendChild(wdtreeinput);
		li.appendChild(disablespan);

		// 处理数量
		if (jsondata.count || jsondata.count == 0) {
			var spancount = document.createElement('label');
			spancount.innerHTML = "(";
			spancount.className = "wd_zjml_title";
			li.appendChild(spancount);

			var spancount = document.createElement('label');
			spancount.innerHTML = jsondata.count;
			spancount.className = "wd_zjml_title";
			spancount.id = objs.objid + "_count_" + jsondata.id;
			li.appendChild(spancount);

			var spancount = document.createElement('label');
			spancount.innerHTML = ")";
			spancount.className = "wd_zjml_title";
			li.appendChild(spancount);
		}
		// 上级目录id
		var inputs = document.createElement('input');
		inputs.value = sjmlids;
		inputs.id = sjmlid + jsondata.id;
		inputs.style.float = "left";
		inputs.style.display = "none";
		li.appendChild(inputs);
		// 是否加载操作按钮
		if (objs.ctrlFlg) {
			// 编辑按钮
			if (jsondata.updateshow || jsondata.updateshow == undefined) {
				if (jsondata.updateFlag || jsondata.updateFlag == undefined) {
					var bjspan = document.createElement('span');
					bjspan.innerHTML = "";
					bjspan.title = editTip;
					bjspan.id = mlbj + jsondata.id;
					bjspan.className = "zjmlctrl zjml-update";
					$(bjspan).bind('click', function() {
						$("#" + objs.objid).find("input").hide();
						$("#" + objs.objid).find("label").show();
		
						$(span).removeAttr("for");
						wdtreeinput.style.display = "block";
						$(this.parentNode).children('label').hide();
						$(wdtreeinput).focus();
//						$(span).removeAttr("for");
//						mlupdate(this);
					});
					li.appendChild(bjspan);
				}
			}
			// 删除按钮
			if (jsondata.deleteshow || jsondata.deleteshow == undefined) {
				var scspan = document.createElement('span');
				scspan.innerHTML = "";
				scspan.title = deleteTip;
				scspan.id = mlsc + jsondata.id;
				scspan.className = "zjmlctrl zjml-delete";
				$(scspan).bind('click', function() {
					if (!objs.token) return false;
					objs.token = false;
					var _this = this;
					var functionName = "";
					if (objs.deleteCheckFunctionName != undefined) {
						functionName = objs.deleteCheckFunctionName;
					} else {
						functionName = objs.deleteFunctionName;
					}
					// 非boot3框架使用
					if (!objs.bootFlg) {
						confirm(deleteTitle, '', function() {
							var postData = {
								"id": _this.id.replace(mlsc, '')
							}
							objs.ctrl = "delete";
							crossDomainAjax(objs, objs.url.replace(replaceCode, functionName), postData, function(data) {
								objs.token = true;
								mldelete(_this);

								if (objs.deleteFun)
									objs.deleteFun.call('', postData);
							});
						}, function() {
							objs.token = true;
						})
					}
					// boot3框架使用
					else {
						$.bootboxConfrim(deleteTitle, function() {
							var postData = {
								"id": _this.id.replace(mlsc, '')
							}
							objs.ctrl = "delete";
							crossDomainAjax(objs, objs.url.replace(replaceCode, functionName), postData, function(data) {
								objs.token = true;
								mldelete(_this);
								document.body.style.overflowY = "scroll";

								if (objs.deleteFun)
									objs.deleteFun.call('', postData);
							});
						}, function() {
							objs.token = true;
						})
					}
				});
				li.appendChild(scspan);
			}
			mlcj = mlcj + 1; // 记录层级

			// 添加按钮
			if (jsondata.addshow || jsondata.addshow == undefined) {
				var tjspan = document.createElement('span');
				tjspan.innerHTML = "";
				tjspan.id = mltj + jsondata.id;
				tjspan.title = addTip;
				tjspan.className = "zjmlctrl zjml-add";
				$(tjspan).bind('click', function() {
					if (!objs.token) return false;
					objs.token = false;
					// 处理最大层级
					if (mlcj > objs.maxLevel) {
						checkMaxLevel = checkMaxLevel.replace(new RegExp("\\{0\\}", "g"), objs.maxLevel);
						if (!objs.bootFlg) {
							alert(checkMaxLevel);
						} else {
							$.bootboxAlert('', checkMaxLevel, null, "error");
						}
						objs.token = true;
						return false;
					}

					var _this = this;

					var sjid = _this.id.replace(mltj, '');

					if (objs.customnewleaf) newleaf = objs.customnewleaf;

					var postData = {
						"sjid": sjid,
						"name": newleaf
					}
					var functionName = "";
					if (objs.addCheckFunctionName != undefined) {
						functionName = objs.addCheckFunctionName;
					} else {
						functionName = objs.addFunctionName;
					}
					objs.ctrl = "addcheck";
					crossDomainAjax(objs, objs.url.replace(replaceCode, functionName), postData, function(data) {
						objs.token = true;
						// 处理叶子变节点
						if(data && data.result == false){
						}else{
							var spansstmp = $("#" + mlss + _this.id.replace(mltj, ''));
							if (spansstmp[0].className == "leaf") {
								spansstmp.removeClass("leaf");
								spansstmp.addClass("ssactive");
								spansstmp.bind('click', function() {
									mlshrink(this,parseInt(mlcj)-1);
								});
							}
							mladd(_this, mlcj, data, objs, _objthis);
						}
						var returnData;
						if (data) {
							returnData = {
								"id": data.id,
								"name": newleaf,
								"data":data
							}
						} else {
							returnData = {
								"id": "1",
								"name": newleaf
							}
						}
						if (objs.addFun)
							objs.addFun.call('', returnData);
					});
				});
				li.appendChild(tjspan);
			}

			// 上移按钮
			if (jsondata.moveupshow || jsondata.moveupshow == undefined) {
				var syspan = document.createElement('span');
				syspan.innerHTML = "";
				syspan.id = mlsy + jsondata.id;
				syspan.title = upTip;
				syspan.className = "zjmlctrl zjml-up";
				$(syspan).bind('click', function() {
					if (!objs.token) return false;
					objs.token = false;
					var _this = this;
					getindex(_this, -1, mlsy, $(".wd_zjml li").length, objs); // 获取待处理控件位置

					if (objs.indexflg < 0) {

						if (!objs.bootFlg) {
							alert(notUpMoveTitle);
						} else {
							$.bootboxAlert('', notUpMoveTitle, null, "error");
						}
						objs.token = true;
						objs.indexflg = 1;
						return false;
					}

					var twosjid = $("#" + sjmlid + _this.id.replace(mlsy, '')).val(); // 当前上级id
					var onesjid = $("#" + sjmlid + $(".wd_zjml li").eq(objs.indexflg)[0].id.replace(mlid, '')).val(); //待操作上级id

					var oneobj = $(".wd_zjml li").eq(objs.indexflg)[0].parentElement; // 待操作控件
					var twoobj = $("#" + mlid + _this.id.replace(mlsy, ''))[0].parentElement; // 当前控件
					if (twosjid == onesjid) {
						// 生成遮蔽层
						var shield = document.createElement("DIV");
						shield.id = "shield" + _objthis[0].id;
						shield.className = "zjml_shield";
						_objthis[0].appendChild(shield);

						var texts = document.createElement('span');
						texts.className = "zjml_shield_text";
						texts.id = "shieldtext" + _objthis[0].id;
						texts.innerHTML = waiting;
						_objthis[0].appendChild(texts);

						var postData = {
							"upid": oneobj.firstChild.id.replace(mlid, ''),
							"downid": twoobj.firstChild.id.replace(mlid, '')
						}
						objs.ctrl = "upmove";
						crossDomainAjax(objs, objs.url.replace(replaceCode, objs.upMoveFunctionName), postData, function(data) {
							objs.token = true;
							$("#" + "shield" + _objthis[0].id).remove();
							$("#" + "shieldtext" + _objthis[0].id).remove();
							mlup(oneobj, twoobj, objs);
						});
					} else {
						objs.indexflg = 1;
					}
				});
				li.appendChild(syspan);
			}
			// 下移按钮
			if (jsondata.movedownshow || jsondata.movedownshow == undefined) {
				var xyspan = document.createElement('span');
				xyspan.innerHTML = "";
				xyspan.title = downTip;
				xyspan.id = mlxy + jsondata.id;
				xyspan.className = "zjmlctrl zjml-down";
				$(xyspan).bind('click', function() {
					if (!objs.token) return false;
					objs.token = false;
					var _this = this;
					getindex(_this, 1, mlxy, $(".wd_zjml li").length, objs);

					if (objs.indexflg == $(".wd_zjml li").length) {
						if (!objs.bootFlg) {
							alert(notDownMoveTitle);
						} else {
							$.bootboxAlert('', notDownMoveTitle, null, "error");
						}
						objs.token = true;
						objs.indexflg = 1;
						return false;
					}

					var twosjid = $("#" + sjmlid + _this.id.replace(mlxy, '')).val(); // 当前上级id
					var onesjid = $("#" + sjmlid + $(".wd_zjml li").eq(objs.indexflg)[0].id.replace(mlid, '')).val(); //待操作上级id

					var oneobj = $(".wd_zjml li").eq(objs.indexflg)[0].parentElement; // 待操作控件
					var twoobj = $("#" + mlid + _this.id.replace(mlxy, ''))[0].parentElement; // 当前控件

					if (twosjid == onesjid) {
						// 生成遮蔽层
						var shield = document.createElement("DIV");
						shield.id = "shield" + _objthis[0].id;
						shield.className = "zjml_shield";
						_objthis[0].appendChild(shield);

						var texts = document.createElement('span');
						texts.className = "zjml_shield_text";
						texts.id = "shieldtext" + _objthis[0].id;
						texts.innerHTML = waiting;
						_objthis[0].appendChild(texts);

						var postData = {
							"upid": twoobj.firstChild.id.replace(mlid, ''),
							"downid": oneobj.firstChild.id.replace(mlid, '')
						}
						objs.ctrl = "downmove";
						crossDomainAjax(objs, objs.url.replace(replaceCode, objs.downMoveFunctionName), postData, function(data) {
							objs.token = true;
							$("#" + "shield" + _objthis[0].id).remove();
							$("#" + "shieldtext" + _objthis[0].id).remove();
							mldwon(oneobj, twoobj, objs);
						});
					} else {
						objs.indexflg = 1;
					}
				});
				li.appendChild(xyspan);
			}
			//启用禁用按钮
			if (jsondata.enableshow == true || jsondata.enableshow == false) {
				var qyjyspan = document.createElement('span');
				qyjyspan.innerHTML = "";
				qyjyspan.id = mlqyjy + jsondata.id;
				if(jsondata.enableshow){
					qyjyspan.title = enableTip;
					qyjyspan.className = "zjmlctrl zjml-enable";	
				}else{
					qyjyspan.title = disableTip;
					qyjyspan.className = "zjmlctrl zjml-disable";
				}
				$(qyjyspan).bind('click', function() {
					var _this = this;
					var qyjytype = "";
					if(_this.className.indexOf("zjml-enable") != -1){
						qyjytype = 1;
					}else {
						qyjytype = 0;
					}
					var postData = {
						"id": this.id.replace(mlqyjy, ''),
						"type":qyjytype
					}
					crossDomainAjax(objs, objs.url.replace(replaceCode, objs.disEnableFunctionName), postData, function(data) {
						objs.token = true;
						if(qyjytype == 1){
							$(_this).removeClass("zjml-enable").addClass("zjml-disable");
							_this.title = disableTip;
							$(_this).parent().children(".wdtreebanned").hide();
						}else {
							$(_this).removeClass("zjml-disable").addClass("zjml-enable");
							_this.title = enableTip;
							$(_this).parent().children(".wdtreebanned").show();
						}
						if (objs.disEnableFun){
							objs.disEnableFun.call('', postData);
						}
					});
				});
				li.appendChild(qyjyspan);
				if(jsondata.enableshow){
					$(li).find(".wdtreebanned").show();
				}else{
					$(li).find(".wdtreebanned").hide();
				}
				
			}
			//搜索按钮
			if (jsondata.searchshow == true) {
				var searchspan = document.createElement('span');
				searchspan.innerHTML = "";
				searchspan.id = mlss + jsondata.id;
				searchspan.title = searchTip;
				searchspan.className = "zjmlctrl zjml-seach";
				$(searchspan).bind('click', function() {
					var postData = {
						"id": this.id.replace(mlss, '')
					}
					if (objs.searchFun){
						objs.searchFun.call('',postData);
					}
				});
				li.appendChild(searchspan);
			}
		} else {
			mlcj = mlcj + 1; // 记录层级
		}
		if (jsondata.children != undefined) {
			for (var i = 0; i < jsondata.children.length; i++) {
				addZjml(li, jsondata.children[i], li.id, mlcj, objs, _objthis);
			}
		}
		div.appendChild(li);
		appobj.appendChild(div);
	};
	$.fn.wdResetTree = function(objs) {
		var _this = this;
		_this[0].innerHTML = "";
		var _wdtreeobj = null;
		for (var i = 0; i < arrayObj.length; i++) {
			if (arrayObj[i].name == this[0].id) {
				_wdtreeobj = arrayObj[i].value;
			}
		}
		for (var i = 0; i < objs.data.length; i++) {
			addZjml(this[0], objs.data[i], mlid + numformat("0", "00000"), mlcj, _wdtreeobj, _this);
		}
	};
	$.fn.wdTree = function(objs) {
		var _this = this;
		// 默认值处理
		var defaults = {
			objid: _this[0].id,
			ctrlFlg: true,
			nameMaxLength: 40,
			nameMaxViweLength: 260,
			maxLevel: 5,
			nameUpdateFunctionName: "nameUpdate", // 修改章节目录名称方法名
			deleteFunctionName: "delete", // 删除章节目录节点
			addFunctionName: "add", // 新增章节目录节点
			upMoveFunctionName: "upMove", // 上移章节目录
			downMoveFunctionName: "downMove", // 下移章节目录
			disEnableFunctionName: "disEnable",//启用禁用目录
			bootFlg: false,
			indexflg: 1,
			mlcj: 1,
			token: true, // 处理重复提交
			checkflg: true, //是否加checkbox
			singleSelectionFlg: true, //是否单选,默认单选
			selecttext: "id", //选中的值,默认id
			treewidth: 1000,
			childurl:"",//加载数据后台地址
			showallFlg: true,//是否加载全部子集
			haveChildFlg:true
		}
		var objs = $.extend(defaults, objs);
		// 保存全局变量
		arrayObj.push({
			"name": _this[0].id,
			"value": objs
		});
		_this[0].style.width = objs.treewidth + "px";
		// 一级目录
		for (var i = 0; i < objs.data.length; i++) {
			addZjml(this[0], objs.data[i], mlid + numformat("0", "00000"), mlcj, objs, _this);
		}

		// 阻止粘贴
		$(".wd_zjml_title").each(function() {
			this.onpaste = function() {
				return false;
			}
		});

		_this.find("label").each(function() {
			this.onkeydown = function() {
				if (window.event && window.event.keyCode == 13) {
					window.event.returnValue = false;
				}
			}
		})
	};
	$.fn.wdTreeCheck = function(id) {
		$("#"+id).click();
	};
	function treejsonjoin(sorJosn, tarJosn) {
		sorJosn.push = function(o) {
			//如果o是object  
			if (typeof(o) == 'object')
				for (var p in o) this[p] = o[p];
		};
		sorJosn.push(
			tarJosn
		)

		return sorJosn;
	}
	//父级是否选中联动
	function checkparent(temp){
		var zjcheckedflag = "";
		var parentzjmldiv = $(temp.parentNode.parentNode).parent().parent(".zjmldiv");
		if(parentzjmldiv.length>0){
			parentzjmldiv.find(".zjmldiv").find(".wdtreecheckbox").each(function(){
				zjcheckedflag = this.checked;
				if(!zjcheckedflag){
					return zjcheckedflag;
				}
			});
			if(zjcheckedflag){
				parentzjmldiv.children().children('.wdtreecheckbox')[0].checked = true;
			}else{
				parentzjmldiv.children().children('.wdtreecheckbox')[0].checked = false;
			}
			checkparent(parentzjmldiv.children().children('.wdtreecheckbox')[0]);
		}
	}

	// 发送请求
	function crossDomainAjax(objs, url, postData, successCallback) {
		// 共通参数
		postData = treejsonjoin(postData, objs.postData);
		// 处理特殊参数
		postData = treejsonjoin(postData, objs.customData[objs.ctrl]);
		var uuid = new Date;
		uuid = uuid.getTime();
		$.ajax({
			url: url + "?uuid=" + uuid,
			type: 'POST',
			data: eval('(' + JSON.stringify(postData) + ')'),
			async: false,
			dataType: "json",
			success: function(obj) {
				if (obj["success"] || obj["isSuccess"]) {
					if (obj["functionName"]) {
						crossDomainAjax(objs, objs.url.replace(replaceCode, obj["functionName"]), postData, successCallback);
					} else {
						successCallback(obj);
					}
				} else {
					if (obj["functionName"]) {
						// 非boot3框架使用
						if (!objs.bootFlg) {
							if (obj["flg"]) {
								alert(obj["msg"]);
							} else {
								confirm(obj["msg"], '', function() {
									crossDomainAjax(objs, objs.url.replace(replaceCode, obj["functionName"]), postData, successCallback);
								})
							}
						} else {
							if (obj["flg"]) {
								$.bootboxAlert('', obj["msg"], null, "error");
							} else {
								$.bootboxConfrim(obj["msg"], function() {
									crossDomainAjax(objs, objs.url.replace(replaceCode, obj["functionName"]), postData, successCallback);
								});
							}
						}
					}else{
						if (successCallback) successCallback(obj);
					}

					objs.token = true;
				}
			},
			error: function(data) {
				successCallback()
			}
		});
	};
})(jQuery);

function changeTreeCount(objid, oldid, newid) {
	var tempold = oldid.split(',');
	var iCount = 0;

	for (var i = 0; i < tempold.length; i++) {
		var oldCount = $("#" + objid + "_count_" + tempold[i]).html();

		if (oldCount > 0) {
			$("#" + objid + "_count_" + tempold[i]).html(parseInt(oldCount) - 1);

			iCount += 1;
		}

		if (tempold[i] == "" || tempold[i] == "undefined") iCount += 1;
	}

	var newCount = $("#" + objid + "_count_" + newid).html();
	$("#" + objid + "_count_" + newid).html(parseInt(newCount) + iCount);
}

// objid:控件id;singleSelectionFlg:true单选；false多选;selectType返回值类型：1 所有返回；2 叶子节点返回；3 叶子节点 + 第一级父
function getWdTreeSelectNotText(objid, singleSelectionFlg, selectType) {
	var returnstr = "";
	if (singleSelectionFlg)
		returnstr = "{";
	else
		returnstr = "[";

	$(".wdtreecheck" + objid).each(function() {
		if (this.checked) {
			if (singleSelectionFlg) {
				returnstr += this.text;
			} else {
				if (selectType == 1) {
					returnstr += "{" + this.text + "},";
				} else if (selectType == 2) {
					if ($(this.parentNode).find('.zjmldiv').length == 0) {
						returnstr += "{" + this.text + "},";
					}
				} else {
					if ($(this.parentNode).find('.zjmldiv').length == 0) {
						returnstr += "{";
						returnstr += this.text + ",";

						var temp = $(this.parentNode.parentNode.parentNode).find('.wdtreecheckbox')[0].text;
						temp = temp.split(',');
						for (var i = 0; i < temp.length; i++) {
							returnstr += "p" + temp[i] + ",";
						}
						returnstr = returnstr.substring(0, returnstr.length - 1);

						returnstr += "},";
					}
				}
			}
		}
	})

	if (!singleSelectionFlg) {
		if (returnstr != "[")
			returnstr = returnstr.substring(0, returnstr.length - 1);
	}

	if (singleSelectionFlg)
		returnstr = returnstr + "}";
	else
		returnstr = returnstr + "]";


	if (returnstr == "{}") {
		returnstr = "";
		if ($("#" + objid).find(".wd_zjml_title_action").length > 0) {
			var temp = $("#" + objid).find(".wd_zjml_title_action")[0].id.split('_');
			for (var i = 1; i < temp.length; i++) {
				returnstr = returnstr + temp[i] + "_";
			}
			returnstr = returnstr.substring(0, returnstr.length - 1);
		}
	} else {
		returnstr = eval("(" + returnstr + ")");
	}

	return returnstr;
};
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}