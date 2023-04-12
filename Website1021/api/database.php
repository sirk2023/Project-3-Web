<?php
    $dsn = 'mysql:host=127.0.0.1:3307;dbname=KillMyData';
    $username = 'root';
    $password = '';

    try {
        $conn = new PDO($dsn, $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
?>