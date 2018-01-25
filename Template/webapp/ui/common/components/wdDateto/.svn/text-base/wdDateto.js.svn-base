(function() {
	$(".WdDateto").bind("focus", function() {
		$(this).attr("readonly",true);
		$("#datatoLayer").remove();
		initDatetoLayer($(this));
	});
	$(".WdDateto").bind("click", function() {
		$(this).attr("readonly",true);
		$("#datatoLayer").remove();
		initDatetoLayer($(this));
	});

	function initDatetoLayer(_wdDateto) {
		var $, Calendar, DAYS, DateRangePicker, MONTHS, TEMPLATE;

		$ = jQuery;

		DAYS = ['日', '一', '二', '三', '四', '五', '六']; //星期

		MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']; //月份

		TEMPLATE = " <div class=\"drp-popup\" id=\"datatoLayer\"><div class=\"drp-calendars\"><div class=\"drp-calendar drp-calendar-start\"><div class=\"drp-month-picker\"><div class=\"drp-allarrow\"></div><div class=\"drp-arrow\"></div><div class=\"drp-month-title\"><div><ul></ul><input type=\"text\" class=\"yninput\"/></div><div><ul></ul><input type=\"text\" class=\"yninput\"/></div></div><div class=\"drp-arrow drp-arrow-right\"></div><div class=\"drp-allarrow drp-allarrow-right\"></div></div><ul class=\"drp-day-headers\"></ul><ul class=\"drp-days\"></ul><div class=\"drp-calendar-date\"><span>开始时间：</span><label></label></div></div><div class=\"drp-calendar-separator\"><span>至</span><input type=\"button\" class=\"hp-wdDateto-confirm\" value=\"确定\"><input type=\"button\" class=\"hp-wdDateto-clear\" value=\"清空\"></div><div class=\"drp-calendar drp-calendar-end\"><div class=\"drp-month-picker\"><div class=\"drp-allarrow\"></div><div class=\"drp-arrow\"></div><div class=\"drp-month-title\"><div><ul></ul><input type=\"text\" class=\"yninput\"/></div><div><ul></ul><input type=\"text\" class=\"yninput\"/></div></div><div class=\"drp-arrow drp-arrow-right\"></div><div class=\"drp-allarrow drp-allarrow-right\"></div></div><ul class=\"drp-day-headers\"></ul><ul class=\"drp-days\"></ul><div class=\"drp-calendar-date\"><span>结束时间：</span><label></label></div></div></div><div class=\"drp-tip\"></div></div>";

		DateRangePicker = (function() {
			function DateRangePicker() {
				this.$select = _wdDateto;
				this.$dateRangePicker = $(TEMPLATE);
				$(document.body).append(this.$dateRangePicker);
				var _wdDatetoBottom = $(window).height() - _wdDateto.height()-_wdDateto.offset().top+$(document).scrollTop();
				var _wdDatetoRight = $(window).width() -_wdDateto.offset().left+$(document).scrollLeft(); 
				var offsetObject = _wdDateto.offset();
				var _top = _top = parseInt(offsetObject.top + _wdDateto[0].offsetHeight);
				var _left = "";
				/*if(_wdDatetoBottom<262){
					_top = parseInt(offsetObject.top - 262 - _wdDateto[0].offsetHeight);
				}else{
					_top = parseInt(offsetObject.top + _wdDateto[0].offsetHeight);
				}*/
				var wdDateLayerWidth = this.$dateRangePicker[0].offsetWidth;
				if(_wdDatetoRight<wdDateLayerWidth){
					_left = offsetObject.left - wdDateLayerWidth + _wdDateto[0].offsetWidth;
					this.$dateRangePicker.find(".drp-tip").css("right", 60);
				}else{
					_left = offsetObject.left;
				}
				$(".drp-popup").css("left", _left);
				$(".drp-popup").css("top", _top);
				//日期区域点击任意区域关闭月份、年份选择区域
				$("#datatoLayer").bind("click", function(e) {
					if ($(e.target).is(".yninputfocus") || $(e.target).is(".drpspanfocus")) {} else {
						$(".drp-month-title ul").hide();
						$(".drp-month-title input").removeClass("yninputfocus").addClass("yninput");
					}
				});
				
				$(".drp-calendar-separator input:last").bind("click", function() {
					_wdDateto.val("");
					$("#datatoLayer").remove();
					if (_wdDateto.attr("clearinput") !== null && _wdDateto.attr("clearinput") !== undefined) {
						eval(_wdDateto.attr("clearinput")).call();
					}
				});

				/*if($(evt.target).is("#datatoLayer"){
		      		if($(evt.target).not(".yninputfocus")){
			      		$(".drp-month-title ul").hide();
			      		$(".drp-month-title input").removeClass("yninputfocus").addClass("yninput");
			      	}	
		      	}*/
				this.isHidden = true;
				//  this.customOptionIndex = this.$select[0].length - 1;
				this.initBindings();
				//设置时间
				this.setRange(this.$select.val());
			}

			DateRangePicker.prototype.initBindings = function() {
				var self;
				self = this;
				/*this.$select.on('focus mousedown', function(e) {
				  var $select;
				  $select = this;
				  setTimeout(function() {
				    return $select.blur();
				  }, 0);
				  return false;
				});*/
				this.$dateRangePicker.click(function(evt) {
					return evt.stopPropagation();
				});
				$(document.body).click(function(evt) {
					if ($(evt.target).is("#datatoLayer") || $(evt.target).parents().is("#datatoLayer") || $(evt.target).is(".WdDateto")) {
						if ($("#datatoLayer").length < 1) {
							//	$(evt.target).focus();
						}
					} else {
						$("#datatoLayer").remove();
					}
				});
				/*$('body').click(function(evt) {
				  if (evt.target === self.$select[0] && self.isHidden) {
				    return self.show();
				  } else if (!self.isHidden) {
				   // return self.hide();
				  }
				});*/
				/*this.$select.children().each(function() {
				  return self.$dateRangePicker.find('.drp-timeline-presets').append($("<li class='" + ((this.selected && 'drp-selected') || '') + "'>" + ($(this).text()) + "<div class='drp-button'></div></li>"));
				});*/
				/*return this.$dateRangePicker.find('.drp-timeline-presets li').click(function(evt) {
				  var presetIndex;
				  $(this).addClass('drp-selected').siblings().removeClass('drp-selected');
				  presetIndex = $(this).index();
				  self.$select[0].selectedIndex = presetIndex;
				  self.setRange(self.$select.val());
				  if (presetIndex === self.customOptionIndex) {
				    return self.showCustomDate();
				  }
				});*/
				//点击确定清除日期区域
				$(".drp-calendar-separator input:first").bind("click", function() {
					$("#datatoLayer").remove();
					var dateRangePickervalue = self.$select.val(); //当前日期输入框的值
					var dataobj = {
						"startDate":self.formatDate(self.startDate()),
						"endDate":self.formatDate(self.endDate()),
					};
					self.showCustomDate();
					/*if(self.$select.val() == ""){*/
						if (self.$select.attr("confirmdate") !== null && self.$select.attr("confirmdate") !== undefined) {
							eval(self.$select.attr("confirmdate")).call('',JSON.stringify(dataobj));
						}else if (self.$select.attr("datochanged") !== null && self.$select.attr("datochanged") !== undefined) {
							if(dateRangePickervalue == ""){
								eval(self.$select.attr("datochanged")).call('',self.showCustomDate());
							}
						}
					/*}*/
				});
			};

			DateRangePicker.prototype.hide = function() {
				this.isHidden = true;
				return this.$dateRangePicker.hide();
			};

			DateRangePicker.prototype.show = function() {
				this.isHidden = false;
				return this.$dateRangePicker.show();
			};

			/*DateRangePicker.prototype.showCustomDate = function() {
			  var text;
			  this.$dateRangePicker.find('.drp-timeline-presets li:last-child').addClass('drp-selected').siblings().removeClass('drp-selected');
			  text = this.formatDate(this.startDate()) + ' - ' + this.formatDate(this.endDate());
			  this.$select.find('option:last-child').text(text);
			  return this.$select[0].selectedIndex = this.customOptionIndex;
			};*/
			//选择时间后在input框中显示
			DateRangePicker.prototype.showCustomDate = function() {
				var text;
				text = this.formatDate(this.startDate()) + ' - ' + this.formatDate(this.endDate());
				this.$select.val(text);
				return text;
			};
			//日期显示格式
			DateRangePicker.prototype.formatDate = function(d) {
				var wd_month = d.getMonth() + 1;
				var wd_data = d.getDate();
				if (wd_month < 10) {
					wd_month = '0' + wd_month;
				}
				if (wd_data < 10) {
					wd_data = '0' + wd_data;
				}
				return "" + (d.getFullYear().toString().substr(0, 4)) + "/" + (wd_month) + "/" + (wd_data);
			};
			//设置时间
			DateRangePicker.prototype.setRange = function(daysAgo) {
				var endDate, startDate;
				/* if (isNaN(daysAgo)) {
				   return false;
				 }*/
				if (daysAgo) {
					daysAgo = daysAgo.split('-');
					endDate = new Date(daysAgo[1]);
					startDate = new Date(daysAgo[0]);
				} else {
					endDate = new Date();
					startDate = new Date();
					startDate.setDate(endDate.getDate());
					var min_time = this.$select.attr("min-time");
					if(min_time){
						var min_timeList = min_time.split("-");
						if(startDate < new Date(min_timeList[0],parseInt(min_timeList[1])-1,min_timeList[2])){
							endDate = new Date(min_timeList[0],parseInt(min_timeList[1])-1,min_timeList[2]);
							startDate = new Date(min_timeList[0],parseInt(min_timeList[1])-1,min_timeList[2]);
							startDate.setDate(new Date(min_timeList[0],parseInt(min_timeList[1])-1,min_timeList[2]).getDate());
						}
					}
				}
				/*daysAgo -= 1;
				endDate = new Date();
				startDate = new Date();
				startDate.setDate(endDate.getDate() - daysAgo);*/
				this.startCalendar = new Calendar(this, this.$dateRangePicker.find('.drp-calendar:first-child'), startDate, true);
				this.endCalendar = new Calendar(this, this.$dateRangePicker.find('.drp-calendar:last-child'), endDate, false);
				return this.draw();
			};
			//设置结束时间
			DateRangePicker.prototype.endDate = function() {
				return this.endCalendar.date;
			};
			//设置开始时间
			DateRangePicker.prototype.startDate = function() {
				return this.startCalendar.date;
			};
			
			DateRangePicker.prototype.draw = function() {
				this.startCalendar.draw();
				return this.endCalendar.draw();
			};

			return DateRangePicker;
		})();

		Calendar = (function() {
			function Calendar(dateRangePicker, $calendar, date, isStartCalendar) {
				var self;
				this.dateRangePicker = dateRangePicker;
				this.$calendar = $calendar;
				this.date = date;
				this.isStartCalendar = isStartCalendar;
				self = this;
				this.date.setHours(0, 0, 0, 0);
				this._visibleMonth = this.month();
				this._visibleYear = this.year();
				//  this.$title = this.$calendar.find('.drp-month-title');
				this.$titlemonth = this.$calendar.find('.drp-month-title>div:first');
				this.$titleyear = this.$calendar.find('.drp-month-title>div:last');
				this.$dayHeaders = this.$calendar.find('.drp-day-headers');
				this.$days = this.$calendar.find('.drp-days');
				this.$dateDisplay = this.$calendar.find('.drp-calendar-date').find('label');
				
				//上一月下一月切换
				$calendar.find('.drp-arrow').click(function(evt) {
					if ($(this).hasClass('drp-arrow-right')) {
						self.showNextMonth();
					} else {
						self.showPreviousMonth();
					}
					return false;
				});
				//上一年下一年切换
				$calendar.find('.drp-allarrow').click(function(evt) {
					if ($(this).hasClass('drp-allarrow-right')) {
						self.showNextYear();
					} else {
						self.showPreviousYear();
					}
					return false;
				});
				//月份点击选择月份
				this.$titlemonth.find("input").click(function() {
					var _titlemonthul = $(this).prev("ul");
					if (_titlemonthul.innerHTML) {} else {
						$(".drp-month-title ul").html("");
						$(".drp-month-title ul").hide();
						$(".drp-month-title input").removeClass("yninputfocus").addClass("yninput");
						$(this).removeClass("yninput").addClass("yninputfocus");
						var _newHtml = "";
						for (var _i = 0; _i < MONTHS.length; _i++) {
							_newHtml += "<li id=\"" + parseInt(_i + 1) + "\">" + MONTHS[_i].substring(0, 2) + "</li>";
						}
						_titlemonthul.html(_newHtml);
						_titlemonthul.show();
						$(".drp-month-title ul li").bind("click", function() {
							// 	$(this).parent().next("input").val($(this)[0].innerText);
							$(this).parent().hide();
							$(this).parent().next("input").removeClass("yninputfocus").addClass("yninput");
							self._visibleMonth = parseInt($(this)[0].id);
							return self.draw();
						});
					}
				});
				//年份点击选择年份
				this.$titleyear.find("input").click(function() {
					var _titlemonthul = $(this).prev("ul");
					if (_titlemonthul.innerHTML) {} else {
						$(".drp-month-title ul").html("");
						$(".drp-month-title ul").hide();
						var _yearvalue = $(this)[0].value;
						$(".drp-month-title input").removeClass("yninputfocus").addClass("yninput");
						$(this).removeClass("yninput").addClass("yninputfocus");
						var _newHtml = "";
						for (var _i = -5; _i < 5; _i++) {
							_newHtml += "<li class=\"drpyearli\">" + parseInt(parseInt(_yearvalue) + _i) + "</li>";
						}
						_newHtml += "<li class=\"drp-year-cz\"><span id=\"drp-year-left\" class=\"drpspanfocus\">←</span><span>×</span><span id=\"drp-year-right\" class=\"drpspanfocus\">→</span></li>";
						_titlemonthul.html(_newHtml);
						_titlemonthul.show();
						_titleyearfunc(_titlemonthul);
					}
				});
				//年份选择区域上下翻页点击事件
				function _titleyearfunc(_titlemonthul) {
					$(".drp-month-title ul .drpyearli").bind("click", function() {
						$(this).parent().hide();
						$(this).parent().next("input").removeClass("yninputfocus").addClass("yninput");
						self._visibleYear = parseInt($(this)[0].innerText);
						return self.draw();
					});
					$(".drp-month-title ul #drp-year-left").bind("click", function() {
						var _yearvalue = $(this).parent().parent().children(":first")[0].innerText;
						var _newHtml = "";
						for (var _i = -10; _i < 0; _i++) {
							_newHtml += "<li class=\"drpyearli\">" + parseInt(parseInt(_yearvalue) + _i) + "</li>";
						}
						_newHtml += "<li class=\"drp-year-cz\"><span id=\"drp-year-left\" class=\"drpspanfocus\">←</span><span>×</span><span id=\"drp-year-right\" class=\"drpspanfocus\">→</span></li>";
						_titlemonthul.html(_newHtml);
						_titleyearfunc(_titlemonthul);
					});
					$(".drp-month-title ul #drp-year-right").bind("click", function() {
						var _yearvalue = $(this).parent().parent().children(":first")[0].innerText;
						var _newHtml = "";
						for (var _i = 10; _i < 20; _i++) {
							_newHtml += "<li class=\"drpyearli\">" + parseInt(parseInt(_yearvalue) + _i) + "</li>";
						}
						_newHtml += "<li class=\"drp-year-cz\"><span id=\"drp-year-left\" class=\"drpspanfocus\">←</span><span>×</span><span id=\"drp-year-right\" class=\"drpspanfocus\">→</span></li>";
						_titlemonthul.html(_newHtml);
						_titleyearfunc(_titlemonthul);
					});
				}
			}
			//上一个月
			Calendar.prototype.showPreviousMonth = function() {
				if (this._visibleMonth == 1) {
					this._visibleMonth = 12;
					this._visibleYear -= 1;
				} else {
					this._visibleMonth -= 1;
				}
				return this.draw();
			};
			//下一个月
			Calendar.prototype.showNextMonth = function() {
				if (this._visibleMonth === 12) {
					this._visibleMonth = 1;
					this._visibleYear += 1;
				} else {
					this._visibleMonth += 1;
				}
				return this.draw();
			};
			//上一年
			Calendar.prototype.showPreviousYear = function() {
				this._visibleYear -= 1;
				return this.draw();
			};
			//下一年
			Calendar.prototype.showNextYear = function() {
				this._visibleYear += 1;
				return this.draw();
			};
			Calendar.prototype.setDay = function(day) {
				this.setDate(this.visibleYear(), this.visibleMonth(), day);
				return this.dateRangePicker.showCustomDate();
			};
			Calendar.prototype.setDate = function(year, month, day) {
				this.date = new Date(year, month - 1, day);
				return this.dateRangePicker.draw();
			};
			//月份里的天数排列顺序和位置更新
			Calendar.prototype.draw = function() {
				var day, _i, _len;
				this.$dayHeaders.empty();
				this.$titlemonth.find("input").val(this.nameOfMonth(this.visibleMonth()));
				this.$titleyear.find("input").val(this.visibleYear());
				//  this.$title.text("" + (this.nameOfMonth(this.visibleMonth())) + " " + (this.visibleYear()));
				for (_i = 0, _len = DAYS.length; _i < _len; _i++) {
					day = DAYS[_i];
					this.$dayHeaders.append($("<li>" + (day.substr(0, 2)) + "</li>"));
				}
				this.drawDateDisplay();
				return this.drawDays();
			};
			Calendar.prototype.dateIsSelected = function(date) {
				return date.getTime() === this.date.getTime();
			};

			Calendar.prototype.dateIsInRange = function(date) {
				return date >= this.dateRangePicker.startDate() && date <= this.dateRangePicker.endDate();
			};

			Calendar.prototype.dayClass = function(day, firstDayOfMonth, lastDayOfMonth) {
				var classes, date;
				date = new Date(this.visibleYear(), this.visibleMonth() - 1, day);
				classes = '';
				if (this.dateIsSelected(date)) {
					classes = 'drp-day-selected';
				} else if (this.dateIsInRange(date)) {
					classes = 'drp-day-in-range';
					if (date.getTime() === this.dateRangePicker.endDate().getTime()) {
						classes += ' drp-day-last-in-range';
					}
				} else if (this.isStartCalendar) {
					var min_time = this.dateRangePicker.$select.attr("min-time");
					if(min_time){
						var min_timeList = min_time.split("-");
						if(date < new Date(min_timeList[0],parseInt(min_timeList[1])-1,min_timeList[2])){
							classes += ' drp-day-disabled';
						}
					}
					if (date > this.dateRangePicker.endDate()) {
						classes += ' drp-day-disabled';
					}
				} else{
					var max_time = this.dateRangePicker.$select.attr("max-time");
					if(max_time){
						if(date > new Date(max_time)){
							classes += ' drp-day-disabled';
						}
					}
					if (date < this.dateRangePicker.startDate()) {
						classes += ' drp-day-disabled';
					}
				}
				if ((day + firstDayOfMonth - 1) % 7 === 0 || day === lastDayOfMonth) {
					classes += ' drp-day-last-in-row';
				}
				return classes;
			};

			Calendar.prototype.drawDays = function() {
				var firstDayOfMonth, i, lastDayOfMonth, self, _i, _j, _ref;
				self = this;
				this.$days.empty();
				firstDayOfMonth = this.firstDayOfMonth(this.visibleMonth(), this.visibleYear());
				lastDayOfMonth = this.daysInMonth(this.visibleMonth(), this.visibleYear());
				for (i = _i = 1, _ref = firstDayOfMonth - 1; _i <= _ref; i = _i += 1) {
					this.$days.append($("<li class='drp-day drp-day-empty'></li>"));
				}
				for (i = _j = 1; _j <= lastDayOfMonth; i = _j += 1) {
					this.$days.append($("<li class='drp-day " + (this.dayClass(i, firstDayOfMonth, lastDayOfMonth)) + "'>" + i + "</li>"));
				}
				return this.$calendar.find('.drp-day').click(function(evt) {
					var day;
					if ($(this).hasClass('drp-day-disabled')) {
						return false;
					}
					day = parseInt($(this).text(), 10);
					if (isNaN(day)) {
						return false;
					}
					var dateRangePickervalueodd = self.dateRangePicker.$select.val(); //当前日期输入框的值odd
					if (self.dateRangePicker.$select.attr("datochanged") !== null && self.dateRangePicker.$select.attr("datochanged") !== undefined) {
						self.setDay(day);
						var dateRangePickervaluenew = self.dateRangePicker.$select.val(); //当前日期输入框的值new
						if(dateRangePickervaluenew != dateRangePickervalueodd){
							eval(self.dateRangePicker.$select.attr("datochanged")).call('',self.dateRangePicker.showCustomDate());
						}
					}
					return self.setDay(day);
				});
			};

			Calendar.prototype.drawDateDisplay = function() {
				return this.$dateDisplay.text(this.dateRangePicker.formatDate(this.date));
			};

			Calendar.prototype.month = function() {
				return this.date.getMonth() + 1;
			};

			Calendar.prototype.day = function() {
				return this.date.getDate();
			};

			Calendar.prototype.dayOfWeek = function() {
				return this.date.getDay() + 1;
			};

			Calendar.prototype.year = function() {
				return this.date.getFullYear();
			};

			Calendar.prototype.visibleMonth = function() {
				return this._visibleMonth;
			};

			Calendar.prototype.visibleYear = function() {
				return this._visibleYear;
			};

			Calendar.prototype.nameOfMonth = function(month) {
				return MONTHS[month - 1];
			};

			Calendar.prototype.firstDayOfMonth = function(month, year) {
				return new Date(year, month - 1, 1).getDay() + 1;
			};

			Calendar.prototype.daysInMonth = function(month, year) {
				month || (month = this.visibleMonth());
				year || (year = this.visibleYear());
				return new Date(year, month, 0).getDate();
			};

			return Calendar;

		})();
		$.fn.dateRangePicker = function() {
			return new DateRangePicker(this);
		};
		$('.WdDateto').dateRangePicker();
	}
	$.fn.loadwdDateto= function(){
		$(".WdDateto").bind("focus", function() {
			$(this).attr("readonly",true);
			$("#datatoLayer").remove();
			initDatetoLayer($(this));
		});
		$(".WdDateto").bind("click", function() {
			$(this).attr("readonly",true);
			$("#datatoLayer").remove();
			initDatetoLayer($(this));
		});
	}
})();
function loadwdDateto(){
	$('.WdDateto').loadwdDateto();
}
