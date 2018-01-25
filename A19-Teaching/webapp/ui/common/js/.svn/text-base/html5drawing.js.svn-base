
    var container=$(".container");
    var canvas=document.querySelector("canvas");
    var screenWidth=document.documentElement.clientWidth;
    var screenHeight=document.documentElement.clientHeight;
    var width=screenWidth;//-200
    var height=screenHeight-80;
    canvas.width=width//width
    $(".allcan").width(width)
    canvas.height=height;//height
    var obj=canvas.getContext("2d");
    var typechoose=$(".type li");
    var stylechoose=$(".style li");
    var colorchoose=document.querySelector("input[type=color]");
    var widthchoose=document.querySelector(".linewidth input[type=number]");
    var canvasWidth=document.querySelector(".xinjian_width input[type=number]");
    var canvasHeight=document.querySelector(".xinjian_height input[type=number]");
//  canvasWidth.value=width;canvasHeight.value=height;
//  canvasWidth.max=screenWidth-295;canvasHeight.max=screenHeight-15;
    var ding=document.querySelector("#ding");
    var poly=$(".poly");
    var bian=$(".bian");
    var polychoose=$(".bian input");
    var shezhi=$(".shezhi");
    var cut=$(".cut");
    var copy=$(".copy");
    var back=$(".back");
    var clear=$(".clear");
    var save=$(".save");
    var create=$(".create");
    var xinjian=$(".xinjian");
    var create_close=$(".xinjian_before");
    var cutflag=false;
    var iscut=true;
    var color="#fff";
    var type="line";
    var n=3;
    var linewidth="2";
    var style="stroke";
    var arr=[];
    $(".fill").css({display:"none"});
    // 多边形
    poly.hover(function(){
        bian.fadeIn();
    },function(){
        bian.fadeOut();
    })
    // 绘制形状
    typechoose.each(function(index,ele){
        $(ele).click(function(){
            typechoose.removeClass("typeactive");
            $(this).toggleClass("typeactive");
            cut.css({color:"#fff",backgroundColor:"#5bd219",opacity:1});
            copy.css({color:"#fff",backgroundColor:"#5bd219",opacity:1});
            type=$(this).attr("data");
            if($(this).is(".line")||$(this).is(".pen")){
                style="stroke";
                $(".stroke").addClass("styleactive");
                $(".fill").css({display:"none"}).removeClass("styleactive");
            }else{
                $(".fill").css({display:"block"});
            }
        })
    })

    // 撤销
    back.click(function(){
        arr.pop();
        obj.clearRect(0,0,width,height);
        if(arr.length>0){
            obj.putImageData(arr[arr.length-1],0,0,0,0,width,height);
        }
    })
    // 清除
    clear.click(function(){
        arr=[];
        obj.clearRect(0,0,width,height);

        
        
    })
    // 保存
    save.click(function(){
        var reg=canvas.toDataURL("image/png");//跳转页面手动保存
//        var reg=canvas.toDataURL("image/png").replace("image/png","image/octet-stream");//直接自动保存下载
        location.href=reg;
    })

    // 颜色选择
    colorchoose.onchange=function(){
        color=this.value;
    }

    //多边形边数
    polychoose.change(function(){
        n=this.value;
    })
    var x,y,w,h;
    var lx,ly,lw,lh;
    var cutdata;
    canvas.onmousedown=function(e){
        x=e.offsetX;
        y=e.offsetY;
        if(type=="pen"){
            obj.beginPath();
            obj.moveTo(x,y);
        }
        if(type=="eraser"){
            obj.clearRect(x-0,y-0,-20,-20);
        }
        if(cutflag&&type=="cut"){
            if(arr.length!=0){
                arr.splice(-1,1);
            }
        }
        var draw=new Draw(obj,{type:style,color:color,width:linewidth});//实例化构造函数
        canvas.onmousemove=function(e){
            w=e.offsetX;
            h=e.offsetY;
            if(type!="eraser"){
                obj.clearRect(0,0,width,height);
                if(arr.length!=0){
                    obj.putImageData(arr[arr.length-1],0,0,0,0,width,height);
                }
            }
            if(cutflag&&type=="cut"){
                if(iscut){
                    obj.clearRect(lx,ly,lw-lx,lh-ly);
                }
                var nx=lx+(w-x);
                var ny=ly+(h-y);
                obj.putImageData(cutdata,nx,ny);
            }else if(type=="poly"){
                draw[type](x,y,w,h,n);
            }else{
                draw[type](x,y,w,h);
            }

        }
        document.onmouseup=function(){
            canvas.onmousemove=null;
            document.onmouseup=null;
            if(type=="cut"){
                if(!cutflag){
                    cutflag=true;
                    cutdata=obj.getImageData(x+1,y+1,w-x-2,h-y-2);
                    lx=x;ly=y;lw=w;lh=h;
                    container.css({display:"none"});
                }else{
                    cutflag=false;
                    container.css({display:"block"});
                }
            }
            arr.push(obj.getImageData(0,0,width,height));
        }
    }
    



















///////////////////////////////////
function Draw(obj,setting){
    this.obj=obj;
    this.type=setting.type||"stroke";
    this.color=setting.color||"#000";
    this.width=setting.width||"1";
}
Draw.prototype={
    init:function(){
        this.obj.strokeStyle=this.color;
        this.obj.fillStyle=this.color;
        this.obj.lineWidth=this.width;
    },
    rect:function(x,y,x1,y1){
        this.init();
        this.obj.beginPath();
        this.obj.rect(x,y,x1-x,y1-y);
        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
    },
    line:function(x,y,x1,y1){
        this.init();
        this.obj.beginPath();
        this.obj.moveTo(x,y);
        this.obj.lineTo(x1,y1);
        this.obj.stroke();
    },
    circle:function(x,y,x1,y1){
        this.init();
        var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
        this.obj.beginPath();
        this.obj.arc(x,y,r,0,2*Math.PI);
        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
    },
    poly:function(x,y,x1,y1,n){
        this.init();
        var obj=this.obj;
        var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));;
        obj.save();
        obj.translate(x,y);
        obj.rotate(Math.PI/2);
        var nx=r*Math.cos(Math.PI/n);
        var ny=r*Math.sin(Math.PI/n);
        obj.beginPath();
        obj.lineCap="round";
        obj.moveTo(nx,ny);
        for(var i=0;i<=n;i++){
            obj.rotate(Math.PI*2/n);
            obj.lineTo(nx,-ny);
        }
        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
        obj.restore();
    },
    pen:function(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.lineCap="round";
        this.obj.lineTo(x1,y1);
        this.obj.stroke();
        this.obj.restore();
    },
    eraser:function(x,y,x1,y1){
        this.obj.lineCap="round";
        this.obj.clearRect(x1-5,y1-5,10,10);
    },
    cut:function(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.setLineDash([4,2]);
        this.obj.beginPath();
        this.obj.lineWidth=1;
        this.obj.rect(x,y,x1-x,y1-y);
        this.obj.stroke();
        this.obj.restore();
    }
}