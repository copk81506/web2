function redirectToAnotherPage() {
    var fileInput = document.getElementById('camera');
    var file = fileInput.files[0];

    if (file) {
        // 假設您將圖片上傳到伺服器並獲得 URL（在這裡我們僅使用假設的 URL）
        alert('上傳成功');
        var fileUrl = '/uploads/' + file.name;

        // 跳轉到 B 頁面並將文件的 URL 作為查詢參數
        window.location.href = '/phone_result.html';
    } else {
        alert('請選擇圖片');
    }
}