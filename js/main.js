const firebaseConfig = {
  apiKey: "AIzaSyC3dvkW-3ldMsXXUP5j9RRgtb32g7DjtnU",
  authDomain: "pikadu-3551a.firebaseapp.com",
  projectId: "pikadu-3551a",
  storageBucket: "pikadu-3551a.appspot.com",
  messagingSenderId: "79582248945",
  appId: "1:79582248945:web:99a88d521735cb4c31ce50",
};

firebase.initializeApp(firebaseConfig);

let menuToggle = document.querySelector("#menu-toogle");
let menu = document.querySelector(".sidebar");

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;
const loginElem = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".login-email");
const passInput = document.querySelector(".login-pass");
const loginSignup = document.querySelector(".signup");
const userElem = document.querySelector(".user");
const userNameElem = document.querySelector(".user-name");
const exitElem = document.querySelector(".exit");
const editElim = document.querySelector(".edit");
const editContainer = document.querySelector(".edit-container");
const editUsername = document.querySelector(".edit-username");
const editPhotoUrl = document.querySelector(".edit-photo");
const userAvatarElem = document.querySelector(".user-avatar");
const postWrapper = document.querySelector(".posts");
const buttonNewPost = document.querySelector(".button-new-post");
const addPost = document.querySelector(".add-post");
const loginForget = document.querySelector(".login-forget");
const defaultAvatar =
  "https://www.meme-arsenal.com/memes/8fad74f2d563151e2be1fbc3b3aea87e.jpg";

// const listUsers = [
//   {
//     id: "01",
//     email: "ona@mial.ru",
//     password: "12345678",
//     displayName: "Jon",
//   },
//   {
//     id: "02",
//     email: "julia@mial.ru",
//     password: "87654321",
//     displayName: "Julia",
//   },
// ];

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) handler();
    });
  },
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert("Введите коректный Email");
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          console.log(errorMessage);
          alert("Неверный пароль");
        } else if (errorCode === "auth/user-not-found") {
          console.log(errorCode);
          alert("Пользователь не найден");
        } else {
          alert(errorMessage);
        }
      });

    // const user = this.getUser(email);
    // if (user && user.password === password) {
    //   this.authorizedUser(user);
    //   handler();
    // } else {
    //   alert("Пользватель с такими данными не найден !");
    // }
  },
  logOut(handler) {
    firebase.auth().signOut();
    
    // this.user = null;
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert("Введите коректный Email");
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert("Введите данные");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.editUser(this.displayName(email), defaultAvatar, handler);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/weak-password") {
          console.log(errorMessage);
          alert("Слабый пароль (должен быть длинне 6-ти символов)");
        } else if (errorCode === "auth/email-already-in-use") {
          console.log(errorCode);
          alert("Этот email уже используется");
        } else {
          alert(errorMessage);
        }
      });

    // if (!this.getUser(email)) {
    //   const user = { email, password, displayName: this.displayName(email), photo: "https://www.meme-arsenal.com/memes/8fad74f2d563151e2be1fbc3b3aea87e.jpg" };
    //   listUsers.push(user);
    //   this.authorizedUser(user);
    //   handler();
    // } else {
    //   alert("Пользоваткль с таким email уже существует !");
    // }
  },

  editUser(userName, userPhoto, handler) {
    const user = firebase.auth().currentUser;

    if (userName) {
      if (userPhoto) {
        user
          .updateProfile({
            displayName: userName,
            photoURL: userPhoto,
          })
          .then(handler);
      } else {
        user
          .updateProfile({
            displayName: userName,
          })
          .then(handler);
      }
    }
    // if (userName) {
    //   this.user.displayName = userName;
    // }

    // if (userPhoto) {
    //   this.user.photo = userPhoto;
    //   setPosts.allPosts.forEach(item=>{
    //     if(this.user.displayName==item.author.displayName){
    //       item.author.photo=userPhoto
    //     }
    //   });
    //   showAllPosts();

    // }

    //  handler();
  },

  // getUser(email) {
  //   return listUsers.find((item) => item.email === email);
  // },
  // authorizedUser(user) {
  //   this.user = user;
  // },
  displayName(email) {
    return email.split("@")[0];
  },
  sendForget(email) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Письио отправлено");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const setPosts = {
  // allPosts: [
  //   {
  //     title: "Заголовок поста",
  //     text:
  //       "Таким образом укрепление и развитие структуры требуют от нас анализа форм развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа позиций,занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же консультация с широким активом способствует подготовки и реализации новых предложений. Равным образом новая модель организационной деятельности позволяет оценить значение модели развития.",
  //     tags: ["свежее", "горячее", "мое", "случайность"],
  //     author: { displayName: "ona", photo: "img/avatar.jfif" },
  //     date: "11.11.2020, 19:34:00",
  //     like: 12,
  //     coments: 5,
  //   },
  //   {
  //     title: "Заголовок поста 2",
  //     text:
  //       "Таким образом укрепление и развитие структуры требуют от нас анализа форм развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа позиций,занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же консультация с широким активом способствует подготовки и реализации новых предложений. Равным образом новая модель организационной деятельности позволяет оценить значение модели развития.",
  //     tags: ["свежее", "мое", "случайность"],
  //     author: { displayName: "makira", photo: "img/аватар2.jpg" },
  //     date: "5.7.2020, 19:34:00",
  //     like: 223,
  //     coments: 51,
  //   },
  // ],

  allPosts: [],

  addPost(title, text, tags, handler) {
    const user = firebase.auth().currentUser;

    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title: title,
      text: text,
      tags: tags.split(",").map((item) => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL,
      },
      date: new Date().toLocaleString(),
      like: 0,
      coments: 0,
    });
    firebase
      .database()
      .ref("post")
      .set(this.allPosts)
      .then(() => {
        this.getPosts(handler);
      });
  },
  getPosts(handler) {
    firebase
      .database()
      .ref("post")
      .on("value", (snapshot) => {
        this.allPosts = snapshot.val() || [];
        handler();
      });
  },
};

