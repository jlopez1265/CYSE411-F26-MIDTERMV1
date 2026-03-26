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

    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");
        li.textContent = n;
        list.appendChild(li);


    }
}



/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    
    if (!currentProfile || typeof currentProfile.username !== "string" ||
        !Array.isArray(currentProfile.notifications))  {
        alert("No valid session to save");
        return;
    }

    const safeProfile = {
        username: currentProfile.username,
        notifications: currentProfile.notifications
    }

    localStorage.setItem("profile", JSON.stringify(safeProfile));
    alert("Session has been saved");
 }



function loadSession() {

    const stored = localStorage.getItem("profile");

    if (!stored) {
        return;
    }

    let profile;

    try {
        profile = JSON.parse(stored);
    } catch (error) {
        localStorage.removeItem("profile");
        alert("Session is corrupted");
        return;
    }

    if (typeof profile !== "object" || profile === null || typeof profile.username !== "string" ||
        !Array.isArray(profile.notifications)) {
        localStorage.removeItem("profile");
        alert("Invalid session data");
        return;
    }

    for (let n of profile.notifications) {
        if (typeof n !== "string") {
            localStorage.removeItem("profile");
            alert("Invalid session data");
            return;
        }
    }

    currentProfile = {
        username: profile.username,
        notifications: profile.notifications
    }

    renderProfile(currentProfile);
}
