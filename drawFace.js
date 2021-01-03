
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


/******************************************************
 * 更新
******************************************************/
function update()
{
}


/******************************************************
 * 描画
******************************************************/
function draw()
{
	con.clearRect(0, 0, can.width, can.height);
	drawOutsideBackHair()
	//drawBackHair3();
	drawNeck();
	drawNeckShadow();
	drawEar();
	drawOutline();
	drawWhiteEyes();
	drawNose();
	drawMouth();
	drawEyes2();
	drawEyelid();
	drawEyeline2();
	drawEyeblow(-20);
	drawEyelashes()
	drawLowerEyelid();
	drawSkinHead();
	//drawFrontHair3(0, 120, 20);
	//drawFrontHair2(120, 20);
	//drawSideHair3(180, 3);
	con.save();
	con.globalCompositeOperation = "lighter";
	//drawHairHighlight();
	con.globalCompositeOperation = "source-over";
	con.restore();
	//drawOutsideHair();
	drawDebug();
	drawCatalinaHair(300, 1/2);
	drawCatalinaHair(300, 1/2, RIGHT);
}

/******************************************************
 * ループ関数
******************************************************/
function mainLoop()
{
	//requestAnimationFrame(mainLoop);
	//setInterval(mainLoop, 1000/2)
	update();
	draw();
}


/******************************************************
 * 全体の処理
******************************************************/
window.onload = ()=>{
	/*
	mainLoop();
	update();
	draw();
	*/
	setInterval(mainLoop, 1000/5)
}

function drawEyeblow( eyeblow_cp_par)
{
	let eyeblow_start = [
		{x: eye_head[0].x -10, y: eye_head[0].y -40},
		{x: eye_head[1].x +10, y: eye_head[1].y -40},
	];
	let eyeblow_end = [
		{x: upper_eyeline_end[0].x + 5, y: upper_eyeline_end[0].y -50},
		{x: upper_eyeline_end[1].x - 5, y: upper_eyeline_end[1].y -50},
	];
	let eyeblow_upper_cp1 = [
		{
			x: eyeblow_start[0].x + Math.floor(Math.abs(eyeblow_end[0].x - eyeblow_start[0].x))/3, 
			y: eyeblow_start[0].y -10},
		{
			x: eyeblow_start[1].x - Math.floor(Math.abs(eyeblow_end[1].x - eyeblow_start[1].x))/3, 
			y: eyeblow_start[1].y -10},
	];
	let eyeblow_upper_cp2 = [
		{
			x: eyeblow_start[0].x + Math.floor(Math.abs(eyeblow_end[0].x - eyeblow_start[0].x))*2/3, 
			y: eyeblow_start[0].y -20},
		{
			x: eyeblow_start[1].x - Math.floor(Math.abs(eyeblow_end[1].x - eyeblow_start[1].x))*2/3, 
			y: eyeblow_start[1].y -20},
	];
	// y座標を+10くらいにすれば太眉になる。-20くらいで細眉
	let eyeblow_lower_cp1 = [
		{
			x: eyeblow_start[0].x + sp(eyeblow_end[0].x ,eyeblow_start[0].x, 1/3), 
			y: eyeblow_start[0].y +eyeblow_cp_par},
		{
			x: eyeblow_start[1].x - sp(eyeblow_end[1].x ,eyeblow_start[1].x, 1/3), 
			y: eyeblow_start[1].y +eyeblow_cp_par},
	];
	let eyeblow_lower_cp2 = [
		{
			x: eyeblow_start[0].x + Math.floor(Math.abs(eyeblow_end[0].x - eyeblow_start[0].x))*2/3, 
			y: eyeblow_start[0].y -20},
		{
			x: eyeblow_start[1].x - Math.floor(Math.abs(eyeblow_end[1].x - eyeblow_start[1].x))*2/3, 
			y: eyeblow_start[1].y -20},
	];


	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";
		con.beginPath();
		drawCurve2(eyeblow_start[i], eyeblow_end[i], eyeblow_upper_cp1[i], eyeblow_upper_cp2[i], true );
		drawCurve2(eyeblow_end[i], eyeblow_start[i], eyeblow_lower_cp2[i], eyeblow_lower_cp1[i] );
		con.fill();
		/*
		fillR(eyeblow_upper_cp1[i]);
		fillR(eyeblow_upper_cp2[i]);
		fillR(eyeblow_lower_cp1[i]);
		fillR(eyeblow_lower_cp2[i]);
		*/
	}
}

function drawEar()
{
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#fee";
		con.strokeStyle = "#000";
		con.beginPath();
		drawCurve2(ear_start[i], earlobe_start[i], ear_cp1[i], ear_cp2[i], true );
		drawCurve(earlobe_start[i], ear_end[i], earlobe_cp1[i] );
		con.stroke();
		con.fill();

		con.globalAlpha = 0.2;
		con.beginPath();
		drawCurve2(inner_ear_start[i], inner_ear_end[i], inner_ear_cp1[i], inner_ear_cp2[i], true );
		con.stroke();
		con.fillStyle = "#000";
		con.beginPath();
		drawCurve2(inner_ear_start[i], inner_ear_end[i], inner_ear_cp1[i], inner_ear_cp2[i], true );
		con.fill();
		con.globalAlpha = 1;
	}
}

function drawOutline()
{
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";
	con.beginPath();
	drawCurve2(chin_start, chin_end, chin_cp1, chin_cp2, true );
	drawCurve2(cheek_start[0], cheek_end[0], cheek_cp1[0], cheek_cp2[0], false );
	drawCurve2(cheek_end[0], cheek_end[1], head_cp1, head_cp2 );
	drawCurve2(cheek_end[1], cheek_start[1], cheek_cp2[1], cheek_cp1[1], false );
	con.stroke();
	con.fill();
}

function drawEyelid()
{
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#fee";
		con.strokeStyle = "#f00";
		con.beginPath();
		drawCurve2(eye_head[i], upper_eyeline_end[i], upper_eyeline_cp1[i], upper_eyeline_cp2[i], true);
		drawCurve2(upper_eyeline_end[i], eye_head[i],  eyelid_cp2[i], eyelid_cp1[i]);
		//con.stroke();
		con.fill();
	}
}
function drawLowerEyelid()
{
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#fee";
		con.strokeStyle = "#f00";
		con.beginPath();
		//drawCurve(lower_eyelid_start[i], eye_end[i], lower_eyelid_cp1[i], true);
		//drawCurve2(eye_end[i], lower_eyelid_start[i], lower_eyelid_cp4[i],lower_eyelid_cp3[i], true);
		drawCurve2(upper_eyeline_end[i], eye_head[i], lower_eyelid_cp4[i],lower_eyelid_cp3[i], true);
		drawCurve(eye_head[i], eyelid_bottom[i], eyelid_bottom_cp1[i] );
		drawCurve(eyelid_bottom[i], eye_end[i], eyelid_bottom_cp3[i] );
		con.lineTo(upper_eyeline_end[i].x, upper_eyeline_end[i].y);
		//con.stroke();
		con.fill();
	}
}

function drawWhiteEyes()
{
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#fff";
		con.strokeStyle = "#f00";
		con.beginPath();
		drawCurve(lower_eyelid_start[i], eye_end[i], lower_eyelid_cp1[i], true);
		drawCurve2(eye_end[i], eye_head[i], lower_eyeline_cp2[i], upper_eyeline_cp1[i]);
		//con.lineTo(lower_eyelid_start[i].x, lower_eyelid_start[i].y);
		//con.stroke();
		con.fill();
		drawCurve(eye_head[i], eyelid_bottom[i], eyelid_bottom_cp1[i] );
		//con.stroke();
		con.fill();
	}
}

