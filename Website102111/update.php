<?php
// Replace with your database credentials
    $dsn = 'mysql:host=127.0.0.1:3307;dbname=KillMyData';
    $username = 'root';
    $password = '';

try {
    // Connect to the database
    $conn = new PDO($dsn, $username, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Update the role for the user with ID 4 
    // This is to ensure that only the first user can have this script being ran on giving it admin Role and create a new admin
    // Issues with logging in as an admin as the SQL Hashing PASSWORD() is not compatible with PHP password_verify() function
    $new_role = "Admin";
    $user_id = 4;

    $stmt = $conn->prepare("UPDATE user_table SET user_role = :new_role WHERE user_id = :user_id");
    $stmt->bindParam(':new_role', $new_role);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    echo "Role updated successfully.";
    // Once new role is given to The New user "Admin" with ID 4; Create a new User Admin if needed.
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>