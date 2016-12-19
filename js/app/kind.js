module.exports = {
	addKindHeader:function(type){

		$("#header").load("html/Kind.html #kindHeader",function(){
			$("#back").tap(function(){
				if(type=="home"){
					var home=require("./home");
					home.addHomeHeader();
					home.addHomeContent();
				}
			})
			
		});
	},
	addKindContent:function(){
		$("#content").load("html/Kind.html #kindContent",function(){
			
			$(".changeList").tap(function(){
						if($(this).children().hasClass("list11")){
							$(".changeList>i").html("&#xe657;");
							$(".kindList").html("");
							$(".list11").removeClass("list11").addClass("list22");
							$.getJSON("data/off.json",function(data){
							for(var i=0;i<data.length;i++){
								var goodsListImg=data[i].goodsListImg;
								var goodsName=data[i].goodsName;
								var price=data[i].price*1;
								var discount=data[i].discount*1;
								var goodsID = data[i].goodsID;
								var newPrice;
								if(discount==0){
									newPrice=price;
								}else{
									newPrice=price*discount/10;
								}
							
								$(".kindList").append('<li class="list2" goodsID="'+goodsID+'">'+
														'<div class="proImg">'+
															'<img src="'+goodsListImg+'"/>'+
														'</div>'+
														'<div class="proInfo">'+
															'<p>'+goodsName+'</p>'+
															'<p><span>￥<b>'+newPrice.toFixed(2)+'</b></span> <del>￥'+price+'</del></p>'+
															'<p>'+discount+'折</p>'+
															'<span class="cartBtn"><i class="iconfont">&#xe602;</i></span>'+
														'</div>'+
													'</li>');
							}
							
							$(".list2").on("tap",function(){
/*								console.log($(this).attr("goodsID"))*/
								var goodsID = $(this).attr("goodsID");
								var detail=require("./detail");
								detail.addDetailHeader("home");
								detail.addDetailContent(goodsID);
								detail.addDetailFoot();
							})
						})
									}else{
										$(".changeList>i").html("&#xe636;");
										$(".kindList").html("");
										$(".list22").removeClass("list22").addClass("list11");
										$.getJSON("data/off.json",function(data){
											//console.log(data);
											for(var i=0;i<data.length;i++){
												var goodsListImg=data[i].goodsListImg;
												var goodsName=data[i].goodsName;
												var price=data[i].price*1;
												var discount=data[i].discount*1;
												var goodsID = data[i].goodsID;
												var newPrice;
												if(discount==0){
													newPrice=price;
												}else{
													newPrice=price*discount/10;
												}
												
												$(".kindList").append('<li class="list1" goodsID="'+goodsID+'">'+
																			'<div class="proImg">'+
																				'<img src="'+goodsListImg+'"/>'+
																			'</div>'+
																			'<div class="proInfo">'+
																				'<p><span>￥'+newPrice.toFixed(2)+'</span><span>'+discount+'折</span></p>'+
																				'<p>￥'+price+'</p>'+
																				'<p>'+goodsName+'</p>'+
																			'</div>'+
																		'</li>');
							//					$(".kindList").append('<li class="list2" goodsID="'+goodsID+'">'+
							//											'<div class="proImg">'+
							//												'<img src="'+goodsListImg+'"/>'+
							//											'</div>'+
							//											'<div class="proInfo">'+
							//												'<p>'+goodsName+'</p>'+
							//												'<p><span>￥<b>'+newPrice.toFixed(2)+'</b></span> <del>￥'+price+'</del></p>'+
							//												'<p>'+discount+'折</p>'+
							//												'<span class="cartBtn"><i class="iconfont">&#xe602;</i></span>'+
							//											'</div>'+
							//										'</li>');
											}
											
											
											$(".list1").on("tap",function(){
//												console.log($(this).index())
												
//											var goodsID = $(this).attr("goodsID");
//											var detail=require("./detail");
//											detail.addDetailHeader("home");
//											detail.addDetailContent(goodsID);
//											detail.addDetailFoot();
							})
										})
									}
					})
			$.getJSON("data/off.json",function(data){
			//	console.log(data);
				for(var i=0;i<data.length;i++){
					var goodsListImg=data[i].goodsListImg;
					var goodsName=data[i].goodsName;
					var price=data[i].price*1;
					var discount=data[i].discount*1;
					var goodsID = data[i].goodsID;
					var newPrice;
					if(discount==0){
						newPrice=price;
					}else{
						newPrice=price*discount/10;
					}
					
					$(".kindList").append('<li class="list1" goodsID="'+goodsID+'">'+
												'<div class="proImg">'+
													'<img src="'+goodsListImg+'"/>'+
												'</div>'+
												'<div class="proInfo">'+
													'<p><span>￥'+newPrice.toFixed(2)+'</span><span>'+discount+'折</span></p>'+
													'<p>￥'+price+'</p>'+
													'<p>'+goodsName+'</p>'+
												'</div>'+
											'</li>');
//					$(".kindList").append('<li class="list2" goodsID="'+goodsID+'">'+
//											'<div class="proImg">'+
//												'<img src="'+goodsListImg+'"/>'+
//											'</div>'+
//											'<div class="proInfo">'+
//												'<p>'+goodsName+'</p>'+
//												'<p><span>￥<b>'+newPrice.toFixed(2)+'</b></span> <del>￥'+price+'</del></p>'+
//												'<p>'+discount+'折</p>'+
//												'<span class="cartBtn"><i class="iconfont">&#xe602;</i></span>'+
//											'</div>'+
//										'</li>');
				}
				
				
											$(".list1").on("tap",function(){
//												console.log($(this).index())
											
											var goodsID = $(this).attr("goodsID");
											var detail=require("./detail");
											detail.addDetailHeader("home");
											detail.addDetailContent(goodsID);
											detail.addDetailFoot();
							})
			})
		});
	}
	
}
