// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

    let profile;

    try {
        profile = JSON.parse(text);
    } catch (error) {
        alert("Invalid JSON");
        return;
    }

    if (typeof profile !== "object" || profile === null || typeof profile.username !== "string" ||
        !Array.isArray(profile.notifications)) {
        alert("Invalid profile data");
        return;
    }

    for (let n of profile.notifications) {
        if (typeof n !== "string") {
            alert("Invalid notifications");
            return;
        }
    }
    
}


/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {

    const text = document.getElementById("profileInput").value;

    let profile;

    try {
        profile = JSON.parse(text);
    } catch (error) {
        alert("Invalid JSON");
        return;
    }

    if (!isValidProfile(profile)) {
        alert("Invalid profile data");
        return;
    }

    currentProfile = {
        username: profile.username,
        notifications: profile.notifications
    };

    renderProfile(currentProfile);
}



/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    
    document.getElementById("username").textContent = profile.username;
    
    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {
        const li = document.createElement("li");
        li.textContent = n;
        list.appendChild(li);
 }
}


function loadSession() {

    const stored = localStorage.getItem("profile");

    if (stored) {

        const profile = JSON.parse(stored);

        currentProfile = profile;

        renderProfile(profile);
    }
}
