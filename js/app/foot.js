module.exports = {
	addFoot:function(type){
		$("#footer").load("html/Foot.html #bottom",function(){
			var home=require("./home");
			var kind=require("./kind");
			var cart=require("./cart");
			var user=require("./user");
			var theme=require("./Theme");		
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
   						var login=require("./login");
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
