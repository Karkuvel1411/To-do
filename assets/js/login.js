function signin(event) {
    event.preventDefault();
    const email = document.getElementById("useremail").value;
    const password = document.getElementById("password").value;

    const url = 'http://localhost:8080/users';

    fetch(url)
        .then(res => res.json())
        .then(data => {
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
                location.href = "./index.html";
            } else {
                alert("Invalid email or password");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred. Please try again later.');
        });
}