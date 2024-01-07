function closePopup() {
    document.getElementById('otpPopup').style.display = 'none';
}
let otp_val;
function signup(event) {
    event.preventDefault();
    document.getElementById('otpPopup').style.display = 'flex';

    const email = document.getElementById("email").value;

    // Generating random number as OTP;
   otp_val = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    console.log(otp_val);

    let emailbody = `
        <h1>Please Subscribe to Ash_is_Coding</h1> <br>
        <h2>Your OTP is </h2>${otp_val}
    `;
    console.log(emailbody)

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "malarraj712@gmail.com",
        Password: "E31D09310F904B1C782C3139234E419C4B1F",
        To: email,
        From: "malarraj712@gmail.com",
        Subject: "This is from Ash_is_Coding, Please Subscribe",
        Body: emailbody
    }).then(
        message => {
            alert("OTP sent to your email " + email);
        }
    );
}

// Event listener for OTP verification button
document.getElementById('otp-btn').addEventListener('click', function () {
    const otp_inp = document.getElementById('otp_inp');
    
    if (otp_inp.value == otp_val) {
        alert("Email address verified...");
    } else {
        alert("Invalid OTP");
    }
});


