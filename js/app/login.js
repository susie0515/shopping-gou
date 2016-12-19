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
				var toast=require("./toast");
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
						var home=require("./home");
						var foot=require("./foot");
						home.addHomeHeader();
						home.addHomeContent();
						foot.addFoot();
					}else if(type=="user"){
						var user = require("./user");
						user.addUserHeader();
						user.addUserContent();
					}else if(type=="cart"){
						var cart = require("./cart");
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
				var register=require("./register");
				register.addRegisterHeader("login");
				register.addRegisterContent();
				
			});
			$("#back").on("tap",function(){
				if(type=="user"){
					var user=require("./user");
					user.addUserHeader();
					user.addUserContent();
				}else if(type=="register"){
					var register=require("./register");
					register.addRegisterHeader();
					register.addRegisterContent();
				}else if(type=="home"){
					var home=require("./home");
					home.addHomeHeader();
					home.addHomeContent();
				}
				
			})
		});
	},
	addLoginContent:function(type){
		var that=this;
		$("#content").load("html/Login.html #loginContent",function(){
			var toast=require("./toast");
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
