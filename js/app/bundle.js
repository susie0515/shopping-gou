/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var home=__webpack_require__(1);
	var foot=__webpack_require__(4);
	__webpack_require__(15);
	home.addHomeHeader();
	home.addHomeContent();
	foot.addFoot();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		addHomeHeader:function(){
			$("#header").load("html/Home.html #homeHeader",function(){
				$(".searchBox").tap(function(){
					var search=__webpack_require__(2);
					search.addSearchHeader();
					search.addSearchContent();
				});
				$(".login_Btn").tap(function(){
					if(localStorage.getItem("isLogin")=="OK!"){
						var toast=__webpack_require__(8);
						toast.makeText("您已登录",1000);
					}else{
						var login=__webpack_require__(11);
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
							var detail=__webpack_require__(3);
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
					var ThemeList = __webpack_require__(14);
					ThemeList.loadThemeListHeader(classID);
					ThemeList.loadThemeListContent(classID);
				})
				   
			});
			
		}
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
							var detail=__webpack_require__(3);
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
					var home = __webpack_require__(1);
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var mySwiper;
	module.exports = {
		addDetailHeader:function(type){
			$("#header").load("html/Detail.html #detailHeader",function(){
				$("#back").on("tap",function(){
					//alert("111");
					if(type=="home"){
						var home=__webpack_require__(1);
						var foot=__webpack_require__(4);
						home.addHomeHeader();
						home.addHomeContent();
						foot.addFoot();
					}if(type=="search"){
						var search=__webpack_require__(2);
						var foot=__webpack_require__(4);
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
								var toast=__webpack_require__(8);
								toast.makeText("添加购物车成功",1000);
							}else {
								var login = __webpack_require__(11);
								login.addLoginHeader("home");
								login.addLoginContent("home");
								var foot=__webpack_require__(4);
								foot.addFoot();
							}

						})

						$(".cart").on("tap", function(evt) {
							evt.stopPropagation();
							if(localStorage.getItem("isLogin") == "OK!") {
								var foot = __webpack_require__(4);
								var cart = __webpack_require__(6);
								cart.addCartHeader();
								cart.addCartContent();
								foot.addFoot("2");
								//$("#bottom li").eq(2).addClass("active").removeClass("active");

							} else {
								var login = __webpack_require__(11);
								var foot = __webpack_require__(4);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		addFoot:function(type){
			$("#footer").load("html/Foot.html #bottom",function(){
				var home=__webpack_require__(1);
				var kind=__webpack_require__(5);
				var cart=__webpack_require__(6);
				var user=__webpack_require__(10);
				var theme=__webpack_require__(13);		
	//			home.addHomeHeader();
	//			home.addHomeContent();
				$("#bottom").find("li").on("tap",function(){
					var $index=$(this).index();
					$(this).addClass("active").siblings().removeClass("active");
					switch($index){
						case 0:
						home.addHomeHeader();
	   					home.addHomeContent();
	   					break;
	   					case 1:
						kind.addKindHeader();
	   					kind.addKindContent();
	   					break;
	   					case 2:
	   					if(localStorage.getItem("isLogin")=="OK!"){
	   						cart.addCartHeader();
	   						cart.addCartContent(localStorage.getItem("userID"));
	   					}else{
	   						var login=__webpack_require__(11);
							login.addLoginHeader("cart");
							login.addLoginContent("cart");
	   					}
	   					break;
	   					case 3:
	   					theme.loadThemeHeader();
	   					theme.loadThemeContent();
	   					break;
	   					case 4:
						user.addUserHeader();
	   					user.addUserContent();
	   					break;
	   					default:
	   					break;
					}
				})
				if(type=="2"){
					$("#bottom").find("li").eq(2).addClass("active").siblings().removeClass("active");
				}
			});
		}
		
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		addKindHeader:function(type){

			$("#header").load("html/Kind.html #kindHeader",function(){
				$("#back").tap(function(){
					if(type=="home"){
						var home=__webpack_require__(1);
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
									var detail=__webpack_require__(3);
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
												var detail=__webpack_require__(3);
												detail.addDetailHeader("home");
												detail.addDetailContent(goodsID);
												detail.addDetailFoot();
								})
				})
			});
		}
		
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		addCartHeader:function(){
		
			$("#header").load("html/Cart.html #cartHeader",function(){
				$(".editBtn").tap(function(){
					var cartEdit=__webpack_require__(7);
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
					var home=__webpack_require__(1);
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
					$(".editBtn").hide();
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
							var toast=__webpack_require__(8);
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
								var order=__webpack_require__(9);
								order.addOrderHeader("cart");
								order.addOrderContent();
								var toast=__webpack_require__(8);
								toast.makeText("添加订单成功",1000)
								//console.log("订单列表",JSON.parse(localStorage.getItem("orderList")));
				});
				
			});
		}
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		addCartEditHeader:function(){
			$("#header").load("html/CartEdit.html #cartEditHeader",function(){
				$(".finishBtn").tap(function(){
					var cart=__webpack_require__(6);
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
				   	var toast=__webpack_require__(8);
				    toast.makeText("更新成功",1000);
					
				 });
				$(".numberReduce").tap(function(){
					var index=$(this).parent().parent().parent().parent().parent().index();
				    //alert(index);
				 	var reduceNum=$(".numberChange").eq(index).html()*1;
				 	reduceNum--;
				 	if(reduceNum==0){
				 		reduceNum=0;
				 		var toast=__webpack_require__(8);
						toast.makeText("删除商品请到购物车页面",1000);
						
				 	}else{
				 		$(".numberChange").eq(index).html(reduceNum);
					   	cartList[index].num=reduceNum;
					   	localStorage.setItem("cartList",JSON.stringify(cartList));
					   	var toast=__webpack_require__(8);
						toast.makeText("更新成功",1000);
					
				 	}
				 	
				});
				
			});
		}
		
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports={
		makeText:function(str,time){
			$("#toast").show();
			$("#toast").html(str);
			setTimeout(function(){
				$("#toast").hide();
			},time);
		}
	}



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		addOrderHeader:function(type){
			$("#header").load("html/Order.html #orderHeader",function(){
				$("#back").tap(function(){
						if(type=="cart"){
							var cart=__webpack_require__(6);
							cart.addCartHeader();
							cart.addCartContent();
						}else if(type=="user"){
							var user=__webpack_require__(10);
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		addUserHeader:function(){
			$("#header").load("html/User.html #userHeader",function(){
				
			});
		},
		addUserContent:function(){
			$("#content").load("html/User.html #userContent",function(){
				$(".loginBtn").tap(function(){
					//alert("111");
					var login=__webpack_require__(11);
					login.addLoginHeader("user");
					login.addLoginContent("user");
				});
				$(".registerBtn").tap(function(){
					//alert("111");
					var register=__webpack_require__(12);
					register.addRegisterHeader("user");
					register.addRegisterContent();
				})
				$(".userExit").on('tap',function(){
					localStorage.setItem("isLogin","error");
					$(".userName").html("");
					$(".userBtn").show();
					
				})
				$(".cartBtn").tap(function(){
					//alert("111");
					if(localStorage.getItem("isLogin")=="OK!"){
						var cart=__webpack_require__(6);
						var foot=__webpack_require__(4);
						cart.addCartHeader();
						cart.addCartContent();
						foot.addFoot("2");
					}else{
						var login=__webpack_require__(11);
						login.addLoginHeader("user");
						login.addLoginContent("user");
					}
					
				})
				$(".myOrder").on('tap',function(){
					if(localStorage.getItem("isLogin")=="OK!"){
						var order=__webpack_require__(9);
						order.addOrderHeader("user");
						order.addOrderContent();
					}else{
						var login=__webpack_require__(11);
						login.addLoginHeader("user");
						login.addLoginContent("user");
					}
				})
				if(localStorage.getItem("isLogin")=="OK!"){
					$(".userName").html(localStorage.getItem("userID"));
					$(".userBtn").hide();
					
				}else{
					$(".userName").hide();
					$(".userBtn").show();
				}
				
			});
		}
		
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		toLogin:function(userID,password,type){
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php?callback=",
				data:{
					"status":"login",
					"userID":userID,
					"password":password
				},
				success:function(data){
					var toast=__webpack_require__(8);
					//console.log(data);
					
					if(data=="0"){
						toast.makeText("用户名不存在!",1000);
					}else if(data=="2"){
						toast.makeText("用户名与密码不相符!",1000);
					}else{
						localStorage.setItem("isLogin","OK!");
						localStorage.setItem("userID",userID);
						toast.makeText("登录成功!",1000);
						if(type=="home"){
							var home=__webpack_require__(1);
							var foot=__webpack_require__(4);
							home.addHomeHeader();
							home.addHomeContent();
							foot.addFoot();
						}else if(type=="user"){
							var user = __webpack_require__(10);
							user.addUserHeader();
							user.addUserContent();
						}else if(type=="cart"){
							var cart = __webpack_require__(6);
							cart.addCartHeader();
							cart.addCartContent();
						}
					}
					
	//				var login=require("./login");
	//				login.addLoginHeader("register");
	//				login.addLoginContent();
				}
			})
		},
		addLoginHeader:function(type){
			$("#header").load("html/Login.html #loginHeader",function(){
				$(".register").on("tap",function(){
					//alert("111");
					var register=__webpack_require__(12);
					register.addRegisterHeader("login");
					register.addRegisterContent();
					
				});
				$("#back").on("tap",function(){
					if(type=="user"){
						var user=__webpack_require__(10);
						user.addUserHeader();
						user.addUserContent();
					}else if(type=="register"){
						var register=__webpack_require__(12);
						register.addRegisterHeader();
						register.addRegisterContent();
					}else if(type=="home"){
						var home=__webpack_require__(1);
						home.addHomeHeader();
						home.addHomeContent();
					}
					
				})
			});
		},
		addLoginContent:function(type){
			var that=this;
			$("#content").load("html/Login.html #loginContent",function(){
				var toast=__webpack_require__(8);
				$("#login").on('tap',function(){
					
					var userID=$("#userID").val();
					var password=$("#password").val();
					if(userID==""){
						toast.makeText("用户名不能为空",1000);
					}else{
						if(password==""){
							toast.makeText("密码不能为空",1000);
						}else{
							
							that.toLogin(userID,password,type);
							
						}
						
					}
					
					
				})
			});
		}
		
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		toRegister:function(userID,password){
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					"status":"register",
					"userID":userID,
					"password":password
				},
				success:function(data){
	//				console.log(data);
					var toast=__webpack_require__(8);
					if(data=="0"){
						toast.makeText("该用户名已经被注册",1000);
					}else if(data=="1"){
						toast.makeText("注册成功！",1000);
						var login=__webpack_require__(11);
						login.addLoginHeader("register");
						login.addLoginContent();
					}
				}
			});
		},
		addRegisterHeader:function(type){
			$("#header").load("html/Register.html #registerHeader",function(){
				$(".login").on("tap",function(){
					//alert("111");
					var login=__webpack_require__(11);
					login.addLoginHeader("register");
					login.addLoginContent();
				});
				$("#back").on("tap",function(){
					//alert("111");
					if(type=="user"){
						var user=__webpack_require__(10);
						user.addUserHeader();
						user.addUserContent();
					}else if(type="login"){
						var login=__webpack_require__(11);
						login.addLoginHeader("register");
						login.addLoginContent();
					}
				})
			});
		},
		addRegisterContent:function(){
			var that=this;
			$("#content").load("html/Register.html #registerContent",function(){
				var toast=__webpack_require__(8);
				$("#register").on('tap',function(){
					var userID=$("#userID").val();
					var password1=$("#password").val();
					var password2=$("#repeatPassword").val();
					if(userID==""){
						toast.makeText("用户名不能为空",1000);
					}else{
						if(password1==""){
							toast.makeText("密码不能为空",1000);
						}else{
							if(password1!=password2){
								toast.makeText("两次密码不一致",1000);
							}else{
	//							toast.makeText("注册成功!",1000);
								that.toRegister("userID","password1");
	//							var login=require("./login");
	//							login.addLoginHeader("register");
	//							login.addLoginContent();
							}
						}
						
					}
					
					
				})
				
			});
		}
		
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

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
							var ThemeList = __webpack_require__(14);
							ThemeList.loadThemeListHeader(classID);
							ThemeList.loadThemeListContent(classID);
						})
						$(".Themekind2").on("tap",function(event){
	                        event.stopPropagation();
							var classID = $(this).attr("classID")
							var ThemeList = __webpack_require__(14);
							ThemeList.loadThemeListHeader(classID);
							ThemeList.loadThemeListContent(classID);
						})
					}	
				})			

			})
		}
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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
							var detail=__webpack_require__(3);
							detail.addDetailHeader("home");
							detail.addDetailContent(goodsID);
							detail.addDetailFoot();
						})
					}
					
				});

			})
		}
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.1.0@sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.1.0@sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 12px;\n  line-height: 1.5;\n  font-family: arial; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0;\n  width: 100%;\n  display: block; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale; }\n\n@font-face {\n  font-family: 'iconfont';\n  /* project id 200036 */\n  src: url(\"//at.alicdn.com/t/font_a0ctj1pm0uy58kt9.eot\");\n  src: url(\"//at.alicdn.com/t/font_a0ctj1pm0uy58kt9.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_a0ctj1pm0uy58kt9.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_a0ctj1pm0uy58kt9.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_a0ctj1pm0uy58kt9.svg#iconfont\") format(\"svg\"); }\n\nhtml {\n  font-size: 100px;\n  width: 100%;\n  height: 100%; }\n\nbody {\n  width: 100%;\n  height: 100%;\n  font-size: 12px;\n  display: flex;\n  flex-direction: column; }\n\nhtml, body {\n  overflow: hidden; }\n\n#toast {\n  position: fixed;\n  z-index: 9999 !important;\n  font-size: 0.32rem;\n  bottom: 2rem;\n  left: 1.8rem;\n  padding: 0.3rem;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.95);\n  border-radius: 0.1rem;\n  display: none; }\n\n#mask {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 9999 !important;\n  display: none; }\n  #mask img {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%); }\n\nheader {\n  width: 100%;\n  height: 0.8rem;\n  background: #fff;\n  box-sizing: border-box;\n  border-bottom: 1px solid #eee; }\n  header #homeHeader {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    font-size: 0.4rem;\n    color: #fff;\n    padding: 0 4%; }\n    header #homeHeader li {\n      height: 100%; }\n      header #homeHeader li:nth-child(1) {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 80%; }\n        header #homeHeader li:nth-child(1) .searchBox {\n          width: 100%;\n          height: 60%;\n          background: #f5f5f5;\n          color: #999;\n          border-radius: 0.3rem;\n          display: flex;\n          align-items: center; }\n          header #homeHeader li:nth-child(1) .searchBox i {\n            width: 0.5rem; }\n            header #homeHeader li:nth-child(1) .searchBox i.iconfont {\n              margin-left: 0.2rem; }\n          header #homeHeader li:nth-child(1) .searchBox span {\n            margin-top: 0.03rem;\n            font-size: 0.12rem; }\n      header #homeHeader li:nth-child(2) {\n        width: 12%;\n        display: flex;\n        align-items: center;\n        justify-content: flex-end; }\n        header #homeHeader li:nth-child(2) i.iconfont {\n          font-size: 0.42rem;\n          color: #ccc; }\n  header #kindHeader {\n    width: 100%;\n    height: 100%;\n    display: flex; }\n    header #kindHeader li {\n      height: 0.6rem;\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      header #kindHeader li:nth-of-type(1) i {\n        font-size: 0.48rem;\n        margin-top: 0.1rem;\n        margin-left: 0.3rem; }\n      header #kindHeader li:nth-of-type(2) {\n        flex: 1;\n        font-size: 0.32rem;\n        height: 100%;\n        color: #999; }\n  header #searchHeader {\n    width: 100%;\n    height: 100%; }\n    header #searchHeader .searchBox {\n      display: flex;\n      align-items: center;\n      width: 100%;\n      height: 0.8rem;\n      background: #eeeeee; }\n      header #searchHeader .searchBox .search {\n        margin-left: 5%;\n        width: 80%;\n        height: 70%;\n        border-radius: 0.2rem;\n        display: flex;\n        align-items: center;\n        background: #fff; }\n        header #searchHeader .searchBox .search i {\n          width: 0.4rem;\n          height: 0.4rem;\n          margin: 0 0.2rem; }\n        header #searchHeader .searchBox .search input {\n          flex: 1;\n          height: 100%;\n          border: 0;\n          border-radius: 0.2rem; }\n      header #searchHeader .searchBox span {\n        margin-left: 10px;\n        color: red; }\n    header #searchHeader .searchResult li {\n      list-style: none;\n      width: 100%;\n      height: 1.6rem;\n      border-bottom: 1px solid darkgray; }\n      header #searchHeader .searchResult li .itemBox {\n        width: 100%;\n        height: 1.6rem;\n        display: flex; }\n        header #searchHeader .searchResult li .itemBox .itemImg {\n          height: 1.4rem;\n          width: 1.4rem; }\n          header #searchHeader .searchResult li .itemBox .itemImg img {\n            width: 100%;\n            height: 100%; }\n        header #searchHeader .searchResult li .itemBox .itemInfo {\n          flex: 1;\n          margin-top: 0.14rem;\n          margin-right: 0.2rem;\n          position: relative; }\n          header #searchHeader .searchResult li .itemBox .itemInfo p {\n            width: 100%;\n            font-size: 0.28rem; }\n            header #searchHeader .searchResult li .itemBox .itemInfo p:nth-child(1) {\n              font-weight: 900;\n              line-height: 0.4rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n            header #searchHeader .searchResult li .itemBox .itemInfo p:nth-child(3) {\n              color: #ff5d74; }\n  header #loginHeader {\n    display: flex;\n    padding: 0.1rem 0.2rem; }\n    header #loginHeader li:nth-of-type(1) {\n      height: 0.6rem;\n      line-height: 0.6rem;\n      width: 0.8rem; }\n    header #loginHeader li:nth-child(3) {\n      width: 1.2rem;\n      height: 0.6rem;\n      line-height: 0.6rem;\n      text-align: center;\n      border-radius: 5px;\n      border: 1px solid #A9A9A9; }\n    header #loginHeader li:nth-of-type(2) {\n      flex: 1;\n      text-align: center;\n      font-size: 0.32rem;\n      line-height: 0.6rem; }\n  header #registerHeader {\n    display: flex;\n    padding: 0.1rem 0.2rem; }\n    header #registerHeader li:nth-of-type(1) {\n      height: 0.6rem;\n      line-height: 0.6rem;\n      width: 0.8rem; }\n    header #registerHeader li:nth-child(3) {\n      width: 1.2rem;\n      height: 0.6rem;\n      line-height: 0.6rem;\n      text-align: center;\n      border-radius: 5px;\n      border: 1px solid #A9A9A9; }\n    header #registerHeader li:nth-of-type(2) {\n      flex: 1;\n      text-align: center;\n      font-size: 0.32rem;\n      line-height: 0.6rem; }\n  header #cartHeader {\n    width: 100%;\n    height: 100%;\n    display: flex; }\n    header #cartHeader li {\n      flex: 1;\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      header #cartHeader li:nth-of-type(2) {\n        height: 100%;\n        font-size: 0.32rem;\n        color: #999; }\n      header #cartHeader li:nth-of-type(3) {\n        font-size: 0.28rem;\n        color: #ff5d74; }\n  header #cartEditHeader {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    color: #ff5d74; }\n    header #cartEditHeader li {\n      height: 0.6rem;\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      header #cartEditHeader li:nth-of-type(1) {\n        width: 1.2rem; }\n      header #cartEditHeader li:nth-of-type(2) {\n        flex: 1;\n        height: 100%;\n        font-size: 0.32rem;\n        color: #999; }\n      header #cartEditHeader li:nth-of-type(3) {\n        width: 1.2rem;\n        font-size: 0.28rem;\n        margin-top: 0.1rem;\n        margin-right: 0.3rem; }\n  header #userHeader {\n    height: 0.8rem;\n    background: #EEEEEE;\n    width: 100%; }\n    header #userHeader li {\n      height: 100%;\n      width: 100%;\n      line-height: 0.8rem;\n      height: 0.8rem;\n      font-size: 0.32rem;\n      text-align: center;\n      color: #999; }\n  header #detailHeader {\n    width: 100%;\n    height: 0.8rem;\n    display: flex; }\n    header #detailHeader li {\n      font-size: 0.32rem;\n      color: #999; }\n      header #detailHeader li:nth-child(1) {\n        flex: 1;\n        font-size: 0.4rem;\n        line-height: 0.8rem;\n        margin-left: 0.1rem; }\n      header #detailHeader li:nth-child(2) {\n        flex: 2;\n        font-size: 0.4rem;\n        line-height: 0.8rem; }\n  header #orderHeader {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    color: #ff5d74; }\n    header #orderHeader li {\n      height: 0.6rem;\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      header #orderHeader li:nth-of-type(1) {\n        width: 1.2rem;\n        font-size: 0.28rem;\n        margin-top: 0.1rem;\n        margin-left: 0.3rem;\n        border-radius: 0.1rem; }\n      header #orderHeader li:nth-of-type(2) {\n        flex: 1;\n        height: 100%;\n        font-size: 0.32rem;\n        color: #999; }\n      header #orderHeader li:nth-of-type(3) {\n        width: 1.2rem;\n        font-size: 0.28rem;\n        margin-top: 0.1rem;\n        margin-right: 0.3rem;\n        border-radius: 0.1rem; }\n  header #ThemeHeader {\n    display: flex;\n    height: 100%;\n    width: 100%;\n    position: relative; }\n    header #ThemeHeader .logo {\n      width: 100%;\n      text-align: center;\n      margin: 0.1rem;\n      color: #999;\n      font-size: 0.32rem; }\n    header #ThemeHeader > .ThemeNav {\n      display: block;\n      position: absolute;\n      width: 0.6rem;\n      height: 0.6rem;\n      right: 0.2rem;\n      top: 0.1rem;\n      font-size: 0.40rem;\n      line-height: 0.6rem;\n      text-align: center;\n      letter-spacing: 0.075rem;\n      weight: 600;\n      color: #ccc; }\n  header #ThemeListHeader {\n    display: flex;\n    height: 100%;\n    width: 100%; }\n    header #ThemeListHeader .logo {\n      width: 100%;\n      text-align: center;\n      margin: 0.1rem;\n      color: #black;\n      font-size: 0.4rem; }\n\nsection {\n  flex: 1;\n  overflow-y: auto;\n  /**************************************themeContent_top**********************************************/\n  /**************************************themeContent_bottom**********************************************/\n  /**************************************themeListContent_top**********************************************/\n  /**************************************themeListContent_bottom**********************************************/ }\n  section #homeContent {\n    width: 100%;\n    height: 100%;\n    position: relative; }\n    section #homeContent .swiper-container {\n      width: 100%;\n      height: 3rem;\n      background: #ccc;\n      overflow: hidden; }\n      section #homeContent .swiper-container .loading {\n        width: 100%;\n        height: 100%; }\n        section #homeContent .swiper-container .loading img {\n          width: 100%;\n          height: 100%; }\n    section #homeContent .classify {\n      width: 100%;\n      height: 3rem;\n      display: flex;\n      flex-wrap: wrap; }\n      section #homeContent .classify li {\n        max-width: 20%;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center; }\n        section #homeContent .classify li .classItem {\n          width: 80%; }\n        section #homeContent .classify li p {\n          font-size: 0.28rem; }\n    section #homeContent #proList {\n      width: 100%;\n      height: 100%;\n      display: flex;\n      flex-wrap: wrap; }\n      section #homeContent #proList li {\n        border-radius: 0.05rem;\n        margin-left: 1%;\n        margin-top: 0.1rem;\n        max-width: 46%;\n        height: 4rem;\n        border: 1px solid #eee;\n        padding: 1%; }\n        section #homeContent #proList li .proImg {\n          width: 100%;\n          height: 65%;\n          overflow: hidden; }\n          section #homeContent #proList li .proImg img {\n            width: 100%; }\n        section #homeContent #proList li .proInfo {\n          line-height: 0.4rem; }\n          section #homeContent #proList li .proInfo p:nth-child(1) {\n            display: flex; }\n            section #homeContent #proList li .proInfo p:nth-child(1) span:nth-child(1) {\n              flex: 1;\n              font-size: 0.32rem;\n              color: #ff5d74;\n              line-height: 0.6rem; }\n            section #homeContent #proList li .proInfo p:nth-child(1) span:nth-child(2) {\n              margin: 0.1rem;\n              width: 0.8rem;\n              height: 0.4rem;\n              background-color: #ff5d74;\n              color: #fff;\n              text-align: center;\n              line-height: 0.4rem;\n              font-size: 0.32rem;\n              border-radius: 0.05rem; }\n          section #homeContent #proList li .proInfo p:nth-child(2) {\n            text-decoration: line-through;\n            color: #999; }\n          section #homeContent #proList li .proInfo p:nth-child(3) {\n            font-size: 0.26rem;\n            color: #333;\n            display: -webkit-box;\n            overflow: hidden;\n            white-space: normal !important;\n            text-overflow: ellipsis;\n            word-wrap: break-word;\n            -webkit-line-clamp: 1;\n            -webkit-box-orient: vertical; }\n  section #detailContent {\n    width: 100%;\n    height: 100%; }\n    section #detailContent .swiper-container {\n      width: 100%;\n      height: 6rem; }\n    section #detailContent #detailInfo {\n      width: 96%;\n      padding: 0 2%; }\n      section #detailContent #detailInfo p:nth-child(1) {\n        margin-top: 0.2rem;\n        color: #333;\n        font-size: 0.38rem;\n        line-height: 0.52rem;\n        display: -webkit-box;\n        overflow: hidden;\n        white-space: normal !important;\n        text-overflow: ellipsis;\n        word-wrap: break-word;\n        -webkit-line-clamp: 1;\n        -webkit-box-orient: vertical; }\n      section #detailContent #detailInfo p:nth-child(2) {\n        color: #666;\n        font-size: 0.28rem;\n        line-height: 0.8rem;\n        height: 0.8rem; }\n      section #detailContent #detailInfo p:nth-child(3) {\n        width: 100%;\n        height: 0.8rem;\n        display: flex; }\n        section #detailContent #detailInfo p:nth-child(3) span {\n          flex: 1;\n          margin-right: 0.2rem;\n          width: 1rem;\n          height: 0.52rem;\n          display: block;\n          line-height: 0.52rem;\n          text-align: center;\n          font-size: 0.28rem;\n          border: 1px solid #999; }\n        section #detailContent #detailInfo p:nth-child(3) .s1 {\n          border-color: #ff5d74;\n          color: #ff5d74; }\n      section #detailContent #detailInfo p:nth-child(4) {\n        width: 100%;\n        margin-top: 0.2rem;\n        height: 0.8rem;\n        line-height: 0.8rem;\n        display: flex; }\n        section #detailContent #detailInfo p:nth-child(4) span:nth-child(1) {\n          width: 26%;\n          font-size: 0.46rem;\n          color: #ff5d74; }\n        section #detailContent #detailInfo p:nth-child(4) span:nth-child(2) {\n          width: 40%;\n          text-decoration: line-through;\n          color: #666;\n          font-size: 0.30rem;\n          line-height: 0.52rem;\n          margin: 0.2rem 0.2rem 0; }\n        section #detailContent #detailInfo p:nth-child(4) span:nth-child(3) {\n          flex: 1;\n          margin-right: 0.1rem;\n          margin-top: 0.1rem;\n          display: block;\n          width: 1.2rem;\n          height: 0.6rem;\n          font-size: 0.38rem;\n          background-color: #ff5d74;\n          color: #fff;\n          text-align: center;\n          line-height: 0.6rem;\n          border-radius: 0.1rem; }\n  section #userContent {\n    width: 100%;\n    height: 100%;\n    background: #eee;\n    overflow: hidden; }\n    section #userContent .userHeader {\n      width: 100%;\n      height: 3.2rem;\n      background: #f03c64;\n      position: relative; }\n      section #userContent .userHeader .userSet {\n        color: #fff;\n        font-size: 0.42rem;\n        position: absolute;\n        left: 0.12rem;\n        top: 0.12rem; }\n      section #userContent .userHeader .userExit {\n        color: #fff;\n        font-size: 0.42rem;\n        position: absolute;\n        right: 0.12rem;\n        top: 0.12rem; }\n      section #userContent .userHeader .userImgs {\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        margin-top: -0.6rem;\n        margin-left: -0.4rem;\n        color: #eee;\n        font-size: 0.8rem; }\n      section #userContent .userHeader .userBtn {\n        display: flex;\n        color: #fff; }\n        section #userContent .userHeader .userBtn .loginBtn {\n          position: absolute;\n          left: 1.7rem;\n          bottom: 0.3rem;\n          background: lightpink;\n          text-align: center;\n          border-radius: 0.2rem;\n          width: 1.2rem;\n          height: 0.5rem;\n          line-height: 0.5rem; }\n        section #userContent .userHeader .userBtn .registerBtn {\n          position: absolute;\n          right: 1.7rem;\n          bottom: 0.3rem;\n          background: lightpink;\n          text-align: center;\n          border-radius: 0.2rem;\n          width: 1.2rem;\n          height: 0.5rem;\n          line-height: 0.5rem; }\n      section #userContent .userHeader .userName {\n        width: 100%;\n        text-align: center;\n        height: 0.6rem;\n        line-height: 0.6rem;\n        font-size: 0.28rem;\n        color: #fff;\n        position: absolute;\n        top: 68%; }\n    section #userContent .userContent {\n      width: 100%;\n      height: 6.6rem;\n      background: #fff; }\n      section #userContent .userContent .userPic {\n        width: 100%;\n        background: #fff;\n        height: 1.2rem; }\n        section #userContent .userContent .userPic li {\n          width: 33%;\n          float: left;\n          text-align: center; }\n          section #userContent .userContent .userPic li i {\n            color: #ff5d74;\n            text-align: center;\n            font-size: 0.5rem; }\n          section #userContent .userContent .userPic li p {\n            font-family: arial; }\n      section #userContent .userContent .userLi {\n        width: 100%;\n        height: 5.4 rem;\n        background: #eee; }\n        section #userContent .userContent .userLi li {\n          background: #fff;\n          padding-left: 0.2rem;\n          width: 100%;\n          height: 0.8rem;\n          border-bottom: 1px solid #eee;\n          line-height: 0.8rem; }\n          section #userContent .userContent .userLi li i {\n            position: absolute;\n            right: 0.5rem; }\n        section #userContent .userContent .userLi li:nth-child(1) {\n          margin-top: 0.2rem;\n          margin-bottom: 0.2rem; }\n  section #loginContent {\n    display: flex;\n    flex-direction: column;\n    margin: 0.8rem 0.3rem; }\n    section #loginContent input {\n      height: 0.8rem;\n      margin-bottom: 0.5rem;\n      border-radius: 0.1rem;\n      text-indent: 0.24rem; }\n      section #loginContent input:nth-of-type(3) {\n        color: #fff;\n        text-align: center;\n        lin-height: 0.8rem;\n        font-size: 0.32rem;\n        border: 0;\n        background: -webkit-radial-gradient(top, #ffc3da, #ff5d74); }\n    section #loginContent .func {\n      display: flex;\n      height: 0.8rem;\n      line-height: 0.8rem; }\n      section #loginContent .func span {\n        margin-left: 0.1rem;\n        margin-right: 0.5rem; }\n      section #loginContent .func a {\n        text-decoration: underline; }\n  section #registerContent {\n    display: flex;\n    flex-direction: column;\n    margin: 0.8rem 0.3rem; }\n    section #registerContent p {\n      color: palevioletred; }\n    section #registerContent input {\n      height: 0.8rem;\n      margin-top: 0.5rem;\n      border-radius: 0.1rem;\n      text-indent: 0.24rem; }\n      section #registerContent input:nth-of-type(4) {\n        color: #fff;\n        text-align: center;\n        lin-height: 0.8rem;\n        font-size: 0.32rem;\n        border: 0;\n        background: -webkit-radial-gradient(top, #ffc3da, #ff5d74); }\n  section #searchContent {\n    width: 100%;\n    height: 100%; }\n    section #searchContent .searchBox {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 100%;\n      height: 0.8rem;\n      background: #999; }\n      section #searchContent .searchBox .search {\n        width: 90%;\n        height: 70%;\n        border-radius: 0.2rem;\n        display: flex;\n        align-items: center;\n        background: #fff; }\n        section #searchContent .searchBox .search i {\n          width: 0.4rem;\n          height: 0.4rem;\n          margin: 0 0.2rem; }\n        section #searchContent .searchBox .search input {\n          flex: 1;\n          height: 100%;\n          border: 0;\n          border-radius: 0.2rem; }\n    section #searchContent .searchResult li {\n      list-style: none;\n      width: 100%;\n      height: 1.6rem;\n      border-bottom: 1px solid darkgray; }\n      section #searchContent .searchResult li .itemBox {\n        width: 100%;\n        height: 1.6rem;\n        display: flex; }\n        section #searchContent .searchResult li .itemBox .itemImg {\n          height: 1.4rem;\n          width: 1.4rem; }\n          section #searchContent .searchResult li .itemBox .itemImg img {\n            width: 100%;\n            height: 100%; }\n        section #searchContent .searchResult li .itemBox .itemInfo {\n          flex: 1;\n          margin-top: 0.14rem;\n          margin-right: 0.2rem;\n          position: relative; }\n          section #searchContent .searchResult li .itemBox .itemInfo p {\n            width: 100%;\n            font-size: 0.28rem; }\n            section #searchContent .searchResult li .itemBox .itemInfo p:nth-child(1) {\n              font-weight: 900;\n              line-height: 0.4rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n            section #searchContent .searchResult li .itemBox .itemInfo p:nth-child(3) {\n              color: #ff5d74; }\n  section #cartContent {\n    width: 100%;\n    height: 100%; }\n    section #cartContent .emptyInfo {\n      width: 100%;\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center; }\n      section #cartContent .emptyInfo p {\n        width: 2.2rem;\n        height: 1rem;\n        font-size: 0.32rem;\n        line-height: 1rem;\n        text-align: center;\n        border: 1px solid #ff5d74;\n        box-sizing: border-box;\n        color: #ff5d74; }\n    section #cartContent #cartList {\n      margin-bottom: 0.8rem;\n      width: 100%; }\n      section #cartContent #cartList li {\n        width: 100%;\n        height: 1.8rem;\n        position: relative; }\n        section #cartContent #cartList li .delItem {\n          position: absolute;\n          top: 0;\n          right: 0;\n          width: 1rem;\n          height: 100%;\n          background: #ff5d74;\n          color: #fff;\n          font-size: 0.36rem;\n          text-align: center;\n          line-height: 1.8rem; }\n        section #cartContent #cartList li .item {\n          width: 100%;\n          position: absolute;\n          left: 0;\n          top: 0;\n          overflow: hidden;\n          background: #fff;\n          display: flex; }\n          section #cartContent #cartList li .item .itemImg {\n            width: 1.6rem;\n            height: 1.6rem;\n            margin: 0.1rem 0.2rem 0.1rem 0.1rem; }\n            section #cartContent #cartList li .item .itemImg img {\n              height: 100%; }\n          section #cartContent #cartList li .item .itemInfo {\n            flex: 1;\n            margin-top: 0.2rem;\n            position: relative; }\n            section #cartContent #cartList li .item .itemInfo p {\n              line-height: 0.53rem;\n              width: 100%;\n              font-size: 0.28rem; }\n              section #cartContent #cartList li .item .itemInfo p:nth-child(1) {\n                line-height: 0.4rem;\n                display: -webkit-box;\n                overflow: hidden;\n                white-space: normal !important;\n                text-overflow: ellipsis;\n                word-wrap: break-word;\n                -webkit-line-clamp: 1;\n                -webkit-box-orient: vertical; }\n              section #cartContent #cartList li .item .itemInfo p:nth-child(2) {\n                margin-top: 0.1rem; }\n                section #cartContent #cartList li .item .itemInfo p:nth-child(2) span {\n                  font-size: 0.12rem;\n                  color: #ff5d74; }\n                  section #cartContent #cartList li .item .itemInfo p:nth-child(2) span b {\n                    font-size: 0.28rem; }\n        section #cartContent #cartList li:after {\n          position: absolute;\n          left: 0;\n          bottom: 0;\n          content: \"\";\n          width: 100%;\n          height: 1px;\n          background: #eee;\n          transform-origin: 0 0;\n          transform: scaleY(0.5); }\n    section #cartContent #cartCount {\n      position: fixed;\n      left: 0;\n      bottom: 0.8rem;\n      background: #fff;\n      border-top: 1px solid #eee;\n      box-sizing: border-box;\n      display: flex;\n      width: 100%;\n      height: 0.8rem;\n      line-height: 0.8rem; }\n      section #cartContent #cartCount p {\n        flex: 1;\n        display: flex;\n        justify-content: flex-end;\n        margin-right: 0.2rem;\n        font-size: 0.32rem; }\n        section #cartContent #cartCount p span:nth-child(1) {\n          font-size: 0.12rem;\n          color: #ff5d74; }\n        section #cartContent #cartCount p span:nth-child(2) {\n          font-size: 0.32rem;\n          color: #ff5d74;\n          font-weight: bold; }\n      section #cartContent #cartCount .countBtn {\n        width: 1.2rem;\n        height: 0.6rem;\n        font-size: 0.28rem;\n        margin-top: 0.1rem;\n        margin-right: 0.3rem;\n        background: #ff5d74;\n        color: #fff;\n        text-align: center;\n        line-height: 0.6rem; }\n  section #cartEditContent #cartEditList {\n    width: 100%; }\n    section #cartEditContent #cartEditList li {\n      width: 100%;\n      height: 1.8rem;\n      position: relative; }\n      section #cartEditContent #cartEditList li .delItem {\n        position: absolute;\n        top: 0;\n        right: 0;\n        width: 1rem;\n        height: 100%;\n        background: #ff5d74;\n        color: #fff;\n        font-size: 0.36rem;\n        text-align: center;\n        line-height: 1.8rem; }\n      section #cartEditContent #cartEditList li .item {\n        width: 100%;\n        position: absolute;\n        left: 0;\n        top: 0;\n        overflow: hidden;\n        background: #fff;\n        display: flex; }\n        section #cartEditContent #cartEditList li .item .itemImg {\n          width: 1.6rem;\n          height: 1.6rem;\n          margin: 0.1rem 0.2rem 0.1rem 0.1rem; }\n          section #cartEditContent #cartEditList li .item .itemImg img {\n            height: 100%; }\n        section #cartEditContent #cartEditList li .item .itemInfo {\n          flex: 1;\n          margin-top: 0.2rem;\n          position: relative; }\n          section #cartEditContent #cartEditList li .item .itemInfo p {\n            line-height: 0.53rem;\n            width: 100%;\n            font-size: 0.28rem; }\n            section #cartEditContent #cartEditList li .item .itemInfo p:nth-child(1) {\n              line-height: 0.4rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n            section #cartEditContent #cartEditList li .item .itemInfo p:nth-child(2) {\n              margin-top: 0.1rem; }\n              section #cartEditContent #cartEditList li .item .itemInfo p:nth-child(2) span {\n                font-size: 0.12rem;\n                color: #ff5d74; }\n                section #cartEditContent #cartEditList li .item .itemInfo p:nth-child(2) span b {\n                  font-size: 0.28rem; }\n            section #cartEditContent #cartEditList li .item .itemInfo p:nth-child(3) {\n              display: flex; }\n              section #cartEditContent #cartEditList li .item .itemInfo p:nth-child(3) strong {\n                flex: 1;\n                display: flex; }\n                section #cartEditContent #cartEditList li .item .itemInfo p:nth-child(3) strong span {\n                  border: 1px solid #eee;\n                  width: 0.6rem;\n                  height: 80%;\n                  text-align: center;\n                  line-height: 0.4rem; }\n      section #cartEditContent #cartEditList li:after {\n        position: absolute;\n        left: 0;\n        bottom: 0;\n        content: \"\";\n        width: 100%;\n        height: 1px;\n        background: #eee;\n        transform-origin: 0 0;\n        transform: scaleY(0.5); }\n  section #orderContent .orderList {\n    width: 100%; }\n    section #orderContent .orderList li {\n      width: 100%;\n      height: 1.8rem; }\n      section #orderContent .orderList li .item {\n        width: 100%;\n        left: 0;\n        top: 0;\n        overflow: hidden;\n        background: #fff;\n        display: flex; }\n        section #orderContent .orderList li .item .itemImg {\n          width: 1.6rem;\n          height: 1.6rem;\n          margin: 0.1rem 0.2rem 0.1rem 0.1rem; }\n          section #orderContent .orderList li .item .itemImg img {\n            height: 100%; }\n        section #orderContent .orderList li .item .itemInfo {\n          flex: 1;\n          margin-top: 0.2rem;\n          position: relative; }\n          section #orderContent .orderList li .item .itemInfo p {\n            line-height: 0.53rem;\n            width: 100%;\n            font-size: 0.28rem; }\n            section #orderContent .orderList li .item .itemInfo p:nth-child(1) {\n              line-height: 0.4rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n            section #orderContent .orderList li .item .itemInfo p:nth-child(2) {\n              margin-top: 0.1rem; }\n              section #orderContent .orderList li .item .itemInfo p:nth-child(2) span {\n                font-size: 0.12rem;\n                color: #ff5d74; }\n                section #orderContent .orderList li .item .itemInfo p:nth-child(2) span b {\n                  font-size: 0.28rem; }\n      section #orderContent .orderList li:after {\n        position: absolute;\n        left: 0;\n        bottom: 0;\n        content: \"\";\n        width: 100%;\n        height: 1px;\n        background: #eee;\n        transform-origin: 0 0;\n        transform: scaleY(0.5); }\n  section #ThemeContent {\n    width: 100%;\n    height: 100%;\n    position: relative; }\n    section #ThemeContent #ThemeContent1 {\n      width: 100%;\n      height: 100%;\n      position: absolute; }\n      section #ThemeContent #ThemeContent1 > li {\n        width: 100%;\n        height: 3rem;\n        margin-bottom: 0.1rem; }\n        section #ThemeContent #ThemeContent1 > li .img {\n          width: 100%;\n          height: 2.5rem; }\n          section #ThemeContent #ThemeContent1 > li .img img {\n            width: 100%;\n            height: 100%; }\n        section #ThemeContent #ThemeContent1 > li p {\n          font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n          height: 0.5rem;\n          font-weight: 600;\n          font-size: 0.30rem;\n          line-height: 0.5rem;\n          text-indent: 0.4rem;\n          background: #333333;\n          color: white; }\n    section #ThemeContent #ThemeKindNav {\n      position: fixed;\n      right: -1.5rem;\n      top: 0.8rem;\n      bottom: 0.8rem;\n      width: 1.5rem;\n      background: rgba(0, 0, 0, 0.3);\n      overflow: auto; }\n      section #ThemeContent #ThemeKindNav > li {\n        height: 1rem;\n        margin-left: 5%;\n        width: 90%;\n        border-bottom: 2px solid ghostwhite;\n        margin-bottom: 0.1rem;\n        font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n        font-size: 0.34rem;\n        line-height: 1rem;\n        text-align: center;\n        color: whitesmoke; }\n      section #ThemeContent #ThemeKindNav li:hover {\n        color: black; }\n  section #ThemeListContent {\n    width: 100%;\n    height: 100%;\n    position: relative; }\n    section #ThemeListContent > #prolist {\n      height: 100%;\n      width: 100%; }\n      section #ThemeListContent > #prolist li {\n        width: 100%;\n        height: 2rem;\n        display: flex;\n        position: relative;\n        background: white; }\n        section #ThemeListContent > #prolist li:after {\n          content: \"\";\n          position: absolute;\n          width: 100%;\n          height: 1px;\n          bottom: 0;\n          left: 0;\n          background-color: #ccc;\n          transform-origin: 0 0;\n          transform: scaleY(0.5); }\n        section #ThemeListContent > #prolist li .proimg {\n          width: 1.8rem;\n          height: 1.8rem;\n          margin: 0.1rem; }\n          section #ThemeListContent > #prolist li .proimg img {\n            width: 100%;\n            height: 100%; }\n        section #ThemeListContent > #prolist li .proinfo {\n          flex: 1;\n          margin-top: 0.14rem;\n          position: relative;\n          margin-right: 0.4rem;\n          padding-left: 0.2rem;\n          border-bottom: 1px solid #ccc; }\n          section #ThemeListContent > #prolist li .proinfo P {\n            font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n            width: 100%; }\n            section #ThemeListContent > #prolist li .proinfo P:nth-child(1) {\n              font-size: 0.28rem;\n              line-height: 0.34rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n            section #ThemeListContent > #prolist li .proinfo P:nth-child(2) {\n              position: absolute;\n              left: 0.1;\n              bottom: 0.42rem;\n              margin-bottom: 0.3rem;\n              height: 0.3rem;\n              line-height: 0.36rem; }\n              section #ThemeListContent > #prolist li .proinfo P:nth-child(2) span {\n                color: #ff5d74;\n                font-size: 0.28rem; }\n                section #ThemeListContent > #prolist li .proinfo P:nth-child(2) span b {\n                  color: #ff5d74;\n                  font-size: 0.36rem; }\n            section #ThemeListContent > #prolist li .proinfo P:nth-child(3) {\n              position: absolute;\n              left: 0.1;\n              bottom: 0.02rem;\n              margin-bottom: 0.12rem;\n              height: 0.34rem;\n              font-size: 0.28rem;\n              line-height: 0.34rem; }\n              section #ThemeListContent > #prolist li .proinfo P:nth-child(3) del {\n                color: #999;\n                margin-left: 0.1rem; }\n              section #ThemeListContent > #prolist li .proinfo P:nth-child(3) span {\n                width: 0.9rem;\n                height: 100%;\n                border-radius: 0.01rem;\n                background: #ff5d74;\n                display: block;\n                position: absolute;\n                right: 0;\n                top: 0;\n                text-align: center;\n                font-size: 0.28rem;\n                line-height: 0.34rem;\n                color: white; }\n  section #kindContent .kindList {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-wrap: wrap; }\n    section #kindContent .kindList .list1 {\n      border-radius: 0.05rem;\n      margin-left: 1%;\n      margin-top: 0.1rem;\n      max-width: 46%;\n      height: 4rem;\n      border: 1px solid #eee;\n      padding: 1%; }\n      section #kindContent .kindList .list1 .proImg {\n        width: 100%;\n        height: 65%;\n        overflow: hidden; }\n        section #kindContent .kindList .list1 .proImg img {\n          width: 100%; }\n      section #kindContent .kindList .list1 .proInfo {\n        line-height: 0.4rem; }\n        section #kindContent .kindList .list1 .proInfo p:nth-child(1) {\n          display: flex; }\n          section #kindContent .kindList .list1 .proInfo p:nth-child(1) span:nth-child(1) {\n            flex: 1;\n            font-size: 0.32rem;\n            color: #ff5d74;\n            line-height: 0.6rem; }\n          section #kindContent .kindList .list1 .proInfo p:nth-child(1) span:nth-child(2) {\n            margin: 0.1rem;\n            width: 0.8rem;\n            height: 0.4rem;\n            background-color: #ff5d74;\n            color: #fff;\n            text-align: center;\n            line-height: 0.4rem;\n            font-size: 0.32rem;\n            border-radius: 0.05rem; }\n        section #kindContent .kindList .list1 .proInfo p:nth-child(2) {\n          text-decoration: line-through;\n          color: #999; }\n        section #kindContent .kindList .list1 .proInfo p:nth-child(3) {\n          font-size: 0.26rem;\n          color: #333;\n          display: -webkit-box;\n          overflow: hidden;\n          white-space: normal !important;\n          text-overflow: ellipsis;\n          word-wrap: break-word;\n          -webkit-line-clamp: 1;\n          -webkit-box-orient: vertical; }\n    section #kindContent .kindList .list2 {\n      width: 100%;\n      height: 1.8rem;\n      display: flex;\n      position: relative; }\n      section #kindContent .kindList .list2 .proImg {\n        width: 1.6rem;\n        height: 1.6rem;\n        margin: 0.1rem; }\n      section #kindContent .kindList .list2 .proInfo {\n        flex: 1;\n        margin-top: 0.14rem;\n        margin-right: 0.2rem;\n        position: relative; }\n        section #kindContent .kindList .list2 .proInfo p {\n          width: 100%;\n          font-size: 0.32rem;\n          line-height: 0.5rem; }\n          section #kindContent .kindList .list2 .proInfo p:nth-child(1) {\n            display: -webkit-box;\n            overflow: hidden;\n            white-space: normal !important;\n            text-overflow: ellipsis;\n            word-wrap: break-word;\n            -webkit-line-clamp: 1;\n            -webkit-box-orient: vertical; }\n          section #kindContent .kindList .list2 .proInfo p:nth-child(2) {\n            margin-top: 0.1rem; }\n            section #kindContent .kindList .list2 .proInfo p:nth-child(2) span {\n              font-size: 0.28rem;\n              color: #ff5d74; }\n              section #kindContent .kindList .list2 .proInfo p:nth-child(2) span b {\n                font-size: 0.32rem; }\n              section #kindContent .kindList .list2 .proInfo p:nth-child(2) span del {\n                margin-left: 0.3rem; }\n          section #kindContent .kindList .list2 .proInfo p:nth-child(3) {\n            margin: 0.1rem;\n            width: 0.8rem;\n            height: 0.4rem;\n            background-color: #ff5d74;\n            color: #fff;\n            text-align: center;\n            line-height: 0.4rem;\n            font-size: 0.32rem;\n            border-radius: 0.05rem; }\n      section #kindContent .kindList .list2:after {\n        position: absolute;\n        left: 0;\n        bottom: 0;\n        content: \"\";\n        width: 100%;\n        height: 1px;\n        background: #eee;\n        transform-origin: 0 0;\n        transform: scaleY(0.5); }\n  section #moreContent {\n    height: 100%;\n    width: 100%; }\n    section #moreContent .moreList1 {\n      margin: 3%;\n      height: 3rem;\n      width: 94%;\n      border: 1px solid gray;\n      border-radius: 5px; }\n      section #moreContent .moreList1 li {\n        height: 1rem;\n        line-height: 1rem;\n        padding: 0 2%;\n        position: relative; }\n        section #moreContent .moreList1 li:after {\n          position: absolute;\n          left: 0;\n          bottom: 0;\n          content: \"\";\n          width: 100%;\n          height: 1px;\n          background: #999;\n          transform-origin: 0 0;\n          transform: scaleY(0.5); }\n        section #moreContent .moreList1 li span {\n          float: right; }\n    section #moreContent .moreList2 {\n      margin: 3%;\n      height: 2rem;\n      width: 94%;\n      border: 1px solid gray;\n      border-radius: 5px; }\n      section #moreContent .moreList2 li {\n        height: 1rem;\n        line-height: 1rem;\n        padding: 0 2%;\n        position: relative; }\n        section #moreContent .moreList2 li:after {\n          position: absolute;\n          left: 0;\n          bottom: 0;\n          content: \"\";\n          width: 100%;\n          height: 1px;\n          background: #999;\n          transform-origin: 0 0;\n          transform: scaleY(0.5); }\n        section #moreContent .moreList2 li span {\n          float: right; }\n\nfooter {\n  width: 100%;\n  height: 0.8rem;\n  background: #fff;\n  box-sizing: border-box;\n  border-top: 1px solid #eee; }\n  footer #bottom {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    color: #999; }\n    footer #bottom li {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      box-sizing: border-box; }\n      footer #bottom li i.iconfont {\n        font-size: 0.38rem; }\n      footer #bottom li.active {\n        color: #ff5d74; }\n  footer #detailFoot {\n    width: 100%;\n    height: 100%;\n    background: #fff; }\n    footer #detailFoot ul {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 94%;\n      height: 100%;\n      padding: 0 3%; }\n      footer #detailFoot ul li {\n        height: 80%;\n        box-sizing: border-box;\n        border: 1px solid #eee;\n        display: flex;\n        justify-content: center;\n        align-items: center; }\n        footer #detailFoot ul li:nth-child(1) {\n          width: 37%;\n          margin-right: 3%; }\n          footer #detailFoot ul li:nth-child(1) p {\n            font-size: 0.38rem;\n            color: #ff5d74; }\n        footer #detailFoot ul li:nth-child(2) {\n          width: 60%;\n          font-size: 0.42rem;\n          background-color: #ff5d74;\n          color: #fff; }\n", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);