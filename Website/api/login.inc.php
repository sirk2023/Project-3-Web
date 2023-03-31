<?php

if (isset($_POST["submit"])) {

    $email = $_POST["email"];
    $pwd = $_POST["pwd"];

    require_once 'database.php';
    require_once 'functions.inc.php';

    if(emptyInputLogin($email, $pwd) !== false) {
        //We need false to continue "Anything besides false throws an error"
        header("location: ../login.php?error=emptyinput");
        exit();
    }
    loginUser($conn, $email, $pwd);
}
else{
    header("location: ../login.php");
    exit();
}