function drawEyes2()
{
	drawIris();
	drawEyeline();
}
/* 一重 */
function drawEyeline()
{
	// 左右の座標は既に用意してある
	// 配列で管理しているのでループのインデックス番号を合わせて回す
	drawEyeShadow();
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";
		con.beginPath();
		drawCurve2(eye_head[i], upper_eyeline_end[i], upper_eyeline_cp1[i], upper_eyeline_cp2[i], true);
		con.lineTo(eye_end[i].x,eye_end[i].y);
		drawCurve2(eye_end[i], eye_head[i], lower_eyeline_cp2[i], upper_eyeline_cp1[i]);
		con.stroke();
		con.fill();
	}
}
function drawEyeShadow()
{
	let eye_shadow_start = [
		{x: eye_head[0].x, y: eye_head[0].y + 10},
		{x: eye_head[1].x, y: eye_head[1].y + 10},
	];
	let eye_shadow_end = [
		{x: upper_eyeline_end[0].x -10, y: eye_head[0].y + 10},
		{x: upper_eyeline_end[1].x +10, y: eye_head[1].y + 10},
	];
	let eye_shadow_cp1 = [
		{x: upper_eyeline_cp1[0].x, y: upper_eyeline_cp1[0].y + 10},
		{x: upper_eyeline_cp1[1].x, y: upper_eyeline_cp1[1].y + 10},
	];
	let eye_shadow_cp2 = [
		{x: upper_eyeline_cp2[0].x, y: upper_eyeline_cp2[0].y + 10},
		{x: upper_eyeline_cp2[1].x, y: upper_eyeline_cp2[1].y + 10},
	];
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#f00";
		con.beginPath();
		drawCurve2(eye_head[i], upper_eyeline_end[i], upper_eyeline_cp1[i], upper_eyeline_cp2[i], true);
		con.lineTo(eye_shadow_end[i].x,eye_shadow_end[i].y);
		drawCurve2(eye_shadow_end[i], eye_shadow_start[i], eye_shadow_cp2[i], eye_shadow_cp1[i]);
		//con.stroke();
		con.globalAlpha = 0.3;
		con.fill();
		con.globalAlpha = 1;
	}
}
/* 二重 */
function drawEyeline2()
{
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#888";
		con.strokeStyle = "#888";
		con.beginPath();
		drawCurve2(upper_eyeline_start2[i], upper_eyeline_end2[i], eyeline2_cp1[i], eyeline2_cp2[i], true);
		drawCurve2(upper_eyeline_end2[i], upper_eyeline_start2[i], eyeline2_cp4[i], eyeline2_cp3[i], false);
		con.stroke();
		con.fill();
	}
}

function drawNeck()
{
	con.lineWidth = 1;
	con.fillStyle = "#fee";
	con.strokeStyle = "#000";
	con.beginPath();
	drawCurve2(neck_start[0], neck_end[0], neck_cp1[0],neck_cp2[0], true);
	con.lineTo(neck_end[1].x, neck_end[1].y);
	drawCurve2(neck_end[1], neck_start[1], neck_cp2[1],neck_cp1[1]);
	con.fill();
	con.fillStyle = "#000";
	con.globalAlpha = 0.1;
	con.fill();
	con.globalAlpha = 1;
	con.stroke();
}
function drawNeckShadow()
{
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";
	con.beginPath();
	con.moveTo(neck_start[0].x, neck_start[0].y);
	con.lineTo(neck_start2[0].x, neck_start2[0].y);
	drawCurve2(neck_start2[0], neck_start2[1], neck_shadow_cp1, neck_shadow_cp2);
	con.lineTo(neck_start[1].x, neck_start[1].y);
	con.globalAlpha = 0.2;
	con.fill();
	con.globalAlpha = 1;
}

function drawEyelashes(number = 3)
{
	let split = 10;
	let span = Math.floor(Math.abs(eyelash_end[0].x - eye_head[0].x, )/ split);
	let cp_span = Math.floor(Math.abs(eyelash_end[0].x - eyelash_cp[0].x ));
	let eyelash_top = [
		{x: eye_head[0].x + sp(eye_head[0].x, upper_eyeline_end[0].x, 1/2), y:eye_head[0].y -24},
		{x: eye_head[1].x - sp(eye_head[1].x, upper_eyeline_end[1].x, 1/2), y:eye_head[1].y -24},
	];
	let eyelashes_cp = [];
	for (let i=0; i<number; i++)
	{
		eyelashes[i] = {
			x: eyelash_end[0].x - i*span,
			y: eyelash_end[0].y - i*span,
		};
		eyelashes_cp[i] = {
			x: eyelashes[i].x - cp_span -10,
			y: eyelashes[i].y +10,
		};
	}

	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#f00";
	con.beginPath();
	/*
	drawCurve2(eyelash_start[0], eyelash_end[0], eyelash_cp1[0], eyelash_cp2[0], true);
	con.stroke();
	drawCurve(eyelash_end[0], upper_eyeline_end2[0], eyelash_cp[0]);

	for (let i=0; i<number-1; i++)
	{
		drawCurve(eyelashes[i], eyelashes[i+1], eyelashes_cp[i]);
	}
	con.stroke();
	con.fillStyle = "#000";
	//con.fill();
	*/

	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#f00";
		con.beginPath();
		drawCurve2(eyelash_start[i], eyelash_end[i], eyelash_cp1[i], eyelash_cp2[i], true);
		drawCurve(eyelash_end[i], upper_eyeline_end2[i], eyelash_cp[i]);
		con.closePath();
		con.fill();
	}
}

function drawSkinHead()
{
	con.lineWidth = 1;
	con.fillStyle = hair_color;
	con.strokeStyle = hair_color;
	con.beginPath();
	drawCurve2(cheek_end[0], cheek_end[1], head_cp1, head_cp2, true );
	con.lineTo(forehead_left.x, forehead_left.y);
	con.lineTo(forehead_right.x, forehead_right.y);
	//con.lineTo(cheek_end[0].x, cheek_end[0].y);
	//con.closePath();
	con.globalAlpha = 1;
	con.fill();
	con.fillStyle = "#000";
	con.globalAlpha = 0.5;
	con.fill();
	con.globalAlpha = 1;
}

function generateCoordinateRight(x)
{
	return Math.floor(x * (forehead_right.y - cheek_end[0].y) / (forehead_right.x - cheek_end[0].x)); 
}
function generateCoordinateLeft(x)
{
	return Math.floor(x * (forehead_left.y - cheek_end[1].y) / (forehead_left.x - cheek_end[1].x));
}

// 2店間の座標から傾きを求めy座標を求める
// 引数はx座標・y座標を持つ連想配列
function generateCoordinateY(start_coordinate, end_coordinate, x)
{
	let y = Math.floor(x * Math.abs(end_coordinate.y - start_coordinate.y) / Math.abs(end_coordinate.x - start_coordinate.x));
	return y;
}
function generateCoordinateX(start_coordinate, end_coordinate, y)
{
	let x = Math.floor(y / (Math.abs(end_coordinate.y - start_coordinate.y) / Math.abs(end_coordinate.x - start_coordinate.x)));
	if (start_coordinate.x > end_coordinate.x)
	{
		return -x;
	}
	return x;
}


