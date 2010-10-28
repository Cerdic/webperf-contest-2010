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

/**
 * Afficher une popup parametrable, utilise par les autres fonctions
 * @u : url
 * @n : nom de la popup
 * @l : largeur
 * @h : hauteur
 * @r : resizable 
 * @z : mettre le coin a zero en haut a gauche
 */
function PopUpBase(u,n,l,h,r,z){
	window.open(u,n,'toolbar=no,location=no,menubar=no,status=no,scrollbars=yes,resizable='+(r?'yes':'no')+(z?',top=0,left=0':'')+',width='+l+',height='+h);
}
// fonction permettant d'afficher les popups des services sur les PT
function PopUpService(u,l,h) {PopUpBase(u,'diaporama',l,h,true);}
function DisplayPopUp(u) {PopUpBase(u,'PopUp',530,585,true);}
function DisplayPopUpGratuit(u) {PopUpBase(u,'PopUp',530,585,true,true);}
function Diaporamas(u,l,h) {PopUpBase(u,'diaporama',l,h,true,true);}
function SonDiapo(u) {window.open(u,'diaporama','top=0,left=0');}
function EteFnac(u,l,h) {window.name = 'ete_fnac';PopUpBase(u,'EteFnac',l,h,true,false);}
function PopupLibre(u,l,h) {PopUpBase(u,'diaporama',l,h,true);return false;}
function PopupNoLibre(u,l,h) {PopUpBase(u,'diaporama',l,h,true);return false;}
/*
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
*/
//-------

var nbBanner = 3;
var idSuivant;
var puce;
var monTimer
function demarreRotation() {
	afficheBanner("visu_banner_0","rotationOk");
	for(var x=0;x<nbBanner;x++){
		$("#puce_"+x).click(function(e){
			e.preventDefault();
			var index = $(e.target).attr("id");
			index = index.substring(5);
			clearTimeout(monTimer);
			afficheBanner('visu_banner_'+index,'rotationOk');
		});
	}
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

function displayWaiting(){
	if (!$('#waitingMsg').length){
		$('#HeaderBasket').after('<div id="waitingMsg">'+
	    '<img src="img/chrono_anim.gif" alt="Veuillez patienter..." />'+
	    '<p>Veuillez patienter...</p>'+
			'</div>');
	}
	$('#waitingMsg').show('fast');
}

$(function () {

	//-----

	// au passage de la souris sur le lien de l'onglet
	$("#onglets> li> a").mouseenter(function(){
			//on affiche son megaMenu
            $(this).addClass('hover').siblings(".megaMenu").addClass('menu_actif');
	}).mouseleave(function(){
			//on cache son megaMenu
            $(this).removeClass('hover').siblings(".megaMenu").removeClass('menu_actif');
	});
	//tant que la souris se trouve sur le megaMenu
	$(".megaMenu").mouseenter(function(){
			// il reste affiché
			$(this).addClass('menu_actif');
			// et on applique la classe .hover a son lien
			$(this).siblings("a").addClass("hover");
	}).mouseleave(function(){
			// il se cache
			$(this).removeClass('menu_actif');
			// et on retire la classe .hover a son lien
			$(this).siblings("a").removeClass("hover");
	});

	
	demarreRotation();

	var sid = "SID=e85f0b48%2Dae1d%2Da5f5%2Daa15%2Dfbffdc4e1c1a&UID=0e3649c79%2D3afd%2D18b8%2D7817%2Dfa868bc99668&Origin=FnacAff&OrderInSession=0&TTL=241020101133";
	$('a,area').each(function(){
		var href=$(this).attr('href');
		$(this).attr('href',href+(href.indexOf('?')?'&':'?')+sid);
	});

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
var s_account="fnaccomprod";