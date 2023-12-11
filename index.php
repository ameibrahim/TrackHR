<?php
  session_start();

  $username = isset($_SESSION['username']);
  $roleID = isset($_SESSION['role']);

  if($username && $roleID){ include 'dashboard.php'; }
  else{ header('location:./login.php'); }


?>