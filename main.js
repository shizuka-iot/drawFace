
// クラスインスタンス作成
let face = new DrawFace("can2", "aeaeaa", 28, 41);

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
	setInterval(mainLoop2, 1000/6);
}
