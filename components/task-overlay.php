<div class="overlay task-overlay">
    <div class="popup">
        <div class="popup-header">
            <div class="close-button" onclick="hideAddTaskForm()">
                <img src="images/icons/fi-rr-cross-small.svg" alt="">
            </div>
            <h1 class="pop-up-title">Add A Project</h1> 
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
            <form class="task-form add-project-form">
                <div class="form-input-container user-search-container">
                    <span class="form-input-label">Project Name</span>
                    <input class="form-input project-name-input" placeholder="Project Name" type="text" required>
                    <!-- <span class="release-input-lock" onclick="releaseInputThenFocus(this)"></span> -->
                    <!-- <div class="search-list-of-users">
                    </div> -->
                </div>
            
                <div class="grid-two-columns">

                    <div class="form-input-container">
                        <span class="form-input-label">start date</span>
                        <input class="form-input project-start-date" placeholder="start date" type="date" required>
                    </div>

                    <div class="form-input-container">
                        <span class="form-input-label">Deadline</span>
                        <input class="form-input project-end-date" placeholder="end date" type="date" required>
                    </div>
                </div>
            
                <div class="form-input-container">
                    <span class="form-input-label">Add Collaborators</span>
                    <div class="in-type-input">
                        <input oninput="loadCollaborators(this)" class="form-input add-collaborator-input"
                        placeholder="Type a collaborator name" type="text" required>
                        <div class="collaborator-filter-list">
                        </div>
                        <div class="input-close-button" onclick="clearCollaboratorsInput()">
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
                    <input class="form-input task-description-input" placeholder="Task Description" type="text">
                </div>
            
                <button class="submit-button stretch-x" type="button" onclick="addNewTask()">Add New Task</button>
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