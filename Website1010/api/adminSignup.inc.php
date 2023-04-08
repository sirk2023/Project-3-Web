<?php

if(isset($_POST["submit"])) {
    
    $name = $_POST["name"];
    $email = $_POST["email"];
    $uid = $_POST["uid"];
    $pwd = $_POST["pwd"];
    $pwdRepeat = $_POST["pwdrepeat"];

    require_once "database.php";
    require_once "functions.inc.php";

    //Error check input from the user

    if(emptyInputSignup($name, $email, $uid, $pwd, $pwdRepeat) !== false) {
        //We need false to continue "Anything besides false throws an error"
        print "Empty input detected";
        header("location: ../signup.php?error=emptyinput");
        exit();
    }
    if(invalidUid($uid) !== false) {
        //We need false to continue "Anything besides false throws an error"
        print "Invalid UID detected";
        header("location: ../signup.php?error=invaliduid");
        exit();
    }
    if(invalidEmail($email) !== false) {
        //We need false to continue "Anything besides false throws an error"
        print "Invalid email detected";
        header("location: ../signup.php?error=invalidemail");
        exit();
    }
    if(pwdMatch($pwd, $pwdRepeat) !== false) {
        //We need false to continue "Anything besides false throws an error"
        print "Passwords do not match";
        header("location: ../signup.php?error=passnomatch");
        exit();
    }
    if(uidExists($conn, $uid, $email) !== false) {
        //We need false to continue "Anything besides false throws an error"
        print "UID already exists";
        header("location: ../signup.php?error=usernametaken");
        exit();
    }
    // If no errors found Create the user
    
    createAdmin($conn, $name, $email, $uid, $pwd);
    
} else {
    header("location: ../signup.php");
    exit();
}

