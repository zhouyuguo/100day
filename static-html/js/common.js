/*定义命名空间*/
var OP = window.OP || {};

//模拟下拉菜单
(function(){		
	function select(id){
		if(id == undefined) throw (new Error('no elem id'));
		this.box = $("#"+id);
		this.tit = this.box.find("em");
		this.list = this.box.find("ul");
	}
	select.prototype.init = function(){
		var self = this;
		this.tit.click(function(){
			var h = $(window).height(),
			      t = self.tit.offset().top + 30,
			      s = $(document).scrollTop(),
			      c = h - t + s, //距离浏览器地步距离
			      l; 
			
			if(self.list.find("li").length > 14){ //解决ie6 不支持max-height问题
				l = 308;
				self.list.addClass("ul-scroll");
			}else{
				l = self.list.height();
				self.list.removeClass("ul-scroll");
			}
			if(c < l){
				self.list.addClass("show-top");//在上面显示
			}else{
				self.list.removeClass("show-top");//在下面显示
			}
			
			self.list.toggle();
		})
		this.box.delegate("li", "click", function(e){
			var value = $(this).text();
			self.list.hide();
			self.tit.html(value);
			$(this).addClass("li-cur").siblings().removeClass("li-cur");
		})
	}
	function creatselect(id){
		var tmpObj = new select(id);
		
		tmpObj.init();
		return tmpObj ;
	}
	//注册外部调用
	OP.creatselect = creatselect;
})();


/*返回顶部
 * #js_gt挂钩
 * @autor Guanbin.Qi
 */
/*返回顶部*/
OP.scrollTotop = {
	scrollUp:function(){
		$('html,body').animate({
			scrollTop: 0
		},400);	
	},
	showElem: function(){  
		var sTop = $(document).scrollTop(),
			sHeight = parseInt($(window).height() * 0.5);
		if(sTop > sHeight){  //多余一屏半时
			this.elem.fadeIn();
		}else{
			this.elem.fadeOut();
		}
	},
	init:function(){
		var $gotop = $("#go-top"),
			self = this;
			
		if($gotop.length <=0) return;
		
		this.elem = $gotop;

		$gotop.click(function(e){
			e.preventDefault();
			self.scrollUp();
		});
		
		$(window).bind("scroll ",function(){
			self.showElem();
		});
	}
};
OP.scrollTotop.init();



/*
 * ie模拟html5 placeholder
 */
if(document.all){
	OP.placeholder  = (function(){
		var $p_input = $("input[placeholder],textarea[placeholder]");
		function showPlaceholder(o,p_v){
			o.val(p_v).addClass("placeholder").data('hasPlaceholder',true);	
		}
		function clearPlaceholder(o){
			o.val("").removeClass("placeholder").data('hasPlaceholder',false);
		}
		$p_input.each(function(){
			var o = $(this);
			var p_v = o.attr("placeholder");
			
			if(o.val() == ''){
				showPlaceholder(o,p_v);
			}		
		});
		
		return {
			init:function(){
				$p_input.bind('focus keydown',function(){
					var o = $(this);
					if(o.data('hasPlaceholder')){
						clearPlaceholder(o);
					}		
				});
				$p_input.bind('blur',function(){
					var o = $(this);
					var p_v = o.attr("placeholder");
					if(o.val() == ''){
						showPlaceholder(o,p_v);
					}		
				});
			}
		}
	})();
	
	OP.placeholder.init();
};


/* ie6 position:fixed 修复 */
if($.browser.msie && parseInt($.browser.version)==6){
	(function($) {
		$.fn.pozFixed = function() {    
			return this.each(function() {
				var $this = $(this),
					bottom = parseInt($this.css("bottom")),
					ck = bottom,
					self = this;
				this.fixPosition = function(){
					if(bottom >= ck){
						bottom--;
					}else{
						bottom++;
					}
					$this.css({
						"bottom":bottom
					});              
				};
			   $(window).bind("scroll",function(){
					self.fixPosition();
			   });
			});
		};
	})(jQuery);
	$(".pozFixed").pozFixed();
}




