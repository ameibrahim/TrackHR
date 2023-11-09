<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gantt</title>
    <link rel="stylesheet" href="css/font.css">
    <link rel="stylesheet" href="css/root.css">
    <link rel="stylesheet" href="css/dashboard.css?2">
    <link rel="stylesheet" href="css/popup.css">
    <link rel="stylesheet" href="css/inputs.css">
    <link rel="stylesheet" href="css/max-view.css?3">

    <link rel="stylesheet" href="css/gantt.css">
    <!-- <link rel="stylesheet" href="css/grid-table.css"> -->

    <script src="js/index.js?1" defer></script>
    <script src="js/gantt.js" defer></script>
    <script src="js/fullscreenView.js" defer></script>
</head>
<body>

    <?php include 'components/side-navigation.php'; ?>



    <div class="main-container">

        <?php include 'components/top-navigation.php'; ?>

        <div class="center-content gantt-center-content">
            <div class="max-view" onclick="toggleCenterView()">
                <h1 class="header-title">Gantt of Projects</h1>
                <div class="view-icon">
                    <img class="icon full-screen-icon hover-enlarge" src="images/icons/fi-rr-expand.svg" alt="">
                    <img class="icon min-screen-icon hover-enlarge" src="images/icons/fi-rr-compress.svg" alt="">
                </div>
            </div>

            <ul class="gantt-container">

            </ul> 
        </div>
    </div>

    <!-- SUB-OVERLAYS -->
    <?php include 'components/overlays.php'; ?>
    
</body>
</html>