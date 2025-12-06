<?php include "header.php"; ?>

<main>
    <?php
    // WordPress の「ループ風」
    $posts = [
        ["title" => "最初の記事", "content" => "これはサンプルの記事です。"],
        ["title" => "2つ目の記事", "content" => "PHPでループを再現しています。"],
        ["title" => "3つ目の記事", "content" => "WordPressテーマ練習用。"]
    ];

    foreach ($posts as $post) :
    ?>
        <article>
            <h2><?php echo $post["title"]; ?></h2>
            <p><?php echo $post["content"]; ?></p>
        </article>
        <hr>
    <?php endforeach; ?>

    <button id="helloBtn">クリックしてみる</button>
</main>

<?php include "footer.php"; ?>
