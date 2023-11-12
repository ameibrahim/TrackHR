<?php

    include "trackhr-db-connect.script.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $taskId = $_POST['taskId'];
    $userId = $_POST['userId'];

    $query = "
        INSERT INTO `collaborators`(`task_id`, `user_id`) 
        VALUES ('$taskId','$userId')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";

?>