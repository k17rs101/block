// This is a JavaScript file
var ncmbController = {
  APPLICATION_KEY:appKey,
  CLIENT_KEY:clientKey,

  ncmb: null,
  currentUser: null,  // ログインしたユーザーのオブジェクトを格納
  screenSize: null,    // 画面サイズを格納

    // スコア送信
    sendScore: function(score) {
        var self = this;

        // [1]Score（クラス）を生成
        var Score = self.ncmb.DataStore("ScoreClass");

        // [2]インスタンス生成、スコア数値をフィールド名"score"にセット
        var scoreData = new Score({score: score});

        // [3]送信処理
        scoreData.save()
            .then(function (saved) {
                //alert("スコア送信完了！");
            })
          .catch(function(err){
                console.log(err);
            });

            // 順位を求める
// ”score” フィールドの値が score より大きいものを取得
Score.greaterThan("score", score)
    .count()    // 件数を結果に含める
    .fetchAll()
    .then(function(scores){
        // countの結果は、取得データscoresのcountプロパティに含まれる

        // 0件のとき正しく動作するように条件分岐
        var rank = (scores.count !== undefined) ? parseInt(scores.count) + 1 : 1;

        // ダイアログの表示
        if(typeof navigator.notification !== 'undefined'){
            navigator.notification.alert(
                "今回の順位は #" + rank + " でした！",
                function(){},
                "スコア送信完了！"
                );
        } else {
            alert("スコア送信完了！\n今回の順位は #" + rank + " でした！");
        }
    })

            

            


    },

    // 初期化
    init: function(screenSize) {
        var self = this;
        self.ncmb = new NCMB(self.APPLICATION_KEY, self.CLIENT_KEY);    // mobile backendの初期化
        self.screenSize = screenSize;
    }
}

