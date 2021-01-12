
let eye_size = 28;
let eye_position = {x: 41, y: 0};

let eye_arr = {
	eyeblow_cp_par: -20,
	eye_head_width: 0,
	eye_head_height: 0,
	upper_eyeline_end_x_slide: 0,
	span_to_eye_x: 0,
};

let eyeblow_arr = {
	head_x: 0,
	head_height: 0,
	end_x: 0,
	end_height: 0,
	cp_height: -20,
};

let span_to_eye_x = document.getElementById("span_to_eye_x");
span_to_eye_x.oninput = (e)=>{
	face.span_to_eye_x = Number(span_to_eye_x.value);
};
let upper_eyeline_end_x_slide = document.getElementById("upper_eyeline_end_x_slide");
upper_eyeline_end_x_slide.oninput = (e)=>{
	face.upper_eyeline_end_x_slide = Number(upper_eyeline_end_x_slide.value);
};
let eyeblow_cp_height = document.getElementById("eyeblow_cp_height");
eyeblow_cp_height.oninput = (e)=>{
	face.eyeblow_arr.cp_height = Number(eyeblow_cp_height.value);
};
let eyeblow_head_x = document.getElementById("eyeblow_head_x");
eyeblow_head_x.oninput = (e)=>{
	face.eyeblow_arr.head_x = Number(eyeblow_head_x.value);
};
eyeblow_head_height.oninput = (e)=>{
	face.eyeblow_arr.head_height = Number(eyeblow_head_height.value);
};
eyeblow_end_x.oninput = (e)=>{
	face.eyeblow_arr.end_x = Number(eyeblow_end_x.value);
};
eyeblow_end_height.oninput = (e)=>{
	face.eyeblow_arr.end_height = Number(eyeblow_end_height.value);
};



let eye_head_width = document.getElementById("eye_head_width");
eye_head_width.oninput = (e)=>{
	face.eye_head_width = Number(eye_head_width.value);
};
let eye_head_height = document.getElementById("eye_head_height");
eye_head_height.oninput = (e)=>{
	face.eye_head_height = Number(eye_head_height.value);
};



let hair_arr = {
		color_r: 180,
		color_g: 180,
		color_b: 180,
		front_hair_type: 2,
		outside_back_hair_bunch: 1 ,
		outside_back_hair_length : 10,
		back_hair_bunch : 1,
		back_hair_length: 10,
		front_hair_bunch: 1,
		front_hair_length: 10,
		side_hair_length : 10,
		side_hair_bunch : 1,
		outside_hair_bunch: 1,
		outside_hair_length: 10,
};

let outline_arr = {
	cheek_width: 0,
	chin_width: 0,
};
let cheek_width = document.getElementById("cheek_width");
cheek_width.oninput = (e)=>{
	face.cheek_width = Number(cheek_width.value);
};
let chin_width = document.getElementById("chin_width");
chin_width.oninput = (e)=>{
	face.chin_width = Number(chin_width.value);
};



let mouth_arr = {
	width: 30,
	height: 0,
	cp_height: 10,
};
let mouth_width = document.getElementById("mouth_width");
mouth_width.oninput = (e)=>{
	face.mouth_width = Number(mouth_width.value);
};
let mouth_height = document.getElementById("mouth_height");
mouth_height.oninput = (e)=>{
	face.mouth_height = Number(mouth_height.value);
};
let mouth_cp_height = document.getElementById("mouth_cp_height");
mouth_cp_height.oninput = (e)=>{
	face.mouth_cp_height = Number(mouth_cp_height.value);
};



let iris_arr = {
	color_r: 20,
	color_g: 20,
	color_b: 20,
};

let iris_color_r = document.getElementById("iris_color_r");
iris_color_r.oninput = (e)=>{
	face.iris_color_r = Number(iris_color_r.value);
};
let iris_color_g = document.getElementById("iris_color_g");
iris_color_g.oninput = (e)=>{
	face.iris_color_g = Number(iris_color_g.value);
};
let iris_color_b = document.getElementById("iris_color_b");
iris_color_b.oninput = (e)=>{
	face.iris_color_b = Number(iris_color_b.value);
};

