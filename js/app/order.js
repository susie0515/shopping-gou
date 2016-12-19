module.exports = {
	addOrderHeader:function(type){
		$("#header").load("html/Order.html #orderHeader",function(){
			$("#back").tap(function(){
					if(type=="cart"){
						var cart=require("./cart");
						cart.addCartHeader();
						cart.addCartContent();
					}else if(type=="user"){
						var user=require("./user");
						user.addUserHeader();
						user.addUserContent();
					}
					
			})
		});
	},
	addOrderContent:function(){
		$("#content").load("html/Order.html #orderContent",function(){
			var orderList=JSON.parse(localStorage.getItem("orderList"));
//			console.log(orderList);
			$(".orderList").html("");
			
//			console.log(typeof orderList);
			if(orderList==null||orderList==0){
				$(".emptyImg").show();
				$(".orderList").hide();
			}else{
				$(".emptyImg").hide();
				$(".orderList").show();
				for(var i=0;i<orderList.length;i++){
					var price=orderList[i].price*1;
					var discount=orderList[i].discount*1
					var newPrice=price*discount*0.1;
					$(".orderList").append('<li class="orderItem">'+
						'<div class="item">'+
							'<div class="itemImg">'+
								'<img src="'+orderList[i].goodsListImg+'"/>'+
							'</div>'+
							'<div class="itemInfo">'+
								'<p>'+orderList[i].goodsName+'</p>'+
								'<p>单价：<span>￥<b>'+newPrice.toFixed(2)+'</b></span></p>'+
								'<p>数量：<span>'+orderList[i].num+'</span></p>'+
							'</div>'+
						'</div>'+
					'</li>')
				}
			}
			
			
		});
	}
	
}
