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

# CREATE AN ADMIN USER
function createAdmin($conn, $name, $email, $uid, $pwd) {
    $sql = "INSERT INTO user_client (client_name, client_email, client_uid, client_role, client_pass) VALUES (:name, :email, :uid, :role, :pwd)";
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
        $_SESSION["userstatus"] = $uidExists["client_role"];

         //Check user role
        $userRole = $uidExists["client_role"];
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

// ---------------- Jobs ----------------
function getJobs() {
	$query = "SELECT * FROM request_job ORDER BY job_id";
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
//Get job by ID
function getJob($id) {
	$query = "SELECT * FROM request_job WHERE job_id = '$id'";
    try {
		global $conn;
		$jobs = $conn->query($query);
		$job = $jobs->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($job);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

// Calls the Get method from the rest API wallet by token
function findByName($client_name) {
    $query = "SELECT * FROM request_job WHERE client_name LIKE :client_name ORDER BY client_name";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':client_name', "%$client_name%", PDO::PARAM_STR);
            $stmt->execute();
            $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($jobs);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
// Add new Wallet

function addJob() {
    global $app;
    $request = $app->request();
    $job = json_decode($request->getBody());
    $client_name = $job->client_name;
    $client_email = $job->client_email;
    $client_number = $job->client_number;
    $company_name = $job->company_name;
    $client_address = $job->client_address;
    $additional_Information = $job->additional_Information;

    $query = "INSERT INTO request_job
            (client_name, client_email, client_number, company_name, client_address, additional_Information)
            VALUES
            (:client_name, :client_email, :client_number, :company_name, :client_address, :additional_Information)";
    try {
        global $conn;
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':client_name', $client_name);
        $stmt->bindParam(':client_email', $client_email);
        $stmt->bindParam(':client_number', $client_number);
        $stmt->bindParam(':company_name', $company_name);
        $stmt->bindParam(':client_address', $client_address);
        $stmt->bindParam(':additional_Information', $additional_Information);
        $stmt->execute();
        $job->id = $conn->lastInsertId();
        echo json_encode($job); 
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
