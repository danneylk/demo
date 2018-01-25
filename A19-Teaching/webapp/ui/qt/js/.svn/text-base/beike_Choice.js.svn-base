/////【001】学科选择
SubjectChoise()
function SubjectChoise(){
var bookCatalog=book();
//图书目录
//学科 Subject 
//版本 Edition
//年级 Grade
//教材 Material
//[01]学科重写
var Subject_html="";//学科重写
$.each(bookCatalog, function(index,item) {
Subject_html +='<li>'+item.Subject+'</li>'	
});
$(".Subject").append(Subject_html);//学科重写

//[02]学科控制版本
$("body").on("click",".Subject li",function(){
	var Edition_html=""//版本重写
	var index=$(this).index();//学科索引
	var EditionLength=bookCatalog[index].Edition.length//版本长度
	//同步学科索引到子目录
	$(".Subject").attr('data',index)
	$(".Edition").attr('data',index)
	$(".Grade").attr('data',index)
	$(".Material").attr('data',index)
	//添加样式
	$(this).addClass('active').siblings().removeClass('active');
	//清空年级和教材
	$(".Grade").children().remove();
	$(".Material").children().remove()
	for (var i=0;i<EditionLength;i++){
		Edition_html+='<li>'+bookCatalog[index].Edition[i].name+'</li>'	
	}
		$(".Edition").html(Edition_html);//版本重写
		
})
//[03]版本控制年级
$("body").on("click",".Edition li",function(){
	//清 空教材
	$(".Material").children().remove()
	var Grade_html="";//年级重写
	var index=$(this).index();//版本索引
	var dataIndex=$(this).parent().attr('data');//学科目录索引
	var GradeLength=bookCatalog[dataIndex].Edition[index].submenu.length;//年级长度
	//添加样式
	$(this).addClass('active').siblings().removeClass('active');
	$(".Grade").attr('data-grade',index)//年级添加版本索引
for( var i=0;i<GradeLength;i++){
		Grade_html +='<li>'+bookCatalog[dataIndex].Edition[index].submenu[i].name+'</li>'
}
$(".Grade").html(Grade_html);//年级重写
})
//[04]年级控制教材
$("body").on("click",".Grade li",function(){
	var Material_html="";//教材重写
	var index=$(this).index();//年级索引
	var dataIndex=$(this).parent().attr('data');//学科目录索引
	var EditionIndex=$(this).parent().attr('data-grade');//获取版本索引
	var MaterialLength=bookCatalog[dataIndex].Edition[EditionIndex].submenu[index].submenu.length;//年级长度
	//添加样式
	$(this).addClass('active').siblings().removeClass('active');
//  console.log(bookCatalog[dataIndex].Edition[EditionIndex].submenu[index].submenu.length)   

    for( var i=0;i<MaterialLength;i++){
    	var Material_IDName=bookCatalog[dataIndex].Edition[EditionIndex].submenu[index].submenu[i].MaterialID;//获取教材id
    	
		Material_html +='<li data="'+Material_IDName+'">'+bookCatalog[dataIndex].Edition[EditionIndex].submenu[index].submenu[i].name+'</li>'
    }   
$(".Material").html(Material_html);//教材重写
})
//[05]教材添加样式
$("body").on("click",".Material li",function(){
	var Material_id_name=$(this).attr('data');//获取教材id
	GetMaterialId(Material_id_name)//传递教材id
	var This_Name=$(this).html();
	$("#jiaocai_mulu").html(This_Name)//重写教材目录选择
	$("#jiaocai_mulu").removeClass().addClass(Material_id_name)//添加id到教材展示选择目录
	var index_name=$("#jiaocai_selected li")
	var This_Name_html='<li data="'+Material_id_name +'"'+'class="'+Material_id_name+'">'+This_Name+'</li>' //重写教材目录选择下拉框
	//避免重复添加
	if(index_name.hasClass(Material_id_name)){	
		alert("已添加")
	}else{
			
	$("#jiaocai_selected").append(This_Name_html)
	}
	//添加样式
	$(this).addClass('active').siblings().removeClass('active');
})
}


////////教材下拉选择
////////////////////////////////////////////////
$(function() {
	var Numberh = 1;
	$("#jiaocai_mulu").on("click", function() {
		if(Numberh == 1) {
			$("#jiaocai_selected").slideDown()
			Numberh = 2;
		} else if(Numberh == 2) {		
	$("#jiaocai_selected").slideUp()
Numberh = 1
}
})

$("body").on("click","#jiaocai_selected li",function(){
	var this_html=$(this).html()
	var attr_class=$(this).attr('class');
	$("#jiaocai_mulu").html(this_html)
	$("#jiaocai_mulu").removeClass().addClass(attr_class)//添加id到教材展示选择目录
	$("#jiaocai_selected").slideUp()
	Numberh = 1
})
})

//获取教材id
function GetMaterialId(Material_id_name){
	console.log(Material_id_name)
}
//教材目录重写
$("#jiaocai_selected").on("click","li",function(){
var MaterialId=$(this).attr('data')
Catalog(MaterialId)
})

