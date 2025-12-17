/* メニューボタン機能 */
/* ページ遷移なし */
/*①*/const menuButton = document.getElementById("menuButton"); 
    /* 
        これだけコードを書くのでは、実際に実行するとメニューボタンは表示されるが、そのボタンメニューに触れても何も動作は起きない 
        つまり....
        HTML上にある id="menuButton" を持つ要素を取得し、
        JavaScriptで操作できるように変数に代入している。
        この行は「要素を取得するだけ」で、
        まだクリック時の動作は何も定義していないため、
        これだけではボタンを押しても何も起きない。 
    */
/*②*/const slideMenu = document.getElementById("slideMenu");
    /* 
       HTML上にある id="slideMenu" を持つ nav 要素を取得している。
       この要素に対してクラスの追加・削除を行うことで、
       CSSの見た目（表示・非表示）を切り替えるために必要な処理。 
       ※ここで null になると classList が使えず、以前出ていたエラーが発生する。
    */

/*①*/menuButton.addEventListener('click',()=>{
    /*
      menuButton.addEventListener('click',()=>{};
      menuButton がクリックされた瞬間に、中の処理（アロー関数）を実行するためのイベントリスナーを設定している。
      ここで初めて「クリックしたら何かが起きる」という動作が定義される。 
    */





    console.log('clicked'); 
    /* 

       clickイベントが発火しているかを確認するためのコード 
       つまり....
       ボタンをクリックした時に、JavaScriptの処理が正しく実行されているかをコンソール上で確認するためのデバッグ用コード。
       👉これが出た時点で「JSは動いている」「イベントは発火している」ことが確定。

    */
    slideMenu.classList.toggle('is-open');
    /*

       slideMenu に is-open クラスが付いていなければ追加し、
       すでに付いていれば削除する処理。
       これにより、CSS側で定義された
       `.slide-menu.is-open` のスタイルが適用・解除され、メニューの表示／非表示が切り替わる。 
    
    */

    /* このサイトで開発されたコードの解説 */
    /*
      🌙JS+html+cssの基礎一項
      JSで「slideMenu.classList.toggle('is-open');」を書いた場合、
      .htmlでは以下のように書かないといけない
      <nav id="slideMenu" class="slide-menu is-open">・・・A
      Aを書いた場合cssでは以下のように「.silde-menu」と「.is-open」の間に空白を空けずに必ず繋げて書かないといけない
      .slide-menu.is-open {
         right: 0;
      }
        
     「.slide-menu.is-open」の意味：「.slide-menu かつ .is-open を同時に持つ同一要素」

     🌔なぜこの組み合わせで書くのか
     JS × CSS の組み合わせでよく使う理由

     JSでやってること👇
      element.classList.toggle('is-open');
     👉 状態フラグとしてクラスを付け外ししてる。

     CSS側では必ず👇
     .base-class.is-open { ... }
     このように表現しないといけない

     よって上のような構文になる、必然的にそう書かないといけない

     (重)実務での「あるある」パターン
       やりたいこと	      CSS
       モーダル開く	   .modal.is-open
       メニュー開く    .menu.is-open
       アコーディオン  .item.is-active
       タブ切り替え	   .tab.is-current
      👉 全部「スペースなし」
    
     (基+)このJS+htmlの構文の状態でcssに空白を開けるのはどんな時か
     子要素を操作したい時
     .slide-menu .menu-list li {
       margin: 16px;
      }
     👉 これは正しい
     （.slide-menu の中の li）
    
     超重要な覚え方
      「JSで付ける状態クラスは、スペースなし」
     これ覚えておけば9割防げる。
    */



});

/*
- 別の機能紹介 -

背景クリックで閉じたい場合
  document.addEventListener('click', (e) => {
    if (!slideMenu.contains(e.target) && !menuButton.contains(e.target)) {
       slideMenu.classList.remove('is-open');
    }
  });




スクロール禁止（メニュー表示中）
   「.css」内のファイル
      body.is-menu-open {
      overflow: hidden;
    }
    「.js」内のファイル
    menuButton.addEventListener('click', () => {
      slideMenu.classList.toggle('is-open');
      document.body.classList.toggle('is-menu-open');
    });






*/




