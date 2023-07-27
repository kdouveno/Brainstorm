nav = document.querySelectorAll(".mobile_nav h2");

pf = document.getElementById("paralax_frame");

function scrollTo(nbrPanel, a){
	
	pf.scrollTo({left: nbrPanel * window.innerWidth, behavior: a ? "instant" : "smooth"});
	
}
let scrollDelay;
function onScroll(a){
	let scroll = pf.scrollLeft;
	let ws = window.innerWidth;
	if (!scroll)
		return ;
	let nbrPanel = ((scroll + ws / 2) / ws) >> 0;
	clearTimeout(scrollDelay);
	if (a) {
		nav = document.querySelectorAll(".mobile_nav h2");
		scrollTo(nbrPanel, true);
	} else {
		scrollDelay = setTimeout(scrollTo, 200, nbrPanel);
		nav.forEach((o,i)=>{
			if (i == nbrPanel)
				o.classList.add("active");
			else
				o.classList.remove("active");
		});
	}
}