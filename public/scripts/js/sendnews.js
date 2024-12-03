// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDUSuGNEMUMoPb8bUDa_-0wSKB1XPFsjPU",
    authDomain: "culiat-web.firebaseapp.com",
    databaseURL: "https://culiat-web-default-rtdb.firebaseio.com",
    projectId: "culiat-web",
    storageBucket: "culiat-web.appspot.com",
    messagingSenderId: "68213992257",
    appId: "1:68213992257:web:3d49201eca91b7fb798fc0"
  };
  
  // Initialize Firebase App and Database
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // Gather input data
  function Ready() {
    // Declare variables
    let headline = document.getElementById('headline').value;
    let photo = document.getElementById('photo').value;
    let date = document.getElementById('date').value;
    let news_content = document.getElementById('content').value;
  
    return { headline, photo, date, news_content };
  }
  
  // Post data to Firebase Realtime Database
  document.getElementById('post-button').onclick = function () {
    const { headline, photo, date, news_content } = Ready();
    if (headline && photo && date && news_content) {
      db.ref('news/' + headline).set({
        Headline: headline,
        Photo: photo,
        Date: date,
        Content: news_content
      })
      .then(() => alert('News posted successfully!'))
      .catch((error) => alert('Error posting news: ' + error.message));
    } else {
      alert("Please fill out all fields!");
    }
  };
  