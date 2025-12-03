document.addEventListener('DOMContentLoaded', function() {
    const mapWrapper = document.getElementById('map-wrapper');
    const infoPanel = document.getElementById('region-info');

    // Kiểm tra xem dữ liệu provincesList đã được load chưa
    if (typeof provincesList === 'undefined') {
        console.error("Lỗi: Chưa load file js/data/provinces.js");
        return;
    }

    // Hàm vẽ map
    function renderMap() {
        if(!mapWrapper) return;
        
        // Xóa pin cũ
        mapWrapper.querySelectorAll('.map-pin').forEach(p => p.remove());

        // Duyệt qua danh sách từ file provinces.js
        provincesList.forEach(prov => {
            const pin = document.createElement('div');
            
            // Xử lý class CSS cho Pin
            let pinClass = 'minor-pin';
            let iconHtml = `<div class="small-dot"></div><span class="pin-label">${prov.name}</span>`;

            if (prov.type === 'major') {
                pinClass = 'major-pin';
                iconHtml = `<div class="pin-pulse"></div><i class="fas fa-map-marker-alt"></i><span class="pin-label">${prov.name}</span>`;
            } else if (prov.type === 'island') {
                pinClass = 'special-pin';
                iconHtml = `<div class="pin-pulse"></div><i class="fas fa-anchor"></i><span class="pin-label">${prov.name}</span>`;
            }

            pin.className = `map-pin ${pinClass}`;
            pin.innerHTML = iconHtml;
            pin.style.top = prov.top + '%';
            pin.style.left = prov.left + '%';

            // Sự kiện Click
            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                showInfo(prov);
                
                // Highlight
                document.querySelectorAll('.map-pin').forEach(p => p.style.color = '');
                if (prov.type !== 'minor') pin.style.color = '#FFD700';
            });

            mapWrapper.appendChild(pin);
        });
    }

    // Hàm hiển thị thông tin bên phải
    function showInfo(data) {
        if(!infoPanel) return;

        const tagsHtml = data.tags ? data.tags.map(tag => `<span class="culture-tag">#${tag}</span>`).join('') : '';
        
        infoPanel.innerHTML = `
            <div style="animation: fadeIn 0.5s;">
                <h2 style="color: #b71c1c; margin-bottom:10px; border-bottom: 2px solid #c5a059; padding-bottom: 10px;">${data.name}</h2>
                
                <img src="${data.image}" style="width: 100%; border-radius: 8px; margin: 15px 0; height: 200px; object-fit: cover; border: 1px solid #ddd;" onerror="this.src='https://via.placeholder.com/400x200'">
                
                <div style="margin-bottom: 15px;">${tagsHtml}</div>
                
                <p style="line-height: 1.6; color: #444; text-align: justify; margin-bottom: 20px;">${data.desc}</p>
                
                <a href="region-detail.html?id=${data.id}" class="btn-detail" style="display: block; text-align: center; width: 100%; background: #b71c1c; color: white; padding: 12px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                    Khám phá chi tiết ${data.name} &rarr;
                </a>
            </div>
        `;
    }

    // Khởi chạy
    renderMap();
    
    // Tool lấy tọa độ (giữ lại nếu cần)
    mapWrapper.addEventListener('click', function(e) {
        if(e.target === mapWrapper || e.target.classList.contains('vietnam-map')) {
            const rect = mapWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const percentLeft = ((x / rect.width) * 100).toFixed(1);
            const percentTop = ((y / rect.height) * 100).toFixed(1);
            console.log(`Top: ${percentTop}, Left: ${percentLeft}`);
        }
    });
});