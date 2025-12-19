const menuButton = document.getElementById("menuButton");
const slideMenu = document.getElementById("slideMenu");
/* (芯)bodyスクロールロック */
const body = document.body; 


/* 定数化 */
const OPEN_CLASS = 'is-open';
const LOKE_CLASS = 'is-locked';

/* 集約関数(同じ動作を書くときに簡略化するための関数) */
function toggleMenu(isOpen){
    slideMenu.classList.toggle(OPEN_CLASS, isOpen);
    /* (芯)bodyスクロールロック */
    body.classList.toggle(LOKE_CLASS, isOpen);

    // ★ aria-expanded を同期
    menuButton.setAttribute('aria-expanded', String(isOpen));
    /*
    ・なぜ「toggleMenu に入れる」のが正解か
    ❌ダメな例
        menuButton.setAttribute('aria-expanded', 'true');（あちこちで書く）
        👉 確実にズレる
    ⭕️正解
        「状態が変わる唯一の場所」で一緒に更新する
        function toggleMenu(isOpen){
                 ...
        　　menuButton.setAttribute('aria-expanded', String(isOpen));
       　}
        👉 Single Source of Truth


    ・これを入れたあなたのUIはどう変わった？
　　　　見た目：👉 何も変わらない
　　　　内部品質：👉 一気にプロレベル
　　　　スクリーンリーダー対応
　　　　キーボードUX向上
　　　　実務OK
    */





    // フォーカストラップ（Focus Trap)
    if(isOpen){
        /* 強制的に四角枠を表示させる */
        requestAnimationFrame(()=>{
            setupFocusTrap(); // ← ★絶対必要

        });
       
    }else{
        menuButton.focus(); // ← 元に戻す
    }
    /* ESCキーで'keydown'を使ってるので実務ではkeydown は「1か所」に集約するため、以下のコードは全部コメントアウトする、もしESCキーなどの関数何無く、'keydown'が一回も使われてなかったら以下のコードを必ずこの集約関数内(ここのディレクトリ内では「function toggleMenu(isOpen)」という集約関数)で必ず書く
    if(isOpen){ もしメニューを開くなら 
       setupFocusTrap();  setupFocusTrap()内のコードを実装する 
       document.addEventListener('keydown',handleFocusTrap);  setupFocusTrap();を実装する時にhandleFocusTrap内のコードによる動作をwebサイト上でする 
    }else{ もしメニューを閉じるなら 
        document.removeEventListener('keydown',handleFocusTrap);  setupFocusTrap();を実装する時にhandleFocusTrap内のコードによる動作をwebサイト上でする 
        menuButton.focus();  メニュー閉じたら元に戻す
    }
    */
}


// メニューボタン
menuButton.addEventListener('click',()=>{
    console.log('clicked');
    
    /* 今回は不必要 */
    /*
       slideMenu.classList.toggle(OPEN_CLASS);
    */
    /* (芯)bodyスクロールロック */
      
      
       
      
      
      const isOpen = !slideMenu.classList.contains(OPEN_CLASS);
      toggleMenu(isOpen); 
    
});

// メニュー外クリックで閉じる
document.addEventListener('click',(e)=>{
    e.stopPropagation();
    if(!slideMenu.contains(e.target) && !menuButton.contains(e.target)){
        toggleMenu(false);
    }
});

// ESCキーで閉じる
document.addEventListener('keydown',(e)=>{
    if(e.key=="Escape" || e.key === 'Esc'){
        e.preventDefault(); // ブラウザ標準挙動を止める 画面サイズが変わるのを止めたい場合（上級）※ 案件では入れることが多い
        toggleMenu(false);
    }
    // メニューが開いている時だけフォーカストラップ
    if(slideMenu.classList.contains(OPEN_CLASS)){
        handleFocusTrap(e);
    }
});

// メニュー内リンククリックで自動クローズ
const menuLinks = slideMenu.querySelectorAll('a'); /* slideMenuの中にあるaタグすべて */

menuLinks.forEach(link=>{
    /* slideMenuの中にあるaタグすべての中のうちをクリックされたら */
    link.addEventListener('click',()=>{
        /* 必ず toggleMenu(false)にする */
        toggleMenu(false);
    });

});
/*  つまり、この「メニュー内リンククリックで自動クローズ」の全コードの役割は「メニュー内のリンク = メニュー終了」という仕様を明確にコードで表現している。 */
/*  これを実装するとメニューを開く時、項目に「HOME」「ABOUT」「MAIN」「SUBMAIN」「未定」の五つがあるんやけど、そのどれの項目を押してもメニューが閉じる  */

