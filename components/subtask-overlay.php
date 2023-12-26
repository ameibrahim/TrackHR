<div class="overlay subtask-overlay">
    <div class="popup">
        <div class="popup-header">
            <h1 class="pop-up-title">Add A Subtask</h1>
            <div class="close-button" onclick="hideAddSubtaskForm()">
                <img src="images/icons/fi-rr-cross-small.svg" alt="">
            </div>
        </div>

        <div class="loader-view">
            <div>
                <div class="sk-fold">
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                </div>
                <p>Adding Project ...</p>
            </div>
        </div>

        <div class="popup-body">
            <form class="task-form add-subtask-form">

                <div class="form-input-container user-search-container">
                    <span class="form-input-label">Match to parent task</span>
                    <div class="in-type-input">
                        <input class="form-input subtask-id-input" data-id="351hrinexlosyeado" oninput="loadParentTasks(this)" placeholder="Parent Task" type="text" required>
                        <div class="parent-task filter-list">
                        </div>
                        <div class="parent-release-button" onclick="releaseParentChoice(this)">
                            <span class="circular-badge">
                                <img src="images/icons/fi-rr-cross-small.svg" alt="">
                            </span>
                        </div>
                    </div>
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
                    <input class="form-input subtask-name-input" placeholder="Task Name" type="text" required>
                    <!-- <span class="release-input-lock" onclick="releaseInputThenFocus(this)"></span> -->
                    <!-- <div class="search-list-of-users">
                    </div> -->
                </div>
            
                <div class="grid-two-columns">
    
                    <div class="form-input-container">
                        <span class="form-input-label">start date</span>
                        <input class="form-input subtask-start-date" placeholder="start date" type="date" required>
                    </div>
    
                    <div class="form-input-container">
                        <span class="form-input-label">Deadline</span>
                        <input class="form-input subtask-end-date" placeholder="end date" type="date" required>
                    </div>
                </div>

                <div class="form-input-container">
                    <span class="form-input-label">Add Collaborators</span>
                    <div class="in-type-input">
                        <input oninput="loadCollaborators(this)" class="form-input add-collaborator-input"
                        placeholder="Type a collaborator name" type="text" required>
                        <div class="collaborator filter-list">
                        </div>
                        <div class="input-close-button" onclick="clearCollaboratorsInput(this)">
                            <span class="circular-badge">
                                <img src="images/icons/fi-rr-cross-small.svg" alt="">
                            </span>
                        </div>

                        <div class="input-side-tag" onclick="slideCollaboratorPopupUp(this)">
                            <span class="circular-badge">0</span>
                        </div>
                    </div>
                </div>
            
                <div class="form-input-container span-three">
                    <span class="form-input-label">Task Description</span>
                    <input class="form-input subtask-description-input" placeholder="Task Description" type="text">
                </div>
            
                <!-- <div class="form-input-container place-end">
                    <span class="form-input-label">Doctor Name</span>
                    <input class="form-input doctor-name" placeholder="Doctor Name" type="text" disabled>
                </div> -->
            
                <button class="submit-button stretch-x" type="button" onclick="addNewSubTask()">Add New Task</button>
                <div class="sk-bounce hidden-at-launch stretch-x create-report-loader">
                    <div class="sk-bounce-dot"></div>
                    <div class="sk-bounce-dot"></div>
                </div>
            </form>

            <div class="popup collaborators-slide-popup">
                <div class="popup-header">
                    <div class="close-button" onclick="slideCollaboratorPopupDown(this)">
                        <img src="images/icons/fi-rr-cross-small.svg" alt="">
                    </div>
                    <h1 class="pop-up-title">Collaborators</h1> 
                </div>

                <div class="popup-body">
                    <ul class="collaborator-list">

                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>