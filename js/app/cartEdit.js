module.exports = {
	addCartEditHeader:function(){
		$("#header").load("html/CartEdit.html #cartEditHeader",function(){
			$(".finishBtn").tap(function(){
				var cart=require("./cart");
				cart.addCartHeader();
				cart.addCartContent();
			})
		});
	},
	addCartEditContent:function(){
		$("#content").load("html/CartEdit.html #cartEditContent",function(){
			var cartList;
			cartList=JSON.parse(localStorage.getItem("cartList"));
			$("#cartEditList").html("");
			for(var i=0;i<cartList.length;i++){
					var goodsListImg=cartList[i].goodsListImg;
					var goodsName=cartList[i].goodsName;
					var discount=cartList[i].discount*0.1;
					var price=cartList[i].price*1;
					var goodsID=cartList[i].goodsID;
					var num=cartList[i].num*1;
					var newPrice=(discount*price).toFixed(2);
					$("#cartEditList").append('<li class="cartItem">'+
						'<div class="item">'+
							'<div class="itemImg">'+
								'<img src="'+goodsListImg+'"/>'+
							'</div>'+
							'<div class="itemInfo">'+
								'<p>'+goodsName+'</p>'+
								'<p>单价：<span>￥<b>'+newPrice+'</b></span></p>'+
								'<p>数量：<strong><span class="numberAdd">+</span><span class="numberChange">'+num+'</span><span class="numberReduce">-</span></strong></p>'+
							'</div>'+
						'</div>'+
					'</li>')

				}
			
			 $(".numberAdd").tap(function(){
			 	var index=$(this).parent().parent().parent().parent().parent().index();
			    //alert(index);
			 	var addNum=$(".numberChange").eq(index).html()*1;
			 	addNum++;
			 	$(".numberChange").eq(index).html(addNum);
			   	cartList[index].num=addNum;
			   	localStorage.setItem("cartList",JSON.stringify(cartList));
			   	var toast=require("./toast");
			    toast.makeText("更新成功",1000);
				
			 });
			$(".numberReduce").tap(function(){
				var index=$(this).parent().parent().parent().parent().parent().index();
			    //alert(index);
			 	var reduceNum=$(".numberChange").eq(index).html()*1;
			 	reduceNum--;
			 	if(reduceNum==0){
			 		reduceNum=0;
			 		var toast=require("./toast");
					toast.makeText("删除商品请到购物车页面",1000);
					
			 	}else{
			 		$(".numberChange").eq(index).html(reduceNum);
				   	cartList[index].num=reduceNum;
				   	localStorage.setItem("cartList",JSON.stringify(cartList));
				   	var toast=require("./toast");
					toast.makeText("更新成功",1000);
				
			 	}
			 	
			});
			
		});
	}
	
}
