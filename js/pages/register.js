document.addEventListener('DOMContentLoaded', function() {
    const regForm = document.getElementById('register-form');
    const errorMsg = document.getElementById('reg-error-message');

    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Chặn load lại trang

            // 1. Lấy dữ liệu từ Form
            const fullname = document.getElementById('fullname').value;
            const username = document.getElementById('reg-username').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirmPass = document.getElementById('confirm-password').value;

            // 2. Validate (Kiểm tra dữ liệu)
            
            // Kiểm tra độ dài mật khẩu
            if (password.length < 6) {
                showError('Mật khẩu phải có ít nhất 6 ký tự!');
                return;
            }

            // Kiểm tra mật khẩu xác nhận
            if (password !== confirmPass) {
                showError('Mật khẩu xác nhận không khớp!');
                return;
            }

            // 3. Kiểm tra xem User đã tồn tại trong hệ thống chưa
            // Lấy danh sách user cũ ra, nếu chưa có thì tạo mảng rỗng []
            const currentUsers = JSON.parse(localStorage.getItem('listUsers')) || [];

            // Tìm xem có ai trùng tên đăng nhập không
            const isExist = currentUsers.some(user => user.username === username);
            
            if (isExist) {
                showError('Tên đăng nhập này đã được sử dụng!');
                return;
            }

            // 4. Nếu hợp lệ -> Tạo user mới
            const newUser = {
                username: username,
                password: password,
                fullname: fullname,
                role: 'user' // Mặc định là user thường
            };

            // Thêm vào danh sách
            currentUsers.push(newUser);

            // Lưu lại vào LocalStorage
            localStorage.setItem('listUsers', JSON.stringify(currentUsers));

            // 5. Thông báo thành công và chuyển trang
            errorMsg.style.color = 'green';
            errorMsg.textContent = 'Đăng ký thành công! Đang chuyển sang trang đăng nhập...';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Hàm hiển thị lỗi cho gọn code
    function showError(message) {
        errorMsg.style.color = 'red';
        errorMsg.textContent = message;
    }
});