<?php

    include "trackhr-db-connect.script.php"; 
    
    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $creatorId = $_POST['creatorId'];
    $supertaskId = $_POST['supertaskId'];

    $query = "
        SELECT a.id, a.task_id, a.supertask_id, a.start_date, a.start_date, a.end_date, a.name, a.description, a.progress, a.completed, a.creator_id, COUNT(b.task_id) AS children
        FROM
            task a LEFT JOIN
            task b ON a.task_id = b.supertask_id
        WHERE a.creator_id = '$creatorId' AND a.supertask_id = '$supertaskId'
        GROUP BY a.task_id
    ";

    $result = mysqli_query($conn,$query);

    $tasks = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($tasks);

?>