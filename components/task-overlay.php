<div class="overlay task-overlay">
    <div class="popup">
        <div class="popup-header">
            <div class="close-button" onclick="hideAddTaskForm()">
                <img src="images/icons/fi-rr-cross-small.svg" alt="">
            </div>
            <h1 class="pop-up-title">Add A Project</h1> 
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
                        <input class="form-input add-collaborator-input" placeholder="Type a collaborator name" type="text">
                        <div class="input-side-tag" onclick="slideCollaboratorPopupUp()">
                            <span class="circular-badge">9</span>
                        </div>
                    </div>
                </div>
            
                <div class="form-input-container span-three">
                    <span class="form-input-label">Task Description</span>
                    <input class="form-input task-description-input" placeholder="Task Description" type="text">
                </div>
            
                <button class="submit-button stretch-x" type="button">Add New Task</button>
                <div class="sk-bounce hidden-at-launch stretch-x create-report-loader">
                    <div class="sk-bounce-dot"></div>
                    <div class="sk-bounce-dot"></div>
                </div>
            </form>

            <div class="popup collaborators-slide-popup">
                <div class="popup-header">
                    <div class="close-button" onclick="slideCollaboratorPopupDown()">
                        <img src="images/icons/fi-rr-cross-small.svg" alt="">
                    </div>
                    <h1 class="pop-up-title">Collaborators ( 5 )</h1> 
                </div>

                <div class="popup-body">
                    <ul class="collaborator-list">
                        <li class="collaborator-row">
                            <p>Abdulmunim</p>
                            <span>
                                <img src="images/icons/fi-rr-cross-small.svg" alt="">   
                            </span>
                        </li>

                        <li class="collaborator-row">
                            <p>Mahmoud</p>
                            <span>
                                <img src="images/icons/fi-rr-cross-small.svg" alt="">   
                            </span>
                        </li>

                        <li class="collaborator-row">
                            <p>Teyei</p>
                            <span>
                                <img src="images/icons/fi-rr-cross-small.svg" alt="">   
                            </span>
                        </li>

                        <li class="collaborator-row">
                            <p>Ibrahim</p>
                            <span>
                                <img src="images/icons/fi-rr-cross-small.svg" alt="">   
                            </span>
                        </li>

                        <li class="collaborator-row">
                            <p>Johnny</p>
                            <span>
                                <img src="images/icons/fi-rr-cross-small.svg" alt="">   
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>