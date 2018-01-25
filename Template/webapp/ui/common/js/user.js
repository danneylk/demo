angular.module('userMod', [])
    .controller('anzhuang', function($scope) {
    	prettyPrint();
    })
    .controller('wuitab', function($scope) {
    	prettyPrint();
    	$(".wuiTab").wuitab("click")
    	$(".togglecode").click(function() {
			$(this).parent().find('pre').toggle()
			if($(this).html() == '查看代码') {
				$(this).html('隐藏代码')
			} else {
				$(this).html('查看代码')
			}
		})
    })
	.controller('userController', function($scope) {
		prettyPrint();
		//admite
		$(".one_icon").on("mouseover", function() {
			$(this).animo({
				animation: "wobble",
				duration: 1,
				keep: false
			})
		})
		$(".two_icon").on("mouseover", function() {
			$(this).animo({
				animation: "bounceOutUp",
				duration: 1,
				keep: false
			})
		})
		$(".three_icon").on("mouseover", function() {
			$(this).animo({
				animation: "fadeInDown",
				duration: 1,
				keep: false
			})
		})
		$(".four_icon").on("mouseover", function() {
			$(this).animo({
				animation: "rotateIn",
				duration: 1,
				keep: false
			})
		})
		$(".five_icon").on("mouseover", function() {
			$(this).animo({
				animation: "bounce",
				duration: 1,
				keep: false
			})
		})

	}).controller('form', function($scope) {
		prettyPrint();
		initSelectInput.call(this, 'code_sjfl', [{
			'code': 1,
			'name': '全部'
		}, {
			'code': 2,
			'name': '待提交'
		}, {
			'code': 3,
			'name': '审核通过'
		}, {
			'code': 4,
			'name': '审核退回'
		}]);
		//复选框与单选框
		addWdCheckBox("#ckLayout");
		addWdRadioButton("#ckLayout2");
		//时间控件
		setWdDate("#rq");
		//点击类型选中事件
		$('.lx-type>span').on('click', function() {
			$(this).toggleClass('selected');
		})
		//富文本编辑器
		$("#yl-editBoxStarter").wdEditStarter({
			toolbar: ['bold', 'italic', 'underline', 'simpleupload', 'insertimage'],
			width: "100%",
			height: "200"
		});
	}).controller('button', function($scope) {
		prettyPrint();
		$(".togglecode").click(function() {
			$(this).parent().find('pre').toggle()
			if($(this).html() == '查看代码') {
				$(this).html('隐藏代码')
			} else {
				$(this).html('查看代码')
			}
		})

	}).controller('paiban', function($scope) {
		prettyPrint();

	}).controller('Editor', function($scope) {
		prettyPrint();
		//富文本编辑器
		$("#yl-editBoxStarter").wdEditStarter({
			toolbar: ['bold', 'italic', 'underline', 'simpleupload', 'insertimage'],
			width: "100%",
			height: "200"
		});
	}).controller('tanchaung', function($scope) {
		prettyPrint();
		//弹窗
			//$("#prompt1").show();
			$('#B01').on('click', function() {
				$("#prompt1")[0].style.left="50%";
				$("#prompt1").show();
			})
			//成功
			//$("#wd_dialog_success")
			$("#btn-success").on('click', function() {
				$("#wd_dialog_success")[0].style.left="50%";
				$("#wd_dialog_success").show();
				setTimeout(function() {
					$("#wd_dialog_success").hide()
				}, 1000)
			})
			//错误
			//$("#wd_dialog_error")
			$("#btn-error").on('click', function() {
				$("#wd_dialog_error")[0].style.left="50%";
				$("#wd_dialog_error").show();
			})
			//询问	
			//$("#wd_dialog_confirm")
			$("#btn-confirm").on('click', function() {
				$("#wd_dialog_confirm")[0].style.left="50%";
				$("#wd_dialog_confirm").show();
			})
			//提示
		//提示关闭效果			
		$('.wd-prompt-close').on('click',function(){
			 $(this).parent().parent().hide();
		})
		$('.wd-prompt-footer-buttonarae input').on('click',function(){
			 $(this).parent().parent().parent().hide();
		})
		
	}).controller('Progress', function($scope) {
		prettyPrint();
		$(".togglecode").click(function() {
			$(this).parent().find('pre').toggle()
			if($(this).html() == '查看代码') {
				$(this).html('隐藏代码')
			} else {
				$(this).html('查看代码')
			}
		})

		//滑动块
		$('.jxsz-slider').jRange({
			from: 1,
			to: 10,
			step: 1,
			width: 450,
			theme: "theme-blue2"
		});
		$('.spxg-slider').jRange({
			from: 1,
			to: 100,
			step: 5,
			width: 300,
			theme: "theme-blue2",
		});
		//环形进度
		var circle = $("circle");
		var perimeter = 2 * Math.PI * 40;
		$(".fs").each(function(i, t) {
			var percent = parseInt($(this).html()) / 100;
			circle.eq(2 * i + 1).attr("stroke-dasharray", perimeter * percent + " " + perimeter * (1 - percent));
		})

	}).controller('biaoge', function($scope) {
		prettyPrint();
		$(".togglecode").click(function() {
			$(this).parent().find('pre').toggle()
			if($(this).html() == '查看代码') {
				$(this).html('隐藏代码')
			} else {
				$(this).html('查看代码')
			}
		})
	}).controller('mobile', function($scope) {
    	prettyPrint();
    })
	
$(".dofix ul li a ").click(function(){
	$(".dofix ul li a ").removeClass('c-blue');
	$(this).addClass('c-blue');
})