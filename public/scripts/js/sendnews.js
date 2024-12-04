// Initialize Firebase (Firebase SDK 11.0.2 uses modular imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
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

// Get references to your form and button
const postForm = document.getElementById("post-form");
const postFormContainer = document.getElementById("post-form-container");

// Handle form submission
postForm.addEventListener("submit", function (event) {
  event.preventDefault();  // Prevent default form submission

  // Get the form values
  const headline = document.getElementById("headline").value;
  const photo = document.getElementById("photo").files[0]; // Assuming photo is uploaded as a file
  const date = document.getElementById("date").value;
  const content = document.getElementById("content").value;

  // Check if photo was uploaded
  if (!photo) {
    alert("Please upload a photo.");
    return;
  }

  // Convert the photo to a Base64 string (for uploading to Firebase Database)
  const reader = new FileReader();
  reader.onloadend = function () {
    const photoBase64 = reader.result;

    // Get a new key for each post
    const newPostRef = ref(database, "NEWS/" + Date.now()); // Unique key based on timestamp

    // Set the values into the Firebase Realtime Database
    set(newPostRef, {
      headline: headline,
      photo: photoBase64, // You can store the base64 data of the photo
      date: date,
      content: content,
    })
      .then(() => {
        alert("Post has been successfully added!");
        postForm.reset();
        
        // Update featured posts after a new post is added
        updateFeaturedPosts();
      })
      .catch((error) => {
        console.error("Error writing new post to Firebase Database: ", error);
      });
  };

  // Read the image file as Base64
  reader.readAsDataURL(photo);
});

// Fetch data for table and update the DOM
window.onload = loadNews;

// Function to load the news from Firebase and update the featured posts section
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
      const postedNewsTableBody = document.getElementById("post-table");
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

      // Update the featured posts section
      updateFeaturedPosts(newsArray);
    } else {
      console.log("No data available");
    }
  });
}

// Function to update the Featured Posts section with the latest 4 posts
function updateFeaturedPosts(newsArray = []) {
  // Default to fetching news if not passed as an argument
  if (newsArray.length === 0) {
    const newsRef = ref(database, "NEWS");
    get(newsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        newsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }
    });
  }

  // Sort the posts by date (latest first)
  newsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the latest 4 posts for the Featured Section
  const latestNews = newsArray.slice(0, 4);

  const featuredPostsContainer = document.querySelector(".posts-container");
  featuredPostsContainer.innerHTML = "";  // Clear existing posts
  
  latestNews.forEach((news) => {
    const postHTML = `
      <div class="post">
        <img src="${news.photo}" alt="${news.headline}">
        <div class="post-content">
          <h3>${news.headline}</h3>
          <p>${news.date} | ${news.content}</p>
          <a href="#" class="post-button">More</a>
        </div>
      </div>
    `;
    featuredPostsContainer.innerHTML += postHTML; // Append new post to container
  });
}
