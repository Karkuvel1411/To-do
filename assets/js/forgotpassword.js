
function forpass(event) {
    event.preventDefault();

    document.getElementById('otpPopup').style.display = 'flex';
    let userid = localStorage.getItem("userId");
    console.log(userid);

    let email = document.getElementById("useremail").value;
    console.log(email)

    // Generating OTP and send user email

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
        Username: "murugan@gmail.com        ",
        Password: "BECBFCF18E9E2ED8DD8577D9AA0381924F29",
        To: email,
        From: "malarraj712@gmail.com",
        Subject: "To-Do App Registration Conformation OTP",
        Body: emailbody
    }).then(
        message => {
            alert("OTP sent to your email " + email);
        }
    );

}

document.getElementById('otp-btn').addEventListener('click', function () {
    document.getElementById("otpPopup").style.display = "flex";
    const otp_inp = document.getElementById('otp_inp');
    if (otp_inp.value == otp_val) {
        location.href = "../../Html_Pages/updatePassword.html";
    }
    else{
        alert("Invalid OTP")
    }



function closePopup() {
    document.getElementById("otpPopup").style.display = "none";
} });
