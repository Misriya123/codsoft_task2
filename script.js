document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage when the page loads
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks from the tasks array
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function (task, index) {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("tasks");

            const taskInput = document.createElement("input");
            taskInput.classList.add("item");
            taskInput.type = "text";
            taskInput.value = task;
            taskInput.readOnly = true; // Set input as read-only by default

            const editButton = document.createElement("button");
            editButton.classList.add("edit");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", function () {
                // Allow editing only when the "Edit" button is clicked
                taskInput.readOnly = false;
                taskInput.focus();

                // Replace the "Edit" and "Delete" buttons with a "Save" button
                editButton.style.display = "none";
                deleteButton.style.display = "none";
                saveButton.style.display = "block";
            });

            const saveButton = document.createElement("button");
            saveButton.classList.add("save");
            saveButton.textContent = "Save";
            saveButton.style.display = "none"; // Initially hidden
            saveButton.addEventListener("click", function () {
                const newText = taskInput.value;
                tasks[index] = newText;
                saveTasksToLocalStorage();
                renderTasks();

                // After saving, show the "Edit" button and hide the "Save" button
                editButton.style.display = "block";
                deleteButton.style.display = "block";
                saveButton.style.display = "none";
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
                renderTasks();
            });

            taskDiv.appendChild(taskInput);
            taskDiv.appendChild(editButton);
            taskDiv.appendChild(saveButton);
            taskDiv.appendChild(deleteButton);

            taskList.appendChild(taskDiv);
        });
    }

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render tasks from local storage
    renderTasks();

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push(taskText);
            saveTasksToLocalStorage();
            renderTasks();
            taskInput.value = ""; // Clear the input field
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});
