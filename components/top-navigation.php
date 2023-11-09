<div class="top-navigation">
    <div class="search-container">
        <img src="images/icons/fi-rr-search.svg" alt="">
        <input type="text" class="search-bar" placeholder="Search task, project or team member">
    </div>

    <div class="right-action-buttons">
        <div class="circular-button notifications-button">
            <img src="images/icons/fi-rr-bell.svg" class="row-icon" alt="">

            <!-- <div class="dropdown-menu menu-notifications">

            </div> -->
        </div>

        <div class="circular-button user-button">
            <img src="images/icons/fi-rr-circle-user.svg" class="row-icon" alt="">
            
            <div class="dropdown-menu menu-user">
                <div class="menu-user-row">
                    <p>Settings</p>
                    <img src="images/icons/fi-rr-settings.svg" alt="" class="row-icon">
                </div>
                <div class="menu-user-row">
                    <p>Logout</p>
                    <img src="images/icons/fi-rr-arrow-right-to-bracket.svg" alt="" class="row-icon">
                </div>
            </div>
        </div>
    </div>

    <div class="row-length-button-container">
        <div class="row-length-button" onclick="showAddTaskForm()">
            <img src="images/icons/fi-rr-plus.svg" class="icon" alt="">
            <p>New Project</p>
        </div>

        <div class="row-length-button" onclick="showAddSubtaskForm()">
            <img src="images/icons/fi-rr-diagram-subtask.svg" class="icon" alt="">
            <p>Add Subtask</p>
        </div>

        <a href="view-projects.php" class="row-length-button">
            <img src="images/icons/fi-rr-diagram-project.svg" class="icon" alt="">
            <p>View Projects</p>
        </a>

        <a href="task-gantt.php" class="row-length-button">
            <img src="images/icons/fi-rr-chart-bullet.svg" class="icon" alt="">
            <p>View Gantt Chart</p>
        </a>
    </div>
</div>