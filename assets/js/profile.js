const url = 'https://to-do-app-olyr.onrender.com/users';

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let currentuser;
        let usermail, username, usernumber; 

        const userId = localStorage.getItem("userId");
        console.log(userId)
        for (let i = 0; i < data.length; i++) {
            if (userId == data[i].id) {
                usermail = data[i].email;
                username = data[i].name;
                usernumber = data[i].phonenumber;
                currentuser = data[i]; 
                break; 
            }
        }

        console.log("User Email:", usermail);
        console.log("User Name:", username);
        console.log("User Phone Number:", usernumber);
        console.log("Current User:", currentuser);
        document.getElementById("name").value=usermail;
       document.getElementById("email").value= username;
       document.getElementById("number").value=usernumber;
       location.reload();


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



