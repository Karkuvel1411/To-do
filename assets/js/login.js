const url = "https://to-do-app-olyr.onrender.com/";


function signin(event) {
    event.preventDefault();
    const email = document.getElementById("useremail").value;
    const password = document.getElementById("password").value;

    const users_url = `${url}users`;

    fetch(users_url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let found = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].email === email && data[i].password === password) {
                 localStorage.setItem('userId', data[i].id);
                    found = true;
                    break;
                }
            }

            if (found) {
                // localStorage.setItem('userId', user.id);
                alert("Successfully login");
                if(window.location.origin==="http://127.0.0.1:5501"){
                    location.href = `${window.location.origin}/To-do/index.html`;
                }else{
                    location.href = `${window.location.origin}/index.html`;

                }
                

            } else {
                alert("Invalid email or password");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred. Please try again later.');
        });
}

