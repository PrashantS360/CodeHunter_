let contact = document.getElementById('cont');
contact.style.display = "none";

// Setting display of login and register buttons
let reg = document.getElementById('register');
let login = document.getElementById('login');
reg.style.display = "none";

// Local Storage
let lemail = localStorage.getItem("email");
let lpassword = localStorage.getItem("password");

// If user clicks on register here then the function register executes
let newuser = document.getElementById('signup');
newuser.addEventListener('click', function () {
    register();
});

function index(array, val) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == val) {
            return i;
        }
    }
    return -1;
}

// Displaying the register the page and saves Data to local storage
function register() {
    console.log("Register function is called");
    login.style.display = "none";
    reg.style.display = "block";
    let newuser = document.getElementById('signup');
    newuser.style.display = "none";
    let heading = document.getElementById('signinModalLabel');
    console.log(heading);
    heading.innerHTML = "<b>Register to CodeHunter</b>";
}

// Function to save data and log in user
function saveData() {
    let email = document.getElementById('floatingInput').value;
    let password = document.getElementById('floatingPassword').value;
    if (lemail == null) {
        emailObj = []
        passObj = []
    }
    else {
        emailObj = JSON.parse(lemail);
        passObj = JSON.parse(lpassword);
    }

    emailObj.push(email);
    passObj.push(password);
    console.log(emailObj, passObj);
    localStorage.setItem("email", JSON.stringify(emailObj));
    localStorage.setItem("password", JSON.stringify(passObj));
    localStorage.setItem("logged", "true");
    localStorage.setItem("username", "");
    signed();
}

// Function to check data while sign in (checks whether the user registers first or not)
function checkData() {
    let email = document.getElementById('floatingInput').value;
    let password = document.getElementById('floatingPassword').value;
    console.log(email, password);

    emailObj = JSON.parse(lemail);
    passObj = JSON.parse(lpassword);
    console.log(emailObj, passObj);

    if (emailObj.includes(email)) {
        if (passObj[index(emailObj, email)] == password) {
            localStorage.setItem("logged", "true");
            signed();
        }
        else {
            alert("Wrong password try again");
            localStorage.setItem("logged", "false");
        }
    }

    else {
        alert("It seems you are new to this site. Please register first");
        let signBtn = document.getElementById('sign');
        signBtn.innerText = "Register";
        register();
    }

}

// Function for signing in
function signin() {
    // console.log("Pressed Sign In button");

    if (lemail == null) {
        register();
    }
}

// Executes after user signed
function signed() {
    console.log("Hurray, you logged in successfully");

    let signin = document.getElementById('sign');
    contact.style.display = "block";
    signin.style.display = "none";

    profile();
}


function profile() {
    let user = document.getElementById("username").value;
    console.log(user);
    let setProfile = document.querySelector('form#setProfile');
    let updProfile = document.createElement('div');
    updProfile.setAttribute("class", "text-center");
    updProfile.innerHTML = `<b>${localStorage.getItem("detail")}</b>`;
    updProfile.setAttribute("style", "font-size : 1.5rem");
    setProfile.replaceWith(updProfile);
    if (localStorage.getItem("username") == "" || localStorage.getItem("username") == null) {
        localStorage.setItem("username", user);
        console.log(updProfile);
        updProfile.replaceWith(setProfile);
    }

}

let userInfo = document.getElementById("userInfo");

// Keep user logged in 
if (localStorage.getItem("logged") == "true") {
    signed();
    userInfo.style.display = "block";

    let userDet = document.getElementById("userDet");
    userDet.style.display = "none"
    document.getElementById("userImg").addEventListener('click', function () {
        if (userDet.style.display == "none") {
            userDet.style.display = "block";
        }
        else {
            userDet.style.display = "none";
        }
    });
}

else {
    userInfo.style.display = "none";
}

function signOut() {
    localStorage.setItem("logged", "false");
    location.reload();
}
