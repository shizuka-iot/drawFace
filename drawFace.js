"use strict";

const can = document.getElementById('can');
const con = can.getContext("2d");

can.width = 800;
can.height = 640;

let center = { x: can.width/2, y: can.height/2 };

let px;
let py;
let ox;
let oy;


/****************************************************
 * イベントリスナー
****************************************************/
// マウスイベント。イベント情報はグローバル変数に代入。
function mouseMove(e)
{
	// オフセットはターゲットエレメントの左上を0,0としてそこからのマウスの座標を取得。
	px = e.pageX;
	py = e.pageY;
	ox = e.offsetX;
	oy = e.offsetY;
}
window.addEventListener('mousemove', mouseMove, false);


function rand(min, max)
{
	return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}

function drawDebug()
{
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#111";
	con.strokeStyle = "#111";
	con.font="16px 'ＭＳ　ゴシック'";

	/* デバッグ情報表示 */
	con.fillText("マウス(X: "+ox + ",  Y: " + oy + ")", 50, 50 );
	con.fillText("中心マウス(X: "+(ox - center.x) + ",  Y: " + (oy - center.y) + ")", 50, 50 *2 );

}

function update()
{
}
function draw()
{
	con.clearRect(0, 0, can.width, can.height);
	drawDebug();
	drawCenter();
	drawEyes();
	drawNose();
	drawMouth(true);
	drawMouth(false);
}

function mainLoop()
{
	requestAnimationFrame(mainLoop);
	update();
	draw();
}
window.onload = ()=>{
	//mainLoop();
	update();
	draw();
}

//function _drawEye ( bool )
//{
//	/* プラスかマイナスか */
//	let pn = 1;
//	bool ? pn = 1: pn = -1;
//
//	/* config */
//	con.lineWidth = 1;
//	con.fillStyle = "#111";
//	con.strokeStyle = "#111";
//
//	/* パスを描画 */
//
//}

function fillR( arr, color = "#000" )
{
	con.fillStyle = color;
	con.fillRect(arr.x, arr.y, 4, 4);
}

function drawCurve(start, end, cp)
{
	con.moveTo(start.x, start.y);
	con.quadraticCurveTo(cp.x, cp.y, end.x, end.y)
}
function drawCurve2(start, end, cp1, cp2)
{
	con.moveTo(start.x, start.y);
	con.bezierCurveTo(
		cp1.x, cp1.y,
		cp2.x, cp2.y,
		end.x, end.y);
}

let upper_cp2_rand = {x: rand(1,10), y:rand(4, 10) };
let upper_cp1_rand = {x: rand(20,50), y:rand(4, 10) };
let eye_right_cp1_rand = {x: rand(10, 20), y:rand(6, 10)};
let eye_right_cp2_rand = {x: rand(10, 20), y:rand(20, 60)};
let eye_left_cp1_rand = {x: rand(1, 2), y:rand(6, 10)};
let eye_left_cp2_rand = {x: rand(1, 2), y:rand(20, 60)};
let eye_end_rand = {x: rand(10, 20), y: rand(35, 40)};

let nose_top = {x:center.x, y:center.y+120};
let nose_bottom = {x:center.x, y:nose_top.y + 12};

let mouth_center = {x: center.x, y: nose_bottom.y + 50};

function drawMouth(bool)
{
	let pn;
	bool ? pn = 1: pn = -1;
	let mouth_under_end = {x: mouth_center.x + 30 * pn, y: mouth_center.y - 5};
	let mouth_upper_end = {x: mouth_center.x + 30 * pn, y: mouth_center.y - 6};
	let mouth_under_cp = {x: center.x + 15 * pn, y: nose_bottom.y + 50};
	let mouth_end_cp1 = {x: mouth_under_end.x + 10 * pn, y: mouth_under_end.y};
	let mouth_end_cp2 = {x: mouth_upper_end.x + 10 * pn, y: mouth_upper_end.y - 10};

	fillR(mouth_end_cp1, "red");
	fillR(mouth_end_cp2, "#000");
	fillR(mouth_under_cp, "green");

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";

	drawCurve(mouth_center, mouth_under_end, mouth_under_cp );
	drawCurve2(mouth_under_end, mouth_upper_end, mouth_end_cp1, mouth_end_cp2 );
	drawCurve2(mouth_upper_end, mouth_center,   mouth_under_cp, mouth_under_cp );
	con.fill();
	

}

function drawNose()
{
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#744";
	con.strokeStyle = "#744";

	con.moveTo(nose_top.x, nose_top.y);
	con.lineTo(nose_bottom.x, nose_bottom.y);
	con.lineTo(nose_top.x-6, nose_top.y +6);
	con.lineTo(nose_top.x, nose_top.y);
	con.fill();
}

