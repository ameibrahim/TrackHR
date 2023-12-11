<?php

    include "trackhr-db-connect.script.php"; 
    
    $conn = OpenConnection();

    $givenInput = $_POST['givenInput'];
    // $searchingRoleID = $_POST['searchingRoleID'];
    $searchingRoleID = 2;

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT user_id, username, email, role_title from users
        JOIN roles ON roles.role_id = users.role_id 
        WHERE (username REGEXP '$givenInput' OR email REGEXP '$givenInput') AND users.role_id = '$searchingRoleID'
        ORDER BY username ASC
        LIMIT 3
    ";

    $result = mysqli_query($conn,$query);

    $users = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($users);

?>