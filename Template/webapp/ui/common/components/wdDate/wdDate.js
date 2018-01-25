(function($) {
	var montharray = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一", "十二"];
	var weekarray = ['日', '一', '二', '三', '四', '五', '六'];
	var span1 = "时间";
	var span2 = "确定";
	var span3 = "今天";
	var span4 = "清空";
	var span5 = "不能小于设定的最小时间";
	var span6 = "不能大于设定的最大时间";
	var span7 = "当前对应日期不可选择";
	var span8 = "请选择日期";
	var language = "zh";
	var cookiename = "language";
	var arr, reg = new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)");
	if(document.cookie.match(reg) == null) {
		language = "zh";
	} else {
		arr = document.cookie.match(reg);
		language = unescape(arr[2]);
	}
	if(language == "zh") {
		montharray = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一", "十二"];
		weekarray = ['日', '一', '二', '三', '四', '五', '六'];
		span1 = "时间";
		span2 = "确定";
		span3 = "今天";
		span4 = "清空";
		span5 = "不能小于设定的最小时间";
		span6 = "不能大于设定的最大时间";
		span7 = "当前对应日期不可选择";
		span8 = "请选择日期";
	} else {
		montharray = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "June.", "July.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
		weekarray = ['sun', 'mon', 'tue', 'wed', 'thu', 'far', 'sat'];
		span1 = "time";
		span2 = "ok";
		span3 = "today";
		span4 = "clear";
		span5 = "不能小于设定的最小时间";
		span6 = "不能大于设定的最大时间";
		span7 = "当前对应日期不可选择";
		span8 = "请选择日期";
	}
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	Date.prototype.Format = function(fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}

		return fmt;
	}
	$.fn.wdDate = function(settings) {
		var defaults = {
			_$id: this,
			_defaultDay: 0,
			_defaultMonth: 0,
			_defaultYear: 0,
			_monthNumList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			_monthWordList: montharray,
			_dateformat: "yyyy-MM-dd",
			_maxdate: '2999-12-31',
			_mindate: '1900-1-1'
		};
		var settings = $.extend(defaults, settings);
		// 设置最小时间
		if($(this).data("mindate")) {
			settings._mindate = $(this).data("mindate");
		}
		// 设置最大时间
		if($(this).data("maxdate")) {
			settings._maxdate = $(this).data("maxdate");
		}
		// 设置时间格式
		if($(this).data("dateformat")) {
			settings._dateformat = $(this).data("dateformat");
		}
		// 处理显示值
		if(settings._$id.val()) {
			var tempdate = settings._$id.val();
			settings._$id.val(dataformat(settings, tempdate));
		}
		// 设置默认天
		var date = new Date;
		if(settings._$id.val()) {
			settings._defaultDay = tempdate.split('-')[2].split(' ')[0];
		} else {
			settings._defaultDay = date.getDate();
		}
		// 点击任何地方出下拉框，隐藏下拉框
		$(document.body).unbind("click");
		$(document.body).bind("click", function(event) {
			wdControlClose(event);
		});
		$("#dateLayer").remove();
		// 初始化容器
		var dmLayer;
		if($("#dateLayer").length > 0) {
			dmLayer = $("#dateLayer")[0];
		} else {
			dmLayer = document.createElement('div');
			dmLayer.id = "dateLayer";
			dmLayer.className = "dateLayerWrapper";
			document.body.appendChild(dmLayer);
		}

		var dataBox = document.createElement('div');
		dataBox.style.width = "200px";
		dataBox.style.backgroundColor = "#fafafa";
		dataBox.style.border = "0px solid #999999";

		// 设置选择头
		setDateSelectHead(dataBox, settings);
		// 设置日期体
		setDateBody(dataBox, settings);
		dataBox.style.height = "auto";
		dataBox.style.paddingBottom = "6px";
		// 判断是否加时间选择区
		if(settings._dateformat.split(' ').length > 1) {
			setTimeSelectArea(dataBox, settings);
		}
		// 添加操作按钮
		setCtrlButton(dataBox, settings);

		dmLayer.appendChild(dataBox);
		// 定位
		setLocate($(this), $('#dateLayer'));
	};

	// 时间格式化
	function dataformat(settings, tempdate) {
		var tempdate = tempdate;
		var tempnewdate;
		var year = tempdate.split('-')[0];
		var month = parseInt(tempdate.split('-')[1]) - 1;
		var day = tempdate.split('-')[2].split(' ')[0];
		var temptime = (tempdate.split('-')[2].split(' ')[1]) ? tempdate.split('-')[2].split(' ')[1] : "00:00:00";
		var hour = (temptime.split(':')[0]) ? temptime.split(':')[0] : "00";
		var minute = (temptime.split(':')[1]) ? temptime.split(':')[1] : "00";
		var second = (temptime.split(':')[2]) ? temptime.split(':')[2] : "00";
		tempnewdate = new Date(year, month, day, hour, minute, second);
		return tempnewdate.Format(settings._dateformat);
	};

	function setTimeSelectArea(box, settings) {
		var tempdate = settings._$id.val();
		var date = new Date;
		var _hour = date.getHours();
		var _minute = date.getMinutes();
		var _second = date.getSeconds();
		var temptime = (tempdate && tempdate.split('-')[2]) ? tempdate.split('-')[2].split(' ')[1] : undefined;
		var hours = (tempdate && temptime.split(':')[0]) ? temptime.split(':')[0] : _hour;
		var minutes = (tempdate && temptime.split(':')[1]) ? temptime.split(':')[1] : _minute;
		var seconds = (tempdate && temptime.split(':')[2]) ? temptime.split(':')[2] : _second;

		var timeBox = document.createElement('div');
		timeBox.className = "timeBox";

		var timetitle = document.createElement('div');
		timetitle.className = "timetitle";
		timetitle.innerHTML = span1 + "：";
		timeBox.appendChild(timetitle);

		var selectbox = document.createElement('div');
		selectbox.className = "selectbox";
		// 时
		var hour = document.createElement('input');
		hour.id = settings._$id[0].id + "_hour";
		$(hour).bind('click', function() {
			// 关闭分、秒
			$("#" + settings._$id[0].id + "_minutesBox").remove();
			$("#" + settings._$id[0].id + "_secondsBox").remove();
			// 关闭年月
			$("#" + settings._$id[0].id + "_NavMonthList").remove();
			$("#" + settings._$id[0].id + "_NavYearList").remove();

			if($("#" + settings._$id[0].id + "_hoursBox").length > 0) {
				return;
			}
			var hoursBox = document.createElement('div');
			hoursBox.id = settings._$id[0].id + "_hoursBox";
			hoursBox.className = "hoursBox";
			for(var i = 0; i < 24; i++) {
				var temphour = document.createElement('div');
				temphour.innerHTML = (i.toString().length == 2) ? i : ("0" + i);
				if(temphour.innerHTML == hour.value) {
					temphour.style.backgroundColor = "#65A2F3"
				}
				$(temphour).bind('click', function() {
					hour.value = this.innerHTML;
					$(hoursBox).remove();
				});
				hoursBox.appendChild(temphour);
			}

			selectbox.appendChild(hoursBox);
		});
		hour.value = hours;
		selectbox.appendChild(hour);
		var span = document.createElement('span');
		span.innerHTML = ":";
		selectbox.appendChild(span);
		// 分
		var minute = document.createElement('input');
		minute.id = settings._$id[0].id + "_minute";
		$(minute).bind('click', function() {
			// 关闭时、秒
			$("#" + settings._$id[0].id + "_hoursBox").remove();
			$("#" + settings._$id[0].id + "_secondsBox").remove();
			// 关闭年月
			$("#" + settings._$id[0].id + "_NavMonthList").remove();
			$("#" + settings._$id[0].id + "_NavYearList").remove();

			if($("#" + settings._$id[0].id + "_minutesBox").length > 0) {
				return;
			}
			var minutesBox = document.createElement('div');
			minutesBox.id = settings._$id[0].id + "_minutesBox";
			minutesBox.className = "minutesBox";
			for(var i = 0; i < 12; i++) {
				var tempminute = document.createElement('div');
				tempminute.innerHTML = ((i * 5).toString().length == 2) ? i * 5 : ("0" + (i * 5));
				if(tempminute.innerHTML == minute.value) {
					tempminute.style.backgroundColor = "#65A2F3"
				}
				$(tempminute).bind('click', function() {
					minute.value = this.innerHTML;
					$(minutesBox).remove();
				});
				minutesBox.appendChild(tempminute);
			}
			selectbox.appendChild(minutesBox);
		});
		minute.value = minutes;
		// 处理是否可用
		if(settings._dateformat.split(':').length < 2) {
			minute.disabled = true;
			minute.style.color = "#888";
		}

		selectbox.appendChild(minute);
		var span = document.createElement('span');
		span.innerHTML = ":";
		selectbox.appendChild(span);
		// 秒
		var second = document.createElement('input');
		second.id = settings._$id[0].id + "_second";
		$(second).bind('click', function() {
			// 关闭时、分
			$("#" + settings._$id[0].id + "_hoursBox").remove();
			$("#" + settings._$id[0].id + "_minutesBox").remove();
			// 关闭年月
			$("#" + settings._$id[0].id + "_NavMonthList").remove();
			$("#" + settings._$id[0].id + "_NavYearList").remove();

			if($("#" + settings._$id[0].id + "_secondsBox").length > 0) {
				return;
			}
			var secondsBox = document.createElement('div');
			secondsBox.id = settings._$id[0].id + "_secondsBox";
			secondsBox.className = "secondsBox";
			for(var i = 0; i < 6; i++) {
				var tempsecond = document.createElement('div');
				tempsecond.innerHTML = ((i * 10).toString().length == 2) ? i * 10 : ("0" + (i * 10));
				if(tempsecond.innerHTML == second.value) {
					tempsecond.style.backgroundColor = "#65A2F3"
				}
				$(tempsecond).bind('click', function() {
					second.value = this.innerHTML;
					$(secondsBox).remove();
				});
				secondsBox.appendChild(tempsecond);
			}
			selectbox.appendChild(secondsBox);
		});
		second.value = seconds;
		// 处理是否可用
		if(settings._dateformat.split(':').length < 3) {
			second.disabled = true;
			second.style.color = "#888";
		}
		selectbox.appendChild(second);

		timeBox.appendChild(selectbox);

		box.appendChild(timeBox);
	};

	function setCtrlButton(box, settings) {
		var buttonBox = document.createElement('div');
		buttonBox.className = "buttonBox _clear";

		var okbtn = document.createElement('button');
		$(okbtn).bind('click', function() {
			var year = $("#" + settings._$id[0].id + "_NavYearInput").val();
			var month = $("#" + settings._$id[0].id + "_NavMonthInput")[0].name;
			var day = "1";
			var _h = $("#" + settings._$id[0].id + "_hour").val()
			var hour = (_h) ? _h : "00";
			var _m = $("#" + settings._$id[0].id + "_minute").val();
			var minute = (_m) ? _m : "00";
			var _s = $("#" + settings._$id[0].id + "_second").val()
			var second = (_s) ? _s : "00";
			var activeDateFlag = false;
			$("#" + settings._$id[0].id + "_calendarBox td").each(function() {
				if(this.className == "activeDate") {
					day = this.innerHTML;
					activeDateFlag = true;
				}
			});
			if(activeDateFlag) {
				var tempdate = year + "-" + parseInt(parseInt(month) + 1) + "-" + day + " " + hour + ":" + minute + ":" + second;

				var _selectD = new Date(dataformat(settings, tempdate));
				var _maxD = new Date(dataformat(settings, settings._maxdate));
				var _minD = new Date(dataformat(settings, settings._mindate));
				if(checkDateRange(_selectD, _maxD, _minD, settings)) {
					settings._$id.val(dataformat(settings, tempdate));
					if($("#" + settings._$id[0].id).data("onok")) {
						eval($("#" + settings._$id[0].id).data("onok")).call($("#" + settings._$id[0].id)[0]);
					}
				}
			} else {
				//alert(span8);
				if(settings._$id.data("dmsg")) {
					alert(settings._$id.data("dmsg"));
				} else {
					alert(span8);
				}
			}

			$("#dateLayer").remove();
		});
		okbtn.innerHTML = span2;
		buttonBox.appendChild(okbtn);

		var todaybtn = document.createElement('button');
		$(todaybtn).bind('click', function() {
			var date = new Date;
			var month = date.getMonth();
			var year = date.getFullYear();
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();

			if($("#" + settings._$id[0].id + "_" + day)[0] && $("#" + settings._$id[0].id + "_" + day)[0].className == "disabledDate") {
				alert(span7);
			} else {
				var tempdate = year + "-" + parseInt(month + 1) + "-" + day + " " + hour + ":" + minute + ":" + second;
				var _selectD = new Date(dataformat(settings, tempdate));
				var _maxD = new Date(dataformat(settings, settings._maxdate));
				var _minD = new Date(dataformat(settings, settings._mindate));
				if(checkDateRange(_selectD, _maxD, _minD, settings)) {
					settings._$id.val(dataformat(settings, tempdate));
					if($("#" + settings._$id[0].id).data("ontoday")) {
						eval($("#" + settings._$id[0].id).data("ontoday")).call($("#" + settings._$id[0].id)[0]);
					}
					$("#dateLayer").remove();
				}
			}
		});
		todaybtn.innerHTML = span3;
		buttonBox.appendChild(todaybtn);

		var clearbtn = document.createElement('button');
		$(clearbtn).bind('click', function() {
			$(settings._$id.val(""));
			if($("#" + settings._$id[0].id).data("onclear")) {
				eval($("#" + settings._$id[0].id).data("onclear")).call($("#" + settings._$id[0].id)[0]);
			}
			$("#dateLayer").remove();
		});
		clearbtn.innerHTML = span4;
		buttonBox.appendChild(clearbtn);

		box.appendChild(buttonBox);
	};

	function checkDateRange(Sdate, Maxdate, Mindate, settings) {
		if(Sdate < Mindate) {
			if(settings._$id.data("dmsg")) {
				alert(settings._$id.data("dmsg"));
			} else {
				alert(span5);
			}
			return false;
		}
		if(Sdate > Maxdate) {
			if(settings._$id.data("dmsg")) {
				alert(settings._$id.data("dmsg"));
			} else {
				alert(span6);
			}
			return false;
		}
		return true;
	};

	function setDateBody(box, settings) {
		// 日期框
		var calendarBox = document.createElement('table');
		calendarBox.id = settings._$id[0].id + "_calendarBox";
		calendarBox.className = "dataBox";
		calendarBox.cellPadding = "0px";
		calendarBox.cellSpacing = "0px";
		// 添加星期
		calendarBox = addWeekList(settings, calendarBox);
		// 添加日子
		calendarBox = addDayList(settings, calendarBox);

		box.appendChild(calendarBox);
	};

	function getAllMonthDateCount(yearNum, monthNum) {
		monthNum = parseInt(monthNum) + 1;
		monthNum = monthNum.toString();
		var daycount = 31;
		switch(monthNum) {
			case "4":
			case "6":
			case "9":
			case "11":
				daycount = 30;
				break;
			case "2":
				{
					var yy = (yearNum.substring(0, 2) + yearNum) * 1;
					if((yy % 4 == 0 && yy % 100 != 0) || yy % 400 == 0) {
						daycount = 29;
					} else {
						daycount = 28;
					}
				}
				break;
		}

		return daycount;
	};

	function editMonthNum(settings, flg) {
		var str = settings._defaultYear.toString() + "/" + (parseInt(settings._defaultMonth) - 1).toString() + "/1";
		var date = new Date(str);

		return new Date(date.getFullYear(), date.getMonth() + flg, 1);
	};

	function setDate(settings, addYear, addMonth, today) {
		var year = $("#" + settings._$id[0].id + "_NavYearInput").val();
		var month = $("#" + settings._$id[0].id + "_NavMonthInput")[0].name;
		var day = today;
		var hour = ($("#" + settings._$id[0].id + "_hour").val()) ? $("#" + settings._$id[0].id + "_hour").val() : "00";
		var minute = ($("#" + settings._$id[0].id + "_minute").val()) ? $("#" + settings._$id[0].id + "_minute").val() : "00";
		var second = ($("#" + settings._$id[0].id + "_second").val()) ? $("#" + settings._$id[0].id + "_second").val() : "00";
		if(addMonth == 99) {
			month = 0;
			addMonth = 0;
		}
		var tempdate = parseInt(parseInt(year) + addYear) + "-" + parseInt(parseInt(month) + addMonth) + "-" + day + " " + hour + ":" + minute + ":" + second;

		var _selectD = new Date(dataformat(settings, tempdate));
		var _maxD = new Date(dataformat(settings, settings._maxdate));
		var _minD = new Date(dataformat(settings, settings._mindate));
		if(checkDateRange(_selectD, _maxD, _minD, settings)) {
			settings._$id.val(dataformat(settings, tempdate));
			if($("#" + settings._$id[0].id).data("onpicked")) {
				eval($("#" + settings._$id[0].id).data("onpicked")).call($("#" + settings._$id[0].id)[0]);
			}
			$("#dateLayer").remove();
		}
	};

	function checkdayclick(settings, dom, flg) {
		var _year;
		var _month;
		var _day = dom.innerHTML;
		if($("#" + settings._$id[0].id + "_NavYearInput").length > 0) {
			_year = $("#" + settings._$id[0].id + "_NavYearInput").val();
		} else {
			_year = settings._defaultYear;
		}
		if($("#" + settings._$id[0].id + "_NavMonthInput").length > 0) {
			_month = $("#" + settings._$id[0].id + "_NavMonthInput")[0].name;
		} else {
			_month = settings._defaultMonth;
		}
		// 上月
		if(flg == 0) {
			var _testtime = new Date(_year, parseInt(_month) - 1, _day);
			var _mintime = new Date(settings._mindate.split('-')[0], parseInt(settings._mindate.split('-')[1]) - 1, settings._mindate.split('-')[2].split(' ')[0]);
			var _maxtime = new Date(settings._maxdate.split('-')[0], parseInt(settings._maxdate.split('-')[1]) - 1, settings._maxdate.split('-')[2].split(' ')[0]);
			if(_testtime < _mintime || _testtime > _maxtime) {
				dom.className = "disabledDate";
				$(dom).unbind('click');
			}
		} else if(flg == 1) { // 当前
			var _testtime = new Date(_year, _month, _day);
			var _mintime = new Date(settings._mindate.split('-')[0], parseInt(settings._mindate.split('-')[1]) - 1, settings._mindate.split('-')[2].split(' ')[0]);
			var _maxtime = new Date(settings._maxdate.split('-')[0], parseInt(settings._maxdate.split('-')[1]) - 1, settings._maxdate.split('-')[2].split(' ')[0]);
			if(_testtime < _mintime || _testtime > _maxtime) {
				dom.className = "disabledDate";
				$(dom).unbind('click');
			}
		} else { // 下月
			var _testtime = new Date(_year, parseInt(_month) + 1, _day);
			var _mintime = new Date(settings._mindate.split('-')[0], parseInt(settings._mindate.split('-')[1]) - 1, settings._mindate.split('-')[2].split(' ')[0]);
			var _maxtime = new Date(settings._maxdate.split('-')[0], parseInt(settings._maxdate.split('-')[1]) - 1, settings._maxdate.split('-')[2].split(' ')[0]);
			if(_testtime < _mintime || _testtime > _maxtime) {
				dom.className = "disabledDate";
				$(dom).unbind('click');
			}
		}
		return dom;
	}

	function addDayList(settings, calendarBox) {
		$(".wdCalendarTr").remove();
		var fontFlg = true;
		var mydate = new Date(settings._defaultYear, settings._defaultMonth, 1);
		var day = new Array(0, 1, 2, 3, 4, 5, 6)[mydate.getDay()];
		// 一个月共几天
		var addDayCount = 1;
		var daycount = getAllMonthDateCount(settings._defaultYear.toString(), settings._defaultMonth.toString());
		// 获取上个月信息
		var preDaycount = getAllMonthDateCount(settings._defaultYear.toString(), (parseInt(settings._defaultMonth) - 1).toString());
		var tempLastNum = 0;
		for(i = 0; i < 5; i++) {
			var tr = document.createElement('tr');
			tr.className = "wdCalendarTr";
			// 补第一周空信息
			if(i == 0) {
				// 上月信息
				for(j = 0; j < day; j++) {
					var td = document.createElement('td');
					td.id = settings._$id[0].id + "_" + i + "_" + j;
					td.innerHTML = preDaycount - day + j + 1;
					td.style.color = "#eeeeee";
					$(td).bind('click', function() {
						setDate(settings, 0, 0, this.innerHTML);
					})
					td = checkdayclick(settings, td, 0);
					tr.appendChild(td);
				}
				// 当前月第一周处理
				for(j = day; j < 7; j++) {
					var td = document.createElement('td');
					td.id = settings._$id[0].id + "_" + addDayCount;
					td.innerHTML = addDayCount;
					if(settings._defaultDay == addDayCount) {
						td.className = "activeDate";
					}
					addDayCount = addDayCount + 1;
					if(j == 0 || j == 6) {
						td.style.color = "#FF9900";
					}
					$(td).bind('click', function() {
						setDate(settings, 0, 1, this.innerHTML);
					})
					td = checkdayclick(settings, td, 1);
					tr.appendChild(td);
				}
			} else {
				for(j = 0; j < 7; j++) {
					var td = document.createElement('td');
					td.id = settings._$id[0].id + "_" + addDayCount;

					if(addDayCount <= daycount && fontFlg) {
						td.innerHTML = addDayCount;

						if(settings._defaultDay == addDayCount) {
							td.className = "activeDate";
						}
					} else {
						if(fontFlg) {
							td.innerHTML = "1";
							addDayCount = 1;
						} else {
							td.innerHTML = addDayCount;
						}
						tempLastNum = addDayCount;
						fontFlg = false;
						td.className = "wddate_nextyeardate";
						td.style.color = "#eeeeee";
					}
					addDayCount = addDayCount + 1;
					if(j == 0 || j == 6 && fontFlg) {
						td.style.color = "#FF9900";
					}
					$(td).bind('click', function() {
						var month = $("#" + settings._$id[0].id + "_NavMonthInput")[0].name;
						if(this.className == "wddate_nextyeardate") {
							if(parseInt(month) + 1 == 12) {
								setDate(settings, 1, 99, this.innerHTML);
							} else {
								setDate(settings, 0, 2, this.innerHTML);
							}
						} else {
							setDate(settings, 0, 1, this.innerHTML);
						}
					})
					if(td.className == "wddate_nextyeardate") {
						td = checkdayclick(settings, td, 2);
					} else {
						td = checkdayclick(settings, td, 1);
					}
					tr.appendChild(td);
				}
			}

			calendarBox.appendChild(tr);
		}
		// 5行不够再补充
		if(daycount > addDayCount - 1 && addDayCount > 7) {
			fontFlg = true;
			var tr = document.createElement('tr');
			tr.className = "wdCalendarTr";
			for(j = 0; j < 7; j++) {
				var td = document.createElement('td');

				if(addDayCount <= daycount && fontFlg) {
					td.id = settings._$id[0].id + "_" + addDayCount;
					td.innerHTML = addDayCount;
				} else {
					td.id = settings._$id[0].id + "_6_" + j;
					if(fontFlg) {
						td.innerHTML = "1";
						addDayCount = 1;
					} else {
						td.innerHTML = addDayCount;
					}
					fontFlg = false;
					td.className = "wddate_nextyeardate";
					td.style.color = "#eeeeee";
				}
				addDayCount = addDayCount + 1;
				$(td).bind('click', function() {
					var month = $("#" + settings._$id[0].id + "_NavMonthInput")[0].name;
					if(this.className == "wddate_nextyeardate") {
						if(parseInt(month) + 1 == 12) {
							setDate(settings, 1, 99, this.innerHTML);
						} else {
							setDate(settings, 0, 2, this.innerHTML);
						}
					} else {
						setDate(settings, 0, 1, this.innerHTML);
					}
				})
				if(td.className == "wddate_nextyeardate") {
					td = checkdayclick(settings, td, 2);
				} else {
					td = checkdayclick(settings, td, 1);
				}

				tr.appendChild(td);
			}
			calendarBox.appendChild(tr);
		} else {
			var tr = document.createElement('tr');
			tr.className = "wdCalendarTr";
			for(k = 0; k < 7; k++) {
				tempLastNum = tempLastNum + 1;
				var td = document.createElement('td');
				td.id = settings._$id[0].id + "_" + tempLastNum;
				td.innerHTML = tempLastNum;
				td.style.color = "#eeeeee";
				$(td).bind('click', function() {
					var month = $("#" + settings._$id[0].id + "_NavMonthInput")[0].name;
					if(this.className == "wddate_nextyeardate") {
						if(parseInt(month) + 1 == 12) {
							setDate(settings, 1, 99, this.innerHTML);
						}
					} else {
						setDate(settings, 0, 2, this.innerHTML);
					}
				});
				td = checkdayclick(settings, td, 2);
				tr.appendChild(td);
			}
			calendarBox.appendChild(tr);
		}

		return calendarBox;
	};

	function addWeekList(settings, calendarBox) {
		var tr = document.createElement('tr');
		tr.id = settings._$id + "_weekList";
		for(var i = 0; i < 7; i++) {
			var th = document.createElement('th');
			th.style.backgroundColor = "#fafafa";
			th.style.height = "20px";
			th.style.lineHeight = "20px";
			th.style.fontSize = "10px"
			th.style.textAlign = "center";
			th.innerHTML = weekarray[i];
			tr.appendChild(th);
		}
		calendarBox.appendChild(tr);

		return calendarBox;
	};

	function setDateSelectHead(box, settings) {
		var selectbox = document.createElement('div');
		selectbox.className = "selectbox";
		// 跨年（减）
		var NavImgll = document.createElement('a');
		$(NavImgll).bind('click', function() {
			var mindate = new Date(settings._mindate.split('-')[0], settings._mindate.split('-')[1], 1);
			var newdate = new Date(parseInt(settings._defaultYear) - 1, settings._defaultMonth, 1);
			// 处理最小日期限定
			if(newdate >= mindate) {
				settings._defaultYear = parseInt(settings._defaultYear) - 1;
				$("#" + settings._$id[0].id + "_NavYearInput").val(settings._defaultYear);
				var calendarBox = $("#" + settings._$id[0].id + "_calendarBox")[0];
				addDayList(settings, calendarBox);
			} else {
				if(settings._$id.data("dmsg")) {
					alert(settings._$id.data("dmsg"));
				} else {
					alert(span5);
				}
			}
		});
		NavImgll.className = "NavImgll NavImg";
		selectbox.appendChild(NavImgll);

		// 跨月（减）
		var NavImgl = document.createElement('a');
		$(NavImgl).bind('click', function() {
			var mindate = new Date(settings._mindate.split('-')[0], settings._mindate.split('-')[1], 1);
			var newdate = new Date(settings._defaultYear, parseInt(settings._defaultMonth), 1);
			// 处理最小日期限定
			if(newdate >= mindate) {
				// 夸年处理
				if(parseInt(settings._defaultMonth) == 0) {
					settings._defaultMonth = 11;
					$("#" + settings._$id[0].id + "_NavMonthInput").val(settings._monthWordList[11]);
					$("#" + settings._$id[0].id + "_NavMonthInput")[0].name = "11";
					settings._defaultYear = parseInt(settings._defaultYear) - 1;
					$("#" + settings._$id[0].id + "_NavYearInput").val(settings._defaultYear);
				} else {
					settings._defaultMonth = parseInt(settings._defaultMonth) - 1;

					$("#" + settings._$id[0].id + "_NavMonthInput").val(settings._monthWordList[settings._defaultMonth]);
					$("#" + settings._$id[0].id + "_NavMonthInput")[0].name = settings._defaultMonth;

				}
				var calendarBox = $("#" + settings._$id[0].id + "_calendarBox")[0];
				addDayList(settings, calendarBox);
			} else {
				if(settings._$id.data("dmsg")) {
					alert(settings._$id.data("dmsg"));
				} else {
					alert(span5);
				}
			}
		});
		NavImgl.className = "NavImgl NavImg";
		selectbox.appendChild(NavImgl);

		// 月选择
		var NavMonthInput = document.createElement('input');
		NavMonthInput.id = settings._$id[0].id + "_NavMonthInput";
		NavMonthInput.className = "NavMonthInput";
		var date = new Date;
		var month = date.getMonth();
		var year = date.getFullYear();
		// 默认值
		if(settings._$id.val()) {
			NavMonthInput.value = settings._monthWordList[parseInt(settings._$id.val().split('-')[1]) - 1];
			NavMonthInput.name = parseInt(settings._$id.val().split('-')[1]) - 1;
		} else {
			NavMonthInput.value = settings._monthWordList[month];
			NavMonthInput.name = month;
		}
		settings._defaultMonth = NavMonthInput.name;
		$(NavMonthInput).bind('click', function() {
			// 处理年
			$("#" + settings._$id[0].id + "_NavYearInput")[0].classList.remove("NavYearInputClick");
			$("#" + settings._$id[0].id + "_NavYearList").remove();
			// 时间处理
			$("#" + settings._$id[0].id + "_hoursBox").remove();
			$("#" + settings._$id[0].id + "_minutesBox").remove();
			$("#" + settings._$id[0].id + "_secondsBox").remove();
			// 设置点击选择值（数字）
			this.classList.add("NavMonthInputClick");
			for(var i = 0; i < settings._monthWordList.length; i++) {
				if(settings._monthWordList[i] == $(this).val()) {
					$(this).val(i + 1);
					break;
				}
			}

			// 加载选择月列表
			if($("#" + settings._$id[0].id + "_NavMonthList").length == 0) {
				bindMonthListBox(settings, selectbox, this);
			}
		});
		selectbox.appendChild(NavMonthInput);

		// 年选择
		var NavYearInput = document.createElement('input');
		NavYearInput.id = settings._$id[0].id + "_NavYearInput";
		NavYearInput.className = "NavYearInput";
		// 默认值
		if(settings._$id.val()) {
			NavYearInput.value = settings._$id.val().split('-')[0];
		} else {
			NavYearInput.value = year;
		}
		settings._defaultYear = NavYearInput.value;
		$(NavYearInput).bind('click', function() {
			// 处理月
			$("#" + settings._$id[0].id + "_NavMonthList").remove();
			$("#" + settings._$id[0].id + "_NavMonthInput")[0].classList.remove("NavMonthInputClick");

			// 时间处理
			$("#" + settings._$id[0].id + "_hoursBox").remove();
			$("#" + settings._$id[0].id + "_minutesBox").remove();
			$("#" + settings._$id[0].id + "_secondsBox").remove();
			var wordMonth = settings._monthWordList[parseInt($("#" + settings._$id[0].id + "_NavMonthInput").val()) - 1];
			$("#" + settings._$id[0].id + "_NavMonthInput")[0].value = (wordMonth) ? wordMonth : $("#" + settings._$id[0].id + "_NavMonthInput")[0].value;

			this.classList.add("NavYearInputClick");
			// 加载选择年列表
			if($("#" + settings._$id[0].id + "_NavYearList").length == 0) {
				bindYearListBox(settings, selectbox);
			}

		});
		selectbox.appendChild(NavYearInput);

		// 夸年（加）
		var NavImgrr = document.createElement('a');
		$(NavImgrr).bind('click', function() {
			var maxdate = new Date(settings._maxdate.split('-')[0], settings._maxdate.split('-')[1], 1);
			var newdate = new Date(parseInt(settings._defaultYear) + 1, settings._defaultMonth, 1);
			// 处理最大日期限定
			if(newdate <= maxdate) {
				settings._defaultYear = parseInt(settings._defaultYear) + 1;
				$("#" + settings._$id[0].id + "_NavYearInput").val(settings._defaultYear);
				var calendarBox = $("#" + settings._$id[0].id + "_calendarBox")[0];
				addDayList(settings, calendarBox);
			} else {
				if(settings._$id.data("dmsg")) {
					alert(settings._$id.data("dmsg"));
				} else {
					alert(span6);
				}
			}
		});
		NavImgrr.className = "NavImgrr NavImg";
		selectbox.appendChild(NavImgrr);

		// 跨月（加）
		var NavImgr = document.createElement('a');
		$(NavImgr).bind('click', function() {
			var maxdate = new Date(settings._maxdate.split('-')[0], settings._maxdate.split('-')[1], 1);
			var newdate = new Date(settings._defaultYear, parseInt(settings._defaultMonth) + 2, 1);
			// 处理最大日期限定
			if(newdate <= maxdate) {
				// 夸年处理
				if(parseInt(settings._defaultMonth) < 11) {
					settings._defaultMonth = parseInt(settings._defaultMonth) + 1;
					$("#" + settings._$id[0].id + "_NavMonthInput").val(settings._monthWordList[parseInt(settings._defaultMonth)]);
					$("#" + settings._$id[0].id + "_NavMonthInput")[0].name = parseInt(settings._defaultMonth);
				} else {
					settings._defaultMonth = 0;
					settings._defaultYear = parseInt(settings._defaultYear) + 1;

					$("#" + settings._$id[0].id + "_NavMonthInput").val(settings._monthWordList[0]);
					$("#" + settings._$id[0].id + "_NavMonthInput")[0].name = "0";
					$("#" + settings._$id[0].id + "_NavYearInput").val(settings._defaultYear);
				}
				var calendarBox = $("#" + settings._$id[0].id + "_calendarBox")[0];
				addDayList(settings, calendarBox);
			} else {
				if(settings._$id.data("dmsg")) {
					alert(settings._$id.data("dmsg"));
				} else {
					alert(span6);
				}
			}
		});
		NavImgr.className = "NavImgr NavImg";
		selectbox.appendChild(NavImgr);

		box.appendChild(selectbox);
	};

	function bindMonthListBox(settings, selectbox, monthtext) {
		var NavMonthList = document.createElement('div');
		NavMonthList.id = settings._$id[0].id + "_NavMonthList";
		NavMonthList.className = "NavMonthList";
		var tempMonth;
		for(var i = 0; i < settings._monthWordList.length; i++) {
			tempMonth = document.createElement('div');
			tempMonth.className = "tempMonth";
			tempMonth.id = settings._$id[0].id + "_" + i;
			tempMonth.innerHTML = settings._monthWordList[i];
			$(tempMonth).bind('click', function() {
				$(monthtext).val(this.innerHTML);
				$("#" + settings._$id[0].id + "_NavMonthList").remove();
				monthtext.classList.remove("NavMonthInputClick");
				var _mcount = 0;
				for(var i = 0; i < settings._monthWordList.length; i++) {
					if(settings._monthWordList[i] == this.innerHTML) {
						_mcount = i;
						break;
					}
				}
				$(monthtext)[0].name = _mcount;
				settings._defaultMonth = _mcount;
				var calendarBox = $("#" + settings._$id[0].id + "_calendarBox")[0];
				addDayList(settings, calendarBox);
			});
			// 设置初始值
			if(i == parseInt($(monthtext).val()) - 1) {
				tempMonth.style.backgroundColor = "#65A2F3";
			}
			NavMonthList.appendChild(tempMonth);
		}
		selectbox.appendChild(NavMonthList);
	};

	function bindYearList(settings, startyear, tempYearBox) {
		// 选择列表
		var tempYearBox;
		if($("#" + settings._$id[0].id + "_YearBox").length == 0) {
			tempYearBox = document.createElement('div');
			tempYearBox.id = settings._$id[0].id + "_YearBox";
			tempYearBox.style.width = "100%";
		} else {
			tempYearBox = $("#" + settings._$id[0].id + "_YearBox")[0];
			tempYearBox.innerHTML = "";
		}
		var minyear = parseInt(settings._mindate.split('-')[0]);
		var maxyear = parseInt(settings._maxdate.split('-')[0]);
		var yearbox = $("#" + settings._$id[0].id + "_NavYearInput")[0]
		var lastYear;
		var lastCount = 0;
		for(var i = 0; i < 10; i++) {
			var newyear = startyear + i;
			if(minyear <= newyear && maxyear >= newyear) {
				tempYear = document.createElement('div');
				tempYear.className = "tempYear";
				tempYear.innerHTML = newyear;
				lastYear = newyear;
				lastCount = lastCount + 1;
				// 设置初始值
				if(newyear == $(yearbox).val()) {
					tempYear.style.backgroundColor = "#65A2F3";
				}
				$(tempYear).bind('click', function() {
					$(yearbox).val(this.innerHTML);
					$("#" + settings._$id[0].id + "_NavYearList")[0].remove();
					yearbox.classList.remove("NavYearInputClick");
				});
				tempYearBox.appendChild(tempYear);
			}
		}
		// 补充年
		var itemp = 1;
		if(lastCount < 10 && maxyear > lastYear) {
			for(var i = lastCount; i < 10; i++) {
				var newyear = parseInt(lastYear) + itemp;
				itemp = itemp + 1;
				if(minyear <= newyear && maxyear >= newyear) {
					tempYear = document.createElement('div');
					tempYear.className = "tempYear";
					tempYear.innerHTML = newyear;
					// 设置初始值
					if(newyear == $(yearbox).val()) {
						tempYear.style.backgroundColor = "#65A2F3";
					}
					$(tempYear).bind('click', function() {
						$(yearbox).val(this.innerHTML);
						$("#" + settings._$id[0].id + "_NavYearList").remove();
						yearbox.classList.remove("NavYearInputClick");
					});
					tempYearBox.appendChild(tempYear);
				}
			}
		}

		return tempYearBox;
	}

	function bindYearListBox(settings, selectbox) {
		var NavYearList = document.createElement('div');
		NavYearList.className = "NavYearList";
		NavYearList.id = settings._$id[0].id + "_NavYearList";
		var tempYear;
		// 绑定年列表
		NavYearList.appendChild(bindYearList(settings, parseInt(settings._defaultYear) - 5));

		// 翻页区域
		var tempYearSelectBox = document.createElement('div');
		tempYearSelectBox.className = "yearSelectBox";
		// 上一批年
		var spanleftyear = document.createElement('span');
		$(spanleftyear).bind('click', function() {
			var firstYear = $("#" + settings._$id[0].id + "_YearBox")[0].firstChild.innerHTML;
			NavYearList.appendChild(bindYearList(settings, parseInt(firstYear) - 10));
		});
		spanleftyear.innerHTML = "←";
		tempYearSelectBox.appendChild(spanleftyear);
		// 关闭年选择区
		var spancloseyear = document.createElement('span');
		spancloseyear.innerHTML = "×";
		$(spancloseyear).bind('click', function() {
			$("#" + settings._$id[0].id + "_NavYearList").remove();
			$("#" + settings._$id[0].id + "_NavYearInput")[0].classList.remove("NavYearInputClick");
		});
		tempYearSelectBox.appendChild(spancloseyear);
		// 下一批年
		var spanrightyear = document.createElement('span');
		$(spanrightyear).bind('click', function() {
			var firstYear = $("#" + settings._$id[0].id + "_YearBox")[0].lastChild.innerHTML;
			NavYearList.appendChild(bindYearList(settings, parseInt(firstYear) + 1));
		});
		spanrightyear.innerHTML = "→";
		tempYearSelectBox.appendChild(spanrightyear);

		NavYearList.appendChild(tempYearSelectBox);

		selectbox.appendChild(NavYearList);
	}

	// 下拉框定位
	function setLocate(obj, tarDom) {
		var thei = obj.height(); //控件本身的高
		var twid = obj.width(); //控件本身的宽
		var ttop = obj[0].getBoundingClientRect().bottom; //控件的定位点高

		var tleft = $(obj).offset().left; //obj[0].offsetLeft; //控件的定位点宽

		var A = $('html')[0];
		var _ = $('body')[0];
		var B = (A && A.scrollTop != null && (A.scrollTop > _.scrollTop || A.scrollLeft > _.scrollLeft)) ? A : _;
		ttop = ttop + B.scrollTop;
		var winWidth = document.body.clientWidth;
		var winHeight = $(document).height();
		dmLayerWidth = 200;
		dmLayerHeight = tarDom.height();

		//靠近右边窗口时,代码列表在左边展现
		if((tleft + dmLayerWidth + 15) < winWidth || tleft + twid - dmLayerWidth + 7 < 0) {
			tarDom.css("left", tleft);
		} else {
			tarDom.css("left", tleft + twid - dmLayerWidth + 7);
		}
		//靠近窗口底边时,代码列表在上边展现
		if(ttop + thei + dmLayerHeight + 10 < winHeight || ttop - dmLayerHeight - 1 < 0) {
			tarDom.css("top", ttop);
		} else {
			tarDom.css("top", ttop - dmLayerHeight - 2 - thei);
		}
	}
})(jQuery);

