<?php include_once "functions.php"; ?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jeans</title>

    <!-- このコードを書かないと、functions.php内にある関数を呼べないため、functions.phpにある関数を呼び込むために必要不可欠 -->
    <?php load_css_js(); ?>

    
</head>
<body>
    

  <header class="site-header">
   <section class="header-introduction">
      
      <img src="img/homesite.png" alt="紹介画像" class="header-picture">
      <!-- メニューボタン --><!-- ボタンの設置を置くためのコード -->
      <!--①--><button class="menu-button" id="menuButton" aria-label="メニューを開く"> ☰ </button>  
   </section>

      <!-- スライドメニュー --><!-- ボタンを押した時にその中身を実装するためのコード --><!-- ボタンを押した時のその中身を制作or編集するためのコード -->
      <!--②-->
      <nav id="slideMenu" class="slide-menu">
        <ul class="menu-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Jeans-Descriptions</a></li>
            <li><a href="#">Collection</a></li>
            <li><a href="#">About</a></li>
        </ul>
       </nav>
   </header>



<!-- 「button」と「a」の違いとそれぞれの用途分け -->

 <!-- 
　
button
  本来の意味：「その場で何かを実行するための要素」
  用途
    ・メニュー開閉
    ・モーダル表示
    ・フォーム送信
    ・アコーディオン開閉
    ・JSで状態切り替え
  メリット
    ・アクセシビリティ◎
    　　→Enter / Spaceで押せる
 　　・スクリーンリーダーが「操作」と認識
 　　・意味的に正しいHTML（セマンティック）

  今回のケース
    <button class="menu-button" id="menuButton"> ☰ </button>
    👉画面の状態を変えるだけ
    👉 ページ遷移しない
    👉 URL変わらない
 　すなわち、button が正解

　
a
  本来の意味：「別の場所へ移動するための要素」
  用途
  　　・ページ遷移
  　　・外部リンク
  　　・同一ページ内アンカー
  　　・ファイルダウンロード

  実例
  　　<a href="/about">About</a>
     URLが変わる / 位置が変わる
     👉 JSが無くても成立



　
     
※よくある間違い
   1.aタグでメニュー開閉
     <a href="#" id="menuButton">☰</a>

    問題点👇
     ・#で画面が一瞬上に戻る
     ・JS無効時の挙動が不自然
     ・アクセシビリティが悪い
   　👉 昔のやり方・今は非推奨

   2.buttonでページ遷移
     <button onclick="location.href='/about'">
      About
     </button>
     👉 意味的におかしい
     👉 SEO / A11y 的にもマイナス

　     
間違いを防ぐための判断基準一覧
  以下の使い分けを覚えることで間違った使い方をすることはない
    判断基準（これだけ覚えればOK）
   　　 やりたいこと	　　　　　　　 使うタグ
  　　　画面の表示切替	　　　　　　　　button
  　　　　モーダル	　　　　　　　　　  button
  　　　メニュー開閉	　　　　　　　　button
 　　　　ページ移動	　　　　　　　　　     a
 　　　　外部サイト	　　　　　　　　　     a
 　　　同一ページジャンプ	　　　　       a

　
まとめ
  　結論から言うと👇
     button＝「動作（JS）」
     a＝「遷移（URL）」
    役割が完全に違う。

-->








<!-- 「nav」の使い方 -->
 <!-- 
    <nav>
    　意味：「ページ内・サイト内の主要なナビゲーションのまとまり」を表すための要素
    　見た目のため ❌
    　レイアウトのため ❌
    　メニューっぽいから ❌
     👉意味のために使う要素。

　
nav を使うべき時・使うべきでない時
✅ nav を使うべきケース
 ① グローバルナビゲーション
  <nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/jeans">Jeans</a></li>
        <li><a href="/about">About</a></li>
    </ul>
  </nav>
  👉 サイト全体の移動
  👉 一番王道   
 　

 ② ハンバーガーメニュー・スライドメニュー
  <nav id="slideMenu" class="slide-menu">
    <ul>
        <li><a href="#">Collection</a></li>
        <li><a href="#">About</a></li>
    </ul>
  </nav>
  👉 今あなたが作ってるやつ
  👉 完全に正解

 　
 ③ ページ内リンク（目次・アンカー） 
  <nav aria-label="ページ内ナビゲーション">
    <ul>
        <li><a href="#section1">概要</a></li>
        <li><a href="#section2">詳細</a></li>
    </ul>
  </nav>
  👉 長いページでよく使う

　
❌ nav を使ってはいけないケース
 ① 単なるボタン群
      <nav>
       <button>OK</button>
       <button>Cancel</button>
      </nav>
      ❌ ナビゲーションじゃない
      ⭕ この場合は「<div> or <section>」を使う
 
 　
 ② フッターの細かい補助リンク
   ❌ 過剰 
  <nav>
    <a href="/privacy">Privacy</a>
  </nav>
  👉 主要でなければ <footer> 内の <ul> で十分


　　


nav の中に「何を入れるべきか」
  基本ルール
  👉 リンク（aタグ）が主役
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
      </ul>
    </nav>

    OKな中身
    　・<a>
    　・<ul><li>
    　・ロゴリンク
    NG寄り
    　・フォーム
    　・広告
    　・純粋な装飾要素
    
　
(重)nav と button の関係
    正解構造（あなたのケース）
      <button id="menuButton">☰</button>

      <nav id="slideMenu">
        <a href="#">Home</a>
      </nav>
      👉
       button：メニューを「開く操作」
       nav：移動先の「意味的な塊」
      ❌ よくある間違い
      <nav>
       <button>Menu</button>
      </nav>
      👉nav の中に「ナビゲーションじゃない操作」が入ってる


      　 
　

nav は何が嬉しいのか？
① アクセシビリティ
  スクリーンリーダーはこう認識する👇
  「ここはナビゲーションです」
  👉 すぐスキップ・移動できる

　  
② SEO
   検索エンジンは👇
   「このリンク群は重要」
   👉 内部リンクの評価が上がる  

　
③ チーム開発・保守
   <nav> = 移動
   <section> = 内容
   <button> = 操作
   👉 読んだ瞬間に役割が分かる

　



(実務)nav に付けるべき属性
  1.複数 nav がある場合
    <nav aria-label="グローバルナビ">
    <nav aria-label="フッターナビ">
    👉 aria-label はマジで実務

  2.開閉メニューの場合（発展）
    <button
      aria-controls="slideMenu"
      aria-expanded="false"
    >

  3.JSで切り替える👇
    menuButton.setAttribute(
      'aria-expanded',
      slideMenu.classList.contains('is-open')
    );

　　


nav を一言で言うと
  ユーザーが“どこへ行けるか”を示す地図」  


　

(重)button+a+navの使い方まとめ
      要素	      役割
     button	   状態・操作
    　  a	      移動
       nav	   移動先の集合
 

-->