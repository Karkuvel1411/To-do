const { origin } = window.location;
const logo = `${origin}/To-do/index.html`;
// const wishlist = `${origin}/pages/orders/wishlistpage.html`;
// const orders = `${origin}/pages/orders/myorderspage.html`;
const profile = `${origin}/To-do/Html_Pages/profile.html`;
const sign_up = `${origin}/To-do/Html_Pages/signup.html`;
const login = `${origin}/To-do/Html_Pages/login.html`;
const tasklist = `${origin}/To-do/Html_Pages/ListTask.html`;



const after_login = `
    <nav>
        <a href="${logo}" class="logo">My App</a>
        <ul class="nav-links">
            <li><a href="${tasklist}">TaskList</a></li>
             <li><a href="${profile}">Profile</a></li>
            <li><a onclick="openPopup()" id="openPopupBtn">Logout</a></li>
        </ul>
    </nav>
`;



const before_login = `
<nav>
<a href="${logo}" class="logo">My App</a>
<ul class="nav-links">
    <li><a href="${sign_up}">Signup</a></li>
    <li><a href="${login}">Login</a></li>
</ul>
</nav>
`;
function header() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  console.log(userId)
  const UserLogin = document.getElementById("userLogin");

  if (!userId) {
    UserLogin.innerHTML = before_login;
  } else {
    UserLogin.innerHTML = after_login;
  }
}


header()
//    Log out popup


function openPopup() {
    if (localStorage.getItem("userId") !== null) {
        document.getElementById('popup').style.display = 'flex';
    } else {
        alert("You should create a Account So Go to Sign-up page")
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}




function logout() {
    localStorage.removeItem("userId")
    location.href = "./index.html";
}
