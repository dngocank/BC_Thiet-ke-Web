document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('detail-content');
    const warningDiv = document.getElementById('login-required');
    const reviewSection = document.getElementById('review-section');

    // --- BƯỚC 1: KIỂM TRA ĐĂNG NHẬP ---
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        if(contentDiv) contentDiv.style.display = 'none';
        if(warningDiv) warningDiv.style.display = 'block';
        if(reviewSection) reviewSection.style.display = 'none';
        return; 
    }

    // --- BƯỚC 2: HIỂN THỊ NỘI DUNG ---
    if(warningDiv) warningDiv.style.display = 'none';
    if(reviewSection) reviewSection.style.display = 'block';

    const festivalId = getUrlParameter('id');
    const festival = festivalsList.find(item => item.id === festivalId);

    if (festival) {
        const imgSrc = `.${festival.image}`;
        contentDiv.innerHTML = `
            <div style="display: flex; gap: 40px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px;">
                    <img src="${imgSrc}" alt="${festival.name}" class="detail-img" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                </div>
                <div style="flex: 1.5;">
                    <h1 style="color: #d32f2f; margin-bottom: 15px; font-size: 2.5rem;">${festival.name}</h1>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p class="detail-info"><i class="fas fa-map-marker-alt" style="width: 20px; color: #d32f2f;"></i> <strong>Địa điểm:</strong> ${festival.location}</p>
                        <p class="detail-info"><i class="fas fa-calendar-alt" style="width: 20px; color: #d32f2f;"></i> <strong>Thời gian:</strong> ${festival.date}</p>
                        <p class="detail-info"><i class="fas fa-utensils" style="width: 20px; color: #d32f2f;"></i> <strong>Đặc sản:</strong> ${festival.foods || 'Đang cập nhật'}</p>
                    </div>
                    <h3 style="margin-bottom: 10px; border-left: 4px solid #d32f2f; padding-left: 10px;">Giới thiệu</h3>
                    <p class="detail-desc">${festival.description}</p>
                    <button style="margin-top: 30px; padding: 12px 25px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        <i class="fas fa-ticket-alt"></i> Đặt vé tham gia
                    </button>
                </div>
            </div>
        `;
        
        // Tải bình luận
        loadReviews(festivalId);
    } else {
        contentDiv.innerHTML = `<h2 style="text-align:center; color: red;">❌ Không tìm thấy dữ liệu!</h2>`;
        if(reviewSection) reviewSection.style.display = 'none';
    }

    // --- BƯỚC 3: LOGIC BÌNH LUẬN ---
    
    // Gán hàm submit vào window để HTML gọi được
    window.submitReview = function() {
        const rating = document.getElementById('rv-rating').value;
        const comment = document.getElementById('rv-comment').value;

        if (comment.trim() === "") {
            alert("Bạn chưa nhập nội dung bình luận!");
            return;
        }

        const newReview = {
            user: currentUser.name || currentUser.username,
            rating: rating,
            text: comment,
            date: new Date().toLocaleDateString('vi-VN')
        };

        // Lấy dữ liệu cũ
        let allReviews = JSON.parse(localStorage.getItem('festival_reviews')) || {};
        if (!allReviews[festivalId]) {
            allReviews[festivalId] = [];
        }
        
        // Thêm mới lên đầu
        allReviews[festivalId].unshift(newReview);
        localStorage.setItem('festival_reviews', JSON.stringify(allReviews));

        // Reset & Reload
        document.getElementById('rv-comment').value = "";
        alert("Cảm ơn bạn đã đánh giá!");
        loadReviews(festivalId);
    }

    function loadReviews(id) {
        const reviewListDiv = document.getElementById('review-list');
        const allReviews = JSON.parse(localStorage.getItem('festival_reviews')) || {};
        const currentReviews = allReviews[id] || [];

        if (currentReviews.length === 0) {
            reviewListDiv.innerHTML = '<p style="color: #777; font-style: italic;">Chưa có bình luận nào. Hãy là người đầu tiên!</p>';
            return;
        }

        let html = '';
        currentReviews.forEach(rv => {
            let stars = '';
            for(let i=0; i<rv.rating; i++) stars += '⭐';

            html += `
                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #eee;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <strong style="color: #333; font-size: 1.1rem;"><i class="fas fa-user-circle"></i> ${rv.user}</strong>
                        <span style="font-size: 0.85rem; color: #999;">${rv.date}</span>
                    </div>
                    <div style="margin-bottom: 8px; font-size: 0.9rem;">${stars}</div>
                    <p style="color: #555; line-height: 1.5;">${rv.text}</p>
                </div>
            `;
        });
        reviewListDiv.innerHTML = html;
    }
});