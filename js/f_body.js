			$(document).ready(function() {

				function findValueCallback(event, data, formatted) {
					$("#QuickSearchForm").submit();

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

//----

// fonction permettant d'afficher les popups des services sur les PT
function PopUpService(theURL,Largeur,Hauteur) {
	window.open(theURL,'diaporama','toolbar=no,location=no,menubar=no,status=no,scrollbars=yes,resizable=yes,width='+Largeur+',height='+Hauteur);
}

function PopUpNoOrder() {
}


//-----

$(function () {
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
	// et On empêche le navigateur de suivre le lien
	return false;

});


//-----
window.onload = function() {
    	//document.getElementById("submitbtn").style.display='none';
    	//document.getElementById("submitbtn2").style.display='block';
    }
    function LaunchSearch(){
    	window.open('http://www4.fnac.com/r/'+$("#Fnac_Search").val()+'?SCat='+$("#SCat").val()+'&sft='+$("#sft").val(),'_self');
    }
//ce script va sauter avec la sortie du moteur de recherche v3

function ChangeContext()
{
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





//-----------------------------------------------------------------------//
 //                   Gestion du player 30s
//-------------------------------------------------------------------------//


            var StreamPlayer = null;
            var NewStreamPlayer = false;
            var onPlayFlag = false;//etat du player:lecture/arret
            var IsOpen = false;//etat du player:fermer/ouvert
            //Mise a jour de l"etat du player depuis les cookies --%>
            var temp=GetPlayerCookie("PlayerPlaying");
var lRootNid=-57;
var vnDisques=-2;
var vnFnacMusic=-70;

            switch (temp)
             {
                case '1':
                    onPlayFlag=true;
                    break;
                case '0':
                    onPlayFlag = false;
                    break;
            }

            temp = GetPlayerCookie("Player");

            switch (temp)
             {
                case '1':

                    IsOpen=true;
                    break;
                case '0':
                    IsOpen = false;
                    break;
            }
            //On force la création du player pour pouvoir mettre a jour correctement les valeur des cookies
if((lRootNid==vnDisques)||(lRootNid==vnFnacMusic))
{
            if(IsOpen)
                 StreamPlayer = getStreamPlayerWindow();
}

            var ParamAddProduct = null;
            var playing = false;
            var typePlaying = '';
            function getStreamPlayerWindow()
			{
				var wwwNetRootUrl = 'http://www4.fnac.com';
				try
				{
				    NewStreamPlayer = false;
					var widthscreen = screen.Width;
					var widthplayer = 997 ;
					var heightscreen = screen.Height;
					var heightplayer = 520 ;
				    var posleft = parseInt((screen.availWidth/2) - (widthplayer/2))+300;
                    var postop = parseInt((screen.availHeight/2) - (heightplayer/2));
					//var postop = 50;//heightscreen - heightplayer;
					//var posleft = (widthscreen - widthplayer) / 2;


					var playerWindow = window.open("", "Player30sec", "menubar=no,directories=no,location=no,resizable=yes,titlebar=no,scrollbars=no,status=no,toolbar=no,height=1px,width=1px,top="+postop+",left="+posleft+"");

					var wwwNetRootUrl = 'http://www4.fnac.com';
					if(playerWindow == null)
					{
//						alert("Attention!, le lecteur 30 sec Fnacmusic nécessite l'activation des fenêtres extérieures sur le domaine www.fnac.com. Vous semblez utiliser un bloqueur de fenêtres intempestives, merci de permettre les fenêtres sur http://www.fnac.com.");
					    return null;
					}
                    try
					{
					    if(playerWindow.document.getElementById("divPlayer") == null)
				        {
						    NewStreamPlayer = true;
						    playerWindow.location.href = wwwNetRootUrl + "/shelf/common/content/Player30s.aspx";
					    }
					}
					catch(e)
				    {
						NewStreamPlayer = true;
						playerWindow.location.href = wwwNetRootUrl + "/shelf/common/content/Player30s.aspx";
					}

			    return playerWindow;
				}
				catch(e)
				{
//					alert("Erreur!, le lecteur 30 sec Fnacmusic nécessite l'activation des fenêtres extérieures sur le domaine www.fnac.com. Vous semblez utiliser un bloqueur de fenêtres intempestives, merci de permettre les fenêtres sur http://www.fnac.com.");
					return null;
				}
			}




            function AddProductPointer()
			{

		        if (ParamAddProduct && StreamPlayer)
		        {
			        StreamPlayer.AddProduct(ParamAddProduct,playing);
			        ParamAddProduct = null;
				}
			}


			//Ajout d" track au player 30s --%>
            function AddProduct(id,type)
			{

                playing = false;
                typePlaying = type;
				StreamPlayer = getStreamPlayerWindow();

				if (StreamPlayer != null && id != null && id != '')
				{
					ParamAddProduct = id;
					if (NewStreamPlayer)
					{
					    //new popup
					    playing = true;
						setTimeout(AddProductPointer, 3000);
					}
					else
					{
						AddProductPointer();
					}
				}
				var isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
                if (isChrome) {
                    StreamPlayer.blur();
                }
                StreamPlayer.focus();
			}



			//Bouton play/stop permet de gerer la lecture exclusive entre le lecteur 30s et le lecteur coeur de page --%>
			function DoPlay(flag)
			{

			    try
			    {
			        if (StreamPlayer)
				    {

					    StreamPlayer.DoPlay(flag);
				    }
				    else
				    {
				      //Si le lecteur a été ouvert dans une page précédente --%>
				        if(IsOpen)
			            {
			                StreamPlayer = getStreamPlayerWindow();
                            if (StreamPlayer)
				            {
				                StreamPlayer.DoPlay(flag);
				            }
			            }
				    }
				}
				catch(e)
				{}
			}

			//retour sur l"etat du player --%>
			function Onplay(flag)
			{
			     //On sauvegarde l'etat du player 30s  --%>
			     onPlayFlag = flag;
			     //Si le player a passé à l'etat lecture on stoppe le lecteur coeur de page  --%>

			     if(onPlayFlag == true)
			     {

			        //if(status == 'playing')
			        {
			            try
                        {
                            MultiAudioPlayer.stopCurrentPlayer();
                           //StopMediaWithId(null, _playingid)
                        }
                        catch(e)
                        {}
			        }
			    }
			}
			//retour lors d"un ajout au player --%>
			function OnItemAdded(ids)
			{

			}
			function PlayThisMedia (eventArgs, who)
			{
			  Onplay();


			}
//--------------------------------------------------------------------------------------//
			//                  Gestion de la navigation
//--------------------------------------------------------------------------------------//
			//Au passage à une autre page on sauvegarde l'état du player dans les cookies --%>
			window.onbeforeunload = updatePlayerCookies;
			//---------------------------------------------------//
			//              Gestion des cookies
			//----------------------------------------------------//
			//Lecture des cookies --%>
			function GetPlayerCookie (name)
			{

	            var arg=name+"=";
	            var alen=arg.length;
	            var clen=document.cookie.length;
	            var i=0;
	            while (i<clen)
	            {
		            var j=i+alen;
		            if (document.cookie.substring(i, j)==arg)
                        return getPlayerCookieVal (j);
                    i=document.cookie.indexOf(" ",i)+1;
                    if (i==0)
                        break;
               }
	            return -1;
            }
            function getPlayerCookieVal(offset)
            {
	            var endstr=document.cookie.indexOf (";", offset);
	            if (endstr==-1)
      		        endstr=document.cookie.length;
	            return unescape(document.cookie.substring(offset, endstr));
            }

			//Mettre à jour les cookies --%>
			function updatePlayerCookies()
			{

			    var Player =  GetPlayerCookie("Player");
			    var PlayerPlaying = GetPlayerCookie("PlayerPlaying");
			  //Player est ouvert  --%>

			    if(StreamPlayer)
			    {

			         if(StreamPlayer.closed == false)
			            SetPlayerCookie("Player",1,0);
			         else
			            SetPlayerCookie("Player",0,0);
			       //Player en lecture:ce flag n"est pas utilisé pour l'instant mais ça peut étre utile :)  --%>
			         if(onPlayFlag)
			         SetPlayerCookie("PlayerPlaying",1,0);
			        else
			         SetPlayerCookie("PlayerPlaying",0,0);

			    }
			    else
			    {

			          if(Player<=0)
			            SetPlayerCookie("Player",0,0);
			          else
			            SetPlayerCookie("Player",1,0);
			        if(PlayerPlaying<=0)
			            SetPlayerCookie("PlayerPlaying",0,0);
			        else
			            SetPlayerCookie("PlayerPlaying",1,0);
			    }

			}

        function SetPlayerCookie (name,value,expires)
        {

            var domain= document.domain;
            var path = '/';
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + (expires * 24 * 3600 * 1000));
//            document.cookie = name + "=" + escape(value) +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "");

        }
	//---------------------------------------------------------------------//

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
/*       function switcherBandeau(id){
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
       }*/


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

	// Bidouille pour lancer au chargement et en même temps
	// éviter les collisions avec le onload qui traine dans le body
	if (typeof window.addEventListener != 'undefined') {	//.. gecko, safari, konqueror and standard
		window.addEventListener('load', demarreRotation, false);
	}
	else if (typeof document.addEventListener != 'undefined') {	//.. opera 7
		document.addEventListener('load', demarreRotation, false);
	}
	else if (typeof window.attachEvent != 'undefined') {	//.. win/ie
		window.attachEvent('onload', demarreRotation);
	}
	$(document).ready(function(){
		for(var x=0;x<nbBanner;x++){
			$("#puce_"+x).click(function(e){
				e.preventDefault();
				var index = $(e.target).attr("id");
				index = index.substring(5);
				clearTimeout(monTimer);
				afficheBanner('visu_banner_'+index,'rotationOk');
			});
		}
	});


$(document).ready(function(){
	$('.MarketPlaceOffers').each(function(){
		var url = $('a',this);
		if (url.length) {
			url = url.attr('href');
			var me = $(this);
			if (url)
				$.getJSON(url,
				 function(data){ me.html(data.MarketPlaceSummary);}
				);
		}
	});
});
