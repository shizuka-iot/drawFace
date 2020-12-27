
/* マウス用の座標 */

let px;
let py;
let ox;
let oy;


/* 中心座標 */

let center = { x: can.width/2, y: can.height/2 + 40 };
//let hair_color = "#660033";
//let hair_color = "#bb8";
let hair_color = "#222";


/* プラスかマイナス */
let pn = 0;


/* 目頭 */
let eye_head = [
	{ x: center.x + 35, y: center.y},
	{ x: center.x - 35, y: center.y},
];

/* アイライン */
let upper_eyeline_end = [
	{ x: eye_head[0].x + 100, y: center.y},
	{ x: eye_head[1].x - 100, y: center.y},
];
/* アッパーアイラインCP1 */
let upper_eyeline_cp1 = [
	{ 
		x: eye_head[0].x + Math.floor(Math.abs(eye_head[0].x - upper_eyeline_end[0].x)/3), 
		y: center.y -30},
	{ 
		x: eye_head[1].x - Math.floor(Math.abs(eye_head[1].x - upper_eyeline_end[1].x)/3), 
		y: center.y -30},
];
/* アッパーアイラインCP2 */
let upper_eyeline_cp2 = [
	{ 
		x: eye_head[0].x + Math.floor(Math.abs(eye_head[0].x - upper_eyeline_end[0].x)*2/3), 
		y: center.y -30},
	{ 
		x: eye_head[1].x - Math.floor(Math.abs(eye_head[1].x - upper_eyeline_end[1].x)*2/3), 
		y: center.y-30},
];
/* ロウワーアイラインCP1 */
let lower_eyeline_cp1 = [
	{ 
		x: eye_head[0].x + Math.floor(Math.abs(eye_head[0].x - upper_eyeline_end[0].x)/3), 
		y: center.y -30},
	{ 
		x: eye_head[1].x - Math.floor(Math.abs(eye_head[1].x - upper_eyeline_end[1].x)/3), 
		y: center.y -30},
];
/* ロウワーアイラインCP2 */
let lower_eyeline_cp2 = [
	{ x: upper_eyeline_end[0].x +10 , y: center.y -25},
	{ x: upper_eyeline_end[1].x -10, y: center.y -25},
];
/* アイライン(目頭) */
let upper_eyeline_start = [
	{ x: eye_head[0].x, y: eye_head[0].y},
	{ x: eye_head[1].x, y: eye_head[1].y},
];
/* 目尻 */
let eye_end = [
	{ x: upper_eyeline_end[0].x - 20, y: center.y + 20},
	{ x: upper_eyeline_end[1].x + 20, y: center.y + 20},
];

let upper_eyeline_start2 = [
	{x: eye_head[0].x, y: eye_head[0].y - 10},
	{x: eye_head[1].x, y: eye_head[1].y - 10},
];
let upper_eyeline_end2 = [
	{ x: upper_eyeline_end[0].x, y: center.y -10},
	{ x: upper_eyeline_end[1].x, y: center.y -10},
];
/* アイライン2CP1 */
let eyeline2_cp1 = [
	{ x: upper_eyeline_cp1[0].x, y: upper_eyeline_cp1[0].y -5},
	{ x: upper_eyeline_cp1[1].x, y: upper_eyeline_cp1[1].y -5},
];
/* アイライン2CP2 */
let eyeline2_cp2 = [
	{ x: upper_eyeline_cp2[0].x, y: upper_eyeline_cp2[0].y -5},
	{ x: upper_eyeline_cp2[1].x, y: upper_eyeline_cp2[1].y -5},
];
/* アイライン2CP1 */
let eyeline2_cp3 = [
	{ x: upper_eyeline_cp1[0].x, y: eyeline2_cp1[0].y -2},
	{ x: upper_eyeline_cp1[1].x, y: eyeline2_cp1[1].y -2},
];
/* アイライン2CP2 */
let eyeline2_cp4 = [
	{ x: upper_eyeline_cp2[0].x, y: eyeline2_cp2[0].y -2},
	{ x: upper_eyeline_cp2[1].x, y: eyeline2_cp2[1].y -2},
];

