
/*
function watchOninputFromElement(html_id)
{
	let id = document.getElementById(html_id);
	id.oninput = (e)=> {
	};
}
function test(html_id)
{
	let id = document.getElementById(html_id);
	let str = html_id;
	let str2 = str.replace(/_/g, ".");
	id.oninput = (e)=> {
		face.coordinates.str2 = Number(id.value);
		console.log(face.coordinates.str2);
	};
}
test("front_hair_tips");
*/
let back_hair_cp1_y = document.getElementById("back_hair_cp1_y");
back_hair_cp1_y.oninput = (e) => {
	face.coordinates.hair.back.cp1.y = Number(back_hair_cp1_y.value);
};
let back_hair_cp2_y = document.getElementById("back_hair_cp2_y");
back_hair_cp2_y.oninput = (e) => {
	face.coordinates.hair.back.cp2.y = Number(back_hair_cp2_y.value);
};
let back_hair_cp1_x = document.getElementById("back_hair_cp1_x");
back_hair_cp1_x.oninput = (e) => {
	face.coordinates.hair.back.cp1.x = Number(back_hair_cp1_x.value);
};
let back_hair_cp2_x = document.getElementById("back_hair_cp2_x");
back_hair_cp2_x.oninput = (e) => {
	face.coordinates.hair.back.cp2.x = Number(back_hair_cp2_x.value);
};
let back_hair_tip_span = document.getElementById("back_hair_tip_span");
back_hair_tip_span.oninput = (e) => {
	face.coordinates.hair.back.tip_span = Number(back_hair_tip_span.value);
};
let back_hair_tips = document.getElementById("back_hair_tips");
back_hair_tips.oninput = (e) => {
	face.coordinates.hair.back.tips = Number(back_hair_tips.value);
};

let front_hair_cp1_y = document.getElementById("front_hair_cp1_y");
front_hair_cp1_y.oninput = (e) => {
	face.coordinates.hair.front.cp1.y = Number(front_hair_cp1_y.value);
};
let front_hair_cp2_y = document.getElementById("front_hair_cp2_y");
front_hair_cp2_y.oninput = (e) => {
	face.coordinates.hair.front.cp2.y = Number(front_hair_cp2_y.value);
};
let front_hair_cp1_x = document.getElementById("front_hair_cp1_x");
front_hair_cp1_x.oninput = (e) => {
	face.coordinates.hair.front.cp1.x = Number(front_hair_cp1_x.value);
};
let front_hair_cp2_x = document.getElementById("front_hair_cp2_x");
front_hair_cp2_x.oninput = (e) => {
	face.coordinates.hair.front.cp2.x = Number(front_hair_cp2_x.value);
};
let front_hair_tip_span = document.getElementById("front_hair_tip_span");
front_hair_tip_span.oninput = (e) => {
	face.coordinates.hair.front.tip_span = Number(front_hair_tip_span.value);
};
let front_hair_tips = document.getElementById("front_hair_tips");
front_hair_tips.oninput = (e) => {
	face.coordinates.hair.front.tips = Number(front_hair_tips.value);
};
let cheek_cp1_x = document.getElementById("cheek_cp1_x");
cheek_cp1_x.oninput = (e) => {
	face.coordinates.cheek.cp1.x = Number(cheek_cp1_x.value);
};
let cheek_cp2_x = document.getElementById("cheek_cp2_x");
cheek_cp2_x.oninput = (e) => {
	face.coordinates.cheek.cp2.x = Number(cheek_cp2_x.value);
};
let chin_height = document.getElementById("chin_height");
chin_height.oninput = (e) => {
	face.coordinates.chin.height = Number(chin_height.value);
};
let upper_eyeline_cp_y = document.getElementById("upper_eyeline_cp_y");
upper_eyeline_cp_y.oninput = (e) => {
	face.coordinates.eye.upper_eyeline_cp.y = Number(upper_eyeline_cp_y.value);
};
let upper_eyeline_cp1_y = document.getElementById("upper_eyeline_cp1_y");
upper_eyeline_cp1_y.oninput = (e) => {
	face.coordinates.eye.upper_eyeline_cp1.y = Number(upper_eyeline_cp1_y.value);
};
let upper_eyeline_cp2_y = document.getElementById("upper_eyeline_cp2_y");
upper_eyeline_cp2_y.oninput = (e) => {
	face.coordinates.eye.upper_eyeline_cp2.y = Number(upper_eyeline_cp2_y.value);
};
let upper_eyeline_cp1_x = document.getElementById("upper_eyeline_cp1_x");
upper_eyeline_cp1_x.oninput = (e) => {
	face.coordinates.eye.upper_eyeline_cp1.x = Number(upper_eyeline_cp1_x.value);
};
let upper_eyeline_cp2_x = document.getElementById("upper_eyeline_cp2_x");
upper_eyeline_cp2_x.oninput = (e) => {
	face.coordinates.eye.upper_eyeline_cp2.x = Number(upper_eyeline_cp2_x.value);
};

