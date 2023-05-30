const baseUrl = "https://mock4jsonserver.up.railway.app";
const usersUrl = `${baseUrl}/users`;

const mainContainer = document.querySelector('#mainContainer');

// Login data
const loginButton = document.querySelector(".login");
const loginSection = document.querySelector(".loginSection");
const LoginSubmitButton = document.querySelector(".LoginButton");
const LoginEmail = document.querySelector('.LoginEmail');
const LoginPassword = document.querySelector('.LoginPass');
const backgroundChangeLogin = document.querySelector('.login');


// Signup data
const registerButton = document.querySelector(".register");
const registerSection = document.querySelector(".registerSection");
const RegisterSubmitButton = document.querySelector(".RegisterButton");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const isDoctor = document.querySelector(".isDoctor");

// Login Button or Signup Button
loginButton.addEventListener("click", () => {
  loginSection.style.display = "block";
  registerSection.style.display = "none";
  registerButton.style.background = "white";
  mainContainer.style.background = "#1e1212bf";
  backgroundChangeLogin.style.background="rgb(88 76 76 / 75%)"
});

registerButton.addEventListener("click", () => {
  loginSection.style.display = "none";
  registerSection.style.display = "block";
  registerButton.style.background = "rgb(88 76 76 / 75%)";
  backgroundChangeLogin.style.background="white"
});

// Register Section
RegisterSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    Username: username.value,
    Email: email.value,
    Password: password.value,
    DoctorCheck: isDoctor.checked,
  };

  if(username.value==""||Email.value==""||Password.value==""||DoctorCheck.value=="") return alert("Please enter your credentials");

  signUp(data);
});

const signUp = async (data) => {
  try {
    const apiResponse = await fetch(usersUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("registerd successful");
  } catch (error) {
    alert(error.message);
  }
};

// Login Section
LoginSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if(LoginEmail.value=="" || LoginPassword.value=="") return alert("Please enter your credentials first");

  LoginCheck();
});


const LoginCheck = async () => {
    try {
        const apiResponse = await fetch(usersUrl)
        const dataOfResponse = await apiResponse.json();
        isDataPresendt(dataOfResponse);
      } catch (error) {
        alert(error.message);
      }
}

const isDataPresendt = (usersData) => {
    let filterData = usersData.filter(el=>{
        return (el.Email== LoginEmail.value && el.Password == LoginPassword.value)
    });

    filterData.length > 0 ? (alert('login successful'),window.location.href="html/dashboard.html") : alert('login failed');
}
