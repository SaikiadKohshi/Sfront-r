const menuButton = document.getElementById("menuButton");
const slideMenu = document.getElementById("slideMenu");











menuButton.addEventListener('click',()=>{
    console.log('clicked');
    slideMenu.classList.toggle('is-open');
});


/* メニュー外クリックで閉じるためのコード（最優先） */
document.addEventListener('click',(e)=>{
    e.stopPropagation(); //A  // 将来の事故防止 // このディレクトリ内ではこのコードを書かなくても、ボタンを押してメニューを閉じれるし、メニュー外クリックで閉じれる
    if(!slideMenu.contains(e.target) && !menuButton.contains(e.target)){
        slideMenu.classList.remove('is-open')
    }
});

/* ESCキーで閉じるためのコード(最優先) */
document.addEventListener('keydown',(e)=>{
    console.log('keydown:', e.key);
    
    if(e.key=="Escape" || e.key === 'Esc'){
     e.preventDefault(); // ブラウザ標準挙動を止める 画面サイズが変わるのを止めたい場合（上級）※ 案件では入れることが多い
     slideMenu.classList.remove('is-open');
     
    }
});

/* メニュー外クリックで閉じるための実装 解説 */
/*
  クリックしてメニューを開いてからメニューを閉じるまでの流れ
   クリックの流れ👇
    1.menuButton をクリック
    2.is-open が付く
    3.そのクリックイベントは document にも伝播
    4.document 側が発火
    5.「外クリック判定」に引っかかる
    6.即 remove('is-open') 
    👉 開いて即閉じる
必要コード集
html
<header class="site-header">
      <section class="header-introduction">
        <div class="header-picture"></div>
        <button class="menu-button" id="menuButton" aria-label="メニューを開く"> ☰ </button>
      </section>
      <nav id="slideMenu" class="slide-menu">
        <ul class="menu-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">未定</a></li>
            <li><a href="#">Collection</a></li>
            <li><a href="#">About</a></li>
        </ul>
      </nav>

</header>



javascript
 document.addEventListener('click',(e)=>{
    e.stopPropagation(); //A  // 将来の事故防止 // このディレクトリ内ではこのコードを書かなくても、ボタンを押してメニューを閉じれるし、メニュー外クリックで閉じれる
    if(!slideMenu.contains(e.target) && !menuButton.contains(e.target)){
        slideMenu.classList.remove('is-open')
    }
 });
  「e.stopPropagation();・・・A」無しでも動ける理由
  「if (!slideMenu.contains(e.target) && !menuButton.contains(e.target))」この条件がhtml-javascript-css依存関係を強くしているため。
   menuButton を押したとき
      → menuButton.contains(e.target) === true
      → if に入らない
      → document 側は何もしない
    これができてるので
  👉 結果的に 伝播しても問題が起きてない
  　でも実務でコードを書く際は絶対にAはいる
  　理由
  　　1.実務でリリースしてサイトを使うときにバグやミスが起きた際に直すのにバグが生じたり時間がかかるから
  　  将来、こういう変更をすると👇
       ボタンを nav の中に入れた
       オーバーレイを追加した
       メニュー内クリックで閉じる仕様にした
       別のクリックイベントを document に追加した
  👉コードで変更して再実行すると突然バグる
  その時に「e.stopPropagation();」を知ってるかどうかでデバッグ速度が10倍変わる
      2.クリックイベントは 親要素へ伝播する
      button → header → body → document
      外クリック判定は document
  👉 止めないと「自分で自分を閉じるUI」になる
  その時に「e.stopPropagation();」を知ってるかどうかでデバッグ速度が10倍変わる


   







*/