// エレメント取得
let span_to_eye_x = document.getElementById("span_to_eye_x");
// 取得したエレメントの入力状態を監視
// 入力があれば関数内の処理
span_to_eye_x.oninput = (e)=>{
	face.coordinates.eye.span_to_eye_x = Number(span_to_eye_x.value);
};
let upper_eyeline_end_x = document.getElementById("upper_eyeline_end_x");
upper_eyeline_end_x.oninput = (e)=>{
	face.coordinates.eye.upper_eyeline_end.x = Number(upper_eyeline_end_x.value);
};
let upper_eyeline_end_y = document.getElementById("upper_eyeline_end_y");
upper_eyeline_end_y.oninput = (e)=>{
	face.coordinates.eye.upper_eyeline_end.y = Number(upper_eyeline_end_y.value);
};
let eyeblow_cp_height = document.getElementById("eyeblow_cp_height");
eyeblow_cp_height.oninput = (e)=>{
	face.coordinates.eyeblow.cp.y = Number(eyeblow_cp_height.value);
};
let eyeblow_head_x = document.getElementById("eyeblow_head_x");
eyeblow_head_x.oninput = (e)=>{
	face.coordinates.eyeblow.head.x = Number(eyeblow_head_x.value);
};
eyeblow_head_height.oninput = (e)=>{
	face.coordinates.eyeblow.head.y = Number(eyeblow_head_height.value);
};
eyeblow_end_x.oninput = (e)=>{
	face.coordinates.eyeblow.end.x = Number(eyeblow_end_x.value);
};
eyeblow_end_height.oninput = (e)=>{
	face.coordinates.eyeblow.end.y = Number(eyeblow_end_height.value);
};



let eye_head_width = document.getElementById("eye_head_width");
eye_head_width.oninput = (e)=>{
	face.coordinates.eye.eye_head.width = Number(eye_head_width.value);
};
let eye_head_height = document.getElementById("eye_head_height");
eye_head_height.oninput = (e)=>{
	face.coordinates.eye.eye_head.height = Number(eye_head_height.value);
};



let cheek_width = document.getElementById("cheek_width");
cheek_width.oninput = (e)=>{
	face.coordinates.cheek.width = Number(cheek_width.value);
};
let chin_width = document.getElementById("chin_width");
chin_width.oninput = (e)=>{
	face.coordinates.chin.width = Number(chin_width.value);
};


let mouth_width = document.getElementById("mouth_width");
mouth_width.oninput = (e)=>{
	face.coordinates.mouth.width = Number(mouth_width.value);
};
let mouth_height = document.getElementById("mouth_height");
mouth_height.oninput = (e)=>{
	face.coordinates.mouth.height = Number(mouth_height.value);
};
let mouth_cp_height = document.getElementById("mouth_cp_height");
mouth_cp_height.oninput = (e)=>{
	face.coordinates.mouth.cp_height = Number(mouth_cp_height.value);
};


