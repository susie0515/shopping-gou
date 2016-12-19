module.exports = {
	loadThemeListHeader:function(){
		$("#header").load("html/ThemeList.html #ThemeListHeader",function(classID){
/*        $.ajax({
        	type:"get",
        	url:"js/app/ThemeKind.json",
        	async:true,
        	success:function(res){
        		
				console.log(res[classID])
        	}
        });*/
		})
	},
	loadThemeListContent:function(classID){
		$("#content").load("html/ThemeList.html #ThemeListContent",function(){
			/*console.log("ID",classID)*/
			$.ajax({
				type:"get",
				url:"js/app/data.json",
				success:function(data){
					var dataList = data[classID];
					console.log(dataList)
					for(var i in dataList){
						var price = dataList[i].price;
						var discount = dataList[i].discount;
						var newPrice = 0;
						if(discount == "0"){
							newPrice = price;
							discount = "不打";
						}else{
							newPrice = (price*discount/10).toFixed(1);
						}
						$("#prolist").append(
							'<li class="ThemeListDetail" classID='+dataList[i].classID+' goodsID='+dataList[i].goodsID+'>'+
								'<div class="proimg">'+
									'<img src="'+dataList[i].goodsListImg+'"/>'+
								'</div>'+
								'<div class="proinfo">'+
									'<p>'+dataList[i].goodsName+'元</p>'+
									'<p><span>￥<b>'+newPrice+'</b>元</span></p>'+
									'<p>原价￥<del>'+price+'元</del>&nbsp;&nbsp;<span class="discount">'+dataList[i].discount+'折</span></p>'+
								'</div>'+
							'</li>'
						)
					}
					$(".ThemeListDetail").on("tap",function(){
						var classID = $(this).attr("classID");
						var goodsID = $(this).attr("goodsID");
						var detail=require("./detail");
						detail.addDetailHeader("home");
						detail.addDetailContent(goodsID);
						detail.addDetailFoot();
					})
				}
				
			});

		})
	}
}