module.exports = {
	addUserHeader:function(){
		$("#header").load("html/User.html #userHeader",function(){
			
		});
	},
	addUserContent:function(){
		$("#content").load("html/User.html #userContent",function(){
			$(".loginBtn").tap(function(){
				//alert("111");
				var login=require("./login");
				login.addLoginHeader("user");
				login.addLoginContent("user");
			});
			$(".registerBtn").tap(function(){
				//alert("111");
				var register=require("./register");
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
					var cart=require("./cart");
					cart.addCartHeader();
					cart.addCartContent();
				}else{
					var login=require("./login");
					login.addLoginHeader("user");
					login.addLoginContent("user");
				}
				
			})
			$(".myOrder").on('tap',function(){
				if(localStorage.getItem("isLogin")=="OK!"){
					var order=require("./order");
					order.addOrderHeader("user");
					order.addOrderContent();
				}else{
					var login=require("./login");
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
