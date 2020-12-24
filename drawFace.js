
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
	//drawRearHair1();
	drawNeck();
	drawNeckShadow();
	drawEar();
	drawOutline();
	drawWhiteEyes();
	drawNose();
	drawMouth();
	drawEyes2();
	drawCenter();
	drawEyeblow();
	drawEyelid();
	drawEyeline2();
	drawEyelashes()
	drawLowerEyelid();
	drawSkinHead();
	drawFrontHair2();
	drawSideHair2();
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
	setInterval(mainLoop, 1000/8)
	*/
	draw();
}

function drawEyeblow()
{
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#000";
		con.strokeStyle = "#000";
		con.beginPath();
		drawCurve2(eyeblow_start[i], eyeblow_end[i], eyeblow_upper_cp1[i], eyeblow_upper_cp2[i], true );
		drawCurve2(eyeblow_end[i], eyeblow_start[i], eyeblow_lower_cp2[i], eyeblow_lower_cp1[i] );
		con.fill();
		fillR(eyeblow_upper_cp1[i]);
		fillR(eyeblow_upper_cp2[i]);
		fillR(eyeblow_lower_cp1[i]);
		fillR(eyeblow_lower_cp2[i]);
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

		fillR(inner_ear_start[i], "blue");
		fillR(inner_ear_end[i], "blue");
		fillR(inner_ear_cp1[i], "blue");
		fillR(inner_ear_cp2[i], "blue");
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
	for (let i=0; i<2; i++)
	{
		fillR(cheek_start[i], "red");
		fillR(cheek_end[i], "green");
	}
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
		drawCurve(lower_eyelid_start[i], eye_end[i], lower_eyelid_cp1[i], true);
		drawCurve2(eye_end[i], lower_eyelid_start[i], lower_eyelid_cp4[i],lower_eyelid_cp3[i]);
		//con.stroke();
		con.fill();
		fillR(lower_eyelid_cp3[i]);
		fillR(lower_eyelid_cp4[i]);
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
		//con.stroke();
		con.fill();
	}
}

function drawEyes2()
{
	drawIris();
	drawEyeline();
}
function drawEyeline()
{
	// 左右の座標は既に用意してある
	// 配列で管理しているのでループのインデックス番号を合わせて回す
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
}
function drawNeckShadow()
{
	con.save();
	con.translate(0, 30);
	con.lineWidth = 1;
	con.fillStyle = "#000";
	con.strokeStyle = "#f00";
	con.beginPath();
	drawCurve2(cheek_end[1], cheek_start[1], cheek_cp2[1], cheek_cp1[1], true );
	drawCurve2(chin_start, chin_end, chin_cp1, chin_cp2 );
	drawCurve2(cheek_start[0], cheek_end[0], cheek_cp1[0], cheek_cp2[0], false );
	con.restore();
	con.globalAlpha = 0.1;
	con.fillStyle = "#000";
	con.strokeStyle = "#f00";
	con.fill();
	con.globalAlpha = 1;
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#fff";
		con.strokeStyle = "#000";
		con.beginPath();
		drawCurve2(neck_end[i], neck_start[i], neck_cp2[i],neck_cp1[i], true);
		con.lineTo(neck_terminal1[i].x, neck_terminal1[i].y);
		con.lineTo(neck_terminal2[i].x, neck_terminal2[i].y);
		con.fill();
	}
	for (let i=0; i<2; i++)
	{
		con.lineWidth = 1;
		con.fillStyle = "#fee";
		con.strokeStyle = "#000";
		con.beginPath();
		drawCurve2(neck_start[i], neck_end[i], neck_cp1[i],neck_cp2[i], true);
		con.stroke();
	}
}

function drawEyelashes()
{
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
		/*
		fillR(eyelash_start[i]);
		fillR(eyelash_end[i]);
		fillR(eyelash_cp1[i], "red");
		*/
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
	con.globalAlpha = 1;
	fillR(forehead_right);
	fillR(forehead_left);
}

