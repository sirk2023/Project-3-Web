<?php
    include_once 'header.php';
?>
<?php
    $_SESSION['useruid'] = $useruid;
    echo $_SESSION['useruid'];
?>

        <section class="index-intro">
            <h1>This is an Introduction</h1>
            <p>Here is an important stuff that the company does</p>
        </section>
        <?php
        
        echo ''
        ?>
        <section class="index-catagories">
            <div class="left-panel">
                <!-- content for left panel goes here -->
            </div>
            <div class="right-panel">
                <!-- content for right panel goes here -->
            </div>
        </section>

<?php
    include_once 'footer.php';
?>