//【06】生成目录结构//目录结构收缩效果
function  Catalog(mulu){
	     var jiaocaimulu=GetTextMenu(mulu)
		if($(".Material_count").hasClass('sliding-menu')){
		$(".Material_count").removeClass('sliding-menu')
		}
		new AccordionMenu({menuArrs:jiaocaimulu});//创建目录结构/textMenu.js
		                $('#menu').menu();//目录结构滑动///textMenu-sliding.js
}
////////目录选择样式添加
$("#munu  li ").on("click", function() {
$(this).addClass('active').parent().siblings().find('li').removeClass('active')
})

////【06-01】
//<!--选择目录[目录创建]-->
//shouke-textmunu.js
function AccordionMenu(options) {
    this.config = {
        containerCls        : '.Material_count',                // 外层容器
        menuArrs            :  ''                       //  JSON传进来的数据
    };
    this.cache = {
    };
    this.init(options);
 }
 AccordionMenu.prototype = {
    constructor: AccordionMenu,
    init: function(options){
        this.config = $.extend(this.config,options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;

        // 渲染html结构
        $(_config.containerCls).each(function(index,item){
            self._renderHTML(item);
        });
    },
    _renderHTML: function(container){
        var self = this,
            _config = self.config,
            _cache = self.cache;
        var ulhtml = $('<ul></ul>');
        $(_config.menuArrs).each(function(index,item){     	       
            var lihtml = $('<li><a>'+item.name+'</a></li>');
            if(item.submenu && item.submenu.length > 0) {
                self._createSubMenu(item.submenu,lihtml);
            }
            $(ulhtml).append(lihtml);   
//          console.log(ulhtml)
        });
        $(container).html();
        $(container).html(ulhtml);
  
    },
    /**
     * 创建子菜单
     * @param {array} 子菜单
     * @param {lihtml} li项
     */
    _createSubMenu: function(submenu,lihtml){
        var self = this,
            _config = self.config,
            _cache = self.cache;
        var subUl = $('<ul></ul>'),
            callee = arguments.callee,
            subLi;
        $(submenu).each(function(index,item){
            var url = item.url || 'javascript:void(0)';
            if(item.kejianID){
            	subLi = $('<li'+' '+'id="'+item.kejianID+'"><a href="'+url+'">'+item.name+'</a></li>');
//subLi = $('<li onclick="GetCoursewareJson(' + item.kejianID+ ')"'+'id="'+item.kejianID+'" ><a href="'+url+'">'+item.name+'</a></li>');
            }else{
            	 subLi = $('<li><a href="'+url+'">'+item.name+'</a></li>');
            }          
// subLi = $('<li><a onclick=" Courseware_cont('+Courseware_cont+')">'+item.name+'</a></li>');
            if(item.submenu && item.submenu.length > 0) {              
                callee(item.submenu, subLi);
            }         
            $(subUl).append(subLi);
        });
        $(lihtml).append(subUl);
     }
 };

//【06-01-01】绑定课件内容
$('body').on("click","#menu li",function(){
	var this_id=$(this).attr('id');//判断当前li是否含有id并获得【对应beike.js book()-kejianID】
	if(this_id){
GetCoursewareJson(this_id)
	}
})
////【06-01-02】
//<!--课件内容-->
function GetCoursewareJson(kejian_id){
	var kejianJSON=CoursewareCont(kejian_id);
	var kejian_length=kejianJSON.kejian.length
	var li_html="";
	//resourcesId
for (var i=0;i<kejian_length;i++) {	
	     li_html +='<li class="clear" id="'+
	                kejianJSON.kejian[i].resourcesId+
	                '">'+
				    '<span class="fl one_choise"></span>'+
					'<img src="'+
					kejianJSON.kejian[i].img+
					'"  class="fl"/>'+
					'<div class="fl">'+
					'<h1>'+
					kejianJSON.kejian[i].firstName+
					'</h1>'+
					'<div class="bottom_tipes">'+
				    '上传时间：<span>'+
					kejianJSON.kejian[i].time+
					'</span>'+
					'文件大小：<span>'+
					kejianJSON.kejian[i].size+
					'</span>'+
					'<p>'+
					'<span class="beike_bottom_bianj"><img src="../../../ui/qt/images/beike_footer_15.png">编辑</span>'+
					'<span class="beike_bottom_shanchu"><img src="../../../ui/qt/images/beike_footer_16.png">删除</span>'+
				   ' </p></div></div></li>'
}		

$(".neirong ul").html(li_html)//内容重写
	
}
////【06-02】
//<!--选择目录[目录折叠切换效果]-->	
//shouke-textMenu-sliding.js
$(function($)
{
	var usedIds = [];
	$.fn.menu = function(options)
	{
		var selector = this.selector;
		var settings = $.extend(
		{
			dataJSON: false,
			backLabel: '返回'
		}, options);
		return this.each(function()
		{
			var self = this,
				menu = $(self),
				data;
			if (menu.hasClass('sliding-menu'))
			{
				return;
			}
			var menuWidth = menu.width();
			if (settings.dataJSON)
			{
				data = processJSON(settings.dataJSON);
			}
			else
			{
				data = process(menu);
			}
			menu.empty().addClass('sliding-menu');
			var rootPanel;
			if (settings.dataJSON)
			{
				$(data).each(function(index, item)
				{
					var panel = $('<ul></ul>');
					if (item.root)
					{
						rootPanel = '#' + item.id;
					}
					panel.attr('id', item.id);
					panel.addClass('menu-panel');
					panel.width(menuWidth);
					$(item.children).each(function(index, item)
					{
						var link = $('<a></a>');
						link.attr('class', item.styleClass);
						link.attr('href', item.href);
						link.text(item.label);
						var li = $('<li></li>');
						li.append(link);
						panel.append(li);
					});
					menu.append(panel);
				});
			}
			else
			{
				$(data).each(function(index, item)
				{
					var panel = $(item);
					if (panel.hasClass('menu-panel-root'))
					{
						rootPanel = '#' + panel.attr('id');
					}
					panel.width(menuWidth);
					menu.append(item);
				});
			}
			rootPanel = $(rootPanel);
			rootPanel.addClass('menu-panel-root');
			var currentPanel = rootPanel;
			menu.css('height', 'auto')
			var wrapper = $('<div></div>').addClass('sliding-menu-wrapper').width(data.length * menuWidth);
			menu.wrapInner(wrapper);
			wrapper = $('.sliding-menu-wrapper', menu);
			$('a', self).on('click', function(e)
			{
				var href = $(this).attr('href'),
					label = $(this).text();

				if (href == '#')
				{
					e.preventDefault();
//					console.log($(this).html())
				}
				else if (href.indexOf('#menu-panel') == 0)
				{
					var target = $(href),
						isBack = $(this).hasClass('back'),
						marginLeft = parseInt(wrapper.css('margin-left'));
						
						$("#menu").css('height', 'auto')

					if (isBack)
					{
						if (href == '#menu-panel-back')
						{
							target = currentPanel.prev();							
							var span_len=$(".itemmulu").length;
							$(".itemmulu").eq(span_len-1).remove()
					
							////////////////////////////////////////////////////////////////////////////
						}
						wrapper.animate(
						{
							marginLeft: marginLeft + menuWidth
						}, 'fast');
					}
					else
					{
						target.insertAfter(currentPanel);

						if (settings.backLabel === true)
						{
							$('.back', target).text(label);			
						}
						else
						{
							$('.back', target).text(settings.backLabel)
  ///////////////////////////////////////////////////////////////////////////////////////////////////////                      
							$(this).parent('li').addClass('active')
							$(this).parent('li').siblings().removeClass('active')
							var tl=$(this).html();							
							var _html='<span class="itemmulu">'+tl+'/'+'<span>'
							$(".mnuitem").append(_html)							
							var menu_wrapper=$(".sliding-menu-wrapper")
							var menu_wrapper_w=parseInt($(".sliding-menu-wrapper").css('margin-left'));
							$("#menu").css('height', 'auto')
						}
						wrapper.animate(
						{
							marginLeft: marginLeft - menuWidth
						}, 'fast');
					}

					currentPanel = target;
					menu.animate(
					{
						height: target.height()

					}, 'fast');
				
                 menu.css('height', 'auto')
					e.preventDefault();
				}

			});
			return this;
		});
		function process(data)
		{
			var ul = $('ul', data),
				panels = [];

			$(ul).each(function(index, item)
			{
				var panel = $(item),
					handler = panel.prev(),
					id = getNewId();

				if (handler.length == 1)
				{
					handler.addClass('nav').attr('href', '#menu-panel-' + id);
				}

				panel.attr('id', 'menu-panel-' + id);

				if (index == 0)
				{
					panel.addClass('menu-panel-root');
				}
				else
				{
					panel.addClass('menu-panel');

					var li = $('<li></li>'),
						back = $('<a></a>').addClass('back').attr('href', '#menu-panel-back');

					panel.prepend(back);
				}

				panels.push(item);

			});

			return panels;
		}

		function processJSON(data, parent)
		{
			var root = { id: 'menu-panel-' + getNewId(), children: [], root: (parent ? false : true) },
				panels = [];

			if (parent)
			{
				root.children.push(
				{
					styleClass: 'back',
					href: '#' + parent.id

				});
			}

			$(data).each(function(index, item)
			{
				root.children.push(item);

				if (item.children)
				{
					var panel = processJSON(item.children, root);

					item.href = '#' + panel[0].id;
					item.styleClass = 'nav';

					panels = panels.concat(panel);
				}

			});

			return [root].concat(panels);
		}

		function getNewId()
		{
			var id;
			do
			{
				id = Math.random().toString(36).substring(3, 8);
			}
			while (usedIds.indexOf(id) >= 0);
			usedIds.push(id);
			return id;
		}
	};

} (jQuery));

$(function(){
	$("body").on("click",".itemmulu",function(){
		var index=$(this).index();
		console.log(index)
		var mgleft=-((index)*397)
	})
})