function drawHairHighlight()
{
	let start = {x: forehead_left.x - 10, y: forehead_left.y +50};
	let end = {x: forehead_right.x + 10, y: forehead_left.y +40};
	let start2 = {x: start.x , y: start.y +20};
	let end2 = {x: end.x , y: end.y +20};

	let cp1 = {
		x: start.x + sp(start.x, end.x, 1/3),
		y: start.y + 10,
	};
	let cp2 = {
		x: start.x + sp(start.x, end.x, 2/3),
		y: start.y + 10,
	};
	let cp3 = {
		x: start2.x + sp(start.x, end.x, 1/3),
		y: start2.y + 5,
	};
	let cp4 = {
		x: start2.x + sp(start.x, end.x, 2/3),
		y: start2.y + 5,
	};

	con.lineWidth = 1;
	con.fillStyle = "#222";
	con.strokeStyle = "#000";

	con.beginPath();
	drawCurve2(
		start,
		end,
		cp1,
		cp2,
		true
	);
	drawCurve2(
		end,
		start2,
		cp4,
		cp3
	);
	con.lineTo(start.x, start.y);
	con.fill();

}

/*
 * 後ろ髪シルエット
 */
function drawOutsideBackHair()
{
	let outside_back_hair_bunch=6;/* 髪の束数 */
	let hair_length = 400;

	/* 髪の束の間隔 */
	let span = Math.floor(Math.abs(temple_left.x - outside_back_hair_left.x)/outside_back_hair_bunch);

	// この関数のメインループ
	for (let j=0; j<1; j++)
	{
		outoutside_back_hair_roots = [];
		outoutside_back_hair_tips = [];
		outoutside_back_hair_cp1 = [];
		outoutside_back_hair_cp2 = [];


		// 左サイド髪の座標生成
		for (let i=0; i<=outside_back_hair_bunch; i++)
		{
			outside_back_hair_roots[i] = {
				x: outside_back_hair_left.x + i*span,// 外側からスパンを増やしていく。 
				y: outside_back_hair_left.y };// 高さは一定
			outside_back_hair_tips[i] = {
				x: outside_back_hair_left.x + i*span + rand(-60, 0),
				y: outside_back_hair_left.y + rand(0, 20) + hair_length};
			outside_back_hair_cp1[i] = {
				x: outside_back_hair_left.x + i*span/2 + rand(-5, 5), 
				y: outside_back_hair_roots[i].y + sp(outside_back_hair_roots[i].y, outside_back_hair_tips[i].y, 1/3)};
			outside_back_hair_cp2[i] = {
				x: outside_back_hair_left.x + i*span/2 + rand(-1, 1), 
				y: outside_back_hair_roots[i].y + sp(outside_back_hair_roots[i].y, outside_back_hair_tips[i].y, 2/3) };
		}

		con.beginPath();

		// 最初の根本に移動
		con.moveTo(outside_back_hair_roots[0].x, outside_back_hair_roots[0].y);
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";

		for (let i=0; i<outside_back_hair_bunch; i++)
		{
			// まず根本から毛先まで下ろす
			drawCurve2(
				outside_back_hair_roots[i], 
				outside_back_hair_tips[i], 
				outside_back_hair_cp1[i], 
				outside_back_hair_cp2[i] );

			// 配列の最後の一つ前まで
			if( i+1<outside_back_hair_bunch)
			{
				// 毛先から根本に向かってカーブを引く
				drawCurve2(
					outside_back_hair_tips[i+1], 
					outside_back_hair_roots[i+1], 
					outside_back_hair_cp2[i], 
					outside_back_hair_cp1[i+1]);
			}
			// 配列の最後
			else
			{
				// 配列の最後は
				drawCurve2(
					outside_back_hair_tips[outside_back_hair_tips.length -1], 
					temple_left, 
					outside_back_hair_cp2[outside_back_hair_tips.length -1], 
					outside_back_hair_cp1[outside_back_hair_tips.length -1]);
			}
			//con.stroke();
		}
		//con.fill();

		outside_back_hair_roots = [];
		outside_back_hair_tips = [];
		outside_back_hair_cp1 = [];
		outside_back_hair_cp2 = [];


		for (let i=0; i<=outside_back_hair_bunch; i++)
		{
			outside_back_hair_roots[i] = {
				x: temple_right.x + i*span, 
				y: temple_right.y };
			outside_back_hair_tips[i] = {
				x: temple_right.x + i*span + rand(-60, 0), 
				y: temple_right.y + rand(10, 20) + hair_length};
			outside_back_hair_cp1[i] = {
				x: temple_right.x + i*span/2 + rand(0, 10), 
				y: outside_back_hair_roots[i].y + sp(outside_back_hair_roots[i].y, outside_back_hair_tips[i].y, 1/3)};
			outside_back_hair_cp2[i] = {
				x: temple_right.x + i*span/2 + rand(-10, 10), 
				y: outside_back_hair_roots[i].y + sp(outside_back_hair_roots[i].y, outside_back_hair_tips[i].y, 2/3) };
		}

		//con.beginPath();
		con.lineTo(outside_back_hair_roots[0].x, outside_back_hair_roots[0].y);
		for (let i=0; i<outside_back_hair_bunch; i++)
		{
			drawCurve2(outside_back_hair_roots[i], outside_back_hair_tips[i], outside_back_hair_cp1[i], outside_back_hair_cp2[i] );
			con.lineWidth = 1;
			con.fillStyle = hair_color;
			con.strokeStyle = "#000";


			if( i+1<outside_back_hair_bunch)
			{
				drawCurve2(
					outside_back_hair_tips[i+1], 
					outside_back_hair_roots[i+1], 
					outside_back_hair_cp2[i], 
					outside_back_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					outside_back_hair_tips[outside_back_hair_tips.length -1], // 毛先から
					outside_back_hair_right, // 右の後ろ髪の外側
					outside_back_hair_cp2[outside_back_hair_tips.length -1], // 毛先のCP
					outside_back_hair_cp1[outside_back_hair_tips.length -1]); // 毛先のCP
			}
		//con.stroke();
		}
		drawCurve2(
			outside_back_hair_right, // 毛先から
			outside_back_hair_left, // 右の後ろ髪の外側
			outside_back_head_cp1, // 毛先のCP
			outside_back_head_cp2); // 毛先のCP

		con.stroke();
		con.fill();
	}// forループ終わり
}

