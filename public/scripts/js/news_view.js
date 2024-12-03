// Initialize Firebase (Firebase SDK 11.0.2 uses modular imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration (replace with your actual Firebase project configuration)
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
    
///
// Fetch data for table and update the DOM
window.onload = loadNews;

// Function to load the news from Firebase
function loadNews() {
  const newsRef = ref(database, "NEWS");
  get(newsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const newsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      let html = "";
      let index = 1;
      newsArray.forEach((news) => {
        html += `
          <tr>
            <td>${index++}</td>
            <td>${news.headline}</td>
            <td>${news.date}</td>
            <td><button class="delete-btn" data-id="${news.id}">Delete</button></td>
          </tr>
        `;
      });

      // Insert HTML into the tbody with id "posted-news"
      const postedNewsTableBody = document.getElementById("table-post");
      postedNewsTableBody.innerHTML = html; // Update table body with news data

       // Delegate the click event for delete buttons to the table
       postedNewsTableBody.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("delete-btn")) {
          const postId = event.target.getAttribute("data-id");
          const postRef = ref(database, "NEWS/" + postId);

          // Delete the post from Firebase
          remove(postRef)
            .then(() => {
              event.target.closest("tr").remove(); // Remove the row from the table
              alert("Post deleted successfully");
            })
            .catch((error) => {
              console.error("Error deleting post from Firebase Database: ", error);
            });
        }
      });
    } else {
      console.log("No data available");
    }
  });
}