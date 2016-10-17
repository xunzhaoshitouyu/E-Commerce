var js={
		$l:function (id){
			return document.getElementById(id);
		},
		getcla:function (cla){
			var ele=document.all?document.all:document.getElementsByTagName('*');
			var arr1=[];
			for (var i = 0; i < ele.length; i++) {
				if(ele[i].className==cla){
					arr1.push(ele[i]);
				}
			}
			return arr1;
		},
		getidcla:function (id,cla){//获取指定id的类名为**的元素的集合
			var ds=document.getElementById(id);
			var ele=ds.all?ds.all:ds.getElementsByTagName('*');
			var arr1=[];
			for (var i = 0; i < ele.length; i++) {
				if(ele[i].className==cla){
					arr1.push(ele[i]);
				}
			}
			return arr1;
		},
		getscr:function (){//获取滚动条的上边距
			var scr=document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop;
			return scr;
		},
		setscr:function (tt){//设置滚动条的上边距
			document.body.scrollTop=tt;
			window.pageYOffset=tt;
			document.documentElement.scrollTop=tt;
		},
		getsty:function (a,pres){//获取非行间样式
			if(a.currentStyle){
				return a.currentStyle[pres];
			}else{
				return getComputedStyle(a,null)[pres];
			}
		},
		next:function (obj){//获取下一个元素
				if(obj.nextElementSibling){
					return obj.nextElementSibling;
				}else{
					return obj.nextSibling
				}
			},
    	prev:function (obj){
			if(obj.previousElementSibling){//获取前一个元素
				return obj.previousElementSibling;
			}else{
				return obj.previousSibling;
			}
		},
		last:function (obj){//获取最后一个元素
			if(obj.lastElementChild){
				return obj.lastElementChild;
			}else{
				return obj.lastChild;
			}
		},
		fris:function (obj){//获取第一个元素
			if(obj.firstElementChild){
				return obj.firstElementChild;
			}else{
				return obj.firstChild;
			}
		},
		ev:function (ev){//event事件兼容写法
			var Event=ev||window.event;
			return Event;
		},
		preventdef:function(ev){//阻止默认事件
			var Event=ev||window.event;
			if(Event.preventDefault){
				Event.preventDefault();
			}else{
				Event.returnValue=false;
			}
		},
		addeven:function(obj,act,fun){//添加监听事件
			if(obj.addEventListener){
			obj.addEventListener(act,fun,false);
			
			}else{
				obj.attachEvent('on'+act,fun);
			}
			},
		remoeven:function(obj,act,fun){//添加监听事件
			if(obj.removeEventListener){
			obj.removeEventListener(act,fun,false);
			
			}else{
				obj.detach('on'+act,fun);
			}
		},
		canselbu:function(ev){//阻止冒泡兼容写法
			var even=ev||window.event;
			if(even.stopPropagation){
				even.stopPropagation();
			}else{
				even.cancelBubble=true;
			}
		}
}