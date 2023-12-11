<?php

    session_start();

    include "trackhr-db-connect.script.php"; 

    $conn = OpenConnection();

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = " 
        SELECT users.user_id, users.username, users.role_id
        FROM users
        WHERE (username = '$username' OR email = '$username') && password = '$password'
    ";

    $result = mysqli_query($conn,$query);
    $row = mysqli_fetch_array($result);

    CloseConnection($conn);

    if(mysqli_num_rows($result) == 1){ //sizeof row

        $_SESSION['id'] = $row[0];
        $_SESSION['username'] = $row[1];
        $_SESSION['role'] = $row[2];
    }

    header('location:./../');

?>
