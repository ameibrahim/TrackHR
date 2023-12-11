<?php
  session_start();

  $username = $_SESSION['username'];
  $roleID = $_SESSION['role'];
  $roleID = number_format($roleID);

//   switch ($roleID) {
//     case "0":
//       include 'dashboard/admin.php';
//       break;
//     case "1":
//       include 'dashboard/ceo.php';
//       break;
//     case "2":
//       include 'dashboard/manager.php';
//       break;
//     case "3":
//       include 'dashboard/supervisor.php';
//       break;
//     case "4":
//       include 'dashboard/worker.php';
//       break;
//     default:
      
//   }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <?php include 'components/major-imports.php'; ?>
</head>
<body>
    
    <?php include 'components/side-navigation.php'; ?>
        
    <div class="main-container">
        <?php include 'components/top-navigation.php'; ?>
        
        <div class="center-content">
            <div class="quick-links"></div>
            <div class="time-report-section"></div>
        </div>
    </div>

    <!-- SUB-OVERLAYS -->
    <?php include 'components/overlays.php'; ?>

</body>
</html>