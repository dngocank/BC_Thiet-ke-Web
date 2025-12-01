document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const usernameInput = document.getElementById('username').value.trim();
            const passwordInput = document.getElementById('password').value;

            // 1. Lấy danh sách user từ LocalStorage (Những người đã đăng ký)
            const listUsers = JSON.parse(localStorage.getItem('listUsers')) || [];

            // 2. Logic kiểm tra đăng nhập
            let userFound = null;

            // 2a. Kiểm tra xem có phải Admin "cứng" không (Backup để test)
            if (usernameInput === 'admin' && passwordInput === '123456') {
                userFound = { username: 'admin', fullname: 'Quản trị viên', role: 'admin' };
            } 
            else {
                // 2b. Nếu không phải admin, tìm trong danh sách đã đăng ký
                // Tìm người có username và password khớp với cái vừa nhập
                userFound = listUsers.find(user => 
                    user.username === usernameInput && user.password === passwordInput
                );
            }

            // 3. Xử lý kết quả
            if (userFound) {
                // Đăng nhập thành công
                errorMsg.style.color = 'green';
                errorMsg.textContent = `Xin chào ${userFound.fullname}! Đang vào trang chủ...`;

                // Lưu thông tin người đang đăng nhập hiện tại
                // Lưu ý: Không lưu password vào đây cho an toàn
                const sessionUser = {
                    name: userFound.fullname,
                    username: userFound.username,
                    role: userFound.role
                };
                localStorage.setItem('currentUser', JSON.stringify(sessionUser));

                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 1500);

            } else {
                // Đăng nhập thất bại
                errorMsg.style.color = 'red';
                errorMsg.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng!';
            }
        });
    }
});