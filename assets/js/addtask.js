const url = "https://to-do-app-olyr.onrender.com/tasks";

function addTask() {
    event.preventDefault();

    // Check if the user is logged in
    if (localStorage.getItem("userId") !== null) {
        let title = document.getElementById('title').value;
        let description = document.getElementById('desc').value;
        let date = document.getElementById("cdate").value;
        
        let userid = localStorage.getItem("userId")
    

   

        const taskObj = {
            Title: title,
            Desc: description,
            Date: date,
            UserId:userid,
            status:0
        }

        const requestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObj)
        }

        fetch(`${url}`, requestOption)
            .then(res => res.json())
            .then(res => {
                alert('Task added');
                console.log("dfdfdfd");
                location.href = `${window.location.origin}/To-do/Html_Pages/ListTask.html`;
              console.log(res);
            })
            .catch(err => {
                console.log(err);
                alert('An error occurred. Please try again later.');
                location.reload();

            });
           
    } else {
        alert("You are not logged in");
    }
}