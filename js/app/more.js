module.exports = {
	addMoreHeader:function(){
		$("#header").load("html/More.html #moreHeader",function(){
			
		});
	},
	addMoreContent:function(){
		$("#content").load("html/More.html #moreContent",function(){
			
		});
	}
	
}
