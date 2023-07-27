function correct_scroll(){
	let pf = document.getElementById("paralax_frame");
	let scroll = pf.scrollLeft;
	let ws = window.innerWidth;
	if (!scroll)
		return ;
	pf.scrollTo({left: (((scroll + ws / 2) / ws) >> 0) * ws, behavior: "smooth"});
}