module.exports = {
	loadThemeHeader:function(){
		$("#header").load("html/Theme.html #ThemeHeader",function(){
			var judge = true;
			$("#ThemeHeader").on("tap",function(e){
				if (e.stopPropagation) {
                    e.stopPropagation();
                }else{
                    e.cancelBubble = true;
                }
/*				console.log(1)*/
				if(judge){
					$("#ThemeKindNav").animate({"right":"0"},200);
					judge = false;
/*					console.log(judge)*/
				}else{
					$("#ThemeKindNav").animate({"right":"-1.5rem"},200);
					judge = true;
/*					console.log(judge)*/
				}				
			})
		})
	},
	loadThemeContent:function(){
		$("#content").load("html/Theme.html #ThemeContent",function(){
			$.ajax({
				type:"get",
				url:"js/app/themeKind.json",
				success:function(data){
					$("#ThemeContent1").html("");
					$("#ThemeKindNav").html("");
					for(var i in data){
						$("#ThemeContent1").append(
							'<li class="ThemeKind" classID="'+data[i].classID+'">'+
								'<div class="img">'+
									'<img src="'+data[i].imgUrl+'" alt=""/>'+
								'</div>'+
								'<p>'+data[i].type+'</p>'+
							'</li>'
						)
						$("#ThemeKindNav").append(																																																			
							'<li class="Themekind2" classID="'+data[i].classID+'">'+data[i].type+'</li>'							
						)
					}
				
					$(".ThemeKind").on("tap",function(event){
						event.stopPropagation();
						var classID = $(this).attr("classID")
						var ThemeList = require("./ThemeList");
						ThemeList.loadThemeListHeader(classID);
						ThemeList.loadThemeListContent(classID);
					})
					$(".Themekind2").on("tap",function(event){
                        event.stopPropagation();
						var classID = $(this).attr("classID")
						var ThemeList = require("./ThemeList");
						ThemeList.loadThemeListHeader(classID);
						ThemeList.loadThemeListContent(classID);
					})
				}	
			})			

		})
	}
}