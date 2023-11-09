<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gantt</title>
    <link rel="stylesheet" href="css/font.css">
    <link rel="stylesheet" href="css/root.css">
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="css/popup.css">
    <link rel="stylesheet" href="css/inputs.css">

    <link rel="stylesheet" href="css/gantt.css">
    <!-- <link rel="stylesheet" href="css/grid-table.css"> -->

    <script src="js/index.js" defer></script>
    <script src="js/gantt.js" defer></script>
</head>
<body>

    <?php include 'components/side-navigation.php'; ?>



    <div class="main-container">

        <?php include 'components/top-navigation.php'; ?>

        <div class="center-content gantt-center-content">
            <ul class="gantt-container">

            </ul> 
        </div>
    </div>

    // SUB-OVERLAYS 
    <?php include 'components/task-overlay.php'; ?>
    <?php include 'components/subtask-overlay.php'; ?>


    
</body>
</html>