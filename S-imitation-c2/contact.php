<?php
$name = htmlspecialchars($_POST["name"], ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_POST["email"], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST["message"], ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>送信完了</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>送信完了しました</h1>
</header>

<section class="form-area">
    <p>名前：<?php echo $name; ?></p>
    <p>メール：<?php echo $email; ?></p>
    <p>メッセージ：</p>
    <div style="white-space: pre-wrap;"><?php echo $message; ?></div>
</section>

</body>
</html>