/* まつげ */
let eyelash_start = [
	{x : eye_end[0].x, y: eye_end[0].y},
	{x : eye_end[1].x, y: eye_end[1].y},
]
let eyelash_end = [
	{x : upper_eyeline_end[0].x + 10, y: upper_eyeline_end[0].y},
	{x : upper_eyeline_end[1].x - 10, y: upper_eyeline_end[1].y},
]
let eyelashes = [
	{}
];
let eyelash_cp1 = [
	{
		x: eyelash_start[0].x + Math.floor(Math.abs(eyelash_start[0].x - eyelash_end[0].x)/2), 
		y: eyelash_end[0].y + Math.floor(Math.abs(eyelash_start[0].y - eyelash_end[0].y)/2 -5)
	},
	{
		x: eyelash_start[1].x - Math.floor(Math.abs(eyelash_start[1].x - eyelash_end[1].x)/2), 
		y: eyelash_end[1].y + Math.floor(Math.abs(eyelash_start[1].y - eyelash_end[1].y)/2 -5)
	},
]
let eyelash_cp2 = [
	{
		x: eyelash_start[0].x + Math.floor(Math.abs(eyelash_start[0].x - eyelash_end[0].x)/2), 
		y: eyelash_end[0].y + Math.floor(Math.abs(eyelash_start[0].y - eyelash_end[0].y)/2 -5)
	},
	{
		x: eyelash_start[1].x - Math.floor(Math.abs(eyelash_start[1].x - eyelash_end[1].x)/2), 
		y: eyelash_end[1].y + Math.floor(Math.abs(eyelash_start[1].y - eyelash_end[1].y)/2 -5)
	},
]
let eyelash_cp = [
	{x: upper_eyeline_end[0].x -10 , y: eyelash_end[0].y},
	{x: upper_eyeline_end[1].x +10, y: eyelash_end[1].y},
];

let eyelid_cp1 = [
	{x: upper_eyeline_start[0].x, y: upper_eyeline_start[0].y - 60},
	{x: upper_eyeline_start[1].x, y: upper_eyeline_start[1].y - 60},
];
let eyelid_cp2 = [
	{x: upper_eyeline_end[0].x, y: upper_eyeline_end[0].y - 60},
	{x: upper_eyeline_end[1].x, y: upper_eyeline_end[1].y - 60},
];

let lower_eyelid_start = [
	{x: eye_head[0].x + 10, y: eye_end[0].y},
	{x: eye_head[1].x - 10, y: eye_end[1].y},
];
let lower_eyelid_cp1 = [
	{
		x: lower_eyelid_start[0].x + Math.floor(Math.abs(lower_eyelid_start[0].x - eye_end[0].x))*1/3, 
		y: eye_end[0].y + 30},
	{
		x: lower_eyelid_start[1].x - Math.floor(Math.abs(lower_eyelid_start[1].x - eye_end[1].x))*1/3, 
		y: eye_end[1].y + 30},
];
let lower_eyelid_cp2 = [
	{
		x: lower_eyelid_start[0].x + Math.floor(Math.abs(lower_eyelid_start[0].x - eye_end[0].x))*2/3, 
		y: eye_end[0].y + 30},
	{
		x: lower_eyelid_start[1].x - Math.floor(Math.abs(lower_eyelid_start[1].x - eye_end[1].x))*2/3, 
		y: eye_end[1].y + 30},
];
let lower_eyelid_cp3 = [
	{x: lower_eyelid_start[0].x , y: lower_eyelid_start[0].y + 60},
	{x: lower_eyelid_start[1].x , y: lower_eyelid_start[1].y + 60},
];
let lower_eyelid_cp4 = [
	{x: eye_end[0].x , y: eye_end[0].y + 60},
	{x: eye_end[1].x , y: eye_end[1].y + 60},
];

/*************************************************************
 * 鼻
*************************************************************/
let nose_top = {x:center.x, y:center.y +90};
let nose_bottom = {x:center.x, y:nose_top.y + 12};
let nose_cp1 = {
	x:nose_top.x + 5 , 
	y:nose_top.y + Math.floor(Math.abs(nose_top.y - nose_bottom.y))/2 };
let nose_cp2 = {
	x:nose_top.x , 
	y:nose_top.y - Math.floor(Math.abs(nose_top.y - nose_bottom.y)*2/3) };



let mouth_start = {x: center.x - 30, y: center.y + 130};
let mouth_end = {x: center.x + 30, y: center.y + 130};
let mouth_cp1 = {
	x: mouth_start.x + Math.floor(Math.abs(mouth_start.x - mouth_end.x)*1/3), 
	y: mouth_start.y - 2};
let mouth_cp2 = {
	x: mouth_start.x + Math.floor(Math.abs(mouth_start.x - mouth_end.x)*2/3), 
	y: mouth_start.y - 2};

let chin_start = {x: center.x - 30, y: mouth_start.y + 50};
let chin_end = {x: center.x + 30, y: mouth_start.y + 50};
let chin_cp1 = {
	x:chin_start.x + sp(chin_start.x, chin_end.x, 1/3), 
	y: chin_start.y + 10};
let chin_cp2 = {
	x:chin_start.x + sp(chin_start.x, chin_end.x, 2/3), 
	y: chin_start.y + 10};

