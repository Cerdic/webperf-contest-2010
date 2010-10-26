


var IS_IE = document.all && window.print && !window.opera && /MSIE [56]/.test(navigator.userAgent);
var IS_IE7 = document.all && window.print && !window.opera && /MSIE [78]/.test(navigator.userAgent);
var IS_IE_ALL = document.all && window.print && !window.opera && /MSIE/.test(navigator.userAgent);
var IE_W3C = IS_IE && /MSIE [789]/.test(navigator.userAgent);
var IS_Webkit = /Konqueror|Safari|KHTML/.test(navigator.userAgent);
var heightPropertyToUse = IS_IE ? "height" : "minHeight";

/* ecrit les classes dans le tag HTML, pas besoin d'attendre le chargement du body */
document.documentElement.className += " hasJS"; //cette classe rajoute une classe CSS qui permet des actions afin de cacher ou afficher des elements seulement pour les visiteurs qui ont le Javascript active sur leur navigateur. (exemple le hidesubmit)
if (IS_IE) 
	document.documentElement.className+=" IS_IE"; //cette classe permet d'utiliser des hacks CSS/JS seulement pour IE6 et versions inferieures.
else if (IS_IE7)
	document.documentElement.className+=" IS_IE7"; //cette classe permet d'utiliser des hacks CSS/JS seulement pour IE7
/*
 * Fonctions globales
 */

function getElementsByClassName(oElm, sTagName, sClassName)
{
  var aElements = (sTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(sTagName);
  var aReturnElements = new Array();
  sClassName = sClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + sClassName + "(\\s|$)");
  var oElement;
  for(var i=0; i < aElements.length; i++)
  {
    oElement = aElements[i];
    if(oRegExp.test(oElement.className))
    aReturnElements.push(oElement);
  }
  return aReturnElements
}
/*****
  menu deroulant - simulation du hover facon F6
*****/
function sousMenuAddHover(elm, position) {
  elm.style.behavior = " ";
  var menu = elm.getElementsByTagName("ul");
  if (menu.length>0) {
    elm.theUl = menu[0];
    ifrlayer.make(elm.theUl);
    elm.onmouseenter = function() {
      this.className+= ' currentJs';
      ifrlayer.make(elm.theUl);
    }
    elm.onmouseleave = function() {
      this.className = this.className.replace(/\b(right)?currentJs\b/,"");
      ifrlayer.hide(this.theUl);
    }
  }
}

function findPos(obj){
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
    }
    return [curleft, curtop];
}

/*  intStyleJ  : Récupère la valeur numerique d'une propriété CSS */
function intStyleJ(obj,cssProperty){
	var val = parseInt($(obj).css(cssProperty));
	if (isNaN(val))
		val = 0;
	
	return val;
}


/* getMouse :  */
function getMouse(e){
    var x, y;
    var elt = (navigator.userAgent.indexOf("MSIE 5") != -1) ? document.body : document.documentElement;
    if (document.captureEvents) {
        x = e.pageX;
        y = e.pageY;
    }
    else 
        if (window.event.clientX) {
            x = window.event.clientX + elt.scrollLeft;
            y = window.event.clientY + elt.scrollTop;
        }
    window.mouseX = x;
    window.mouseY = y;
}

/* 
 * ifrlayer :
 * genere une iframe pour faire passer les divs par dessus des selects sous IE
 */
