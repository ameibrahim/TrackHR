<?php

    include "trackhr-db-connect.script.php"; 
    
    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $creatorId = $_POST['creatorId'];

    $query = "
        SELECT task.task_id, task.name, task.start_date, task.end_date, task.completed FROM task
        WHERE task.creator_id = '$creatorId'
        LIMIT 30
    ";

    $result = mysqli_query($conn,$query);

    $tasks = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($tasks);

?>