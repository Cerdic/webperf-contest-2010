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
			afficheBanner($(e.target).attr('href').replace(/^#/,''),'rotationOk');
			return false;
		});
	}
}

function afficheBanner(idSolde,rotationSolde) {
	clearTimeout(monTimer);
	var divImgCible;
	puce = parseInt(idSolde.substring(12));
	idSuivant = puce + 1;
	if(idSuivant >= nbBanner) idSuivant = 0;
	var me = $('#'+idSolde);
	// poser les images background au premier passage
	if ($('a',me).attr('rel').length){
		var url = $('a',me).attr('rel');
		$('a>b',me).css('background-image','url('+url+')');
		$('a',me).attr('rel','');
	}
	me.show().siblings('.banner').hide();
	$('#'+"puce_"+puce).addClass('active').siblings().removeClass('active');

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

function setLinks(node){
	var sid = "SID=e85f0b48%2Dae1d%2Da5f5%2Daa15%2Dfbffdc4e1c1a&UID=0e3649c79%2D3afd%2D18b8%2D7817%2Dfa868bc99668&Origin=FnacAff&OrderInSession=0&TTL=241020101133";
	$('a,area',node).each(function(){
		var href=$(this).attr('href');
		if (href.indexOf('#')==-1)
			$(this).attr('href',href+(href.indexOf('?')==-1?'?':'&')+sid);
	});
}

var menublock = null;
function loadMenu(){
	// si le menu complet deja dans la page (charge avec le footer)
	if ($('#onglets-full').length){
		menublock = $('#onglets-full').parent().detach();
	}
	// sinon charger dynamiquement
	else
		$.get('menu_full.html', function(data) {
			menublock = jQuery('<div><\/div>').html(data);
		});
}
function initMenuitem(li){
	// initialiser la deco au survol !
	if (megamenu_sprite){
		$('#onglets-full .megaMenu .vignet b',menublock).css('background-image','url('+megamenu_sprite+')');
		megamenu_sprite=null;
	}
	if (!li.is('.loaded')){
		var c=li.attr('class');
		c = $("li."+c,menublock);
		$("a:first",c).remove();
		li.append(c.html()).addClass('loaded');
		c.remove(); // liberer

		//tant que la souris se trouve sur le megaMenu
		$(".megaMenu",li).mouseenter(function(){
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
	}
}
function initMenu(){
	// au passage de la souris sur le lien de l'onglet
	$("#onglets> li> a").mouseenter(function(){
		initMenuitem($(this).parent());
		//on affiche son megaMenu
		$(this).addClass('hover').siblings(".megaMenu").addClass('menu_actif');
	}).mouseleave(function(){
		//on cache son megaMenu
		$(this).removeClass('hover').siblings(".megaMenu").removeClass('menu_actif');
	});
}

function initPage(){
$(function () {
	initMenu();

	demarreRotation();
	setLinks($('#page'));
	if (typeof jQuery.fn.lazyload!="undefined")
		$("#col_centre img.lazyload").lazyload({ threshold : 100 }).removeClass('lazyload');


	$('#Fnac_Search').one('focus',function(){
		$.getScript('js/autocomplete.minified.js', function() {
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
	});

	// demarrer le gif anime
	if ($('#banner186756').attr('src')!=='http://s1.webperf-contest.com/4cc80752a91cc/img/186x756_25082010.gif')
		setTimeout("$('#banner186756').attr('src','http://s1.webperf-contest.com/4cc80752a91cc/img/186x756_25082010.gif')",2000);
});
}

if (typeof(window.boot_js)!='undefined')
	boot_js();