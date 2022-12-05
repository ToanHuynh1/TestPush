
let logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", (e) => {
    const auth = getAuth(app);
    signOut(auth)
        .then(() => {
            alert("Đăng xuất thành công");
            location.href = "https://toanhuynh1.github.io/TestPush/login.html";
        })
        .catch((error) => { });
});