function _drawEye (bool)
{
let pn;
	bool ? pn = 1: pn = -1;
let base = { x: 15 * pn, y: 30 };
let span = pn * 20;

/* 目頭の座標 */
let eye_head = { x: base.x + span + center.x, y: center.y};
/* 目尻の座標 */
let eye_end = { x: base.x * 6 + center.x + span + eye_end_rand.x * pn, y: center.y + eye_end_rand.y};

/* 目の上のラインの下側CP１ */
//let under_cp1 = { x: base.x * 5 + center.x, y: -base.y/2 + center.y };
//let under_cp2 = { x: base.x * 6 + center.x, y: center.y };
//let upper_cp2 = { x: under_cp1.x + pn * upper_cp2_rand.x, y: under_cp1.y - upper_cp2_rand.y};
//let upper_cp1 = { x: under_cp1.x + pn * upper_cp1_rand.x, y: under_cp2.y - upper_cp1_rand.y};
let under_cp1 = { x: eye_head.x+ 80 * pn , y: eye_head.y - 50};
let under_cp2 = { x: eye_head.x+ 140 * pn , y: eye_head.y };
let upper_cp1 = { x: eye_head.x+ 150 * pn , y: eye_head.y - 5};
let upper_cp2 = { x: eye_head.x+ 80 * pn , y: eye_head.y - 60};

	/*
	fillR(under_cp1, "pink");
	fillR(under_cp2, "cyan");
	fillR(upper_cp1, "red");
	fillR(upper_cp2, "blue");
	*/

/* 目の下のラインの左座標 */
let eye_base_start = { x: center.x + 50 * pn , y: center.y + 40 };
/* 目の下のラインの右端座標 */
let eye_base_end = { x: eye_base_start.x + 30 * pn , y: eye_base_start.y };
let eye_base_cp = {x: pn * Math.abs(eye_base_end.x - eye_base_start.x)/2 + eye_base_start.x, y: eye_base_start.y + 5};
let eye_upper_center = {x: eye_base_cp.x, y: center.y -10};
let eye_right_cp1 = {x: eye_base_end.x +  eye_right_cp1_rand.x * pn, y: eye_base_end.y -  eye_right_cp1_rand.y};
let eye_right_cp2 = {x: eye_base_end.x + eye_right_cp2_rand.x * pn, y: eye_base_end.y - eye_right_cp2_rand.y};
let eye_left_cp1 = {x: eye_base_start.x - eye_left_cp1_rand.x * pn, y: eye_base_end.y - eye_left_cp2_rand.y};
let eye_left_cp2 = {x: eye_base_start.x - eye_left_cp2_rand.x * pn, y: eye_base_end.y - eye_left_cp2_rand.y};

	/* 眉毛の座標 */
let eye_blow_start = { x: eye_head.x + 10 * pn, y: eye_head.y -40 };
let eye_blow_end = { x: eye_head.x + 120 * pn , y: eye_head.y - 40};
let eye_blow_under_cp = { x: eye_blow_start.x + 80 * pn, y: eye_blow_start.y - 30};
let eye_blow_upper_cp = { x: eye_blow_start.x + 80 * pn, y: eye_blow_start.y - 40};
	fillR(eye_blow_start, "red");
	fillR(eye_blow_end, "purple");
	fillR(eye_blow_under_cp, "#000");
	fillR(eye_blow_upper_cp, "green");

let eyelid_cp1 = { x: upper_cp1.x , y: upper_cp1.y - 20 };
let eyelid_cp2 = { x: upper_cp2.x , y: upper_cp2.y - 20 };
let under_eye_start = {x: 60, y: 50};
let under_eye_end = {x: 80, y: 50};

	/* 瞳 */
	/* config */
	con.lineWidth = 4;
	con.fillStyle = "#974";
	con.strokeStyle = "#000";

	con.save();
	con.scale(1, 1.2);
	con.beginPath();
	con.arc(eye_head.x + 58 * pn, center.y -48, 24,  Math.PI * 2, false);
	con.restore();
	con.fill();
	con.stroke();

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";
	con.save();
	con.scale(1, 1.2);
	con.beginPath();
	con.arc(eye_head.x + 58 * pn, center.y -48, 10,  Math.PI * 2, false);
	con.restore();
	con.fill();

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#fff";
	con.strokeStyle = "#fff";
	con.save();
	con.scale(1, 1.5);
	con.beginPath();
	con.arc(eye_head.x+ 58 * pn + 10 , center.y -110, 5,  Math.PI * 2, false);
	con.arc(eye_head.x+ 58 * pn + 4 , center.y -105, 2,  Math.PI * 2, false);
	con.restore();
	con.fill();

	/* まぶたの上の領域 */
	con.fillStyle = "#fff";
	con.beginPath();
	drawCurve2(eye_end, eye_head, upper_cp1, upper_cp2);
	drawCurve2(eye_head, eye_end, eyelid_cp2, eyelid_cp1);
	con.fill();

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";

	/* まぶた */
	con.beginPath();
	drawCurve2(eye_head, eye_end, under_cp1, under_cp2);
	drawCurve2(eye_end, eye_head, upper_cp1, upper_cp2);
	con.fill();
	//con.stroke();
	
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";
	/* 眉毛 */
	con.beginPath();
	drawCurve(eye_blow_start, eye_blow_end, eye_blow_under_cp);
	drawCurve(eye_blow_end, eye_blow_start, eye_blow_upper_cp);
	con.fill();

	
	/* 目の下のライン */
	/*
	con.fillStyle = "#000";
	con.beginPath();
	drawCurve(eye_base_start, eye_base_end, eye_base_cp);
	drawCurve2(eye_base_end, eye_upper_center, eye_right_cp1, eye_right_cp2);
	drawCurve2(eye_upper_center, eye_base_start, eye_left_cp2, eye_left_cp1);
	con.stroke();
	*/



	/*
	fillR(eye_base_cp, "#000");
	fillR(eye_base_start, "green");
	fillR(eye_base_end, "blue");
	fillR(eye_right_cp1, "#000");
	fillR(eye_right_cp2, "red");
	fillR(eye_left_cp1, "#000");
	fillR(eye_left_cp2, "red");
	fillR(eyelid_cp1, "#faa");
	fillR(eyelid_cp2, "#faa");
	*/
}

function drawEyes ()
{
	_drawEye(true);
	_drawEye(false);
}

function drawCenter ()
{
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#f00";
	con.strokeStyle = "#f00";

	/* 横描画 */
	con.moveTo(-10 + center.x, center.y);
	con.lineTo( 10 + center.x, center.y);
	con.stroke();

	/* 縦描画 */
	con.moveTo(center.x, -10 + center.y);
	con.lineTo(center.x,  10 + center.y);
	con.stroke();
}
