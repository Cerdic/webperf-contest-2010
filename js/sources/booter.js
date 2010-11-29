var now=new Date;now="?t="+now.getTime();

/* blocks to lazy load */
var lazyblocks=Array();
lazyblocks.push(["col_droite","extra.mini.ll.html"+now]);
lazyblocks.push(["bottom","footer.mini.ll.html"+now]);

/**
 * On scroll callback to load iframe and univers sprite when needed
 * @param node
 */
function onScroll(node){
	var e = $('#iFrameFooterLoad.lazy',node);
	if (e.length && !$.belowthefold(e, {threshold : 100}))
		{e.removeClass('lazy');$('#iFrameFooterLoad').attr('src','iframe-footer/engagements.html');}
	e = $("#col_droite b.spt-univers.lazy",node);
	if (e.length && !$.belowthefold(e.eq(0), {threshold : 100}))
		e.removeClass("lazy").css('background-image','url(http://s2.webperf-contest.com/4cc80752a91cc/css/img/spt-univers.jpg)');
}

/**
 * Complete html blocks lazy loaded
 * @param node
 */
function completeBlocks(node){
	if (typeof window.$=="undefined") return;
	$(function(){
		node=$(node);
		if ($('#onglets-full',node).length)
			loadMenu();
		$("b.spt-univers",node).addClass("lazy");
		$('#iFrameFooterLoad',node).addClass("lazy");
		if (typeof $.fn.lazyload!=="undefined")
			onScroll(node);
	}
	)
}

/**
 * Display an html lazy loaded block
 * @param txt
 * @param src
 */
function dispBlock(txt,src){
	for (var i=0;i<lazyblocks.length;i++)
		if (lazyblocks[i][1]==src){
			document.getElementById(lazyblocks[i][0]).innerHTML = txt;
			completeBlocks('#'+lazyblocks[i][0]);
		}
}

/**
 * Lazy load html blocks
 */
function loadBlocks(){
	for (var i=0;i<lazyblocks.length;i++)
		jQl.loadxhr(lazyblocks[i][1],dispBlock);
}

/**
 * load delayed flag : IE need some extra time to render the html page
 * load blocks only when document.ready
 * this doesn't change the onload event timing, but it let some time to IE to render the page
 * otherwise nothing is rendered before all blocks are lazy loaded
 *
 * In others browser we can start immediatly xhr requests
 */
var ld = (document.all && window.print && !window.opera && /MSIE [567]/.test(navigator.userAgent));
if (ld!=true) loadBlocks();
/**
 * functions to call when jQuery loaded and document.ready
 */
function boot_jQ(){
	if (ld==true) loadBlocks();
	completeBlocks('body');
	boot_js();
}
/**
 * functions to call when script.minified.js is loaded
 * can be call by boot_JQ and the external script itself
 * only the second call is OK
 */
var booted=false;
function boot_js(){
	if (!jQl.booted() || typeof window.initPage=="undefined" || booted)
		return;
	booted=true;
	updateMarketPlaceOffers();
	onScroll($('body'));
	$(window).scroll(
	   function(){onScroll($('body'));}
	);
	$(function(){
		$('img.preload').remove();fixBlocks();
	});
	initPage();
}

/**
 * Launch the jQl booter
 */
jQl.boot(boot_jQ);