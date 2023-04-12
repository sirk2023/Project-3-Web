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
// RequestedJobs By ID
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

// Find RequestedJobs By Company Name
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

    // Delete a Requested Job
function deleteRequestedJob($request_id) {
	$query = "DELETE FROM request_job WHERE request_id=$request_id";
	try {
		global $conn;
		$conn->exec($query);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

// Add RequestedJob
function requestAddJob() {
    global $app;
    $request = $app->request();
    $requestJob = json_decode($request->getBody());

    $customer_id = $requestJob->customer_id;
    $user_id = $requestJob->user_id;
    $company_name = $requestJob->company_name;
    $user_phone = $requestJob->user_phone;
    $user_address = $requestJob->user_address;
    $additional_information = $requestJob->additional_information;
    $query = "INSERT INTO request_job
            (customer_id, user_id, company_name,user_phone, user_address, additional_information)
            VALUES
            (:customer_id, :user_id, :company_name,:user_phone, :user_address, :additional_information)";
    try {
        global $conn;
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':company_name', $company_name);
        $stmt->bindParam(':user_phone', $user_phone);
        $stmt->bindParam(':user_address', $user_address);
        $stmt->bindParam(':additional_information', $additional_information);
        $stmt->execute();
        $requestJob->id = $conn->lastInsertId();
        echo json_encode($requestJob); 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

// Update RequestedJob
function updateRequestedJob() {
    global $app;
    $request = $app->request();
    $requestJob = json_decode($request->getBody());
    $customer_id = $requestJob->customer_id;
    $user_id = $requestJob->user_id;
    $company_name = $requestJob->company_name;
    $user_phone = $requestJob->user_phone;
    $user_address = $requestJob->user_address;
    $additional_information = $requestJob->additional_information;

    $query = "UPDATE request_job
            SET customer_id = :customer_id,
                user_id = :user_id,
                company_name = :company_name,
                user_phone = :user_phone,
                user_address = :user_address,
                additional_information = :additional_information
            WHERE customer_id = :customer_id";
    try {
        global $conn;
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':company_name', $company_name);
        $stmt->bindParam(':user_phone', $user_phone);
        $stmt->bindParam(':user_address', $user_address);
        $stmt->bindParam(':additional_information', $additional_information);

        $stmt->execute();
        $requestJob->id = $conn->lastInsertId();
        echo json_encode($requestJob); 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

// ---------------- User Table Functions ----------------

function getUsers() {
    $query = "SELECT * FROM user_table ORDER BY user_id";
    try {
    global $conn;
        $Users = $conn->query($query);
        $Users = $Users->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"user_table": ' . json_encode($Users) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

//Get user by ID
function getUser($idX) {
    $query = "SELECT * FROM user_table WHERE user_id = '$idX'";
    try {
        global $conn;
        $Users = $conn->query($query);
        $User = $Users->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($User);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

    // Delete a User
    // function deleteRequestedJob($user_id) {
    //     $query = "DELETE FROM user_table WHERE user_id=$user_id";
    //     try {
    //         global $conn;
    //         $conn->exec($query);
    //     } catch(PDOException $e) {
    //         echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    //     }
    // }

// ---------------- Customer Table Functions ----------------

function getCustomers() {
    $query = "SELECT * FROM customer_table ORDER BY customer_id";
    try {
    global $conn;
        $Customers = $conn->query($query);
        $Customers = $Customers->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"customer_table": ' . json_encode($Customers) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

//Get customer by ID
function getCustomer($idY) {
    $query = "SELECT * FROM customer_table WHERE customer_id = '$idY'";
    try {
        global $conn;
        $Customers = $conn->query($query);
        $Customer = $Customers->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($Customer);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

// Find Customer By Customer Name
function findByCustomerName($customer_name) {
    $query = "SELECT * FROM customer_table WHERE customer_name LIKE :customer_name ORDER BY customer_name";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':customer_name', "%$customer_name%", PDO::PARAM_STR);
            $stmt->execute();
            $Customers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($Customers);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

        // Delete a Customer
function deleteCustomer($customer_id) {
	$query = "DELETE FROM customer_table WHERE customer_id=$customer_id";
	try {
		global $conn;
		$conn->exec($query);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

// Update Customer 
    function updateCustomer() {
        global $app;
        $request = $app->request();
        $Customer = json_decode($request->getBody());
        $customer_name = $Customer->customer_name;
        $customer_email = $Customer->customer_email;
        $customer_number = $Customer->customer_number;
        $accounts_link = $Customer->accounts_link;
        $crm_link = $Customer->crm_link;
        $user_id = $Customer->user_id;
        $query = "UPDATE customer_table
            SET customer_name = :customer_name,
            customer_email = :customer_email,
                customer_number = :customer_number,
                accounts_link = :accounts_link,
                crm_link = :crm_link,
                user_id = :user_id
            WHERE customer_name = :customer_name";

        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':customer_name', $customer_name);
            $stmt->bindParam(':customer_email', $customer_email);
            $stmt->bindParam(':customer_number', $customer_number);
            $stmt->bindParam(':accounts_link', $accounts_link);
            $stmt->bindParam(':crm_link', $crm_link);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $Customer->id = $conn->lastInsertId();
            echo json_encode($Customer); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }

    // Update Customer 
    function addCustomer() {
        global $app;
        $request = $app->request();
        $Customer = json_decode($request->getBody());
        $customer_name = $Customer->customer_name;
        $customer_email = $Customer->customer_email;
        $customer_number = $Customer->customer_number;
        $accounts_link = $Customer->accounts_link;
        $crm_link = $Customer->crm_link;
        $user_id = $Customer->user_id;
        $query = "INSERT INTO customer_table
                (customer_name, customer_email, customer_number,accounts_link, crm_link, user_id)
                VALUES
                (:customer_name, :customer_email, :customer_number,:accounts_link, :crm_link, :user_id)";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':customer_name', $customer_name);
            $stmt->bindParam(':customer_email', $customer_email);
            $stmt->bindParam(':customer_number', $customer_number);
            $stmt->bindParam(':accounts_link', $accounts_link);
            $stmt->bindParam(':crm_link', $crm_link);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $Customer->id = $conn->lastInsertId();
            echo json_encode($Customer); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }

// ---------------- Accepted Jobs Table Functions ----------------

function getAcceptedJobs() {
    $query = "SELECT * FROM accepted_jobs ORDER BY job_id";
    try {
    global $conn;
        $AcceptedJobs = $conn->query($query);
        $AcceptedJobs = $AcceptedJobs->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"accepted_jobs": ' . json_encode($AcceptedJobs) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

//Get accepted job by ID
function getAcceptedJob($idZ) {
    $query = "SELECT * FROM accepted_jobs WHERE job_id = '$idZ'";
    try {
        global $conn;
        $AcceptedJobs = $conn->query($query);
        $AcceptedJob = $AcceptedJobs->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($AcceptedJob);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

    // Delete an Accepted Job
    function deleteAcceptedJob($job_id) {
        $query = "DELETE FROM accepted_jobs WHERE job_id=$job_id";
        try {
            global $conn;
            $conn->exec($query);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }
// Add AcceptedJob 
    function addAcceptedJob() {
        global $app;
        $request = $app->request();
        $AcceptedJob = json_decode($request->getBody());
        $customer_id = $AcceptedJob->customer_id;
        $job_number = $AcceptedJob->job_number;
        $job_status = $AcceptedJob->job_status;
        $job_creation_date = $AcceptedJob->job_creation_date;
        $query = "INSERT INTO accepted_jobs
                (customer_id, job_number, job_status,job_creation_date)
                VALUES
                (:customer_id, :job_number, :job_status,:job_creation_date)";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':job_number', $job_number);
            $stmt->bindParam(':job_status', $job_status);
            $stmt->bindParam(':job_creation_date', $job_creation_date);
            $stmt->execute();
            $AcceptedJob->id = $conn->lastInsertId();
            echo json_encode($AcceptedJob); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }
    // Edit AcceptedJob
    function updateAcceptedJob() {
        global $app;
        $request = $app->request();
        $AcceptedJob = json_decode($request->getBody());
        $customer_id = $AcceptedJob->customer_id;
        $job_number = $AcceptedJob->job_number;
        $job_status = $AcceptedJob->job_status;
        $job_creation_date = $AcceptedJob->job_creation_date;

        $query = "UPDATE accepted_jobs
            SET customer_id = :customer_id,
            job_number = :job_number,
            job_status = :job_status,
            job_creation_date = :job_creation_date

            WHERE customer_id = :customer_id";

        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':job_number', $job_number);
            $stmt->bindParam(':job_status', $job_status);
            $stmt->bindParam(':job_creation_date', $job_creation_date);
            $stmt->execute();
            $AcceptedJob->id = $conn->lastInsertId();
            echo json_encode($AcceptedJob); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }



// ---------------- Signature Table Functions ----------------
// Get All Signatures
function getSignatures() {
    $query = "SELECT * FROM signature_table ORDER BY signature_id";
    try {
    global $conn;
        $Signatures = $conn->query($query);
        $Signatures = $Signatures->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"signature_table": ' . json_encode($Signatures) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

//Get Signature by ID
function getSignature($idA) {
    $query = "SELECT * FROM signature_table WHERE signature_id = '$idA'";
    try {
        global $conn;
        $Signatures = $conn->query($query);
        $Signature = $Signatures->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($Signature);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

    // Delete Signature
    function deleteSignature($signature_id) {
        $query = "DELETE FROM signature_table WHERE signature_id=$signature_id";
        try {
            global $conn;
            $conn->exec($query);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }

// Add Signature 
function addSignature() {
    global $app;
    $request = $app->request();
    $Signature = json_decode($request->getBody());
    $job_id = $Signature->job_id;
    $customer_id = $Signature->customer_id;
    $signature_date = $Signature->signature_date;
    $query = "INSERT INTO signature_table
            (job_id, customer_id, signature_date)
            VALUES
            (:job_id, :customer_id, :signature_date)";
    try {
        global $conn;
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':job_id', $job_id);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':signature_date', $signature_date);
        $stmt->execute();
        $Signature->id = $conn->lastInsertId();
        echo json_encode($Signature); 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

    // Edit Signature
    function updateSignature() {
        global $app;
        $request = $app->request();
        $Signature = json_decode($request->getBody());
        $job_id = $Signature->job_id;
        $customer_id = $Signature->customer_id;
        $signature_date = $Signature->signature_date;

        $query = "UPDATE signature_table
            SET customer_id = :customer_id,
            job_id = :job_id,
            customer_id = :customer_id,
            signature_date = :signature_date

            WHERE customer_id = :customer_id";

        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':job_id', $job_id);
            $stmt->bindParam(':signature_date', $signature_date);
            $stmt->execute();
            $Signature->id = $conn->lastInsertId();
            echo json_encode($Signature); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }


// ---------------- Batch Table Functions ----------------

// Get All Batches
function getBatches() {
    $query = "SELECT * FROM batch_table ORDER BY batch_id";
    try {
    global $conn;
        $Batches = $conn->query($query);
        $Batches = $Batches->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"batch_table": ' . json_encode($Batches) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
    
    //Get job by ID
    function getBatch($idB) {
        $query = "SELECT * FROM batch_table WHERE batch_id = '$idB'";
        try {
            global $conn;
            $batches = $conn->query($query);
            $batch = $batches->fetch(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($batch);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

        // Delete Batch
        function deleteBatch($batch_id) {
            $query = "DELETE FROM batch_table WHERE batch_id=$batch_id";
            try {
                global $conn;
                $conn->exec($query);
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            }
        }

    // Add Batch 
    function addBatch() {
        global $app;
        $request = $app->request();
        $batch = json_decode($request->getBody());
        $job_id = $batch->job_id;
        $batch_number = $batch->batch_number;
        $seal_barcode_number = $batch->seal_barcode_number;
        $batch_creation_date = $batch->batch_creation_date;
        $query = "INSERT INTO batch_table
                (job_id, batch_number, seal_barcode_number,batch_creation_date)
                VALUES
                (:job_id, :batch_number, :seal_barcode_number,:batch_creation_date)";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':job_id', $job_id);
            $stmt->bindParam(':batch_number', $batch_number);
            $stmt->bindParam(':seal_barcode_number', $seal_barcode_number);
            $stmt->bindParam(':batch_creation_date', $batch_creation_date);
            $stmt->execute();
            $batch->id = $conn->lastInsertId();
            echo json_encode($batch); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }

        // Edit Batch
        function updateBatch() {
            global $app;
            $request = $app->request();
            $batch = json_decode($request->getBody());
            $job_id = $batch->job_id;
            $batch_number = $batch->batch_number;
            $seal_barcode_number = $batch->seal_barcode_number;
            $batch_creation_date = $batch->batch_creation_date;
    
            $query = "UPDATE batch_table
                SET job_id = :job_id,
                batch_number = :batch_number,
                seal_barcode_number = :seal_barcode_number,
                batch_creation_date = :batch_creation_date
    
                WHERE job_id = :job_id";
    
            try {
                global $conn;
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':job_id', $job_id);
                $stmt->bindParam(':batch_number', $batch_number);
                $stmt->bindParam(':seal_barcode_number', $seal_barcode_number);
                $stmt->bindParam(':batch_creation_date', $batch_creation_date);
                $stmt->execute();
                $batch->id = $conn->lastInsertId();
                echo json_encode($batch); 
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            }
        }

// ---------------- Collected Hard Drives Table Functions ----------------

// Get All Collected Hard Drives
function getCollectedHardDrives() {
    $query = "SELECT * FROM collected_harddrives ORDER BY collected_harddrives_id";
    try {
    global $conn;
        $CollectedHardDrives = $conn->query($query);
        $CollectedHardDrives = $CollectedHardDrives->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"collected_harddrives": ' . json_encode($CollectedHardDrives) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
    
    //Get Collected Hard Drive by ID
    function getCollectedHardDrive($idD) {
        $query = "SELECT * FROM collected_harddrives WHERE collected_harddrives_id = '$idD'";
        try {
            global $conn;
            $CollectedHardDrives = $conn->query($query);
            $CollectedHardDrive = $CollectedHardDrives->fetch(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($CollectedHardDrive);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
        // Delete Collected Hard Drive
        function deleteCollectedHardDrive($collected_harddrives_id) {
            $query = "DELETE FROM collected_harddrives WHERE collected_harddrives_id=$collected_harddrives_id";
            try {
                global $conn;
                $conn->exec($query);
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            }
        }
    

        // Add Collected Hard Drive 
    function addCollectedHardDrive() {
        global $app;
        $request = $app->request();
        $CollectedHardDrive = json_decode($request->getBody());
        $hdd_serial_number = $CollectedHardDrive->hdd_serial_number;
        $batch_id = $CollectedHardDrive->batch_id;
        $signed_by_customer = $CollectedHardDrive->signed_by_customer;
        $signed_date = $CollectedHardDrive->signed_date;
        $query = "INSERT INTO collected_harddrives
                (hdd_serial_number, batch_id, signed_by_customer,signed_date)
                VALUES
                (:hdd_serial_number, :batch_id, :signed_by_customer,:signed_date)";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':hdd_serial_number', $hdd_serial_number);
            $stmt->bindParam(':batch_id', $batch_id);
            $stmt->bindParam(':signed_by_customer', $signed_by_customer);
            $stmt->bindParam(':signed_date', $signed_date);
            $stmt->execute();
            $CollectedHardDrive->id = $conn->lastInsertId();
            echo json_encode($CollectedHardDrive); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }

    // Edit Collected Hard Drive Form
        function updateCollectedHardDrive() {
            global $app;
            $request = $app->request();
            $CollectedHardDrive = json_decode($request->getBody());
            $hdd_serial_number = $CollectedHardDrive->hdd_serial_number;
            $batch_id = $CollectedHardDrive->batch_id;
            $signed_by_customer = $CollectedHardDrive->signed_by_customer;
            $signed_date = $CollectedHardDrive->signed_date;
    
            $query = "UPDATE collected_harddrives
                SET hdd_serial_number = :hdd_serial_number,
                batch_id = :batch_id,
                signed_by_customer = :signed_by_customer,
                signed_date = :signed_date
    
                WHERE hdd_serial_number = :hdd_serial_number";
    
            try {
                global $conn;
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':hdd_serial_number', $hdd_serial_number);
                $stmt->bindParam(':batch_id', $batch_id);
                $stmt->bindParam(':signed_by_customer', $signed_by_customer);
                $stmt->bindParam(':signed_date', $signed_date);
                $stmt->execute();
                $CollectedHardDrive->id = $conn->lastInsertId();
                echo json_encode($CollectedHardDrive); 
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            }
        }    
    

// ---------------- Video Files Table Functions ----------------

// Get All Video Files
function getVideoFiles() {
    $query = "SELECT * FROM video_file_table ORDER BY video_id";
    try {
    global $conn;
        $VideoFiles = $conn->query($query);
        $VideoFiles = $VideoFiles->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"video_file_table": ' . json_encode($VideoFiles) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
    
    //Get Video File by ID
    function getVideoFile($idE) {
        $query = "SELECT * FROM video_file_table WHERE video_id = '$idE'";
        try {
            global $conn;
            $VideoFiles = $conn->query($query);
            $VideoFile = $VideoFiles->fetch(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($VideoFile);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
    
        // Delete Video File
        function deleteVideoFile($video_id) {
            $query = "DELETE FROM video_file_table WHERE video_id=$video_id";
            try {
                global $conn;
                $conn->exec($query);
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            }
        }

        // Add Collected Hard Drive Resouce
    function addVideoFile() {
        global $app;
        $request = $app->request();
        $VideoFile = json_decode($request->getBody());
        $job_id = $VideoFile->job_id;
        $batch_id = $VideoFile->batch_id;
        $hdd_serial_number = $VideoFile->hdd_serial_number;
        $capture_date = $VideoFile->capture_date;
        $file_link = $VideoFile->file_link;
        $query = "INSERT INTO video_file_table
                (job_id, batch_id, hdd_serial_number,capture_date, file_link)
                VALUES
                (:job_id, :batch_id, :hdd_serial_number,:capture_date, :file_link)";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':job_id', $job_id);
            $stmt->bindParam(':batch_id', $batch_id);
            $stmt->bindParam(':hdd_serial_number', $hdd_serial_number);
            $stmt->bindParam(':capture_date', $capture_date);
            $stmt->bindParam(':file_link', $file_link);
            $stmt->execute();
            $VideoFile->id = $conn->lastInsertId();
            echo json_encode($VideoFile); 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }

        // Edit Video File Form
        function updateVideoFile() {
            global $app;
            $request = $app->request();
            $VideoFile = json_decode($request->getBody());
            $job_id = $VideoFile->job_id;
            $batch_id = $VideoFile->batch_id;
            $hdd_serial_number = $VideoFile->hdd_serial_number;
            $capture_date = $VideoFile->capture_date;
            $file_link = $VideoFile->file_link;
    
            $query = "UPDATE video_file_table
                SET job_id = :job_id,
                batch_id = :batch_id,
                hdd_serial_number = :hdd_serial_number,
                capture_date = :capture_date,
                file_link = :file_link
    
                WHERE job_id = :job_id";
    
            try {
                global $conn;
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':job_id', $job_id);
                $stmt->bindParam(':batch_id', $batch_id);
                $stmt->bindParam(':hdd_serial_number', $hdd_serial_number);
                $stmt->bindParam(':capture_date', $capture_date);
                $stmt->bindParam(':file_link', $file_link);
                $stmt->execute();
                $VideoFile->id = $conn->lastInsertId();
                echo json_encode($VideoFile); 
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            }
        }    


// ---------------- Completed Jobs Table Functions ----------------

// Get Completed Jobs
function getCompletedJobs() {
    $query = "SELECT * FROM completed_jobs ORDER BY job_id";
    try {
    global $conn;
        $CompletedJobs = $conn->query($query);
        $CompletedJobs = $CompletedJobs->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"completed_jobs": ' . json_encode($CompletedJobs) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
    
    //Get Completed Job by ID
    function getCompletedJob($idF) {
        $query = "SELECT * FROM completed_jobs WHERE job_id = '$idF'";
        try {
            global $conn;
            $CompletedJobs = $conn->query($query);
            $CompletedJob = $CompletedJobs->fetch(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($CompletedJob);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

// Find Completed Job By Job Customer Name
function findByCompletedJobName($customer_name) {
    $query = "SELECT * FROM completed_jobs WHERE customer_name LIKE :customer_name ORDER BY customer_name";
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':customer_name', "%$customer_name%", PDO::PARAM_STR);
            $stmt->execute();
            $CompletedJobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json", true);
            echo json_encode($CompletedJobs);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

            // Delete CompletedJob
    function deleteCompletedJob($job_id) {
        $query = "DELETE FROM completed_jobs WHERE job_id=$job_id";
        try {
            global $conn;
            $conn->exec($query);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
    }

    // Add Completed Job 
function addCompletedJob() {
    global $app;
    $request = $app->request();
    $CompletedJob = json_decode($request->getBody());
    $customer_name = $CompletedJob->customer_name;
    $date_of_request = $CompletedJob->date_of_request;
    $date_of_collection = $CompletedJob->date_of_collection;
    $date_of_destruction = $CompletedJob->date_of_destruction;
    $certificate_of_destruction = $CompletedJob->certificate_of_destruction;
    $status = $CompletedJob->status;
    $video_link = $CompletedJob->video_link;
    $customer_id = $CompletedJob->customer_id;
    $crm_link = $CompletedJob->crm_link;
    $query = "INSERT INTO completed_jobs
            (customer_name, date_of_request, date_of_collection, date_of_destruction, certificate_of_destruction, status, video_link,customer_id, crm_link)
            VALUES
            (:customer_name, :date_of_request, :date_of_collection, :date_of_destruction, :certificate_of_destruction, :status, :video_link, :customer_id, :crm_link)";
    try {
        global $conn;
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':customer_name', $customer_name);
        $stmt->bindParam(':date_of_request', $date_of_request);
        $stmt->bindParam(':date_of_collection', $date_of_collection);
        $stmt->bindParam(':date_of_destruction', $date_of_destruction);
        $stmt->bindParam(':certificate_of_destruction', $certificate_of_destruction);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':video_link', $video_link);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':crm_link', $crm_link);
        $stmt->execute();
        $CompletedJob->id = $conn->lastInsertId();
        echo json_encode($CompletedJob); 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

    // Edit Video File Form
    function updateCompletedJob() {
        global $app;
        $request = $app->request();
        $CompletedJob = json_decode($request->getBody());
        $customer_name = $CompletedJob->customer_name;
        $date_of_request = $CompletedJob->date_of_request;
        $date_of_collection = $CompletedJob->date_of_collection;
        $date_of_destruction = $CompletedJob->date_of_destruction;
        $certificate_of_destruction = $CompletedJob->certificate_of_destruction;
        $status = $CompletedJob->status;
        $video_link = $CompletedJob->video_link;
        $customer_id = $CompletedJob->customer_id;
        $crm_link = $CompletedJob->crm_link;
    
        $query = "UPDATE completed_jobs
            SET customer_name = :customer_name,
            date_of_request = :date_of_request,
            date_of_collection = :date_of_collection,
            date_of_destruction = :date_of_destruction,
            certificate_of_destruction = :certificate_of_destruction,
            status = :status,
            video_link = :video_link,
            customer_id = :customer_id,
            crm_link = :crm_link
    
            WHERE customer_id = :customer_id";
    
        try {
            global $conn;
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':customer_name', $customer_name);
            $stmt->bindParam(':date_of_request', $date_of_request);
            $stmt->bindParam(':date_of_collection', $date_of_collection);
            $stmt->bindParam(':date_of_destruction', $date_of_destruction);
            $stmt->bindParam(':certificate_of_destruction', $certificate_of_destruction);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':video_link', $video_link);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':crm_link', $crm_link);
            $stmt->execute();
            $CompletedJob->id = $conn->lastInsertId();
            echo json_encode($CompletedJob); 
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





?>
