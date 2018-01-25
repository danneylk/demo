
	/*
	 *
	 *	jQuery Sliding Menu Plugin
	 *	Mobile app list-style navigation in the browser
	 *
	 *	Written by Ali Zahid
	 *	http://designplox.com/jquery-sliding-menu
	 *
	 */

(function($)
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
						console.log(marginLeft)
						$("#menu").css('height', 'auto')

					if (isBack)
					{
						if (href == '#menu-panel-back')
						{
							target = currentPanel.prev();							
							var span_len=$(".itemmulu").length;
							$(".itemmulu").eq(span_len-1).remove()
							console.log(1)
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
							console.log(menu_wrapper_w)
							
							
							$("#menu").css('height', 'auto')
							console.log($(".itemmulu").length)
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
//		$(".sliding-menu-wrapper").css("margin-left", mgleft)
//		$("#menu").css('height', 'auto')
//		$(this).nextAll("span").remove();
//		$(this).remove();
	})
	
	

})
