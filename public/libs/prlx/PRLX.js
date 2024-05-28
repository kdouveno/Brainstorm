const prefix = "prlx";

class PRLX {
	#frames;
	#wraps;
	#controller = new AbortController();

	constructor(manual){
		if(manual)
			return ;

		this.setup();
	}


	setup(){
		// this.#controller.abort();
		this.#frames = new Set();
		this.#wraps = new Map();
		let wraps = document.querySelectorAll("." + prefix + "_wrapper");
		for (let wrap of wraps) {
			let pc = this.getParentContainer(wrap);
			this.#wraps.set(wrap, pc);
			if (this.#frames.has(pc))
				continue ;
			this.#frames.add(pc);
			pc.addEventListener("scroll", this.onScroll, {signal: this.#controller.signal});
		}
		this.onResize();
		window.addEventListener("resize", this.onResize.bind(this), {signal: this.#controller.signal});
	}
	onScroll(e){
		e.target.style.setProperty("--" + prefix + "-sx", Math.floor(e.target.scrollLeft) + "px");
		e.target.style.setProperty("--" + prefix + "-sy", Math.floor(e.target.scrollTop) + "px");
	}
	onResize(){
		this.#wraps.forEach((v, k)=>{
				let cbox = v.getBoundingClientRect();
				let wbox = k.getBoundingClientRect();
				let ox = 0,
					oy = 0;
				let p = -1 * getComputedStyle(k).getPropertyValue("--prlx-scale");
				if (getComputedStyle(v).overflowX == "scroll"){
					let cox = cbox.left;
					let cwx = cbox.width / 2;
					let wox = wbox.left;
					let sx = v.scrollLeft;
					ox = (wox - cox - cwx + sx) * p;
				}
				if(getComputedStyle(v).overflowY == "scroll"){
					let coy = cbox.top;
					let cwy = cbox.height / 2;
					let woy = wbox.top;
					let sy = v.scrollTop;
					oy = (woy - coy - cwy + sy) * p;
				}
				k.style.setProperty("--"+prefix+"-pox", ox + "px");
				k.style.setProperty("--"+prefix+"-poy", oy + "px");
		})
	}

	getParentContainer(dom){
		if (!(dom instanceof Node))
			throw "Type Error : Expected Node";

		let root = document.querySelector(":root")

		do {
			if (dom.isSameNode(root))
				throw "Err : no '." + prefix + "' nor '<body>' found";
			dom = dom.parentNode;
		} while (!dom.matches(".prlx, body"));
		if (dom.nodeName)
		return dom;
	}
}