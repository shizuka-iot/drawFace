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
	drawOutline(true);
	drawOutline(false);
	//drawDebug();
	drawNose();
	drawMouth(true);
	drawMouth(false);
	drawEyes();
	drawSign();
	drawCenter();
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

function fillR( arr, color = "#000" )
{
	con.fillStyle = color;
	con.fillRect(arr.x, arr.y, 4, 4);
}

function drawCurve(start, end, cp, stats = false)
{
	if (stats)
	{
		con.moveTo(start.x, start.y);
	}
	con.quadraticCurveTo(cp.x, cp.y, end.x, end.y)
}
function drawCurve2(start, end, cp1, cp2, stats = false)
{
	if (stats)
	{
		con.moveTo(start.x, start.y);
	}
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

let upper_eyeline_rand = {y: rand(10, 30)};

let nose_top = {x:center.x, y:center.y+100};
let nose_bottom = {x:center.x, y:nose_top.y + 12};

let mouth_center = {x: center.x, y: nose_bottom.y + 55};

let outline_center_rand = { y: rand(230, 250)};
let temple_rand = {x:rand( 160, 180), };
let outline_cp1_rand = {x: rand(60, 100), y: rand(0, 10)};
let outline_cp2_rand = {x: rand(160, 165), y: rand(60, 100)};
let top_of_head_rand = { y: rand(260, 280)};
let top_of_head_cp1_rand = {x: rand(180, 200), y: rand(180, 200)};
let top_of_head_cp2_rand = {x: rand(100, 110), };

let eye_blow_start_rand = {y: rand(40, 80)};
let eye_blow_end_rand = {y: rand(40, 60)};

let eye_size = rand(20, 30);

/* 輪郭 */
function drawOutline(bool)
{
	let pn = 1;
	bool ? pn = 1: pn = -1;

	let outline_center = {x: center.x , y: center.y + outline_center_rand.y};
	let temple = {x: center.x + temple_rand.x * pn, y: center.y};
	let outline_cp1 = {x: outline_center.x + outline_cp1_rand.x * pn, y: outline_center.y - outline_cp1_rand.y};
	let outline_cp2 = {x: outline_center.x + outline_cp2_rand.x * pn, y: outline_center.y - outline_cp2_rand.y};
	let top_of_head = {x: center.x, y: center.y - top_of_head_rand.y};
	let top_of_head_cp1 = {x: top_of_head.x + top_of_head_cp1_rand.x * pn, y: temple.y - top_of_head_cp1_rand.y};
	let top_of_head_cp2 = {x: top_of_head.x + top_of_head_cp2_rand.x * pn, y: top_of_head.y};

	let ear_start = {x: temple.x -5 * pn , y: temple.y - 20};
	let ear_end = {x: temple.x + 20 * pn , y: temple.y + 40};
	let ear_cp1 = {x: ear_start.x + 50 * pn, y: ear_start.y - 50};
	let ear_cp2 = {x: ear_end.x + 10 * pn , y: ear_end.y - 20 };
	let ear_start2 = {x: temple.x -5 * pn , y: temple.y + 2};
	let ear_end2 = {x: temple.x + 10 * pn , y: temple.y + 40};
	let ear2_cp1 = {x: ear_start2.x + 50 * pn, y: ear_start2.y - 50};
	let ear2_cp2 = {x: ear_end2.x + 10 * pn , y: ear_end2.y - 20 };
	let inner_ear_start = {x: ear_start2.x -10 * pn, y: ear_start2.y - 10};
	let inner_ear_end = {x: temple.x +5 * pn, y: temple.y + 60};
	let inner_ear_cp1 = {x: inner_ear_start.x +40 * pn, y: temple.y + 10};
	let inner_ear_cp2 = {x: inner_ear_start.x +40 * pn, y: temple.y + 20};
	let inner_ear2_start = {x: inner_ear_start.x -2 * pn , y: inner_ear_start.y + 10};
	let inner_ear2_terminal = {x: inner_ear_end.x -2 * pn, y: inner_ear_end.y - 10};
	let inner_ear2_terminal_cp = {x: inner_ear2_terminal.x -20 * pn, y: inner_ear2_terminal.y + 10};
	let inner_ear2_end = { x: inner_ear2_terminal.x -50 * pn, y: inner_ear2_terminal.y};
	let inner_ear2_cp1 = {x: inner_ear2_start.x +40 * pn, y: inner_ear2_start.y + 10};
	let inner_ear2_cp2 = {x: inner_ear2_terminal.x +10 * pn, y: inner_ear2_terminal.y - 20};
	let earlobe_start = {x: ear_end.x , y: ear_end.y};
	let earlobe_end = {x: temple.x - 20 * pn, y: earlobe_start.y + 40 };
	let earlobe_cp1 = {x: earlobe_start.x - 5 * pn, y: earlobe_start.y + 20 };
	let earlobe_cp2 = {x: temple.x +1 * pn, y: earlobe_start.y + 50 };

	let tragus_start = {x: inner_ear2_start.x, y: inner_ear2_start.y + 10};
	let tragus_end = {x: inner_ear2_start.x, y: inner_ear2_end.y +10};
	let tragus_cp = {x: temple.x+20*pn, y: inner_ear2_start.y +(inner_ear2_end.y - inner_ear2_start.y)/2};
	console.log(tragus_start);
	console.log(tragus_end);
	console.log(tragus_cp);

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";

	/* 耳の輪郭 */
	con.beginPath();
	drawCurve2(ear_start, ear_end, ear_cp1, ear_cp2, true);
	drawCurve2(earlobe_start, earlobe_end, earlobe_cp1, earlobe_cp2, false);
	con.fill();
	con.stroke();
	/* 耳の輪郭内側 */
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";
	con.beginPath();
	drawCurve2(ear_start2, ear_end2, ear2_cp1, ear2_cp2, true);
	con.fill();
	con.fillStyle = "#000";
	con.globalAlpha = 0.3;
	con.fill();
	con.globalAlpha = 1;
	con.stroke();
	/* 内耳 */
	/* config */
	con.globalAlpha = 1;
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";
	con.beginPath();
	drawCurve2(inner_ear_start, inner_ear_end, inner_ear_cp1, inner_ear_cp2, true);
	con.fill();
	con.fillStyle = "#fee";
	// con.globalAlpha = 0.3;
	con.fill();
	con.globalAlpha = 1;
	con.stroke();


	/* 内耳内側 */
	/* config */
	con.globalAlpha = 1;
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";
	con.beginPath();
	drawCurve2(inner_ear2_start, inner_ear2_terminal, inner_ear2_cp1, inner_ear2_cp2, true);
	con.globalAlpha = 1;
	con.stroke();
	//con.fill();
	con.beginPath();
	drawCurve2(inner_ear2_start, inner_ear2_terminal, inner_ear2_cp1, inner_ear2_cp2, true);
	drawCurve(inner_ear2_terminal, inner_ear2_end, inner_ear2_terminal_cp, false);
	con.fillStyle = "#000";
	con.globalAlpha = 0.5;
	con.fill();
	con.globalAlpha = 1;

	/* 耳珠 */
	/* config */
	con.globalAlpha = 1;
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";
	con.beginPath();
	drawCurve(tragus_start, tragus_end, tragus_cp, true);
	con.globalAlpha = 1;
	con.stroke();
	con.fill();


	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";

	con.beginPath();
	drawCurve2(outline_center, temple, outline_cp1,  outline_cp2, true);
	drawCurve2(temple, top_of_head, top_of_head_cp1,  top_of_head_cp2, false);

	con.fill();
	con.stroke();

	/*
	fillR(inner_ear_start, "blue");
	fillR(inner_ear_end, "#00f");
	fillR(inner_ear_cp1, "#444");
	fillR(inner_ear_cp2, "#444");
	fillR(ear_start, "red");
	fillR(ear_end, "#2f2");
	fillR(ear_cp1, "red");
	fillR(ear_cp2, "#2f2");
	fillR(earlobe_start, "red");
	fillR(earlobe_end, "#2f2");
	fillR(earlobe_cp1, "red");
	fillR(earlobe_cp2, "#00f");
	fillR(outline_center, "red");
	fillR(temple, "orange");
	fillR(outline_cp1, "#000");
	fillR(outline_cp2, "#000");
	fillR(top_of_head, "#000");
	fillR(top_of_head_cp1, "red");
	fillR(top_of_head_cp2, "#00f");

	fillR(inner_ear2_start, "#000");
	fillR(inner_ear2_end, "#000");
	fillR(inner_ear2_terminal, "#000");
	fillR(inner_ear2_terminal_cp, "#000");
	*/
	fillR(tragus_start, "blue");
	fillR(tragus_end, "green");
	fillR(tragus_cp, "red");

}

function drawMouth(bool)
{
	let pn;
	bool ? pn = 1: pn = -1;
	let mouth_under_end = {x: mouth_center.x + 30 * pn, y: mouth_center.y - 5};
	let mouth_upper_end = {x: mouth_center.x + 30 * pn, y: mouth_center.y - 6};
	let mouth_under_cp = {x: mouth_center.x + 20 * pn, y: nose_bottom.y + 55};
	let mouth_end_cp1 = {x: mouth_under_end.x + 10 * pn, y: mouth_under_end.y};
	let mouth_end_cp2 = {x: mouth_upper_end.x + 10 * pn, y: mouth_upper_end.y - 10};

	fillR(mouth_end_cp1, "red");
	fillR(mouth_end_cp2, "#000");
	fillR(mouth_under_cp, "green");
	fillR(mouth_center, "green");

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";

	con.beginPath();
	drawCurve(mouth_center, mouth_under_end, mouth_under_cp, true );
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

	con.beginPath();
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
	let eye_head = { x: center.x + 35 * pn, y: center.y};
	/* 目尻の座標 */
	let eye_end = { x: center.x + 100 * pn + eye_end_rand.x * pn, y: center.y + eye_end_rand.y};

	let eyeline_end = {x: eye_head.x + 115 * pn, y: eye_head.y -15};
	let eyeline_end_cp1 = {x: eye_head.x + 80 * pn, y: eye_head.y - 70};
	let eyeline_end_cp2 = {x: eyeline_end.x -10 * pn, y: eyeline_end.y + 10};
	let under_eyeline_cp = {x: eye_end.x +48 * pn, y: eyeline_end.y + 20};

	/* 二重のシワ */
	let upper_eyeline_start = {x: eye_head.x, y: eye_head.y -upper_eyeline_rand.y};
	let upper_eyeline_end = {x: eyeline_end.x - 30 * pn, y: eyeline_end.y - 25};
	let upper_eyeline_cp1 = {x: upper_eyeline_start.x + 30 * pn, y: upper_eyeline_start.y - 25};
	let upper_eyeline_cp2 = {x: upper_eyeline_end.x - 30 * pn, y: upper_eyeline_end.y - 5};
	let upper_eyeline_cp3 = {x: upper_eyeline_cp1.x, y: upper_eyeline_cp1.y + 5 };
	let upper_eyeline_cp4 = {x: upper_eyeline_cp2.x, y: upper_eyeline_cp2.y + 5};

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

	/* 白目のcp */
	let white_eye_cp1 = {x: eye_end.x - 10 * pn, y: eye_end.y - 5};
	let white_eye_cp2 = {x: eye_head.x , y: eye_end.y + 20};
	fillR(white_eye_cp1, "red");
	fillR(white_eye_cp2, "red");

	/* 眉毛の座標 */
	let eye_blow_start = { x: eye_head.x + 10 * pn, y: eye_head.y - eye_blow_start_rand.y };
	let eye_blow_end = { x: eye_head.x + 120 * pn , y: eye_head.y - eye_blow_end_rand.y};
	let eye_blow_under_cp = { x: eye_blow_start.x + 80 * pn, y: eye_blow_start.y - 30};
	let eye_blow_upper_cp = { x: eye_blow_start.x + 80 * pn, y: eye_blow_start.y - 40};
	/*
	fillR(eye_blow_start, "red");
	fillR(eye_blow_end, "purple");
	fillR(eye_blow_under_cp, "#000");
	fillR(eye_blow_upper_cp, "green");
	*/

	let eyelid_cp1 = { x: upper_cp1.x , y: upper_cp1.y - 20 };
	let eyelid_cp2 = { x: upper_cp2.x , y: upper_cp2.y - 20 };
	let under_eye_start = {x: 60, y: 50};
	let under_eye_end = {x: 80, y: 50};

	/* 白目の部分 */
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#fff";
	con.strokeStyle = "#fff";

	con.beginPath();
	drawCurve2(eye_head, eye_end, under_cp1, under_cp2, true);
	drawCurve2(eye_end, eye_head, white_eye_cp1, white_eye_cp2);
	con.fill();


	let eye_position = 52;
	/* 瞳 */
	/* config */
	con.lineWidth = 4;
	con.fillStyle = "#974";
	con.strokeStyle = "#000";

	/* 瞳の円1 */
	con.save();
	con.scale(1, 1.2);
	con.beginPath();
	con.arc(eye_head.x + eye_position * pn, center.y -48, eye_size,  Math.PI * 2, false);
	con.restore();
	con.fill();
	con.stroke();

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";

	/* 瞳の円2 */
	con.save();
	con.scale(1, 1.2);
	con.beginPath();
	con.arc(eye_head.x + eye_position * pn, center.y -48, 10,  Math.PI * 2, false);
	con.restore();
	con.fill();

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#fff";
	con.strokeStyle = "#fff";
	/* 瞳の反射 */
	con.save();
	con.scale(1, 1.5);
	con.beginPath();
	con.arc(eye_head.x+ eye_position * pn + 10 , center.y -110, 5,  Math.PI * 2, false);
	con.arc(eye_head.x+ eye_position * pn + 4 , center.y -105, 2,  Math.PI * 2, false);
	con.restore();
	con.fill();

	/* まぶたの上の領域 */
	con.fillStyle = "#fee";
	con.beginPath();
	drawCurve2(eye_end, eye_head, upper_cp1, upper_cp2, true);
	drawCurve2(eye_head, eye_end, eyelid_cp2, eyelid_cp1);
	con.fill();

	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";

	/* まぶた */
	con.beginPath();
	drawCurve2(eye_head, eyeline_end, eyeline_end_cp1, eyeline_end_cp2, true);
	drawCurve(eyeline_end, eye_end, under_eyeline_cp);
	drawCurve2(eye_end, eye_head, under_cp2, under_cp1);
	con.fill();
	/* 二重 */
	con.beginPath();
	drawCurve2(upper_eyeline_start, upper_eyeline_end, upper_eyeline_cp1, upper_eyeline_cp2, true);
	drawCurve2(upper_eyeline_end, upper_eyeline_start, upper_eyeline_cp4, upper_eyeline_cp3, false);
	con.globalAlpha = 0.5;
	con.fill();
	
	/* config */
	con.globalAlpha = 1;
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";
	/* 眉毛 */
	con.beginPath();
	drawCurve(eye_blow_start, eye_blow_end, eye_blow_under_cp, true);
	drawCurve(eye_blow_end, eye_blow_start, eye_blow_upper_cp);
	con.fill();

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
	fillR(eyeline_end, "#25a");
	fillR(eyeline_end_cp1, "#25a");
	fillR(eyeline_end_cp2, "#25a");
	fillR(upper_eyeline_start, "#f00");
	fillR(upper_eyeline_end, "#f00");
	fillR(upper_eyeline_cp1, "#f00");
	fillR(upper_eyeline_cp2, "#f00");
}

function drawEyes ()
{
	_drawEye(true);
	_drawEye(false);
}

function drawSign()
{
	/* config */
	con.globalAlpha = 0.3;
	con.lineWidth = 1;
	con.fillStyle = "#f00";
	con.strokeStyle = "#f00";
	let pn = 1;
	let j= 1;
	for (let i=0; i<6; i++)
	{
		i%2 === 0 ? pn = 1: pn = -1;
		if ( i !== 0 && i%2 === 0)
		{
			j++;
		}
		con.beginPath();
		con.arc(center.x + 40 * pn, center.y - 80 -30 * j, 8,  Math.PI * 2, false);
		con.fill();
	}
	con.globalAlpha = 1;
}

function drawCenter ()
{
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#f00";
	con.strokeStyle = "#f00";

	/* 横描画 */
	con.beginPath();
	con.moveTo(-10 + center.x, center.y);
	con.lineTo( 10 + center.x, center.y);
	con.stroke();

	/* 縦描画 */
	con.beginPath();
	con.moveTo(center.x, -10 + center.y);
	con.lineTo(center.x,  10 + center.y);
	con.stroke();
}
