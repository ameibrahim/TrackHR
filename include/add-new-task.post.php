<?php

    include "trackhr-db-connect.script.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $taskId = $_POST['taskId'];
    $supertaskId = $_POST['supertaskId'];
    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $creatorId = $_POST['creatorId'];

    $query = "
        INSERT INTO 
        `task`(`task_id`, `supertask_id`, `start_date`, 
        `end_date`, `name`, `description`, `creator_id`) 
        VALUES ('$taskId','$supertaskId','$startDate',
        '$endDate','$name','$description','$creatorId')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";

?>