// fonction permettant d'afficher les popups des services sur les PT
function PopUpService(theURL,Largeur,Hauteur) {
	window.open(theURL,'diaporama','toolbar=no,location=no,menubar=no,status=no,scrollbars=yes,resizable=yes,width='+Largeur+',height='+Hauteur);
}

//-----
function LaunchSearch(){
	window.open('http://www4.fnac.com/r/'+$("#Fnac_Search").val()+'?SCat='+$("#SCat").val()+'&sft='+$("#sft").val(),'_self');
}
//ce script va sauter avec la sortie du moteur de recherche v3

function ChangeContext(){
	var context =  $("#ebook").val();
	var val = $("#SCat").val();
	if(val == "ebook")
	{
	$("#SCat").val("book");
	}
	else
	{
	$("#ebook").val("false");
	}
}
function checkKey()
{
		if (window.event.keyCode == 13)
		{
				ChangeContext();
		}
}

function DisplayPopUp(theURL) {
	window.open(theURL,'PopUp','toolbar=no,location=no,menubar=no,status=no,top=0,left=0,resizable=yes,scrollbars=yes,width=530,height=585');
}

function DisplayPopUpGratuit(theURL) {
	window.open(theURL,'PopUp','toolbar=no,location=no,menubar=no,status=no,top=0,left=0,resizable=yes,scrollbars=yes,width=530,height=585');
}

function Diaporamas(theURL,Largeur,Hauteur) {
	window.open(theURL,'diaporama','toolbar=no,location=no,menubar=no,status=no,scrollbars=no,resizable=yes,top=0,left=0,width='+Largeur+',height='+Hauteur);
}

function SonDiapo(theURL) {
	window.open(theURL,'diaporama','top=0,left=0');
}

function EteFnac(theURL,Largeur,Hauteur) {
	window.name = 'ete_fnac'
	window.open(theURL,'EteFnac','toolbar=no,location=no,menubar=no,status=no,scrollbars=no,width='+Largeur+',height='+Hauteur);
}

function PopupLibre(theURL, Largeur, Hauteur) {
	window.open(theURL,'diaporama','toolbar=auto,location=no,menubar=no,status=no,scrollbars=yes,resizable=yes,top=0,left=0,width='+Largeur+',height='+Hauteur);
	return false;
}

function PopupNoLibre(theURL, Largeur, Hauteur) {
	window.open(theURL,'diaporama','toolbar=auto,location=no,menubar=no,status=no,scrollbars=no,top=0,left=0,width='+Largeur+',height='+Hauteur);
	return false;
}
function switcherBandeau(id){
 m = document.getElementById("bandeauTournantImages");
 l = m.getElementsByTagName("img");
 for (var i = 0; i < l.length; i++)
 {
	 l[i].style.display = "none";
	 if (l[i].id==id)
	 {
		 l[i].style.display = "block";
	 }
 }
}

//-------

var nbBanner = 3;
var idSuivant;
var puce;
var monTimer
function demarreRotation() {
	afficheBanner("visu_banner_0","rotationOk");
}

function afficheBanner(idSolde,rotationSolde) {
	var divImgCible;
	puce = parseInt(idSolde.substring(12));
	idSuivant = puce + 1;
	if(idSuivant >= nbBanner) idSuivant = 0;
	var spanPuceCible = document.getElementById("puce_"+puce);
	for (var i=0;i<nbBanner;i++) {
		var allDivs = document.getElementById("visu_banner_"+i);
		allDivs.style.display = "none";
		divImgCible = document.getElementById(idSolde);
		divImgCible.style.display = "block";
		var allPuces = document.getElementById("puce_"+i);
		allPuces.className = allPuces.className.replace(/active/,"");
		if(!/active/.test(spanPuceCible.className))
			spanPuceCible.className += " active";
	}
	if (rotationSolde == "rotationOk") {
		monTimer = setTimeout("afficheBanner('visu_banner_'+idSuivant,'rotationOk')",3500); // 2000
	}
	else {
		clearTimeout(monTimer);
		monTimer = setTimeout("afficheBanner('visu_banner_'+idSuivant,'rotationOk')",10000); //10000
	}
}

function findValueCallback(event, data, formatted) {
	$("#QuickSearchForm").submit();
}

$(function () {

	$('.MarketPlaceOffers').each(function(){
		var me = $(this);
		var prid = me.attr('title');
		if (prid) {
			$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID="+prid+"&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?",
			 function(data){ me.html(data.MarketPlaceSummary);}
			);
		}
	});


	//-----

	// au passage de la souris sur le lien de l'onglet
	$("#onglets li a").mouseenter(function(){
			//on affiche son megaMenu
            $(this).siblings(".megaMenu").css("display","block");
	}).mouseleave(function(){
			//on cache son megaMenu
            $(this).siblings(".megaMenu").css("display","none");
	});
	//tant que la souris se trouve sur le megaMenu
	$(".megaMenu").mouseenter(function(){
			// il reste affiché
			$(this).css("display","block");
			// et on applique la classe .hover a son lien
			$(this).siblings("a.ongLink").addClass("hover");
	}).mouseleave(function(){
			// il se cache
			$(this).css("display","none");
			// et on retire la classe .hover a son lien
			$(this).siblings("a.ongLink").removeClass("hover");
	});

	
	demarreRotation();
	for(var x=0;x<nbBanner;x++){
		$("#puce_"+x).click(function(e){
			e.preventDefault();
			var index = $(e.target).attr("id");
			index = index.substring(5);
			clearTimeout(monTimer);
			afficheBanner('visu_banner_'+index,'rotationOk');
		});
	}

	$("#SCat").change( function() {
				$("#Fnac_Search").flushCache();
		 var ComboVal = $("#SCat").val();
		 if(ComboVal == "ebook")
		 {
				$("#ebook").val("true");
		 }
	});

	$("#Fnac_Search").autocomplete("http://autocompletion.fnac.com/search-autocomplete/autocomplete?method=GetCommonSuggest", {

		width: 260,
		selectFirst: false,
		max: 10,
		scrollHeight: 200,
		cacheLength: 0,
		delay: 150,
		dataType: "jsonp",
		highlight: function(value, term) {
			return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
		},
		extraParams: {
					"text":function() { return $("#Fnac_Search").val(); },
					"category": function() {
							var rex = new RegExp("!1$");
							var cat = $("#SCat").val().replace(rex,'');
							return cat; },
					"encoding": "UTF-8"
		},
		parse: function(data) {
				return $.map(data, function(row) {
					return {
						data: row,
						value: row.sentence,
						result: row.sentence
					}
				});
		},
		formatItem: function(itemResult) {
			return itemResult.sentence;
		}

	});

	$("#Fnac_Search").result(function(event, data, formatted) {
		if (data)
			findValueCallback(event, data, formatted);

	});


});
