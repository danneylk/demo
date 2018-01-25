		function AccordionMenu(options) {
    this.config = {
        containerCls        : '.wrap-menu',                // 外层容器
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
            	subLi = $('<li onclick="GetCoursewareJson('+item.kejianID+')"'+'id="'+item.kejianID+'" ><a href="'+url+'">'+item.name+'</a></li>');
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