var ifrlayer = {
    make: function(obj){
        if (!obj) 
            return;
        obj = (typeof(obj) == "string") ? document.getElementById(obj) : obj;
        if (!obj) 
            return;
        if (document.all && !window.opera && document.getElementById) {
            if (obj.parentNode && !obj.iframelayer) {
                var ifr = obj.parentNode.insertBefore(document.createElement('<iframe src="javascript:false"></iframe>'), obj);
                if (obj.currentStyle.zIndex != "" && parseInt(obj.currentStyle.zIndex) > 1) {
                    ifr.style.zIndex = parseInt(obj.currentStyle.zIndex) - 1;
                }
                with (ifr.style) {
                    filter = "mask()";
                    position = "absolute";
                }
                obj.iframelayer = ifr;
            }
        }
        if (obj.iframelayer) {
            obj.iframelayer.style.visibility = "visible";
            ifrlayer.resize(obj);
            ifrlayer.move(obj)
        }
    },
    hide: function(obj){
        if (!obj) 
            return;
        obj = typeof(obj) == "string" ? document.getElementById(obj) : obj;
        if (!obj) 
            return;
        var ifr = obj.iframelayer;
        if (ifr) {
            ifr.style.visibility = "hidden";
        }
    },
    move: function(obj){
        if (obj && obj.iframelayer) {
            with (obj.iframelayer.style) {
                top = obj.offsetTop + "px";
                left = obj.offsetLeft + "px"
            }
        }
    },
    resize: function(obj){
        if (obj && obj.iframelayer) {
            with (obj.iframelayer.style) {
                width = obj.offsetWidth + "px";
                height = obj.offsetHeight + "px";
            }
        }
    }
}

/*
 * Fonction Resize : redimensionne un element avec un effet
 * size ( element, actionsWidth:object, heightWidth:object, timer:int, pitch:int);
 */
function resize(obj, actionWidth, actionHeight, timer, pitch, funcWhile, funcAfter, inBoucle){
    var endWidth = false;
    var endHeight = false;
    if (actionWidth) {
        if (!inBoucle) 
            obj.style.width = actionWidth.start + "px";
        if ((pitch >= 0 && obj.offsetWidth < actionWidth.end) || (pitch < 0 && obj.offsetWidth > actionWidth.end)) 
            obj.style.width = actionWidth.start + pitch + "px";
        if ((pitch >= 0 && obj.offsetWidth >= actionWidth.end) || (pitch <= 0 && obj.offsetWidth <= actionWidth.end)) {
            obj.style.width = actionWidth.end + "px";
            endWidth = true;
        }
    }
    else {
        endWidth = true;
    }
    if (actionHeight) {
        if (!inBoucle) 
            obj.style.height = actionHeight.start + "px";
        if ((pitch >= 0 && obj.offsetHeight < actionHeight.end) || (pitch < 0 && obj.offsetHeight > actionHeight.end)) 
            obj.style.height = actionHeight.start + pitch + "px";
        if ((pitch >= 0 && obj.offsetHeight >= actionHeight.end) || (pitch <= 0 && obj.offsetHeight <= actionHeight.end)) {
            obj.style.height = actionHeight.end + "px";
            endHeight = true;
        }
    }
    else {
        endHeight = true;
    }
    if (funcWhile) 
        funcWhile();
    if (endWidth && endHeight) {
        if (funcAfter) 
            funcAfter();
        return;
    }
    setTimeout(function(){
        resize(obj, actionWidth ? {
            start: obj.offsetWidth,
            end: actionWidth.end
        } : null, actionHeight ? {
            start: obj.offsetHeight,
            end: actionHeight.end
        } : null, timer, pitch, funcWhile, funcAfter, true)
    }, timer);
}

/*
 * POPIN
 * Creation de popin en récuperant un élément HTML déjà écrit dans la page,
 * puis on l'affiche en popin
 */
