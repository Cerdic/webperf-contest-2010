function upMarket(prid,node){
	$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID="+prid+"&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?",
	 function(data){ $(function(){ $(node).html(data.MarketPlaceSummary);}); }
	);
}
var m;
while(m=MarketPlaceOffers.pop()){
	m = m.split('|');
	upMarket(m[1],'#'+m[0]);
}