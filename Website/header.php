<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="js/jquery.js"></script>
    <script src="js/jquery.dataTables.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/main1.js"></script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/jquery.DataTables.css"/>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/main.css"/>
</head>
<body>
    <nav>
        <div class="wrapper">
        <div class="jumbotron text-center margin-control">
            <h1>HDD Destruction</h1>
            <p>We cater HDD & SSD Destruction</p> 
        </div>
        <nav class="navbar navbar-inverse margin-control">
            <div class="container-fluid">
                <?php if (!isset($_SESSION["useremail"])) {
                    echo '<ul class="nav navbar-nav">';
                        echo '<li><a href="index.php">Home</a></li>';
                        echo '<li><a href="#">Page 1</a></li>';
                        echo '<li><a href="#">Page 2</a></li>';
                        echo '<li><a href="#">Page 3</a></li>';
                        echo '<li><a href="#">Page 4</a></li>';
                    echo '</ul>';
                        echo '<ul class="nav navbar-nav navbar-right">';
                            echo '<li><a href="signup.php"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>';
                            echo '<li><a href="login.php"><span class="glyphicon glyphicon-log-in"></span> Log In</a></li>';
                        echo '</ul>';
                        
                    }else if ($_SESSION["userstatus"] === "Client") { 
                        echo '<ul class="nav navbar-nav">';
                            echo '<li><a href="index.php">Home</a></li>';
                            echo '<li><a href="#">Client</a></li>';
                            echo '<li><a href="#">Page 2</a></li>';
                            echo '<li><a href="#">Page 3</a></li>';
                            echo '<li><a href="#">Page 4</a></li>';
                        echo '</ul>';
                        echo '<ul class="nav navbar-nav navbar-right">';
                            echo '<li><a href="signup.php"><span class="glyphicon glyphicon-user"></span>Profile</a></li>';
                            echo '<li><a href="logout.php"><span class="glyphicon glyphicon-log-in"></span>Log Out</a></li>';
                        echo '</ul>';
                    }else if ($_SESSION["userstatus"] === "Admin") {
                        echo '<ul class="nav navbar-nav">';
                            echo '<li><a href="index.php">Home</a></li>';
                            echo '<li><a href="#">Admin</a></li>';
                            echo '<li><a href="#">Page 2</a></li>';
                            echo '<li><a href="#">Page 3</a></li>';
                            echo '<li><a href="#">Page 4</a></li>';
                        echo '</ul>';
                        echo '<ul class="nav navbar-nav navbar-right">';
                            echo '<li><a href="signup.php"><span class="glyphicon glyphicon-user"></span>Profile</a></li>';
                            echo '<li><a href="logout.php"><span class="glyphicon glyphicon-log-in"></span>Log Out</a></li>';
                        echo '</ul>';
                    } ?> 
            </div>
        </nav>
        </div>
        </div>
    </nav>
<div class="body-wrapper">