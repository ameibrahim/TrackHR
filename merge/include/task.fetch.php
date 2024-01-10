<?php

    include "trackhr-db-connect.script.php"; 
    
    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $supertaskId = $_POST['supertaskId'];

    $query = "
        SELECT a.task_id, a.name, a.start_date, a.end_date, a.completed, COUNT(b.task_id) AS children FROM task a 
        LEFT JOIN task b ON a.task_id = b.supertask_id
        WHERE a.task_id = '$supertaskId'
        GROUP BY a.task_id
    ";

    $result = mysqli_query($conn,$query);

    $tasks = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($tasks);

?>