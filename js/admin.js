import { danhsachSanPham, danhsachKhachHang, danhsachHoaDon, danhsachPhanHoi } from "./data.js";
import { headerTableSanPham, headerTableKhachHang, headerTableHoaDon, headerTablePhanHoi } from "./admin_headerTable.js";

createTable('Danh sách sản phẩm', headerTableSanPham, danhsachSanPham);

export function changeTab(evt, tabName) {
    var i, tablinks;

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";

    switch (tabName) {
        case 'Items':
            createTable('Danh sách sản phẩm', headerTableSanPham, danhsachSanPham);
            break;
        case 'Bills':
            createTable('Danh sách hóa đơn', headerTableHoaDon, danhsachHoaDon);
            break;
        case 'Customers':
            createTable('Danh sách khách hàng', headerTableKhachHang, danhsachKhachHang);
            break;
        case 'Feedbacks':
            createTable('Danh sách phản hồi', headerTablePhanHoi, danhsachPhanHoi);
            break;
        default:
    }
}


function createTable(title, headers, datas) {
    const tableContainer = document.getElementById("table-items");
    const table = document.createElement("table");
    const tableTitle = document.getElementById("table-title");

    tableTitle.innerHTML = title;

    const headerRow = document.createElement("tr");
    for (const header of headers) {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    var stt = 1;

    datas.forEach(data => {
        const row = document.createElement("tr");
        let firstkey = true;

        for (const key in data) {
            const td = document.createElement("td");
            if (firstkey) {
                td.textContent = stt++;
                firstkey = false;
            } else {
                td.textContent = data[key];
            }
            row.appendChild(td);
        }
        table.appendChild(row);
    });

    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}