/***********************
 * サイドヘアー3
***********************/
function drawSideHair3(hair_length, side_hair_bunch)
{
	/* 髪の束の間隔 */
	let span = Math.floor(Math.abs(temple_left.x - forehead_left.x)/side_hair_bunch);

	/* この関数のメインループ */
	for (let j=0; j<4; j++)
	{
		side_hair_roots = [];
		side_hair_tips = [];
		side_hair_cp1 = [];
		side_hair_cp2 = [];


		/* 左サイド髪の座標生成 */
		for (let i=0; i<=side_hair_bunch; i++)
		{
			side_hair_roots[i] = {
				x: temple_left.x + i*span, 
				y: temple_left.y + generateCoordinateLeft(i*span)};
			side_hair_tips[i] = {
				x: temple_left.x + i*span + rand(-60, 0) , 
				y: temple_left.y + rand(0, 20) + hair_length};
			side_hair_cp1[i] = {
				x: temple_left.x + i*span/2 + rand(-5, 5) , 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 1/3)};
			side_hair_cp2[i] = {
				x: temple_left.x + i*span/2 + rand(-1, 1) , 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 2/3) };
		}


		/* 左サイド髪の描画 */
		con.beginPath();
		con.moveTo(side_hair_roots[0].x, side_hair_roots[0].y);
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";

		for (let i=0; i<side_hair_bunch; i++)
		{
			drawCurve2(
				side_hair_roots[i], 
				side_hair_tips[i], 
				side_hair_cp1[i], 
				side_hair_cp2[i] );

			if( i+1<side_hair_bunch)
			{
				drawCurve2(
					side_hair_tips[i+1], 
					side_hair_roots[i+1], 
					side_hair_cp2[i], 
					side_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					side_hair_tips[side_hair_tips.length -1], 
					forehead_left, 
					side_hair_cp2[side_hair_tips.length -1], 
					side_hair_cp1[side_hair_tips.length -1]);
			}
			con.stroke();
		}
		con.fill();


		/* 配列の再初期化 */
		side_hair_roots = [];
		side_hair_tips = [];
		side_hair_cp1 = [];
		side_hair_cp2 = [];


		/* 右サイド髪の座標生成 */
		for (let i=0; i<=side_hair_bunch; i++)
		{
			side_hair_roots[i] = {
				x: forehead_right.x + i*span, 
				y: forehead_right.y + generateCoordinateRight(i*span)};
			side_hair_tips[i] = {
				x: forehead_right.x + i*span + rand(-60, 0) , 
				y: temple_right.y + rand(10, 20) + hair_length};
			side_hair_cp1[i] = {
				x: forehead_right.x + i*span/2 + rand(0, 10) , 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 1/3)};
			side_hair_cp2[i] = {
				x: forehead_right.x + i*span/2 + rand(-10, 10), 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 2/3) };
		}

		/* 右サイド髪の描画 */
		con.beginPath();
		con.moveTo(side_hair_roots[0].x, side_hair_roots[0].y);
		for (let i=0; i<side_hair_bunch; i++)
		{
			/* */
			drawCurve2(
				side_hair_roots[i], 
				side_hair_tips[i], 
				side_hair_cp1[i], 
				side_hair_cp2[i] );
			con.lineWidth = 1;
			con.fillStyle = hair_color;
			con.strokeStyle = "#000";


			if( i+1<side_hair_bunch)
			{
				drawCurve2(
					side_hair_tips[i+1], 
					side_hair_roots[i+1], 
					side_hair_cp2[i], 
					side_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					side_hair_tips[side_hair_tips.length -1], // 毛先から
					temple_right, // 頬の端まで
					side_hair_cp2[side_hair_tips.length -1], // 毛先のCP
					side_hair_cp1[side_hair_tips.length -1]); // 毛先のCP
			}
		}
		con.stroke();
		con.fill();
	}// forループ終わり
}


/***********************
 * サイドヘアー
***********************/
function drawSideHair2()
{
	let side_hair_bunch=3;/* 髪の束数 */
	let hair_length = 100;

	let span = Math.floor(Math.abs(temple_left.x - forehead_left.x)/side_hair_bunch);
	/* 髪の束の間隔 */
	//let span = Math.floor(Math.abs(side_hair_left.x - forehead_left.x)/side_hair_bunch);

	/* サイクル */
	for (let j=0; j<4; j++)
	{
		/* 配列初期化 */
		side_hair_roots = [];
		side_hair_tips = [];
		side_hair_cp1 = [];
		side_hair_cp2 = [];


		/* 左サイド髪の座標生成 */
		for (let i=0; i<=side_hair_bunch; i++)
		{
			side_hair_roots[i] = {
				x: temple_left.x + i*span, 
				y: temple_left.y + generateCoordinateLeft(i*span)};
			side_hair_tips[i] = {
				x: temple_left.x + i*span + rand(-60, 0), 
				y: temple_left.y + rand(0, 20) + hair_length};
			side_hair_cp1[i] = {
				x: temple_left.x + i*span/2 + rand(-5, 5), 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 1/3)};
			side_hair_cp2[i] = {
				x: temple_left.x + i*span/2 + rand(-1, 1), 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 2/3) };
		}


		/* 左サイド髪の描画 */
		con.beginPath();
		//con.moveTo(side_hair_left.x, side_hair_left.y);
		con.moveTo(side_hair_roots[0].x, side_hair_roots[0].y);
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";

		for (let i=0; i<side_hair_bunch; i++)
		{
			drawCurve2(side_hair_roots[i], side_hair_tips[i], side_hair_cp1[i], side_hair_cp2[i] );

			if( i+1<side_hair_bunch)
			{
				drawCurve2(side_hair_tips[i+1], side_hair_roots[i+1], side_hair_cp2[i], side_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(side_hair_tips[side_hair_tips.length -1], forehead_left, side_hair_cp2[side_hair_tips.length -1], side_hair_cp1[side_hair_tips.length -1]);
			}
			con.stroke();
		}
		con.fill();


		/* 配列の再初期化 */
		side_hair_roots = [];
		side_hair_tips = [];
		side_hair_cp1 = [];
		side_hair_cp2 = [];


		/* 右サイド髪の座標生成 */
		for (let i=0; i<=side_hair_bunch; i++)
		{
			side_hair_roots[i] = {
				x: forehead_right.x + i*span, 
				y: forehead_right.y + generateCoordinateRight(i*span)};
			side_hair_tips[i] = {
				x: forehead_right.x + i*span + rand(-60, 0), 
				y: cheek_end[0].y + rand(10, 20) + hair_length};
			side_hair_cp1[i] = {
				x: forehead_right.x + i*span/2 + rand(0, 10), 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 1/3)};
			side_hair_cp2[i] = {
				x: forehead_right.x + i*span/2 + rand(-10, 10), 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 2/3) };
		}

		/* 右サイド髪の描画 */
		con.beginPath();
		con.moveTo(side_hair_roots[0].x, side_hair_roots[0].y);
		for (let i=0; i<side_hair_bunch; i++)
		{
			/* */
			drawCurve2(side_hair_roots[i], side_hair_tips[i], side_hair_cp1[i], side_hair_cp2[i] );
			con.lineWidth = 1;
			con.fillStyle = hair_color;
			con.strokeStyle = "#000";


			/*  */
			if( i+1<side_hair_bunch)
			{
				drawCurve2(side_hair_tips[i+1], side_hair_roots[i+1], side_hair_cp2[i], side_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					side_hair_tips[side_hair_tips.length -1], // 毛先から
					cheek_end[0], // 頬の端まで
					side_hair_cp2[side_hair_tips.length -1], // 毛先のCP
					side_hair_cp1[side_hair_tips.length -1]); // 毛先のCP
				/*
				drawCurve2(
					side_hair_tips[side_hair_tips.length -1], // 毛先から
					side_hair_right, // 横髪の一番外側まで
					side_hair_cp2[side_hair_tips.length -1], // 毛先のCP
					side_hair_cp1[side_hair_tips.length -1]); // 毛先のCP
					*/
			}
		}
		con.stroke();
		con.fill();
	}// forループ終わり
}

