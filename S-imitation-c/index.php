<?php
    $message = "ようこそ、PHP × HTML × CSS × JS の世界へ！";
    $time = date("Y-m-d H:i:s");
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>PHP Practice</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1><?php echo $message; ?></h1>
    <p class="time">現在時刻：<?php echo $time; ?></p>
</header>

<section class="content">
    <button id="btn">クリックすると色が変わる</button>
</section>

<script src="script.js"></script>
</body>
</html>
