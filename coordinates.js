

// 顔の座標
// クラスのコンストラクタに渡し、値を変更する
let coordinates = {
	renge : {
		eye_head : {
			x: 0,
			y: 0,
		},
		eye_end : {
			x: 0,
			y: 0,
		},

		upper_eyelid : {
			cp: {
				x: 0,
				y: 0,
			},
		},
		lower_eyelid : {
			cp: {
				x: 0,
				y: 0,
			},
		},
	},
	nose : {
		position: {
			x: 0,
			y: 0,
		},
		bottom: {
			x: 0,
			y: 0,
		},
		cp1: {
			x: 0,
			y: 0,
		},
		cp2: {
			x: 0,
			y: 0,
		},
	},
	// 目
	eye: {
		size: 28,
		scale: 1.05,
		position : {
			x: 41, 
			y: 0
		},
		eye_head: {
			width: 0,
			height: 0,
		},
		eye_end: {
			x: 0,
			y: 0,
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
		lower_eyeline_cp1: {
			x: 0,
			y: 0,
		},
		lower_eyeline_cp2: {
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
		lower: {
			x: 0,
			y: 0,
		},
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
		twin_tail : {
			flag: 0,
			type: 1,
			length: 100,
			bunch: 5,
			width: 10,
			tip_span: 10,
			terminal: {
				x: 0,
				y: 0,
			},
			left: {
				length: 100,
				bunch: 5,
				terminal: {
					x: 0,
					y: 0,
				},
			},
			right: {
				length: 100,
				bunch: 5,
				terminal: {
					x: 0,
					y: 0,
				},
			},
			cp3: {
				x: 0,
				y: 0,
			},
			cp4: {
				x: 0,
				y: 0,
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
	lip: {
		upper: {
			cp: {
			width: 0,
			height: 0,
			},
			cp1: {
				x: 0,
				y: 0,
			},
			cp2: {
				x: 0,
				y: 0,
			},
		},
		lower: {
			cp: {
			width: 0,
			height: 0,
			},
			cp1: {
				x: 0,
				y: 0,
			},
			cp2: {
				x: 0,
				y: 0,
			},
		},
	},
};
