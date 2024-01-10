<?php

    include "trackhr-db-connect.script.php"; 
    
    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT id, employee_name, phone_number, email, web_url FROM aiiovdft_neudc.employee
        LIMIT 30
    ";

    $result = mysqli_query($conn,$query);

    $employees = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($employees);

?>