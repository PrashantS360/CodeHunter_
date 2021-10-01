let contact = document.getElementById('cont');
contact.style.display = "none";

// Setting display of login and register buttons
let reg = document.getElementById('register');
let login = document.getElementById('login');
reg.style.display = "none";

// Local Storage
let detail = localStorage.getItem("detail");

// If user clicks on register here then the function register executes
let newuser = document.getElementById('signup');
newuser.addEventListener('click', function(){
    register();
});

function index(array, val){
    for (let i=0; i<array.length; i++){
        if (array[i]==val){
            return i;
        }
    }
    return -1;
}

// Displaying the register the page and saves Data to local storage
function register(){
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
function saveData(){
    let email = document.getElementById('floatingInput').value;
    let password = document.getElementById('floatingPassword').value;
    if (detail==null){
        detailObj = []
    }
    else{
        detailObj = JSON.parse(detail);
    }

    let myObj = {
        email: email,
        password: password,
        username:""
    }
    detailObj.push(myObj);
    localStorage.setItem("detail", JSON.stringify(detailObj));
    localStorage.setItem("logged", "true");
    localStorage.setItem("index", detailObj.length-1);
    signed();
}

function matchDetail(inpEmail, obj){
    let ansObj = {
        value: false,
        ind: null,
        username:""
    }
    Array.from(obj).forEach(function(element,index) {
        if (element.email == inpEmail){
            ansObj.value = true;
            ansObj.ind = index;
            ansObj.username = obj[index].username;
        }
    });
    return ansObj;
}

// Function to check data while sign in (checks whether the user registers first or not)
function checkData(){
    let email = document.getElementById('floatingInput').value;
    let password = document.getElementById('floatingPassword').value;
    // console.log(email,password);
    
    let detailObj = JSON.parse(detail);
    // console.log(emailObj, passObj);

    let matchedDet = matchDetail(email, detailObj);
    if (matchedDet.value){
        if(detailObj[matchedDet.ind].password==password){
            console.log("Detail verified successfully");
            localStorage.setItem("logged", "true");
            localStorage.setItem("index", matchedDet.ind);
            signed();
        }
        else{
            alert("Wrong password try again");
            localStorage.setItem("logged", "false");
        }
    }
    else{
        alert("It seems you are new to this site. Please register first");
        let signBtn = document.getElementById('sign');
        signBtn.innerText = "Register";
        register();
    }
}

// Function for signing in
function signin(){
    // console.log("Pressed Sign In button");
    localStorage.setItem("logged", "true");
    if (localStorage.getItem("detail")==null){
        alert('Register first');
        let signBtn = document.getElementById('sign');
        signBtn.innerText = "Register";
        register();
    }
} 

// Executes after user signed
function signed(){
    console.log("Hurray, you logged in successfully");
    let signin = document.getElementById('sign');
    contact.style.display = "block";
    signin.style.display = "none";
    
    // User Details
    if (updName!=""){
        let setProfile = document.querySelector('form#setProfile');
        let updProfile = document.createElement('div');
        updProfile.setAttribute("class","text-center");
        updProfile.innerHTML = `<b>${updName}</b>`;
        updProfile.setAttribute("style", "font-size : 1.3rem");
        setProfile.replaceWith(updProfile);
    }
}


let updName = JSON.parse(detail)[localStorage.getItem("index")].username;
function profile(){
    let user = document.getElementById("username").value;
    console.log(user);

    let setProfile = document.querySelector('form#setProfile');
    let updProfile = document.createElement('div');
    // console.log(Loguserindex);
    updName = user;
    
    if (updName!=""){
        let detailObj = JSON.parse(detail);
        detailObj[localStorage.getItem("index")].username = user;
        localStorage.setItem("detail", JSON.stringify(detailObj));
        console.log(detailObj);
        updProfile.setAttribute("class","text-center");
        updProfile.innerHTML = `<b>${updName}</b>`;
        updProfile.setAttribute("style", "font-size : 1.5rem");
        setProfile.replaceWith(updProfile);
    }
}

let userInfo = document.getElementById("userInfo");

// 
if (localStorage.getItem("logged")=="true"){
    signed(); 
    userInfo.style.display = "block";
    
    let userDet = document.getElementById("userDet");
    userDet.style.display="none"
    document.getElementById("userImg").addEventListener('click', function(){
        if (userDet.style.display=="none"){
            userDet.style.display="block";
            // userDet.style.transition = "display 2s ease-in-out 2s";
        }
        else{
            userDet.style.display="none";
        }
    });
}

else{
    userInfo.style.display = "none";
}

function signOut(){
    localStorage.setItem("logged", "false");
    location.reload();
}
