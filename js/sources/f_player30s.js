
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
//
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
