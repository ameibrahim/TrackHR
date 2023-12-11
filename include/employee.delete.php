<?php

    include "trackhr-db-connect.script.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $id = $_POST['id'];

    $query = "
        DELETE FROM aiiovdft_neudc.employee WHERE id = '$id'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";

?>