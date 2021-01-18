

// 顔の座標
// クラスのコンストラクタに渡し、値を変更する
let coordinates = {
	// 目
	eye: {
		size: 28,
		position : {
			x: 41, 
			y: 0
		},
		eye_head: {
			width: 0,
			height: 0,
		},
		upper_eyeline_end: {
			x: 0,
			y: 0,
		},
		upper_eyeline_cp: {
			x: 0,
			y: 0,
		},
		upper_eyeline_cp1: {
			x: 0,
			y: 0,
		},
		upper_eyeline_cp2: {
			x: 0,
			y: 0,
		},
		span_to_eye_x: 0,
		iris: {
			color: {
				r: 20, 
				g: 20, 
				b: 20,
			},
		},
	},
	// 眉
	eyeblow: 
	{
		head: {
			x: 0,
			y: 0,
		},
		end: {
			x: 0,
			y: 0,
		},
		cp: {
			y: -20,
		},
		eyeblow_cp_par: -20,
	},

	eyelid: {
	},

	// 髪
	hair: {
		color: {
			r: 100,
			g: 100,
			b: 100,
		},
		front: {
			type: 2,
			tips: 0,
			bunch: 6,
			length: 200,
			tip_span: 0,
			cp1: {
				x: 0, y: 0,
			},
			cp2: {
				x: 0, y: 0,
			},
		},
		outside_back: {
			bunch: 1,
			length: 10,
		},
		back: {
			type: 2,
			tips: 18,
			bunch: 18,
			length: 400,
			tip_span: 20,
			cp1: {
				x: 50, y: 0,
			},
			cp2: {
				x: 100, y: 50,
			},
		},
		side: {
			type: 0,
			bunch: 1,
			length: 10,
			left: {
				length: 10,
				bunch: 1,
			},
			right: {
				length: 10,
				bunch: 1,
			},
		},
		sideburns: {
			bunch: 1,
			length: 10,
			left: {
				bunch: 1,
				length: 10,
			},
			right: {
				bunch: 1,
				length: 10,
			},
		},
		outside: {
			bunch: 1,
			length: 10,
			volume: 100,
			left: {
				length: 10,
				volume: 10,
			},
			right: {
				length: 10,
				volume: 10,
			},
		},
	},

	cheek: {
		width: 0,
		cp1: {x: 0, y:0},
		cp2: {x: 0, y:0},
	},
	chin: {
		width: 0,
		height: 0,
	},

	// 口
	mouth: {
		width: 30,
		height: 0,
		cp_height: 10,
	},
};
