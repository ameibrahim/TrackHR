<?php 
    session_start();
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projects and Tasks</title>
    <?php include 'components/major-imports.php'; ?>

    <script src="js/loadingTasks.js?1" defer></script>

</head>
<body>

    <?php include 'components/side-navigation.php'; ?>

    <div class="main-container">

        <?php include 'components/top-navigation.php'; ?>

        <div class="center-content">

            <h1 class="section-title">Projects and Tasks</h1>

            <div class="slider">
                <p class="grid-slider-total"></p>
            </div>

            <div class="extended-wrapper">

                <div class="grid-table-section tasks-grid-table">
                    <ul class="grid-header" data-title="header">
                        <li>#</li>
                        <li>Task Name</li>
                        <li>Start Date</li>
                        <li>End Date</li>
                        <li>Status</li>
                        <li>Options</li>
                    </ul>

                </div>

                <div class="slide-to-scroll">scroll / slide → </div>
            </div>
        </div>
    </div>

    <!-- SUB-OVERLAYS -->
    <?php include 'components/overlays.php'; ?>


    
</body>
</html>