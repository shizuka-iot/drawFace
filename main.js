function onInput(element_id)
{
	let arr = element_id.split('.');
	let elem = document.getElementById(element_id);
	elem.oninput = (e) => {
		switch (arr.length)
		{
			case 1:
				face.coordinates[arr[0]] = Number(elem.value);
				break;
			case 2:
				face.coordinates[arr[0]][arr[1]] = Number(elem.value);
				break;
			case 3:
				face.coordinates[arr[0]][arr[1]][arr[2]] = Number(elem.value);
				break;
			case 4:
				face.coordinates[arr[0]][arr[1]][arr[2]][arr[3]] = Number(elem.value);
				break;
			default:
				break;
		}
	};
}

let twin_tail_flag = document.getElementById("hair.twin_tail.flag");
console.log(twin_tail_flag);
twin_tail_flag.onchange = (e) => {
	face.coordinates.hair.twin_tail.flag = twin_tail_flag.checked;
	console.log(twin_tail_flag);
	console.log("test");
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
onInput("hair.twin_tail.terminal.y");
onInput("hair.twin_tail.terminal.x");
onInput("hair.outside_back.bunch");
onInput("hair.outside_back.length");
onInput("hair.back.bunch");
onInput("hair.back.length");
onInput("hair.outside.bunch");
onInput("hair.outside.length");
onInput("hair.front.bunch");
onInput("hair.front.length");
onInput("eye.position.y");
onInput("eye.position.x");
onInput("eye.size");
onInput("eye.scale");
onInput("hair.side.right.bunch");
onInput("hair.side.right.length");
onInput("hair.side.left.bunch");
onInput("hair.side.left.length");
onInput("hair.color.r");
onInput("hair.color.g");
onInput("hair.color.b");
onInput("eye.iris.color.r");
onInput("eye.iris.color.g");
onInput("eye.iris.color.b");
onInput("mouth.cp.y");
onInput("mouth.height");
onInput("mouth.width");
onInput("chin.width");
onInput("chin.height");
onInput("cheek.width");
onInput("eye.eye_end.y");
onInput("eye.eye_end.x");
onInput("eye.eye_head.height");
onInput("eye.eye_head.width");
onInput("eyeblow.end.y");
onInput("eyeblow.end.x");
onInput("eyeblow.head.y");
onInput("eyeblow.head.x");
onInput("eyeblow.cp.y");
onInput("eye.upper_eyeline_end.y");
onInput("eye.upper_eyeline_end.x");
onInput("eye.span_to_eye_x");
onInput("eye.lower_eyeline_cp2.x");
onInput("eye.lower_eyeline_cp1.x");
onInput("eye.lower_eyeline_cp2.y");
onInput("eye.lower_eyeline_cp1.y");
onInput("eye.upper_eyeline_cp2.x");
onInput("eye.upper_eyeline_cp1.x");
onInput("eye.upper_eyeline_cp2.y");
onInput("eye.upper_eyeline_cp1.y");
onInput("eye.upper_eyeline_cp.y");
onInput("cheek.cp2.x");
onInput("cheek.cp1.x");
onInput("hair.front.tips");
onInput("hair.front.tip_span");
onInput("hair.front.cp2.x");
onInput("hair.front.cp1.x");
onInput("hair.front.cp2.y");
onInput("hair.front.cp1.y");
onInput("hair.back.tips");
onInput("hair.back.tip_span");
onInput("hair.back.cp2.x");
onInput("hair.back.cp1.x");
onInput("hair.back.cp2.y");
onInput("hair.back.cp1.y");
onInput("hair.sideburns.right.bunch");
onInput("hair.sideburns.left.bunch");
onInput("hair.sideburns.right.length");
onInput("hair.sideburns.left.length");
onInput("nose.cp2.y");
onInput("nose.cp1.y");
onInput("nose.cp2.x");
onInput("nose.cp1.x");
onInput("nose.bottom.y");
onInput("nose.bottom.x");
onInput("nose.position.y");
onInput("lip.lower.cp2.x");
onInput("lip.lower.cp1.x");
onInput("lip.upper.cp2.x");
onInput("lip.upper.cp1.x");
onInput("lip.lower.cp2.x");
onInput("lip.lower.cp1.x");
onInput("lip.upper.cp2.x");
onInput("lip.upper.cp1.x");
onInput("lip.lower.cp.height");
onInput("lip.lower.cp.width");
onInput("lip.upper.cp.height");
onInput("lip.upper.cp.width");
onInput("eyelid.lower.y");
onInput("hair.twin_tail.bunch");
onInput("hair.twin_tail.cp4.y");
onInput("hair.twin_tail.cp3.y");
onInput("hair.twin_tail.cp4.x");
onInput("hair.twin_tail.cp3.x");
onInput("hair.twin_tail.tip_span");
onInput("hair.twin_tail.width");
onInput("hair.twin_tail.length");
onInput("hair.twin_tail.flag");

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
