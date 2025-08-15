let userData = JSON.parse(localStorage.getItem('userData')) ||  [
    
    { username: "Rihansh123", password: "Reset123@", emailId: "rihansh@example.com" },
    { username: "JohnDoe", password: "Pass@123", emailId: "john.doe@example.com" },
    { username: "JaneDoe", password: "Hello123", emailId: "jane.doe@example.com" }
];


const login=document.querySelector(".button");
const user_box=document.querySelector("#input-user");
const pass_box=document.querySelector("#input-password");

const loginReload =()=>{
    if(localStorage.getItem("login_Status")==='logged-in'){
        
        document.querySelector(".main").classList.remove("hidden");
        document.querySelector(".login").classList.add("hidden");
        
        document.title = "DashBoard";

    }else if(localStorage.getItem("login_Status")=='signing-up'){
        document.querySelector(".login").classList.add("hidden");
        document.querySelector(".sign-up").classList.remove("hidden");
        
        document.title = "Sign-Up";
    }else if(localStorage.getItem("login_Status")==='forget'){
        document.querySelector(".pass-form").classList.remove("hidden");
        document.querySelector(".login").classList.add("hidden");
        document.title = "Forget Password";
    }
}


loginReload();

login.addEventListener("click",() =>{
    authentication();
});

pass_box.addEventListener("keydown",(e) =>{
    if(e.key==="Enter"){
        authentication();
    }
});

function authentication(){

    if(user_box.value.trim()===""){
        alert("Enter your username");
    }else if(pass_box.value.trim()===""){
        alert("Enter your password");
    }else {
        const user=userData.find(u=> u.username===user_box.value && u.password===pass_box.value);

        if(user){
            localStorage.setItem("login_Status",'logged-in');
            document.querySelector(".login").classList.add("hidden");
            document.querySelector(".main").classList.remove("hidden");
            
            user_box.value="";
            pass_box.value="";
            document.title="Dashboard";
        }else{
            document.querySelector(".incorrect").classList.remove("hidden");
        }
    }
    
}

const logout=document.querySelector(".logout");

logout.addEventListener("click", ()=>{
    document.querySelector(".login").classList.remove("hidden");
    document.querySelector(".main").classList.add("hidden");
    document.title = "Login";
    localStorage.setItem("login_Status",'logged-out');
});

const linkLogin=document.querySelector(".linkLogin");
linkLogin.addEventListener("click",()=>{

    document.querySelector(".login").classList.remove("hidden");
    document.querySelector(".sign-up").classList.add("hidden");
    document.title = "Login";
    localStorage.setItem("login_Status",'logging-in');

});

const linkSignUp=document.querySelector(".Register");
linkSignUp.addEventListener("click",()=>{

    document.querySelector(".login").classList.add("hidden");
    document.querySelector(".sign-up").classList.remove("hidden");
    document.title = "Sign-Up";
    localStorage.setItem("login_Status",'signing-up');

});

const firstName=document.getElementById("firstName");
const lastName=document.getElementById("lastName");
const email=document.getElementById("input-email");
const inputUser=document.getElementById("input-username");
const password=document.getElementById("input-pass");
const confirmPassword=document.getElementById("input-confirmpass");
const terms=document.getElementById("terms");

function addUser(username,password,emailId){
    const newUser={username, password,emailId};
    userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(userData));
}

document.querySelector(".sign-up-button").addEventListener("click",() =>{

     if(firstName.value.trim()==="" ||lastName.value.trim()===""||email.value.trim()===""||password.value.trim()===""||confirmPassword.value.trim()===""||inputUser.value.trim()===""|| !terms.checked ){
        document.querySelector(".incorrect-signup").classList.remove("hidden");
        document.querySelector(".incorrect-signup").innerHTML="Enter all the fields and Agree to Terms & Conditions";
     }else if(password.value.trim()!==confirmPassword.value.trim()){
        document.querySelector(".incorrect-signup").classList.remove("hidden");
        document.querySelector(".incorrect-signup").innerHTML="Password doesn't match Confirm Password";
     }else{
        addUser(inputUser.value.trim(),password.value.trim(),email.value.trim());
        alert("User Added Succesfully");
        
        document.querySelector(".login").classList.remove("hidden");
        document.querySelector(".sign-up").classList.add("hidden");
        document.title = "Login";
        localStorage.setItem("login_Status","logging-in");
        location.reload();
     }
});



document.querySelector(".change-password").addEventListener("click", () =>{
    
    let userName=document.querySelector("#Userf").value.trim();
    let emailID=document.getElementById("emailf").value.trim();
    let passWord=document.getElementById("newPass").value.trim();
    let confirmpassWord=document.getElementById("newConfirmPass").value.trim();
    let errormsg =document.querySelector(".incorrect-forget");
        
    
    if(!userName|| !emailID|| !passWord|| !confirmpassWord){
        errormsg.classList.remove("hidden");
        errormsg.innerHTML="Please enter all the fields.";
        passWord="";
        confirmpassWord="";
        return;
    }

    if(confirmpassWord!==passWord){
        errormsg.classList.remove("hidden");
        errormsg.innerHTML="Password and Confirm Password doesn't match";
        passWord="";
        confirmpassWord="";
        return;
    }
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
    const userIndex=storedUserData.findIndex(ue=>ue.username==userName  && ue.emailId==emailID);
    if(userIndex<0){
        errormsg.classList.remove("hidden");
        errormsg.innerHTML="User Doesn't exist";
        console.log("Stored user data: ", storedUserData)
        
    }
    else{
        storedUserData[userIndex].password=passWord;
        localStorage.setItem('userData', JSON.stringify(storedUserData));
        errormsg.classList.remove("hidden");
        errormsg.innerHTML="Password Changed Successfully";
        userName="";
        emailID="";
        passWord="";
        confirmpassWord="";

        document.querySelector(".login").classList.remove("hidden");
        document.querySelector(".pass-form").classList.add("hidden");
        document.title = "Login";
        localStorage.setItem("login_Status",'logging-in');
        return;

    }
});

document.querySelector(".BtoLogin").addEventListener("click",() =>{
    document.querySelector(".login").classList.remove("hidden");
    document.querySelector(".pass-form").classList.add("hidden");
    document.title = "Login";
    localStorage.setItem("login_Status",'logging-in');
});

document.querySelector(".forget").addEventListener("click",() =>{
    document.querySelector(".pass-form").classList.remove("hidden");
    document.querySelector(".login").classList.add("hidden");
    document.title = "Forget Password";
    localStorage.setItem("login_Status",'forget');
});




