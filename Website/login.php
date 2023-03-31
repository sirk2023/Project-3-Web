<?php
    include_once 'header.php';
?>
        <section class="login-form">
            <h1 class=signup-label>Log In</h1>
            <form class="form-horizontal" action="api/login.inc.php" method="POST">
                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email:</label>
                    <div class="col-sm-10">
                        <input type="text" name="email" class="form-control" id="email" placeholder="Enter email">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Password:</label>
                    <div class="col-sm-10">
                        <input type="password" name="pwd" class="form-control" id="pwd" placeholder="Enter password">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox">
                            <label><input type="checkbox"> Remember me</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" name="submit" class="btn btn-default">Log In</button>
                    </div>
                </div>
            </form>
            <p>Don't Have an account? <a href="signup.php">Create Account Here!</a></p>
            <?php
            if (isset($_GET["error"])) {
                if ($_GET["error"] == "emptyinput") {
                    echo "<p>Fill in all fields!</p>";
                }
                else if ($_GET["error"] == "wrongLogin"){
                    echo "<p>Incorrect login Information!</p>";
                }
            }

            ?>
        </section>
    
<?php
    include_once 'footer.php';
?>