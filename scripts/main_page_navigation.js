setMobileTitles();

nav = document.querySelectorAll("#mobile_nav div");

pf = document.getElementById("paralax_frame");

LWs = document.getElementsByClassName("logo_wrapper");
BIWs = document.getElementsByClassName("bg_img_wrapper");
wsm = getWrappersMeta();
init();

function scrollTo(nbrPanel, a){
	
	pf.scrollTo({left: nbrPanel * window.innerWidth, behavior: a ? "instant" : "smooth"});
	
}

let scrollDelay;
function getNbrPanel() {return ((pf.scrollLeft + window.innerWidth / 2) / window.innerWidth) >> 0};
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
	for  (const e of wsm){
		let co = e[0].getBoundingClientRect().left + e[1].ro - window.innerWidth / 2;
		e[0].style.perspectiveOrigin = (-co + e[1].ro) + "px";
	}
}
function resizeLogos(){
	getWrappersMeta();
}
function getWrappersMeta(){
	let out = new Map();
	Array.from(LWs).forEach(o=>{
		let re = o.getBoundingClientRect();
		let ro = re.width / 2;
			out.set(o, {
				ro: ro,
			});
	});
	Array.from(BIWs).forEach(o=>{
		let re = o.getBoundingClientRect();
		let ro = re.width / 2;
			out.set(o, {
				ro: ro,
			});
	});
	return out;
}
function init(){
	onResize();
}

function setMobileTitles(){
	let titles = Array.from(document.querySelectorAll(".frame h2, .frame h3"));
	let t = [];
	titles.forEach((o)=>{
		if (o.nodeName == "H2") {
			t.unshift([o.innerText]);
		} else if (o.nodeName == "H3"){
			if (typeof(t[0][1]) === "undefined"){
				t[0][1] = o.innerText;
			} else {
				t.unshift([t[0][0], o.innerText]);
			}
		}

	});
	t = t.map(o=>{
		let out = document.createElement("div");
		out.innerText = o[0];
		if (!o[1])
			return out;
		let span = document.createElement("span");
		span.innerText = o[1];
		out.appendChild(span);
		return out;
	});
	let mobileNav = document.getElementById("mobile_nav");
	t.forEach(o=>{mobileNav.appendChild(o)});
}
