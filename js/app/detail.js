var mySwiper;
module.exports = {
	addDetailHeader:function(type){
		$("#header").load("html/Detail.html #detailHeader",function(){
			$("#back").on("tap",function(){
				//alert("111");
				if(type=="home"){
					var home=require("./home");
					var foot=require("./foot");
					home.addHomeHeader();
					home.addHomeContent();
					foot.addFoot();
				}if(type=="search"){
					var search=require("./search");
					var foot=require("./foot");
					search.addSearchHeader();
					search.addSearchContent();
					foot.addFoot();
				}
				
			})
		});
	},
	addDetailContent:function(goodsID){
		$("#content").load("html/Detail.html #detailContent",function(){
			/*console.log(Number(goodsID))*/
			var str;
			if(0<goodsID&&goodsID<201){
				str = "data/data.json";
			}else if(200<goodsID&&goodsID<217){
				str = "data/hot.json";
			}else{
				str = "data/off.json";
			}
            console.log(goodsID)
			$.ajax({
				type: "get",
				url: str,
				success: function(data) {
					var len;
					var imgurl;
					var goodsName;
					var price;
					var discount;
					var newPrice;
					var goodsinfo;
					var goodsName;
					var strObj;
					for(i = 0; i < data.length; i++) {
						if(data[i].goodsID == goodsID) {
							console.log(data[i]);
							strObj=data[i];
							len = data[i].imgList.length;
							imgurl = data[i].imgList;
							discount = data[i].discount;
							goodsName = data[i].goodsName
							goodsinfo=data[i];
							price = data[i].price;
							var newPrice;
							if(discount == 0) {
								newPrice = price;
								discount = "不打"
							} else {
								newPrice = price * discount / 10;
							}
							$("#detailInfo").append('<p>' + goodsName + '</p>' +
								'<p>尺码:</p>' +
								'<p class="size"><span class="s1">S</span><span>M</span><span>L</span><span>XL</span><span>XXL</span></p>' +
								'<p><span>￥' + newPrice.toFixed(2)+ '</span><span>￥' + price + '</span><span>' + discount + '折</span></p>')

						}
					}
					//console.log(strObj);
					$(".swiper-wrapper").html("");
					for(j = 0; j < len; j++) {
						//console.log(imgurl)	
						$(".swiper-wrapper").append('<div class="swiper-slide maskImg" imgsrc="' + imgurl[j] + '"><img src="' + imgurl[j] + '" alt="" /></div>');
					}
					var bannerSwiper =new Swiper(".swiper-container",{
						loop:true,
						preventLinksPropagation : true,
						pagination: '.swiper-pagination'
					})
					$(".btn").on("tap", function() {
//						evt.stopPropagation();
						if(localStorage.getItem("isLogin") == "OK!") {
							var userID = localStorage.getItem("userID");
							var cartList=[];
							if(localStorage.getItem("cartList")){
								cartList=JSON.parse(localStorage.getItem("cartList"));
							}
							var has=false;
							for(var i=0;i<cartList.length;i++){
								if(cartList[i].goodsID==strObj.goodsID){
									cartList[i].num++;
									var has=true;
								}
							}
							if(!has){
								strObj.num=1;
								cartList.push(strObj);
							}
							localStorage.setItem("cartList",JSON.stringify(cartList));
							//console.log(cartList);
							var toast=require("./toast");
							toast.makeText("添加购物车成功",1000);
						}else {
							var login = require("./login");
							login.addLoginHeader("home");
							login.addLoginContent("home");
							var foot=require("./foot");
							foot.addFoot();
						}

					})

					$(".cart").on("tap", function(evt) {
						evt.stopPropagation();
						if(localStorage.getItem("isLogin") == "OK!") {
							var foot = require("./foot");
							var cart = require("./cart");
							cart.addCartHeader();
							cart.addCartContent();
							foot.addFoot("2");
							//$("#bottom li").eq(2).addClass("active").removeClass("active");

						} else {
							var login = require("./login");
							var foot = require("./foot");
							login.addLoginHeader("home");
							login.addLoginContent("home");
							foot.addFoot();
						}

					})

					$(".size span").on("tap", function(evt) {
						evt.stopPropagation();
						$(this).addClass("s1").siblings().removeClass("s1");

					})

					$(".maskImg").doubleTap(function() {
						$("#mask").show();
						$("#mask").find("img").attr("src", $(this).attr("imgsrc"));
					})
					$("#mask").tap(function() {
						$("#mask").hide();
						//$("#mask").find("img").attr("src",$(this).attr("imgsrc"));
					})
				}
			})
//			mySwiper = new Swiper ('#detailSwiper', {
//				resistanceRatio:0,
//				onSlideChangeEnd: function(swiper){
//				     // alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
//				      var _index = swiper.activeIndex;
//				      $("#detailFoot").find("li").eq(_index).addClass("active").siblings().removeClass("active");
//				}
//			});
			
		})
	},
	addDetailFoot:function(){
		$("#footer").load("html/Detail.html #detailFoot",function(){
//			$("#detailFoot ul").find("li").on("tap",function(){
//				var $index=$(this).index();
//				$(this).addClass("active").siblings().removeClass("active");
//				mySwiper.slideTo($index, 300, false);
//			})
		})
	}
	
}
