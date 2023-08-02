nav = document.querySelectorAll(".mobile_nav h2");

pf = document.getElementById("paralax_frame");

LWs = document.getElementsByClassName("logo_wrapper");
lwsm = getLogoWrappersMeta();

function scrollTo(nbrPanel, a){
	
	pf.scrollTo({left: nbrPanel * window.innerWidth, behavior: a ? "instant" : "smooth"});
	
}
let scrollDelay;
let getNbrPanel = ()=>((pf.scrollLeft + window.innerWidth / 2) / window.innerWidth) >> 0;
let lastPanel;
function onScroll(){
	scrollLogos();
	if (!pf.scrollLeft)
		return ;
	nbrPanel = getNbrPanel();
	clearTimeout(scrollDelay);
	scrollDelay = setTimeout(scrollTo, 50, nbrPanel);
	if (nbrPanel == lastPanel)
		return ;
	lastPanel = nbrPanel;
	nav.forEach((o,i)=>{
		if (i == nbrPanel)
			o.classList.add("active");
		else
			o.classList.remove("active");
	});

}
function onResize(){
	resizeLogos();
	scrollTo(getNbrPanel(), true);
}
function scrollLogos(){
	for  (const lw of LWs){
		let co = lw.getBoundingClientRect().left + lwsm[lw].ro - window.innerWidth / 2;
		lw.style.perspectiveOrigin = (-co + lwsm[lw].ro) + "px";
	}
}
function resizeLogos(){
	getLogoWrappersMeta();
}
function getLogoWrappersMeta(){
	let out = {};
	Array.from(LWs).forEach(o=>{
		let re = o.getBoundingClientRect();
		let ro = re.width / 2;
			out[o] ={
				ro: ro,
			}
	});
	return out;
}
function init(){
	onResize();
}
init();