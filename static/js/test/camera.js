
    // 获取摄像头按钮和图像预览
const cameraInput = document.getElementById('camera');
const imagePreview = document.getElementById('imagePreview');

// 监听文件选择事件（摄像头拍照后）
cameraInput.addEventListener('change', function(event) {
    const file = event.target.files[0];  // 获取文件（图片）
    if (file) {
        var formData = new FormData();
        formData.append("file", file);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload", true);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         var response = JSON.parse(xhr.responseText);
        //         if (response.success) {
        //             alert('檔案上傳成功！');  // 彈出成功提示框
                    
        //         } else {
        //             alert('上傳失敗: ' + response.message);  // 彈出失敗提示框，顯示錯誤訊息
        //         }
        //     }
        //     };  
        
        
        xhr.send(formData);

        
        // 設定當請求完成時的處理函數
        // xhr.onload = function () {
        //     if (xhr.status === 200) {
        //         const urlParams = new URLSearchParams(window.location.search);
        //         window.location.href = urlParams;
        //     } else {
        //         console.log('上傳失敗');
        //     }
        // };
        // window.location.href = '/phone_result.html';
        // var response = JSON.parse(xhr.responseText);
        // window.location.href = response;
            }
        // var redirectUrl = "{{ result_url }}";

        // window.location.href = redirectUrl;
    });
