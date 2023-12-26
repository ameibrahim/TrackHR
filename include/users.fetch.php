<?php

    include "trackhr-db-connect.script.php"; 
    
    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $roleID = $_POST['roleID'];

    $query = "
        SELECT users.id, users.username, users.email, roles.role_title FROM users
        JOIN roles ON roles.role_id = users.role_id
        WHERE users.role_id = '$roleID'
        LIMIT 30
    ";

    $result = mysqli_query($conn,$query);

    $users = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($users);

?>