let cheek_start = [
	{x: chin_end.x, y: chin_end.y},
	{x: chin_start.x, y: chin_start.y},
];
let cheek_end = [
	{x: upper_eyeline_end[0].x + 20,y: upper_eyeline_end[0].y},
	{x: upper_eyeline_end[1].x - 20,y: upper_eyeline_end[1].y},
];
let cheek_cp1 = [
	{
		x: cheek_start[0].x + sp(cheek_start[0].x, cheek_end[0].x, 1/3), 
		y: cheek_start[0].y - sp(cheek_start[0].y, cheek_end[0].y, 1/8)},
	{
		x: cheek_start[1].x - sp(cheek_start[1].x, cheek_end[1].x, 1/3), 
		y:cheek_start[1].y - sp(cheek_start[1].y, cheek_end[1].y, 1/8)},
];
let cheek_cp2 = [
	{
		x: cheek_start[0].x + sp(cheek_start[0].x, cheek_end[0].x, 4/5), 
		y: cheek_start[0].y - sp(cheek_start[0].y, cheek_end[0].y, 2/8)},
	{
		x: cheek_start[1].x - sp(cheek_start[1].x, cheek_end[1].x, 4/5), 
		y:cheek_start[1].y - sp(cheek_start[1].y, cheek_end[1].y, 2/8)},
];

let top_of_head = {x: center.x, y: center.y - 320};
let head_cp1 = {x: cheek_end[0].x + 60, y:top_of_head.y};
let head_cp2 = {x: cheek_end[1].x - 60, y:top_of_head.y};

let ear_start = [
	{x: upper_eyeline_end[0].x, y: upper_eyeline_end[0].y - 20},
	{x: upper_eyeline_end[1].x, y: upper_eyeline_end[1].y - 20},
];
let ear_end = [
	{x: eye_end[0].x, y: eye_end[0].y + 50},
	{x: eye_end[1].x, y: eye_end[1].y + 50},
];
let earlobe_start = [
	{
		x: ear_start[0].x + 30, 
		y: ear_start[0].y + sp(ear_start[0].y, ear_end[0].y, 2/3) },
	{
		x: ear_start[1].x - 30, 
		y: ear_start[1].y + sp(ear_start[1].y, ear_end[1].y, 2/3) },
];
let inner_ear_start = [
	{x: ear_start[0].x -10, y: ear_start[0].y + 10},
	{x: ear_start[1].x +10, y: ear_start[1].y + 10},
];
let inner_ear_end = [
	{x: earlobe_start[0].x -10, y: earlobe_start[0].y - 10 },
	{x: earlobe_start[1].x +10, y: earlobe_start[1].y - 10 },
];
let ear_cp1 = [
	{
		x: earlobe_start[0].x + sp(ear_start[0].x ,earlobe_start[0].x, 1), 
		y: ear_start[0].y - 20},
	{
		x: earlobe_start[1].x - sp(ear_start[1].x ,earlobe_start[1].x, 1), 
		y: ear_start[1].y - 20},
];
let ear_cp2 = [
	{
		x: earlobe_start[0].x + sp(ear_start[0].x ,earlobe_start[0].x, 1), 
		y: ear_start[0].y + sp(ear_start[0].y ,earlobe_start[0].y, 1/2)},
	{
		x: earlobe_start[1].x - sp(ear_start[1].x ,earlobe_start[1].x, 1), 
		y: ear_start[1].y + sp(ear_start[1].y ,earlobe_start[1].y, 1/2)},
];
let inner_ear_cp1 = [
	{
		x: inner_ear_end[0].x + sp(inner_ear_start[0].x ,inner_ear_end[0].x, 1), 
		y: inner_ear_start[0].y - 20},
	{
		x: inner_ear_end[1].x - sp(inner_ear_start[1].x ,inner_ear_end[1].x, 1), 
		y: inner_ear_start[1].y - 20},
];
let inner_ear_cp2 = [
	{
		x: inner_ear_end[0].x + sp(inner_ear_start[0].x ,inner_ear_end[0].x, 1), 
		y: inner_ear_start[0].y + sp(inner_ear_start[0].y ,inner_ear_end[0].y, 1/2)},
	{
		x: inner_ear_end[1].x - sp(inner_ear_start[1].x ,inner_ear_end[1].x, 1), 
		y: inner_ear_start[1].y + sp(inner_ear_start[1].y ,inner_ear_end[1].y, 1/2)},
];
let earlobe_cp1 = [
	{x: earlobe_start[0].x, y: ear_end[0].y},
	{x: earlobe_start[1].x, y: ear_end[1].y},
];
let earlobe_cp2 = [];

