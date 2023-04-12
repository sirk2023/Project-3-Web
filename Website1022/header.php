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
    <script src="js/main1080.js"></script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/jquery.DataTables.css"/>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/main1080.css"/>
</head>
<body>
    <nav>
        <div class="wrapper">
        <div class="jumbotron text-center margin-control">
            <h1 id="heading-name">Kill My Data</h1>
            <p>Secure Digital Media Destruction</p> 
        </div>
        <nav class="navbar navbar-inverse margin-control">
            <div class="container-fluid">
            <?php if (!isset($_SESSION["useremail"])) {
                    echo '<ul class="nav navbar-nav">';
                        echo '<li><a href="index.php">Home</a></li>';
                        echo '<li><a href="#">About Us</a></li>';
                        echo '<li><a href="#">Contact Us</a></li>';
                    echo '</ul>';
                        echo '<ul class="nav navbar-nav navbar-right">';
                            echo '<li><a href="signup.php"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>';
                            echo '<li><a href="login.php"><span class="glyphicon glyphicon-log-in"></span> Log In</a></li>';
                        echo '</ul>';
                        
                    }else if ($_SESSION["userstatus"] === "Client") { 
                        echo '<ul class="nav navbar-nav">';
                            echo '<li><a href="client_home.php">Home</a></li>';
                            echo '<li><a href="client_request.php">Request Job</a></li>';

                        echo '</ul>';
                        echo '<ul class="nav navbar-nav navbar-right">';
                            echo '<li><a href="client_profile.php"><span class="glyphicon glyphicon-user"></span>Profile</a></li>';
                            echo '<li><a href="logout.php"><span class="glyphicon glyphicon-log-in"></span>Log Out</a></li>';
                        echo '</ul>';
                    }else if ($_SESSION["userstatus"] === "Admin") {
                        echo '<ul class="nav navbar-nav">';
                        echo '<li class="dropdown">';
                                echo '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Home <b class="caret"></b></a>';
                                echo '<ul class="dropdown-menu">';
                                    echo '<li><a href="admin_view_all_jobs.php">Completed Jobs</a></li>';
                                    echo '<li><a href="admin_batch.php">Batch</a></li>';
                                    echo '<li><a href="admin_accepted_jobs.php">Accepted Jobs</a></li>';
                                    echo '<li><a href="admin_collection.php">Collection</a></li>';
                                    echo '<li><a href="admin_videos.php">Videos</a></li>';
                                    echo '<li><a href="admin_signatures.php">Signatures</a></li>';
                                echo '</ul>';
                            echo '</li>';
                            echo '<li><a href="admin_home.php">Requested Jobs</a></li>';
                            echo '<li><a href="admin_customers.php">Customers</a></li>';
                        echo '</ul>';
                        echo '<ul class="nav navbar-nav navbar-right">';
                            echo '<li><a href="admin_profile.php"><span class="glyphicon glyphicon-user"></span>Profile</a></li>';
                            echo '<li><a href="logout.php"><span class="glyphicon glyphicon-log-in"></span>Log Out</a></li>';
                        echo '</ul>';
                    } ?> 
            </div>
        </nav>
        </div>
        </div>
    </nav>
<div class="body-wrapper">