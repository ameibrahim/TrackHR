<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Managers</title>
    <?php include 'components/major-css-imports.php'; ?>

    <link rel="stylesheet" href="css/grid-table.css">

    <script src="js/index.js" defer></script>
</head>
<body>
    
    <?php include 'components/side-navigation.php'; ?>

    <div class="main-container">

        <?php include 'components/top-navigation.php'; ?>
        

        <div class="center-content">

            <h1 class="section-title">Managers</h1>

            <div class="grid-table-section">
                <ul class="grid-header">
                    <li class="itemization-title">#</li>
                    <li>Name</li>
                    <li>Email</li>
                    <li>Current Task</li>
                    <li>...</li>
                </ul>

                <ul class="grid-row">
                    <li class="itemization-badge"></li>
                    <li>Munim</li>
                    <li>munim@yahoo.com</li>
                    <li class="current-task-badge">Creating a new site</li>
                    <li>...</li>
                </ul>

                <ul class="grid-row">
                    <li class="itemization-badge"></li>
                    <li>Munim</li>
                    <li>munim@yahoo.com</li>
                    <li class="current-task-badge">Creating a new site</li>
                    <li>...</li>
                </ul>
            </div>
        </div>
    </div>

    // SUB-OVERLAYS 
    <?php include 'components/task-overlay.php'; ?>
    <?php include 'components/subtask-overlay.php'; ?>



</body>
</html>