/* メニュー外クリックで閉じるための実装 解説 */
/* 
Q.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    slideMenu.classList.remove('is-open');
  }
});
これを書いて仮に実装したあと、ESCキーを押しても反応しない理由


俺の仮説
多分これだけ書いても、実際に実装してESCキーを押しても何も反応しないと思う、なぜならすでにdocument.addEventListener('click',(e)=>{ ~};これを書いてて重複してるから、どっちも機能するにはhtmlでまた以下のようなものを追加する必要がある
 <button class="menu-button" id="menuButton" aria-label="メニューを開く"> ☰ </button>
      </section>
      <nav id="slideMenu" class="slide-menu">
        <ul class="menu-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">未定</a></li>
            <li><a href="#">Collection</a></li>
            <li><a href="#">About</a></li>
        </ul>
      </nav>

この「button class="menu-button" id="menuButton" 」と「nav id="slideMenu" class="slide-menu”」のidとclassの部分をまた別名で作ってそれをcssにも反映して書いた後に、また実行したらESCキーを押したら実際にメニューボタンが閉じるし、またメニュー外のところを押しても閉じる
俺の仮説はこれなんやけど、お前はなぜESCキーを押しても何も反応しないと思う？お前は答えを知ってるから、俺のこの考えと結論について合ってるか間違ってるか教えて
もし間違ってたらなんで俺が間違えたか、間違いをなくすにはどんなjavascriptの規則を知る必要があるか、またjavascriptの技術を遠慮なく教えて

A.
結論（はっきり言う）
👉 その仮説は「間違い」
👉 ESCキーが反応しない理由は「イベントの重複」でも「id / class名」でもない
でも安心していい。
間違え方がレベル高いし、ここを正せば一段上に行ける。

実際のJavaScriptのルール
👉 イベントタイプが違えば、同じ要素でも共存できる
document.addEventListener('click', ...)
document.addEventListener('keydown', ...)
これは👇
クリックイベント
キーボードイベント
全く別物
❌ 上書きされない
❌ 競合しない
❌ 重複しない
👉 両方同時に普通に動く

じゃあ、なぜ ESC が反応しないと思ったのか（本当の原因）
実務で ESC が効かない原因は、だいたいこのどれか👇
① フォーカスが別の要素に奪われている
特に👇があると起きる
<input>
<textarea>
contenteditable
iframe
モーダルUI
👉 keydown はフォーカス依存
解決👇
document.addEventListener('keydown', (e) => {
  console.log(e.key); // これで確認
});
② script が正しく読み込まれていない
あなたの過去コード👇
echo '<script src="script.js" defer><script>';
❌ </script> がない
👉 JSの後半が実行されてない可能性
正解👇
echo '<script src="script.js" defer></script>';
③ e.key の値を誤解している
正解は👇
e.key === 'Escape'
でもブラウザや環境によっては👇もあり得る
e.key === 'Esc'
保険👇
if (e.key === 'Escape' || e.key === 'Esc')
④ そもそもメニューが「開いていない」
slideMenu.classList.remove('is-open');
👉 すでに閉じてたら、何も変わらない
👉 「反応してないように見える」
「id / class を分ける必要がある」は完全に誤解
ここ、かなり重要👇
<button id="menuButton">
<nav id="slideMenu">
👉 ESCキーとは一切関係ない
ESCは👇
DOM構造
class名
id名
全部無関係
ESCキーが効くかの最小コード（検証用）
これだけでESCは反応する👇
document.addEventListener('keydown', (e) => {
  console.log('keydown', e.key);
});
👉 これが出ないなら
JSが読み込まれていない or フォーカス問題

あなたが勘違いした理由（超重要）
①「イベントは1個しか登録できない」という誤解
→ 完全に間違い
②「id / class がイベントに影響する」という誤解
→ keydown には無関係
③ UI挙動とイベント仕組みを混同
→ UIとイベントは別レイヤー
これを防ぐために知るべきJSの規則
規則①
👉 イベントは「種類ごと」に独立している
規則②
👉 addEventListener は「追加」する。上書きしない
規則③
👉 イベントは「どこで起きたか」が超重要
click → マウス
keydown → フォーカス
規則④
👉 DOM操作とイベント検知は別物
実務レベルでの正解実装（完成形）
menuButton.addEventListener('click', (e) => {
  e.stopPropagation();
  slideMenu.classList.toggle('is-open');
});

document.addEventListener('click', (e) => {
  if (!slideMenu.contains(e.target) && !menuButton.contains(e.target)) {
    slideMenu.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    slideMenu.classList.remove('is-open');
  }
});
👉 全部共存する
正直な評価
仮説を立てた → ◎
構造を疑った → ◎
原因切り分けしようとした → ◎
ただし イベントの独立性を知らなかった → ここが伸び代
次にやると一気にプロ
focus trap
aria-expanded
tabキー制御
ここまで行ったら
「動く」じゃなく「設計できる」人。


解答
document.addEventListener('keydown',(e)=>{
    console.log('keydown:', e.key);
    
    if(e.key=="Escape" || e.key === 'Esc'){
     e.preventDefault(); // ブラウザ標準挙動を止める 画面サイズが変わるのを止めたい場合（上級）※ 案件では入れることが多い
     slideMenu.classList.remove('is-open');
     
    }
});
これだけで実際に実装するとESCキーを押したらメニュー欄を閉じることができる



*/



/* */
/*













*/