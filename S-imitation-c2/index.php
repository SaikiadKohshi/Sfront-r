<?php
// 簡単なPHP：アクセス時刻を取得
$time = date("Y-m-d H:i:s");
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>お問い合わせミニサイト</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>お問い合わせフォーム</h1>
    <p class="time">現在時刻：<?php echo $time; ?></p>
</header>

<section class="form-area">
    <form action="process.php" method="POST" id="contactForm">
        <label>名前：</label>
        <input type="text" name="name" required>

        <label>メール：</label>
        <input type="email" name="email" required>

        <label>メッセージ：</label>
        <textarea name="message" required></textarea>

        <button type="submit">送信</button>
    </form>
</section>

<script src="script.js"></script>
</body>
</html>
