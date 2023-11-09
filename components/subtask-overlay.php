<div class="overlay subtask-overlay">
    <div class="popup">
        <div class="popup-header">
            <h1 class="pop-up-title">Add A Subtask</h1>
            <div class="close-button" onclick="hideAddSubtaskForm()">
                <img src="images/icons/fi-rr-cross-small.svg" alt="">
            </div>
        </div>

        <div class="popup-body">
            <form class="task-form">

                <div class="form-input-container user-search-container">
                    <span class="form-input-label">Match to parent task</span>
                    <input class="form-input" placeholder="Parent Task" type="text" required>
                    <!-- <span class="release-input-lock" onclick="releaseInputThenFocus(this)"></span> -->
                    <!-- <div class="search-list-of-users">
                    </div> -->
                </div>
    <!-- 
                <div class="grid-two-columns">
    
                    <div class="form-input-container">
                        <span class="form-input-label">start date</span>
                        <input class="form-input patient-date-of-test" placeholder="start date" type="date" required disabled>
                    </div>
    
                    <div class="form-input-container">
                        <span class="form-input-label">Deadline</span>
                        <input class="form-input patient-date-of-test" placeholder="end date" type="date" required>
                    </div>
                </div> -->
    
                <div class="form-input-container user-search-container">
                    <span class="form-input-label">Task Name</span>
                    <input class="form-input" placeholder="Task Name" type="text" required>
                    <!-- <span class="release-input-lock" onclick="releaseInputThenFocus(this)"></span> -->
                    <!-- <div class="search-list-of-users">
                    </div> -->
                </div>
            
                <div class="grid-two-columns">
    
                    <div class="form-input-container">
                        <span class="form-input-label">start date</span>
                        <input class="form-input patient-date-of-test" placeholder="start date" type="date" required>
                    </div>
    
                    <div class="form-input-container">
                        <span class="form-input-label">Deadline</span>
                        <input class="form-input patient-date-of-test" placeholder="end date" type="date" required>
                    </div>
                </div>
            
                <div class="form-input-container">
                    <span class="form-input-label">Add Collaborators</span>
                    <input class="form-input patient-type-of-test" placeholder="Type a collaborator name" type="text">
                </div>
            
                <div class="form-input-container span-three">
                    <span class="form-input-label">Task Description</span>
                    <input class="form-input doctor-remarks" placeholder="Task Description" type="text">
                </div>
            
                <!-- <div class="form-input-container place-end">
                    <span class="form-input-label">Doctor Name</span>
                    <input class="form-input doctor-name" placeholder="Doctor Name" type="text" disabled>
                </div> -->
            
                <button class="submit-button stretch-x" type="button">Add New Task</button>
                <div class="sk-bounce hidden-at-launch stretch-x create-report-loader">
                    <div class="sk-bounce-dot"></div>
                    <div class="sk-bounce-dot"></div>
                </div>
            </form>
        </div>
    </div>
</div>