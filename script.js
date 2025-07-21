function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Handle Need Form
document.getElementById("needForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const request = {
    name: document.getElementById("needName").value,
    contact: document.getElementById("needContact").value,
    location: document.getElementById("needLocation").value,
    details: document.getElementById("needDetails").value,
    showContact: document.getElementById("needConsent").checked
  };

  const needs = JSON.parse(localStorage.getItem("needs") || "[]");
  needs.push(request);
  localStorage.setItem("needs", JSON.stringify(needs));
  alert("Request submitted!");
  this.reset();
  showListings();
});

// Handle Donate Form with Image Upload
let base64Image = "";
document.getElementById("photo").addEventListener("change", function () {
  const reader = new FileReader();
  reader.onloadend = () => {
    base64Image = reader.result;
    document.getElementById("preview").src = base64Image;
    document.getElementById("preview").style.display = "block";
  };
  if (this.files[0]) reader.readAsDataURL(this.files[0]);
});

document.getElementById("donateForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const donation = {
    name: document.getElementById("donateName").value,
    contact: document.getElementById("donateContact").value,
    location: document.getElementById("donateLocation").value,
    details: document.getElementById("donateDetails").value,
    photo: base64Image,
    showContact: document.getElementById("donateConsent").checked
  };

  const donors = JSON.parse(localStorage.getItem("donors") || "[]");
  donors.push(donation);
  localStorage.setItem("donors", JSON.stringify(donors));
  alert("Donation submitted!");
  this.reset();
  document.getElementById("preview").style.display = "none";
  base64Image = "";
  showListings();
});

// Display Listings
function showListings() {
  const needList = document.getElementById("needList");
  const donateList = document.getElementById("donateList");

  const needs = JSON.parse(localStorage.getItem("needs") || "[]");
  const donors = JSON.parse(localStorage.getItem("donors") || "[]");

  needList.innerHTML = "<h3>People Who Need Equipment</h3>";
  needs.forEach((n) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <p><strong>Need:</strong> ${n.details}</p>
      <p><strong>Location:</strong> ${n.location}</p>
      ${n.showContact ? `<p><strong>Contact:</strong> ${n.contact}</p>` : ""}
      <hr>
    `;
    needList.appendChild(card);
  });

  donateList.innerHTML = "<h3>Donors</h3>";
  donors.forEach((d) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <p><strong>Equipment:</strong> ${d.details}</p>
      <p><strong>Location:</strong> ${d.location}</p>
      ${d.photo ? `<img src="${d.photo}" style="max-width:150px;">` : ""}
      ${d.showContact ? `<p><strong>Contact:</strong> ${d.contact}</p>` : ""}
      <hr>
    `;
    donateList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", showListings);
