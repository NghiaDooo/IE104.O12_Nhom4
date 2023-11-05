// data.js
export const danhsachSanPham = [
    {
        ProductId: 1,
        Name: 'Sản phẩm 1',
        TradeMark: 'Thương hiệu 1',
        Category: 'Danh mục 1',
        Type: 'Loại 1',
        Price: 100,
        Description: 'Mô tả sản phẩm 1'
    },
    {
        ProductId: 2,
        Name: 'Sản phẩm 2',
        TradeMark: 'Thương hiệu 2',
        Category: 'Danh mục 2',
        Type: 'Loại 2',
        Price: 200,
        Description: 'Mô tả sản phẩm 2'
    },
    {
        ProductId: 3,
        Name: 'Sản phẩm 3',
        TradeMark: 'Thương hiệu 3',
        Category: 'Danh mục 1',
        Type: 'Loại 1',
        Price: 150,
        Description: 'Mô tả sản phẩm 3'
    },
];

export const danhsachHoaDon = [
    {
        BillID: 1,
        User: 'Người dùng 1',
        DateCreated: '2023-11-05',
        TotalInvoice: 1000,
        Note: 'Ghi chú cho hóa đơn 1'
    },
    {
        BillID: 2,
        User: 'Người dùng 2',
        DateCreated: '2023-11-06',
        TotalInvoice: 1500,
        Note: 'Ghi chú cho hóa đơn 2'
    },
    {
        BillID: 3,
        User: 'Người dùng 3',
        DateCreated: '2023-11-07',
        TotalInvoice: 800,
        Note: 'Ghi chú cho hóa đơn 3'
    },
];


export const danhsachKhachHang = [
    {
        UserID: 1,
        UserName: "JohnDoe",
        Email: "johndoe@example.com",
        Password: "password123",
        Level: 2,
        DateOfBirth: "1990-01-15",
        Tel: "123-456-7890"
    },
    {
        UserID: 2,
        UserName: "JaneSmith",
        Email: "janesmith@example.com",
        Password: "securepass",
        Level: 1,
        DateOfBirth: "1985-08-22",
        Tel: "987-654-3210"
    },
    {
        UserID: 3,
        UserName: "AliceJohnson",
        Email: "alice@example.com",
        Password: "p@ssw0rd",
        Level: 3,
        DateOfBirth: "1995-03-10",
        Tel: "555-123-4567"
    },
];

export const danhsachPhanHoi = [
    {
        FeedBackID: 1,
        UserID: 101,
        ProductId: 1,
        Content: "Phản hồi về sản phẩm A",
        DateCreated: "2023-11-05"
    },
    {
        FeedBackID: 2,
        UserID: 102,
        ProductId: 2,
        content: "Phản hồi về sản phẩm B",
        DateCreated: "2023-11-06"
    },
    {
        FeedBackID: 3,
        UserID: 103,
        ProductId: 1,
        content: "Phản hồi về sản phẩm A",
        DateCreated: "2023-11-07"
    },
];
