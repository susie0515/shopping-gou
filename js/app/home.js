module.exports = {
	addHomeHeader:function(){
		$("#header").load("html/Home.html #homeHeader",function(){
			$(".searchBox").tap(function(){
				var search=require("./search");
				search.addSearchHeader();
				search.addSearchContent();
			});
			$(".login_Btn").tap(function(){
				if(localStorage.getItem("isLogin")=="OK!"){
					var toast=require("./toast");
					toast.makeText("您已登录",1000);
				}else{
					var login=require("./login");
					login.addLoginHeader("home");
					login.addLoginContent("home");
				}
				
				
			});
		});
	},
	addHomeContent:function(){
		$("#content").load("html/Home.html #homeContent",function(){
			//向服务器请求数据
			$.ajax({
				type:"get",
				url:"data/banner.json",
//				dataType:"jsonp",
				beforeSend:function(){
					$(".loading").show();
					$(".swiper-wrapper").hide();
				},
				success:function(data){
					$(".loading").hide();
					$(".swiper-wrapper").show();
					$(".swiper-wrapper").html("");
//					console.log(data);
					var len=data.length;
					for(var i=0;i<len;i++){
	        			$(".swiper-wrapper").append('<div class="swiper-slide"><img src="'+data[i]+'"/></div>')
					}
					//轮播图
					var mySwiper = new Swiper ('.swiper-container', {
					    loop: true,
					    autoplay:3000,
					    autoplayDisableOnInteraction:false,
					    // 如果需要分页器
					    pagination: '.swiper-pagination'
					    
					})     
				}
				
			});	
			//向服务器请求热推商品
			$.ajax({
				type:"get",
				url:"data/hot.json",
//				dataType:"jsonp",
				beforeSend:function(){
					
				},
				success:function(data){
					//console.log(data[0]);
					var len=data.length;
					$("#proList").html("");
					for(var i=0;i<len;i++){
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
//						$("#proList").append('<li goodsID='+goodsID+'>'+
//							'<div class="proImg">'+
//								'<img src="'+goodsListImg+'"/>'+
//							'</div>'+
//							'<div class="proInfo">'+
//								'<p>'+goodsName+'</p>'+
//								'<p><span>￥<b>'+newPrice.toFixed(1)+'</b></span> <del>￥'+price+'</del></p>'+
//								'<p>'+discount+'折</p>'+
//								'<span class="cartBtn" goodsID='+goodsID+'><i class="iconfont">&#xe602;</i></span>'+
//							'</div>'+
//						'</li>')
						$("#proList").append('<li goodsID="'+goodsID+'">'+
												'<div class="proImg">'+
													'<img src="'+goodsListImg+'"/>'+
												'</div>'+
												'<div class="proInfo">'+
													'<p><span>￥'+newPrice.toFixed(2)+'</span><span>'+discount+'折</span></p>'+
													'<p>￥'+price+'</p>'+
													'<p>'+goodsName+'</p>'+
												'</div>'+
											'</li>');
						
					};
					$("#proList").find("li").on("tap",function(){
						//alert("detail");
						var goodsID=$(this).attr("goodsID");
						//alert(goodsID);
						var detail=require("./detail");
						detail.addDetailHeader("home");
						detail.addDetailContent(goodsID);
						detail.addDetailFoot();
					});
					
				}
					
			});
			$(".classify").find("li").tap(function(){
				/*alert($(this).index())*/
				var str = ["1","2","3","4","5","6","7","8","9","10"]
				var classID = str[$(this).index()]
				var ThemeList = require("./ThemeList");
				ThemeList.loadThemeListHeader(classID);
				ThemeList.loadThemeListContent(classID);
			})
			   
		});
		
	}
}
