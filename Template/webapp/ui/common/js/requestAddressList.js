var environmentType = "kf"; // 环境类型 kf、test、product
var requestType = "request"; //请求类型 app 原型；request 系统
var commonversion = "1.0";
var msgversion = "1.0";
var gaLoginid = "SOCIA";
var apphost = window.location.host;
var requestAddressList = {
	'app':{	    
		url: "http://" + apphost + "/B00-Template/webapp/",
		testurl: "http://" + apphost + "/webapp/", // 测试url
		producturl: "http://" + apphost + "/webapp/", // 生产url
		tip: "前端工程地址"
	},
	'components':{
		url: "http://yftest.wdsource.wdcloud.cc/components/",
		testurl: "http://yftest.wdsource.wdcloud.cc/components/", // 测试url
		producturl: "http://yftest.wdsource.wdcloud.cc/components/", // 生产url
		tip: "控件地址"
	},
	'codemap':{
		url: "http://192.168.6.119:8081/zzjggl/code/getCodeMapByCodeClassVersion/",
		testurl: "http://192.168.6.119:8081/zzjggl/code/getCodeMapByCodeClassVersion/", 
		producturl: "http://192.168.6.119:8081/zzjggl/code/getCodeMapByCodeClassVersion/", 
		tip: "码表接口地址"
	},
	'file':{
		url: "http://192.168.6.100:8082/",
		testurl: "http://192.168.6.100:8082/", 
		producturl: "http://192.168.6.100:8082/", 
		tip: "文件服务"
	},
	'filebatchdelete':{
		url: "http://192.168.6.100/ptwjfw/rest/fileWS/deleteFiles",
		testurl: "http://192.168.6.100/ptwjfw/rest/fileWS/deleteFiles", 
		producturl: "http://192.168.6.100/ptwjfw/rest/fileWS/deleteFiles",
		tip: "文件服务器批量删除"
	},
	'filedelete':{
		url: "http://192.168.6.100:80/ptwjfw/rest/fileWS/delete",
		testurl: "http://192.168.6.100:80/ptwjfw/rest/fileWS/delete", 
		producturl: "http://192.168.6.100:80/ptwjfw/rest/fileWS/delete",
		tip: "文件服务器删除"	
	},
	'fileupload':{
		url: "http://192.168.6.100:80/ptwjfw/rest/fileWS/upload",
		testurl: "http://192.168.6.100:80/ptwjfw/rest/fileWS/upload", 
		producturl: "http://192.168.6.100:80/ptwjfw/rest/fileWS/upload",
		tip: "文件服务器上传"
	},
	'filebupload':{
		url: "http://192.168.6.100:80/ptwjfw/rest/fileWS/uploadSplit",
		testurl: "http://192.168.6.100:80/ptwjfw/rest/fileWS/uploadSplit", 
		producturl: "http://192.168.6.100:80/ptwjfw/rest/fileWS/uploadSplit",
		tip: "断点续传"
	},
	'getfilesize':{
		url: "http://192.168.200.66:8020/wdcloud-wjfw/rest/fileWS/getFileSizeInfo",
		testurl: "http://192.168.200.66:8020/wdcloud-wjfw/rest/fileWS/getFileSizeInfo", 
		producturl: "http://192.168.200.66:8020/wdcloud-wjfw/rest/fileWS/getFileSizeInfo",
		tip: "断点续传"
	},
	'imageJcrop':{
		url: "http://192.168.6.100/ptwjfw/rest/fileWS/image",
		testurl: "http://192.168.6.100/ptwjfw/rest/fileWS/image", 
		producturl: "http://192.168.6.100/ptwjfw/rest/fileWS/image",
		tip: "图片剪裁"
	},
	'loginAddress':{
		url: "app/jsp/ptfw/sz/zc/tranferPage.html",
		testurl: "app/jsp/ptfw/sz/zc/tranferPage.html", 
		producturl: "app/jsp/ptfw/sz/zc/tranferPage.html",
		tip: "登录地址"
	},
	'indexAddress':{
		url: "app/jsp/ptfw/index.html",
		testurl: "app/jsp/ptfw/index.html", 
		producturl: "app/jsp/ptfw/index.html",
		tip: "登录后首页地址"
	}
}