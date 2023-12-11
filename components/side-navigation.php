<div class="side-navigation">

    <div class="sidenav-row-container logo-section">
        <img src="images/logo.png" alt="" class="logo">
        <div>
            <h2 class="navigation-row-title">TrackHR</h2>
            <p>Time Management Software</p>
        </div>
    </div>

    <div class="sidenav-row-container">
        <h2 class="navigation-row-title">Home</h2>
    
        <a href="dashboard.php" class="navigation-row">
            <span class="selected"></span>
            <img src="images/icons/fi-rr-home.svg" alt="" class="row-icon">
            <p class="navigation-row-name">Dashboard</p>
        </a>

        <?php

            if ($roleID < 1) {
                echo '
                    <a href="employees.php" class="navigation-row">
                        <span class="selected"></span>
                        <img src="images/icons/fi-rr-images-user.svg" alt="" class="row-icon">
                        <p class="navigation-row-name">Employees</p>
                    </a>

                    <a href="managers.php" class="navigation-row">
                        <span class="selected"></span>
                        <img src="images/icons/fi-rr-people-arrows-left-right.svg" alt="" class="row-icon">
                        <p class="navigation-row-name">Managers</p>
                    </a>
                ';
            }

        ?>

        <?php

        if ($roleID < 2) {
            echo '
                <a href="supervisors.php" class="navigation-row">
                    <span class="selected"></span>
                    <img src="images/icons/fi-rr-people-poll.svg" alt="" class="row-icon">
                    <p class="navigation-row-name">Supervisors</p>
                </a>
            ';
        }

        ?>

        <?php

        if ($roleID < 3) {
            echo '
                <a href="workers.php" class="navigation-row">
                    <span class="selected"></span>
                    <img src="images/icons/fi-rr-people-carry-box.svg" alt="" class="row-icon">
                    <p class="navigation-row-name">Workers</p>
                </a>
            ';
        }

        ?>

        <a href="tasks.php" class="navigation-row">
            <span class="selected"></span>
            <img src="images/icons/fi-rr-bullseye-arrow.svg" alt="" class="row-icon">
            <p class="navigation-row-name">Tasks</p>
        </a>

        <a href="task-gantt.php" class="navigation-row">
            <span class="selected"></span>
            <img src="images/icons/fi-rr-chart-bullet.svg" alt="" class="row-icon">
            <p class="navigation-row-name">Gantt View</p>
        </a>
    </div>

    <div class="sidenav-row-container">
        <h2 class="navigation-row-title">Projects</h2>
    
        <!-- These elements need to be dynamically generated -->
        <div class="navigation-row">
            <span class="selected"></span>
            <img src="images/icons/fi-rr-bullseye-arrow.svg" alt="" class="row-icon">
            <p class="navigation-row-name">New Website</p>
        </div>

        <div class="navigation-row">
            <span class="selected"></span>
            <img src="images/icons/fi-rr-bullseye-arrow.svg" alt="" class="row-icon">
            <p class="navigation-row-name">Relaunch Printing Service</p>
        </div>

        <div class="navigation-row">
            <span class="selected"></span>
            <img src="images/icons/fi-rr-bullseye-arrow.svg" alt="" class="row-icon">
            <p class="navigation-row-name">Finance Dashboard</p>
        </div>

        <div class="navigation-row">
            <span class="selected"></span>
            <img src="images/icons/fi-rr-bullseye-arrow.svg" alt="" class="row-icon">
            <p class="navigation-row-name">Workers Platform</p>
        </div>
    </div>

</div>