<?php

function emptyInputSignup($name, $email, $uid, $pwd, $pwdRepeat) {
    $result;
    if (empty($name) || empty($email) || empty($uid) || empty($pwd) || empty($pwdRepeat)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function invalidUid($uid) {
    $result;
    if (!preg_match("/^[a-zA-Z0-9]*$/", $uid)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function invalidEmail($email) {
    $result;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function pwdMatch($pwd, $pwdRepeat) {
    $result;
    if ($pwd !== $pwdRepeat) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}
function uidExists($conn, $email) {
    $sql = "SELECT * FROM user_client WHERE client_email = :email";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        header("location: ../signup.php?error=statementFailed");
        exit();
    }
    $stmt->execute(array(':email'=>$email));
    $resultData = $stmt->fetch(PDO::FETCH_ASSOC);

    if($resultData) {
        return $resultData;
    } else {
        return false;
    }
}

function createUser($conn, $name, $email, $uid, $pwd) {
    $sql = "INSERT INTO user_client (client_name, client_email, client_uid, client_pass) VALUES (:name, :email, :uid, :pwd)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        header("location: ../signup.php?error=statementFailed");
        exit();
    }
    // Hash the password into the Database 
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    $stmt->execute(array(':name'=>$name, ':email'=>$email, ':uid'=>$uid, ':pwd'=>$hashedPwd));
    if ($stmt->rowCount() == 0) {
        header("location: ../signup.php?error=insertFailed");
        exit();
    }
    header("location: ../signup.php?error=none");
    exit();
}
function emptyInputLogin($uid, $pwd) {
    $result;
    if (empty($uid) || empty($pwd)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function loginUser($conn, $email, $pwd) {
    $uidExists = uidExists($conn, $email);
    if ($uidExists === false) {
        header("location: ../login.php?error=wrongLogin");
        exit();
    }
    $pwdHashed = $uidExists["client_pass"];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if ($checkPwd === false) {
        header("location: ../login.php?error=wrongLogin");
        exit();
    }
    else if ($checkPwd === true) {
        session_start();
        $_SESSION["userid"] = $uidExists["client_id"];
        $_SESSION["useruid"] = $uidExists["client_uid"];
        $_SESSION["useremail"] = $uidExists["client_email"];
        header("location: ../profile.php");
        exit();
    }
}
?>