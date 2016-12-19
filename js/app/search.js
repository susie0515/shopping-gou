module.exports={
	loadData:function(goodsName){
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/selectGoodes.php?callback=",
			dataType:"jsonp",
			data:{
				"selectText":goodsName
			},
			beforeSend:function(){
				
			},
			success:function(data){
				//console.log(data);
				if(data=="0"){
					$(".searchResult").html("没有搜索结果");
				}else{
					//$(".searchResult").html(data[0].goodsName);
					$(".searchResult").html("");
					for (var i in data) {
							var img = data[i].goodsListImg;
							var goodsID = data[i].goodsID;
							var name = data[i].goodsName;
							var price = data[i].price;
							var className = data[i].className;
//							var number = data[i].number;
							var newPrice = 0;
							if(data[i].discount == "0"){
								newPrice = price;
							}else{
								newPrice = (price*data[i].discount/10).toFixed(1);
							}
							
							$(".searchResult").append('<li class="cartItem" goodsID='+goodsID+'>'+
								
								'<div class="itemBox">'+
									'<div class="itemImg">'+
										'<img src="'+img+'"/>'+
									'</div>'+
									'<div class="itemInfo">'+
										'<p>'+name+'</p>'+
										'<p>'+className+'</p>'+
										'<p>单价：￥'+newPrice+'</p>'+
									'</div>'+
								'</div>'+
							'</li>')
						}
					$(".cartItem").tap(function(){
						var goodsID=$(this).attr("goodsID");
//						alert(goodsID)
						var detail=require("./detail");
						detail.addDetailHeader("search");
						detail.addDetailContent(goodsID);
						detail.addDetailFoot();
					})
				}
			}
		})
	},
	addSearchHeader:function(){
		$("#header").load('html/Search.html #searchHeader',function(){
			$("#deleBtn").tap(function(){
				var home = require("./home");
				home.addHomeHeader();
				home.addHomeContent();
			})
		})
	},
	addSearchContent:function(){
		var that=this;
		//console.log(that);
		$("#content").load('html/Search.html #searchContent',function(){
			$("#somethings").keyup(function(){
				//console.log($(this).val())
				var goodsName=$(this).val();
				that.loadData(goodsName);
			})
		})
	}
}
