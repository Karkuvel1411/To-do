 let otp_val;
        function signup(event) {

            let gmail = document.getElementById("gmail").value;
console.log(gmail+'jdijdijdf')
const pass = document.getElementById("password").value;
         
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
                Username: "malarraj@gmail.com",
                Password: "6101B16B9F0E2A6A2C720FC4550102DCE027",
                To: gmail,
                From: "malarraj712@gmail.com",
                Subject: "To-Do App Registration Conformation OTP",
                Body: emailbody
            }).then(
                message => {
                    alert("OTP sent to your email " + gmail);
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

                const url = 'https://to-do-app-olyr.onrender.com/users';

                event.preventDefault();

                let name = document.getElementById("name").value.trim();
                let email = document.getElementById("gmail").value.trim();
                let password = document.getElementById("password").value.trim();

                const userobj = {
                    email: email,
                    password: password,
                    name: name
                };
                console.log(userobj);
                const requestoption = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userobj)
                }
            
                fetch(url, requestoption).then(res => {
                    alert("Hi");
                    return res.json();
                })
                    .then(res => {
                        alert("Account Created Successfully");
                        location.reload();
                        

                    })
            }
            else {
                alert("Invalid OTP");
            }
        });