// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUSuGNEMUMoPb8bUDa_-0wSKB1XPFsjPU",
  authDomain: "culiat-web.firebaseapp.com",
  databaseURL: "https://culiat-web-default-rtdb.firebaseio.com",
  projectId: "culiat-web",
  storageBucket: "culiat-web.firebasestorage.app",
  messagingSenderId: "68213992257",
  appId: "1:68213992257:web:0a158e912e42863b798fc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fetch news data from Firebase
function loadNews() {
  const newsRef = ref(database, "NEWS");
  get(newsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // Generate HTML for the news items
        let newsHTML = "";
        newsArray.forEach((news) => {
          newsHTML += `
            <div class="news-item">
                <h3>${news.headline}</h3>
                <p><strong>Date:</strong> ${news.date}</p>
                <p>${news.content}</p>
                <img src="${news.photo}" alt="News Image" />
            </div>
          `;
        });

        // Insert news into the news container
        document.getElementById("news-container").innerHTML = newsHTML;
      } else {
        console.log("No news found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching news: ", error);
    });
}

// Load news when the page is loaded
window.onload = loadNews;