let neck_start = [
	{x: mouth_end.x + 40, y: mouth_end.y},
	{x: mouth_start.x - 40, y: mouth_start.y},
];
let neck_end = [
	{x: neck_start[0].x + 150, y: mouth_end.y + 150},
	{x: neck_start[1].x - 150, y: mouth_end.y + 150},
];


let neck_start2 = [
	{x: neck_start[0].x, y: neck_start[0].y + 50},
	{x: neck_start[1].x, y: neck_start[1].y + 50},
];
let neck_end2 = [
	{x: neck_end[0].x, y: neck_end[0].y + 50},
	{x: neck_end[1].x, y: neck_end[1].y + 50},
];

let neck_terminal1 = [
	{x: neck_start[0].x, y: neck_start[0].y - 150},
	{x: neck_start[1].x, y: neck_start[1].y - 150},
];
let neck_terminal2 = [
	{x: neck_end[0].x, y: neck_terminal1[0].y },
	{x: neck_end[1].x, y: neck_terminal1[1].y },
];
let neck_cp1 = [
	{x: neck_start[0].x , y: neck_end[0].y -10},
	{x: neck_start[1].x , y: neck_end[1].y -10},
];
let neck_cp2 = [
	{x: neck_start[0].x  , y: neck_end[0].y -10},
	{x: neck_start[1].x , y: neck_end[1].y -10},
];
let neck_shadow_cp1 = {
	x: neck_start[1].x + sp(neck_start[1].x, neck_end[1].x, 2/3) , 
	y: neck_start2[1].y +60
};
let neck_shadow_cp2 = {
		x: neck_start[1].x + sp(neck_start[1].x, neck_end[1].x, 1/3) , 
		y: neck_start2[1].y +60
};

let lower_lip_start = {x: center.x - 20, y:mouth_start.y +10};
let lower_lip_end = {x: center.x + 20, y:mouth_start.y +10};
let lower_lip_cp1 = {
	x: lower_lip_start.x + sp(lower_lip_start.x, lower_lip_end.x, 1/3), 
	y: lower_lip_start.y + 5};
let lower_lip_cp2 = {
	x: lower_lip_start.x + sp(lower_lip_start.x, lower_lip_end.x, 2/3), 
	y: lower_lip_start.y + 5};
let lower_lip_cp3 = {
	x: lower_lip_start.x + sp(lower_lip_start.x, lower_lip_end.x, 1/3), 
	y: lower_lip_start.y + 10};
let lower_lip_cp4 = {
	x: lower_lip_start.x + sp(lower_lip_start.x, lower_lip_end.x, 2/3), 
	y: lower_lip_start.y + 10};

let forehead_right = {
	x: cheek_end[0].x - sp(cheek_end[0].y, cheek_start[0].y, 1/6), 
	y: cheek_end[0].y - 140};
let forehead_left = {
	x: cheek_end[1].x + sp(cheek_end[1].y, cheek_start[1].y, 1/6), 
	y: cheek_end[1].y - 140};

let front_hair_roots = [];
let front_hair_tips = [];
let front_hair_cp1 = [];
let front_hair_cp2 = [];

let back_hair_roots = [];
let back_hair_tips = [];
let back_hair_cp1 = [];
let back_hair_cp2 = [];

let side_hair_roots = [];
let side_hair_tips = [];
let side_hair_cp1 = [];
let side_hair_cp2 = [];

let outside_hair_roots = [];
let outside_hair_tips = [];
let outside_hair_cp1 = [];
let outside_hair_cp2 = [];

let outside_hair_upper_cp1 = {
	x: head_cp1.x -10,
	y: head_cp1.y -20,
};
let outside_hair_upper_cp2 = {
	x: head_cp2.x +10,
	y: head_cp2.y -20,
};

let temple = [
	{x: cheek_end[1].x, y: cheek_end[1].y },// 左
	{x: cheek_end[0].x, y: cheek_end[0].y },// 右
];
let temple_left =	{x: cheek_end[1].x, y: cheek_end[1].y };
let temple_right = {x: cheek_end[0].x, y: cheek_end[0].y };

let outside_back_hair_roots = [];
let outside_back_hair_tips = [];
let outside_back_hair_cp1 = [];
let outside_back_hair_cp2 = [];

let outside_back_hair_left = {
	x: center.x - 190,
	y: center.y,
};
let outside_back_hair_right = {
	x: center.x + 190,
	y: center.y,
};
let outside_back_head_cp1 = {
	x: head_cp1.x -10,
	y: head_cp1.y -30,
};
let outside_back_head_cp2 = {
	x: head_cp2.x +10,
	y: head_cp2.y -30,
};
