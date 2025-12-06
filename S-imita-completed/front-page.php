<?php get_header(); ?>

<div class="container">
    <h2>フロントページ（固定ページ）</h2>
    <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
    ?>
</div>

<?php get_footer(); ?>
