
// スライダーのイベント監視メソッド
function onInput(element_id)
{
	let arr = element_id.split('.');
	let elem = document.getElementById(element_id);
	elem.oninput = (e) => {
		console.log(element_id);
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

// ツインテールの表示/非表示
let twin_tail_flag = document.getElementById("hair.twin_tail.flag");
twin_tail_flag.onchange = (e) => {
	face.coordinates.hair.twin_tail.flag = twin_tail_flag.checked;
};

// 前髪を変更
let front_hair_types = document.getElementsByName("front_hair_type");
for (let i=0; i<front_hair_types.length; i++)
{
	front_hair_types[i].onclick = ()=>{
		face.coordinates.hair.front.type = Number(front_hair_types[i].value);
	}
}

// 横髪を変更
let side_hair_types = document.getElementsByName("side_hair_type");
for (let i=0; i<side_hair_types.length; i++)
{
	side_hair_types[i].onclick = ()=>{
		face.coordinates.hair.side.type = Number(side_hair_types[i].value);
	}
}

// 後ろ髪を変更
let back_hair_types = document.getElementsByName("back_hair_type");
for (let i=0; i<back_hair_types.length; i++)
{
	back_hair_types[i].onclick = ()=>{
		face.coordinates.hair.back.type = Number(back_hair_types[i].value);
	}
}



// クラスインスタンス作成
let face = new DrawFace("can2", coordinates);

// スライダーのエレメントを全て取得
let sliders = document.getElementsByClassName("slider");

// 取得したスライダーのエレメントをループで回して
// onInputメソッドでイベント監視
for (let i=0; i<sliders.length; i++)
{
	onInput(sliders[i].id);
}

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
