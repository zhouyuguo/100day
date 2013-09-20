(function($){
	var oPeng = {
	};
	
	oPeng.main = function() {
		this.bindAction();
	};
	
	
	oPeng.bindAction = function() {
		var fnEle = $('#featureNav');
		var fnEleText = fnEle.clone().css({"opacity":0,"position":"fixed","border":"none","padding":"5px 0","top":0,"width":"auto","height":"auto","background-color":"rgba(0,0,0,0.5)"}).attr("id","");
		fnEleText.find("a").css({"background":"transparent","overflow":"visible","text-indent":0,"height":"auto",color:"#fff","margin-bottom":0}).attr("id","");
		fnEleText.insertAfter(fnEle);
	
		fnEle.localScroll(800);
		fnEleText.localScroll(800);
		fnEle.parallax({
			"transArr":fnEle.find("a"),
			"navText":fnEleText,
			"callBack":{
				"fnTop":fnEle.offset().top,
				"aviHeight":200,
				"judgeBefore":function(){
					var $this = this.$this;
					
					if($this.css("position") != "fixed" ){
		        		$this.css({"position":"fixed","top":0,"borderBottom":"none"}).prev().css({"display":"block"});	
					}
					return true;
				},
				"judgeAfter":function(){
					var $this = this.$this;
					
					if($this.css("position") == "fixed" ){
			        	$this.css({"position":"relative","top":"","borderBottom":""}).prev().css({"display":"none"});
					}
					return true;
				},
				"execBody": function(ratio,pos,fnTop){
					if(pos - fnTop <= 200){
						this.option.transArr.css('transform','scale(' + (1 -  ratio * 0.4) + ') translate(0,' + - ratio * 80 + 'px)' );
						this.option.transArr.css('opacity' , 1 - ratio * 1);
						this.option.navText.css('opacity' , ratio  * 1) ;
					}
				},
				"execAfter":function(){
					this.option.transArr.css('transform','scale(0.2) translate(0,-380px)');
					this.option.transArr.css('opacity' , 0  );
					this.option.navText.css('opacity' , 1) ;
				},
				"execBefore":function(){
					this.option.transArr.css('transform','scale(1) translate(0,0)');
		        	this.$this.css({"position":"relative","top":"","borderBottom":""}).prev().css({"display":"none"});
					this.option.transArr.css('opacity' ,  1);
					this.option.navText.css('opacity' , 0) ;
				}
			}
		});
		
		
		
		$("#serveText").parallax({
			"callBack":{
				"fnTop":$("#serveText").offset().top,
				"aviHeight":50,
				"offset":400,
				"execBody": function(ratio){
		
					this.$this.css('transform','scale(' + (1 + ratio*2) + ')' );
				},
				"execAfter":function(){
		
					this.$this.css('transform','scale(3)');
				},
				"execBefore":function(){
		        	this.$this.css('transform','scale(1)');
				}
			}
		});
		
		$("#serveEzine").parallax({xpos:"45%",speedFactor:-0.9});
	
		$("#ezineText").parallax({
			"callBack":{
				"fnTop":$("#ezineText").offset().top,
				"aviHeight":50,
				"offset":500,
				"execBody": function(ratio){
		
					this.$this.css({'transform':'scale(' + (1 + ratio*2) + ') translate(0,' + (-30 + ratio * 40) + 'px)',"opacity":ratio});
				},
				"execAfter":function(){
		
					this.$this.css({'transform':'scale(3) translate(0,10px)',"opacity":1});
				},
				"execBefore":function(){
	    			this.$this.css({'transform':'scale(1) translate(0,-30px)',"opacity":0});
				}
			}
		});
	
		$("#serveWbTitle").parallax({
			"callBack":{
				"fnTop":$("#serveWbTitle").offset().top,
				"aviHeight":250,
				"execBody": function(ratio, pos, fnTop){
					this.$this.css({'transform':'scale(' + (1 + ratio*0.5) + ') translate(' + -20*ratio + 'px,' + Math.round(pos - fnTop) + 'px)'});
				},
				"execAfter":function(){
					this.$this.data("done",true).css({'transform':'scale(1.5) translate(-20px,250px)'});
				},
				"execBefore":function(){
	    			this.$this.css({'transform':'scale(1) translate(0,0)'});
				}
			}
		});
		
		$("#serveApp").parallax({
			"callBack":{
				"fnTop":$("#serveApp").offset().top,
				"aviHeight":250,
				"animation":function(t,b,c,d){
			        if ((t/=d) < (1/2.75)) {
			        	return c*(7.5625*t*t) + b;
			        } else if (t < (2/2.75)) {
			            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			        } else if (t < (2.5/2.75)) {
			            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			        } else {
			            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			        }
				},
				"execBody": function(ratio){
					this.$this.css({'transform':'translate(0 ,' + 295*ratio + 'px)'});
				},
				"execAfter":function(){
					this.$this.css({'transform':'translate(0,295px)'});
				},
				"execBefore":function(){
	    			this.$this.css({'transform':'translate(0,0)'});
				}
			}
		});
	};
	
	$(document).ready(function() {
	
		oPeng.main();
	
	});
})($);