module.exports = {
	addCartHeader:function(){
	
		$("#header").load("html/Cart.html #cartHeader",function(){
			$(".editBtn").tap(function(){
				var cartEdit=require("./cartEdit");
				cartEdit.addCartEditHeader();
				cartEdit.addCartEditContent();
			});
//			$("#back").tap(function(){
//				//alert("111");
//				if(type=="detail"){
//					var detail=require("./detail");
//					detail.addDetailHeader();
//					detail.addDetailContent();
//				}else if(type=="user"){
//					var user=require("./user");
//					user.addUserHeader();
//					user.addUserContent();
//				}
//			})
			
		});
	},
	addCartContent:function(){
		var that=this;
		$("#content").load("html/Cart.html #cartContent",function(){
			$(".goShopping").tap(function(){
				var home=require("./home");
				home.addHomeHeader();
				home.addHomeContent();
			})
			var cartList=[];
			if(localStorage.getItem("cartList")&&localStorage.getItem("cartList")!="[]"){
				
				$(".emptyInfo").hide();
				$(".editBtn").parent().show();
				$(".countBtn").parent().show();
				$("#cartCount").show();
				cartList=JSON.parse(localStorage.getItem("cartList"));
				//console.log(cartList[0]);
				var countPrice=0;
				for(var i=0;i<cartList.length;i++){
					var goodsListImg=cartList[i].goodsListImg;
					var goodsName=cartList[i].goodsName;
					var discount=cartList[i].discount*0.1;
					var price=cartList[i].price*1;
					var goodsID=cartList[i].goodsID;
					var num=cartList[i].num*1;
					var newPrice=(discount*price).toFixed(2);
					$("#cartList").append('<li class="cartItem">'+
							'<div class="delItem">删除</div>'+
							'<div class="item">'+
								'<div class="itemImg">'+
									'<img src="'+goodsListImg+'"/>'+
								'</div>'+
								'<div class="itemInfo">'+
									'<p>'+goodsName+'</p>'+
									'<p>单价：<span>￥<b>'+newPrice+'</b></span></p>'+
									'<p>数量：<span>'+num+'</span></p>'+
								'</div>'+
							'</div>'+
						'</li>')
					countPrice+=newPrice*num;
				}
				$(".countPrice").html(countPrice.toFixed(2));
				
			}else{
				$(".emptyInfo").show();
				$(".editBtn").parent().hide();
				$(".countBtn").parent().hide();
				$("#cartCount").hide();
			}
					$(".cartItem").swipeLeft(function(){
						$(this).find(".item").animate({left:"-1rem"},300);
						$(this).siblings().find(".item").animate({left:"0rem"},300);
					})
					$(".cartItem").swipeRight(function(){
						$(this).find(".item").animate({left:"0rem"},300);
					})
					$(".delItem").tap(function(){
						//console.log(cartList);
						var index=$(this).parent().index();
						//alert(index);
						cartList.splice(index,1);
						localStorage.setItem("cartList",JSON.stringify(cartList));
						var toast=require("./toast");
						toast.makeText("删除成功",1000);
						that.addCartContent();
						
					});
					//点击结算按钮加载订单信息并跳转订单页
					$(".countBtn").tap(function(){	
						//console.log(cartList);
							var orderList=[];
							orderList=JSON.parse(localStorage.getItem("orderList"));
							if(orderList==null||orderList==0){
								//alert("之前没有订单");
								localStorage.setItem("orderList",JSON.stringify(cartList));
							}else{
								var flag=true;
							    for(var i=0;i<cartList.length;i++){
							    	
									for(var j=0; j<orderList.length;j++){
										if(cartList[i].goodsID == orderList[j].goodsID){
												orderList[j].num= Number(orderList[j].num)+Number(cartList[i].num);
												flag=false;
												break;
											}
													
									}
									if(flag){
											    orderList.push(cartList[i]);
											}
											
								}									
									
								localStorage.setItem("orderList",JSON.stringify(orderList));
								
							}
							localStorage.removeItem("cartList");
							var order=require("./order");
							order.addOrderHeader("cart");
							order.addOrderContent();
							var toast=require("./toast");
							toast.makeText("添加订单成功",1000)
							//console.log("订单列表",JSON.parse(localStorage.getItem("orderList")));
			});
			
		});
	}
}
