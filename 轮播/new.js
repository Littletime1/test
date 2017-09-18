function  sMove(obj,json,fun) {
	            clearInterval(obj.timer);
	            obj.timer = setInterval(function () {
	                var tig = true;
	                for(var attr in json){
	                    var cur = 0;
	                    if(attr == "opacity"){
	                        cur =Math.round(parseFloat(getStyle(obj,attr))*100);
	                    }else {
	                        cur = parseInt(getStyle(obj,attr));
	                    }
	                    var speed = (json[attr] - cur) /50;
	                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	                    if(cur != json[attr]){tig = false;}
	                    if(attr == "opacity"){
	                        obj.style[attr] = (cur+speed)/100;
	                        obj.style.filter = 'alpha(opacity:'+cur+speed+')';
	                    }else {
	                        obj.style[attr] = cur + speed + "px";
	                    }
	                }
	                if(tig ){
	                    fun && fun();
	                    clearInterval(obj.timer);
	                }
            },30);
}