<?php
    include_once 'header.php';
?>
        <section class="signup-form">
            <h1 class=signup-label>Create Admin Account</h1>
            <form class="form-horizontal" action="api/adminSignup.inc.php" method="post">
                <div class="form-group">
                    <label class="control-label col-sm-2" for="name">Name </label>
                    <div class="col-sm-10">
                        <input type="text" name="name" class="form-control" id="name" placeholder="Enter Name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email</label>
                    <div class="col-sm-10">
                        <input type="text" name="email" class="form-control" id="email" placeholder="Email">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="uid">Username</label>
                    <div class="col-sm-10">
                        <input type="text" name="uid" class="form-control" id="uid" placeholder="Username">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Password</label>
                    <div class="col-sm-10">
                        <input type="password" name="pwd" class="form-control" id="pwd" placeholder="Enter password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="pwdrepeat">Confirm Password:</label>
                    <div class="col-sm-10">
                        <input type="password" name="pwdrepeat" class="form-control" id="pwdrepeat" placeholder="Confirm password">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" name="submit" class="btn btn-default">Sign Up</button>
                    </div>
                </div>

            </form>
            <p>Can only create Admins Here</p>

            <?php
            if (isset($_GET["error"])) {
                if ($_GET["error"] == "emptyinput") {
                    echo "<p>Fill in all fields!</p>";
                }
                else if ($_GET["error"] == "invaliduid"){
                    echo "<p>Choose a proper Username!</p>";
                }
                else if ($_GET["error"] == "invalidemail"){
                    echo "<p>Choose a proper Email!</p>";
                }
                else if ($_GET["error"] == "passnomatch"){
                    echo "<p>Passwords don't match!</p>";
                }
                else if ($_GET["error"] == "usernametaken"){
                    echo "<p>Username already taken</p>";
                }
                else if ($_GET["error"] == "none"){
                    echo "<p>You have signed up!!</p>";
                }
            }

            ?>
            
        </section>

    
<?php
    include_once 'footer.php';
?>