function popinIt(obj, id, tag, className, noeuxParent, popinClassName, onOff){
    if (onOff == "on") {
        //ici on supprime tout popup deja affiche pour eviter qu ils se montent les uns sur les autres, mais a voir a passer en variable
        if (document.getElementById("jeVeuxEtreSupprimer")) {
            var del = document.getElementById("jeVeuxEtreSupprimer");
            del.parentNode.removeChild(del);
        }
        var remplissage = getElementsByClassName(document.getElementById(id), tag, className)[0].innerHTML; //recup le HTML
        nouveauDiv = document.createElement("div");//creation  de l objet
        nouveauDiv.id = "jeVeuxEtreSupprimer";//identification
        nouveauDiv.className = "popin " + popinClassName;//on le classifie
        nouveauDiv.style.display = "block";//on le display block car en none en css
        nouveauDiv.innerHTML = remplissage;// on rempli le bloc
        obj.parentNode.insertBefore(nouveauDiv, obj);//on l insert l objet avant la balise appele
        var leNouveauDiv = document.getElementById("jeVeuxEtreSupprimer");
        var leParentLeNouveauDiv = noeuxParent;// on selectionne l element parent pour calculer sa difference de positionnement
        var ouLeNouveauDiv = leNouveauDiv.offsetHeight + leNouveauDiv.offsetTop;
        var ouLeParentLeNouveauDiv = leParentLeNouveauDiv.offsetHeight + leParentLeNouveauDiv.offsetTop;
        //si il depasse en bas, alors on le deroule vers le haut
        if (ouLeNouveauDiv > ouLeParentLeNouveauDiv) {
            leNouveauDiv.getElementsByTagName("span")[0].className = "popbr";
            leNouveauDiv.style.marginTop = "-" + leNouveauDiv.offsetHeight + "px";
        }
        //si il depasse a gauche, on le deroule a droite
        if (leNouveauDiv.offsetLeft < 1) {
            leNouveauDiv.getElementsByTagName("span")[0].className = "popbl";
            leNouveauDiv.className += " popInDerouleDroite";
        }
    }
    else {
        var del = document.getElementById("jeVeuxEtreSupprimer");
        del.parentNode.removeChild(del);
    }
}

/*
 * Cookies
 */
function GetCookie(name){
    var startIndex = document.cookie.indexOf(name);
    if (startIndex != -1) {
        var endIndex = document.cookie.indexOf(";", startIndex);
        if (endIndex == -1) 
            endIndex = document.cookie.length;
        return unescape(document.cookie.substring(startIndex + name.length + 1, endIndex));
    }
    else {
        return null;
    }
}

/*  addHover :
 *	Cette fonction ajoute le fonctionnement de la pseudo classe hover en CSS, et seulement pour IE
 *	Elle se base sur les evenement propres a IE qui sont les evenements qui ont le comportement le plus proche du :hover en CSS.
 *	Pour utiliser cette fonction il faut le faire en CSS
 *	ex :
 *		#menu ul li {behavior:expression(addHover(this))}
 *		Afin de ne pas prendre en compte IE7 en mode strict il suffit de placer la classe .IS_IE avant, cette classe est ajoute pendant le chargement de la page.
 *		.IS_IE #menu ul li {behavior:expression(addHover(this))}
 */
function addHover(elm){
    elm.style.behavior = " ";
    elm.onmouseenter = function(){
        this.className += ' hover';
    }
    elm.onmouseleave = function(){
        this.className = this.className.replace(/\bhover\b/, "");
    }
}

/*************
* Fonctions pour fixer les coins sous IE
* Une fonctions est prevue aussi pour Safari 2.0, Opera 8.5 et FF 1.0 pour certains cas
**************/
var CSSBottomCorners=[]; //array pouvant contenir les coins absolu positionnes en bottom
var currentBlockToFixCorners=null; //variable gloable utilisee lorsqu'on veux fixer les coins sur un seul bloc
/*  cssRight :
	fixe les coins positionnes en absolu a droite
	ex :
		body.IS_IE .tr {right:expression(addHover(this))}
		Il faut afin que cela fonctionne, avoir declare le right dans un selecteur precedent (pour les autres navigateurs).
		ex : .tr {height:5px;  width:5px; right:0}
		Afin de ne pas prendre en compte IE7 en mode strict il suffit de placer la classe .IS_IE avant, cette classe est ajoutee pendant le chargement de la page et n'est ajoutee que pour IE5.x ou 6.
*/
function cssRight(elm) {
	elm.style.right=(parseInt(elm.currentStyle.right)-(elm.parentNode.offsetWidth%2))+"px";
}