function drawOutsideHair(x = 0, cp = 0)
{
	let outside_hair_bunch=6;/* 髪の束数 */
	let side_hair_volume = 30;
	let hair_length = 200;

	let outside_hair_left = {
		x: temple_left.x - side_hair_volume,
		y: temple_left.y,
	};
	let outside_hair_right = {
		x: temple_right.x + side_hair_volume,
		y: temple_right.y,
	};

	/* 髪の束の間隔 */
	let span = Math.floor(side_hair_volume/outside_hair_bunch);

	// この関数のメインループ
	for (let j=0; j<1; j++)
	{
		outoutside_hair_roots = [];
		outoutside_hair_tips = [];
		outoutside_hair_cp1 = [];
		outoutside_hair_cp2 = [];


		// 左サイド髪の座標生成
		for (let i=0; i<=outside_hair_bunch; i++)
		{
			outside_hair_roots[i] = {
				x: outside_hair_left.x + i*span,// 外側からスパンを増やしていく。 
				y: outside_hair_left.y };// 高さは一定
			outside_hair_tips[i] = {
				x: outside_hair_left.x + i*span + rand(-60, 0) +x,
				y: outside_hair_left.y + rand(0, 20) + hair_length};
			outside_hair_cp1[i] = {
				x: outside_hair_left.x + i*span/2 + rand(-5, 5) -cp, 
				y: outside_hair_roots[i].y + sp(outside_hair_roots[i].y, outside_hair_tips[i].y, 1/3)};
			outside_hair_cp2[i] = {
				x: outside_hair_left.x + i*span/2 + rand(-1, 1) -cp, 
				y: outside_hair_roots[i].y + sp(outside_hair_roots[i].y, outside_hair_tips[i].y, 2/3) };
		}

		con.beginPath();

		// 最初の根本に移動
		con.moveTo(outside_hair_roots[0].x, outside_hair_roots[0].y);
		con.lineWidth = 1;
		//con.fillStyle = hair_color;
		con.strokeStyle = "#000";

		for (let i=0; i<outside_hair_bunch; i++)
		{
			// まず根本から毛先まで下ろす
			drawCurve2(
				outside_hair_roots[i], 
				outside_hair_tips[i], 
				outside_hair_cp1[i], 
				outside_hair_cp2[i] );

			// 配列の最後の一つ前まで
			if( i+1<outside_hair_bunch)
			{
				// 毛先から根本に向かってカーブを引く
				drawCurve2(
					outside_hair_tips[i+1], 
					outside_hair_roots[i+1], 
					outside_hair_cp2[i], 
					outside_hair_cp1[i+1]);
			}
			// 配列の最後
			else
			{
				// 配列の最後は
				drawCurve2(
					outside_hair_tips[outside_hair_tips.length -1], 
					temple_left, 
					outside_hair_cp2[outside_hair_tips.length -1], 
					outside_hair_cp1[outside_hair_tips.length -1]);
			}
			//con.stroke();
		}
		//con.fill();
	

		/* 中央 */
		drawCurve2(
			outside_hair_left,
			temple_right,
			head_cp2,
			head_cp1
		);

		outside_hair_roots = [];
		outside_hair_tips = [];
		outside_hair_cp1 = [];
		outside_hair_cp2 = [];


		for (let i=0; i<=outside_hair_bunch; i++)
		{
			outside_hair_roots[i] = {
				x: temple_right.x + i*span, 
				y: temple_right.y };
			outside_hair_tips[i] = {
				x: temple_right.x + i*span + rand(-60, 0) -x, 
				y: temple_right.y + rand(10, 20) + hair_length};
			outside_hair_cp1[i] = {
				x: temple_right.x + i*span/2 + rand(0, 10) +cp, 
				y: outside_hair_roots[i].y + sp(outside_hair_roots[i].y, outside_hair_tips[i].y, 1/3)};
			outside_hair_cp2[i] = {
				x: temple_right.x + i*span/2 + rand(-10, 10) +cp, 
				y: outside_hair_roots[i].y + sp(outside_hair_roots[i].y, outside_hair_tips[i].y, 2/3) };
		}

		//con.beginPath();
		con.lineTo(outside_hair_roots[0].x, outside_hair_roots[0].y);
		for (let i=0; i<outside_hair_bunch; i++)
		{
			drawCurve2(outside_hair_roots[i], outside_hair_tips[i], outside_hair_cp1[i], outside_hair_cp2[i] );
			con.lineWidth = 1;
			con.fillStyle = hair_color;
			con.strokeStyle = "#000";


			if( i+1<outside_hair_bunch)
			{
				drawCurve2(
					outside_hair_tips[i+1], 
					outside_hair_roots[i+1], 
					outside_hair_cp2[i], 
					outside_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					outside_hair_tips[outside_hair_tips.length -1], // 毛先から
					outside_hair_right, // 右の後ろ髪の外側
					outside_hair_cp2[outside_hair_tips.length -1], // 毛先のCP
					outside_hair_cp1[outside_hair_tips.length -1]); // 毛先のCP
			}
		}
		/* 中央 */
		drawCurve2(
			outside_hair_right,
			outside_hair_left,
			outside_hair_upper_cp1,
			outside_hair_upper_cp2
		);
		con.stroke();
		con.fill();
	}// forループ終わり

}


function drawBackHair()
{
	/* 前髪の束数 */
	let hair_bunch = 20;

	/* 前髪の長さの基準 */
	let hair_length = 400;

	/* 前髪の間隔 */
	let span = Math.floor(Math.abs(temple[0].x - temple[1].x)/hair_bunch);


	for (let j=0; j<=0; j++)
	{
		let span2 = j*span/2;

		/* 座標生成 */
		for (let i=0; i<=hair_bunch; i++)
		{
			let hair_rand = rand(-10, 10);

			if (i === 0 || i===hair_bunch)
			{
				back_hair_roots[i] = {
					x: temple[0].x + i*span + span2, 
					y: temple[1].y};
			}
			else
			{
				back_hair_roots[i] = {
					x: temple[0].x + i*span + span2, 
					y: temple[1].y + rand(10,20)};
			}

			back_hair_tips[i] = {
				x: temple[0].x + i*span + span/2 + rand(-20, 20), 
				y: temple[1].y + hair_length + rand(0, 30)};
			back_hair_cp1[i] = {
				x: temple[0].x + i*span + hair_rand, 
				y: back_hair_roots[i].y + sp(back_hair_roots[i].y, back_hair_tips[i].y, 1/4)};
			back_hair_cp2[i] = {
				x: temple[0].x + i*span + hair_rand, 
				y: back_hair_roots[i].y + sp(back_hair_roots[i].y, back_hair_tips[i].y, 2/4) };
		}


		/* 影 */
		con.save();
		con.translate(3, -30);
		con.scale(1, 1.14);

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(back_hair_roots[0].x, back_hair_roots[0].y);

		/* 描画処理 */
		for (let i=0; i<hair_bunch; i++)
		{
			drawCurve2(back_hair_roots[i], back_hair_tips[i], back_hair_cp1[i], back_hair_cp2[i]);

			if( i+1<hair_bunch)
			{
				drawCurve2(
					back_hair_tips[i+1], 
					back_hair_roots[i+1], 
					back_hair_cp2[i+1], 
					back_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					back_hair_tips[back_hair_tips.length -1], 
					temple[1], 
					back_hair_cp2[back_hair_tips.length -1], 
					back_hair_cp1[back_hair_tips.length -1]);
			}
		}
		con.restore();
		/* config */
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";
		con.globalAlpha = 0.4;

		con.fill();

		/* config */
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";
		con.globalAlpha = 1;

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(back_hair_roots[0].x, back_hair_roots[0].y);

		/* 描画処理 */
		for (let i=0; i<hair_bunch; i++)
		{
			drawCurve2(back_hair_roots[i], back_hair_tips[i], back_hair_cp1[i], back_hair_cp2[i]);

			if( i+1<hair_bunch)
			{
				//con.lineTo(back_hair_tips[i + 1].x, back_hair_tips[i + 1].y);
				drawCurve2(
					back_hair_tips[i+1], 
					back_hair_roots[i+1], 
					back_hair_cp2[i+1], 
					back_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					back_hair_tips[back_hair_tips.length -1], 
					temple[1], 
					back_hair_cp2[back_hair_tips.length -1], 
					back_hair_cp1[back_hair_tips.length -1]);
			}
			con.stroke();
		}
		con.fill();
	}
}



