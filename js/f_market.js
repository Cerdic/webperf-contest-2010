function updateMarketPlaceOffers(){
	var d=new Date;
	var prid=[];
	var MarketPlaceOffers=Array();
	var m;
	var h=0;
	$(function(){
		$('.MarketPlaceOffers').each(function(){
			m = $(this).attr('id');
			h = $(this).attr('title');
			prid.push(h);
			MarketPlaceOffers.push([m,h]);
		});

		// for real JSON request
		//$.getJSON("MarketPlace/?jsoncallback=?",
		$.getJSON("MarketPlace/?t="+d.getTime(),
			{prid:prid},
			function(data){$(function(){
				var m;
				while(m=MarketPlaceOffers.pop())
					$('#'+m[0]).html(data['id'+m[1]].MarketPlaceSummary);
				fixBlocksHeight();
			});}
		);
	});
}