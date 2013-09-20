/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html

modified by zhouyuguo for action extention
*/

(function( $ ){
	var $window = $(window),$document = $(document);
	var windowHeight = $window.height();
	
	/**
	 * @fileOverview modified point by zhouyuguo (zyg_215118@163.com) ,inspired by AOP pattern
	 * @author zhouyuguo <a href="mailto:zyg_215118@163.com">email to me</a>
	 * @version 1.0
	 * @description action dispatcher for scroll event 
	 * @param {Object} arg initial param
	 */
	
	var aspectTemplate = function(arg){
		var pos = $window.scrollTop(), fnTop = this.fnTop || 0, aviHeight = this.aviHeight || arg.$this.height(),offset = this.offset || 0, $this = arg.$this, ratio;

		if (fnTop <= pos + offset ) {
			if(this.judgeBefore && !this.judgeBefore.call(arg)){
				return;
			}
			if(pos - fnTop <= aviHeight){
				if(!this.animation){
					ratio = (pos + offset - fnTop) / (offset + aviHeight);
				}else{
					ratio = this.animation(pos + offset - fnTop,0,1,offset + aviHeight);
				}
				this.execBody.call(arg, ratio, pos, fnTop);
				//$this.css({'transform':'scale(' + (1 + ratio*0.5) + ') translate(' + -20*ratio + 'px,' + Math.round(pos - fnTop) + 'px)'});
				if(ratio == 1 ){$this.data("done",true);}else if(ratio == 0){
					$this.data("done",false);
				}
				
								
			}else{
				if(!$this.data("done")){
					 //$this.data("done",true).css({'transform':'scale(1.5) translate(-20px,250px)'});
					$this.data("done",true);
					this.execAfter.call(arg);
				}  
			}
			this.judgeAfter && this.judgeAfter.call(arg);

		}else{
				if(this.judgeAfter && !this.judgeAfter.call(arg)){
					return;
				}
				if($this.data("done") ){
					//$this.css({'transform':'scale(1) translate(0,0)'});
					this.execBefore.apply(arg);
		    		$this.data("done",false);
				}
		}
	}
	
	$window.resize(function () {
		windowHeight = $window.height();
	});
	
	
	$.fn.parallax = function(option) {
		option = option || {};
		var callBack = option.callBack ,outerHeight = option.outerHeight || true;
		
		var $this = $(this) ,getHeight ,firstTop = $this.offset().top ,paddingTop = 0;
	
		var updata;
		
		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
	    				
		if (callBack){
			var arg = {"option":option,"$window":$window,"$this":$this,"$document":$document,"windowHeight":windowHeight};
			if($.isFunction(callBack)){
	            update = (function(arg,cal){
	                return function(){
	                    //cal(op,$w,$t,$d,$wh);
	                    cal(arg);
	                };
	            })(arg,callBack);
			}else if($.isPlainObject(callBack)){
	            update = (function(arg,cal,asT){
	                return function(){
	                    //cal(op,$w,$t,$d,$wh);
	                	asT.call(cal,arg);
	                };
	            })(arg,callBack,aspectTemplate);
			}else{
				return;
			}
        } else{
        	var xpos = option.xpos || "50%" ,
    		ypos = option.ypos || 0 ,
    		speedFactor = option.speedFactor || 0.1 ;
            update = function(){
            var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + (Math.round((firstTop - pos) * speedFactor) + ypos) + "px");
			});

            }
        }
        		// function to be called whenever the window is scrolled or resized
		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);