function drawBackHair3() {
	/* 前髪の束数 */
	let hair_bunch = 16;

	/* 前髪の長さの基準 */
	let hair_length = 400;


	/* 前髪の間隔 */
	let span = Math.floor((temple_right.x - temple_left.x)/hair_bunch);

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

			if (i <hair_bunch/2)
			{
				hair_length_plus += 10;
			}
			else if ( i===Math.floor(hair_bunch/2))
			{
			}
			else
			{
				hair_length_plus -= 5;
			}

			// 根本の座標
			if (i === 0 )// 最初
			{
				back_hair_roots[i] = {// 根本の座標
					// ループが進むにつれて指定したスパンごとにx座標が増える
					x: temple_left.x + i*span,
					y: temple_left.y};

				// 毛先の座標生成
				back_hair_tips[i] = {
					x: temple_left.x + i*span + rand(-60, 1), // 毛先のx座標は根本の座標から前後に揺らす
					y: temple_left.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
			}
			else if (i===hair_bunch)// 最後
			{
				back_hair_roots[i] = {// 根本の座標
					// ループが進むにつれて指定したスパンごとにx座標が増える
					x: temple_left.x,
					y: temple_left.y};

				// 毛先の座標生成
				back_hair_tips[i] = {
					x: temple_right.x + rand(-60, 2), // 毛先のx座標は根本の座標から前後に揺らす
					y: temple_left.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};

			}
			else// 間
			{
				back_hair_roots[i] = {
					x: temple_left.x + i*span, 
					y: temple_left.y + rand(-10,20)};// 毛先の高さは少し乱数を足す

				// 毛先の座標生成
				back_hair_tips[i] = {
					x: temple_left.x + i*span + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
					y: temple_left.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
			}

			// 制御点1
			back_hair_cp1[i] = {
				x: temple_left.x + i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
				y: back_hair_roots[i].y + sp(back_hair_roots[i].y, back_hair_tips[i].y, 1/4)};
			// 制御点2
			back_hair_cp2[i] = {
				x: temple_left.x + i*span + hair_rand, 
				y: back_hair_roots[i].y + sp(back_hair_roots[i].y, back_hair_tips[i].y, 2/4) };
		}


		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";
		con.globalAlpha = 0.4;

		con.beginPath();
		con.moveTo(back_hair_roots[0].x, back_hair_roots[0].y);

		for (let i=0; i<hair_bunch; i++)
		{
			// 上から下に下ろす
			drawCurve2(back_hair_roots[i], back_hair_tips[i], back_hair_cp1[i], back_hair_cp2[i]);

			if( i+1<hair_bunch)// 最大値-1の間
			{
				con.lineTo(back_hair_tips[i+1].x -10, back_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く

				drawCurve2(
					back_hair_tips[i+1], 
					back_hair_roots[i+1], 
					back_hair_cp2[i+1], 
					back_hair_cp1[i+1]);
			}
			else
			{
				con.lineTo(
					back_hair_tips[back_hair_tips.length -1].x +10, 
					back_hair_tips[back_hair_tips.length -1].y);
				drawCurve2(
					back_hair_tips[back_hair_tips.length -1], 
					temple_right, 
					back_hair_cp2[back_hair_tips.length -1], 
					back_hair_cp1[back_hair_tips.length -1]);
			}
			con.stroke();
		}
		con.fill();
		con.fillStyle = "#000";
		con.fill();
	}
	con.globalAlpha = 1;
}



function drawFrontHair4(type = 0, hair_length, hair_bunch )
{
	let hair_length_plus = 0;

	/* 前髪の間隔 */
	let span = Math.floor((forehead_right.x - forehead_left.x)/hair_bunch);

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
			let hair_rand = rand(-6, 6);

			if (i <hair_bunch/2)
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

			switch (type)
			{
				case 0:
					// 根本の座標
					if (i === 0 )// 最初
					{
						front_hair_roots[i] = {// 根本の座標
							// ループが進むにつれて指定したスパンごとにx座標が増える
							x: forehead_left.x + i*span,
							y: forehead_right.y};

						// 毛先の座標生成
						front_hair_tips[i] = {
							x: forehead_left.x + i*span + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
							y: forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
					}
					else if (i===hair_bunch)// 最後
					{
						front_hair_roots[i] = {// 根本の座標
							// ループが進むにつれて指定したスパンごとにx座標が増える
							x: forehead_right.x,
							y: forehead_right.y};

						// 毛先の座標生成
						front_hair_tips[i] = {
							x: forehead_right.x + rand(-5, 5), // 毛先のx座標は根本の座標から前後に揺らす
							y: forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
					}
					else// 間
					{
						front_hair_roots[i] = {
							x: forehead_left.x + i*span, 
							y: forehead_right.y + rand(0,20)};// 毛先の高さは少し乱数を足す

						// 毛先の座標生成
						front_hair_tips[i] = {
							x: forehead_left.x + i*span -10 + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
							y: forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
					}

					// 制御点1
					front_hair_cp1[i] = {
						x: forehead_left.x + i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 1/4)};
					// 制御点2
					front_hair_cp2[i] = {
						x: forehead_left.x + i*span + hair_rand, 
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 2/4) };
					break;

				case 1:
					if (i === 0 || i===hair_bunch)
					{
						front_hair_roots[i] = {
							x: forehead_left.x + i*span + span2, 
							y: forehead_right.y};
					}
					else
					{
						front_hair_roots[i] = {
							x: forehead_left.x + i*span + span2, 
							y: forehead_right.y + rand(10,20)};
					}

					front_hair_tips[i] = {
						x: forehead_left.x + i*span + span/2 + rand(-20, 20), 
						y: forehead_right.y + hair_length + rand(0, 30)};
					front_hair_cp1[i] = {
						x: forehead_left.x + i*span + hair_rand, 
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 1/4)};
					front_hair_cp2[i] = {
						x: forehead_left.x + i*span + hair_rand, 
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 2/4) };
					break;
				case 2:
					break;
				default:
					break;
			}

		}

		/* 影 */
		con.save();
		con.translate(3, -20);
		con.scale(1, 1.1);

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(front_hair_roots[0].x, front_hair_roots[0].y);

		for (let i=0; i<hair_bunch; i++)
		{
			// 上から下に下ろす
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i]);

			if( i+1<hair_bunch)// 最大値-1の間
			{
				con.lineTo(front_hair_tips[i+1].x -10, front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
				drawCurve2(
					front_hair_tips[i+1], 
					front_hair_roots[i+1], 
					front_hair_cp2[i+1], 
					front_hair_cp1[i+1]);
			}
			else
			{
				con.lineTo(
					front_hair_tips[front_hair_tips.length -1].x -10, 
					front_hair_tips[front_hair_tips.length -1].y);
				drawCurve2(
					front_hair_tips[front_hair_tips.length -1], 
					forehead_right, 
					front_hair_cp2[front_hair_tips.length -1], 
					front_hair_cp1[front_hair_tips.length -1]);
			}
		}
		con.restore();
		/* config */
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";
		con.globalAlpha = 0.4;

		con.fill();// 影を描画


		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";
		con.globalAlpha = 1;

		con.beginPath();
		con.moveTo(front_hair_roots[0].x, front_hair_roots[0].y);

		for (let i=0; i<hair_bunch; i++)
		{
			// 上から下に下ろす
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i]);

			if( i+1<hair_bunch)// 最大値-1の間
			{
				con.lineTo(front_hair_tips[i+1].x -10, front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
				drawCurve2(
					front_hair_tips[i+1], 
					front_hair_roots[i+1], 
					front_hair_cp2[i+1], 
					front_hair_cp1[i+1]);
			}
			else
			{
				con.lineTo(
					front_hair_tips[front_hair_tips.length -1].x -10, 
					front_hair_tips[front_hair_tips.length -1].y);
				drawCurve2(
					front_hair_tips[front_hair_tips.length -1], 
					forehead_right, 
					front_hair_cp2[front_hair_tips.length -1], 
					front_hair_cp1[front_hair_tips.length -1]);
			}
			con.stroke();
		}
		con.fill();
	}
	con.globalAlpha = 1;
}


