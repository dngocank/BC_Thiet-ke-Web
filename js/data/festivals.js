// nơi nhập các mẫu về lễ hội á sau này tụi m muốn thêm có thể sao chép hét phần nay và sửa bổ sung hay thêm chữ ảnh vào file này 
// File: js/data/festivals.js

const festivalsList = [
    {
        id: "lh01",
        name: "Lễ Hội Chùa Hương",
        location: "Hà Nội",
        date: "Tháng 1 - Tháng 3",
        month: "1", // <-- THÊM DÒNG NÀY (Để máy tính lọc)
        image: "./assets/images/festivals/chua-huong.jpg",
        description: "Lễ hội kéo dài nhất Việt Nam..."
    },
    {
        id: "lh02",
        name: "Festival Pháo Hoa",
        location: "Đà Nẵng",
        date: "Tháng 6",
        month: "6", // <-- THÊM DÒNG NÀY
        image: "./assets/images/festivals/phao-hoa.jpg",
        description: "Màn trình diễn ánh sáng quốc tế..."
    },
    // --- BẠN HÃY THÊM NHIỀU LỄ HỘI DƯỚI ĐÂY ĐỂ WEB NHÌN ĐẦY ĐẶN ---
    {
        id: "lh03",
        name: "Lễ Hội Hoa Đà Lạt",
        location: "Lâm Đồng",
        date: "Tháng 12",
        month: "12",
        image: "https://via.placeholder.com/300x200", 
        description: "Thành phố ngàn hoa khoe sắc..."
    },
    {
        id: "lh04",
        name: "Lễ Hội Kate",
        location: "Ninh Thuận",
        date: "Tháng 10",
        month: "10",
        image: "https://via.placeholder.com/300x200", 
        description: "Lễ hội đặc sắc của người Chăm..."
    }
];