let iris_color_r = document.getElementById("iris_color_r");
iris_color_r.oninput = (e)=>{
	face.coordinates.eye.iris.color.r = Number(iris_color_r.value);
};
let iris_color_g = document.getElementById("iris_color_g");
iris_color_g.oninput = (e)=>{
	face.coordinates.eye.iris.color.g = Number(iris_color_g.value);
};
let iris_color_b = document.getElementById("iris_color_b");
iris_color_b.oninput = (e)=>{
	face.coordinates.eye.iris.color.b = Number(iris_color_b.value);
};

let hair_color_r = document.getElementById("hair_color_r");
hair_color_r.oninput = (e)=>{
	face.coordinates.hair.color.r = Number(hair_color_r.value);
};
let hair_color_g = document.getElementById("hair_color_g");
hair_color_g.oninput = (e)=>{
	face.coordinates.hair.color.g = Number(hair_color_g.value);
};
let hair_color_b = document.getElementById("hair_color_b");
hair_color_b.oninput = (e)=>{
	face.coordinates.hair.color.b = Number(hair_color_b.value);
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
// 横髪の長さ: 右
let hair_side_right_length = document.getElementById("hair_side_right_length");
hair_side_right_length.oninput = (e)=>{
	face.coordinates.hair.side.right.length = Number(hair_side_right_length.value);
};
// 横髪の束数: 右
let hair_side_right_bunch = document.getElementById("hair_side_right_bunch");
hair_side_right_bunch.oninput = (e)=>{
	face.coordinates.hair.side.right.bunch = Number(hair_side_right_bunch.value);
};

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
	face.coordinates.eye.size = Number(eye_size_param.value);
};
eye_position_x.oninput = (e)=>{
	face.coordinates.eye.position.x = Number(eye_position_x.value);
};
eye_position_y.oninput = (e)=>{
	face.coordinates.eye.position.y = Number(eye_position_y.value);
};
front_length.oninput = (e)=>{
	face.coordinates.hair.front.length = Number(front_length.value);
};
front_bunch.oninput = (e)=>{
	face.coordinates.hair.front.bunch = Number(front_bunch.value);
};
side_length.oninput = (e)=>{
	face.coordinates.hair.side.length = Number(side_length.value);
};
side_bunch.oninput = (e)=>{
	face.coordinates.hair.side.bunch = Number(side_bunch.value);
};
outside_length.oninput = (e)=>{
	face.coordinates.hair.outside.length = Number(outside_length.value);
};
outside_bunch.oninput = (e)=>{
	face.coordinates.hair.outside.bunch = Number(outside_bunch.value);
};
back_length.oninput = (e)=>{
	face.coordinates.hair.back.length = Number(back_length.value);
};
back_bunch.oninput = (e)=>{
	face.coordinates.hair.back.bunch = Number(back_bunch.value);
};
outside_back_length.oninput = (e)=>{
	//face.outside_back_hair_length = Number(outside_back_length.value);
	face.coordinates.hair.outside_back.length = Number(outside_back_length.value);
};
outside_back_bunch.oninput = (e)=>{
	//face.outside_back_hair_bunch = Number(outside_back_bunch.value);
	face.coordinates.hair.outside_back.bunch = Number(outside_back_bunch.value);
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
		face.coordinates.hair.front.type = Number(front_hair_types[i].value);
	}
}


let back_hair_types = document.getElementsByName("back_hair_type");
for (let i=0; i<back_hair_types.length; i++)
{
	back_hair_types[i].onclick = ()=>{
		face.coordinates.hair.back.type = Number(back_hair_types[i].value);
	}
}

// クラスインスタンス作成
let face = new DrawFace("can2", coordinates);

// メインループ関数
// インスタンスの更新メソッド・描画メソッドを実行
function mainLoop()
{
	face.update();
	face.draw();
}

// 実際に関数を実行
// ループを定期的に呼び出す
window.onload = ()=>{
	//mainLoop2(); // ループを止めたい時にアンコメントしてsetIntervalのほうをコメントアウト
	setInterval(mainLoop, 1000/5);
}