function drawRearHair1()
{
	for (let j=0; j<8; j++)
	{
		for (let i=0; i<(cheek_end[0].x - cheek_end[1].x); i++)
		{
			rear_hair_roots[i] = {x: cheek_end[1].x + i, y: cheek_end[0].y};
			rear_hair_tips[i] = {x: cheek_end[1].x + i + rand(-10, 10), y: rear_hair_roots[i].y + 200 + rand(0, 200)};
			rear_hair_cp1[i] = {x: cheek_end[1].x + i + rand(-20, 20), y: rear_hair_roots[i].y + sp(rear_hair_roots[i].y, rear_hair_tips[i].y, 1/3)};
			rear_hair_cp2[i] = {x: cheek_end[1].x + i + rand(-20, 20), y: rear_hair_roots[i].y + sp(rear_hair_roots[i].y, rear_hair_tips[i].y, 2/3)};
		}
		for (let i=0; i<rear_hair_roots.length; i++)
		{
			con.lineWidth = 1;
			con.fillStyle = "#000";
			con.strokeStyle = hair_color;
			con.beginPath();
			drawCurve2(rear_hair_roots[i], rear_hair_tips[i], rear_hair_cp1[i], rear_hair_cp2[i], true );
			con.globalAlpha = 0.8;
			con.stroke();
			/* 影 */
			/*
			con.strokeStyle = "#000";
			con.globalAlpha = 0.1;
			con.stroke();
			*/
		}
	}
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



/***********************
 * サイドヘアー
***********************/
function drawSideHair2()
{
	let side_hair_bunch=4;/* 髪の束数 */

	//let span = Math.floor(Math.abs(cheek_end[1].x - forehead_left.x)/side_hair_bunch);
	/* 髪の束の間隔 */
	let span = Math.floor(Math.abs(side_hair_left.x - forehead_left.x)/side_hair_bunch);

	/* サイクル */
	for (let j=0; j<1; j++)
	{

		/* 配列初期化 */
		side_hair_roots = [];
		side_hair_tips = [];
		side_hair_cp1 = [];
		side_hair_cp2 = [];


		/* 左サイド髪の座標生成 */
		for (let i=0; i<=side_hair_bunch; i++)
		{
			/* ループの最初 */
			if (i === 0)
			{
				side_hair_roots[i] = {
					x: side_hair_left.x - i*span, 
					y: side_hair_left.y};
				side_hair_tips[i] = {
					x: side_hair_left.x + i*span + rand(0, 60), 
					y: side_hair_left.y + rand(0, 20) + 200};
				side_hair_cp1[i] = {
					x: side_hair_left.x + i*span/2 + rand(-5, 5), 
					y: side_hair_left.y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 1/3)};
				side_hair_cp2[i] = {
					x: side_hair_left.x + i*span/2 + rand(-1, 1), 
					y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 2/3) };
			}
			else
			{
				side_hair_roots[i] = {
					x: cheek_end[1].x + i*span, 
					y: cheek_end[1].y + generateCoordinateLeft(i*span)};
				side_hair_tips[i] = {
					x: cheek_end[1].x + i*span + rand(0, 60), 
					y: cheek_end[1].y /* -generateCoordinateLeft(i*span)*/ + rand(0, 20) + 200};
				side_hair_cp1[i] = {
					x: cheek_end[1].x + i*span/2 + rand(-5, 5), 
					y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 1/3)};
				side_hair_cp2[i] = {
					x: cheek_end[1].x + i*span/2 + rand(-1, 1), 
					y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 2/3) };
			}
		}


		/* 左サイド髪の描画 */
		con.beginPath();
		con.moveTo(side_hair_left.x, side_hair_left.y);
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
				y: cheek_end[0].y + rand(10, 20) + 200};
			side_hair_cp1[i] = {
				x: forehead_right.x + i*span/2 + rand(0, 10), 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 1/3)};
			side_hair_cp2[i] = {
				x: forehead_right.x + i*span/2 + rand(-10, 10), 
				y: side_hair_roots[i].y + sp(side_hair_roots[i].y, side_hair_tips[i].y, 2/3) };
		}

		/*
		side_hair_roots.push({
		x: side_hair_right.x + side_hair_roots.length-1*span, 
		y: side_hair_right.y});
		side_hair_tips.push({
		x: side_hair_right.x + side_hair_roots.length-1*span + rand(-60, 0), 
		y: cheek_end[0].y + rand(10, 20) + 200});
		side_hair_cp1.push({
		x: side_hair_right.x + side_hair_roots.length-1*span/2 + rand(0, 10), 
		y: side_hair_roots[side_hair_roots.length-1].y + sp(side_hair_roots[side_hair_roots.length-1].y, side_hair_tips[side_hair_roots.length-1].y, 1/3)});
		side_hair_cp2.push({
		x: side_hair_right.x + side_hair_roots.length-1*span/2 + rand(-10, 10), 
		y: side_hair_roots[side_hair_roots.length-1].y + sp(side_hair_roots[side_hair_roots.length-1].y, side_hair_tips[side_hair_roots.length-1].y, 2/3) });
		*/


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
					side_hair_tips[side_hair_tips.length -1], 
					cheek_end[0], 
					side_hair_cp2[side_hair_tips.length -1], 
					side_hair_cp1[side_hair_tips.length -1]);
				/*
				drawCurve2(
					side_hair_tips[side_hair_tips.length -1], 
					side_hair_right, 
					side_hair_cp2[side_hair_tips.length -1], 
					side_hair_cp1[side_hair_tips.length -1]);
					*/
			}
			con.stroke();
		}
		con.fill();
	}// forループ終わり
}


