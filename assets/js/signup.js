const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        let otp_val;
        function signup(event) {
            if (pass == " ") {
                alert("Password can not be empty")
            }
            event.preventDefault();
            document.getElementById('otpPopup').style.display = 'flex';


            // Generating random number as OTP;
            otp_val = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

            console.log(otp_val);

            let emailbody = `
            <h1>Hi Buddy.....! I am Bot </h1> <br>
            <h2>Your OTP is </h2>
            <h1>${otp_val}</h1
        `;
            console.log(emailbody)

            Email.send({
                Host: "smtp.elasticemail.com",
                Username: "malarraj712@gmail.com",
                Password: "E31D09310F904B1C782C3139234E419C4B1F",
                To: email,
                From: "malarraj712@gmail.com",
                Subject: "TAAHA Registration Conformation OTP",
                Body: emailbody
            }).then(
                message => {
                    alert("OTP sent to your email " + email);
                }
            );
        }
        function closePopup() {
            document.getElementById("otpPopup").style.display = "none";
        }

        document.getElementById('otp-btn').addEventListener('click', function () {
            document.getElementById("otpPopup").style.display = "flex";
            const otp_inp = document.getElementById('otp_inp');
            if (otp_inp.value == otp_val) {

                const url = 'http://localhost:8080/users';

                event.preventDefault();

                let name = document.getElementById("name").value.trim();
                let email = document.getElementById("email").value.trim();
                let password = document.getElementById("password").value.trim();
                let phone = document.getElementById("phone").value.trim();

                const userobj = {
                    email: email,
                    password: password,
                    name: name,
                    phonenumber: phone
                };
                console.log(userobj);
                fetch(url).then(res => {
                    return res.json()
                })
                    .then(res => {
                        console.log(res)
                    })

                const requestoption = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userobj)
                }
                fetch(url, requestoption).then(res => {
                    return res.json();
                })
                    .then(res => {
                        alert("Account Created Successfully");
                    })
                alert("Email address verified...");
            }
            else {
                alert("Invalid OTP");
            }
        });