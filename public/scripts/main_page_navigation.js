var navColors;
setMobileTitles();

desk = window.matchMedia("(min-width: 769px)");
nav = document.querySelectorAll("#mobile_nav div");

prlx = new PRLX();


function scrollTo(nbrPanel, a){
	
	pf.scrollTo({left: nbrPanel * window.innerWidth, behavior: a ? "instant" : "smooth"});
	
}

function getNbrPanel() {return ((pf.scrollLeft + window.innerWidth / 2) / window.innerWidth) >> 0};


function setMobileTitles(){
	let titles = Array.from(document.querySelectorAll(".frame h2, .frame h3"));
	let t = [];
	let out = [];
	titles.forEach((o)=>{
		if (o.nodeName == "H2") {
			t.unshift([o.innerText, undefined]);
			out.unshift(o.getAttribute("color"));
		} else if (o.nodeName == "H3"){
			if (typeof(t[0][1]) === "undefined"){
				t[0][1] = o.innerText;
			} else {
				t.unshift([t[0][0], o.innerText]);
				out.unshift(out[0]);
			}
		}
	});
	out.reverse();
	navColors = out;
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
	t = t.reverse();
	let mobileNav = document.getElementById("mobile_nav");
	t.forEach(o=>{mobileNav.appendChild(o)});
}
