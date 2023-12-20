<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employees</title>
    <?php include 'components/major-imports.php'; ?>
    <link rel="stylesheet" href="css/grid-table.css?4">
    <script src="js/employees.js?4" defer></script>
</head>
<body>

    <!-- GENERATE ALL ROWS USING PHP -->
    <!-- Add JS functions to buttons with id's -->
    
    <?php include 'components/side-navigation.php'; ?>

    <div class="main-container">

        <?php include 'components/top-navigation.php'; ?>
        

        <div class="center-content">

            <h1 class="section-title">Employees</h1>

            <div class="slider">
                <p>Total Employees (100)</p>
            </div>

            <div class="extended-wrapper">

                <div class="grid-table-section employee-grid-table">
                </div>

                <div class="slide-to-scroll">scroll / slide → </div>
            </div>
        </div>
    </div>

    <!-- SUB-OVERLAYS  -->
    <?php include 'components/overlays.php'; ?>
    <?php include 'components/delete-employee-overlay.php'; ?>

</body>
</html>