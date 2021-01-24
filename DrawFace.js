'use strict';

// グローバル変数

const LEFT = -1;
const RIGHT = 1;

// マウス用の座標
let px;
let py;
let ox;
let oy;


class DrawFace
{
	constructor(canvas_id, coordinates)
	{
		// キャンバス初期化
		this.initCanvas(canvas_id, 800, 640)

		// マウスイベント監視開始
		window.addEventListener('mousemove', this.mouseMove, false);

		// 顔の座標オブジェクトをそのままプロパティに代入
		this.coordinates = coordinates;

		// 全ての座標を計算
		this.initAllCoordinates();

		//this.mainLoop();

	}// コンストラクタ閉じ括弧

	initCanvas(canvas_id, canvas_width, canvas_height)
	{
		this.can = document.getElementById(canvas_id);
		this.con = this.can.getContext('2d');
		this.can.width = canvas_width;
		this.can.height = canvas_height;
	}

	lineTo(coordinate)
	{
		this.con.lineTo(coordinate.x, coordinate.y);
	}
	moveTo(coordinate)
	{
		this.con.moveTo(coordinate.x, coordinate.y);
	}


	// 配列初期化メソッド
	_initBackHairArrays()
	{
		this.back_hair_roots = [];
		this.back_hair_tips = [];
		this.back_hair_cp1 = [];
		this.back_hair_cp2 = [];
	}
	_initOutsideHairArrays()
	{
		this.outside_hair_roots = [];
		this.outside_hair_tips = [];
		this.outside_hair_cp1 = [];
		this.outside_hair_cp2 = [];
	}
	_initOutsideBackHairArrays()
	{
		this.outside_back_hair_roots = [];
		this.outside_back_hair_tips = [];
		this.outside_back_hair_cp1 = [];
		this.outside_back_hair_cp2 = [];
	}

