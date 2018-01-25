(function($) {
	var span1;
//	var language = getLanguageFromCookie();
//	switch(language) {
//		case "zh": // 中文
//			span1 = "视频正在转换中";
//			break;
//		case "en": // 英文
//			span1 = "Video is converting.";
//			break;
//		default:
//			span1 = "视频正在转换中";
//			break;
//	}
	var UILocationName = (typeof(grid2UILocationName) != "undefined") ? grid2UILocationName : "ui";
	var ctrlurl = "";
	var swfurl = "";
	if(getRequestAddressUrl("components")) {
		ctrlurl = "";
		swfurl = getRequestAddressUrl("components");
	} else {
		ctrlurl = UILocationName + "/common/components/";
		swfurl = appAddress + UILocationName + "/common/components/";
	}
	
	if(getLanguageFromCookie() != "zh") {
		swfurl = swfurl + "wdCkplayer/ckplayer_" + getLanguageFromCookie() + "/ckplayer.swf";
	} else {
		swfurl = swfurl + "wdCkplayer/ckplayer/ckplayer.swf";
	}

	var $CkplayerManager = null;
	$.fn.wdCkplayer = function(objs) {
		var jsArray = [{
			"jsurl": ctrlurl + "wdCkplayer/ckplayer/ckplayer.min.js",
			"version": "1.0"
		}];
		var defaults = {
			swfId: "ckplayer_a1",
			file: "", //f
			width: "600", //w
			height: "400", //h
			play: 0, // p
			loop: 0, // e
			handle: 0, //c
			access: 0, //b
			lock: 0, //lv
			bgcolor: "#FFF",
			allowFullScreen: true,
			allowScriptAccess: "always",
			wmode: "transparent",
			callFun: null,
			subtitle_cn: '',
			subtitle_en: '',
			startTime: 0
		}
		var settings = $.extend(true, defaults, objs);
		
		if(!$CkplayerManager) {
			$CkplayerManager = new Object();
			$CkplayerManager.width = $(this)[0].style.width;
			$CkplayerManager.height = $(this)[0].style.height;
			$CkplayerManager.backgroundColor = $(this)[0].style.backgroundColor;
		}

		var id = $(this).attr("id");

		loadHeadJs(jsArray, "", function() {
			var _subtitlecn = "";
			var _subtitleen = "";
			if(settings.subtitle_cn != '') {
				_subtitlecn = getRequestAddressUrl("subtitleScreenshot") + settings.subtitle_cn;
			}
			if(settings.subtitle_en != '') {
				_subtitleen = getRequestAddressUrl("subtitleScreenshot") + settings.subtitle_en;
			}
			if(settings.file.indexOf("http") != -1) {
				// 视屏播放
				var flashvars = {
					f: settings.file,
					c: settings.handle, // 操作
					b: settings.access, // js交互
					p: settings.play, // 是否自动播放
					e: settings.loop, // 循環播放
					lv: settings.lock, //锁定进度条
					screenshot: getRequestAddressUrl("videoScreenshot"), //视频服务地址
					subtitle_cn: _subtitlecn,
					subtitle_en: _subtitleen,
					cookieId: id + 'starttime',
					loaded: 'loadedHandler'
					//					subtitle_cn:getRequestAddressUrl("app") + settings.subtitle_cn,
					//					subtitle_en:getRequestAddressUrl("app") + settings.subtitle_en
				};
				/*if(response.qxdname == "") {
					// 文件没有转
					alert("视频正在转化中");
				} else {
					// 存在多个清晰度
					if(response.qxdname.indexOf(",") != -1) {
						flashvars['deft'] = response.qxdname,
							flashvars['deff'] = response.qxdrul
					}
				}*/
				var params = {
					bgcolor: settings.bgcolor,
					allowFullScreen: settings.allowFullScreen,
					allowScriptAccess: settings.allowScriptAccess,
					wmode: settings.wmode
				};

				CKobject.embedSWF(swfurl, id, 'ckplayer_a1', settings.width, settings.height, flashvars, params);
				if(settings.callFun) {
					settings.callFun.call();
				}
			} else {
				$.ajax({
					url: getRequestAddressUrl("videoQuality"), //请求地址
					type: "GET", //请求方式 
					data: {
						"fileid": settings.file,
					}, //请求参数
					dataType: "json",
					success: function(response, xml) { // 此处放成功后执行的代码
						// 视屏播放
						var flashvars = {
							f: getRequestAddressUrl("videoTranscode") + settings.file + "&type=mp4",
							c: settings.handle, // 操作
							b: settings.access, // js交互
							p: settings.play, // 是否自动播放
							e: settings.loop, // 循環播放
							lv: settings.lock, //锁定进度条
							screenshot: getRequestAddressUrl("videoScreenshot"), //视频服务地址
							subtitle_cn: _subtitlecn,
							subtitle_en: _subtitleen,
							cookieId: id + 'starttime',
							loaded: 'loadedHandler'
							//							subtitle_cn:getRequestAddressUrl("app") + settings.subtitle_cn,
							//							subtitle_en:getRequestAddressUrl("app") + settings.subtitle_en
						};

						if($CkplayerManager.width) {
							$('#' + id).css('width', $CkplayerManager.width);
						} else {
							$('#' + id).css('width', '');
						}
						if($CkplayerManager.height) {
							$('#' + id).css('height', $CkplayerManager.height);
						} else {
							$('#' + id).css('height', '');
						}
						if($CkplayerManager.backgroundColor) {
							$('#' + id).css('background-color', $CkplayerManager.width);
						} else {
							$('#' + id).css('background-color', '');
						}

						if(response.qxdname == "") {
							// 文件没有转
							alert(span1);
							$('#' + id).css('width', settings.width);
							$('#' + id).css('height', settings.height);
							$('#' + id).css('background-color', "#000000");
						} else {
							// 存在多个清晰度
							if(response.qxdname.indexOf(",") != -1) {
								flashvars['deft'] = response.qxdname;
								flashvars['deff'] = response.qxdrul;
							}
							//转化完成时
							var params = {
								bgcolor: settings.bgcolor,
								allowFullScreen: settings.allowFullScreen,
								allowScriptAccess: settings.allowScriptAccess,
								wmode: settings.wmode
							};
							CKobject.embedSWF(swfurl, id, settings.swfId, settings.width, settings.height, flashvars, params);
						}

						if(settings.callFun) {
							settings.callFun.call();
						}
					},
					fail: function(status) { // 此处放失败后执行的代码
						// 视屏播放
						var flashvars = {
							f: settings.file,
							c: settings.handle, // 操作
							b: settings.access, // js交互
							p: settings.play, // 是否自动播放
							e: settings.loop, // 循環播放
							lv: settings.lock, //锁定进度条
							screenshot: getRequestAddressUrl("videoScreenshot"), //视频服务地址
							cookieId: id + 'starttime',
							loaded: 'loadedHandler'
						};
						var params = {
							bgcolor: settings.bgcolor,
							allowFullScreen: settings.allowFullScreen,
							allowScriptAccess: settings.allowScriptAccess,
							wmode: settings.wmode
						};
						CKobject.embedSWF(swfurl, id, settings.swfId, settings.width, settings.height, flashvars, params);
						if(settings.callFun) {
							settings.callFun.call();
						}
					}
				});
			}
		});

		window.loadedHandler = function() {
			SetCookie(CKobject.getVars('cookieId'), settings.startTime);
			CKobject.getObjectById('ckplayer_a1').addListener('loadedmetadata', 'wdCkplayerLoadedmetadataHandler');
			CKobject.getObjectById('ckplayer_a1').addListener('play', 'wdCkplayerPlayHandler');
		}

		window.wdCkplayerLoadedmetadataHandler = function() {
			//removeListener();
			CKobject.getObjectById('ckplayer_a1').videoPause();
			var d = CKobject.getObjectById('ckplayer_a1').videoSeek(settings.startTime);
		}

		var wdCkPlayState = true;
		window.wdCkplayerPlayHandler = function() {
			CKobject.getObjectById('ckplayer_a1').videoSeek(getCookie(CKobject.getVars('cookieId')));
			wdCkplayerAddTimeListener();
		}

		function wdCkplayerAddTimeListener() { //增加时间监听
			CKobject.getObjectById('ckplayer_a1').addListener('time', 'timeHandler');
		}

		//关灯
		window.closelights = function() {};
		//开灯
		window.openlights = function() {};
		// 获取当前播放时间
		$.fn.getCurTime = function() {
			if(CKobject && CKobject.getObjectById(this[0].id) && typeof(CKobject.getObjectById(this[0].id).getStatus) == 'function'){
				return getTranTime(CKobject.getObjectById(this[0].id).getStatus().time);
			}else{
				return getTranTime(0);
			}
		};
	}
})(jQuery);