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
    $sql = "SELECT * FROM user_table WHERE user_email = :email";
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
    $sql = "INSERT INTO user_table (user_name, user_email, user_uid, user_role, user_pass) VALUES (:name, :email, :uid, :role, :pwd)";
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

# CREATE AN ADMIN USER
function createAdmin($conn, $name, $email, $uid, $pwd) {
    $sql = "INSERT INTO user_table (user_name, user_email, user_uid, user_role, user_pass) VALUES (:name, :email, :uid, :role, :pwd)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        header("location: ../signup.php?error=statementFailed");
        exit();
    }
    // Set default role to admin
    $role = "Admin";
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

function loginUser($conn, $email, $pwd) {
    $uidExists = uidExists($conn, $email);
    if ($uidExists === false) {
        header("location: ../login.php?error=wrongLogin");
        exit();
    }
    $pwdHashed = $uidExists["user_pass"];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if ($checkPwd === false) {
        header("location: ../login.php?error=wrongLogin");
        exit();
    }
    else if ($checkPwd === true) {
        session_start();
        $_SESSION["userid"] = $uidExists["user_id"];
        $_SESSION["useruid"] = $uidExists["user_uid"];
        $_SESSION["useremail"] = $uidExists["user_email"];
        $_SESSION["username"] = $uidExists["user_name"];
        $_SESSION["userstatus"] = $uidExists["user_role"];

         //Check user role
        $userRole = $uidExists["user_role"];
        if ($userRole === "Client") {
            header("location: ../client_profile.php");
            
            exit();
        } else if ($userRole === "Admin") {
            header("location: ../admin_profile.php");
            exit();
        } else {
            header("location: ../login.php?error=wrongLogin");
            exit();
        }
        header("location: ../profile.php");
        exit();
    }
}
// ---------------- Users ----------------


// ---------------- Staff ----------------
// Get all Users

// ----------------  RequestedJobs ----------------
function getRequestedJobs() {
	$query = "SELECT * FROM request_job ORDER BY request_id";
	try {
	global $conn;
		$requestJobs = $conn->query($query);  
		$requestJobs = $requestJobs->fetchAll(PDO::FETCH_ASSOC);
		header("Content-Type: application/json", true);
		echo '{"requestJobs": ' . json_encode($requestJobs) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
// ----------------  RequestedJobs By ID ----------------
function getRequestedJob($id) {
	$query = "SELECT * FROM request_job WHERE request_id = '$id'";
    try {
		global $conn;
		$requestJobs = $conn->query($query);
		$requestJob = $requestJobs->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($requestJob);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

// ----------------  RequestedJobs By Company Name ----------------
function findByCompanyName($company_name) {
    $query = "SELECT * FROM request_job WHERE company_name LIKE :company_name ORDER BY company_name";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':company_name', "%$company_name%", PDO::PARAM_STR);
            $stmt->execute();
            $requestJobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($requestJobs);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
// Add new Wallet

function requestAddJob() {
    global $app;
    $request = $app->request();
    $requestJob = json_decode($request->getBody());
    $request_id = $requestJob->request_id;
    $customer_id = $requestJob->customer_id;
    $user_id = $_SESSION['userid']; // Accessing user_id from session
    $company_name = $requestJob->company_name;
    $user_phone = $requestJob->user_phone;
    $user_address = $requestJob->user_address;
    $additional_information = $requestJob->additional_information;

    
    $query = "INSERT INTO request_job
            (request_id, customer_id, user_id, company_name, user_address, additional_Information)
            VALUES
            (:request_id, :customer_id, :user_id, :company_name, :user_address, :additional_information)";
    try {
        global $conn;
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':request_id', $request_id);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':company_name', $company_name);
        $stmt->bindParam(':user_address', $user_address);
        $stmt->bindParam(':additional_information', $additional_information);
        $stmt->execute();
        $requestJob->id = $conn->lastInsertId();
        echo json_encode($requestJob); 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
    // ---------------- View all Jobs ----------------
function getJobsA() {
    $query = "SELECT * FROM jobs ORDER BY job_id";
    try {
    global $conn;
        $jobsA = $conn->query($query);
        $jobsA = $jobsA->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"jobs": ' . json_encode($jobsA) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

//Get job by ID
function getJobA($idA) {
    $query = "SELECT * FROM jobs WHERE job_id = '$idA'";
    try {
        global $conn;
        $jobsA = $conn->query($query);
        $jobA = $jobsA->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($jobA);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
    // ---------------- Batch Table ----------------
    function getBatchs() {
        $query = "SELECT * FROM batch_table ORDER BY batch_id";
        try {
        global $conn;
            $batchs = $conn->query($query);
            $batchs = $batchs->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo '{"jobs": ' . json_encode($batchs) . '}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }
    
    //Get job by ID
    function getBatch($idB) {
        $query = "SELECT * FROM batch_table WHERE batch_id = '$idB'";
        try {
            global $conn;
            $batchs = $conn->query($query);
            $batch = $batchs->fetch(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($batch);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }


?>
