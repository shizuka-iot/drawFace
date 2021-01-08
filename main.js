

let hair_arr = {
		outside_back_hair_bunch: 10 ,
		outside_back_hair_length : 100,
		back_hair_bunch : 3,
		back_hair_length: 100,
		front_hair_bunch: 10,
		front_hair_length: 100,
		side_hair_length : 100,
		side_hair_bunch : 5,
		outside_hair_bunch: 5,
		outside_hair_length: 100,
};

let eye_size = 28;
let eye_position = 41;

let eye_size_param = document.getElementById("eye_size");
let eye_position_param = document.getElementById("eye_position");

let front_length = document.getElementById("front_hair_length");
let front_bunch = document.getElementById("front_hair_bunch");
let side_length = document.getElementById("side_hair_length");
let side_bunch = document.getElementById("side_hair_bunch");
let back_length = document.getElementById("back_hair_length");
let back_bunch = document.getElementById("back_hair_bunch");
let outside_back_length = document.getElementById("outside_back_hair_length");
let outside_back_bunch = document.getElementById("outside_back_hair_bunch");
eye_size_param.oninput = (e)=>{
	face.eye_size = Number(eye_size_param.value);
};
eye_position_param.oninput = (e)=>{
	face.eye_position = Number(eye_position_param.value);
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


// クラスインスタンス作成
let face = new DrawFace("can2", "aeaeaa", eye_size, eye_position, hair_arr);

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
