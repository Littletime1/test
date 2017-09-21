// JavaScript Document
//模拟封装jquery
function $( v )
{
	if( typeof v == 'string' )
	{
		return document.getElementById( v );
	}
	else if( typeof v == 'function' )
	{
		return window.onload = v;
	}
	else if( typeof v == 'object' )
	{
		return v;
	};
	
};

//两个参数获取样式，三个参数设置样式
function css(name,attr,value)
{
	//alert( name==arguments[0] );
	if( arguments.length == 2 )
	{
		return document.getElementById(name).style[attr];
	}
	else
	{
		document.getElementById(name).style[attr] = value;
	};
	
};

//匀速移动框架
function move( obj,attr,dir,target,endfn )
{

	clearInterval( obj.timer );
	
	dir = parseInt( getStyle(obj,attr) ) < target?dir:-dir;
	
	obj.timer = setInterval(function(){
		
		var speed = parseInt( getStyle(obj,attr) ) + dir;//497

		if(speed>target && dir>0 || speed<target && dir<0)
		{
			speed = target;
		};

		
		obj.style[attr] =speed +'px';
	
		if(speed==target)
		{
			clearInterval( obj.timer );
			endfn&&endfn();
			
		};
		
	},30);
};

//获取元素样式
function getStyle(obj,attr)
{
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};

//通过Class找元素
function byClassName(oParent,sClass,tagName)
{
	var aEls = oParent.getElementsByTagName(tagName);
	var arrResults = [];
	for(var i=0;i<aEls.length;i++)
	{
		
		var aClassName = aEls[i].className.split(' ');
		for(var j=0;j<aClassName.length;j++)
		{
			if(aClassName[j]==sClass)
			{
				arrResults.push(aEls[i]);
				break;
			};
			
		};
		
	};
	
	return arrResults;
};



//添加和删除className
function addClassName(obj,ClassName)
{
	
	if(obj.className=='')
	{
		obj.className=ClassName;
	}
	else
	{
		
		var arrClassName = obj.className.split(' ');
		var indexOfNum = _indexOf( arrClassName,ClassName );
		
		if(indexOfNum==-1)
		{
			obj.className += ' '+ClassName;
		};
		
	};

};

function removeClassName(obj,ClassName)
{
	
	if(obj.className!='')
	{
		
		var arrClassName = obj.className.split(' ');
		var indexOfNum = _indexOf( arrClassName,ClassName );
		if(indexOfNum!=-1)
		{
			arrClassName.splice(indexOfNum,1);
			obj.className = arrClassName.join(' ');
		};
		
	};
	
};
function _indexOf(arr,v)
{
	
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==v)
		{
			return i;
		};
	};
	
	return -1;
};


//所有元素都到达目标位置 清空定时器。
//没有不到的，清空定时器
//完美运动框架
function sMove(obj,json,endFn)
{
	
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var isStop = true;//假如都到达目标位置。真
		//var cur = 0;
		for(var attr in json)
		{
			
			if(attr == 'opacity')
			{
				var cur = Math.round(getStyle(obj,attr) * 100);
			}
			else
			{
				var cur = parseInt(getStyle(obj,attr));
			};
			
			if(cur!=json[attr])
			isStop = false;
			
			var speed = (json[attr] - cur)/10; 
			
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			
			
			if(attr == 'opacity')
			{
				cur = cur + speed;
				obj.style.filter = 'alpha(opacity:'+cur+')';
				obj.style.opacity = cur/100;
			}
			else
			{
				cur += speed;
				obj.style[attr] = cur+ 'px'; 
			};
		};
		
		if(isStop)
		{
			clearInterval(obj.timer);
			endFn && endFn();
		};
		
	},30);
};

//设置cookie 删除cookie 获取cookie值
function setCookie(name,value,date)
{
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+date);
	document.cookie = name+'='+value+';expires='+oDate;
};

function delCookie(name)
{
	setCookie(name,1,-1)
};


function getCookie(name)
{
	var arr = document.cookie.split('; ');
	
	for(var i=0;i<arr.length;i++)
	{
		arr1 = arr[i].split('=');
		
		if(arr1[0]==name)
		{
			return arr1[1]
		}
	};
	return '';
};