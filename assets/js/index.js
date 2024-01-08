 // Task add function ===========> user add the TASK

 const url = 'http://localhost:8080/tasks';
 const taskTable = document.getElementById('taskTable');


 fetch(url)
     .then(response => {
         if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json();
     })
     .then(data => {

         const userId =   localStorage.getItem("userId");
         console.log(userId)
         console.log(data)

         // Filter data based on userId
         
         const userTasks = data.filter(task => task.UserId === userId );
         console.log(userTasks);

         tasklist(userTasks);
     })
     .catch(error => {
         console.error('Error fetching data:', error);
     });


function tasklist(data) {
 const taskList = document.getElementById('taskList');

 for (let i = 0; i < data.length; i++) {
     const taskWrapper = document.createElement('div');
     taskWrapper.classList.add('task-wrapper');

     taskWrapper.innerHTML = `
         <div class="task-details">
             <h3>${data[i].Title}</h3>
             <p>${data[i].Desc}</p>
             <p>Date: ${data[i].date}</p>
             <p>Status: <span id="${data[i]}">Pending</span></p>
         </div>
         <div class="task-actions">
             <a href="#" onclick="openEditPopup(${data[i].id}, '${data[i].Title}', '${data[i].Desc}')">Edit</a>
             <a href="#" onclick="deleteTask(${data[i].id})">Delete</a>
             <img src="../assets/Images/Green_tick.svg.png" onclick="completeTask(${data[i].id})" width="20px" alt="" class="selectcom">
             <img src="../assets/Images/Red_X.svg.png" width="20px" class="notcomplete" alt="">
         </div>
     `;

     taskList.appendChild(taskWrapper);
     }
        


 }



 // This is Edit function we send a request to edit the task name an dtask description 
 function editTask(taskId, taskTitle, taskDescription) {
// Save task details to localStorage for later retrieval in the updateTask function
localStorage.setItem("TaskId", taskId);
localStorage.setItem("TaskName", taskTitle);
localStorage.setItem("TaskDescription", taskDescription);

// Set values in the edit form
document.getElementById("editTaskName").value = taskTitle;
document.getElementById("editTaskDescription").value = taskDescription;

// Show the edit form overlay
document.getElementById("editOverlay").style.display = "flex";
}

function updateTask() {
// Retrieve task details from localStorage
let localId = localStorage.getItem("TaskId");
let localTitle = document.getElementById("editTaskName").value;
let localDescription = document.getElementById("editTaskDescription").value;
let userId = localStorage.getItem("userId");

const updatedTask = {
 Title: localTitle,
 Desc: localDescription,
 UserId:userId,
 id: localId
};
JSON.stringify(localStorage.setItem("updatetask",updatedTask))
console.log(updatedTask)

// Fetch to update the task on the server
fetch(`http://localhost:8080/tasks/${localId}`, {
 method: 'PUT',
 headers: {
     'Content-Type': 'application/json',
 },
 body: JSON.stringify(updatedTask),
})
.then(res => {
 if (!res.ok) {
     throw new Error(`HTTP error! Status: ${res.status}`);
 } else {
     return res.json();
 }
})
.then(data => {
 console.log(data);
 // Close the edit form overlay after updating
 document.getElementById("editOverlay").style.display = "none";
})
.catch(error => {
 console.error('Error updating task:', error);
});
}

 // This function we delete a that task so we write a delete function

 function deleteTask(taskId) {
     event.preventDefault();

     // Send a request to the server to delete the task
     const delurl = `http://localhost:8080/tasks/${taskId}`
     const delrequest = {
         method: 'DELETE',
     }
     fetch(delurl, delrequest)
         .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! Status: ${response.status}`);
             }
             return response.json();


         })
         .then(() => {
             const rowToDelete = taskTable.querySelector(`[data-task-id="${taskId}"]`);
             rowToDelete.remove();
         })
         .catch(error => {
             alert('Error deleting task:', error);
         });
 }







 // logout paopup=================///

 document.getElementById('openPopupBtn').addEventListener('click', openPopup);

 function openPopup() {
     if (localStorage.getItem("userId") !== null) {
         document.getElementById('popup').style.display = 'flex';
     } else {
         alert("You should create a Account So Go to Sign-up page")
     }
 }

 function closePopup() {
     document.getElementById('popup').style.display = 'none';
 }

 // Editform popup -------------------->

 function closeEditPopup() {
     document.getElementById('editOverlay').style.display = 'none';
 }

 function openEditPopup() {
     document.getElementById('editOverlay').style.display = 'flex';
 }
 function logout() {
     localStorage.removeItem("userId")
     location.href = "./index.html";
 }