function wddatebox(obj) {
	if(!$(obj)[0] || !$(obj)[0].parentNode) {
		return false;
	}
	if($(obj)[0].className.indexOf("dateLayerWrapper") != -1 ||
		$(obj)[0].className.indexOf("NavMonthList") != -1 ||
		$(obj)[0].className.indexOf("NavYearList") != -1 ||
		$(obj)[0].className.indexOf("tempYear") != -1 ||
		$(obj)[0].className.indexOf("tempMonth") != -1 ||
		($(obj)[0].parentNode && ($(obj)[0].parentNode.className.indexOf("hoursBox") != -1 ||
			$(obj)[0].parentNode.className.indexOf("minutesBox") != -1 ||
			$(obj)[0].parentNode.className.indexOf("secondsBox") != -1))) {
		return true;
	}
	if($(obj)[0].parentNode.nodeName.toUpperCase() != "BODY" && $(obj)[0].parentNode.className.indexOf("dateLayerWrapper") == -1) {
		return wddatebox($(obj)[0].parentNode);
	} else if($(obj)[0].parentNode.nodeName.toUpperCase() == "BODY" && $(obj)[0].parentNode.className.indexOf("dateLayerWrapper") == -1) {
		return false;
	} else {
		return true;
	}
};

function closeDateEW(event) {
	var obj = $(event.target);
	if(!obj.attr('class') || obj.attr('class').indexOf('Wdate') == -1) {
		if(!wddatebox(obj)) {
			if($("#dateLayer").is(':visible')) {
				$("#dateLayer").hide();
			}
		}
	}
}