function drawFrontHair2()
{
	/* 前髪の束数 */
	let hair_bunch = 15;

	/* 前髪の長さの基準 */
	let hair_length = 100;

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

		/* config */
		con.lineWidth = 1;
		con.fillStyle = hair_color;
		//con.strokeStyle = hair_color;
		con.strokeStyle = "#000";

		/* パスを開始 */
		con.beginPath();
		/* 開始座標を指定 */
		con.moveTo(front_hair_roots[0].x, front_hair_roots[0].y);

		/* 描画処理 */
		for (let i=0; i<=hair_bunch; i++)
		{
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i]);

			if( i+1<=hair_bunch)
			{
				//con.lineTo(front_hair_tips[i + 1].x, front_hair_tips[i + 1].y);
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


function drawFrontHair1()
{
	for (let j=0; j<6; j++)
	{
		for (let i=0; i<(forehead_right.x - forehead_left.x); i++)
		{
			front_hair_roots[i] = {x: forehead_left.x + i, y: forehead_right.y};
			front_hair_tips[i] = {x: forehead_left.x + i + rand(-10, 10), y: forehead_right.y + 80 + rand(-10, 10)};
			front_hair_cp1[i] = {x: forehead_left.x + i + rand(-10, 10), y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 1/3)};
			front_hair_cp2[i] = {x: forehead_left.x + i + rand(-10, 10), y: front_hair_roots[i].y + sp(front_hair_roots[i].y, front_hair_tips[i].y, 2/3) };
		}
		for (let i=0; i<front_hair_roots.length; i++)
		{
			con.lineWidth = 1;
			con.fillStyle = "#000";
			con.strokeStyle = hair_color;
			con.beginPath();
			drawCurve2(front_hair_roots[i], front_hair_tips[i], front_hair_cp1[i], front_hair_cp2[i], true );
			con.globalAlpha = 0.8;
			con.stroke();
		}
	}
	con.globalAlpha = 1;
}

function drawIris()
{
	let eye_size = 25;
	let eye_position = 40;
	let eye_position_rand = rand(-1,1);
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
		con.fillStyle = "#974";
		con.strokeStyle = "#000";

		/* 瞳の円1 */
		con.save();
		con.scale(1, 1.2);
		con.beginPath();
		con.arc(eye_head[i].x + eye_position * pn, center.y -48 -8, eye_size,  Math.PI * 2, false);
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
		con.arc(eye_head[i].x + eye_position * pn, center.y -48 -8, 7,  Math.PI * 2, false);
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
		con.arc(eye_head[i].x+ eye_position *pn + 10 + eye_position_rand , center.y -110 -16, 5,  Math.PI * 2, false);
		con.arc(eye_head[i].x+ eye_position *pn + 4  + eye_position_rand, center.y -105 -16, 2,  Math.PI * 2, false);
		con.restore();
		con.fill();
	}
}

/* 輪郭 */
function drawOutlines(bool)
{
	let pn = 1;
	bool ? pn = 1: pn = -1;

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

function drawHair001()
{
}
