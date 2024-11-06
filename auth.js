function getTokenFromUrl() {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);
    return params.get("access_token");
}

// Store the token securely
const accessToken = getTokenFromUrl();
if (accessToken) {
    // Store the token in session storage for temporary access
    sessionStorage.setItem("auth_token", accessToken);
    // Redirect to the password vault page or dashboard
    window.location.href = "/Pages/passwords.html";
} else {
    console.error("Access token not found.");
}
async function fetchUserInfo() {
    const token = sessionStorage.getItem("auth_token");
    if (!token) return;

    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` }
    });
    const userInfo = await response.json();

    // Store or display user info as needed
    console.log("User Info:", userInfo);
    registerOrAuthenticateUser(userInfo);
}

function registerOrAuthenticateUser(userInfo) {
    // Save the user data in Supabase or perform any registration/authentication actions
    // Example: Save the user’s ID or email to recognize them in future sessions
}

fetchUserInfo();
