let menuToggle = document.querySelector("#menu-toogle");
let menu = document.querySelector(".sidebar");

menuToggle.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.toggle("visible");
});

// еще кода

const loginElem = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".login-email");
const passInput = document.querySelector(".login-pass");
const loginSignup = document.querySelector(".signup");

const userElem = document.querySelector(".user");
const userNameElem = document.querySelector(".user-name");

const listUsers = [
  {
    id: "01",
    email: "ona@mial.ru",
    password: "12345678",
    displayName: "Jon",
  },
  {
    id: "02",
    email: "julia@mial.ru",
    password: "87654321",
    displayName: "Julia",
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {  
    const user = this.getUser(email);  
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert("Пользватель с такими данными не найден !");
    }
  },
  logOut() {
    console.log("Выход");
  },
  signUp(email, password, handler) {
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email };
      listUsers.push(user);
      this.authorizedUser(user);
      console.log(listUsers)
      handler();
    } else {
      alert("Пользоваткль с таким email уже существует !");
    }
  },
  getUser(email) {   
    return listUsers.find((item) => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  },
};

const toogleAuthDom = () => {
  const user = setUsers.user; 

  if (user) {
    loginElem.style.display = "none";
    userElem.style.display = "";
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = "";
    userElem.style.display = "none";
  }
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passInput.value, toogleAuthDom);
});

loginSignup.addEventListener("click", (event) => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passInput.value, toogleAuthDom);  
});

toogleAuthDom();
