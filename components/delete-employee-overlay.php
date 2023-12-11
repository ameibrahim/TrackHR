<div class="overlay delete-employee-overlay">
    <div class="popup">
        <div class="popup-header">
            <h1 class="pop-up-title">Delete Employee</h1> 
        </div>

        <div class="loader-view delete-view">
            <div>
                <div class="sk-fold">
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                </div>
                <p>Deleting Employee Records ...</p>
            </div>
        </div>

        <div class="popup-body">

            <div class="popup-message">
                <p>Are you sure you want to delete this user?. All the details associated with this user will be erased. This process cannot be undone.</p>
            </div>

            <div class="button-container">
                <button class="submit-button" type="button" onclick="hideDeleteEmployeePopup()">Cancel</button>
                <button class="submit-button confirm-button" type="button">Confirm Delete</button>
            </div>
            
        </div>
    </div>
</div>