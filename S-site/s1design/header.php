<?php include_once "functions.php"; ?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>未定</title>

    <?php load_css_js(); ?>
    
</head>
 <body>
    <header class="site-header">
        <section class="header-introduction">
            <div class="header-picture"></div>
        <!-- HTMLの修正（最小限） Header.php（ここだけ変更）
             <button　id="menuButton"　class="menu-button"　aria-label="メニューを開く"　aria-expanded="false" ⭕️　aria-controls="slideMenu"　⭕️> ☰ </button>
             それぞれの意味
                属性	                       意味
              aria-expanded	                 開閉状態
              aria-controls	              操作対象（id指定）
              
            
        -->
            <button id="menuButton" class="menu-button" aria-label="メニューを開く" aria-expanded="false" aria-controls="slideMenu"> ☰ </button>
        </section>
        <nav id="slideMenu" class="slide-menu">
            <ul>
                <li><a href="#">HOME</a></li>
                <li><a href="#">MAIN</a></li>
                <li><a href="#">SUBMAIN</a></li>
                <li><a href="#">未定</a></li>
                <li><a href="#">ABOUT</a></li>
            </ul>
        </nav>
    </header>
