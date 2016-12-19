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
				var toast=require("./toast");
				if(data=="0"){
					toast.makeText("该用户名已经被注册",1000);
				}else if(data=="1"){
					toast.makeText("注册成功！",1000);
					var login=require("./login");
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
				var login=require("./login");
				login.addLoginHeader("register");
				login.addLoginContent();
			});
			$("#back").on("tap",function(){
				//alert("111");
				if(type=="user"){
					var user=require("./user");
					user.addUserHeader();
					user.addUserContent();
				}else if(type="login"){
					var login=require("./login");
					login.addLoginHeader("register");
					login.addLoginContent();
				}
			})
		});
	},
	addRegisterContent:function(){
		var that=this;
		$("#content").load("html/Register.html #registerContent",function(){
			var toast=require("./toast");
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
