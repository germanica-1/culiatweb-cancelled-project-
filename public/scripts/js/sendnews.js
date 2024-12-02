// Firebase Imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "https://culiat-web-default-rtdb.firebaseio.com";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://culiat-web-default-rtdb.firebaseio.com";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUSuGNEMUMoPb8bUDa_-0wSKB1XPFsjPU",
    authDomain: "culiat-web.firebaseapp.com",
    databaseURL: "https://culiat-web-default-rtdb.firebaseio.com",
    projectId: "culiat-web",
    storageBucket: "culiat-web.firebasestorage.app",
    messagingSenderId: "68213992257",
    appId: "1:68213992257:web:3d49201eca91b7fb798fc0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// DOM Elements
const form = document.getElementById("post-form");      
const postFormContainer = document.getElementById("post-form-container");

// Add News Data
async function AddNewsData() {
    const headline = document.getElementById("headline").value.trim();
    const date = document.getElementById("date").value.trim();
    const newsContent = document.getElementById("news-content").value.trim();
    const photoInput = document.getElementById("photo");

    if (!headline || !date || !newsContent || !photoInput.files[0]) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const uniqueKey = Date.now().toString();
        const file = photoInput.files[0];
        const storagePath = `news_photos/${uniqueKey}_${file.name}`;
        const fileRef = storageRef(storage, storagePath);

        // Show a loader (optional)
        const loader = document.createElement("div");
        loader.textContent = "Uploading...";
        document.body.appendChild(loader);

        // Upload photo to Firebase Storage
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        // Save data to Firebase Database
        await set(ref(db, 'newsinfo/' + uniqueKey), {
            headline,
            date,
            news: newsContent,
            photo: photoURL
        });

        alert("News post successfully added!");
        form.reset();
        postFormContainer.style.display = "none";
    } catch (error) {
        console.error("Error adding news post:", error);
        alert("Error adding news post. Please try again.");
    } finally {
        // Remove loader
        if (loader) document.body.removeChild(loader);
    }
}

// Event Listener for Form Submission
form.addEventListener("submit", function (e) {
    e.preventDefault();
    AddNewsData();
});
