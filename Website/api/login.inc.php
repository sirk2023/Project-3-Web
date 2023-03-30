<?php

if (isset($_POST["submit"])) {

    $uid = $_POST["uid"];
    $pwd = $_POST["pwd"];

    require_once 'database.php';
    require_once 'functions.inc.php';

    if(emptyInputLogin($uid, $pwd) !== false) {
        //We need false to continue "Anything besides false throws an error"
        header("location: ../login.php?error=emptyinput");
        exit();
    }
    loginUser($conn, $uid, $pwd);
}
else{
    header("location: ../login.php");
    exit();
}