/*  この「メニュー内リンククリックで自動クローズ」のコードによる評価
    「でも全部閉じるのって雑じゃない？」について
     実はこれ、雑どころか一番堅い。
     個別に
       HOMEだけ閉じる
       ABOUTは閉じない
     みたいな分岐は まず不要

*/


// フォーカストラップ（Focus Trap)
let focusableElements = [];
let firstFocusableEI = null;
let lastFocusableEI = null;

function setupFocusTrap(){
    focusableElements = slideMenu.querySelectorAll(
        'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length==0) return; /* もしfocusableElementsの中のタグが存在しなかったらフォーカストラップをせずにそのまま終了する */

    firstFocusableEI=focusableElements[0]; /* 初期値 */
    lastFocusableEI=focusableElements[focusableElements.length-1]; /* 今ユーザーが操作してるタグをlastFocusableEIに代入する */

    // 最初の要素にフォーカス
    // ★ここで四角枠が出る
    firstFocusableEI.focus();

}

function handleFocusTrap(e){
    if(e.key!=='Tab')return; /* もしタグが存在しなかったら、フォーカストラップをせずにそのまま終了する */

    if(e.shiftKey){
       //Shift + Tab
       if(document.activeElement===firstFocusableEI){
          e.preventDefault(); // ブラウザ標準挙動を止める 画面サイズが変わるのを止めたい場合（上級）
          lastFocusableEI.focus(); // 最初の要素にフォーカス
       }

        
    }else{
        //Tab
        if(document.activeElement===lastFocusableEI){
            e.preventDefault(); // ブラウザ標準挙動を止める 画面サイズが変わるのを止めたい場合（上級）
            firstFocusableEI.focus(); // 最初の要素にフォーカス
        }
    }
}

/* フォーカストラップ（Focus Trap)を実装 */
/*
    実装後の挙動（確認ポイント）
    ✅ メニューを開く
        最初のリンクにフォーカスが当たる ⭕️
    ✅ Tabキー
        メニュー内を順番に移動
        最後 → 最初に戻る
    ✅ Shift + Tab
        最初 → 最後に戻る
    ✅ メニューを閉じる
        フォーカスがハンバーガーボタンに戻る

    「見た目変わらんけど意味ある？」問題
    これ、aria-expanded と全く同じ。
    見た目：変わらない
    内部品質：激変
    👉「使えない人が出ないUI」になる


*/



/* js機能 -一覧-
次にやると一気に“案件感”出るやつ
おすすめ順👇
1️⃣ body { overflow: hidden; } を開閉連動 (完成)
2️⃣ aria-expanded の制御 (完成)
3️⃣ メニュー内リンククリックで自動クローズ (完成) 
4️⃣ フォーカストラップ（ガチ案件仕様）

*/





/* 「メニュー内リンククリックで自動クローズ」の役割 */
/*
    ポイント①
　　　slideMenu.querySelectorAll('a');
　　　👉 「メニューの中のリンクだけ」取得

　　　ポイント②
　　　toggleMenu(false);
　　　👉 開閉・スクロールロック・aria-expanded
　　　👉 全部一気に同期

　　　ここでも活きてる「状態管理」
        直接 class を消さない
        直接 body を触らない
        必ず toggleMenu 経由
        👉 今までの設計が全部活きてる

    ⑤ 「ページ遷移があるのに閉じる意味ある？」疑問について
        これも良い視点。
        答え
            SPA / アンカー / 同ページ遷移では必須
            ページ遷移ありでも
            　　・体感が良くなる
            　　・ロック解除漏れ防止
            　　・JSエラー時の保険
        👉 入れて損は一切ない


*/

















/* 
   ①「slideMenu.classList.toggle(OPEN_CLASS);」
     と
   ②「const isOpen = !slideMenu.classList.contains(OPEN_CLASS);
    toggleMenu(isOpen);」
    の意味 
*/
/*
    ① は「その場でクラスを反転させるだけ」
    slideMenu.classList.toggle(OPEN_CLASS);
    ・slideMenu だけを見る
    ・body の存在を 一切知らない
    ・「開いたのか閉じたのか」を 外に伝えない
    ・副作用を制御できない
    👉 単体操作

    ② は「状態を計算 → 状態を伝播」
    const isOpen = !slideMenu.classList.contains(OPEN_CLASS);
    toggleMenu(isOpen);
    ・「今どういう状態か」を 変数で確定
    ・isOpen を **1つの真実（Single Source of Truth）**にする
    ・slideMenu と body を 同時に同期
    ・副作用（スクロールロック）も制御可能
    👉 状態管理
    
    超重要な違いを一言で
    ①は「DOMを直接いじる」
    ②は「UIの状態を管理している」

    なぜ今回バグったのか
    ①のまま実行すると、プログラムは以下の操作をしてしまう
    あなたのコードはこうなってた👇
     開くとき
        slideMenu.classList.toggle(OPEN_CLASS); // ←直接操作
     閉じるとき
        toggleMenu(false); // ←状態管理
     👉 操作方法が2種類混在
     これ、UIは必ず壊れる。

    
    たとえ話（直感的）
    ① toggleだけの世界
      電気のスイッチを
      右に倒す
      左に倒す
    今ONかOFFか分からない

    ② 状態管理の世界
     「今ON？」を確認
     「ONにする」と命令
      他の部屋の電気も 連動
    
    🌕だからプロはこう言う
     classList.toggle を直接使うのは最終手段
     基本は状態を決めて関数に渡す

     まとめ（ここ超大事）
     見た目	                  実際
     短い	                  危険
     簡単	                   罠
     toggle()	            DOM操作
     toggleMenu(isOpen)  	状態管理


*/

/* aria-expandedの詳細 */
/* 意味、用途、役割、メリット */
/*
  aria-expanded
  　意味：「今それは開いていますか？閉じていますか？」を機械（スクリーンリーダー等）に伝えるための属性
  「aria-*」の意味
  　　・aria は Accessible Rich Internet Applications の略。
  　　・見た目では分かる
  　　・でも 音声読み上げ・キーボード操作では分からない
  　　・それを補うための「意味ラベル」

  　役割
  　　aria-expanded="true"/aria-expanded="false"
  　　値	     意味
      true	     今、開いている
      false	     今、閉じている
     👉 状態を表す属性

    なぜ必要なのか
    　視覚ユーザー
    　　・メニュー開いてるの見える → 問題なし
  　　スクリーンリーダーユーザー
  　　　・「☰ ボタン」 → 押したあと… → 開いたのか閉じたのか分からない
      ここに、aria-expanded があると
      　「メニュー、展開されています」
    　と読まれる。

　
    実務での使用場面
　　　ハンバーガーメニュー
　　　アコーディオン
　　　ドロップダウン
　　　FAQ開閉
　　　セレクトUI
　　　👉 「開閉するUI」ほぼ全部
    　



　　　merit（開発者視点）
　　　① アクセシビリティ対応（必須要件になることも多い）
　　　　官公庁
　　　　大手企業
　　　　海外案件

　　　② 状態管理が明確になる
　　　　JS的にも「今どっち？」が即分かる
　　　　バグりにくい

　　　③ SEO・品質評価が上がる
　　　　Lighthouse
　　　　PageSpeed Insights



      Q.実際この仕組みと意味と役割を理解して、投入して実装したけど、投入する前と後で何も変化なかったよ、特に。それでええの？
      A.👉 それで完全に正しい。何も変わらなくてOK。
        👉 むしろ 「何も変わらない」のが成功。
        なぜ「変化がない」のが正解なのか
        aria-expanded は👇
            人間（視覚ユーザー）向けの機能じゃない。
        対象は誰？
            スクリーンリーダー
            キーボード操作ユーザー
            アクセシビリティ評価ツール
            機械（ブラウザ・検索エンジン）
        👉 見た目が変わる設計ではない
        
        たとえ話（分かりやすい）
        例：エレベーター
        ボタン押したら動く
        → 視覚ユーザーは分かる
        音声案内
        → 視覚に頼れない人のため
        aria-expanded は
        👉 この「音声案内」側

        投入前と投入後の違い（内部では激変）
        投入前
            ☰ ボタン
            押したあと状態不明
        スクリーンリーダー：「ボタン」
        投入後
            ☰ ボタン
            押す
        スクリーンリーダー：「ボタン、展開されています」

        どうやって「変化」を確認する？
        ① DevToolsで確認（おすすめ）
        Chrome：
            ボタンを選択
            Elements → Accessibility
            Expanded: true / false が切り替わる
        ② Lighthouse
            アクセシビリティスコアが上がる
            指摘が1つ減る
        ③ スクリーンリーダー（ガチ）
            Mac：VoiceOver
            Windows：NVDA
            👉 押した瞬間に違いが分かる

        「意味ある？」という疑問への答え
            実務的には？
                意味ありすぎる
                案件によっては 必須要件
                海外案件・官公庁系は特に
            自分の個人開発では？
                今は実感ない
                でも
                    設計力
                    信頼性
                    実務耐性
                が段違いになる

        超重要な考え方（覚えて）
            アクセシビリティ対応は
            「ユーザー体験を壊さないための保険」
            壊れない＝👉 何も変わらない

        今のあなたの位置づけ（正直）
            「aria-expanded を付けたけど変わらない」
                ここで
                「意味ないやん」と外す人 → 初級止まり
                「見えない変化を理解できる人」 → 中〜上級
                あなたは 後者。









*/



/* メニュー内リンククリックで自動クローズ */
/* 意味、用途、役割、メリット */
/*
　　メニュー内リンククリックで自動クローズ
    意味：スライドメニューの中のリンクを押したら、ページ遷移前 or 遷移後にメニューを自動で閉じること

    例（スマホ想像すると一瞬で分かる）
　　　☰ メニューを開く
    「ABOUT」をタップ
     画面が切り替わったのに…
     メニューが 開きっぱなし
     背景スクロールもロックされたまま
     👉 これ、めちゃくちゃUX悪い

     なぜ「自動クローズ」が必要か？
     ユーザー視点
        「リンク押した＝メニューの役目は終わり」
        なのに残ってる → 違和感

    開発者視点
        スクロールロック解除漏れ
        aria-expanded の不整合
        状態バグの温床
        👉 「リンククリック = メニュー終了」
        にしておくのが鉄板。

    実際に使われる場面
        ハンバーガーメニュー（SP）
        サイドドロワー
        モーダル内ナビゲーション
        1ページLPのアンカーリンク
        👉 ほぼ全てのスライドメニュー

    メリットまとめ
        観点	       メリット
        UX	        操作が直感的
        バグ防止	ロック解除忘れ防止
        状態管理	  UIがズレない
        実務	   「できてて当たり前」

    ② どうやって実装するか（考え方）
        やることはシンプル
        メニュー内のリンクを全部取得
        クリックされたらtoggleMenu(false) を呼ぶ
        
        重要な設計ポイント（超大事）
            「slideMenu 全体」ではなく
            「aタグ（リンク）」を見る

        理由：
            nav 自体をクリックしても閉じたくない
            リンクだけが「確定操作」だから



















*/




/* フォーカストラップ（Focus Trap） */
/* 意味、用途、役割、メリット */
/*
    Tabキー
    　Tab → 次のフォーカス可能要素へ
    　Shift + Tab → 前のフォーカス可能要素へ
    　フォーカス可能要素例：
        <a>/<button>/<input>/<select>/<textarea>
 
    フォーカストラップが無いと何が起きるか
    　❌ ダメな例（今の状態）
        メニューを開く
        Tabキー押す
        メニュー内を移動
        気づいたら背景のリンクやボタンに飛ぶ
        👉
        見えない場所にフォーカス
        キーボード操作の人は現在地を完全に見失う
        アクセシビリティ的にアウト（WCAG違反）

    フォーカストラップがあると
    　　✅ 正しい挙動
        メニューを開いてる間
        Tab / Shift+Tab を押しても
        フォーカスはメニュー内でループ
        👉
        「このUIはいまモーダル状態です」という宣言になる。

    どんな場面で使われる？
            UI	                      必須度
        ハンバーガーメニュー	         ★★★★☆
        モーダルダイアログ               ★★★★★（必須）
        アラート / 確認ダイアログ	      ★★★★★
        ログインポップアップ	          ★★★★★
        👉 案件では「入ってて当たり前」

    メリットまとめ
        ・キーボード操作ユーザーに優しい
        ・スクリーンリーダー対応が一気に向上
        ・「ちゃんとしたUI」感が爆上がり
        ・アクセシビリティレビューで突っ込まれない

*/







