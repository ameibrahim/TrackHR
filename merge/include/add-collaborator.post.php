<?php

    include "trackhr-db-connect.script.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $taskId = $_POST['taskId'];
    $userId = $_POST['userId'];
    $headId = $_POST['headId'];

    $query = "
        INSERT INTO `collaborators`(`task_id`, `user_id`, `head_id`) 
        VALUES ('$taskId','$userId', '$headId')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";

?>