function drawFrontHair3(type = 0, hair_length, hair_bunch )
{
	/* 前髪の束数 */
	//let hair_bunch = hair_bunch;

	/* 前髪の長さの基準 */
	//let hair_length = hair_length;

	let hair_length_plus = 0;

	/* 前髪の間隔 */
	let span = Math.floor((forehead_right.x - forehead_left.x)/hair_bunch);

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
			let hair_rand = rand(-6, 6);

			if (i <hair_bunch/2)
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

			switch (type)
			{
				case 0:
					// 根本の座標
					if (i === 0 )// 最初
					{
						front_hair_roots[i] = {// 根本の座標
							// ループが進むにつれて指定したスパンごとにx座標が増える
							x: forehead_left.x + i*span,
							y: forehead_right.y};

						// 毛先の座標生成
						front_hair_tips[i] = {
							x: forehead_left.x + i*span + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
							y: forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
					}
					else if (i===hair_bunch)// 最後
					{
						front_hair_roots[i] = {// 根本の座標
							// ループが進むにつれて指定したスパンごとにx座標が増える
							x: forehead_right.x,
							y: forehead_right.y};

						// 毛先の座標生成
						front_hair_tips[i] = {
							x: forehead_right.x + rand(-5, 5), // 毛先のx座標は根本の座標から前後に揺らす
							y: forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
					}
					else// 間
					{
						front_hair_roots[i] = {
							x: forehead_left.x + i*span, 
							y: forehead_right.y + rand(0,20)};// 毛先の高さは少し乱数を足す

						// 毛先の座標生成
						front_hair_tips[i] = {
							x: forehead_left.x + i*span -10 + rand(-10, 10), // 毛先のx座標は根本の座標から前後に揺らす
							y: forehead_right.y + hair_length + /*rand(0, 2)*/ + hair_length_plus};
					}

					// 制御点1
					front_hair_cp1[i] = {
						x: forehead_left.x + i*span + hair_rand,// 制御点のx座標は根本から乱数で揺らす
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 1/4)};
					// 制御点2
					front_hair_cp2[i] = {
						x: forehead_left.x + i*span + hair_rand, 
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 2/4) };
					break;

				case 1:
					if (i === 0 || i===hair_bunch)
					{
						front_hair_roots[i] = {
							x: forehead_left.x + i*span + span2, 
							y: forehead_right.y};
					}
					else
					{
						front_hair_roots[i] = {
							x: forehead_left.x + i*span + span2, 
							y: forehead_right.y + rand(10,20)};
					}

					front_hair_tips[i] = {
						x: forehead_left.x + i*span + span/2 + rand(-20, 20), 
						y: forehead_right.y + hair_length + rand(0, 30)};
					front_hair_cp1[i] = {
						x: forehead_left.x + i*span + hair_rand, 
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 1/4)};
					front_hair_cp2[i] = {
						x: forehead_left.x + i*span + hair_rand, 
						y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 2/4) };
					break;
				case 2:
					break;
				default:
					break;
			}

		}

		/* 影 */
		con.save();
		con.translate(3, -20);
		con.scale(1, 1.1);

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(front_hair_roots[0].x, front_hair_roots[0].y);

		for (let i=0; i<hair_bunch; i++)
		{
			// 上から下に下ろす
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i]);

			if( i+1<hair_bunch)// 最大値-1の間
			{
				con.lineTo(front_hair_tips[i+1].x -10, front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
				drawCurve2(
					front_hair_tips[i+1], 
					front_hair_roots[i+1], 
					front_hair_cp2[i+1], 
					front_hair_cp1[i+1]);
			}
			else
			{
				con.lineTo(
					front_hair_tips[front_hair_tips.length -1].x -10, 
					front_hair_tips[front_hair_tips.length -1].y);
				drawCurve2(
					front_hair_tips[front_hair_tips.length -1], 
					forehead_right, 
					front_hair_cp2[front_hair_tips.length -1], 
					front_hair_cp1[front_hair_tips.length -1]);
			}
		}
		con.restore();
		/* config */
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";
		con.globalAlpha = 0.4;

		con.fill();// 影を描画


		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";
		con.globalAlpha = 1;

		con.beginPath();
		con.moveTo(front_hair_roots[0].x, front_hair_roots[0].y);

		for (let i=0; i<hair_bunch; i++)
		{
			// 上から下に下ろす
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i]);

			if( i+1<hair_bunch)// 最大値-1の間
			{
				con.lineTo(front_hair_tips[i+1].x -10, front_hair_tips[i+1].y);// 毛先1から毛先2までラインを引く
				drawCurve2(
					front_hair_tips[i+1], 
					front_hair_roots[i+1], 
					front_hair_cp2[i+1], 
					front_hair_cp1[i+1]);
			}
			else
			{
				con.lineTo(
					front_hair_tips[front_hair_tips.length -1].x -10, 
					front_hair_tips[front_hair_tips.length -1].y);
				drawCurve2(
					front_hair_tips[front_hair_tips.length -1], 
					forehead_right, 
					front_hair_cp2[front_hair_tips.length -1], 
					front_hair_cp1[front_hair_tips.length -1]);
			}
			con.stroke();
		}
		con.fill();
	}
	con.globalAlpha = 1;
}




function drawFrontHair2(hair_length, hair_bunch )
{
	/* 前髪の束数 */
	//let hair_bunch = 40;

	/* 前髪の長さの基準 */
	//let hair_length = 100;

	/* 前髪の間隔 */
	let span = Math.floor((forehead_right.x - forehead_left.x)/hair_bunch);


	for (let j=0; j<=0; j++)
	{
		let span2 = j*span/2;

		/* 座標生成 */
		for (let i=0; i<=hair_bunch; i++)
		{
			let hair_rand = rand(-10, 10);

			if (i === 0 || i===hair_bunch)
			{
				front_hair_roots[i] = {
					x: forehead_left.x + i*span + span2, 
					y: forehead_right.y};
			}
			else
			{
				front_hair_roots[i] = {
					x: forehead_left.x + i*span + span2, 
					y: forehead_right.y + rand(10,20)};
			}

			front_hair_tips[i] = {
				x: forehead_left.x + i*span + span/2 + rand(-20, 20), 
				y: forehead_right.y + hair_length + rand(0, 30)};
			front_hair_cp1[i] = {
				x: forehead_left.x + i*span + hair_rand, 
				y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 1/4)};
			front_hair_cp2[i] = {
				x: forehead_left.x + i*span + hair_rand, 
				y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 2/4) };
		}


		/* 影 */
		con.save();
		con.translate(3, -30);
		con.scale(1, 1.14);

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(front_hair_roots[0].x, front_hair_roots[0].y);

		/* 描画処理 */
		for (let i=0; i<hair_bunch; i++)
		{
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i]);

			if( i+1<hair_bunch)
			{
				drawCurve2(
					front_hair_tips[i+1], 
					front_hair_roots[i+1], 
					front_hair_cp2[i+1], 
					front_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					front_hair_tips[front_hair_tips.length -1], 
					forehead_right, 
					front_hair_cp2[front_hair_tips.length -1], 
					front_hair_cp1[front_hair_tips.length -1]);
			}
			//con.stroke();
		}
		con.restore();
		/* config */
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";
		con.globalAlpha = 0.4;

		con.fill();// 影を描画



		/* config */
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";
		con.globalAlpha = 1;

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(front_hair_roots[0].x, front_hair_roots[0].y);

		/* 描画処理 */
		for (let i=0; i<hair_bunch; i++)
		{
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i]);

			if( i+1<hair_bunch)
			{
				drawCurve2(
					front_hair_tips[i+1], 
					front_hair_roots[i+1], 
					front_hair_cp2[i+1], 
					front_hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					front_hair_tips[front_hair_tips.length -1], 
					forehead_right, 
					front_hair_cp2[front_hair_tips.length -1], 
					front_hair_cp1[front_hair_tips.length -1]);
			}
			con.stroke();
		}
		con.fill();
	}
}


