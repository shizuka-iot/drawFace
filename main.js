

let hair_arr = {
		color_r: 180,
		color_g: 180,
		color_b: 180,
		front_hair_type: 2,
		outside_back_hair_bunch: 10 ,
		outside_back_hair_length : 100,
		back_hair_bunch : 10,
		back_hair_length: 100,
		front_hair_bunch: 10,
		front_hair_length: 100,
		side_hair_length : 100,
		side_hair_bunch : 5,
		outside_hair_bunch: 5,
		outside_hair_length: 100,
};

let iris_arr = {
	color_r: 20,
	color_g: 20,
	color_b: 20,
};

let eye_size = 28;
let eye_position = {x: 41, y: 0};

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
let face = new DrawFace("can2", "aeaeaa", eye_size, eye_position, hair_arr, iris_arr);

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
