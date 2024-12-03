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
            <div class="news-container-item">
                <div class="news-image">
                    <img src="${news.photo}" alt="${news.headline}" />
                </div>
                <div class="news-content">
                    <h3 class="news-headline">${news.headline}</h3>
                    <p class="news-date"><strong>Date:</strong> ${news.date}</p>
                    <p class="news-text">${news.content}</p>
                </div>
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
