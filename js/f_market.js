/*
var hosts = ['http://entries.webperf-contest.com/4cc80752a91cc/wpo/', 'http://s1.webperf-contest.com/4cc80752a91cc/wpo/', 'http://s2.webperf-contest.com/4cc80752a91cc/wpo/', 'http://s3.webperf-contest.com/4cc80752a91cc/wpo/']
function upMarket(prid,node,host){
	$.getJSON(host+"MarketPlace/"+prid+"&format=json&jsoncallback=?",
	 function(data){ $(function(){ $(node).html(data.MarketPlaceSummary);}); }
	);
}
var m;
var h=0;
while(m=MarketPlaceOffers.pop()){
	m = m.split('|');
	upMarket(m[1],'#'+m[0],hosts[h++%4]);
}
*/

function updateMarketPlaceOffers(){
	var m;
	var h=0;
	var prid=[];
	for (h=0;h<MarketPlaceOffers.length;h++){
		m = MarketPlaceOffers[h].split('|');
		prid.push(m[1]);
	}

	// for real JSON request
	//$.getJSON("MarketPlace/?jsoncallback=?",
	$.getJSON("MarketPlace/?market=0",
		{prid:prid},
		function(data){$(function(){
			var m;
			while(m=MarketPlaceOffers.pop()){
				m = m.split('|');
				$('#'+m[0]).html(data['id'+m[1]].MarketPlaceSummary);
			}
			fixBlocksHeight();
		});}
	);
}