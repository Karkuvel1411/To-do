const url = "https://to-do-app-olyr.onrender.com/tasks";

function addTask() {
    event.preventDefault();

    if (!isUserLoggedIn()) {
        alert("You are not logged in");
        return;
    }

    const taskData = getTaskInput();

    if (!taskData) {
        alert("Please fill in all fields.");
        return;
    }

    sendTaskToServer(taskData)
        .then(() => {
            alert('Task added');
            redirectToTaskList();
        })
        .catch(handleError);
}

function isUserLoggedIn() {
    return localStorage.getItem("userId") !== null;
}

function getTaskInput() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;
    const date = document.getElementById("cdate").value;
    const userId = localStorage.getItem("userId");

    if (!title || !description || !date) return null;

    return {
        Title: title,
        Desc: description,
        Date: date,
        UserId: userId,
        status: 0
    };
}

function sendTaskToServer(taskObj) {
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };

    return fetch(url, requestOption).then(res => res.json());
}

function redirectToTaskList() {
    location.href = `${window.location.origin}/To-do/Html_Pages/ListTask.html`;
}

function handleError(err) {
    console.error(err);
    alert('An error occurred. Please try again later.');
    location.reload();
}
