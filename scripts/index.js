const baseUrl = "https://mock4jsonserver.up.railway.app";
const usersUrl = `${baseUrl}/users`;

// Login data
const loginButton = document.querySelector(".login");
const loginSection = document.querySelector(".loginSection");
const LoginSubmitButton = document.querySelector(".LoginButton");
const LoginEmail = document.querySelector('.LoginEmail');
const LoginPassword = document.querySelector('.LoginPass');

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
});

registerButton.addEventListener("click", () => {
  loginSection.style.display = "none";
  registerSection.style.display = "block";
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
