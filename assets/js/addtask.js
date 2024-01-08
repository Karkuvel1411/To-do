function addTask() {
    event.preventDefault();

    // Check if the user is logged in
    if (localStorage.getItem("userId") !== null) {
        let title = document.getElementById('title').value;
        let description = document.getElementById('desc').value;
        let userid = localStorage.getItem("userId")
        var date = new Date();
        var n = date.toDateString();
        var time = date.toLocaleTimeString();

        console.log('date:', n);
        console.log('time:', time);

        const taskObj = {
            Title: title,
            Desc: description,
            date: n,
            UserId:userid
        }

        const requestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObj)
        }

        fetch('http://localhost:8080/tasks', requestOption)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                alert('Task added');
            })
            .catch(err => {
                console.log(err);
                alert('An error occurred. Please try again later.');
            });
    } else {
        alert("You are not logged in");
    }
}