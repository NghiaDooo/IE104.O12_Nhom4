const fs = require('fs');

const inputFile = './data/tainghe.json';
const outputFile = './data/headphone.json';

// Đọc file JSON
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file:', err);
        return;
    }

    const jsonData = JSON.parse(data);
    const labelsToAdd = {
        usageTime: 'Thời gian sử dụng',
        chargingCaseTime: 'Thời gian sử dụng với case sạc',
        chargingPort: 'Cổng sạc',
        audioTechnology: 'Công nghệ âm thanh',
        compatibility: 'Tương thích',
        features: 'Đặc điểm',
        connectivitySupport: 'Hỗ trợ kết nối',
        controlMethod: 'Phương thức điều khiển',
        brand: 'Thương hiệu',
        jackType: 'Loại jack tai nghe',
        controlButtons: 'Nút điều khiển'
    };

    jsonData.forEach(item => {
        Object.keys(labelsToAdd).forEach(label => {
            item.detail[label] = { label: labelsToAdd[label], value: item.detail[label] };
        });
    })

    // Ghi lại file JSON
    fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Không thể ghi lại file:', err);
            return;
        }
        console.log('File JSON đã được sửa đổi và ghi lại thành công.');
    });
});
