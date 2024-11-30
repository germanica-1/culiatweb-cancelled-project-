// server.js
const express = require("express");
const bodyParser = require("body-parser");

const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } = require("firebase/auth");

// Initialize Express.js
const app = express();
const PORT = 3000;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUSuGNEMUMoPb8bUDa_-0wSKB1XPFsjPU",
  authDomain: "culiat-web.firebaseapp.com",
  projectId: "culiat-web",
  storageBucket: "culiat-web.firebasestorage.app",
  messagingSenderId: "68213992257",
  appId: "1:68213992257:web:3d49201eca91b7fb798fc0",
};

initializeApp(firebaseConfig);

// Express Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/admin/login", (req, res) => {
  res.sendFile(__dirname + "/admin/login.html");
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Access firebase to login
  const auth = getAuth();
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in successfully
      res.redirect("/");
    })
    .catch((error) => {
      res.redirect("/admin/login");
    });
});

app.get("/api/admin/logout", (req, res) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        res.redirect("/");
    });
})

app.get("/admin", (req, res) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      res.sendFile(__dirname + "/admin/admin.html");
      // ...
    } else {
      // User is signed out
      res.redirect("/");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
