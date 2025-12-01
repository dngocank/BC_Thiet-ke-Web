document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

function checkLoginStatus() {
    const userArea = document.getElementById('user-area');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && userArea) {
        userArea.innerHTML = `
            <span style="font-weight: bold; color: #d32f2f;">Xin chào, ${currentUser.name}</span>
            <a href="#" id="logout-btn" style="font-size: 0.9em; color: #666; margin-left: 10px;">(Đăng xuất)</a>
        `;

        document.getElementById('logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }
}