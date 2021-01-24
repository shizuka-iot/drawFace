
let twin_tail_terminal_y = document.getElementById("twin_tail_terminal_y");
twin_tail_terminal_y.oninput = (e) => {
	face.coordinates.hair.twin_tail.terminal.y = Number(twin_tail_terminal_y.value);
};
let twin_tail_terminal_x = document.getElementById("twin_tail_terminal_x");
twin_tail_terminal_x.oninput = (e) => {
	face.coordinates.hair.twin_tail.terminal.x = Number(twin_tail_terminal_x.value);
};
let twin_tail_length = document.getElementById("twin_tail_length");
twin_tail_length.oninput = (e) => {
	face.coordinates.hair.twin_tail.length = Number(twin_tail_length.value);
};
let twin_tail_cp3_x = document.getElementById("twin_tail_cp3_x");
twin_tail_cp3_x.oninput = (e) => {
	face.coordinates.hair.twin_tail.cp3.x = Number(twin_tail_cp3_x.value);
};
let twin_tail_cp4_x = document.getElementById("twin_tail_cp4_x");
twin_tail_cp4_x.oninput = (e) => {
	face.coordinates.hair.twin_tail.cp4.x = Number(twin_tail_cp4_x.value);
};
let twin_tail_cp3_y = document.getElementById("twin_tail_cp3_y");
twin_tail_cp3_y.oninput = (e) => {
	face.coordinates.hair.twin_tail.cp3.y = Number(twin_tail_cp3_y.value);
};
let twin_tail_cp4_y = document.getElementById("twin_tail_cp4_y");
twin_tail_cp4_y.oninput = (e) => {
	face.coordinates.hair.twin_tail.cp4.y = Number(twin_tail_cp4_y.value);
};



let renge_upper_eyelid_cp_y = document.getElementById("renge_upper_eyelid_cp_y");
renge_upper_eyelid_cp_y.oninput = (e) => {
	face.coordinates.renge.upper_eyelid.cp.y = Number(renge_upper_eyelid_cp_y.value);
};
let renge_lower_eyelid_cp_y = document.getElementById("renge_lower_eyelid_cp_y");
renge_lower_eyelid_cp_y.oninput = (e) => {
	face.coordinates.renge.lower_eyelid.cp.y = Number(renge_lower_eyelid_cp_y.value);
};

let nose_position_y = document.getElementById("nose_position_y");
nose_position_y.oninput = (e) => {
	face.coordinates.nose.position.y = Number(nose_position_y.value);
};

let sideburns_left_length = document.getElementById("sideburns_left_length");
sideburns_left_length.oninput = (e) => {
	face.coordinates.hair.sideburns.left.length = Number(sideburns_left_length.value);
};
let sideburns_right_length = document.getElementById("sideburns_right_length");
sideburns_right_length.oninput = (e) => {
	face.coordinates.hair.sideburns.right.length = Number(sideburns_right_length.value);
};
let sideburns_left_bunch = document.getElementById("sideburns_left_bunch");
sideburns_left_bunch.oninput = (e) => {
	face.coordinates.hair.sideburns.left.bunch = Number(sideburns_left_bunch.value);
};
let sideburns_right_bunch = document.getElementById("sideburns_right_bunch");
sideburns_right_bunch.oninput = (e) => {
	face.coordinates.hair.sideburns.right.bunch = Number(sideburns_right_bunch.value);
};


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

let lower_eyeline_cp1_y = document.getElementById("lower_eyeline_cp1_y");
lower_eyeline_cp1_y.oninput = (e) => {
	face.coordinates.eye.lower_eyeline_cp1.y = Number(lower_eyeline_cp1_y.value);
};
let lower_eyeline_cp2_y = document.getElementById("lower_eyeline_cp2_y");
lower_eyeline_cp2_y.oninput = (e) => {
	face.coordinates.eye.lower_eyeline_cp2.y = Number(lower_eyeline_cp2_y.value);
};
let lower_eyeline_cp1_x = document.getElementById("lower_eyeline_cp1_x");
lower_eyeline_cp1_x.oninput = (e) => {
	face.coordinates.eye.lower_eyeline_cp1.x = Number(lower_eyeline_cp1_x.value);
};
let lower_eyeline_cp2_x = document.getElementById("lower_eyeline_cp2_x");
lower_eyeline_cp2_x.oninput = (e) => {
	face.coordinates.eye.lower_eyeline_cp2.x = Number(lower_eyeline_cp2_x.value);
};

let span_to_eye_x = document.getElementById("span_to_eye_x");
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

let eye_end_x = document.getElementById("eye_end_x");
eye_end_x.oninput = (e)=>{
	face.coordinates.eye.eye_end.x = Number(eye_end_x.value);
};
let eye_end_y = document.getElementById("eye_end_y");
eye_end_y.oninput = (e)=>{
	face.coordinates.eye.eye_end.y = Number(eye_end_y.value);
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

let eye_size_param = document.getElementById("eye_size");
let eye_position_x = document.getElementById("eye_position_x");
let eye_position_y = document.getElementById("eye_position_y");

let front_length = document.getElementById("front_hair_length");
let front_bunch = document.getElementById("front_hair_bunch");

let hair_side_left_length = document.getElementById("hair_side_left_length");
hair_side_left_length.oninput = (e)=>{
	face.coordinates.hair.side.left.length = Number(hair_side_left_length.value);
};
let hair_side_left_bunch = document.getElementById("hair_side_left_bunch");
hair_side_left_bunch.oninput = (e)=>{
	face.coordinates.hair.side.left.bunch = Number(hair_side_left_bunch.value);
};
let hair_side_right_length = document.getElementById("hair_side_right_length");
hair_side_right_length.oninput = (e)=>{
	face.coordinates.hair.side.right.length = Number(hair_side_right_length.value);
};
let hair_side_right_bunch = document.getElementById("hair_side_right_bunch");
hair_side_right_bunch.oninput = (e)=>{
	face.coordinates.hair.side.right.bunch = Number(hair_side_right_bunch.value);
};

let outside_length = document.getElementById("outside_hair_length");
let outside_bunch = document.getElementById("outside_hair_bunch");

let back_length = document.getElementById("back_hair_length");
let back_bunch = document.getElementById("back_hair_bunch");

let outside_back_length = document.getElementById("outside_back_hair_length");
let outside_back_bunch = document.getElementById("outside_back_hair_bunch");

let eye_scale = document.getElementById("eye_scale");
eye_scale.oninput = (e)=>{
	face.coordinates.eye.scale = Number(eye_scale.value);
};
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
	face.coordinates.hair.outside_back.length = Number(outside_back_length.value);
};
outside_back_bunch.oninput = (e)=>{
	face.coordinates.hair.outside_back.bunch = Number(outside_back_bunch.value);
};

let front_hair_types = document.getElementsByName("front_hair_type");
for (let i=0; i<front_hair_types.length; i++)
{
	front_hair_types[i].onclick = ()=>{
		face.coordinates.hair.front.type = Number(front_hair_types[i].value);
	}
}

let side_hair_types = document.getElementsByName("side_hair_type");
for (let i=0; i<side_hair_types.length; i++)
{
	side_hair_types[i].onclick = ()=>{
		face.coordinates.hair.side.type = Number(side_hair_types[i].value);
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
	//ループを止めたい時にアンコメントしてsetIntervalのほうをコメントアウト
	//mainLoop(); 
	setInterval(mainLoop, 1000/5);
}
