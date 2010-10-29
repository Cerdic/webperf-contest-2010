function upMarket(prid,node){
	$.getJSON("MarketPlace/"+prid+"&format=json&jsoncallback=?",
	 function(data){ $(function(){ $(node).html(data.MarketPlaceSummary);}); }
	);
}
var m;
while(m=MarketPlaceOffers.pop()){
	m = m.split('|');
	upMarket(m[1],'#'+m[0]);
}