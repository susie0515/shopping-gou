module.exports={
	makeText:function(str,time){
		$("#toast").show();
		$("#toast").html(str);
		setTimeout(function(){
			$("#toast").hide();
		},time);
	}
}