const toogleAuthDom = () => {
  const user = setUsers.user;
  console.log("user: ", user);

  if (user) {
    loginElem.style.display = "none";
    userElem.style.display = "";
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || defaultAvatar;
    buttonNewPost.classList.add("visible");
  } else {
    loginElem.style.display = "";
    userElem.style.display = "none";
    buttonNewPost.classList.remove("visible");
    addPost.classList.remove("visible");
    postWrapper.classList.add("visible");
  }
};

const showAddPost = () => {
  addPost.classList.add("visible");
  postWrapper.classList.remove("visible");
};

const showAllPosts = () => {
  addPost.classList.remove("visible");
  postWrapper.classList.add("visible");

  let postsHTML = "";
  setPosts.allPosts.forEach(
    ({ title, text, tags, author, date, like, coments }) => {
      postsHTML += `
    <section class="post">
          <div class="post-body">
            <h2 class="post-title">${title}</h2>
            <p class="post-text">
              ${text}
            </p>
            <div class="tags">
            ${tags.map(
              (tag) => `<a href="#" class="tag">#${tag}</a>`
            )}             
            </div>
          </div>
          <div class="post-footer">
            <div class="post-buttons">
              <button class="post-button likes">
                <svg width="19" height="20" class="icon icon-like">
                  <use xlink:href="img/icons.svg#Like"></use>
                </svg>
                <span class="likes-counter">${like}</span>
              </button>
              <button class="post-button coments">
                <svg width="21" height="21" class="icon icon-coment">
                  <use xlink:href="img/icons.svg#Coment"></use>
                </svg>
                <span class="coments-counter">${coments}</span>
              </button>
              <button class="post-button save">
                <svg width="19" height="19" class="icon icon-save">
                  <use xlink:href="img/icons.svg#Save"></use>
                </svg>
              </button>
              <button class="post-button share">
                <svg width="17" height="19" class="icon icon-share">
                  <use xlink:href="img/icons.svg#Share"></use>
                </svg>
              </button>
            </div>
            <div class="post-author">
              <div class="author-about">
                <a href="" class="author-username">${author.displayName}</a>
                <span class="post-time">${date}</span>
              </div>
              <a href="#" class="author-link"
                ><img src=${
                  author.photo || "img/avatar.jfif"
                }  alt="avatar" class="author-avatar"
              /></a>
            </div>
          </div>
        </section>
    `;
    }
  );

  postWrapper.innerHTML = postsHTML;
};

const init = () => {
  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    menu.classList.toggle("visible");
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passInput.value, toogleAuthDom);
    loginForm.reset();
  });

  loginSignup.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passInput.value, toogleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.logOut(toogleAuthDom);
  });

  editElim.addEventListener("click", (event) => {
    event.preventDefault();
    editContainer.classList.toggle("visible");
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoUrl.value, toogleAuthDom);
    editContainer.classList.remove("visible");
  });

  buttonNewPost.addEventListener("click", (event) => {
    event.preventDefault();
    showAddPost();
  });

  addPost.addEventListener("submit", (event) => {
    event.preventDefault();
    const { title, tags, text } = addPost.elements;

    if (title.value.length <= 0) {
      alert("Введите заголовок");
      return;
    }

    if (text.value.length <= 0) {
      alert("Введите текст");
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPost.classList.remove("visible");
    addPost.reset();
  });

  loginForget.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = "";
  });

  setUsers.initUser(toogleAuthDom);
  setPosts.getPosts(showAllPosts);
};

document.addEventListener("DOMContentLoaded", init);
