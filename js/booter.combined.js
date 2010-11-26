var megamenu_sprite='css/img/spt-onglets-illus.jpg';var s_account="fnaccomprod";
function loadscript(src){var se = document.createElement('script');se.src = src;document.getElementsByTagName('head')[0].appendChild(se);}
function runscript(src,txt){var se = document.createElement('script');document.getElementsByTagName('head')[0].appendChild(se);se.text = txt;}
var jQscripts = Array();
function runJQscript(src,txt){if (txt) jQscripts.push(txt);if (typeof window.jQuery=="undefined"){setTimeout("runJQscript(null)", 50);return;}for (var i=0;i<jQscripts.length;i++) runscript('',jQscripts[i]);}
function loadxhrscript(src,callback) {var xhrObj_elem1;xhrObj_elem1 = getXHRObject();xhrObj_elem1.onreadystatechange = function() { if ( xhrObj_elem1.readyState != 4 || 200 != xhrObj_elem1.status ) return; callback(src,xhrObj_elem1.responseText); };try {xhrObj_elem1.open('GET', src, true);xhrObj_elem1.send('');} catch(e) {}}
function getXHRObject(){var xhrObj = false;try {xhrObj = new XMLHttpRequest();}catch(e){var progid = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];for ( var i=0; i < progid.length; ++i ) {try {xhrObj = new ActiveXObject(progid[i]);}catch(e){continue;}break;}}finally {return xhrObj;}}
//loadscript("js/script.ll.minified.js",runJQscript);
var lazyblocks=Array();var loaded=Array();
var now=new Date;now="?t="+now.getTime();
//lazyblocks.push(["col_gauche","nav-sec.mini.html"+now]);
//lazyblocks.push(["col_droite","extra.mini.ll.html"+now]);
lazyblocks.push(["bottom","footer.mini.ll.html"+now]);
function onScroll(node){
	var e = $('#iFrameFooterLoad.lazy',node);
	if (e.length && !$.belowthefold(e, {threshold : 100}))
		{e.removeClass('lazy');$('#iFrameFooterLoad').attr('src','iframe-footer/engagements.html');}
	e = $("#col_droite b.spt-univers.lazy",node);
	if (e.length && !$.belowthefold(e.eq(0), {threshold : 100}))
		e.removeClass("lazy").css('background-image','url(http://s2.webperf-contest.com/4cc80752a91cc/css/img/spt-univers.jpg)');
}
function completeBlocks(node){if (typeof window.jQuery=="undefined") return;$(function(){node=$(node);
if ($('#onglets-full',node).length)loadMenu();
$("b.spt-univers",node).addClass("lazy");
$('#iFrameFooterLoad',node).addClass("lazy");
if (typeof $.fn.lazyload!=="undefined") onScroll(node);
})}
function loadBlock(src,txt){ for (var i=0;i<lazyblocks.length;i++) if (lazyblocks[i][1]==src){loaded.push(["#"+lazyblocks[i][0],txt]);document.getElementById(lazyblocks[i][0]).innerHTML = txt;completeBlocks('#'+lazyblocks[i][0]);}}
function loadBlocks(){for (var i=0;i<lazyblocks.length;i++)loadxhrscript(lazyblocks[i][1],loadBlock);}
setTimeout(loadBlocks,100);
function boot_jQ(){if (typeof window.jQuery=="undefined"){setTimeout(boot_jQ, 25);return;}
//for (var i=0;i<lazyblocks.length;i++) $("#"+lazyblocks[i][0]).load(lazyblocks[i][1],"completeBlocks("+lazyblocks[i][0]+")");
completeBlocks('body');
boot_js();
}
var booted=false;
function boot_js(){if (typeof window.jQuery=="undefined" || typeof window.initPage=="undefined" || booted) return;booted=true;
onScroll($('body'));
$(window).scroll(function(){onScroll($('body'));});
$(function(){setTimeout(fixBlocks,150);})
//updateMarketPlaceOffers();
//initPage();
}
setTimeout(boot_jQ, 5);
<!--#include file="script.ll.minified.js" -->