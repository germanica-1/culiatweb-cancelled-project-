import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUSuGNEMUMoPb8bUDa_-0wSKB1XPFsjPU",
  authDomain: "culiat-web.firebaseapp.com",
  databaseURL: "https://culiat-web-default-rtdb.firebaseio.com",
  projectId: "culiat-web",
  storageBucket: "culiat-web.appspot.com",
  messagingSenderId: "68213992257",
  appId: "1:68213992257:web:0a158e912e42863b798fc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// Function to load inquiries from Firebase and display in the table
window.onload = loadInquiries;

function loadInquiries() {
    console.log("loadInquiries triggered");
  
    const inquiriesRef = ref(database, "inquiries");
  
    // Fetch inquiries data from Firebase
    get(inquiriesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Fetched data from Firebase:", data); // Debugging log
  
          // Convert Firebase data to an array for easier handling
          const inquiriesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
  
          console.log("Inquiries Array:", inquiriesArray);  // Log the inquiries array
  
          let html = "";
          let index = 1;
  
          // Loop through the inquiries and generate table rows
          inquiriesArray.forEach((inquiry) => {
            html += `
              <tr>
                <td>${index++}</td>
                <td>${inquiry.name}</td>
                <td>${inquiry.Pnum}</td>
                <td>${inquiry.address}</td>
                <td>${inquiry.serviceRequested}</td>
                <td>
                  <button class="delete-btn" data-id="${inquiry.id}">Delete</button>
                </td>
              </tr>
            `;
          });
  
          // Insert the generated HTML into the table body with id "table-data"
          const inquiriesTableBody = document.getElementById("table-data");
          if (inquiriesTableBody) {
            inquiriesTableBody.innerHTML = html; // Update table body with inquiries data
          } else {
            console.error("Table body with id 'table-data' not found.");
          }
  
          // Delegate event listener for delete buttons
          inquiriesTableBody.addEventListener("click", function (event) {
            if (event.target && event.target.classList.contains("delete-btn")) {
              const inquiryId = event.target.getAttribute("data-id");
              const inquiryRef = ref(database, "inquiries/" + inquiryId);
  
              // Delete the inquiry from Firebase
              remove(inquiryRef)
                .then(() => {
                  event.target.closest("tr").remove(); // Remove the row from the table
                  alert("Inquiry deleted successfully");
                })
                .catch((error) => {
                  console.error("Error deleting inquiry: ", error);
                });
            }
          });
        } else {
          console.log("No inquiries available");
        }
      })
      .catch((error) => {
        console.error("Error fetching inquiries: ", error);
      });
}

// Form submission handler for adding inquiries
document.getElementById("form_inputs")?.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const Pnum = document.getElementById("num").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const date = document.getElementById("date").value;

  const data1 = document.getElementById("data1")?.files[0];  // Birth certificate file
  const data2 = document.getElement})