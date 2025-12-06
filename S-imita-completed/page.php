<?php get_header(); ?>

<div class="container">
    <h2><?php the_title(); ?></h2>

    <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
    ?>
</div>

<?php get_footer(); ?>
