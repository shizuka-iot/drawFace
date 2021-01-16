'use strict';

// グローバル変数

const LEFT = -1;
const RIGHT = 1;

/* マウス用の座標 */
let px;
let py;
let ox;
let oy;


/*
 * 顔を描画
 */
class DrawFace
{
	constructor(canvas_id, coordinates)
	{
		// キャンバス初期化
		this.can = document.getElementById(canvas_id);
		this.con = this.can.getContext('2d');
		this.can.width = 800;
		this.can.height = 640;

		// マウスイベント監視開始
		window.addEventListener('mousemove', this.mouseMove, false);

		// 顔の座標オブジェクトをそのままプロパティに代入
		this.coordinates = coordinates;

		// 全ての座標を計算
		this.initAllCoordinates();

	}// コンストラクタ閉じ括弧



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
	_initOutsideHairArrays()
	{
		this.outside_back_hair_roots = [];
		this.outside_back_hair_tips = [];
		this.outside_back_hair_cp1 = [];
		this.outside_back_hair_cp2 = [];
	}

	// 全座標初期化メソッド
	initAllCoordinates()
	{
		// 左右
		this.pn = 0;

		/* 中心座標 */
		this.center = { 
			x: this.can.width/2, 
			y: this.can.height/2 + 40 
		};
		this.top_of_head = {
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

		this.pn = 0;
		/* 目頭 */
		this.eye_head = [
			{ 
				x: this.center.x + 35 + this.coordinates.eye.eye_head.width, 
				y: this.center.y + this.coordinates.eye.eye_head.height
			},
			{ 
				x: this.center.x - 35 - this.coordinates.eye.eye_head.width, 
				y: this.center.y + this.coordinates.eye.eye_head.height
			},
		];

		/* アイライン */
		this.upper_eyeline_end = [
			{ 
				x: this.eye_head[0].x + 100 + this.coordinates.eye.upper_eyeline_end.x, 
				y: this.center.y
			},
			{ 
				x: this.eye_head[1].x - 100 - this.coordinates.eye.upper_eyeline_end.x, 
				y: this.center.y
			},
		];
		/* アッパーアイラインCP1 */
		this.upper_eyeline_cp1 = [
			{ 
				x: this.eye_head[0].x + this.sp(this.eye_head[0].x , this.upper_eyeline_end[0].x,1/3) + this.coordinates.eye.upper_eyeline_cp1.x, 
				y: this.center.y -30 + this.coordinates.eye.upper_eyeline_cp1.y + this.coordinates.eye.upper_eyeline_cp.y},
			{ 
				x: this.eye_head[1].x - this.sp(this.eye_head[1].x , this.upper_eyeline_end[1].x,1/3) - this.coordinates.eye.upper_eyeline_cp1.x, 
				y: this.center.y -30 + this.coordinates.eye.upper_eyeline_cp1.y + this.coordinates.eye.upper_eyeline_cp.y},
		];
		/* アッパーアイラインCP2 */
		this.upper_eyeline_cp2 = [
			{ 
				x: this.eye_head[0].x + Math.floor(Math.abs(this.eye_head[0].x - this.upper_eyeline_end[0].x)*2/3) + this.coordinates.eye.upper_eyeline_cp2.x, 
				y: this.center.y -30 + this.coordinates.eye.upper_eyeline_cp2.y + this.coordinates.eye.upper_eyeline_cp.y},
			{ 
				x: this.eye_head[1].x - Math.floor(Math.abs(this.eye_head[1].x - this.upper_eyeline_end[1].x)*2/3) - this.coordinates.eye.upper_eyeline_cp2.x, 
				y: this.center.y-30 + this.coordinates.eye.upper_eyeline_cp2.y + this.coordinates.eye.upper_eyeline_cp.y},
		];
		/* ロウワーアイラインCP1 */
		this.lower_eyeline_cp1 = [
			{ 
				x: this.eye_head[0].x + Math.floor(Math.abs(this.eye_head[0].x - this.upper_eyeline_end[0].x)/3), 
				y: this.center.y -30},
			{ 
				x: this.eye_head[1].x - Math.floor(Math.abs(this.eye_head[1].x - this.upper_eyeline_end[1].x)/3), 
				y: this.center.y -30},
		];
		/* ロウワーアイラインCP2 */
		this.lower_eyeline_cp2 = [
			{ x: this.upper_eyeline_end[0].x +10 , y: this.center.y -25},
			{ x: this.upper_eyeline_end[1].x -10, y: this.center.y -25},
		];
		/* アイライン(目頭) */
		this.upper_eyeline_start = [
			{ x: this.eye_head[0].x, y: this.eye_head[0].y},
			{ x: this.eye_head[1].x, y: this.eye_head[1].y},
		];
		/* 目尻 */
		this.eye_end = [
			{ x: this.upper_eyeline_end[0].x - 20, y: this.center.y + 20},
			{ x: this.upper_eyeline_end[1].x + 20, y: this.center.y + 20},
		];

		this.upper_eyeline_start2 = [
			{x: this.eye_head[0].x, y: this.eye_head[0].y - 10},
			{x: this.eye_head[1].x, y: this.eye_head[1].y - 10},
		];
		this.upper_eyeline_end2 = [
			{ x: this.upper_eyeline_end[0].x, y: this.center.y -10},
			{ x: this.upper_eyeline_end[1].x, y: this.center.y -10},
		];
		/* アイライン2CP1 */
		this.eyeline2_cp1 = [
			{ x: this.upper_eyeline_cp1[0].x, y: this.upper_eyeline_cp1[0].y -5},
			{ x: this.upper_eyeline_cp1[1].x, y: this.upper_eyeline_cp1[1].y -5},
		];
		/* アイライン2CP2 */
		this.eyeline2_cp2 = [
			{ x: this.upper_eyeline_cp2[0].x, y: this.upper_eyeline_cp2[0].y -5},
			{ x: this.upper_eyeline_cp2[1].x, y: this.upper_eyeline_cp2[1].y -5},
		];
		/* アイライン2CP1 */
		this.eyeline2_cp3 = [
			{ x: this.upper_eyeline_cp1[0].x, y: this.eyeline2_cp1[0].y -2},
			{ x: this.upper_eyeline_cp1[1].x, y: this.eyeline2_cp1[1].y -2},
		];
		/* アイライン2CP2 */
		this.eyeline2_cp4 = [
			{ x: this.upper_eyeline_cp2[0].x, y: this.eyeline2_cp2[0].y -2},
			{ x: this.upper_eyeline_cp2[1].x, y: this.eyeline2_cp2[1].y -2},
		];

		/* まつげ */
		this.eyelash_start = [
			{x : this.eye_end[0].x, y: this.eye_end[0].y},
			{x : this.eye_end[1].x, y: this.eye_end[1].y},
		]
		this.eyelash_end = [
			{x : this.upper_eyeline_end[0].x + 10, y: this.upper_eyeline_end[0].y},
			{x : this.upper_eyeline_end[1].x - 10, y: this.upper_eyeline_end[1].y},
		]
		this.eyelash_cp1 = [
			{
				x: this.eyelash_start[0].x + this.sp(this.eyelash_start[0].x, this.eyelash_end[0].x, 1/2), 
				y: this.eyelash_end[0].y + this.sp(this.eyelash_start[0].y, this.eyelash_end[0].y, 1/2) -5
			},
			{
				x: this.eyelash_start[1].x - this.sp(this.eyelash_start[1].x, this.eyelash_end[1].x, 1/2), 
				y: this.eyelash_end[1].y + this.sp(this.eyelash_start[1].y, this.eyelash_end[1].y, 1/2) -5
			},
		]
		this.eyelash_cp2 = [
			{
				x: this.eyelash_start[0].x + this.sp(this.eyelash_start[0].x, this.eyelash_end[0].x, 1/2), 
				y: this.eyelash_end[0].y + this.sp(this.eyelash_start[0].y, this.eyelash_end[0].y, 1/2) -5
			},
			{
				x: this.eyelash_start[1].x - this.sp(this.eyelash_start[1].x, this.eyelash_end[1].x, 1/2), 
				y: this.eyelash_end[1].y + this.sp(this.eyelash_start[1].y, this.eyelash_end[1].y, 1/2) -5
			},
		]
		this.eyelash_cp = [
			{x: this.upper_eyeline_end[0].x -10 , y: this.eyelash_end[0].y},
			{x: this.upper_eyeline_end[1].x +10, y: this.eyelash_end[1].y},
		];

		this.eyelid_cp1 = [
			{x: this.upper_eyeline_start[0].x, y: this.upper_eyeline_start[0].y - 60},
			{x: this.upper_eyeline_start[1].x, y: this.upper_eyeline_start[1].y - 60},
		];
		this.eyelid_cp2 = [
			{x: this.upper_eyeline_end[0].x, y: this.upper_eyeline_end[0].y - 60},
			{x: this.upper_eyeline_end[1].x, y: this.upper_eyeline_end[1].y - 60},
		];

		this.lower_eyelid_start = [
			{x: this.eye_head[0].x + 10, y: this.eye_end[0].y},
			{x: this.eye_head[1].x - 10, y: this.eye_end[1].y},
		];
		this.lower_eyelid_cp1 = [
			{
				x: this.lower_eyelid_start[0].x + Math.floor(Math.abs(this.lower_eyelid_start[0].x - this.eye_end[0].x))*1/3, 
				y: this.eye_end[0].y + 30},
			{
				x: this.lower_eyelid_start[1].x - Math.floor(Math.abs(this.lower_eyelid_start[1].x - this.eye_end[1].x))*1/3, 
				y: this.eye_end[1].y + 30},
		];
		this.lower_eyelid_cp2 = [
			{
				x: this.lower_eyelid_start[0].x + Math.floor(Math.abs(this.lower_eyelid_start[0].x - this.eye_end[0].x))*2/3, 
				y: this.eye_end[0].y + 30},
			{
				x: this.lower_eyelid_start[1].x - Math.floor(Math.abs(this.lower_eyelid_start[1].x - this.eye_end[1].x))*2/3, 
				y: this.eye_end[1].y + 30},
		];
		this.lower_eyelid_cp3 = [
			{x: this.eye_head[0].x , y: this.eye_head[0].y + 80},
			{x: this.eye_head[1].x , y: this.eye_head[1].y + 80},
		];
		this.lower_eyelid_cp4 = [
			{x: this.eye_end[0].x , y: this.eye_end[0].y + 60},
			{x: this.eye_end[1].x , y: this.eye_end[1].y + 60},
		];

		/*************************************************************
		 * 鼻
		*************************************************************/
		this.nose_top = {x:this.center.x, y:this.center.y +90};
		this.nose_bottom = {x:this.center.x, y:this.nose_top.y + 12};
		this.nose_cp1 = {
			x:this.nose_top.x + 5 , 
			y:this.nose_top.y + Math.floor(Math.abs(this.nose_top.y - this.nose_bottom.y))/2 };
		this.nose_cp2 = {
			x:this.nose_top.x , 
			y:this.nose_top.y - Math.floor(Math.abs(this.nose_top.y - this.nose_bottom.y)*2/3) };


		this.eyelid_bottom = [
			{x: this.eye_head[0].x + 40, y: this.center.y +28 +5}, 
			{x: this.eye_head[1].x - 40, y: this.center.y +28 +5}, 
		];
		this.eyelid_bottom_cp1 = [
			{x: this.eye_head[0].x, y: this.eyelid_bottom[0].y}, 
			{x: this.eye_head[1].x, y: this.eyelid_bottom[1].y}, 
		];
		this.eyelid_bottom_cp3 = [
			{x: this.eye_end[0].x - this.sp(this.eye_end[0].x, this.eyelid_bottom[0].x, 1/2), y: this.eyelid_bottom[0].y}, 
			{x: this.eye_end[1].x + this.sp(this.eyelid_bottom[1].x,this.eye_end[1].x,  1/2), y: this.eyelid_bottom[1].y}, 
		];
		this.eyelid_bottom_cp4 = [
			{x: this.eye_head[0].x, y: this.eyelid_bottom[0].y}, 
			{x: this.eye_head[1].x, y: this.eyelid_bottom[1].y}, 
		];
		this.mouth_start = {x: this.center.x - this.coordinates.mouth.width, y: this.center.y + 130 + this.coordinates.mouth.height};
		this.mouth_end = {x: this.center.x + this.coordinates.mouth.width, y: this.center.y + 130 + this.coordinates.mouth.height};
		this.mouth_cp1 = {
			x: this.mouth_start.x + (Math.abs(this.mouth_start.x - this.mouth_end.x)*1/3), 
			y: this.mouth_start.y + this.coordinates.mouth.cp_height};
		this.mouth_cp2 = {
			x: this.mouth_start.x + Math.floor(Math.abs(this.mouth_start.x - this.mouth_end.x)*2/3), 
			y: this.mouth_start.y + this.coordinates.mouth.cp_height};

		this.chin_start = {x: this.center.x - 30 - this.coordinates.chin.width, y: this.mouth_start.y + 50};
		this.chin_end = {x: this.center.x + 30 + this.coordinates.chin.width, y: this.mouth_start.y + 50};
		this.chin_cp1 = {
			x:this.chin_start.x + this.sp(this.chin_start.x, this.chin_end.x, 1/3), 
			y: this.chin_start.y + 10};
		this.chin_cp2 = {
			x:this.chin_start.x + this.sp(this.chin_start.x, this.chin_end.x, 2/3), 
			y: this.chin_start.y + 10};
		this.cheek_start = [
			{x: this.chin_end.x + this.coordinates.chin.width + this.coordinates.cheek.width, y: this.chin_end.y},
			{x: this.chin_start.x - this.coordinates.chin.width - this.coordinates.cheek.width, y: this.chin_start.y},
		];
		this.cheek_end = [
			{x: this.upper_eyeline_end[0].x + 20 + this.coordinates.eye.span_to_eye_x, y: this.upper_eyeline_end[0].y},
			{x: this.upper_eyeline_end[1].x - 20 - this.coordinates.eye.span_to_eye_x, y: this.upper_eyeline_end[1].y},
		];
		this.temple_left =	{x: this.cheek_end[1].x, y: this.cheek_end[1].y };
		this.temple_right = {x: this.cheek_end[0].x, y: this.cheek_end[0].y };
		this.cheek_cp1 = [
			{
				x: this.cheek_start[0].x + this.sp(this.cheek_start[0].x, this.cheek_end[0].x, 1/3), 
				y: this.cheek_start[0].y - this.sp(this.cheek_start[0].y, this.cheek_end[0].y, 1/8)},
			{
				x: this.cheek_start[1].x - this.sp(this.cheek_start[1].x, this.cheek_end[1].x, 1/3), 
				y:this.cheek_start[1].y - this.sp(this.cheek_start[1].y, this.cheek_end[1].y, 1/8)},
		];
		this.cheek_cp2 = [
			{
				x: this.cheek_start[0].x + this.sp(this.cheek_start[0].x, this.cheek_end[0].x, 4/5), 
				y: this.cheek_start[0].y - this.sp(this.cheek_start[0].y, this.cheek_end[0].y, 2/8)},
			{
				x: this.cheek_start[1].x - this.sp(this.cheek_start[1].x, this.cheek_end[1].x, 4/5), 
				y:this.cheek_start[1].y - this.sp(this.cheek_start[1].y, this.cheek_end[1].y, 2/8)},
		];

		this.head_cp1 = {x: this.cheek_end[0].x + 60, y:this.center.y -320};
		this.head_cp2 = {x: this.cheek_end[1].x - 60, y:this.center.y -320};

		this.ear_start = [
			{x: this.temple_right.x -20, y: this.temple_right.y - 20},
			{x: this.temple_left.x + 20, y: this.temple_left.y - 20},
		];
		this.ear_end = [
			{x: this.eye_end[0].x, y: this.eye_end[0].y + 50},
			{x: this.eye_end[1].x, y: this.eye_end[1].y + 50},
		];
		this.earlobe_start = [
			{
				x: this.ear_start[0].x + 30, 
				y: this.ear_start[0].y + this.sp(this.ear_start[0].y, this.ear_end[0].y, 2/3) },
			{
				x: this.ear_start[1].x - 30, 
				y: this.ear_start[1].y + this.sp(this.ear_start[1].y, this.ear_end[1].y, 2/3) },
		];
		this.inner_ear_start = [
			{x: this.ear_start[0].x -10, y: this.ear_start[0].y + 10},
			{x: this.ear_start[1].x +10, y: this.ear_start[1].y + 10},
		];
		this.inner_ear_end = [
			{x: this.earlobe_start[0].x -10, y: this.earlobe_start[0].y - 10 },
			{x: this.earlobe_start[1].x +10, y: this.earlobe_start[1].y - 10 },
		];
		this.ear_cp1 = [
			{
				x: this.earlobe_start[0].x + this.sp(this.ear_start[0].x ,this.earlobe_start[0].x, 1), 
				y: this.ear_start[0].y - 20},
			{
				x: this.earlobe_start[1].x - this.sp(this.ear_start[1].x ,this.earlobe_start[1].x, 1), 
				y: this.ear_start[1].y - 20},
		];
		this.ear_cp2 = [
			{
				x: this.earlobe_start[0].x + this.sp(this.ear_start[0].x ,this.earlobe_start[0].x, 1), 
				y: this.ear_start[0].y + this.sp(this.ear_start[0].y ,this.earlobe_start[0].y, 1/2)},
			{
				x: this.earlobe_start[1].x - this.sp(this.ear_start[1].x ,this.earlobe_start[1].x, 1), 
				y: this.ear_start[1].y + this.sp(this.ear_start[1].y ,this.earlobe_start[1].y, 1/2)},
		];
		this.inner_ear_cp1 = [
			{
				x: this.inner_ear_end[0].x + this.sp(this.inner_ear_start[0].x ,this.inner_ear_end[0].x, 1), 
				y: this.inner_ear_start[0].y - 20},
			{
				x: this.inner_ear_end[1].x - this.sp(this.inner_ear_start[1].x ,this.inner_ear_end[1].x, 1), 
				y: this.inner_ear_start[1].y - 20},
		];
		this.inner_ear_cp2 = [
			{
				x: this.inner_ear_end[0].x + this.sp(this.inner_ear_start[0].x ,this.inner_ear_end[0].x, 1), 
				y: this.inner_ear_start[0].y + this.sp(this.inner_ear_start[0].y ,this.inner_ear_end[0].y, 1/2)},
			{
				x: this.inner_ear_end[1].x - this.sp(this.inner_ear_start[1].x ,this.inner_ear_end[1].x, 1), 
				y: this.inner_ear_start[1].y + this.sp(this.inner_ear_start[1].y ,this.inner_ear_end[1].y, 1/2)},
		];
		this.earlobe_cp1 = [
			{x: this.earlobe_start[0].x, y: this.ear_end[0].y},
			{x: this.earlobe_start[1].x, y: this.ear_end[1].y},
		];
		this.earlobe_cp2 = [];

		this.neck_start = [
			{x: this.center.x + 70, y: this.chin_start.y -60},
			{x: this.center.x - 70, y: this.chin_start.y -60},
		];
		this.neck_end = [
			{x: this.neck_start[0].x + 150, y: this.neck_start[0].y + 180},
			{x: this.neck_start[1].x - 150, y: this.neck_start[1].y + 180},
		];


		this.neck_start2 = [
			{x: this.neck_start[0].x, y: this.neck_start[0].y + 60},
			{x: this.neck_start[1].x, y: this.neck_start[1].y + 60},
		];
		this.neck_end2 = [
			{x: this.neck_end[0].x, y: this.neck_end[0].y + 50},
			{x: this.neck_end[1].x, y: this.neck_end[1].y + 50},
		];

		this.neck_terminal1 = [
			{x: this.neck_start[0].x, y: this.neck_start[0].y - 150},
			{x: this.neck_start[1].x, y: this.neck_start[1].y - 150},
		];
		this.neck_terminal2 = [
			{x: this.neck_end[0].x, y: this.neck_terminal1[0].y },
			{x: this.neck_end[1].x, y: this.neck_terminal1[1].y },
		];
		this.neck_cp1 = [
			{x: this.neck_start[0].x -5, y: this.neck_start[0].y +130},
			{x: this.neck_start[1].x +5, y: this.neck_start[1].y +130},
		];
		this.neck_cp2 = [
			{x: this.neck_start[0].x -30 , y: this.neck_start[0].y +160},
			{x: this.neck_start[1].x +30 , y: this.neck_start[1].y +160},
		];
		this.neck_shadow_cp1 = {
			x: this.neck_start[1].x + this.sp(this.neck_start[1].x, this.neck_end[1].x, 2/3) , 
			y: this.neck_start2[1].y +50
		};
		this.neck_shadow_cp2 = {
				x: this.neck_start[1].x + this.sp(this.neck_start[1].x, this.neck_end[1].x, 1/3) , 
				y: this.neck_start2[1].y +50
		};

		this.lower_lip_start = {x: this.center.x - 20, y:this.mouth_start.y +10};
		this.lower_lip_end = {x: this.center.x + 20, y:this.mouth_start.y +10};
		this.lower_lip_cp1 = {
			x: this.lower_lip_start.x + this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 1/3), 
			y: this.lower_lip_start.y + 5};
		this.lower_lip_cp2 = {
			x: this.lower_lip_start.x + this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 2/3), 
			y: this.lower_lip_start.y + 5};
		this.lower_lip_cp3 = {
			x: this.lower_lip_start.x + this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 1/3), 
			y: this.lower_lip_start.y + 10};
		this.lower_lip_cp4 = {
			x: this.lower_lip_start.x + this.sp(this.lower_lip_start.x, this.lower_lip_end.x, 2/3), 
			y: this.lower_lip_start.y + 10};

		this.forehead_right = {
			x: this.cheek_end[0].x - this.sp(this.cheek_end[0].y, this.cheek_start[0].y, 1/6), 
			y: this.cheek_end[0].y - 140};
		this.forehead_left = {
			x: this.cheek_end[1].x + this.sp(this.cheek_end[1].y, this.cheek_start[1].y, 1/6), 
			y: this.cheek_end[1].y - 140};

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
				x: this.eyeblow_start[0].x + Math.floor(Math.abs(this.eyeblow_end[0].x - this.eyeblow_start[0].x))/3, 
				y: this.eyeblow_start[0].y -10},
			{
				x: this.eyeblow_start[1].x - Math.floor(Math.abs(this.eyeblow_end[1].x - this.eyeblow_start[1].x))/3, 
				y: this.eyeblow_start[1].y -10},
		];
		this.eyeblow_upper_cp2 = [
			{
				x: this.eyeblow_start[0].x + Math.floor(Math.abs(this.eyeblow_end[0].x - this.eyeblow_start[0].x))*2/3, 
				y: this.eyeblow_start[0].y -20},
			{
				x: this.eyeblow_start[1].x - Math.floor(Math.abs(this.eyeblow_end[1].x - this.eyeblow_start[1].x))*2/3, 
				y: this.eyeblow_start[1].y -20},
		];
		// y座標を+10くらいにすれば太眉になる。-20くらいで細眉
		this.eyeblow_lower_cp1 = [
			{
				x: this.eyeblow_start[0].x + this.sp(this.eyeblow_end[0].x ,this.eyeblow_start[0].x, 1/3), 
				y: this.eyeblow_start[0].y +this.coordinates.eyeblow.cp.y},
			{
				x: this.eyeblow_start[1].x - this.sp(this.eyeblow_end[1].x ,this.eyeblow_start[1].x, 1/3), 
				y: this.eyeblow_start[1].y +this.coordinates.eyeblow.cp.y},
		];
		this.eyeblow_lower_cp2 = [
			{
				x: this.eyeblow_start[0].x + Math.floor(Math.abs(this.eyeblow_end[0].x - this.eyeblow_start[0].x))*2/3, 
				y: this.eyeblow_start[0].y -20},
			{
				x: this.eyeblow_start[1].x - Math.floor(Math.abs(this.eyeblow_end[1].x - this.eyeblow_start[1].x))*2/3, 
				y: this.eyeblow_start[1].y -20},
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
			{x: this.cheek_end[1].x, y: this.cheek_end[1].y },// 左
			{x: this.cheek_end[0].x, y: this.cheek_end[0].y },// 右
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

	mainLoop()
	{
		//requestAnimationFrame(mainLoop);
		//setInterval(mainLoop, 1000/2)
		update();
		draw();
	}


	update()
	{
		this.initAllCoordinates();// 全ての座標を再計算
	}


	draw()
	{
		this.con.clearRect(0, 0, this.can.width, this.can.height);
		this.drawDebug();
		this.drawOutsideBackHair(this.coordinates.hair.outside_back.bunch, this.coordinates.hair.outside_back.length);
		this._selectBackHair();
		this.drawNeck();
		this.drawNeckShadow();
		this.drawEar();
		this.drawOutline();
		this.drawWhiteEyes();
		this.drawEyes();
		this.drawEyelid();
		this.drawEyeline2();
		this.drawEyelashes();
		this.drawLowerEyelid();
		this.drawMouth();
		this.drawEyeblow();
		this.drawNose();
		this.drawSkinHead();
		//this.drawSideHair3(this.side_hair_length, this.side_hair_bunch);
		/*
		this.drawSideHair2(this.coordinates.hair.side.bunch, this.coordinates.hair.side.length);
		*/

		this.drawOutsideHair(this.coordinates.hair.outside.bunch, this.coordinates.hair.outside.length);
		this._selectFrontHair();
		//this._selectSideHair();
		//this.drawSideHair4(this.coordinates.hair.side.length, this.coordinates.hair.side.bunch);
		this.drawSideHair4(this.coordinates.hair.side.length, this.coordinates.hair.side.bunch, this.side_hair_arrays, this.temple_left, this.forehead_right);
	}

	_selectBackHair()
	{
		switch (this.coordinates.hair.back.type)
		{
			case 2:
				this.drawBackHair2(this.coordinates.hair.back.bunch, this.coordinates.hair.back.length);
				break;
			case 3:
				this.drawBackHair(this.coordinates.hair.back.bunch, this.coordinates.hair.back.length);
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
				this.drawFrontHair2_2(this.coordinates.hair.front.bunch, this.coordinates.hair.front.length);
				break;
			case 3:
				this.drawFrontHair3(this.coordinates.hair.front.bunch, this.coordinates.hair.front.length);
				break;
			case 4:
				this.drawFrontline(this.coordinates.hair.front.bunch, this.coordinates.hair.front.length, 1/2);
				this.drawFrontline(this.coordinates.hair.front.bunch, this.coordinates.hair.front.length, 1/2, RIGHT);
				break;
			case 5:
				this.drawFrontHair5(this.coordinates.hair.front.bunch, this.coordinates.hair.front.length);
				break;
			default:
				break;
		}
	}
	_selectSideHair()
	{
		switch (this.coordinates.hair.side.type)
		{
			case 2:
				this.drawSideHair2(this.coordinates.hair.side.bunch, this.coordinates.hair.side.length);
				break;
			case 3:
				this.drawSideHair3(this.coordinates.hair.side.bunch, this.coordinates.hair.side.length);
				break;
			case 4:
				this.drawSideHair4(this.coordinates.hair.side.bunch, this.coordinates.hair.side.length);
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



	drawFrontHairFromTop()
	{
		this.fillR(this.top_of_head, "red");

		// 座標生成
	}



	_generateCoordinatesOfFrontHairFromTop()
	{
		for (let i=0; i<hair_bunch; i++)
		{
			
		}
	}



	_initializeSideHairArray()
	{
		this.side_hair_roots = [];
		this.side_hair_tips = [];
		this.side_hair_cp1 = [];
		this.side_hair_cp2 = [];
	}


	
	_generateSideHair2LeftCoordinates(hair_length, hair_bunch, span)
	{
			this._initializeSideHairArray();

			/* 左サイド髪の座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				this.side_hair_roots[i] = {
					x: this.temple_left.x + i*span, 
					y: this.temple_left.y + this.generateCoordinateLeft(i*span)};
				this.side_hair_tips[i] = {
					x: this.temple_left.x + i*span + rand(-60, 0), 
					y: this.temple_left.y + rand(0, 20) + hair_length};
				this.side_hair_cp1[i] = {
					x: this.temple_left.x + i*span/2 + rand(-5, 5), 
					y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 1/3)};
				this.side_hair_cp2[i] = {
					x: this.temple_left.x + i*span/2 + rand(-1, 1), 
					y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 2/3) };
			}
	}


	_drawSideHair2Left(hair_bunch)
	{
		/* 左サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.side_hair_roots[0].x, this.side_hair_roots[0].y);
		this.con.lineWidth = 1;
		this.con.fillStyle = this.hair_color;
		this.con.strokeStyle = "#000";

		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(this.side_hair_roots[i], this.side_hair_tips[i], this.side_hair_cp1[i], this.side_hair_cp2[i] );

			if( i+1<hair_bunch)
			{
				this.drawCurve2(this.side_hair_tips[i+1], this.side_hair_roots[i+1], this.side_hair_cp2[i], this.side_hair_cp1[i+1]);
			}
			else
			{
				this.drawCurve2(this.side_hair_tips[this.side_hair_tips.length -1], this.forehead_left, this.side_hair_cp2[this.side_hair_tips.length -1], this.side_hair_cp1[this.side_hair_tips.length -1]);
			}
			this.con.stroke();
		}
		this.con.fill();
	}


	_drawSideHair2Right(hair_bunch)
	{
		/* 右サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.side_hair_roots[0].x, this.side_hair_roots[0].y);
		for (let i=0; i<hair_bunch; i++)
		{
			/* */
			this.drawCurve2(this.side_hair_roots[i], this.side_hair_tips[i], this.side_hair_cp1[i], this.side_hair_cp2[i] );
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";


			/*  */
			if( i+1<hair_bunch)
			{
				this.drawCurve2(this.side_hair_tips[i+1], this.side_hair_roots[i+1], this.side_hair_cp2[i], this.side_hair_cp1[i+1]);
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



	_generateSideHair2RightCoordinates(hair_length, hair_bunch, span)
	{
		this._initializeSideHairArray();
		/* 右サイド髪の座標生成 */
		for (let i=0; i<=hair_bunch; i++)
		{
			this.side_hair_roots[i] = {
				x: this.forehead_right.x + i*span, 
				y: this.forehead_right.y + this.generateCoordinateRight(i*span)};
			this.side_hair_tips[i] = {
				x: this.forehead_right.x + i*span + rand(-60, 0), 
				y: this.cheek_end[0].y + rand(10, 20) + hair_length};
			this.side_hair_cp1[i] = {
				x: this.forehead_right.x + i*span/2 + rand(0, 10), 
				y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 1/3)};
			this.side_hair_cp2[i] = {
				x: this.forehead_right.x + i*span/2 + rand(-10, 10), 
				y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 2/3) };
		}
	}



	// 左サイドの座標生成
	_generateSideHair4LeftCoordinates(hair_length, hair_bunch, span)
	{
			this._initializeSideHairArray();

			/* 左サイド髪の座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				this.side_hair_roots[i] = {
					x: this.temple_left.x + i*span, 
					y: this.temple_left.y + this.generateCoordinateLeft(i*span)};
				this.side_hair_tips[i] = {
					x: this.temple_left.x + i*span + span/2 + rand(-30, 0), 
					y: this.temple_left.y + rand(0, 20) + hair_length};
				this.side_hair_cp1[i] = {
					x: this.side_hair_tips[i].x + rand(-1, 1), 
					y: this.top_of_head.y };
				this.side_hair_cp2[i] = {
					x: this.side_hair_tips[i].x + rand(-1, 1), 
					y: this.top_of_head.y + 100};
			}
	}
	_generateSideHair4RightCoordinates(hair_length, hair_bunch, span)
	{
		this._initializeSideHairArray();
		/* 右サイド髪の座標生成 */
		for (let i=0; i<=hair_bunch; i++)
		{
			this.side_hair_roots[i] = {
				x: this.forehead_right.x + i*span,
				y: this.forehead_right.y + this.generateCoordinateRight(i*span)};
			this.side_hair_tips[i] = {
				x: this.forehead_right.x + i*span +span/2 + rand(-60, 10), 
				y: this.cheek_end[0].y + rand(10, 20) + hair_length};
			this.side_hair_cp1[i] = {
				x: this.side_hair_roots[i].x + rand(-10, 10), 
				y: this.top_of_head.y};
			this.side_hair_cp2[i] = {
				x: this.side_hair_roots[i].x + rand(-10, 10), 
				y: this.top_of_head.y + 100 };
		}
	}
	_drawSideHair4Left(hair_bunch, arrays)
	{
		/* 左サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.top_of_head.x, this.top_of_head.y);
		this.con.lineWidth = 1;
		this.con.fillStyle = this.hair_color;
		this.con.strokeStyle = "#000";

		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(this.top_of_head, this.side_hair_tips[i], this.side_hair_cp1[i], this.side_hair_cp2[i] );

			if( i+1<hair_bunch)
			{
				this.drawCurve2(this.side_hair_tips[i+1], this.top_of_head, this.side_hair_cp2[i], this.side_hair_cp1[i+1]);
			}
			else
			{
				this.drawCurve2(this.side_hair_tips[this.side_hair_tips.length -1], this.top_of_head, this.side_hair_cp2[this.side_hair_tips.length -1], this.side_hair_cp1[this.side_hair_tips.length -1]);
			}
			this.con.stroke();
		}
		this.con.fill();
	}
	_drawSideHair4Left2(hair_bunch, arrays)
	{
		/* 左サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.top_of_head.x, this.top_of_head.y);
		this.con.lineWidth = 1;
		this.con.fillStyle = this.hair_color;
		this.con.strokeStyle = "#000";

		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(this.top_of_head, arrays.tips[i], arrays.cp1[i], arrays.cp2[i] );

			if( i+1<hair_bunch)
			{
				this.drawCurve2(arrays.tips[i+1], this.top_of_head, arrays.cp2[i], arrays.cp1[i+1]);
			}
			else
			{
				this.drawCurve2(arrays.tips[arrays.tips.length -1], this.top_of_head, arrays.cp2[arrays.tips.length -1], arrays.cp1[arrays.tips.length -1]);
			}
			this.con.stroke();
		}
		this.con.fill();
	}

	_drawSideHair4Right(hair_bunch, arrays)
	{
		/* 右サイド髪の描画 */
		this.con.beginPath();
		this.con.moveTo(this.top_of_head.x, this.top_of_head.y);
		for (let i=0; i<hair_bunch; i++)
		{
			this.drawCurve2(this.top_of_head, arrays.tips[i], arrays.cp1[i], arrays.cp2[i] );
			//this.drawCurve2(this.top_of_head, this.side_hair_tips[i], this.side_hair_cp1[i], this.side_hair_cp2[i] );
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";


			if( i+1<hair_bunch)
			{
				this.drawCurve2(arrays.tips[i+1], this.top_of_head, arrays.cp2[i], arrays.cp1[i+1]);
				//this.drawCurve2(this.side_hair_tips[i+1], this.top_of_head, this.side_hair_cp2[i], this.side_hair_cp1[i+1]);
			}
			else
			{
				this.drawCurve2(arrays.tips[arrays.tips.length -1], this.top_of_head, arrays.cp2[arrays.tips.length -1], arrays.cp1[arrays.tips.length -1]);
				/*
				this.drawCurve2(
					this.side_hair_tips[this.side_hair_tips.length -1], // 毛先から
					this.top_of_head, // 頬の端まで
					this.side_hair_cp2[this.side_hair_tips.length -1], // 毛先のCP
					this.side_hair_cp1[this.side_hair_tips.length -1]); // 毛先のCP
					*/
			}
		}
	}

	_generateHairCoordinates2(arrays, start_coordinate, hair_length, hair_bunch, span, start_x, tip_span)
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
				y: start_coordinate.y + rand(10, 20) + hair_length};

			// 5. CP1の座標定義
			// 根元の配列を基準にしている
			// y座標は固定
			arrays.cp1[i] = {
				x: arrays.roots[i].x + hair_rand,
				y: this.top_of_head.y};

			// 6. CP2の座標定義
			// 根元の配列を基準にしている
			// y座標は固定
			arrays.cp2[i] = {
				x: arrays.roots[i].x + hair_rand,
				y: this.top_of_head.y + 100 };
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
				y: start_coordinate.y};

			// 4. 毛先の座標
			// 基準となる固定の座標にiの回数分任意のスパンを足していく
			arrays.tips[i] = {
				x: start_coordinate.x + i*span +span/2 + rand(-60, 10), 
				y: start_coordinate.y + rand(10, 20) + hair_length};

			// 5. CP1の座標定義
			// 根元の配列を基準にしている
			// y座標は固定
			arrays.cp1[i] = {
				x: arrays.roots[i].x + rand(-10, 10),
				y: this.top_of_head.y};

			// 6. CP2の座標定義
			// 根元の配列を基準にしている
			// y座標は固定
			arrays.cp2[i] = {
				x: arrays.roots[i].x + rand(-10, 10),
				y: this.top_of_head.y + 100 };
		}
	}

	
	drawSideHair2(hair_length, hair_bunch)
	{
		let span = Math.floor(Math.abs(this.temple_left.x - this.forehead_left.x)/hair_bunch);

		/* サイクル */
		for (let j=0; j<4; j++)
		{
			this._generateSideHair2LeftCoordinates(hair_length, hair_bunch, span);
			this._drawSideHair2Left(hair_bunch);
			this._generateSideHair2RightCoordinates(hair_length, hair_bunch, span);
			this._drawSideHair2Right(hair_bunch);
			this.con.stroke();
			this.con.fill();
		}
	}

	drawSideHair4(hair_length, hair_bunch, arrays, start_left_coordinate, start_right_coordinate)
	//drawSideHair4(hair_length, hair_bunch)
	{
		let span = Math.floor(Math.abs(this.temple_left.x - this.forehead_left.x)/hair_bunch);

		/* サイクル */
		for (let j=0; j<2; j++)
		{
			//this._generateSideHair4LeftCoordinates(hair_length, hair_bunch, span);
			this._generateHairCoordinates(arrays, start_left_coordinate, hair_length, hair_bunch, span);
			this._drawSideHair4Left2(hair_bunch, arrays);
			//this._generateSideHair4RightCoordinates(hair_length, hair_bunch, span);
			this._generateHairCoordinates(arrays, start_right_coordinate, this.coordinates.hair.side.right.length, this.coordinates.hair.side.right.bunch, span);
			this._drawSideHair4Right(this.coordinates.hair.side.right.bunch, arrays);
			this.con.stroke();
			this.con.fill();
		}
	}




	drawCatalinaHair(length, split, hair_bunch, tip_base, direction = LEFT)
	{
		// 分け目の座標
		// 左右で分けずに左のforeheadを基点とする
		let split_point = 
			{
				x: this.forehead_left.x + this.sp(this.forehead_left.x, this.forehead_right.x, split),
				y: this.forehead_left.y,
			};
		let start_root =
			{
				x: split_point.x + 10,
				y: split_point.y - 100,
			}

		/* 髪の間隔 */
		let roots_span = {
			// ここで少数点を切り捨てると誤差が生じるのでできるだけ小数点を多く含めるようにする。

			x: Math.abs(start_root.x - split_point.x)/hair_bunch,
			y: Math.abs(start_root.y - split_point.y)/hair_bunch,
		}
		let tips_span = Math.floor(tip_base/hair_bunch);

		let hair_roots = [];
		let hair_tips = [];
		let hair_cp1 = [];
		let hair_cp2 = [];

		for (let j=0; j<=0; j++)
		{
			/* 座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				/*
				 * 根本
				 */
				hair_roots[i] = {
					x: split_point.x + this.generateCoordinateX(split_point, start_root, i*roots_span.y), 
					y: split_point.y - this.generateCoordinateY(split_point, start_root, i*roots_span.x),
				};


				/*
				 * 毛先
				 */
				if (direction === 1)
				{
					hair_tips[i] = {
						x: split_point.x + 50*direction + i*tips_span*direction + rand(-60, 0), 
						y: split_point.y + length - rand(0, 40)};
				}
				else
				{
					hair_tips[i] = {
						x: hair_roots[i].x + 50*direction + i*tips_span*direction + rand(-60, 0), 
						y: split_point.y + length - rand(0, 40)};
				}


				hair_cp1[i] = {
					x: start_root.x + 120*direction +20*i*direction,
					y: start_root.y - i*10 +20,
				}
				hair_cp2[i] = {
					x: hair_roots[i].x + direction*200,
					y: hair_roots[i].y + this.sp(hair_roots[i].y, hair_tips[i].y, 1/2) ,
					}
			}

			this.con.globalAlpha = 1;
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";

			/* パスを開始 */
			this.con.beginPath();
			/* 開始座標を指定 */
			this.con.moveTo(hair_roots[hair_bunch].x, hair_roots[hair_bunch].y);

			/* 描画処理 */
			for (let i=hair_bunch; i>0; i--)
			{
				this.drawCurve2(hair_roots[i], hair_tips[i], hair_cp1[i], hair_cp2[i]);

				if( i>1)
				{
					this.drawCurve2(
						hair_tips[i-1], 
						hair_roots[i-1], 
						hair_cp2[i-1], 
						hair_cp1[i-1]);
				}
				else
				{
					this.drawCurve2(
						hair_tips[0], 
						hair_roots[0], 
						hair_cp2[0], 
						hair_cp1[0]);
				}
				this.con.stroke();
			}
			this.con.fill();

		}
		this.con.fillStyle = this.hair_color;
		this.con.globalAlpha = 0.3;
		this.con.strokeStyle = "#000";
		this.con.beginPath();
		this.con.moveTo(split_point.x, split_point.y);
		this.con.lineTo(start_root.x, start_root.y);
		this.con.stroke();
		this.con.globalAlpha = 1;
	}



	drawFrontline(hair_bunch, length, split, direction = LEFT)
	{
		// 配列初期化
		let front_roots = [];
		let front_tips = [];
		let front_cp1 = [];
		let front_cp2 = [];
		let hair_roots = [];

		let split_point = 
			{
				x: this.forehead_left.x + this.sp(this.forehead_left.x, this.forehead_right.x, split),
				y: this.forehead_left.y,
			};
		let start_root =
			{
				x: split_point.x + 10,
				y: split_point.y - 120,
			}

		/* 髪の間隔 */
		let roots_span = {
			// ここで少数点を切り捨てると誤差が生じるのでできるだけ小数点を多く含めるようにする。

			//x: (Math.floor((Math.abs(start_root.x - split_point.x)/hair_bunch)*100))/100,
			x: Math.abs(start_root.x - split_point.x)/hair_bunch,
			y: Math.abs(start_root.y - split_point.y)/hair_bunch,
		}

		let front_tip_start = {
			x: split_point.x + 40 * direction,
			y: split_point.y + length,
		};
		let front_tip_end = {
			x: front_tip_start.x + 100*direction,
			y: split_point.y + length,
		};
		let front_tip_span = Math.abs(front_tip_start.x - front_tip_end.x)/hair_bunch;

		let front_root_span = 0;
		if ( direction )
		{
			front_root_span = Math.abs(split_point.x - this.forehead_right.x)/hair_bunch;
		}
		else
		{
			front_root_span = Math.abs(split_point.x - this.forehead_left.x)/hair_bunch;
		}

		for (let j=0; j<=0; j++)
		{
			/* 座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				hair_roots[i] = {
					x: split_point.x + this.generateCoordinateX(split_point, start_root, i*roots_span.y), 
					y: split_point.y - this.generateCoordinateY(split_point, start_root, i*roots_span.x),
				};

				front_roots[i] = {
					x: split_point.x + i*front_root_span*direction,
					y: split_point.y,
				};

				front_tips[i] = {
					x: front_tip_start.x + i*front_tip_span*direction + rand(-100, 0),
					y: front_tip_start.y,
				};

				front_cp1[i] = {
					x: front_roots[0].x + direction*100 + i*10*direction,
					y: front_roots[i].y - this.sp(front_roots[i].y, front_tips[i].y, 1/4) + i*18 + rand(-40, -30),
				}
				front_cp2[i] = {
					x: front_roots[0].x + direction*150 + i*2*direction,
					y: front_roots[i].y + this.sp(front_roots[i].y, front_tips[i].y, 1/2) ,
					}
			}

			for (let i=hair_bunch; i>0; i--)
			{
				this.con.globalAlpha = 1;
				this.con.lineWidth = 1;
				this.con.fillStyle = this.hair_color;
				//this.con.strokeStyle = "#000";
				this.con.strokeStyle = "#888";
				this.con.beginPath();
				this.drawCurve2(front_roots[i], front_tips[i], front_cp1[i], front_cp2[i], true);

				if( i>1)
				{
					this.drawCurve2(
						front_tips[i -1], 
						front_roots[i -1], 
						front_cp2[i -1], 
						front_cp1[i -1]);
				}
				else
				{
					this.drawCurve2(
						front_tips[0], 
						front_roots[0], 
						front_cp2[0], 
						front_cp1[0]);
				}
				this.con.stroke();
				this.con.fill();
			}
		}
	}



	drawFrontHair2_2(hair_bunch, hair_length)
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
				this.coordinates.hair.front.tip_span);

			this._drawStandardHair(this.front_hair_arrays, hair_bunch, this.hair_color, true);
		}
	}

	_drawStandardHair(hair_arrays, hair_bunch, hair_color, shadow = false, strokeStyle = "#000", globalAlpha = 1)
	{
		if (shadow)
		{
			this.con.save();
			//this.con.translate(3, 10);
			this.con.scale(1, 1.14);
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
		this.con.fill();
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
			if (shadow === false)this.con.stroke();
		}
	}




	drawFrontHair2(hair_bunch, hair_length)
	{
		/* 前髪の間隔 */
		let span = Math.floor((this.temple_right.x - this.temple_left.x)/hair_bunch);

		for (let j=0; j<=1; j++)
		{
			let span2 = j*span/3;// jが複数ある場合少しずつずらすための変数

			/* 座標生成 */
			for (let i=0; i<=hair_bunch; i++)
			{
				let hair_rand = rand(-10, 10);


				this.front_hair_tips[i] = {
					// 均等に毛先を配置
					//x: this.temple_left.x + i*span + span/2 + rand(-20, 20), 

					// 左こめかみ付近に毛先を集中させる
					// x: 基準となる毛先の開始座標 + 任意の毛先の開始座標 + i * 任意のスパン + 髪の揺れ
					x: this.temple_left.x + i*this.coordinates.hair.front.tip_span + rand(-30, 0) + this.coordinates.hair.front.tips, 

					// y: 基準となる毛先の座標 + 任意の毛先の長さ + i * + 髪の揺れ
					y: this.forehead_right.y + hair_length + rand(0, 30),
				};


				// 毛根の座標生成
				// 最初と最後は高さを固定
				// 間は高さをランダムで変化させる
				if (i === 0 )
				{
					this.front_hair_roots[i] = {
						x: this.temple_left.x + i*span + span2, 
						y: this.temple_right.y};

					this.front_hair_cp1[i] = {
						x: this.temple_left.x + i*span + hair_rand, 
						//y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 1/4)};
						//y: this.top_of_head.y + this.sp(this.top_of_head.y, this.front_hair_tips[i].y, 1/10)};
						y: this.top_of_head.y};
					this.front_hair_cp2[i] = {
						x: this.temple_left.x + i*span + hair_rand -5 +span2, 
						//y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 2/4) };
						//y: this.top_of_head.y + this.sp(this.top_of_head.y, this.front_hair_tips[i].y, 2/4)};

						// CPの高さは髪の長さにかかわらず固定とする。
						// そうしないと髪が長くなればなるほど緩やかなカーブになってしまう。
						y: this.top_of_head.y + 120};
				}
				else if (i===hair_bunch)
				{
					this.front_hair_roots[i] = {
						x: this.temple_left.x + i*span + span2, 
						y: this.temple_right.y};

					this.front_hair_cp1[i] = {
						x: this.temple_left.x + i*span + hair_rand, 
						//y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 1/4)};
						//y: this.top_of_head.y + this.sp(this.top_of_head.y, this.front_hair_tips[i].y, 1/10)};
						y: this.top_of_head.y };
					this.front_hair_cp2[i] = {
						x: this.temple_left.x + i*span + hair_rand +5 +span2, 
						//y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 2/4) };
						//y: this.top_of_head.y + this.sp(this.top_of_head.y, this.front_hair_tips[i].y, 2/4)};
						y: this.top_of_head.y + 100};
				}
				else
				{
					this.front_hair_roots[i] = {
						x: this.temple_left.x + i*span + span2, 
						y: this.temple_right.y + rand(10,20)};

					this.front_hair_cp1[i] = {
						x: this.temple_left.x + i*span + hair_rand, 
						//y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 1/4)};
						//y: this.top_of_head.y + this.sp(this.top_of_head.y, this.front_hair_tips[i].y, 1/10)};
						y: this.top_of_head.y };
					this.front_hair_cp2[i] = {
						x: this.temple_left.x + i*span + hair_rand +span2, 
						//y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 2/4) };
						//y: this.top_of_head.y + this.sp(this.top_of_head.y, this.front_hair_tips[i].y, 2/4)};
						y: this.top_of_head.y + 100};
				}
			}


			// 影
			this.con.save();
			//this.con.translate(3, 10);
			this.con.scale(1, 1.14);

			this.con.beginPath();
			this.con.moveTo(this.top_of_head.x, this.top_of_head.y);

			// 描画
			for (let i=0; i<hair_bunch; i++)
			{
				this.drawCurve2(this.top_of_head, this.front_hair_tips[i], this.front_hair_cp1[i], this.front_hair_cp2[i]);

				if( i+1<hair_bunch)
				{
					this.drawCurve2(
						this.front_hair_tips[i+1], 
						this.top_of_head,
						this.front_hair_cp2[i+1], 
						this.front_hair_cp1[i+1]);
				}
				else
				{
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.top_of_head,
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]);
				}
			}
			this.con.restore();
			this.con.lineWidth = 1;
			this.con.fillStyle = "#000";
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 0.4;

			this.con.fill();// 影を描画



			/* config */
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 1;

			/* パスを開始 */
			this.con.beginPath();
			/* 開始座標を指定 */
			this.con.moveTo(this.top_of_head.x, this.top_of_head.y);

			/* 描画処理 */
			for (let i=0; i<hair_bunch; i++)
			{
				this.drawCurve2(this.top_of_head, this.front_hair_tips[i], this.front_hair_cp1[i], this.front_hair_cp2[i]);

				if( i+1<hair_bunch)
				{
					this.drawCurve2(
						this.front_hair_tips[i+1], 
						this.top_of_head,
						this.front_hair_cp2[i+1], 
						this.front_hair_cp1[i+1]);
				}
				else
				{
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.top_of_head,
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]);
				}
				this.con.stroke();
			}
			this.con.fill();
		}
	}


	drawFrontHair5(hair_bunch, hair_length)
	{
		// 配列初期化
		this._initFrontHairArrays();

		let hair_length_plus = 0;

		/* 前髪の間隔 */
		let span = Math.floor((this.temple_right.x - this.temple_left.x)/hair_bunch);

		for (let j=0; j<=1; j++)
		{
			/* 座標生成 */
			/*
			 * 根本1から真下に下ろした毛先1
			 * 毛先1から毛先2にラインを引く
			 * 毛先2から真上の根本2にカーブを描く
			 * 以下繰り返し
			 */
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
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.temple_left.x + i*span,
						y: this.temple_right.y};

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						x: this.temple_left.x + i*this.coordinates.hair.front.tip_span + this.coordinates.hair.front.tips + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
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
						x: this.temple_left.x + i*this.coordinates.hair.front.tip_span + this.coordinates.hair.front.tips + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y + hair_length + hair_length_plus};
				}
				else// 間
				{
					this.front_hair_roots[i] = {
						x: this.temple_left.x + i*span, 
						y: this.temple_right.y + rand(0,20)};// 毛先の高さは少し乱数を足す

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						//x: this.temple_left.x + i*span -10 + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						x: this.temple_left.x + i*this.coordinates.hair.front.tip_span + this.coordinates.hair.front.tips + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y + hair_length + hair_length_plus};
				}

				// 制御点1
				this.front_hair_cp1[i] = {
					x: this.temple_left.x + i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
					y: this.top_of_head.y};
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
				this.drawCurve2(this.top_of_head, this.front_hair_tips[i], this.front_hair_cp1[i], this.front_hair_cp2[i]);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(this.front_hair_tips[i+1].x -10, this.front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
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
						this.front_hair_tips[this.front_hair_tips.length -1].y);
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.top_of_head, 
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]);
				}
			}
			this.con.restore();
			/* config */
			this.con.lineWidth = 1;
			this.con.fillStyle = "#000";
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 0.4;

			this.con.fill();// 影を描画


			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 1;

			this.con.beginPath();
			this.con.moveTo(this.top_of_head.x, this.top_of_head.y);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(this.top_of_head, this.front_hair_tips[i], this.front_hair_cp1[i], this.front_hair_cp2[i]);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(this.front_hair_tips[i+1].x -10, this.front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
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
						this.front_hair_tips[this.front_hair_tips.length -1].y);
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.top_of_head, 
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]);
				}
				this.con.stroke();
			}
			this.con.fill();
		}
		this.con.globalAlpha = 1;
	}



	drawFrontHair3(hair_bunch, hair_length)
	{
		// 配列初期化
		this._initFrontHairArrays();

		let hair_length_plus = 0;

		/* 前髪の間隔 */
		let span = Math.floor((this.forehead_right.x - this.forehead_left.x)/hair_bunch);

		for (let j=0; j<=1; j++)
		{
			/* 座標生成 */
			/*
			 * 根本1から真下に下ろした毛先1
			 * 毛先1から毛先2にラインを引く
			 * 毛先2から真上の根本2にカーブを描く
			 * 以下繰り返し
			 */
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
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.forehead_left.x + i*span,
						y: this.forehead_right.y};

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						x: this.forehead_left.x + i*span + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
				}
				else if (i===hair_bunch)// 最後
				{
					this.front_hair_roots[i] = {// 根本の座標
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.forehead_right.x,
						y: this.forehead_right.y};

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						x: this.forehead_right.x + rand(-5, 5), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y + hair_length + hair_length_plus};
				}
				else// 間
				{
					this.front_hair_roots[i] = {
						x: this.forehead_left.x + i*span, 
						y: this.forehead_right.y + rand(0,20)};// 毛先の高さは少し乱数を足す

					// 毛先の座標生成
					this.front_hair_tips[i] = {
						x: this.forehead_left.x + i*span -10 + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.forehead_right.y + hair_length + hair_length_plus};
				}

				// 制御点1
				this.front_hair_cp1[i] = {
					x: this.forehead_left.x + i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
					y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 1/4)};
				// 制御点2
				this.front_hair_cp2[i] = {
					x: this.forehead_left.x + i*span + hair_rand, 
					y: this.front_hair_roots[i].y + this.sp(this.front_hair_roots[i].y, this.front_hair_tips[i].y, 2/4) };

			}

			/* 影 */
			this.con.save();
			this.con.translate(3, -20);
			this.con.scale(1, 1.1);

			/* パスを開始 */
			this.con.beginPath();
			/* 開始座標を指定 */
			this.con.moveTo(this.front_hair_roots[0].x, this.front_hair_roots[0].y);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(this.front_hair_roots[i], this.front_hair_tips[i], this.front_hair_cp1[i], this.front_hair_cp2[i]);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(this.front_hair_tips[i+1].x -10, this.front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
					this.drawCurve2(
						this.front_hair_tips[i+1], 
						this.front_hair_roots[i+1], 
						this.front_hair_cp2[i+1], 
						this.front_hair_cp1[i+1]);
				}
				else
				{
					this.con.lineTo(
						this.front_hair_tips[this.front_hair_tips.length -1].x -10, 
						this.front_hair_tips[this.front_hair_tips.length -1].y);
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.forehead_right, 
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]);
				}
			}
			this.con.restore();
			/* config */
			this.con.lineWidth = 1;
			this.con.fillStyle = "#000";
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 0.4;

			this.con.fill();// 影を描画


			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 1;

			this.con.beginPath();
			this.con.moveTo(this.front_hair_roots[0].x, this.front_hair_roots[0].y);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(this.front_hair_roots[i], this.front_hair_tips[i], this.front_hair_cp1[i], this.front_hair_cp2[i]);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(this.front_hair_tips[i+1].x -10, this.front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
					this.drawCurve2(
						this.front_hair_tips[i+1], 
						this.front_hair_roots[i+1], 
						this.front_hair_cp2[i+1], 
						this.front_hair_cp1[i+1]);
				}
				else
				{
					this.con.lineTo(
						this.front_hair_tips[this.front_hair_tips.length -1].x -10, 
						this.front_hair_tips[this.front_hair_tips.length -1].y);
					this.drawCurve2(
						this.front_hair_tips[this.front_hair_tips.length -1], 
						this.forehead_right, 
						this.front_hair_cp2[this.front_hair_tips.length -1], 
						this.front_hair_cp1[this.front_hair_tips.length -1]);
				}
				this.con.stroke();
			}
			this.con.fill();
		}
		this.con.globalAlpha = 1;
	}




	drawOutsideHair(hair_bunch, hair_length, x = 0, cp = 0)
	{
		let side_hair_volume = 30;

		let outside_hair_left = {
			x: this.temple_left.x - side_hair_volume,
			y: this.temple_left.y,
		};
		let outside_hair_right = {
			x: this.temple_right.x + side_hair_volume,
			y: this.temple_right.y,
		};

		/* 髪の束の間隔 */
		let span = Math.floor(side_hair_volume/hair_bunch);


		this.con.lineWidth = 1;
		this.con.fillStyle = this.hair_color;
		this.con.strokeStyle = "#000";
		this.con.beginPath();
		this.con.moveTo(outside_hair_left.x, outside_hair_left.y);
		this.con.lineTo(this.temple_left.x, this.temple_left.y);
		// 中央内側
		this.drawCurve2(
			outside_hair_left,
			this.temple_right,
			this.head_cp2,
			this.head_cp1
		);
		this.con.lineTo(outside_hair_right.x, outside_hair_right.y);
		// 中央外側
		this.drawCurve2(
			outside_hair_right,
			outside_hair_left,
			this.outside_hair_upper_cp1,
			this.outside_hair_upper_cp2
		);
		this.con.fill();

		// この関数のメインループ
		for (let j=0; j<1; j++)
		{
			this.outoutside_hair_roots = [];
			this.outoutside_hair_tips = [];
			this.outoutside_hair_cp1 = [];
			this.outoutside_hair_cp2 = [];


			// 左サイド髪の座標生成
			for (let i=0; i<=hair_bunch; i++)
			{
				this.outside_hair_roots[i] = {
					x: outside_hair_left.x + i*span,// 外側からスパンを増やしていく。 
					y: outside_hair_left.y };// 高さは一定
				this.outside_hair_tips[i] = {
					x: outside_hair_left.x + i*span + rand(-60, 0) +x,
					y: outside_hair_left.y + rand(0, 20) + hair_length};
				this.outside_hair_cp1[i] = {
					x: outside_hair_left.x + i*span/2 + rand(-5, 5) -cp, 
					y: this.outside_hair_roots[i].y + this.sp(this.outside_hair_roots[i].y, this.outside_hair_tips[i].y, 1/3)};
				this.outside_hair_cp2[i] = {
					x: outside_hair_left.x + i*span/2 + rand(-1, 1) -cp, 
					y: this.outside_hair_roots[i].y + this.sp(this.outside_hair_roots[i].y, this.outside_hair_tips[i].y, 2/3) };
			}


			this.con.lineWidth = 1;
			this.con.strokeStyle = "#000";

			this.con.beginPath();
			// 最初の根本に移動
			this.con.moveTo(this.outside_hair_roots[0].x, this.outside_hair_roots[0].y);

			for (let i=0; i<hair_bunch; i++)
			{
				// まず根本から毛先まで下ろす
				this.drawCurve2(
					this.outside_hair_roots[i], 
					this.outside_hair_tips[i], 
					this.outside_hair_cp1[i], 
					this.outside_hair_cp2[i] );

				// 配列の最後の一つ前まで
				if( i+1<hair_bunch)
				{
					// 毛先から根本に向かってカーブを引く
					this.drawCurve2(
						this.outside_hair_tips[i+1], 
						this.outside_hair_roots[i+1], 
						this.outside_hair_cp2[i], 
						this.outside_hair_cp1[i+1]);
				}
				// 配列の最後
				else
				{
					// 配列の最後は
					this.drawCurve2(
						this.outside_hair_tips[this.outside_hair_tips.length -1], 
						this.temple_left, 
						this.outside_hair_cp2[this.outside_hair_tips.length -1], 
						this.outside_hair_cp1[this.outside_hair_tips.length -1]);
				}
				this.con.stroke();
				this.con.fill();
			}
		

			/*
			// 中央
			this.drawCurve2(
				outside_hair_left,
				this.temple_right,
				this.head_cp2,
				this.head_cp1
			);
			*/


			this.outside_hair_roots = [];
			this.outside_hair_tips = [];
			this.outside_hair_cp1 = [];
			this.outside_hair_cp2 = [];


			for (let i=0; i<=hair_bunch; i++)
			{
				this.outside_hair_roots[i] = {
					x: this.temple_right.x + i*span, 
					y: this.temple_right.y };
				this.outside_hair_tips[i] = {
					x: this.temple_right.x + i*span + rand(-60, 0) -x, 
					y: this.temple_right.y + rand(10, 20) + hair_length};
				this.outside_hair_cp1[i] = {
					x: this.temple_right.x + i*span/2 + rand(0, 10) +cp, 
					y: this.outside_hair_roots[i].y + this.sp(this.outside_hair_roots[i].y, this.outside_hair_tips[i].y, 1/3)};
				this.outside_hair_cp2[i] = {
					x: this.temple_right.x + i*span/2 + rand(-10, 10) +cp, 
					y: this.outside_hair_roots[i].y + this.sp(this.outside_hair_roots[i].y, this.outside_hair_tips[i].y, 2/3) };
			}

			//this.con.lineTo(this.outside_hair_roots[0].x, this.outside_hair_roots[0].y);


			this.con.beginPath();
			this.con.lineTo(this.outside_hair_roots[0].x, this.outside_hair_roots[0].y);
			for (let i=0; i<hair_bunch; i++)
			{
				this.drawCurve2(this.outside_hair_roots[i], this.outside_hair_tips[i], this.outside_hair_cp1[i], this.outside_hair_cp2[i] );
				this.con.lineWidth = 1;
				this.con.fillStyle = this.hair_color;
				this.con.strokeStyle = "#000";


				if( i+1<hair_bunch)
				{
					this.drawCurve2(
						this.outside_hair_tips[i+1], 
						this.outside_hair_roots[i+1], 
						this.outside_hair_cp2[i], 
						this.outside_hair_cp1[i+1]);
				}
				else
				{
					this.drawCurve2(
						this.outside_hair_tips[this.outside_hair_tips.length -1], // 毛先から
						outside_hair_right, // 右の後ろ髪の外側
						this.outside_hair_cp2[this.outside_hair_tips.length -1], // 毛先のCP
						this.outside_hair_cp1[this.outside_hair_tips.length -1]); // 毛先のCP
				}
				this.con.stroke();
				this.con.fill();
			}


			/*
			// 中央
			this.drawCurve2(
				outside_hair_right,
				outside_hair_left,
				this.outside_hair_upper_cp1,
				this.outside_hair_upper_cp2
			);
			this.con.fill();
			*/
		}// forループ終わり

	}


	generateCoordinateRight(x)
	{
		return Math.floor(x * (this.forehead_right.y - this.cheek_end[0].y) / (this.forehead_right.x - this.cheek_end[0].x)); 
	}
	generateCoordinateLeft(x)
	{
		return Math.floor(x * (this.forehead_left.y - this.cheek_end[1].y) / (this.forehead_left.x - this.cheek_end[1].x));
	}

	drawSideHair3(hair_length, side_hair_bunch)
	{
		/* 髪の束の間隔 */
		let span = Math.floor(Math.abs(this.temple_left.x - this.forehead_left.x)/side_hair_bunch);

		/* この関数のメインループ */
		for (let j=0; j<4; j++)
		{
			this.side_hair_roots = [];
			this.side_hair_tips = [];
			this.side_hair_cp1 = [];
			this.side_hair_cp2 = [];


			/* 左サイド髪の座標生成 */
			for (let i=0; i<=side_hair_bunch; i++)
			{
				this.side_hair_roots[i] = {
					x: this.temple_left.x + i*span, 
					y: this.temple_left.y + this.generateCoordinateLeft(i*span)};
				this.side_hair_tips[i] = {
					x: this.temple_left.x + i*span + rand(-60, 0) , 
					y: this.temple_left.y + rand(0, 20) + hair_length};
				this.side_hair_cp1[i] = {
					x: this.temple_left.x + i*span/2 + rand(-5, 5) , 
					y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 1/3)};
				this.side_hair_cp2[i] = {
					x: this.temple_left.x + i*span/2 + rand(-1, 1) , 
					y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 2/3) };
			}


			/* 左サイド髪の描画 */
			this.con.beginPath();
			this.con.moveTo(this.side_hair_roots[0].x, this.side_hair_roots[0].y);
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";

			for (let i=0; i<side_hair_bunch; i++)
			{
				this.drawCurve2(
					this.side_hair_roots[i], 
					this.side_hair_tips[i], 
					this.side_hair_cp1[i], 
					this.side_hair_cp2[i] );

				if( i+1<side_hair_bunch)
				{
					this.drawCurve2(
						this.side_hair_tips[i+1], 
						this.side_hair_roots[i+1], 
						this.side_hair_cp2[i], 
						this.side_hair_cp1[i+1]);
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


			/* 配列の再初期化 */
			this.side_hair_roots = [];
			this.side_hair_tips = [];
			this.side_hair_cp1 = [];
			this.side_hair_cp2 = [];


			/* 右サイド髪の座標生成 */
			for (let i=0; i<=side_hair_bunch; i++)
			{
				this.side_hair_roots[i] = {
					x: this.forehead_right.x + i*span, 
					y: this.forehead_right.y + this.generateCoordinateRight(i*span)};
				this.side_hair_tips[i] = {
					x: this.forehead_right.x + i*span + rand(-60, 0) , 
					y: this.temple_right.y + rand(10, 20) + hair_length};
				this.side_hair_cp1[i] = {
					x: this.forehead_right.x + i*span/2 + rand(0, 10) , 
					y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 1/3)};
				this.side_hair_cp2[i] = {
					x: this.forehead_right.x + i*span/2 + rand(-10, 10), 
					y: this.side_hair_roots[i].y + this.sp(this.side_hair_roots[i].y, this.side_hair_tips[i].y, 2/3) };
			}

			/* 右サイド髪の描画 */
			this.con.beginPath();
			this.con.moveTo(this.side_hair_roots[0].x, this.side_hair_roots[0].y);
			for (let i=0; i<side_hair_bunch; i++)
			{
				/* */
				this.drawCurve2(
					this.side_hair_roots[i], 
					this.side_hair_tips[i], 
					this.side_hair_cp1[i], 
					this.side_hair_cp2[i] );
				this.con.lineWidth = 1;
				this.con.fillStyle = this.hair_color;
				this.con.strokeStyle = "#000";


				if( i+1<side_hair_bunch)
				{
					this.drawCurve2(
						this.side_hair_tips[i+1], 
						this.side_hair_roots[i+1], 
						this.side_hair_cp2[i], 
						this.side_hair_cp1[i+1]);
				}
				else
				{
					this.drawCurve2(
						this.side_hair_tips[this.side_hair_tips.length -1], // 毛先から
						this.temple_right, // 頬の端まで
						this.side_hair_cp2[this.side_hair_tips.length -1], // 毛先のCP
						this.side_hair_cp1[this.side_hair_tips.length -1]); // 毛先のCP
				}
			}
			this.con.stroke();
			this.con.fill();
		}// forループ終わり
	}

	drawSkinHead()
	{
		this.con.lineWidth = 1;
		this.con.globalAlpha = 1;
		this.con.fillStyle = this.hair_color;
		this.con.strokeStyle = this.hair_color;
		this.con.beginPath();
		this.drawCurve2(this.temple_right, this.temple_left, this.head_cp1, this.head_cp2, true );
		this.con.lineTo(this.forehead_left.x, this.forehead_left.y);
		this.drawCurve(this.forehead_left, this.forehead_right, this.top_of_head );
		this.con.lineTo(this.temple_right.x, this.temple_right.y);
		this.con.fill();
		//this.con.stroke();
	}


	drawLowerEyelid()
	{
		this.con.lineWidth = 1;
		this.con.fillStyle = "#fee";
		this.con.strokeStyle = "#ff0";
		this.con.beginPath();
		this.con.moveTo(this.upper_eyeline_end[1].x, this.upper_eyeline_end[1].y);
		this.con.lineTo(this.eye_end[1].x, this.eye_end[1].y);
		this.drawCurve(this.eye_end[1], this.eyelid_bottom[1], this.eyelid_bottom_cp3[1] );
		this.drawCurve(this.eyelid_bottom[1], this.eye_head[1], this.eyelid_bottom_cp1[1] );
		this.con.lineTo(this.eye_head[0].x, this.eye_head[0].y);
		this.drawCurve(this.eye_head[0], this.eyelid_bottom[0], this.eyelid_bottom_cp1[0] );
		this.drawCurve(this.eyelid_bottom[0], this.eye_end[0], this.eyelid_bottom_cp3[0] );
		this.con.lineTo(this.upper_eyeline_end[0].x, this.upper_eyeline_end[0].y);
		this.con.lineTo(this.temple_right.x, this.temple_right.y);
		this.drawCurve2(this.temple_right, this.chin_end, this.cheek_cp2[0], this.cheek_cp1[0] );
		this.drawCurve2(this.chin_end, this.chin_start, this.chin_cp2, this.chin_cp1);
		this.drawCurve2(this.chin_start, this.temple_left, this.cheek_cp1[1], this.cheek_cp2[1] );
		this.con.lineTo(this.upper_eyeline_end[1].x, this.upper_eyeline_end[1].y);
		this.con.fill();
		/*
		this.con.stroke();
		for (let i=0; i<2; i++)
		{
			this.fillR(this.upper_eyeline_end[i], "blue");
			this.fillR(this.cheek_cp1[i], "blue");
			this.fillR(this.cheek_cp2[i], "blue");
			this.fillR(this.eyelid_bottom_cp3[i], "red");
			this.fillR(this.eyelid_bottom_cp1[i], "orange");
			this.fillR(this.eye_end[i], "blue");
		}
		*/
	}

	drawEyelashes(number = 3)
	{
		let split = 10;
		let span = Math.floor(Math.abs(this.eyelash_end[0].x - this.eye_head[0].x, )/ split);
		let cp_span = Math.floor(Math.abs(this.eyelash_end[0].x - this.eyelash_cp[0].x ));

		this.con.lineWidth = 1;
		this.con.fillStyle = this.hair_color;
		this.con.strokeStyle = "#f00";
		this.con.beginPath();

		for (let i=0; i<2; i++)
		{
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#f00";
			this.con.beginPath();
			this.drawCurve2(this.eyelash_start[i], this.eyelash_end[i], this.eyelash_cp1[i], this.eyelash_cp2[i], true);
			this.drawCurve(this.eyelash_end[i], this.upper_eyeline_end2[i], this.eyelash_cp[i]);
			this.con.closePath();
			this.con.fill();
		}
	}


	drawEyeblow()
	{
		for (let i=0; i<2; i++)
		{
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#555";
			this.con.beginPath();
			this.drawCurve2(this.eyeblow_start[i], this.eyeblow_end[i], this.eyeblow_upper_cp1[i], this.eyeblow_upper_cp2[i], true );
			this.drawCurve2(this.eyeblow_end[i], this.eyeblow_start[i], this.eyeblow_lower_cp2[i], this.eyeblow_lower_cp1[i] );
			this.con.fill();
			this.con.stroke();
		}
	}




	/* 二重 */
	drawEyeline2()
	{
		for (let i=0; i<2; i++)
		{
			this.con.lineWidth = 1;
			this.con.fillStyle = "#888";
			this.con.strokeStyle = "#888";
			this.con.beginPath();
			this.drawCurve2(this.upper_eyeline_start2[i], this.upper_eyeline_end2[i], this.eyeline2_cp1[i], this.eyeline2_cp2[i], true);
			this.drawCurve2(this.upper_eyeline_end2[i], this.upper_eyeline_start2[i], this.eyeline2_cp4[i], this.eyeline2_cp3[i], false);
			this.con.stroke();
			this.con.fill();
		}
	}

	drawEyelid()
	{
		this.con.lineWidth = 1;
		this.con.fillStyle = "#fee";
		this.con.strokeStyle = "#f00";
		this.con.beginPath();
		this.drawCurve2(this.upper_eyeline_end[1], this.eye_head[1], this.upper_eyeline_cp2[1], this.upper_eyeline_cp1[1], true);
		this.con.lineTo(this.eye_head[0].x, this.eye_head[0].y);
		this.drawCurve2(this.eye_head[0], this.upper_eyeline_end[0], this.upper_eyeline_cp1[0], this.upper_eyeline_cp2[0]);
		this.con.lineTo(this.temple_right.x, this.temple_right.y);
		this.drawCurve2(this.cheek_end[0], this.cheek_end[1], this.head_cp1, this.head_cp2 );
		this.con.lineTo(this.upper_eyeline_end[1].x, this.upper_eyeline_end[1].y);
		this.con.fill();
	}

	drawIris()
	{
		let eye_position_rand = rand(-1,1);

		let eye_scale = 1.1;
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

			/* 瞳 */
			/* config */
			this.con.lineWidth = 4;
			this.con.fillStyle = this.iris_color;
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 0.9;

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

			/* config */
			this.con.globalAlpha = 1;
			this.con.lineWidth = 1;
			this.con.fillStyle = "#000";
			this.con.strokeStyle = "#000";

			/* 瞳の円2 */
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

			/* config */
			this.con.lineWidth = 1;
			this.con.fillStyle = "#fff";
			this.con.strokeStyle = "#fff";
			/* 瞳の反射 */
			this.con.save();
			this.con.translate(0, -(this.center.y*eye_highlight_scale - this.center.y));
			this.con.scale(1, eye_highlight_scale);
			this.con.beginPath();

			this.con.arc(
				this.eye_head[i].x + this.coordinates.eye.position.x*pn +10 + eye_position_rand , 
				this.center.y -10, 
				5,  
				Math.PI * 2, false);

			this.con.arc(
				this.eye_head[i].x + this.coordinates.eye.position.x*pn +2 + eye_position_rand, 
				this.center.y -5, 
				2, 
				Math.PI * 2, false);
			this.con.restore();
			this.con.fill();


			/* config */
			this.con.lineWidth = 1;
			this.con.globalAlpha = 0.8;
			this.con.fillStyle = "#fff";
			this.con.strokeStyle = "#fff";
			/* 瞳の反射 */
			this.con.save();
			this.con.translate(0, -(this.center.y*eye_highlight_scale - this.center.y));
			this.con.scale(1, eye_highlight_scale);
			this.con.beginPath();

			this.con.arc(
				this.eye_head[i].x + this.coordinates.eye.position.x*pn -10 + eye_position_rand , 
				this.center.y +10, 
				4,  
				Math.PI * 2, false);

			this.con.arc(
				this.eye_head[i].x + this.coordinates.eye.position.x*pn -2 + eye_position_rand, 
				this.center.y +12, 
				0, 
				Math.PI * 2, false);
			this.con.restore();
			this.con.fill();
			this.con.globalAlpha = 1;
		}
	}




	drawEyes()
	{
		this.drawIris();
		this.drawEyeline();
	}




	drawEyeline()
	{
		// 左右の座標は既に用意してある
		// 配列で管理しているのでループのインデックス番号を合わせて回す
		this.drawEyeShadow();
		for (let i=0; i<2; i++)
		{
			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";
			this.con.beginPath();
			this.drawCurve2(this.eye_head[i], this.upper_eyeline_end[i], this.upper_eyeline_cp1[i], this.upper_eyeline_cp2[i], true);
			this.con.lineTo(this.eye_end[i].x,this.eye_end[i].y);
			this.drawCurve2(this.eye_end[i], this.eye_head[i], this.lower_eyeline_cp2[i], this.upper_eyeline_cp1[i]);
			this.con.stroke();
			this.con.fill();
		}
	}




	drawEyeShadow()
	{
		let eye_shadow_start = [
			{x: this.eye_head[0].x, y: this.eye_head[0].y + 10},
			{x: this.eye_head[1].x, y: this.eye_head[1].y + 10},
		];
		let eye_shadow_end = [
			{x: this.upper_eyeline_end[0].x -10, y: this.eye_head[0].y + 10},
			{x: this.upper_eyeline_end[1].x +10, y: this.eye_head[1].y + 10},
		];
		let eye_shadow_cp1 = [
			{x: this.upper_eyeline_cp1[0].x, y: this.upper_eyeline_cp1[0].y + 10},
			{x: this.upper_eyeline_cp1[1].x, y: this.upper_eyeline_cp1[1].y + 10},
		];
		let eye_shadow_cp2 = [
			{x: this.upper_eyeline_cp2[0].x, y: this.upper_eyeline_cp2[0].y + 10},
			{x: this.upper_eyeline_cp2[1].x, y: this.upper_eyeline_cp2[1].y + 10},
		];
		for (let i=0; i<2; i++)
		{
			this.con.lineWidth = 1;
			this.con.fillStyle = "#000";
			this.con.strokeStyle = "#f00";
			this.con.beginPath();
			this.drawCurve2(this.eye_head[i], this.upper_eyeline_end[i], this.upper_eyeline_cp1[i], this.upper_eyeline_cp2[i], true);
			this.con.lineTo(eye_shadow_end[i].x, eye_shadow_end[i].y);
			this.drawCurve2(eye_shadow_end[i], eye_shadow_start[i], eye_shadow_cp2[i], eye_shadow_cp1[i]);
			this.con.globalAlpha = 0.3;
			this.con.fill();
			this.con.globalAlpha = 1;
		}
	}


	drawDebug()
	{
		this.con.lineWidth = 1;
		this.con.fillStyle = "#111";
		this.con.strokeStyle = "#111";
		this.con.font="16px 'ＭＳ　ゴシック'";

		this.con.fillText("クライアントマウス(X: "+ox + ",  Y: " + oy + ")", 
			50, 50 );
		this.con.fillText("中心マウス(X: "
			+(ox - this.center.x) + ",  Y: " + (oy - this.center.y) + ")", 
			50, 50 *2 );
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
			this.outoutside_back_hair_roots = [];
			this.outoutside_back_hair_tips = [];
			this.outoutside_back_hair_cp1 = [];
			this.outoutside_back_hair_cp2 = [];


			// 左サイド髪の座標生成
			for (let i=0; i<=hair_bunch; i++)
			{
				this.outside_back_hair_roots[i] = {
					x: this.outside_back_hair_left.x + i*span,// 外側からスパンを増やしていく。 
					y: this.outside_back_hair_left.y };// 高さは一定
				this.outside_back_hair_tips[i] = {
					x: this.outside_back_hair_left.x + i*span + rand(-60, 0),
					y: this.outside_back_hair_left.y + rand(0, 20) + hair_length};
				this.outside_back_hair_cp1[i] = {
					x: this.outside_back_hair_left.x + i*span/2 + rand(-5, 5), 
					y: this.outside_back_hair_roots[i].y + this.sp(this.outside_back_hair_roots[i].y, this.outside_back_hair_tips[i].y, 1/3)};
				this.outside_back_hair_cp2[i] = {
					x: this.outside_back_hair_left.x + i*span/2 + rand(-1, 1), 
					y: this.outside_back_hair_roots[i].y + this.sp(this.outside_back_hair_roots[i].y, this.outside_back_hair_tips[i].y, 2/3) };
			}

			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";

			this.con.beginPath();
			// 最初の根本に移動
			this.con.moveTo(this.outside_back_hair_roots[0].x, this.outside_back_hair_roots[0].y);

			for (let i=0; i<hair_bunch; i++)
			{
				// まず根本から毛先まで下ろす
				this.drawCurve2(
					this.outside_back_hair_roots[i], 
					this.outside_back_hair_tips[i], 
					this.outside_back_hair_cp1[i], 
					this.outside_back_hair_cp2[i] );

				// 配列の最後の一つ前まで
				if( i+1<hair_bunch)
				{
					// 毛先から根本に向かってカーブを引く
					this.drawCurve2(
						this.outside_back_hair_tips[i+1], 
						this.outside_back_hair_roots[i+1], 
						this.outside_back_hair_cp2[i], 
						this.outside_back_hair_cp1[i+1]);
				}
				// 配列の最後
				else
				{
					// 配列の最後は
					this.drawCurve2(
						this.outside_back_hair_tips[this.outside_back_hair_tips.length -1], 
						this.temple_left, 
						this.outside_back_hair_cp2[this.outside_back_hair_tips.length -1], 
						this.outside_back_hair_cp1[this.outside_back_hair_tips.length -1]);
				}
			}

			this.outside_back_hair_roots = [];
			this.outside_back_hair_tips = [];
			this.outside_back_hair_cp1 = [];
			this.outside_back_hair_cp2 = [];


			for (let i=0; i<=hair_bunch; i++)
			{
				this.outside_back_hair_roots[i] = {
					x: this.temple_right.x + i*span, 
					y: this.temple_right.y };
				this.outside_back_hair_tips[i] = {
					x: this.temple_right.x + i*span + rand(-60, 0), 
					y: this.temple_right.y + rand(10, 20) + hair_length};
				this.outside_back_hair_cp1[i] = {
					x: this.temple_right.x + i*span/2 + rand(0, 10), 
					y: this.outside_back_hair_roots[i].y + this.sp(this.outside_back_hair_roots[i].y, this.outside_back_hair_tips[i].y, 1/3)};
				this.outside_back_hair_cp2[i] = {
					x: this.temple_right.x + i*span/2 + rand(-10, 10), 
					y: this.outside_back_hair_roots[i].y + this.sp(this.outside_back_hair_roots[i].y, this.outside_back_hair_tips[i].y, 2/3) };
			}

			this.con.lineTo(this.outside_back_hair_roots[0].x, this.outside_back_hair_roots[0].y);

			for (let i=0; i<hair_bunch; i++)
			{
				this.drawCurve2(
					this.outside_back_hair_roots[i], 
					this.outside_back_hair_tips[i], 
					this.outside_back_hair_cp1[i], 
					this.outside_back_hair_cp2[i] 
				);

				this.con.lineWidth = 1;
				this.con.fillStyle = this.hair_color;
				this.con.strokeStyle = "#000";


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
						this.outside_back_hair_tips[this.outside_back_hair_tips.length -1], // 毛先から
						this.outside_back_hair_right, // 右の後ろ髪の外側
						this.outside_back_hair_cp2[this.outside_back_hair_tips.length -1], // 毛先のCP
						this.outside_back_hair_cp1[this.outside_back_hair_tips.length -1]); // 毛先のCP
				}
			}
			this.drawCurve2(
				this.outside_back_hair_right, // 毛先から
				this.outside_back_hair_left, // 右の後ろ髪の外側
				this.outside_back_head_cp1, // 毛先のCP
				this.outside_back_head_cp2); // 毛先のCP

			this.con.stroke();
			this.con.fill();
		}// forループ終わり
	}// drawOutsideBackHair




	/*
	 * 後ろ髪
	 */
	drawBackHair(hair_bunch, hair_length) {

		this._initBackHairArrays();

		/* 前髪の間隔 */
		let span = (this.temple_right.x - this.temple_left.x)/hair_bunch;

		for (let j=0; j<=2; j++)
		{
			let hair_length_plus = 0;

			/* 座標生成 */
			/*
			 * 根本1から真下に下ろした毛先1
			 * 毛先1から毛先2にラインを引く
			 * 毛先2から真上の根本2にカーブを描く
			 * 以下繰り返し
			 */
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
						y: this.temple_left.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
				}
				else if (i===hair_bunch)// 最後
				{
					this.back_hair_roots[i] = {// 根本の座標
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.temple_left.x,
						y: this.temple_left.y};

					// 毛先の座標生成
					this.back_hair_tips[i] = {
						x: this.temple_right.x + rand(-60, 2), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.temple_left.y + hair_length + hair_length_plus};

				}
				else// 間
				{
					this.back_hair_roots[i] = {
						x: this.temple_left.x + i*span, 
						y: this.temple_left.y + rand(-10,20)};// 毛先の高さは少し乱数を足す

					// 毛先の座標生成
					this.back_hair_tips[i] = {
						x: this.temple_left.x + i*span + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.temple_left.y + hair_length + hair_length_plus};
				}

				// 制御点1
				this.back_hair_cp1[i] = {
					x: this.temple_left.x + i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
					y: this.back_hair_roots[i].y + this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 1/4)};
				// 制御点2
				this.back_hair_cp2[i] = {
					x: this.temple_left.x + i*span + hair_rand, 
					y: this.back_hair_roots[i].y + this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 2/4) };
			}


			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 0.4;

			this.con.beginPath();
			this.con.moveTo(this.back_hair_roots[0].x, this.back_hair_roots[0].y);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(this.back_hair_roots[i], this.back_hair_tips[i], this.back_hair_cp1[i], this.back_hair_cp2[i]);

				if( i+1<hair_bunch)// 最大値-1の間
				{
					this.con.lineTo(this.back_hair_tips[i+1].x -10, this.back_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く

					this.drawCurve2(
						this.back_hair_tips[i+1], 
						this.back_hair_roots[i+1], 
						this.back_hair_cp2[i+1], 
						this.back_hair_cp1[i+1]);
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



	drawBackHair2(hair_bunch, hair_length) {

		this._initBackHairArrays();

		/* 前髪の間隔 */
		let span = (this.temple_right.x - this.temple_left.x)/hair_bunch;

		for (let j=0; j<=2; j++)
		{
			let hair_length_plus = 0;

			/* 座標生成 */
			/*
			 * 根本1から真下に下ろした毛先1
			 * 毛先1から毛先2にラインを引く
			 * 毛先2から真上の根本2にカーブを描く
			 * 以下繰り返し
			 */
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
						x: this.temple_left.x + i*span +span/2 + rand(-60, 1), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.temple_left.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
				}
				else if (i===hair_bunch)// 最後
				{
					this.back_hair_roots[i] = {// 根本の座標
						// ループが進むにつれて指定したスパンごとにx座標が増える
						x: this.temple_left.x,
						y: this.temple_left.y};

					// 毛先の座標生成
					this.back_hair_tips[i] = {
						x: this.temple_right.x +span/2 + rand(-60, 2), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.temple_left.y + hair_length + hair_length_plus};
				}
				else// 間
				{
					this.back_hair_roots[i] = {
						x: this.temple_left.x + i*span, 
						y: this.temple_left.y + rand(-10,20)};// 毛先の高さは少し乱数を足す

					// 毛先の座標生成
					this.back_hair_tips[i] = {
						x: this.temple_left.x + i*span +span/2  + rand(-60, 10), // 毛先のx座標は根本の座標から前後に揺らす
						y: this.temple_left.y + hair_length + hair_length_plus};
				}

				// 制御点1
				this.back_hair_cp1[i] = {
					x: this.temple_left.x + i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
					y: this.back_hair_roots[i].y + this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 1/4)};
				// 制御点2
				this.back_hair_cp2[i] = {
					x: this.temple_left.x + i*span + hair_rand, 
					y: this.back_hair_roots[i].y + this.sp(this.back_hair_roots[i].y, this.back_hair_tips[i].y, 2/4) };
			}


			this.con.lineWidth = 1;
			this.con.fillStyle = this.hair_color;
			this.con.strokeStyle = "#000";
			this.con.globalAlpha = 0.4;

			this.con.beginPath();
			this.con.moveTo(this.back_hair_roots[0].x, this.back_hair_roots[0].y);

			for (let i=0; i<hair_bunch; i++)
			{
				// 上から下に下ろす
				this.drawCurve2(this.back_hair_roots[i], this.back_hair_tips[i], this.back_hair_cp1[i], this.back_hair_cp2[i]);

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
		this.con.lineWidth = 1;
		this.con.fillStyle = "#fee";
		this.con.strokeStyle = "#000";
		this.con.beginPath();
		this.drawCurve2(this.neck_start[0], this.neck_end[0], this.neck_cp1[0],this.neck_cp2[0], true);
		this.con.lineTo(this.neck_end[1].x, this.neck_end[1].y);
		this.drawCurve2(this.neck_end[1], this.neck_start[1], this.neck_cp2[1],this.neck_cp1[1]);
		this.con.fill();
		this.con.fillStyle = "#000";
		this.con.globalAlpha = 0.1;
		this.con.fill();
		this.con.globalAlpha = 1;
		this.con.stroke();
	}



	drawNeckShadow()
	{
		this.con.lineWidth = 1;
		this.con.fillStyle = "#000";
		this.con.strokeStyle = "#000";
		this.con.beginPath();
		this.con.moveTo(this.neck_start[0].x, this.neck_start[0].y);
		this.con.lineTo(this.neck_start2[0].x, this.neck_start2[0].y);
		this.drawCurve2(this.neck_start2[0], this.neck_start2[1], this.neck_shadow_cp1, this.neck_shadow_cp2);
		this.con.lineTo(this.neck_start[1].x, this.neck_start[1].y);
		this.con.globalAlpha = 0.2;
		this.con.fill();
		this.con.globalAlpha = 1;
	}



	drawEar()
	{
		for (let i=0; i<2; i++)
		{
			this.con.lineWidth = 1;
			this.con.fillStyle = "#fee";
			this.con.strokeStyle = "#000";
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
		this.con.lineWidth = 3;
		this.con.fillStyle = "#fee";
		this.con.strokeStyle = "#000";
		this.con.beginPath();

		// あごの左からあごの右
		this.drawCurve2(this.chin_start, this.chin_end, this.chin_cp1, this.chin_cp2, true );

		// あごの右からこめかみ
		//this.drawCurve2(this.cheek_start[0], this.cheek_end[0], this.cheek_cp1[0], this.cheek_cp2[0], false );
		this.drawCurve2(this.chin_end, this.temple_right, this.cheek_cp1[0], this.cheek_cp2[0], false );

		// 右のこめかみから頭を経由して左のこめかみまで
		//this.drawCurve2(this.cheek_end[0], this.cheek_end[1], this.head_cp1, this.head_cp2 );
		this.drawCurve2(this.temple_right, this.temple_left, this.head_cp1, this.head_cp2 );

		// 左のこめかみから頬まで
		//this.drawCurve2(this.cheek_end[1], this.cheek_start[1], this.cheek_cp2[1], this.cheek_cp1[1], false );
		this.drawCurve2(this.temple_left, this.chin_start, this.cheek_cp2[1], this.cheek_cp1[1], false );
		this.con.stroke();
		this.con.fill();
	}



	drawWhiteEyes()
	{
		for (let i=0; i<2; i++)
		{
			this.con.lineWidth = 1;
			this.con.fillStyle = "#fff";
			this.con.strokeStyle = "#f00";
			this.con.beginPath();
			this.drawCurve(this.lower_eyelid_start[i], this.eye_end[i], this.lower_eyelid_cp1[i], true);
			this.drawCurve2(this.eye_end[i], this.eye_head[i], this.lower_eyeline_cp2[i], this.upper_eyeline_cp1[i]);
			this.con.fill();
			this.drawCurve(this.eye_head[i], this.eyelid_bottom[i], this.eyelid_bottom_cp1[i] );
			this.con.fill();
		}
	}



	drawNose()
	{
		this.con.lineWidth = 1;
		this.con.fillStyle = "#744";
		this.con.strokeStyle = "#744";
		this.con.beginPath();
		this.con.moveTo(this.nose_top.x, this.nose_top.y);
		this.con.lineTo(this.nose_bottom.x, this.nose_bottom.y);
		this.con.stroke();
		this.con.beginPath();
		this.drawCurve2(this.nose_top, this.nose_bottom, this.nose_cp1, this.nose_cp2);
		this.con.fill();
	}



	drawMouth()
	{
		this.con.lineWidth = 1;
		this.con.fillStyle = "#000";
		this.con.strokeStyle = "#aaa";
		this.con.beginPath();
		this.drawCurve2(this.mouth_start, this.mouth_end, this.mouth_cp1, this.mouth_cp2, true);
		this.con.stroke();
		//this._drawLowerLipShadow();
	}



	_drawLowerLipShadow()
	{
		this.con.lineWidth = 1;
		this.con.fillStyle = "#000";
		this.con.strokeStyle = "#000";
		this.con.beginPath();
		this.con.globalAlpha = 0.2;
		this.drawCurve2(this.lower_lip_start, this.lower_lip_end, this.lower_lip_cp1, this.lower_lip_cp2, true);
		this.drawCurve2(this.lower_lip_end, this.lower_lip_start, this.lower_lip_cp4, this.lower_lip_cp3);
		this.con.fill();
		this.con.globalAlpha = 1;
	}


	drawCenter ()
	{
		/* config */
		this.con.lineWidth = 1;
		this.con.fillStyle = "#f00";
		this.con.strokeStyle = "#f00";

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