/*  cssBottom :  (comme CSS right avec un parametre supplementaire)
	fixe les coins positionnes en absolu a droite
	ex :
		body.IS_IE .br {bottom:expression(addHover(this))}
	Il faut afin que cela fonctionne, avoir declare le right dans un selecteur precedent (pour les autres navigateurs).
	Afin de ne pas prendre en compte IE7 en mode strict il suffit de placer la classe .IS_IE avant, cette classe est ajoutee pendant le chargement de la page et n'est ajoutee que pour IE5.x ou 6.

	Si on veut rajouter ces coins dans un array qui permettra de les refixer si le bloc s'agrandit ou autre. il suffit de rajouter "true" dans les parametres.
	ex :
		body.IS_IE .br {bottom:expression(addHover(this, true))}
*/
function cssBottom(elm, pushElement) {
	if (pushElement && !elm.CSSBottomAlreadyCSS) {
		CSSBottomCorners.push(elm);
		elm.CSSBottomAlreadyCSS=true;
	}
	elm.style.bottom=(parseInt(elm.currentStyle.bottom)-(elm.parentNode.offsetHeight%2))+"px";
}




function getTaille(Elem) {


   if(document.getElementById) {
      var elem = document.getElementById(Elem);
   } else if (document.all){
      var elem = document.all[Elem];
   }
   window.wPos = elem.offsetWidth;
   window.hPos = elem.offsetHeight;
}

/*******
  ici on switch d'onglet en onglet dans une page adherent,
  la fonction reste assez souple et en la modifiant un
  peu elle pourrait etre adaptable partout
*******/
function switchAvantageAdherent(id, idOnglet){
  var lastViewed = idOnglet;
  SetCookie('lastOnglet',lastViewed,10);
  var selectOngletOffreAdh = document.getElementById(idOnglet);
  var selectOffreAdh = getElementsByClassName(document.getElementById("blockAvantageAdherent"), "div", "blockAvantageAdherent");
  var monId = document.getElementById(id);
  monId.style.display="block";
  var heightMonId = monId.offsetHeight;
  var heightMonIdParent = monId.parentNode.offsetHeight;
  monId.parentNode.style.height="auto";
  function switchAvantageAdherentLoop(){
    for (var i=0; i < selectOffreAdh.length; i++)
    {
      selectOffreAdh[i].style.display="none";
      selectOngletOffreAdh.parentNode.getElementsByTagName("li")[i].className="";
    }
    selectOngletOffreAdh.className="ongletAvtAdhActive";
    monId.style.display="block";
    document.getElementById("AvtAdhAdherer").style.display="none";// le premier bloc doit disparaitre au premier changement d'onglet, il n'est pas demande qu'il reapparaisse
  }
  monId.style.display="block";
//retourne une taille de difference pour pouvoir derouler dans les deux sens proprement
  var frame = parseInt(heightMonId-heightMonIdParent)/10;
//  IE7 retourne 0 si on arrive sur la page avec l'ancre, je recalcule et cela suffit pour avoir la bonne hauteur
  if (!heightMonId == 0){
    resize(monId.parentNode, 0, {start: heightMonIdParent, end: heightMonId}, 1, frame, switchAvantageAdherentLoop(), 0, 0);
  }
//  un peu d'opacite pour plus tard ?
//  changeOpacity(monId.parentNode, {start: 0, end: 100}, 1, 10, 0);

//  pas tres propre, mais permet de switcher d'onglet du menu principal
  if (id=="AvtAdhPaiement")
  {
    document.getElementById("m_adh_avantages_carte").className="";
    document.getElementById("m_adh_facilite_paiement").className="current";
  }
  else
  {
    document.getElementById("m_adh_avantages_carte").className="current";
    document.getElementById("m_adh_facilite_paiement").className="";
  }
}
function SetCookie(name, value, days) {
     var expire = new Date ();
     expire.setTime (expire.getTime() + (24 * 60 * 60 * 1000) * days);
     document.cookie = name + "=" + escape(value) + "; expires=" +expire.toGMTString();
}
