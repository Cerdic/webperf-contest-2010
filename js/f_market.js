function updateMarketPlaceOffers(){
	var d=new Date;
	var prid=[];
	var MarketPlaceOffers=Array();
	var contenu = document.getElementById('col_centre');
	var divInside = contenu.getElementsByTagName("div");
	for (var j = 0; j < divInside.length; j++) {
		if (divInside[j].className=="MarketPlaceOffers"){
			MarketPlaceOffers.push([divInside[j].id,divInside[j].title]);
			prid.push(divInside[j].title);
		}
	}

	// for real JSON request
	//$.getJSON("MarketPlace/?jsoncallback=?",
	$.getJSON("MarketPlace/?t="+d.getTime(),
		{prid:prid},
		function(data){
			var m;
			while(m=MarketPlaceOffers.pop())
				document.getElementById(m[0]).innerHTML = data['id'+m[1]].MarketPlaceSummary;
			fixBlocksHeight();
		}
	);
}