	// 全座標初期化メソッド
	initAllCoordinates()
	{
		// ポジティブorネガティブ
		this.pn = 0;

		
		this.center = { // 中心座標
			x: this.can.width/2, 
			y: this.can.height/2 + 40 
		};
		this.top_of_head = { // 頭の頂点
			x: this.center.x, 
			y: this.center.y -240
		};
		this.iris_color = "rgb("
			+this.coordinates.eye.iris.color.r+", "
			+this.coordinates.eye.iris.color.g+", "
			+this.coordinates.eye.iris.color.b+")";

		this.hair_color = "rgb("
			+this.coordinates.hair.color.r+", "
			+this.coordinates.hair.color.g+", "
			+this.coordinates.hair.color.b+")";
		this.hair_stroke_color = "rgb("
			+(255 -this.coordinates.hair.color.r)+", "
			+(255 -this.coordinates.hair.color.g)+", "
			+(255 -this.coordinates.hair.color.b)+")";

		// れんげ　目頭
		this.renge_eye_head = [
			{
				x: this.center.x + 35,
				y: this.center.y,
			},
			{
				x: this.center.x - 35,
				y: this.center.y,
			},
		];
		// れんげ　目尻
		this.renge_eye_end = [
			{
				x: this.center.x + 135,
				y: this.center.y,
			},
			{
				x: this.center.x - 135,
				y: this.center.y,
			},
		];
		// れんげ　目頭側の眉毛
		this.renge_upper_eyelash_start = [
			{
				x: this.renge_eye_head[0].x -10,
				y: this.renge_eye_head[0].y -14,
			},
			{
				x: this.renge_eye_head[1].x +10,
				y: this.renge_eye_head[1].y -14,
			},
		];
		// れんげ　目尻側の眉毛
		this.renge_upper_eyelash_end = [
			{
				x: this.renge_eye_end[0].x +10,
				y: this.renge_eye_end[0].y -14,
			},
			{
				x: this.renge_eye_end[1].x -10,
				y: this.renge_eye_end[1].y -14,
			},
		];
		// れんげ　上瞼CP1
		this.renge_upper_eyelid_cp1 = [
			{
				x: this.renge_eye_head[0].x 
					+this.sp(this.renge_eye_head[0].x, 
						this.renge_eye_end[0].x, 1/3), 
				y: this.renge_eye_head[0].y -50 
					+this.coordinates.renge.upper_eyelid.cp.y,
			},
			{
				x: this.renge_eye_head[1].x 
					-this.sp(this.renge_eye_head[1].x, this.renge_eye_end[1].x, 1/3), 
				y: this.renge_eye_head[1].y - 50 
					+this.coordinates.renge.upper_eyelid.cp.y,
			},
		];
		// れんげ　上瞼CP2
		this.renge_upper_eyelid_cp2 = [
			{
				x: this.renge_eye_head[0].x 
					+this.sp(this.renge_eye_head[0].x, this.renge_eye_end[0].x, 2/3), 
				y: this.renge_eye_head[0].y - 50 
					+this.coordinates.renge.upper_eyelid.cp.y,
			},
			{
				x: this.renge_eye_head[1].x 
					-this.sp(this.renge_eye_head[1].x, this.renge_eye_end[1].x, 2/3), 
				y: this.renge_eye_head[1].y - 50 
					+this.coordinates.renge.upper_eyelid.cp.y,
			},
		];
		// れんげ　上まつ毛CP1
		this.renge_upper_eyelash_cp1 = [
			{
				x: this.renge_upper_eyelash_start[0].x 
					+this.sp(this.renge_upper_eyelash_start[0].x, this.renge_upper_eyelash_end[0].x, 1/3), 
				y: this.renge_upper_eyelid_cp1[0].y -14 ,
			},
			{
				x: this.renge_upper_eyelash_start[1].x 
					-this.sp(this.renge_upper_eyelash_start[1].x, this.renge_upper_eyelash_end[1].x, 1/3), 
				y: this.renge_upper_eyelid_cp1[1].y -14 ,
			},
		];
		// れんげ　上まつ毛CP2
		this.renge_upper_eyelash_cp2 = [
			{
				x: this.renge_upper_eyelash_start[0].x 
					+this.sp(this.renge_upper_eyelash_start[0].x, this.renge_upper_eyelash_end[0].x, 2/3), 
				y: this.renge_upper_eyelid_cp2[0].y -14 ,
			},
			{
				x: this.renge_upper_eyelash_start[1].x 
					-this.sp(this.renge_upper_eyelash_start[1].x, this.renge_upper_eyelash_end[1].x, 2/3), 
				y: this.renge_upper_eyelid_cp2[1].y -14 ,
			},
		];
		this.renge_lower_eyelid_cp1 = [
			{
				x: this.renge_eye_head[0].x,
				y: this.renge_eye_head[0].y + 80 
					+this.coordinates.renge.lower_eyelid.cp.y,
			},
			{
				x: this.renge_eye_head[1].x,
				y: this.renge_eye_head[1].y + 80 
					+this.coordinates.renge.lower_eyelid.cp.y,
			},
		];
		this.renge_lower_eyelid_cp2 = [
			{
				x: this.renge_eye_end[0].x,
				y: this.renge_eye_end[0].y + 80 
					+this.coordinates.renge.lower_eyelid.cp.y,
			},
			{
				x: this.renge_eye_end[1].x,
				y: this.renge_eye_end[1].y + 80 
					+this.coordinates.renge.lower_eyelid.cp.y,
			},
		];
		

		this.eye_head = [ // 目頭
			{ 
				x: this.center.x + 35 + this.coordinates.eye.eye_head.width, 
				y: this.center.y + this.coordinates.eye.eye_head.height
			},
			{ 
				x: this.center.x - 35 - this.coordinates.eye.eye_head.width, 
				y: this.center.y + this.coordinates.eye.eye_head.height
			},
		];

		this.upper_eyeline_end = [ // アッパーアイライン
			{ 
				x: this.eye_head[0].x + 100 
					+this.coordinates.eye.upper_eyeline_end.x, 
				y: this.center.y + this.coordinates.eye.upper_eyeline_end.y,
			},
			{ 
				x: this.eye_head[1].x - 100 
					-this.coordinates.eye.upper_eyeline_end.x, 
				y: this.center.y + this.coordinates.eye.upper_eyeline_end.y,
			},
		];
		/* アッパーアイラインCP1 */
		this.upper_eyeline_cp1 = [
			{ 
				x: this.eye_head[0].x 
					+this.sp(
						this.eye_head[0].x , 
						this.upper_eyeline_end[0].x, 1/3
					) 
					+this.coordinates.eye.upper_eyeline_cp1.x, 
				y: this.center.y -30 
					+this.coordinates.eye.upper_eyeline_cp1.y 
					+this.coordinates.eye.upper_eyeline_cp.y
			},
			{ 
				x: this.eye_head[1].x 
					-this.sp(
						this.eye_head[1].x , 
						this.upper_eyeline_end[1].x
						,1/3) 
					-this.coordinates.eye.upper_eyeline_cp1.x, 
				y: this.center.y -30 
					+this.coordinates.eye.upper_eyeline_cp1.y 
					+this.coordinates.eye.upper_eyeline_cp.y
			},
		];
		/* アッパーアイラインCP2 */
		this.upper_eyeline_cp2 = [
			{ 
				x: this.eye_head[0].x 
					+this.sp(this.eye_head[0].x, this.upper_eyeline_end[0].x, 2/3) 
					+this.coordinates.eye.upper_eyeline_cp2.x, 
				y: this.center.y -30 
					+this.coordinates.eye.upper_eyeline_cp2.y 
					+this.coordinates.eye.upper_eyeline_cp.y
			},
			{ 
				x: this.eye_head[1].x 
					-this.sp(this.eye_head[1].x, this.upper_eyeline_end[1].x, 2/3) 
					-this.coordinates.eye.upper_eyeline_cp2.x, 
				y: this.center.y-30 
					+this.coordinates.eye.upper_eyeline_cp2.y 
					+this.coordinates.eye.upper_eyeline_cp.y
			},
		];
		/* ロウワーアイラインCP1 */
		this.lower_eyeline_cp1 = [
			{ 
				x: this.eye_head[0].x 
					+this.sp(this.eye_head[0].x, this.upper_eyeline_end[0].x, 1/3) 
					+this.coordinates.eye.lower_eyeline_cp1.x, 
				y: this.center.y -30
					-this.coordinates.eye.lower_eyeline_cp1.y, 
			},
			{ 
				x: this.eye_head[1].x 
					-this.sp(this.eye_head[1].x, this.upper_eyeline_end[1].x, 1/3) 
					-this.coordinates.eye.lower_eyeline_cp1.x, 
				y: this.center.y -30
					-this.coordinates.eye.lower_eyeline_cp1.y, 
			},
		];
		/* ロウワーアイラインCP2 */
		this.lower_eyeline_cp2 = [
			{ 
				x: this.upper_eyeline_end[0].x +10 
					+this.coordinates.eye.lower_eyeline_cp2.x, 
				y: this.center.y -25
					-this.coordinates.eye.lower_eyeline_cp2.y, 
			},
			{ 
				x: this.upper_eyeline_end[1].x -10
					-this.coordinates.eye.lower_eyeline_cp2.x, 
				y: this.center.y -25
					-this.coordinates.eye.lower_eyeline_cp2.y, 
			},
		];
		/* アイライン(目頭) */
		this.upper_eyeline_start = [
			{ x: this.eye_head[0].x, y: this.eye_head[0].y},
			{ x: this.eye_head[1].x, y: this.eye_head[1].y},
		];
		/* 目尻 */
		this.eye_end = [
			{ 
				x: this.upper_eyeline_end[0].x - 20 
					+this.coordinates.eye.eye_end.x,
				y: this.center.y + 20
					+this.coordinates.eye.eye_end.y,
			},
			{ 
				x: this.upper_eyeline_end[1].x + 20 
					-this.coordinates.eye.eye_end.x,
				y: this.center.y + 20
					+this.coordinates.eye.eye_end.y,
			},
		];

		this.upper_eyeline_start2 = [
			{
				x: this.eye_head[0].x, 
				y: this.eye_head[0].y - 10
			},
			{
				x: this.eye_head[1].x, 
				y: this.eye_head[1].y - 10
			},
		];
		this.upper_eyeline_end2 = [
			{ 
				x: this.upper_eyeline_end[0].x, 
				y: this.center.y -10
			},
			{ 
				x: this.upper_eyeline_end[1].x, 
				y: this.center.y -10
			},
		];
		/* アイライン2CP1 */
		this.eyeline2_cp1 = [
			{ 
				x: this.upper_eyeline_cp1[0].x, 
				y: this.upper_eyeline_cp1[0].y -5
			},
			{ 
				x: this.upper_eyeline_cp1[1].x, 
				y: this.upper_eyeline_cp1[1].y -5
			},
		];
		/* アイライン2CP2 */
		this.eyeline2_cp2 = [
			{ 
				x: this.upper_eyeline_cp2[0].x, 
				y: this.upper_eyeline_cp2[0].y -5
			},
			{ 
				x: this.upper_eyeline_cp2[1].x, 
				y: this.upper_eyeline_cp2[1].y -5
			},
		];
		/* アイライン2CP1 */
		this.eyeline2_cp3 = [
			{ 
				x: this.upper_eyeline_cp1[0].x, 
				y: this.eyeline2_cp1[0].y -2
			},
			{ 
				x: this.upper_eyeline_cp1[1].x, 
				y: this.eyeline2_cp1[1].y -2
			},
		];
		/* アイライン2CP2 */
		this.eyeline2_cp4 = [
			{ 
				x: this.upper_eyeline_cp2[0].x, 
				y: this.eyeline2_cp2[0].y -2
			},
			{ 
				x: this.upper_eyeline_cp2[1].x, 
				y: this.eyeline2_cp2[1].y -2
			},
		];

		/* まつげ */
		this.eyelash_start = [
			{
				x : this.eye_end[0].x, 
				y: this.eye_end[0].y
			},
			{
				x : this.eye_end[1].x, 
				y: this.eye_end[1].y
			},
		]
		this.eyelash_end = [
			{
				x : this.upper_eyeline_end[0].x + 10, 
				y: this.upper_eyeline_end[0].y
			},
			{
				x : this.upper_eyeline_end[1].x - 10, 
				y: this.upper_eyeline_end[1].y
			},
		]
		this.eyelash_cp1 = [
			{
				x: this.eyelash_start[0].x 
					+this.sp(this.eyelash_start[0].x, this.eyelash_end[0].x, 1/2), 
				y: this.eyelash_end[0].y 
					+this.sp(this.eyelash_start[0].y, this.eyelash_end[0].y, 1/2) -5
			},
			{
				x: this.eyelash_start[1].x 
					-this.sp(this.eyelash_start[1].x, this.eyelash_end[1].x, 1/2), 
				y: this.eyelash_end[1].y 
					+this.sp(this.eyelash_start[1].y, this.eyelash_end[1].y, 1/2) -5
			},
		]
		this.eyelash_cp2 = [
			{
				x: this.eyelash_start[0].x 
					+this.sp(this.eyelash_start[0].x, this.eyelash_end[0].x, 1/2), 
				y: this.eyelash_end[0].y 
					+this.sp(this.eyelash_start[0].y, this.eyelash_end[0].y, 1/2) -5
			},
			{
				x: this.eyelash_start[1].x 
					-this.sp(this.eyelash_start[1].x, this.eyelash_end[1].x, 1/2), 
				y: this.eyelash_end[1].y 
					+this.sp(this.eyelash_start[1].y, this.eyelash_end[1].y, 1/2) -5
			},
		]
		this.eyelash_cp = [
			{
				x: this.upper_eyeline_end[0].x -10 , 
				y: this.eyelash_end[0].y
			},
			{
				x: this.upper_eyeline_end[1].x +10, 
				y: this.eyelash_end[1].y
			},
		];

		this.eyelid_cp1 = [
			{
				x: this.upper_eyeline_start[0].x, 
				y: this.upper_eyeline_start[0].y - 60
			},
			{
				x: this.upper_eyeline_start[1].x, 
				y: this.upper_eyeline_start[1].y - 60
			},
		];
		this.eyelid_cp2 = [
			{
				x: this.upper_eyeline_end[0].x, 
				y: this.upper_eyeline_end[0].y - 60
			},
			{
				x: this.upper_eyeline_end[1].x, 
				y: this.upper_eyeline_end[1].y - 60
			},
		];

		this.lower_eyelid_start = [
			{
				x: this.eye_head[0].x + 10, 
				y: this.eye_end[0].y
			},
			{
				x: this.eye_head[1].x - 10, 
				y: this.eye_end[1].y
			},
		];
		this.lower_eyelid_cp1 = [
			{
				x: this.lower_eyelid_start[0].x 
					+this.sp(this.lower_eyelid_start[0].x , this.eye_end[0].x, 1/3), 
				y: this.eye_end[0].y + 30
			},
			{
				x: this.lower_eyelid_start[1].x 
					-this.sp(this.lower_eyelid_start[1].x , this.eye_end[1].x, 1/3), 
				y: this.eye_end[1].y + 30
			},
		];
		this.lower_eyelid_cp2 = [
			{
				x: this.lower_eyelid_start[0].x 
					+this.sp(this.lower_eyelid_start[0].x , this.eye_end[0].x, 2/3), 
				y: this.eye_end[0].y + 30},
			{
				x: this.lower_eyelid_start[1].x 
					-this.sp(this.lower_eyelid_start[1].x , this.eye_end[1].x, 2/3), 
				y: this.eye_end[1].y + 30},
		];
		this.lower_eyelid_cp3 = [
			{
				x: this.eye_head[0].x , 
				y: this.eye_head[0].y + 80
			},
			{
				x: this.eye_head[1].x , 
				y: this.eye_head[1].y + 80
			},
		];
		this.lower_eyelid_cp4 = [
			{
				x: this.eye_end[0].x , 
				y: this.eye_end[0].y + 60
			},
			{
				x: this.eye_end[1].x , 
				y: this.eye_end[1].y + 60
			},
		];

		/*************************************************************
		 * 鼻
		*************************************************************/
		this.nose_top = {
			x:this.center.x, 
			y:this.center.y +90 + this.coordinates.nose.position.y
		};
		this.nose_bottom = {
			x:this.center.x, 
			y:this.nose_top.y + 12
		};
		this.nose_cp1 = {
			x:this.nose_top.x + 5 , 
			y:this.nose_top.y 
				+this.sp(this.nose_top.y , this.nose_bottom.y, 1/2)
		};
		this.nose_cp2 = {
			x:this.nose_top.x , 
			y:this.nose_top.y -this.sp(this.nose_top.y , this.nose_bottom.y, 2/3)
		};


		this.eyelid_bottom = [
			{
				x: this.eye_head[0].x + 40, 
				y: this.center.y +28 +5
			}, 
			{
				x: this.eye_head[1].x - 40, 
				y: this.center.y +28 +5
			}, 
		];
		this.eyelid_bottom_cp1 = [
			{
				x: this.eye_head[0].x, 
				y: this.eyelid_bottom[0].y
			}, 
			{
				x: this.eye_head[1].x, 
				y: this.eyelid_bottom[1].y
			}, 
		];
		this.eyelid_bottom_cp3 = [
			{
				x: this.eye_end[0].x 
					-this.sp(this.eye_end[0].x, this.eyelid_bottom[0].x, 1/2), 
				y: this.eyelid_bottom[0].y
			}, 
			{
				x: this.eye_end[1].x 
					+this.sp(this.eyelid_bottom[1].x,this.eye_end[1].x,  1/2), 
				y: this.eyelid_bottom[1].y
			}, 
		];
		this.eyelid_bottom_cp4 = [
			{
				x: this.eye_head[0].x, 
				y: this.eyelid_bottom[0].y
			}, 
			{
				x: this.eye_head[1].x, 
				y: this.eyelid_bottom[1].y
			}, 
		];
		this.mouth_start = {
			x: this.center.x - this.coordinates.mouth.width, 
			y: this.center.y + 130 + this.coordinates.mouth.height
		};
		this.mouth_end = {
			x: this.center.x + this.coordinates.mouth.width, 
			y: this.center.y + 130 + this.coordinates.mouth.height
		};
		this.mouth_cp1 = {
			x: this.mouth_start.x + this.sp(this.mouth_start.x , this.mouth_end.x, 1/3), 
			y: this.mouth_start.y + this.coordinates.mouth.cp_height};
		this.mouth_cp2 = {
			x: this.mouth_start.x + this.sp(this.mouth_start.x , this.mouth_end.x, 2/3), 
			y: this.mouth_start.y + this.coordinates.mouth.cp_height};

		this.chin_start = {
			x: this.center.x - 30 - this.coordinates.chin.width, 
			y: this.mouth_start.y + 50 + this.coordinates.chin.height
		};
		this.chin_end = {
			x: this.center.x + 30 + this.coordinates.chin.width, 
			y: this.mouth_start.y + 50 + this.coordinates.chin.height
		};
		this.chin_cp1 = {
			x:this.chin_start.x + this.sp(this.chin_start.x, this.chin_end.x, 1/3), 
			y: this.chin_start.y + 10
		};
		this.chin_cp2 = {
			x:this.chin_start.x + this.sp(this.chin_start.x, this.chin_end.x, 2/3), 
			y: this.chin_start.y + 10};
		this.nape = {
			x: this.center.x,
			y: this.chin_start.y,
		};
		this.twin_terminal_right = {
			x: this.top_of_head.x + 140 + this.coordinates.hair.twin_tail.terminal.x,
			y: this.top_of_head.y + this.sp(this.top_of_head.y, this.nape.y, 1/2) + this.coordinates.hair.twin_tail.terminal.y,
		};
		this.twin_terminal_left = {
			x: this.top_of_head.x - 140 - this.coordinates.hair.twin_tail.terminal.x,
			y: this.top_of_head.y + this.sp(this.top_of_head.y, this.nape.y, 1/2) + this.coordinates.hair.twin_tail.terminal.y,
		};
		this.cheek_start = [
			{
				x: this.chin_end.x 
					+this.coordinates.chin.width 
					+this.coordinates.cheek.width, 
				y: this.chin_end.y
			},
			{
				x: this.chin_start.x 
					-this.coordinates.chin.width 
					-this.coordinates.cheek.width, 
				y: this.chin_start.y
			},
		];
		this.cheek_end = [
			{
				x: this.upper_eyeline_end[0].x + 20 
					+this.coordinates.eye.span_to_eye_x, 
				y: this.upper_eyeline_end[0].y
			},
			{
				x: this.upper_eyeline_end[1].x - 20 
					-this.coordinates.eye.span_to_eye_x, 
				y: this.upper_eyeline_end[1].y
			},
		];
		this.temple_left =	{
			x: this.cheek_end[1].x, 
			y: this.cheek_end[1].y 
		};
		this.temple_right = {
			x: this.cheek_end[0].x, 
			y: this.cheek_end[0].y 
		};
		this.cheek_cp1 = [
			{
				x: this.cheek_start[0].x 
					+this.sp(this.cheek_start[0].x, this.cheek_end[0].x, 1/3) 
					+this.coordinates.cheek.cp1.x, 
				y: this.cheek_start[0].y 
					-this.sp(this.cheek_start[0].y, this.cheek_end[0].y, 1/8) 
					+this.coordinates.cheek.cp1.y
			},
			{
				x: this.cheek_start[1].x 
					-this.sp(this.cheek_start[1].x, this.cheek_end[1].x, 1/3) 
					-this.coordinates.cheek.cp1.x, 
				y: this.cheek_start[1].y 
					-this.sp(this.cheek_start[1].y, this.cheek_end[1].y, 1/8) 
					+this.coordinates.cheek.cp1.y
			},
		];
		this.cheek_cp2 = [
			{
				x: this.cheek_start[0].x 
					+this.sp(this.cheek_start[0].x, this.cheek_end[0].x, 4/5) 
					+this.coordinates.cheek.cp2.x, 
				y: this.cheek_start[0].y 
					-this.sp(this.cheek_start[0].y, this.cheek_end[0].y, 2/8) 
					+this.coordinates.cheek.cp2.y
			},
			{
				x: this.cheek_start[1].x 
					-this.sp(this.cheek_start[1].x, this.cheek_end[1].x, 4/5) 
					-this.coordinates.cheek.cp2.x, 
				y: this.cheek_start[1].y 
					-this.sp(this.cheek_start[1].y, this.cheek_end[1].y, 2/8) 
					+this.coordinates.cheek.cp2.y
			},
		];

		this.head_cp1 = {
			x: this.cheek_end[0].x + 60, 
			y:this.center.y -320
		};
		this.head_cp2 = {
			x: this.cheek_end[1].x - 60, 
			y:this.center.y -320
		};

		this.ear_start = [
			{
				x: this.temple_right.x -20, 
				y: this.temple_right.y - 20
			},
			{
				x: this.temple_left.x + 20, 
				y: this.temple_left.y - 20
			},
		];
		this.ear_end = [
			{
				x: this.eye_end[0].x, 
				y: this.eye_end[0].y + 50
			},
			{
				x: this.eye_end[1].x, 
				y: this.eye_end[1].y + 50
			},
		];
		this.earlobe_start = [
			{
				x: this.ear_start[0].x + 30, 
				y: this.ear_start[0].y 
					+this.sp(this.ear_start[0].y, this.ear_end[0].y, 2/3) 
			},
			{
				x: this.ear_start[1].x - 30, 
				y: this.ear_start[1].y 
					+this.sp(this.ear_start[1].y, this.ear_end[1].y, 2/3) 
			},
		];
		this.inner_ear_start = [
			{
				x: this.ear_start[0].x -10, 
				y: this.ear_start[0].y + 10
			},
			{
				x: this.ear_start[1].x +10, 
				y: this.ear_start[1].y + 10
			},
		];
		this.inner_ear_end = [
			{
				x: this.earlobe_start[0].x -10, 
				y: this.earlobe_start[0].y - 10 
			},
			{
				x: this.earlobe_start[1].x +10, 
				y: this.earlobe_start[1].y - 10 
			},
		];
		this.ear_cp1 = [
			{
				x: this.earlobe_start[0].x 
					+this.sp(this.ear_start[0].x ,this.earlobe_start[0].x, 1), 
				y: this.ear_start[0].y - 20
			},
			{
				x: this.earlobe_start[1].x 
					-this.sp(this.ear_start[1].x ,this.earlobe_start[1].x, 1), 
				y: this.ear_start[1].y - 20
			},
		];
		this.ear_cp2 = [
			{
				x: this.earlobe_start[0].x 
					+this.sp(this.ear_start[0].x ,this.earlobe_start[0].x, 1), 
				y: this.ear_start[0].y 
					+this.sp(this.ear_start[0].y ,this.earlobe_start[0].y, 1/2)
			},
			{
				x: this.earlobe_start[1].x 
					-this.sp(this.ear_start[1].x ,this.earlobe_start[1].x, 1), 
				y: this.ear_start[1].y 
					+this.sp(this.ear_start[1].y ,this.earlobe_start[1].y, 1/2)
			},
		];
		this.inner_ear_cp1 = [
			{
				x: this.inner_ear_end[0].x 
					+this.sp(this.inner_ear_start[0].x ,this.inner_ear_end[0].x, 1), 
				y: this.inner_ear_start[0].y - 20
			},
			{
				x: this.inner_ear_end[1].x 
					-this.sp(this.inner_ear_start[1].x ,this.inner_ear_end[1].x, 1), 
				y: this.inner_ear_start[1].y - 20
			},
		];
		this.inner_ear_cp2 = [
			{
				x: this.inner_ear_end[0].x 
					+this.sp(this.inner_ear_start[0].x ,this.inner_ear_end[0].x, 1), 
				y: this.inner_ear_start[0].y 
					+this.sp(this.inner_ear_start[0].y ,this.inner_ear_end[0].y, 1/2)
			},
			{
				x: this.inner_ear_end[1].x 
					-this.sp(this.inner_ear_start[1].x ,this.inner_ear_end[1].x, 1), 
				y: this.inner_ear_start[1].y 
					+this.sp(this.inner_ear_start[1].y ,this.inner_ear_end[1].y, 1/2)
			},
		];
		this.earlobe_cp1 = [
			{
				x: this.earlobe_start[0].x, 
				y: this.ear_end[0].y},
			{
				x: this.earlobe_start[1].x, 
				y: this.ear_end[1].y
			},
		];
		this.earlobe_cp2 = [];

		this.neck_start = [
			{
				x: this.center.x + 70, 
				y: this.chin_start.y -60
			},
			{
				x: this.center.x - 70, 
				y: this.chin_start.y -60
			},
		];
		this.neck_end = [
			{
				x: this.neck_start[0].x + 150, 
				y: this.neck_start[0].y + 180
			},
			{
				x: this.neck_start[1].x - 150, 
				y: this.neck_start[1].y + 180
			},
		];


		this.neck_start2 = [
			{
				x: this.neck_start[0].x, 
				y: this.neck_start[0].y + 60
			},
			{
				x: this.neck_start[1].x, 
				y: this.neck_start[1].y + 60
			},
		];
		this.neck_end2 = [
			{
				x: this.neck_end[0].x, 
				y: this.neck_end[0].y + 50
			},
			{
				x: this.neck_end[1].x, 
				y: this.neck_end[1].y + 50
			},
		];

		this.neck_terminal1 = [
			{
				x: this.neck_start[0].x, 
				y: this.neck_start[0].y - 150
			},
			{
				x: this.neck_start[1].x, 
				y: this.neck_start[1].y - 150
			},
		];
		this.neck_terminal2 = [
			{
				x: this.neck_end[0].x, 
				y: this.neck_terminal1[0].y 
			},
			{
				x: this.neck_end[1].x, 
				y: this.neck_terminal1[1].y 
			},
		];
		this.neck_cp1 = [
			{
				x: this.neck_start[0].x -5, 
				y: this.neck_start[0].y +130
			},
			{
				x: this.neck_start[1].x +5, 
				y: this.neck_start[1].y +130
			},
		];
		this.neck_cp2 = [
			{
				x: this.neck_start[0].x -30 , 
				y: this.neck_start[0].y +160
			},
			{
				x: this.neck_start[1].x +30 , 
				y: this.neck_start[1].y +160
			},
		];
		this.neck_shadow_cp1 = {
			x: this.neck_start[1].x 
				+this.sp(this.neck_start[1].x, this.neck_end[1].x, 2/3) , 
			y: this.neck_start2[1].y +50
		};
		this.neck_shadow_cp2 = {
			x: this.neck_start[1].x 
				+this.sp(this.neck_start[1].x, this.neck_end[1].x, 1/3) , 
			y: this.neck_start2[1].y +50
		};

		this.lower_lip_start = {
			x: this.center.x - 20, 
			y:this.mouth_start.y +10
		};
		this.lower_lip_end = {
			x: this.center.x + 20, 
			y:this.mouth_start.y +10
		};
		this.lower_lip_cp1 = {
			x: this.lower_lip_start.x 
				+this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 1/3), 
			y: this.lower_lip_start.y + 5
		};
		this.lower_lip_cp2 = {
			x: this.lower_lip_start.x 
				+this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 2/3), 
			y: this.lower_lip_start.y + 5
		};
		this.lower_lip_cp3 = {
			x: this.lower_lip_start.x 
				+this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 1/3), 
			y: this.lower_lip_start.y + 10
		};
		this.lower_lip_cp4 = {
			x: this.lower_lip_start.x 
				+this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 2/3), 
			y: this.lower_lip_start.y + 10
		};

		this.forehead_right = {
			x: this.cheek_end[0].x 
				-this.sp(this.cheek_end[0].y, this.cheek_start[0].y, 1/6), 
			y: this.cheek_end[0].y - 140
		};
		this.forehead_left = {
			x: this.cheek_end[1].x 
				+this.sp(this.cheek_end[1].y, this.cheek_start[1].y, 1/6), 
			y: this.cheek_end[1].y - 140
		};

		this.eyeblow_start = [
			{
				x: this.eye_head[0].x -10 + this.coordinates.eyeblow.head.x, 
				y: this.eye_head[0].y -40 + this.coordinates.eyeblow.head.y,
			},
			{
				x: this.eye_head[1].x +10 - this.coordinates.eyeblow.head.x, 
				y: this.eye_head[1].y -40 + this.coordinates.eyeblow.head.y,
			},
		];
		this.eyeblow_end = [
			{
				x: this.upper_eyeline_end[0].x + 5 + this.coordinates.eyeblow.end.x, 
				y: this.upper_eyeline_end[0].y -50 + this.coordinates.eyeblow.end.y
			},
			{
				x: this.upper_eyeline_end[1].x - 5 - this.coordinates.eyeblow.end.x, 
				y: this.upper_eyeline_end[1].y -50 + this.coordinates.eyeblow.end.y
			},
		];
		this.eyeblow_upper_cp1 = [
			{
				x: this.eyeblow_start[0].x 
					+this.sp(this.eyeblow_end[0].x , this.eyeblow_start[0].x,1/3), 
				y: this.eyeblow_start[0].y -10
			},
			{
				x: this.eyeblow_start[1].x 
					-this.sp(this.eyeblow_end[1].x , this.eyeblow_start[1].x, 1/3), 
				y: this.eyeblow_start[1].y -10
			},
		];
		this.eyeblow_upper_cp2 = [
			{
				x: this.eyeblow_start[0].x 	
					+this.sp(this.eyeblow_end[0].x , this.eyeblow_start[0].x, 2/3), 
				y: this.eyeblow_start[0].y -20
			},
			{
				x: this.eyeblow_start[1].x 
					-this.sp(this.eyeblow_end[1].x , this.eyeblow_start[1].x, 2/3), 
				y: this.eyeblow_start[1].y -20
			},
		];
		// y座標を+10くらいにすれば太眉になる。-20くらいで細眉
		this.eyeblow_lower_cp1 = [
			{
				x: this.eyeblow_start[0].x 
					+this.sp(this.eyeblow_end[0].x ,this.eyeblow_start[0].x, 1/3), 
				y: this.eyeblow_start[0].y +this.coordinates.eyeblow.cp.y
			},
			{
				x: this.eyeblow_start[1].x 
					-this.sp(this.eyeblow_end[1].x ,this.eyeblow_start[1].x, 1/3), 
				y: this.eyeblow_start[1].y +this.coordinates.eyeblow.cp.y
			},
		];
		this.eyeblow_lower_cp2 = [
			{
				x: this.eyeblow_start[0].x 
					+this.sp(this.eyeblow_end[0].x , this.eyeblow_start[0].x, 2/3), 
				y: this.eyeblow_start[0].y -20
			},
			{
				x: this.eyeblow_start[1].x 
					-this.sp(this.eyeblow_end[1].x , this.eyeblow_start[1].x, 2/3), 
				y: this.eyeblow_start[1].y -20
			},
		];

		this.front_hair_roots = [];
		this.front_hair_tips = [];
		this.front_hair_cp1 = [];
		this.front_hair_cp2 = [];

		this.back_hair_roots = [];
		this.back_hair_tips = [];
		this.back_hair_cp1 = [];
		this.back_hair_cp2 = [];


		this.side_hair_arrays = {
			roots: [],
			tips: [],
			cp1: [],
			cp2: [],
		};
		this.front_hair_arrays = {
			roots: [],
			tips: [],
			cp1: [],
			cp2: [],
		};
		this.back_hair_arrays = {
			roots: [],
			tips: [],
			cp1: [],
			cp2: [],
		};
		this.outside_back_hair_arrays = {
			roots: [],
			tips: [],
			cp1: [],
			cp2: [],
		};
		this.outside_hair_arrays = {
			roots: [],
			tips: [],
			cp1: [],
			cp2: [],
		};
		this.twin_tail_arrays = {
			roots: [],
			terminals: [],
			tips: [],
			cp1: [],
			cp2: [],
			cp3: [],
			cp3sub: [],
			cp4: [],
			cp4sub: [],
		};

		this.side_hair_roots = [];
		this.side_hair_tips = [];
		this.side_hair_cp1 = [];
		this.side_hair_cp2 = [];

		this.outside_hair_roots = [];
		this.outside_hair_tips = [];
		this.outside_hair_cp1 = [];
		this.outside_hair_cp2 = [];

		this.outside_hair_upper_cp1 = {
			x: this.head_cp1.x -10,
			y: this.head_cp1.y -20,
		};
		this.outside_hair_upper_cp2 = {
			x: this.head_cp2.x +10,
			y: this.head_cp2.y -20,
		};

		this.temple = [
			{
				x: this.cheek_end[1].x, 
				y: this.cheek_end[1].y 
			},
			{
				x: this.cheek_end[0].x, 
				y: this.cheek_end[0].y 
			},
		];

		this.outside_back_hair_roots = [];
		this.outside_back_hair_tips = [];
		this.outside_back_hair_cp1 = [];
		this.outside_back_hair_cp2 = [];

		this.outside_back_hair_left = {
			x: this.center.x - 190,
			y: this.center.y,
		};
		this.outside_back_hair_right = {
			x: this.center.x + 190,
			y: this.center.y,
		};
		this.outside_back_head_cp1 = {
			x: this.head_cp1.x -10,
			y: this.head_cp1.y -30,
		};
		this.outside_back_head_cp2 = {
			x: this.head_cp2.x +10,
			y: this.head_cp2.y -30,
		};
		this.eye_shadow_start = [
			{
				x: this.eye_head[0].x, 
				y: this.eye_head[0].y + 10
			},
			{
				x: this.eye_head[1].x, 
				y: this.eye_head[1].y + 10
			},
		];
		this.eye_shadow_end = [
			{
				x: this.upper_eyeline_end[0].x -10, 
				y: this.eye_head[0].y + 10
			},
			{
				x: this.upper_eyeline_end[1].x +10, 
				y: this.eye_head[1].y + 10
			},
		];
		this.eye_shadow_cp1 = [
			{
				x: this.upper_eyeline_cp1[0].x, 
				y: this.upper_eyeline_cp1[0].y + 10
			},
			{
				x: this.upper_eyeline_cp1[1].x, 
				y: this.upper_eyeline_cp1[1].y + 10
			},
		];
		this.eye_shadow_cp2 = [
			{
				x: this.upper_eyeline_cp2[0].x, 
				y: this.upper_eyeline_cp2[0].y + 10
			},
			{
				x: this.upper_eyeline_cp2[1].x, 
				y: this.upper_eyeline_cp2[1].y + 10
			},
		];

		this.outside_hair_left = {
			x: this.temple_left.x -this.coordinates.hair.outside.volume,
			y: this.temple_left.y,
		};
		this.outside_hair_right = {
			x: this.temple_right.x +this.coordinates.hair.outside.volume,
			y: this.temple_right.y,
		};
	}




	// マウスイベント。イベント情報はグローバル変数に代入。
	mouseMove(e)
	{
		// オフセットはターゲットエレメントの左上を0,0としてそこからのマウスの座標を取得。
		px = e.pageX;
		py = e.pageY;
		ox = e.offsetX;
		oy = e.offsetY;
	}

	static clear(canvas_id)
	{
		let can = document.getElementById(canvas_id);
		let con = can.getContext('2d');
		con.clearRect(0, 0, can.width, can.height);
	}


	_config(fillStyle, strokeStyle = "#000", globalAlpha = 1, linewidth = 1 )
	{
		this.con.fillStyle = fillStyle;
		this.con.strokeStyle = strokeStyle;
		this.con.globalAlpha = globalAlpha;
		this.con.lineWidth = linewidth;
	}


	fillR( arr, color = "#000" )
	{
		this.con.fillStyle = color;
		this.con.fillRect(arr.x, arr.y, 4, 4);
	}

	drawCurve(start, end, cp, stats = false)
	{
		if (stats)
		{
			this.con.moveTo(start.x, start.y);
		}
		this.con.quadraticCurveTo(cp.x, cp.y, end.x, end.y)
	}
	drawCurve2(start, end, cp1, cp2, stats = false)
	{
		if (stats)
		{
			this.con.moveTo(start.x, start.y);
		}
		this.con.bezierCurveTo(
			cp1.x, cp1.y,
			cp2.x, cp2.y,
			end.x, end.y);
	}

	sp( start, end, value)
	{
		return Math.floor(Math.abs(end - start) * value);
	}


	_initFrontHairArrays()
	{
		this.front_hair_roots = [];
		this.front_hair_tips = [];
		this.front_hair_cp1 = [];
		this.front_hair_cp2 = [];
	}

	_initHairArrays(arrays)
	{
		arrays.roots = [];
		arrays.tips = [];
		arrays.cp1 = [];
		arrays.cp2 = [];
	}

	update()
	{
		this.initAllCoordinates();// 全ての座標を再計算
	}


	draw()
	{
		this.con.clearRect(0, 0, this.can.width, this.can.height);
		this.drawDebug();
		this.drawOutsideBackHair(
			this.coordinates.hair.outside_back.bunch, 
			this.coordinates.hair.outside_back.length
		);
		this._selectBackHair();
		this.drawNeck();
		this.drawNeckShadow();
		this.drawEar();
		this.drawOutline();
		this.drawWhiteEyes();
		//this.drawRengeWhiteEyes();
		this.drawEyes();
		this.drawEyelid();
		//this.drawRengeEyelid();
		//this.drawRengeEyes();
		this.drawEyeline2();
		//this.drawEyelashes();
		this.drawLowerEyelid();
		//this.drawRengeLowerEyelid();
		this.drawMouth();
		this.drawEyeblow();
		this.drawNose();
		this.drawSkinHead();
		this.drawSideburns(this.coordinates.hair.sideburns);
		this._selectFrontHair();
		this._selectSideHair();
	}

	_selectBackHair()
	{
		switch (this.coordinates.hair.back.type)
		{
			case 2:
				this.drawBackHairStandard(
					this.coordinates.hair.back.bunch, 
					this.coordinates.hair.back.length
				);
				break;
			case 3:
				this.drawBackHair(
					this.coordinates.hair.back.bunch, 
					this.coordinates.hair.back.length
				);
				break;
			case 4:
				this.drawBackHair2(
					this.coordinates.hair.back.bunch, 
					this.coordinates.hair.back.length
				);
				break;
			case 5:
				this.drawTwinTails();
				break;
			default:
				break;
		}
	}
	_selectFrontHair()
	{
		switch (this.coordinates.hair.front.type)
		{
			case 2:
				this.drawFrontHairStandard(
					this.coordinates.hair.front.bunch, 
					this.coordinates.hair.front.length
				);
				break;
			case 5:
				this.drawFrontPrincessCut(
					this.coordinates.hair.front.bunch, 
					this.coordinates.hair.front.length
				);
				break;
			default:
				break;
		}
	}
	_selectSideHair()
	{
		switch (this.coordinates.hair.side.type)
		{
			case 0:
				this.drawSideHairStandard(
					this.coordinates.hair.side, 
					this.side_hair_arrays, 
					this.temple_left, 
					this.forehead_right
				);
				break;
			default:
				break;
		}
	}


	// 2店間の座標から傾きを求めy座標を求める
	// 引数はx座標・y座標を持つ連想配列
	generateCoordinateY(start_coordinate, end_coordinate, x)
	{
		let vx = Math.abs(end_coordinate.x - start_coordinate.x);//xの増加量
		let vy = Math.abs(end_coordinate.y - start_coordinate.y);//yの増加量
		let y = x * vy / vx;
		return y;
	}



	generateCoordinateX(start_coordinate, end_coordinate, y)
	{
		let vx = Math.abs(end_coordinate.x - start_coordinate.x);//xの増加量
		let vy = Math.abs(end_coordinate.y - start_coordinate.y);//yの増加量
		let x = (Math.floor((y / (vy / vx))*100))/100;
		if (start_coordinate.x > end_coordinate.x)
		{
			return -x;
		}
		return x;
	}



	_initializeSideHairArray()
	{
		this.side_hair_roots = [];
		this.side_hair_tips = [];
		this.side_hair_cp1 = [];
		this.side_hair_cp2 = [];
	}


	
	_generateSideburnsLeftCoordinates(hair_length, hair_bunch, span)
	{
			this._initializeSideHairArray();

			/* 左サイド髪の座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				this.side_hair_roots[i] = {
					x: this.temple_left.x + i*span, 
					y: this.temple_left.y + this.generateSideburnsCoordinateLeft(i*span)
				};
				this.side_hair_tips[i] = {
					x: this.temple_left.x + i*span + rand(-60, 0), 
					y: this.temple_left.y + rand(0, 20) + hair_length
				};
				this.side_hair_cp1[i] = {
					x: this.temple_left.x + i*span/2 + rand(-5, 5), 
					y: this.side_hair_roots[i].y 
						+this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 1/3)
				};
				this.side_hair_cp2[i] = {
					x: this.temple_left.x + i*span/2 + rand(-1, 1), 
					y: this.side_hair_roots[i].y 
						+this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 2/3) 
				};
			}
	}


	/**********************************************************************
	 * ツインテールを描画
	 * ツインテールはtop_of_headから縦一文字のラインから均等にルートを設定し
	 * そこからまず中継地点で一つにまとめ、
	 * さらにそこから毛先を任意に散らす。
	**********************************************************************/
	drawTwinTails()
	{
		// 右
		this._generateTwinTailCoordinates();
		this.drawTwinTailFromRootsToTerminals();
		this.drawTwinTailFromTerminalsToTips();

		// 左
		this._generateTwinTailCoordinates(LEFT);
		this.drawTwinTailFromRootsToTerminals();
		this.drawTwinTailFromTerminalsToTips();
	}
	_generateTwinTailCoordinates(direction = RIGHT)// ツインテールの座標生成
	{
		this._generateTwinTailRoots();// ツインテールのルートの座標生成
		this._generateTwinTailTerminals(direction);// ツインテールのルートの座標生成
		this._generateTwinTailTips(direction);
		this._generateTwinTailTipCp(direction);
	}
	drawTwinTailFromTerminalsToTips()
	{
		this.con.beginPath();
		this._config(this.hair_color, this.hair_stroke_color, 1, 1);
		this.moveTo(this.twin_tail_arrays.terminals[0]);
		for (let i=0; i<=this.coordinates.hair.twin_tail.bunch; i++)
		{
			if( i+1<=this.coordinates.hair.twin_tail.bunch)
			{
				this.drawCurve2(
					this.twin_tail_arrays.terminals[i], 
					this.twin_tail_arrays.tips[i],
					this.twin_tail_arrays.cp3sub[i],
					this.twin_tail_arrays.cp4sub[i]);
				/*
				this.drawCurve2(
					this.twin_tail_arrays.tips[i],
					this.twin_tail_arrays.terminals[i+1], 
					this.twin_tail_arrays.cp4[i+1],
					this.twin_tail_arrays.cp3[i+1]);
					*/
				this.drawCurve2(
					this.twin_tail_arrays.tips[i],
					this.twin_tail_arrays.terminals[i+1], 
					this.twin_tail_arrays.cp4[i],
					this.twin_tail_arrays.cp3[i]);
				this.con.stroke();
				this.con.fill();
			}
		}
	}
	drawTwinTailFromRootsToTerminals()
	{
		this.con.beginPath();
		this._config(this.hair_color, this.hair_stroke_color, 1, 1);
		this.moveTo(this.twin_tail_arrays.roots[0]);
		for (let i=0; i<=this.coordinates.hair.twin_tail.bunch; i++)
		{
			if( i+1<=this.coordinates.hair.twin_tail.bunch)
			{
				this.drawCurve2(
					this.twin_tail_arrays.roots[i], 
					this.twin_tail_arrays.terminals[i],
					this.twin_tail_arrays.cp1[i],
					this.twin_tail_arrays.cp2[i]);
				this.lineTo(this.twin_tail_arrays.terminals[i+1]);
				this.drawCurve2(
					this.twin_tail_arrays.terminals[i+1],
					this.twin_tail_arrays.roots[i+1], 
					this.twin_tail_arrays.cp2[i+1],
					this.twin_tail_arrays.cp1[i+1]);
					this.con.fill();
					this.con.stroke();
			}
		}
	}
	_generateTwinTailTips(direction = RIGHT)
	{
		let span = this.coordinates.hair.twin_tail.tip_span;
		let terminal;
		if (direction === RIGHT)
		{
			terminal = this.twin_terminal_right;
		}
		else
		{
			terminal = this.twin_terminal_left;
		}
		for (let i=0; i<=this.coordinates.hair.twin_tail.bunch; i++)
		{
			this.twin_tail_arrays.tips[i] = {
				x: terminal.x + i*span*direction + 40*direction + rand(-10, 10),
				y: terminal.y 
					+this.coordinates.hair.twin_tail.length + 100
					+rand(0, 5), 
			};
		}
	}

	_generateTwinTailTipCp(direction = RIGHT)
	{
		for (let i=0; i<=this.coordinates.hair.twin_tail.bunch; i++)
		{
			this.twin_tail_arrays.cp3[i] = {
				x: this.twin_tail_arrays.terminals[i].x 
					+direction * this.coordinates.hair.twin_tail.cp3.x 
					+rand(-30, 30)
					+direction * this.sp(
						this.twin_tail_arrays.terminals[i].x, 
						this.twin_tail_arrays.tips[i].x, 3/3),
				y: this.twin_tail_arrays.terminals[i].y 
					+this.coordinates.hair.twin_tail.cp3.y,
			};
			this.twin_tail_arrays.cp3sub[i] = {
				x: this.twin_tail_arrays.cp3[i].x 
					+direction * this.coordinates.hair.twin_tail.cp3.x 
					+direction * this.coordinates.hair.twin_tail.width,
				y: this.twin_tail_arrays.cp3[i].y 
					+this.coordinates.hair.twin_tail.cp3.y,
			};
			this.twin_tail_arrays.cp4[i] = {
				x: this.twin_tail_arrays.tips[i].x
					+rand(-30, 30)
					+direction * this.coordinates.hair.twin_tail.cp4.x,
				y: this.twin_tail_arrays.terminals[i].y
					+this.coordinates.hair.twin_tail.cp4.y
					+this.sp(
						this.twin_tail_arrays.terminals[i].y, 
						this.twin_tail_arrays.tips[i].y, 1/2),
			};
			this.twin_tail_arrays.cp4sub[i] = {
				x: this.twin_tail_arrays.cp4[i].x
					+direction * this.coordinates.hair.twin_tail.width
					+direction * this.coordinates.hair.twin_tail.cp4.x,
				y: this.twin_tail_arrays.cp4[i].y
					+this.coordinates.hair.twin_tail.cp4.y
			};
		}
	}
	_generateTwinTailTerminals(direction = RIGHT)// 引数で左右を指定
	{
		let terminal;
		let terminal_start;
		let terminal_end;
		if (direction === RIGHT)
		{
			terminal = this.twin_terminal_right;
			terminal_start = {
				x: terminal.x 
					+this._getTwinTerminalX(this._getTwinTerminalLean(direction), -10),
				y: terminal.y - 10,
			};
			terminal_end = {
				x: terminal.x 
					+this._getTwinTerminalX(this._getTwinTerminalLean(direction), 10),
				y: terminal.y + 10,
			};
		}
		else
		{
			terminal = this.twin_terminal_left;
			terminal_start = {
				x: terminal.x 
					-this._getTwinTerminalX(this._getTwinTerminalLean(direction), -10),
				y: terminal.y - 10,
			};
			terminal_end = {
				x: terminal.x 
					-this._getTwinTerminalX(this._getTwinTerminalLean(direction), 10),
				y: terminal.y + 10,
			};
		}
		let base = 40;
		let span = base / this.coordinates.hair.twin_tail.bunch;
		for (let i=0; i<=this.coordinates.hair.twin_tail.bunch; i++)
		{
			this.twin_tail_arrays.terminals[i] = {
				x: terminal_start.x 
					+direction * this._getTwinTerminalX(this._getTwinTerminalLean(direction), span*i),
				y: terminal_start.y + span*i,
			};
			this.twin_tail_arrays.cp1[i] = {
				x: this.twin_tail_arrays.roots[i].x 
					+direction * this.sp(
						this.twin_tail_arrays.roots[i].x, 
						this.twin_tail_arrays.terminals[i].x, 1/2),
				y: this.twin_tail_arrays.roots[i].y, 
			};
			if ( i<(this.coordinates.hair.twin_tail.bunch/2))
			{
				this.twin_tail_arrays.cp2[i] = {
					x: this.twin_tail_arrays.terminals[i].x,
					y: this.twin_tail_arrays.roots[i].y
						+this.sp(
							this.twin_tail_arrays.roots[i].y, 
							this.twin_tail_arrays.terminals[i].y, 1/2),
				};
			}
			else
			{
				this.twin_tail_arrays.cp2[i] = {
					x: this.twin_tail_arrays.terminals[i].x,
					y: this.twin_tail_arrays.roots[i].y
						-this.sp(
							this.twin_tail_arrays.roots[i].y, 
							this.twin_tail_arrays.terminals[i].y, 1/2),
				};
			}
			//this.fillR(this.twin_tail_arrays.terminals[i], "red");
		}
	}


	// 引数で左右を指定
	_getTwinTerminalLean(direction = RIGHT)
	{
		let a = this.top_of_head;
		let b;
		if (direction === RIGHT)
		{
			b = this.twin_terminal_right;
		}
		else
		{
			b = this.twin_terminal_left;
		}
		let p = {
			y: this.top_of_head.y,
		}
		let ac = Math.sqrt((b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y));
		
		let angleC = this.getAngleFrom3coordinates(
			this.top_of_head, 
			direction === RIGHT ? this.twin_terminal_right : this.twin_terminal_left , 
			this.nape
		);
		let angleA = this.getAngleFrom3coordinates(
			direction === RIGHT ? this.twin_terminal_right : this.twin_terminal_left , 
			this.top_of_head, 
			this.nape
		);
		let angle_acp = (180 - angleC)/2;
		let angle_pac = 90 - angleA;
		let angle_apc = 180 - angle_acp - angle_pac;
		let ap = Math.sin(this.getRad(angle_acp)) * ac / Math.sin(this.getRad(angle_apc));
		if (direction === RIGHT)
		{
			p.x = a.x + ap; // 左右対称にするために右は+して左はマイナス
		}
		else
		{
			p.x = a.x - ap;
		}
		let lean = (p.y - b.y) / (p.x - b.x);
		return lean * direction;
	}

	_getTwinTerminalY(lean, x)
	{
		// y = ax;
		// x = y/a;
		return x * lean;
	}
	_getTwinTerminalX(lean, y)
	{
		// y = ax;
		// x = y/a;
		return y / lean;
	}

	// 3点から角度を取得
	getAngleFrom3coordinates(v1, v2, v3)
	{ 
		// ベクトルa(a1, a2), ベクトルb(b1, b2)とする
		// ベクトルaとbの内積は
		// a1 * b1 + a2 * b2 = ||ベクトルa|| ||ベクトルb||cosθ
		// ||ベクトルa|| は絶対値に似てるがベクトルの大きさを表す

		let ba = {
			x: v1.x - v2.x,// 座標から成分を求める
			y: v1.y - v2.y,
		};
		let bc = {
			x: v3.x - v2.x,
			y: v3.y - v2.y,
		};

		let babc = ba.x * bc.x + ba.y * bc.y;// 内積
		let ban = (ba.x * ba.x) + (ba.y * ba.y);// 公式の通り2乗する
		let bcn = (bc.x * bc.x) + (bc.y * bc.y);// 公式の通り2乗する
		let radian = Math.acos(babc / (Math.sqrt/*平方根*/(ban * bcn)));
		let angle = radian * 180 / Math.PI;  // 結果（ラジアンから角度に変換）

		return angle;
	}

	getRad(angle)
	{
		return angle * (Math.PI / 180);
	}
	
	
	_generateTwinTailRoots()// 左右共通
	{
		let span = (this.nape.y - this.top_of_head.y) / this.coordinates.hair.twin_tail.bunch;
		for (let i=0; i<=this.coordinates.hair.twin_tail.bunch; i++)
		{
			this.twin_tail_arrays.roots[i] = {
				x: this.center.x,
				y: this.top_of_head.y + i*span,
			};
		}
	}

	_drawSideburnsLeft(hair_bunch)
	{
		/* 左サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.side_hair_roots[0].x, this.side_hair_roots[0].y);
		this._config(this.hair_color, this.hair_stroke_color);

		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(
				this.side_hair_roots[i], 
				this.side_hair_tips[i], 
				this.side_hair_cp1[i], 
				this.side_hair_cp2[i] 
			);

			if( i+1<hair_bunch)
			{
				this.drawCurve2(
					this.side_hair_tips[i+1], 
					this.side_hair_roots[i+1], 
					this.side_hair_cp2[i], 
					this.side_hair_cp1[i+1]
				);
			}
			else
			{
				this.drawCurve2(
					this.side_hair_tips[this.side_hair_tips.length -1], 
					this.forehead_left, 
					this.side_hair_cp2[this.side_hair_tips.length -1], 
					this.side_hair_cp1[this.side_hair_tips.length -1]);
			}
			this.con.stroke();
		}
		this.con.fill();
	}


	_drawSideburnsRight(hair_bunch)
	{
		/* 右サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.side_hair_roots[0].x, this.side_hair_roots[0].y);
		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(
				this.side_hair_roots[i], 
				this.side_hair_tips[i], 
				this.side_hair_cp1[i], 
				this.side_hair_cp2[i] 
			);
			this._config(this.hair_color, "#000");

			if( i+1<hair_bunch)
			{
				this.drawCurve2(
					this.side_hair_tips[i+1], 
					this.side_hair_roots[i+1], 
					this.side_hair_cp2[i], 
					this.side_hair_cp1[i+1]
				);
			}
			else
			{
				this.drawCurve2(
					this.side_hair_tips[this.side_hair_tips.length -1], // 毛先から
					this.cheek_end[0], // 頬の端まで
					this.side_hair_cp2[this.side_hair_tips.length -1], // 毛先のCP
					this.side_hair_cp1[this.side_hair_tips.length -1]); // 毛先のCP
			}
		}
	}



	_generateSideburnsRightCoordinates(hair_length, hair_bunch, span)
	{
		this._initializeSideHairArray();
		/* 右サイド髪の座標生成 */
		for (let i=0; i<=hair_bunch; i++)
		{
			this.side_hair_roots[i] = {
				x: this.forehead_right.x + i*span, 
				y: this.forehead_right.y 
					+this.generateSideburnsCoordinateRight(i*span)};
			this.side_hair_tips[i] = {
				x: this.forehead_right.x + i*span + rand(-60, 0), 
				y: this.cheek_end[0].y + rand(10, 20) + hair_length
			};
			this.side_hair_cp1[i] = {
				x: this.forehead_right.x + i*span/2 + rand(0, 10), 
				y: this.side_hair_roots[i].y 
					+this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 1/3)
			};
			this.side_hair_cp2[i] = {
				x: this.forehead_right.x + i*span/2 + rand(-10, 10), 
				y: this.side_hair_roots[i].y 
					+this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 2/3) 
			};
		}
	}



	// 左サイドの座標生成
	_generateSideHairStandardLeftCoordinates(hair_length, hair_bunch, span)
	{
			this._initializeSideHairArray();

			/* 左サイド髪の座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				this.side_hair_roots[i] = {
					x: this.temple_left.x + i*span, 
					y: this.temple_left.y 
						+this.generateSideburnsCoordinateLeft(i*span)
				};
				this.side_hair_tips[i] = {
					x: this.temple_left.x + i*span + span/2 + rand(-30, 0), 
					y: this.temple_left.y + rand(0, 20) + hair_length
				};
				this.side_hair_cp1[i] = {
					x: this.side_hair_tips[i].x + rand(-1, 1), 
					y: this.top_of_head.y 
				};
				this.side_hair_cp2[i] = {
					x: this.side_hair_tips[i].x + rand(-1, 1), 
					y: this.top_of_head.y + 100
				};
			}
	}
	_generateSideHairStandardRightCoordinates(hair_length, hair_bunch, span)
	{
		this._initializeSideHairArray();
		/* 右サイド髪の座標生成 */
		for (let i=0; i<=hair_bunch; i++)
		{
			this.side_hair_roots[i] = {
				x: this.forehead_right.x + i*span,
				y: this.forehead_right.y 
					+this.generateSideburnsCoordinateRight(i*span)
			};
			this.side_hair_tips[i] = {
				x: this.forehead_right.x + i*span +span/2 + rand(-60, 10), 
				y: this.cheek_end[0].y + rand(10, 20) + hair_length
			};
			this.side_hair_cp1[i] = {
				x: this.side_hair_roots[i].x + rand(-10, 10), 
				y: this.top_of_head.y};
			this.side_hair_cp2[i] = {
				x: this.side_hair_roots[i].x + rand(-10, 10), 
				y: this.top_of_head.y + 100 
			};
		}
	}
	_drawSideHairStandardLeft2(hair_bunch, arrays)
	{
		/* 左サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.top_of_head.x, this.top_of_head.y);
		this._config(this.hair_color, this.hair_stroke_color);

		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(
				this.top_of_head, 
				arrays.tips[i], 
				arrays.cp1[i], 
				arrays.cp2[i] 
			);

			if( i+1<hair_bunch)
			{
				this.drawCurve2(
					arrays.tips[i+1], 
					this.top_of_head, 
					arrays.cp2[i], 
					arrays.cp1[i+1]
				);
			}
			else
			{
				this.drawCurve2(
					arrays.tips[arrays.tips.length -1], 
					this.top_of_head, 
					arrays.cp2[arrays.tips.length -1], 
					arrays.cp1[arrays.tips.length -1]);
			}
			this.con.stroke();
		}
		this.con.fill();
	}

	_drawSideHairStandardRight(hair_bunch, arrays)
	{
		/* 右サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.top_of_head.x, this.top_of_head.y);
		this._config(this.hair_color, this.hair_stroke_color);

		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(
				this.top_of_head, 
				arrays.tips[i], 
				arrays.cp1[i], 
				arrays.cp2[i] 
			);

			if( i+1<hair_bunch)
			{
				this.drawCurve2(
					arrays.tips[i+1], 
					this.top_of_head, 
					arrays.cp2[i], 
					arrays.cp1[i+1]
				);
			}
			else
			{
				this.drawCurve2(
					arrays.tips[arrays.tips.length -1], 
					this.top_of_head, 
					arrays.cp2[arrays.tips.length -1], 
					arrays.cp1[arrays.tips.length -1]);
			}
			this.con.stroke();
		}
		this.con.fill();
	}

	_generateHairCoordinates2(arrays, start_coordinate, hair_length, hair_bunch, span, start_x, tip_span, cp1, cp2)
	{
		// 1. 配列をリセット
		this._initHairArrays(arrays);

		let hair_rand = rand(-10, 10);

		// 2. 髪の束の数ループ
		for (let i=0; i<=hair_bunch; i++)
		{
			// 3. 根元の座標
			// 根元はtop_of_headにすることが殆どなのでこの座標は直接は使わない
			arrays.roots[i] = {
				x: start_coordinate.x + i*span,
				y: start_coordinate.y};

			// 4. 毛先の座標
			arrays.tips[i] = {
				// x: 基準となる毛先の開始座標 + 任意の毛先の開始座標 + i * 任意のスパン + 髪の揺れ
				x: start_coordinate.x + start_x + i*tip_span + rand(-30, 0), 
				//y: start_coordinate.y + rand(10, 20) + hair_length};
				y: this.top_of_head.y + rand(10, 20) + hair_length
			};


			if (i< hair_bunch/2)
			{
				arrays.cp1[i] = {
					x: arrays.roots[i].x + hair_rand - cp1.x,
					y: this.top_of_head.y + cp1.y
				};
				arrays.cp2[i] = {
					x: arrays.roots[i].x + hair_rand - cp2.x,
					y: this.top_of_head.y + 100 + cp2.y
				};
			}
			else
			{
				arrays.cp1[i] = {
					x: arrays.roots[i].x + hair_rand + cp1.x,
					y: this.top_of_head.y + cp1.y
				};
				arrays.cp2[i] = {
					x: arrays.roots[i].x + hair_rand + cp2.x,
					y: this.top_of_head.y + 100 + cp2.y
				};
			}
		}
	}
	_generateHairCoordinates(arrays, start_coordinate, hair_length, hair_bunch, span)
	{
		// 1. 配列をリセット
		this._initHairArrays(arrays);

		// 2. 髪の束の数ループ
		for (let i=0; i<=hair_bunch; i++)
		{
			// 3. 根元の座標
			// 根元はtop_of_headにすることが殆どなのでこの座標は直接は使わない
			arrays.roots[i] = {
				x: start_coordinate.x + i*span,
				y: start_coordinate.y
			};

			// 4. 毛先の座標
			// 基準となる固定の座標にiの回数分任意のスパンを足していく
			arrays.tips[i] = {
				x: start_coordinate.x + i*span +span/2 + rand(-60, 10), 
				y: start_coordinate.y + rand(10, 20) + hair_length
			};

			// 5. CP1の座標定義
			// 根元の配列を基準にしている
			// y座標は固定
			arrays.cp1[i] = {
				x: arrays.roots[i].x + rand(-10, 10),
				y: this.top_of_head.y
			};

			// 6. CP2の座標定義
			// 根元の配列を基準にしている
			// y座標は固定
			arrays.cp2[i] = {
				x: arrays.roots[i].x + rand(-10, 10),
				y: this.top_of_head.y + 100 
			};
		}
	}

	
	drawSideburns(coordinates)
	{
		let left_span = Math.floor(Math.abs(this.temple_left.x - this.forehead_left.x)/coordinates.left.bunch);
		let right_span = Math.floor(Math.abs(this.temple_left.x - this.forehead_left.x)/coordinates.right.bunch);

		/* サイクル */
		for (let j=0; j<4; j++)
		{
			this._generateSideburnsLeftCoordinates(
				coordinates.left.length, 
				coordinates.left.bunch, left_span
			);
			this._drawSideburnsLeft(coordinates.left.bunch);
			this._generateSideburnsRightCoordinates(
				coordinates.right.length, 
				coordinates.right.bunch, right_span
			);
			this._drawSideburnsRight(coordinates.right.bunch);
			this.con.stroke();
			this.con.fill();
		}
	}

	drawSideHairStandard(side_coordinates, arrays, start_left_coordinate, start_right_coordinate)
	{
		let left_span = Math.floor(Math.abs(this.temple_left.x - this.forehead_left.x)/side_coordinates.left.bunch);
		let right_span = Math.floor(Math.abs(this.temple_left.x - this.forehead_left.x)/side_coordinates.right.bunch);

		/* サイクル */
		for (let j=0; j<2; j++)
		{
			this._generateHairCoordinates(
				arrays, 
				start_left_coordinate, 
				side_coordinates.left.length, 
				side_coordinates.left.bunch, left_span
			);
			this._drawSideHairStandardLeft2(side_coordinates.left.bunch, arrays);
			this._generateHairCoordinates(
				arrays, 
				start_right_coordinate, 
				side_coordinates.right.length, 
				side_coordinates.right.bunch, 
				right_span
			);
			this._drawSideHairStandardRight(side_coordinates.right.bunch, arrays);
			this.con.stroke();
			this.con.fill();
		}
	}



	drawBackHairStandard(hair_bunch, hair_length)
	{
		let span = Math.floor((this.temple_right.x - this.temple_left.x)/hair_bunch);

		for (let j=0; j<=1; j++)
		{
			let span2 = j*span/3;// jが複数ある場合少しずつずらすための変数

			this._generateHairCoordinates2(
				this.back_hair_arrays, 
				this.temple_left, 
				hair_length, 
				hair_bunch, 
				span, 
				this.coordinates.hair.back.tips, 
				this.coordinates.hair.back.tip_span,
				this.coordinates.hair.back.cp1,
				this.coordinates.hair.back.cp2);

			this._drawStandardHair(this.back_hair_arrays, hair_bunch, this.hair_color);
		}
	}
	drawFrontHairStandard(hair_bunch, hair_length)
	{
		let span = Math.floor((this.temple_right.x - this.temple_left.x)/hair_bunch);

		for (let j=0; j<=1; j++)
		{
			let span2 = j*span/3;// jが複数ある場合少しずつずらすための変数

			this._generateHairCoordinates2(
				this.front_hair_arrays, 
				this.temple_left, 
				hair_length, 
				hair_bunch, 
				span, 
				this.coordinates.hair.front.tips, 
				this.coordinates.hair.front.tip_span,
				this.coordinates.hair.front.cp1,
				this.coordinates.hair.front.cp2);

			this._drawStandardHair(this.front_hair_arrays, hair_bunch, this.hair_color, true);
		}
	}

	_drawStandardHair(hair_arrays, hair_bunch, hair_color, shadow = false, strokeStyle = this.hair_stroke_color, globalAlpha = 1)
	{
		if (shadow)
		{
			this.con.save();
			//this.con.translate(3, 10);
			this.con.scale(1, 1.05);
			this.con.beginPath();
			this.con.moveTo(this.top_of_head.x, this.top_of_head.y);
			this._drawStandardHairSub(hair_bunch, hair_arrays, true);
			this.con.restore();
			this._config("#000", "#000", 0.2);
			this.con.fill();
		}

		this._config(hair_color, strokeStyle, globalAlpha);
		this.con.beginPath();
		this.con.moveTo(this.top_of_head.x, this.top_of_head.y);
		this._drawStandardHairSub(hair_bunch, hair_arrays);
		this.con.globalAlpha = 1;
	}

	_drawStandardHairSub(hair_bunch, hair_arrays, shadow = false)
	{
		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(
				this.top_of_head, 
				hair_arrays.tips[i], 
				hair_arrays.cp1[i], 
				hair_arrays.cp2[i]);

			if( i+1<hair_bunch)
			{
				this.drawCurve2(
					hair_arrays.tips[i+1], 
					this.top_of_head,
					hair_arrays.cp2[i+1], 
					hair_arrays.cp1[i+1]);
			}
			else
			{
				this.drawCurve2(
					hair_arrays.tips[hair_arrays.tips.length -1], 
					this.top_of_head,
					hair_arrays.cp2[hair_arrays.tips.length -1], 
					hair_arrays.cp1[hair_arrays.tips.length -1]);
			}
			if (shadow === false)
			{
				this.con.stroke();
				this.con.fill();
			}
		}
	}



	drawFrontPrincessCut(hair_bunch, hair_length)
	{
		// 配列初期化
		this._initFrontHairArrays();

		let hair_length_plus = 0;

		/* 前髪の間隔 */
		let span = Math.floor((this.temple_right.x - this.temple_left.x)/hair_bunch);

		for (let j=0; j<=1; j++)
		{
			/* 座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				// 配列初期化

				let hair_rand = rand(-6, 6);

				if (i < hair_bunch/2)
				{
					hair_length_plus += 2;
				}
				else if ( i===Math.floor(hair_bunch/2))
				{
				}
				else
				{
					hair_length_plus -= 2;
				}

				if (i === 0 )// 最初
				{
					this.front_hair_roots[i] = {// 根本の座標
						x: this.temple_left.x + i*span,
						y: this.temple_right.y};

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						x: this.temple_left.x 
							+i*this.coordinates.hair.front.tip_span 
							+this.coordinates.hair.front.tips + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y 
							+hair_length + hair_length_plus
					};
				}
				else if (i===hair_bunch)// 最後
				{
					this.front_hair_roots[i] = {// 根本の座標
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.temple_right.x,
						y: this.temple_right.y};

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						//x: this.temple_right.x + rand(-5, 5), // 毛先のx座標は根本の座標から前後に揺らす
						x: this.temple_left.x 
							+i*this.coordinates.hair.front.tip_span 
							// 毛先のx座標は根本の座標から前後に揺らす
							+this.coordinates.hair.front.tips + rand(-10, 10), 
						y: this.forehead_right.y + hair_length + hair_length_plus
					};
				}
				else// 間
				{
					this.front_hair_roots[i] = {
						x: this.temple_left.x + i*span, 
						y: this.temple_right.y + rand(0,20)
					};// 毛先の高さは少し乱数を足す

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						//x: this.temple_left.x + i*span -10 + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						x: this.temple_left.x 
							+i*this.coordinates.hair.front.tip_span 
							+this.coordinates.hair.front.tips + rand(-10, 10), 
						// 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y + hair_length + hair_length_plus
					};
				}

				// 制御点1
				this.front_hair_cp1[i] = {
					x: this.temple_left.x +i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
					y: this.top_of_head.y
				};
				// 制御点2
				this.front_hair_cp2[i] = {
					x: this.temple_left.x + i*span + hair_rand, 
					//y: this.top_of_head.y + this.sp(this.top_of_head.y, this.front_hair_tips[i].y, 2/4) 
					y: this.top_of_head.y + 100 
				};

			}

			/* 影 */
			this.con.save();
			this.con.translate(3, 0);
			this.con.scale(1, 1.05);

			/* パスを開始 */
			this.con.beginPath();
			/* 開始座標を指定 */
			this.con.moveTo(this.top_of_head.x, this.top_of_head.y);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(
					this.top_of_head, 
					this.front_hair_tips[i], 
					this.front_hair_cp1[i], 
					this.front_hair_cp2[i]
				);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(
						this.front_hair_tips[i+1].x -10, 
						this.front_hair_tips[i+1].y
					);// 毛先1から毛先2までラインを引く
					this.drawCurve2(
						this.front_hair_tips[i+1], 
						this.top_of_head, 
						this.front_hair_cp2[i+1], 
						this.front_hair_cp1[i+1]);
				}
				else
				{
					this.con.lineTo(
						this.front_hair_tips[this.front_hair_tips.length -1].x -10, 
						this.front_hair_tips[this.front_hair_tips.length -1].y
					);
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.top_of_head, 
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]);
				}
			}
			this.con.restore();
			/* config */
			this._config("#000", "#000", 0.4);

			this.con.fill();// 影を描画

			this._config(this.hair_color, "#000");

			this.con.beginPath();
			this.con.moveTo(this.top_of_head.x, this.top_of_head.y);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(
					this.top_of_head, 
					this.front_hair_tips[i], 
					this.front_hair_cp1[i], 
					this.front_hair_cp2[i]
				);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(
						this.front_hair_tips[i+1].x -10, 
						this.front_hair_tips[i+1].y
					);// 毛先1から毛先2までラインを引く
					this.drawCurve2(
						this.front_hair_tips[i+1], 
						this.top_of_head, 
						this.front_hair_cp2[i+1], 
						this.front_hair_cp1[i+1]);
				}
				else
				{
					this.con.lineTo(
						this.front_hair_tips[this.front_hair_tips.length -1].x -10, 
						this.front_hair_tips[this.front_hair_tips.length -1].y
					);
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.top_of_head, 
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]
					);
				}
				this.con.stroke();
			}
			this.con.fill();
		}
		this.con.globalAlpha = 1;
	}



	generateSideburnsCoordinateRight(x)
	{
		return Math.floor(x * (this.forehead_right.y - this.cheek_end[0].y) / (this.forehead_right.x - this.cheek_end[0].x)); 
	}
	generateSideburnsCoordinateLeft(x)
	{
		return Math.floor(x * (this.forehead_left.y - this.cheek_end[1].y) / (this.forehead_left.x - this.cheek_end[1].x));
	}


	drawSkinHead()
	{
		this._config(this.hair_color, this.hair_color, 1, 1);
		this.con.beginPath();
		this.drawCurve2(
			this.temple_right, 
			this.temple_left, 
			this.head_cp1, 
			this.head_cp2, true 
		);
		this.lineTo(this.forehead_left);
		this.drawCurve(
			this.forehead_left, 
			this.forehead_right, 
			this.top_of_head 
		);
		this.lineTo(this.temple_right);
		this.con.fill();
	}


	drawRengeLowerEyelid()
	{
		this._config("#fee", "#f00");
		this.con.beginPath();
		this.drawCurve2(
			this.renge_eye_end[1], 
			this.renge_eye_head[1], 
			this.renge_lower_eyelid_cp2[1], 
			this.renge_lower_eyelid_cp1[1], true);
		this.lineTo(this.renge_eye_head[0]);
		this.drawCurve2(
			this.renge_eye_head[0], 
			this.renge_eye_end[0], 
			this.renge_lower_eyelid_cp1[0], 
			this.renge_lower_eyelid_cp2[0]);
		this.lineTo(this.cheek_end[0]);
		this.drawCurve2(
			this.temple_right, 
			this.chin_end, 
			this.cheek_cp2[0], 
			this.cheek_cp1[0] 
		);
		this.drawCurve2(
			this.chin_end, 
			this.chin_start, 
			this.chin_cp2, 
			this.chin_cp1 
		);
		this.drawCurve2(
			this.chin_start, 
			this.temple_left, 
			this.cheek_cp1[1], 
			this.cheek_cp2[1] 
		);
		this.lineTo(this.renge_eye_end[1]);
		this.con.fill();
	}
	drawLowerEyelid()
	{
		this._config("#fee", "#ff0");
		this.con.beginPath();
		this.moveTo(this.upper_eyeline_end[1]);
		this.lineTo(this.eye_end[1]);
		this.drawCurve(
			this.eye_end[1], 
			this.eyelid_bottom[1], 
			this.eyelid_bottom_cp3[1] 
		);
		this.drawCurve(
			this.eyelid_bottom[1], 
			this.eye_head[1], 
			this.eyelid_bottom_cp1[1] 
		);
		this.lineTo(this.eye_head[0]);
		this.drawCurve(
			this.eye_head[0], 
			this.eyelid_bottom[0], 
			this.eyelid_bottom_cp1[0] 
		);
		this.drawCurve(
			this.eyelid_bottom[0], 
			this.eye_end[0], 
			this.eyelid_bottom_cp3[0] 
		);
		this.lineTo(this.upper_eyeline_end[0]);
		this.lineTo(this.temple_right);
		this.drawCurve2(
			this.temple_right, 
			this.chin_end, 
			this.cheek_cp2[0], 
			this.cheek_cp1[0] 
		);
		this.drawCurve2(
			this.chin_end, 
			this.chin_start, 
			this.chin_cp2, 
			this.chin_cp1
		);
		this.drawCurve2(
			this.chin_start, 
			this.temple_left, 
			this.cheek_cp1[1], 
			this.cheek_cp2[1] 
		);
		this.lineTo(this.upper_eyeline_end[1]);
		this.con.fill();
	}

	drawEyelashes(number = 3)
	{
		let split = 10;
		let span = Math.floor(Math.abs(this.eyelash_end[0].x - this.eye_head[0].x, )/ split);
		let cp_span = Math.floor(Math.abs(this.eyelash_end[0].x - this.eyelash_cp[0].x ));

		for (let i=0; i<2; i++)
		{
			this._config(this.hair_color, "#f00");
			this.con.beginPath();
			this.drawCurve2(
				this.eyelash_start[i], 
				this.eyelash_end[i], 
				this.eyelash_cp1[i], 
				this.eyelash_cp2[i], true
			);
			this.drawCurve(
				this.eyelash_end[i], 
				this.upper_eyeline_end2[i], 
				this.eyelash_cp[i]
			);
			this.con.closePath();
			this.con.fill();
		}
	}


	drawEyeblow()
	{
		for (let i=0; i<2; i++)
		{
			this._config(this.hair_color, "#555");
			this.con.beginPath();
			this.drawCurve2(
				this.eyeblow_start[i], 
				this.eyeblow_end[i], 
				this.eyeblow_upper_cp1[i], 
				this.eyeblow_upper_cp2[i], true 
			);
			this.drawCurve2(
				this.eyeblow_end[i], 
				this.eyeblow_start[i], 
				this.eyeblow_lower_cp2[i], 
				this.eyeblow_lower_cp1[i] 
			);
			this.con.fill();
			this.con.stroke();
		}
	}




	/* 二重 */
	drawEyeline2()
	{
		for (let i=0; i<2; i++)
		{
			this._config("#888", "#888");
			this.con.beginPath();
			this.drawCurve2(
				this.upper_eyeline_start2[i], 
				this.upper_eyeline_end2[i], 
				this.eyeline2_cp1[i], 
				this.eyeline2_cp2[i], true
			);
			this.drawCurve2(
				this.upper_eyeline_end2[i], 
				this.upper_eyeline_start2[i], 
				this.eyeline2_cp4[i], 
				this.eyeline2_cp3[i], false
			);
			this.con.stroke();
			this.con.fill();
		}
	}

	drawRengeEyelid()
	{
		this._config("#fee", "#f00");
		this.con.beginPath();
		this.drawCurve2(
			this.renge_upper_eyelash_end[1], 
			this.renge_upper_eyelash_start[1], 
			this.renge_upper_eyelash_cp2[1], 
			this.renge_upper_eyelash_cp1[1], true);
		this.lineTo(this.renge_upper_eyelash_start[0]);
		this.drawCurve2(
			this.renge_upper_eyelash_start[0], 
			this.renge_upper_eyelash_end[0], 
			this.renge_upper_eyelash_cp1[0], 
			this.renge_upper_eyelash_cp2[0]);
		this.lineTo(this.cheek_end[0]);
		this.drawCurve2(
			this.cheek_end[0], 
			this.cheek_end[1], 
			this.head_cp1, 
			this.head_cp2 
		);
		this.lineTo(this.renge_upper_eyelash_end[1]);
		this.con.fill();
	}
	drawEyelid()
	{
		this._config("#fee", "#000");
		this.con.beginPath();
		this.drawCurve2(
			this.upper_eyeline_end[1], 
			this.eye_head[1], 
			this.upper_eyeline_cp2[1], 
			this.upper_eyeline_cp1[1], true
		);
		this.lineTo(this.eye_head[0]);
		this.drawCurve2(
			this.eye_head[0], 
			this.upper_eyeline_end[0], 
			this.upper_eyeline_cp1[0], 
			this.upper_eyeline_cp2[0]
		);
		this.lineTo(this.temple_right);
		this.drawCurve2(
			this.cheek_end[0], 
			this.cheek_end[1], 
			this.head_cp1, 
			this.head_cp2 
		);
		this.lineTo(this.upper_eyeline_end[1]);
		this.con.fill();
	}


	drawRengeWhiteEyes()
	{
		for (let i=0; i<2; i++)
		{
			this._config("#fff", "#000");
			this.con.beginPath();
			this.drawCurve2(
				this.renge_eye_head[i], 
				this.renge_eye_end[i], 
				this.renge_upper_eyelid_cp1[i], 
				this.renge_upper_eyelid_cp2[i], true
			);
			this.drawCurve2(
				this.renge_eye_end[i], 
				this.renge_eye_head[i], 
				this.renge_lower_eyelid_cp2[i], 
				this.renge_lower_eyelid_cp1[i], true
			);
			this.con.fill();
		}
	}
	drawRengeEyes()
	{
		for (let i=0; i<2; i++)
		{
			this._config("#000", "#000");
			this.con.beginPath();
			this.drawCurve2(
				this.renge_eye_head[i], 
				this.renge_eye_end[i], 
				this.renge_upper_eyelid_cp1[i], 
				this.renge_upper_eyelid_cp2[i], true
			);
			this.lineTo(this.renge_upper_eyelash_end[i]);
			this.drawCurve2(
				this.renge_upper_eyelash_end[i], 
				this.renge_upper_eyelash_start[i], 
				this.renge_upper_eyelash_cp2[i], 
				this.renge_upper_eyelash_cp1[i]
			);
			this.con.fill();
		}
	}



	drawEyes()
	{
		this._drawIris();
		this._drawEyeline();
	}
	_drawIris()
	{
		let eye_position_rand = rand(-1,1);

		let eye_scale = this.coordinates.eye.scale;
		let eye_highlight_scale = 1.5;
		let pn;
		
		for (let i=0; i<2; i++)
		{
			if (i ===0)
			{
				pn = 1;
			}
			else
			{
				pn = -1;
			}

			/* 虹彩 */
			this._config(this.iris_color, "#000", 0.9, 4);

			/* 瞳の円1 */
			this.con.save();
			this.con.translate(0, -(this.center.y * eye_scale - this.center.y));
			this.con.scale(1, eye_scale);
			this.con.beginPath();
			this.con.arc(
				this.eye_head[i].x + this.coordinates.eye.position.x * pn, this.center.y + this.coordinates.eye.position.y, 
				this.coordinates.eye.size,  
				Math.PI * 2, false);
			this.con.restore();
			this.con.fill();
			this.con.stroke();

			/* 瞳孔の縁 */
			this.con.save();
			this.con.translate(0, -(this.center.y*eye_scale - this.center.y));
			this.con.scale(1, eye_scale);
			this.con.beginPath();
			this.con.arc(
				this.eye_head[i].x +this.coordinates.eye.position.x * pn,
				this.center.y + this.coordinates.eye.position.y, 
				10,  
				Math.PI * 2, false);
			this.con.restore();
			this._config("#fff", "#fff", 0.2);
			this.con.fill();

			/* 虹彩の中の光 */
			this.con.save();
			this.con.translate(0, -(this.center.y*eye_scale - this.center.y));
			this.con.scale(1, eye_scale);
			this.con.beginPath();
			this.con.arc(
				this.eye_head[i].x + this.coordinates.eye.position.x * pn,
				this.center.y + this.coordinates.eye.position.y +14, 
				20,  
				Math.PI * 2, false);
			this.con.restore();
			this._config("#fff", "#fff", 0.4);
			this.con.fill();

			this._config("#000", "#000", 1);

			/* 瞳孔 */
			this.con.save();
			this.con.translate(0, -(this.center.y*eye_scale - this.center.y));
			this.con.scale(1, eye_scale);
			this.con.beginPath();
			this.con.arc(
				this.eye_head[i].x + this.coordinates.eye.position.x * pn,
				this.center.y + this.coordinates.eye.position.y, 
				7,  
				Math.PI * 2, false);
			this.con.restore();
			this.con.fill();

			this._config("#fff", "#fff");
			/* 瞳の反射 */
			this.con.save();
			this.con.translate(0, -(this.center.y*eye_highlight_scale - this.center.y));
			this.con.scale(1, eye_highlight_scale);
			this.con.beginPath();

			this.con.arc(
				this.eye_head[i].x 
				+this.coordinates.eye.position.x*pn +10 +eye_position_rand , 
				this.center.y -10, 
				5,  
				Math.PI * 2, false);

			this.con.arc(
				this.eye_head[i].x 
				+this.coordinates.eye.position.x*pn +2 + eye_position_rand, 
				this.center.y -5, 
				2, 
				Math.PI * 2, false);
			this.con.restore();
			this.con.fill();


			this._config("#fff", "#fff", 0.8);
			/* 瞳の反射 */
			this.con.save();
			this.con.translate(0, -(this.center.y*eye_highlight_scale - this.center.y));
			this.con.scale(1, eye_highlight_scale);
			this.con.beginPath();

			this.con.arc(
				this.eye_head[i].x 
				+this.coordinates.eye.position.x*pn -10 + eye_position_rand , 
				this.center.y +10, 
				4,  
				Math.PI * 2, false);

			this.con.arc(
				this.eye_head[i].x 
				+this.coordinates.eye.position.x*pn -2 + eye_position_rand, 
				this.center.y +12, 
				0, 
				Math.PI * 2, false);
			this.con.restore();
			this.con.fill();
			this.con.globalAlpha = 1;
		}
	}
	_drawEyeline()
	{
		// 左右の座標は既に用意してある
		// 配列で管理しているのでループのインデックス番号を合わせて回す
		this.drawEyeShadow();
		for (let i=0; i<2; i++)
		{
			this._config(this.hair_color, "#000");
			this.con.beginPath();
			this.drawCurve2(
				this.eye_head[i], 
				this.upper_eyeline_end[i], 
				this.upper_eyeline_cp1[i], 
				this.upper_eyeline_cp2[i], true
			);
			this.con.lineTo(this.eye_end[i].x,this.eye_end[i].y);
			this.drawCurve2(
				this.eye_end[i], 
				this.eye_head[i], 
				this.lower_eyeline_cp2[i], 
				this.lower_eyeline_cp1[i]
			);
			this.con.stroke();
			this.con.fill();
		}
	}








	drawEyeShadow()
	{
		for (let i=0; i<2; i++)
		{
			this.con.beginPath();
			this.drawCurve2(
				this.eye_head[i], 
				this.upper_eyeline_end[i], 
				this.upper_eyeline_cp1[i], 
				this.upper_eyeline_cp2[i], true
			);
			this.con.lineTo(this.eye_shadow_end[i].x, this.eye_shadow_end[i].y);
			this.drawCurve2(
				this.eye_shadow_end[i], 
				this.eye_shadow_start[i], 
				this.eye_shadow_cp2[i], 
				this.eye_shadow_cp1[i]
			);
			this._config("#000", "#f00", 0.3);
			this.con.fill();
			this.con.globalAlpha = 1;
		}
	}




	/*
	 * 後ろ髪のサイド
	 */
	drawOutsideBackHair(hair_bunch, hair_length)
	{
		/* 髪の束の間隔 */
		let span = Math.abs(this.temple_left.x - this.outside_back_hair_left.x)/hair_bunch;

		// この関数のメインループ
		for (let j=0; j<1; j++)
		{
			this._initOutsideBackHairArrays();


			// 左サイド髪の座標生成
			for (let i=0; i<=hair_bunch; i++)
			{
				this.outside_back_hair_roots[i] = {
					x: this.outside_back_hair_left.x + i*span,
					y: this.outside_back_hair_left.y 
				};
				this.outside_back_hair_tips[i] = {
					x: this.outside_back_hair_left.x + i*span + rand(-60, 0),
					y: this.outside_back_hair_left.y + rand(0, 20) + hair_length
				};
				this.outside_back_hair_cp1[i] = {
					x: this.outside_back_hair_left.x + i*span/2 + rand(-5, 5), 
					y: this.outside_back_hair_roots[i].y 
						+this.sp(this.outside_back_hair_roots[i].y, this.outside_back_hair_tips[i].y, 1/3)
				};
				this.outside_back_hair_cp2[i] = {
					x: this.outside_back_hair_left.x + i*span/2 + rand(-1, 1), 
					y: this.outside_back_hair_roots[i].y 
						+this.sp(this.outside_back_hair_roots[i].y, 
							this.outside_back_hair_tips[i].y, 2/3) 
				};
			}

			this._config(this.hair_color, "#000");

			this.con.beginPath();
			this.moveTo(this.outside_back_hair_roots[0]);

			for (let i=0; i<hair_bunch; i++)
			{
				// まず根本から毛先まで下ろす
				this.drawCurve2(
					this.outside_back_hair_roots[i], 
					this.outside_back_hair_tips[i], 
					this.outside_back_hair_cp1[i], 
					this.outside_back_hair_cp2[i] 
				);

				// 配列の最後の一つ前まで
				if( i+1<hair_bunch)
				{
					// 毛先から根本に向かってカーブを引く
					this.drawCurve2(
						this.outside_back_hair_tips[i+1], 
						this.outside_back_hair_roots[i+1], 
						this.outside_back_hair_cp2[i], 
						this.outside_back_hair_cp1[i+1]
					);
				}
				// 配列の最後
				else
				{
					// 配列の最後は
					this.drawCurve2(
						this.outside_back_hair_tips[this.outside_back_hair_tips.length -1], 
						this.temple_left, 
						this.outside_back_hair_cp2[this.outside_back_hair_tips.length -1], 
						this.outside_back_hair_cp1[this.outside_back_hair_tips.length -1]
					);
				}
			}

			this._initOutsideBackHairArrays();


			for (let i=0; i<=hair_bunch; i++)
			{
				this.outside_back_hair_roots[i] = {
					x: this.temple_right.x + i*span, 
					y: this.temple_right.y 
				};
				this.outside_back_hair_tips[i] = {
					x: this.temple_right.x + i*span + rand(-60, 0), 
					y: this.temple_right.y + rand(10, 20) + hair_length
				};
				this.outside_back_hair_cp1[i] = {
					x: this.temple_right.x + i*span/2 + rand(0, 10), 
					y: this.outside_back_hair_roots[i].y 
						+this.sp(
							this.outside_back_hair_roots[i].y, 
							this.outside_back_hair_tips[i].y, 1/3)
				};
				this.outside_back_hair_cp2[i] = {
					x: this.temple_right.x + i*span/2 + rand(-10, 10), 
					y: this.outside_back_hair_roots[i].y 
						+this.sp(this.outside_back_hair_roots[i].y, 
							this.outside_back_hair_tips[i].y, 2/3) 
				};
			}

			this.lineTo(this.outside_back_hair_roots[0]);

			for (let i=0; i<hair_bunch; i++)
			{
				this.drawCurve2(
					this.outside_back_hair_roots[i], 
					this.outside_back_hair_tips[i], 
					this.outside_back_hair_cp1[i], 
					this.outside_back_hair_cp2[i] 
				);



				if( i+1<hair_bunch)
				{
					this.drawCurve2(
						this.outside_back_hair_tips[i+1], 
						this.outside_back_hair_roots[i+1], 
						this.outside_back_hair_cp2[i], 
						this.outside_back_hair_cp1[i+1]);
				}
				else
				{
					this.drawCurve2(
						this.outside_back_hair_tips[this.outside_back_hair_tips.length -1],
						this.outside_back_hair_right, // 右の後ろ髪の外側
						this.outside_back_hair_cp2[this.outside_back_hair_tips.length -1],
						this.outside_back_hair_cp1[this.outside_back_hair_tips.length -1]
					);
				}
			}
			this.drawCurve2(
				this.outside_back_hair_right, // 毛先から
				this.outside_back_hair_left, // 右の後ろ髪の外側
				this.outside_back_head_cp1, // 毛先のCP
				this.outside_back_head_cp2); // 毛先のCP

			this._config(this.hair_color, "#000");
			this.con.stroke();
			this.con.fill();
		}// forループ終わり
	}// drawOutsideBackHair


	drawBackHair(hair_bunch, hair_length) 
	{
		this._initBackHairArrays();

		/* 前髪の間隔 */
		let span = (this.temple_right.x - this.temple_left.x)/hair_bunch;

		for (let j=0; j<=2; j++)
		{
			let hair_length_plus = 0;

			/* 座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				let hair_rand = rand(-6, 6);


				// 毛先に傾きをつける処理
				if (i <hair_bunch/2)
				{
					// 毛束の半分以下は少しづつ増やし
					hair_length_plus += 5;
				}
				else if ( i===Math.floor(hair_bunch/2))
				{
					// 真ん中は何もしない
				}
				else
				{
					// 毛束の半分以上は少しずつ減らす
					hair_length_plus -= 5;
				}


				// 根本の座標
				if (i === 0 )// 最初
				{
					this.back_hair_roots[i] = {// 根本の座標
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.temple_left.x + i*span,
						y: this.temple_left.y};

					// 毛先の座標生成
					this.back_hair_tips[i] = {
						x: this.temple_left.x + i*span + rand(-60, 1), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.temple_left.y + hair_length + hair_length_plus
					};
				}
				else if (i===hair_bunch)// 最後
				{
					this.back_hair_roots[i] = {// 根本の座標
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.temple_left.x,
						y: this.temple_left.y
					};

					// 毛先の座標生成
					this.back_hair_tips[i] = {
						x: this.temple_right.x + rand(-60, 2), 
						y: this.temple_left.y + hair_length + hair_length_plus
					};

				}
				else// 間
				{
					this.back_hair_roots[i] = {
						x: this.temple_left.x + i*span, 
						y: this.temple_left.y + rand(-10,20)
					};

					this.back_hair_tips[i] = {
						x: this.temple_left.x + i*span + rand(-10, 10), 
						y: this.temple_left.y + hair_length + hair_length_plus
					};
				}

				this.back_hair_cp1[i] = {
					x: this.temple_left.x + i*span + hair_rand,
					y: this.back_hair_roots[i].y 
						+this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 1/4)
				};
				this.back_hair_cp2[i] = {
					x: this.temple_left.x + i*span + hair_rand, 
					y: this.back_hair_roots[i].y 
						+this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 2/4) 
				};
			}


			this._config(this.hair_color, this.hair_stroke_color, 0.4);

			this.con.beginPath();
			this.moveTo(this.back_hair_roots[0]);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(
					this.back_hair_roots[i], 
					this.back_hair_tips[i], 
					this.back_hair_cp1[i], 
					this.back_hair_cp2[i]
				);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(
						this.back_hair_tips[i+1].x -10, 
						this.back_hair_tips[i+1].y
					);

					this.drawCurve2(
						this.back_hair_tips[i+1], 
						this.back_hair_roots[i+1], 
						this.back_hair_cp2[i+1], 
						this.back_hair_cp1[i+1]
					);
				}
				else
				{
					this.con.lineTo(
						this.back_hair_tips[this.back_hair_tips.length -1].x +10, 
						this.back_hair_tips[this.back_hair_tips.length -1].y);
					this.drawCurve2(
						this.back_hair_tips[this.back_hair_tips.length -1], 
						this.temple_right, 
						this.back_hair_cp2[this.back_hair_tips.length -1], 
						this.back_hair_cp1[this.back_hair_tips.length -1]);
				}
				this.con.stroke();
			}
			this.con.fill();
			this.con.fillStyle = "#000";
			this.con.fill();
		}
		this.con.globalAlpha = 1;
	}// 閉じ括弧



	drawBackHair2(hair_bunch, hair_length) 
	{
		this._initBackHairArrays();

		/* 前髪の間隔 */
		let span = (this.temple_right.x - this.temple_left.x)/hair_bunch;

		for (let j=0; j<=2; j++)
		{
			let hair_length_plus = 0;

			/* 座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				let hair_rand = rand(-6, 6);


				// 毛先に傾きをつける処理
				if (i <hair_bunch/2)
				{
					// 毛束の半分以下は少しづつ増やし
					hair_length_plus += 5;
				}
				else if ( i===Math.floor(hair_bunch/2))
				{
					// 真ん中は何もしない
				}
				else
				{
					// 毛束の半分以上は少しずつ減らす
					hair_length_plus -= 5;
				}


				// 根本の座標
				if (i === 0 )// 最初
				{
					this.back_hair_roots[i] = {
						x: this.temple_left.x + i*span,
						y: this.temple_left.y
					};

					// 毛先の座標生成
					this.back_hair_tips[i] = {
						x: this.temple_left.x + i*span +span/2 + rand(-60, 1),
						y: this.temple_left.y + hair_length + hair_length_plus
					};
				}
				else if (i===hair_bunch)// 最後
				{
					this.back_hair_roots[i] = {
						x: this.temple_left.x,
						y: this.temple_left.y
					};

					this.back_hair_tips[i] = {
						x: this.temple_right.x +span/2 + rand(-60, 2),
						y: this.temple_left.y + hair_length + hair_length_plus
					};
				}
				else// 間
				{
					this.back_hair_roots[i] = {
						x: this.temple_left.x + i*span, 
						y: this.temple_left.y + rand(-10,20)
					};

					this.back_hair_tips[i] = {
						x: this.temple_left.x + i*span +span/2  + rand(-60, 10),
						y: this.temple_left.y + hair_length + hair_length_plus
					};
				}

				this.back_hair_cp1[i] = {
					x: this.temple_left.x + i*span + hair_rand,
					y: this.back_hair_roots[i].y 
						+this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 1/4)
				};
				this.back_hair_cp2[i] = {
					x: this.temple_left.x + i*span + hair_rand, 
					y: this.back_hair_roots[i].y 
						+this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 2/4) 
				};
			}


			this._config(this.hair_color, "#000", 0.4);

			this.con.beginPath();
			this.moveTo(this.back_hair_roots[0]);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(
					this.back_hair_roots[i], 
					this.back_hair_tips[i], 
					this.back_hair_cp1[i], 
					this.back_hair_cp2[i]
				);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.drawCurve2(
						this.back_hair_tips[i+1], 
						this.back_hair_roots[i+1], 
						this.back_hair_cp2[i+1], 
						this.back_hair_cp1[i+1]);
				}
				else
				{
					this.drawCurve2(
						this.back_hair_tips[this.back_hair_tips.length -1], 
						this.temple_right, 
						this.back_hair_cp2[this.back_hair_tips.length -1], 
						this.back_hair_cp1[this.back_hair_tips.length -1]);
				}
				this.con.stroke();
			}
			this.con.fill();
			this.con.fillStyle = "#000";
			this.con.fill();

		}
		this.con.globalAlpha = 1;
	}// 閉じ括弧



	drawNeck()
	{
		this._config("#fee", "#000");
		this.con.beginPath();
		this.drawCurve2(
			this.neck_start[0], 
			this.neck_end[0], 
			this.neck_cp1[0],
			this.neck_cp2[0], true
		);
		this.lineTo(this.neck_end[1]);
		this.drawCurve2(
			this.neck_end[1], 
			this.neck_start[1], 
			this.neck_cp2[1],
			this.neck_cp1[1]
		);
		this.con.fill();
		this._config("#000", "#000", 0.1, 1);
		this.con.fill();
		this.con.globalAlpha = 1;
		this.con.stroke();
	}



	drawNeckShadow()
	{
		this._config("#000", "#000", 1, 1);
		this.con.beginPath();
		this.moveTo(this.neck_start[0]);
		this.lineTo(this.neck_start2[0]);
		this.drawCurve2(
			this.neck_start2[0], 
			this.neck_start2[1], 
			this.neck_shadow_cp1, 
			this.neck_shadow_cp2
		);
		this.lineTo(this.neck_start[1]);
		this.con.globalAlpha = 0.2;
		this.con.fill();
		this.con.globalAlpha = 1;
	}




	drawEar()
	{
		for (let i=0; i<2; i++)
		{
			this._config("#fee", "#000");
			this.con.beginPath();

			this.drawCurve2(
				this.ear_start[i], 
				this.earlobe_start[i], 
				this.ear_cp1[i], 
				this.ear_cp2[i], true );
			this.drawCurve(
				this.earlobe_start[i], 
				this.ear_end[i], 
				this.earlobe_cp1[i] );
			this.con.stroke();
			this.con.fill();

			this.con.globalAlpha = 0.2;
			this.con.beginPath();

			this.drawCurve2(
				this.inner_ear_start[i], 
				this.inner_ear_end[i], 
				this.inner_ear_cp1[i], 
				this.inner_ear_cp2[i], true );
			this.con.stroke();
			this.con.fillStyle = "#000";
			this.con.beginPath();

			this.drawCurve2(
				this.inner_ear_start[i], 
				this.inner_ear_end[i], 
				this.inner_ear_cp1[i], 
				this.inner_ear_cp2[i], true );
			this.con.fill();
			this.con.globalAlpha = 1;
		}
	}// drawEar()




	drawOutline()
	{
		this._config("#fee", "#000", 1, 3);
		this.con.beginPath();

		// あごの左からあごの右
		this.drawCurve2(
			this.chin_start, 
			this.chin_end, 
			this.chin_cp1, 
			this.chin_cp2, true 
		);

		// あごの右からこめかみ
		this.drawCurve2(
			this.chin_end, 
			this.temple_right, 
			this.cheek_cp1[0], 
			this.cheek_cp2[0], false 
		);

		// 右のこめかみから頭を経由して左のこめかみまで
		this.drawCurve2(
			this.temple_right, 
			this.temple_left, 
			this.head_cp1, 
			this.head_cp2 
		);

		// 左のこめかみから頬まで
		this.drawCurve2(
			this.temple_left, 
			this.chin_start, 
			this.cheek_cp2[1], 
			this.cheek_cp1[1], false 
		);
		this.con.stroke();
		this.con.fill();
	}



	drawWhiteEyes()
	{
		for (let i=0; i<2; i++)
		{
			this._config("#fff", "#000");
			this.con.beginPath();
			this.drawCurve(
				this.lower_eyelid_start[i], 
				this.eye_end[i], 
				this.lower_eyelid_cp1[i], true
			);
			this.drawCurve2(
				this.eye_end[i], 
				this.eye_head[i], 
				this.lower_eyeline_cp2[i], 
				this.upper_eyeline_cp1[i]
			);
			this.con.fill();
			this.drawCurve(
				this.eye_head[i], 
				this.eyelid_bottom[i], 
				this.eyelid_bottom_cp1[i] 
			);
			this.con.fill();
		}
	}



	drawNose()
	{
		this._config("#744", "#744");
		this.con.beginPath();
		this.moveTo(this.nose_top);
		this.lineTo(this.nose_bottom);
		this.con.stroke();
		this.con.beginPath();
		this.drawCurve2(
			this.nose_top, 
			this.nose_bottom, 
			this.nose_cp1, 
			this.nose_cp2
		);
		this.con.fill();
	}



	drawMouth()
	{
		this._config("#744", "#aaa", 1, 2);
		this.con.beginPath();
		this.drawCurve2(
			this.mouth_start, 
			this.mouth_end, 
			this.mouth_cp1, 
			this.mouth_cp2, true
		);
		this.con.stroke();
		//this._drawLowerLipShadow();
	}



	_drawLowerLipShadow()
	{
		this._config("#000", "#000", 0.2);
		this.con.beginPath();
		this.drawCurve2(
			this.lower_lip_start, 
			this.lower_lip_end, 
			this.lower_lip_cp1, 
			this.lower_lip_cp2, true
		);
		this.drawCurve2(
			this.lower_lip_end, 
			this.lower_lip_start, 
			this.lower_lip_cp4, 
			this.lower_lip_cp3
		);
		this.con.fill();
		this.con.globalAlpha = 1;
	}


	drawDebug()
	{
		this._config("#111", "#111");
		this.con.font="16px 'ＭＳ　ゴシック'";

		this.con.fillText("クライアントマウス(X: "+ox + ",  Y: " + oy + ")", 
			50, 50 );
		this.con.fillText("中心マウス(X: "
			+(ox - this.center.x) + ",  Y: " + (oy - this.center.y) + ")", 
			50, 50 *2 );
	}
	drawCenter ()
	{
		this._config("#f00", "#f00");

		/* 横描画 */
		this.con.beginPath();
		this.con.moveTo(-10 + this.center.x, this.center.y);
		this.con.lineTo( 10 + this.center.x, this.center.y);
		this.con.stroke();

		/* 縦描画 */
		this.con.beginPath();
		this.con.moveTo(this.center.x, -10 + this.center.y);
		this.con.lineTo(this.center.x,  10 + this.center.y);
		this.con.stroke();
	}

}// クラス閉じ括弧
