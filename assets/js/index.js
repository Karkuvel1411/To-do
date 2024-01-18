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

        const userId = localStorage.getItem("userId");
        console.log(userId)
        console.log(data[0].date)

        // Filter data based on userId

        const userTasks = data.filter(task => task.UserId === userId);
        console.log("usertask ======>"+userTasks);

        tasklist(userTasks);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


function tasklist(data) {
    const taskList = document.getElementById('taskList');


    for (let i = 0; i < data.length; i++) {
        const taskWrapper = document.createElement('div');
        taskWrapper.classList.add('container');

        let statusCode = "";

        if(data[i].status == 1){
            statusCode = "Completed"
        }else if(data[i].status == 2){
            statusCode = "Hold"
        }else{
            statusCode = "Pending"
        }

        taskWrapper.innerHTML = `
     <ul class="responsive-table">
               
     <li class="table-row">
         <div class="col col-2" data-label="Task Name">${data[i].Title}</div>
         <div class="col col-1" data-label="Task Name">${data[i].Desc}</div>
         <div class="col col-2" data-label="Due Date"> ${data[i].date}</div>
         <div class="col col-3" data-label="Priorty"><span class="Pr-1">${statusCode}</span></div>
         <button class="edit-btn" onclick="editTask(${data[i].id}, '${data[i].Title}', '${data[i].Desc}','${data[i].Date}')">Edit</button>
         <button class="delete-btn" onclick="deleteTask(${data[i].id})">Delete</button>
         
         <img src="../assets/Images/Green_tick.svg.png"  onclick="completeTask(${data[i].id})" height="20px" width="20px" alt="" class="selectcom">
         <img src="../assets/Images/Red_X.svg.png" width="20px" id="holdnone" height="20px" onclick="holdTask(${data[i].id})"  class="notcomplete" alt="">
     </li>
 </ul>
     `;

        taskList.appendChild(taskWrapper);
    }

}



// This is Edit function we send a request to edit the task name an dtask description 
function editTask(taskId, taskTitle, taskDescription,taskdate) {
    console.log(taskdate);
    document.getElementById('editOverlay').style.display = 'flex';

    // Save task details to localStorage for later retrieval in the updateTask function
    localStorage.setItem("TaskId", taskId);
    localStorage.setItem("TaskName", taskTitle);
    localStorage.setItem("TaskDescription", taskDescription);
    localStorage.setItem("TaskDate", taskdate);


    // Set values in the edit form
    document.getElementById("editTaskName").value = taskTitle;
    document.getElementById("editTaskDescription").value = taskDescription;

    // Show the edit form overlay
    document.getElementById("editOverlay").style.display = "flex";
}

function updateTask() {
    // Retrieve task details from localStorage
    let localId = localStorage.getItem("TaskId");
    let date = localStorage.getItem("TaskDate");
    let localTitle = document.getElementById("editTaskName").value;
    let localDescription = document.getElementById("editTaskDescription").value;
    let userId = localStorage.getItem("userId");

    const updatedTask = {
        Title: localTitle,
        Desc: localDescription,
        UserId: userId,
        id: localId,
        Date: new Date(date).toLocaleDateString()
         
    };
    if (!localTitle.trim() && !localDescription.trim()) {
        alert("Title and Deacription Can not be empty")
     }else{
    JSON.stringify(localStorage.setItem("updatetask", updatedTask))
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
                console.log(res,json());
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
function completeTask(TaskComid) {
    document.getElementById("holdnone").style.display = 'none';
    // console.log(TaskComid);
    event.preventDefault();

    // Send a request to the server to delete the task
    const statusurl = `http://localhost:8080/tasks/${TaskComid}`;

    fetch(statusurl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Call finishtask with the retrieved data
            finishtask(data.id, data.Desc, data.Title, data.status=1, data.UserId);
        })
        .catch(error => {
            alert('Error deleting task:', error);
        });
}

function finishtask(finishtaskid, finishtaskdesc, finishtasktitle, finishtaskstatus, finishtaskuserid) {
    // e.preventDefault();
    let a = finishtaskid;
    let b = finishtaskdesc;
    let c = finishtasktitle;
    let d = finishtaskstatus;
    let e = finishtaskuserid;
    console.log(e, b, c, d, a);

    const updatedTask = {
        Title: c,
        Desc: b,
        UserId: e,
        id: a,
        status: d,
        Date: new Date().toLocaleDateString(), // Fixed the 'date' issue
    };

    console.log(updatedTask);

    fetch(`http://localhost:8080/tasks/${a}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Removed the unreachable console.log and added return statement
            return res.json();
        })
        .then(data => {
            console.log(data);

            // Close the edit form overlay after updating
            // document.getElementById("editOverlay").style.display = "none";
        })
        .catch(error => {
            console.error('Error updating task:', error);
        });
}

 
// Hold function Added

function holdTask(holdid) {
    // console.log(TaskComid);
    event.preventDefault();

    // Send a request to the server to delete the task
    const statusurl = `http://localhost:8080/tasks/${holdid}`;

    fetch(statusurl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Call finishtask with the retrieved data
            taskhold(data.id, data.Desc, data.Title, data.status=2, data.UserId);
        })
        .catch(error => {
            alert('Error deleting task:', error);
        });
}

function taskhold(holdtaskid, holdtaskdesc, holdtasktitle, holdtaskstatus, holdtaskuserid) {
    // e.preventDefault();
    let a = holdtaskid;
    let b = holdtaskdesc;
    let c = holdtasktitle;
    let d = holdtaskstatus;
    let e = holdtaskuserid;
    console.log(e, b, c, d, a);

    const updatedTask = {
        Title: c,
        Desc: b,
        UserId: e,
        id: a,
        status: d,
        Date: new Date().toLocaleDateString(), // Fixed the 'date' issue
    };

    console.log(updatedTask);

    fetch(`http://localhost:8080/tasks/${a}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Removed the unreachable console.log and added return statement
            return res.json();
        })
        .then(data => {
            console.log(data);

            // Close the edit form overlay after updating
            // document.getElementById("editOverlay").style.display = "none";
        })
        .catch(error => {
            console.error('Error updating task:', error);
        });
}






// logout paopup=================///

// document.getElementById('openPopupBtn').addEventListener('click', openPopup);

// function openPopup() {
//     if (localStorage.getItem("userId") !== null) {
//         document.getElementById('popup').style.display = 'flex';
//     } else {
//         alert("You should create a Account So Go to Sign-up page")
//     }
// }

// function closePopup() {
//     document.getElementById('popup').style.display = 'none';
// }

// Editform popup -------------------->

function closeEditPopup() {
    document.getElementById('editOverlay').style.display = 'none';
}


function logout() {
    localStorage.removeItem("userId")
    location.href = "./index.html";
}



