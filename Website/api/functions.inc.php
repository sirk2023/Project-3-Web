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
    $sql = "INSERT INTO user_client (client_name, client_email, client_uid, client_role, client_pass) VALUES (:name, :email, :uid, :role, :pwd)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        header("location: ../signup.php?error=statementFailed");
        exit();
    }
    // Set default role to client
    $role = "Client";
    // Hash the password into the Database 
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    $stmt->execute(array(':name'=>$name, ':email'=>$email, ':uid'=>$uid, ':role'=>$role, ':pwd'=>$hashedPwd));
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
        $_SESSION["username"] = $uidExists["client_name"];
        header("location: ../profile.php");
        exit();
    }
}
// ---------------- Users ----------------


// ---------------- Staff ----------------
// Get all Users

// ---------------- Jobs ----------------
function getJobs() {
	$query = "SELECT * FROM jobs ORDER BY job_id";
	try {
	global $conn;
		$jobs = $conn->query($query);  
		$jobs = $jobs->fetchAll(PDO::FETCH_ASSOC);
		header("Content-Type: application/json", true);
		echo '{"jobs": ' . json_encode($jobs) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
// Get job by ID
function getJob($id) {
	$query = "SELECT * FROM jobs WHERE job_id = '$id'";
    try {
		global $conn;
		$jobs = $db->query($query);  
		$job = $jobs->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($job);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
?>
?>