function drawIris()
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
		con.lineWidth = 4;
		con.fillStyle = "#a22";
		con.strokeStyle = "#000";

		/* 瞳の円1 */
		con.save();
		con.translate(0, -(center.y*eye_scale - center.y));
		con.scale(1, eye_scale);
		con.beginPath();
		con.arc(
			eye_head[i].x + eye_position * pn, center.y, 
			eye_size,  
			Math.PI * 2, false);
		con.restore();
		con.fill();
		con.stroke();

		/* config */
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";

		/* 瞳の円2 */
		con.save();
		con.translate(0, -(center.y*eye_scale - center.y));
		con.scale(1, eye_scale);
		con.beginPath();
		con.arc(
			eye_head[i].x + eye_position * pn,
			center.y, 
			7,  
			Math.PI * 2, false);
		con.restore();
		con.fill();

		/* config */
		con.lineWidth = 1;
		con.fillStyle = "#fff";
		con.strokeStyle = "#fff";
		/* 瞳の反射 */
		con.save();
		con.translate(0, -(center.y*eye_highlight_scale - center.y));
		con.scale(1, eye_highlight_scale);
		con.beginPath();
		con.arc(
			eye_head[i].x+ eye_position *pn + 10 + eye_position_rand , 
			center.y -10, 
			5,  
			Math.PI * 2, false);
		con.arc(
			eye_head[i].x+ eye_position *pn + 4  + eye_position_rand, 
			center.y -5, 
			2, 
			Math.PI * 2, false);
		con.restore();
		con.fill();
	}
}

function drawMouth()
{
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#aaa";

	con.beginPath();
	drawCurve2(mouth_start, mouth_end, mouth_cp1, mouth_cp2, true);
	con.stroke();

	drawLowerLipShadow();
}
function drawLowerLip()
{
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#f00";
	con.strokeStyle = "#f00";

	con.beginPath();
	con.globalAlpha = 0.2;
	drawCurve2(mouth_end, mouth_start, mouth_cp2, mouth_cp1, true);
	drawCurve2(mouth_start, mouth_end, lower_lip_cp3, lower_lip_cp4);
	con.fill();
	con.globalAlpha = 1;
}
function drawLowerLipShadow()
{
	/* config */
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#000";

	con.beginPath();
	con.globalAlpha = 0.2;
	drawCurve2(lower_lip_start, lower_lip_end, lower_lip_cp1, lower_lip_cp2, true);
	drawCurve2(lower_lip_end, lower_lip_start, lower_lip_cp4, lower_lip_cp3);
	con.fill();
	con.globalAlpha = 1;
	/*
	fillR(lower_lip_start, "red");
	fillR(lower_lip_end, "red");
	fillR(lower_lip_cp1, "red");
	fillR(lower_lip_cp2, "red");
	*/
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
	//con.lineTo(nose_top.x-6, nose_top.y +6);
	//con.lineTo(nose_top.x, nose_top.y);
	con.stroke();
	con.beginPath();
	drawCurve2(nose_top, nose_bottom, nose_cp1, nose_cp2);
	con.fill();
	//fillR(nose_cp1);
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

const LEFT = -1;
const RIGHT = 1;
function drawCatalinaHair(length, split, direction = LEFT)
{
	let hair_bunch = 5;
	/*
	 * 分け目の位置を変数で保持
	 * 分け目の範囲はforehead_leftからforehead_rightの間
	 */

	// 分け目の座標
	// 左右で分けずに左のforeheadを基点とする
	let split_point = 
		{
			x: forehead_left.x + sp(forehead_left.x, forehead_right.x, split),
			y: forehead_left.y,
		};
	let start_root =
		{
			x: split_point.x + 10,
			y: split_point.y - 110,
		}

	/* 髪の間隔 */
	let roots_span = {
		x: Math.floor(Math.abs(start_root.x - split_point.x)/hair_bunch),
		y: Math.floor(Math.abs(start_root.y - split_point.y)/hair_bunch),
	}
	//let tips_span = 10;// 任意の値
	let tip_base = 80;
	let tips_span = Math.floor(tip_base/hair_bunch);

	let hair_roots = [];
	let hair_tips = [];
	let hair_cp1 = [];
	let hair_cp2 = [];


	for (let j=0; j<=2; j++)
	{
		/* 座標生成 */
		for (let i=0; i<=hair_bunch; i++)
		{
			let hair_rand = rand(-10, -9);

			hair_roots[i] = {
				x: split_point.x + generateCoordinateX(split_point, start_root, i*roots_span.y), 
				y: split_point.y - generateCoordinateY(split_point, start_root, i*roots_span.x),
			}

			if (direction === 1)
			{
				hair_tips[i] = {
					x: split_point.x + 100*direction + i*tips_span*direction + rand(-20, 0), 
					y: split_point.y + length - rand(0, 40)};
			}
			else
			{
				hair_tips[i] = {
					x: hair_roots[i].x + 100*direction + i*tips_span*direction + rand(-20, 0), 
					y: split_point.y + length - rand(0, 40)};
			}
			hair_cp1[i] = {
				x: hair_tips[i].x + direction*10,
				y: hair_roots[i].y - sp(hair_roots[i].y, hair_tips[i].y, 1/4) + i*10,
			}
			hair_cp2[i] = {
				x: hair_tips[i].x + direction*40,
				y: hair_roots[i].y + sp(hair_roots[i].y, hair_tips[i].y, 1/2) ,
				}
			fillR(hair_roots[i], "red");
			fillR(hair_tips[i], "green");
			fillR(hair_cp1[i], "blue");
			fillR(hair_cp2[i], "orange");
		}
		/* config */
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";
		con.globalAlpha = 1;
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		con.strokeStyle = "#000";

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(hair_roots[0].x, hair_roots[0].y);

		/* 描画処理 */
		for (let i=0; i<hair_bunch; i++)
		{
			drawCurve2(hair_roots[i], hair_tips[i], hair_cp1[i], hair_cp2[i]);

			if( i+1<hair_bunch)
			{
				drawCurve2(
					hair_tips[i+1], 
					hair_roots[i+1], 
					hair_cp2[i+1], 
					hair_cp1[i+1]);
			}
			else
			{
				drawCurve2(
					hair_tips[hair_tips.length -1], 
					start_root, 
					hair_cp2[hair_tips.length -1], 
					hair_cp1[hair_tips.length -1]);
			}
			con.stroke();
		}
		/*
		//con.fill();
		drawCurve2(first_tip1, split_point, first_root_cp2, first_root_cp1);
		con.stroke();
		*/
		con.fill();
	}
	fillR(split_point, "#090");
	fillR(start_root, "red");
}