let hair_color_r = document.getElementById("hair_color_r");
hair_color_r.oninput = (e)=>{
	face.hair_color_r = Number(hair_color_r.value);
};
let hair_color_g = document.getElementById("hair_color_g");
hair_color_g.oninput = (e)=>{
	face.hair_color_g = Number(hair_color_g.value);
};
let hair_color_b = document.getElementById("hair_color_b");
hair_color_b.oninput = (e)=>{
	face.hair_color_b = Number(hair_color_b.value);
};

// エレメント取得
// 目の大きさ
let eye_size_param = document.getElementById("eye_size");
// 目の水平
let eye_position_x = document.getElementById("eye_position_x");
// 目の高さ
let eye_position_y = document.getElementById("eye_position_y");

// 前髪の長さ
let front_length = document.getElementById("front_hair_length");
// 前髪の束数
let front_bunch = document.getElementById("front_hair_bunch");

// 横髪の長さ
let side_length = document.getElementById("side_hair_length");
// 横髪の束数
let side_bunch = document.getElementById("side_hair_bunch");

// 横髪外側の長さ
let outside_length = document.getElementById("outside_hair_length");
// 横髪外側の束数
let outside_bunch = document.getElementById("outside_hair_bunch");

// 後ろ髪の長さ
let back_length = document.getElementById("back_hair_length");
// 後ろ髪の束数
let back_bunch = document.getElementById("back_hair_bunch");

// 後ろ髪外側の長さ
let outside_back_length = document.getElementById("outside_back_hair_length");
// 後ろ髪外側の束数
let outside_back_bunch = document.getElementById("outside_back_hair_bunch");

// イベントが起きたときの処理
eye_size_param.oninput = (e)=>{
	face.eye_size = Number(eye_size_param.value);
};
eye_position_x.oninput = (e)=>{
	face.eye_position.x = Number(eye_position_x.value);
};
eye_position_y.oninput = (e)=>{
	face.eye_position.y = Number(eye_position_y.value);
};
front_length.oninput = (e)=>{
	face.front_hair_length = Number(front_length.value);
};
front_bunch.oninput = (e)=>{
	face.front_hair_bunch = Number(front_bunch.value);
};
side_length.oninput = (e)=>{
	face.side_hair_length = Number(side_length.value);
};
side_bunch.oninput = (e)=>{
	face.side_hair_bunch = Number(side_bunch.value);
};
outside_length.oninput = (e)=>{
	face.outside_hair_length = Number(outside_length.value);
};
outside_bunch.oninput = (e)=>{
	face.outside_hair_bunch = Number(outside_bunch.value);
};
back_length.oninput = (e)=>{
	face.back_hair_length = Number(back_length.value);
};
back_bunch.oninput = (e)=>{
	face.back_hair_bunch = Number(back_bunch.value);
};
outside_back_length.oninput = (e)=>{
	face.outside_back_hair_length = Number(outside_back_length.value);
};
outside_back_bunch.oninput = (e)=>{
	face.outside_back_hair_bunch = Number(outside_back_bunch.value);
};
/*
front_length.oninput = frontLengthInput;

function frontLengthInput(e) {
	face.front_hair_length = Number(front_length.value);
}
*/

let front_hair_types = document.getElementsByName("front_hair_type");
for (let i=0; i<front_hair_types.length; i++)
{
	front_hair_types[i].onclick = ()=>{
		face.front_hair_type = Number(front_hair_types[i].value);
	}
}


// クラスインスタンス作成
let face = new DrawFace("can2", "aeaeaa", eye_size, eye_position, hair_arr, iris_arr, mouth_arr, outline_arr, eye_arr, eyeblow_arr);

// メインループ関数
// インスタンスの更新メソッド・描画メソッドを実行
function mainLoop2()
{
	face.update();
	face.draw();
}

// 実際に関数を実行
// ループを定期的に呼び出す
window.onload = ()=>{
	//setInterval(mainLoop, 1000/5);
	setInterval(mainLoop2, 1000/5);
}
