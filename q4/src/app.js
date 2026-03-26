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

    if (typeof profile !== "object" || profile === null) {
        return false;
    }

    if (!Object.prototype.hasOwnProperty.call(profile, "username")) {
        return false;
    }

    if (!Object.prototype.hasOwnProperty.call(profile, "notifications")) {
        return false;
    }

    if (typeof profile.username !== "string") {
        return false;
    }

    if (!Array.isArray(profile.notifications)) {
        return false;
    }

    for (let n of profile.notifications) {
        if (typeof n !== "string") {
            return false;
        }
    }
    
}


/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {

    
    document.getElementById("username").innerHTML = profile.username;

    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");

        
        li.innerHTML = n;

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    localStorage.setItem("profile", JSON.stringify(currentProfile));

    alert("Session saved");
}


function loadSession() {

    const stored = localStorage.getItem("profile");

    if (stored) {

        const profile = JSON.parse(stored);

        currentProfile = profile;

        renderProfile(profile);
    }
}
