<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="css/font.css">
    <link rel="stylesheet" href="css/root.css">
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="css/popup.css">
    <link rel="stylesheet" href="css/inputs.css">

    <script src="js/index.js" defer></script>
</head>
<body>
    
    <?php include 'components/side-navigation.php'; ?>
        

    <div class="main-container">

        <?php include 'components/top-navigation.php'; ?>
        
        <div class="center-content">

            <div class="quick-links">

            </div>

            <div class="time-report-section">

            </div>
        </div>
    </div>

    // SUB-OVERLAYS
    <?php include 'components/task-overlay.php'; ?>
    <?php include 'components/subtask-overlay.php'; ?>

</body>
</html>