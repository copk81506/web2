// 當選擇選單的選項時，呼叫此函數來更新頁面文字
function updateText() {
    // 获取 id 为 dropdown1 的下拉选单
    var selectElement = document.getElementById("Location");
    // 获取选中的文本
    var selectedText = selectElement.options[selectElement.selectedIndex].text;

    // var selectElement = document.getElementById("Location").text;
    // var selectedValue = selectElement.innerHTML;  // 获取选中的值
    // if (selectedOption === "123") {
    //获取 id 为顯示文字
    var displayText = document.getElementById("Location-display");

    displayText.innerHTML = selectedText;
}

function time_display_updateText() {
    var selectElement = document.getElementById("DATETIME");
    var selectedText = selectElement.options[selectElement.selectedIndex].text;
    var displayText = document.getElementById("time-display");
    displayText.innerHTML = selectedText;
}

function showFileName() {
    // 取得檔案名稱
    var fileInput = document.getElementById('file');
    var fileName = fileInput.files[0].name;

    // 使用原生 JavaScript 彈出提示框
    alert( "檔案名稱： " + fileName + "，檔案上傳成功");
    
    // 防止表單提交
    return false;
}

// 使用AJAX進行檔案上傳
function uploadFile(event) {
    event.preventDefault();  // 防止表單自動提交

    var formData = new FormData();
    var fileInput = document.getElementById('file');
    formData.append("file", fileInput.files[0]);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert('檔案上傳成功！');  // 彈出成功提示框
                
            } else {
                alert('上傳失敗: ' + response.message);  // 彈出失敗提示框，顯示錯誤訊息
            }
        }
    };
    xhr.send(formData);
    

    
}

function camera(event){
    // 获取摄像头按钮和图像预览
    const cameraInput = document.getElementById('camera');
    const imagePreview = document.getElementById('imagePreview');

    // 监听文件选择事件（摄像头拍照后）
    cameraInput.addEventListener('change', function(event) {
        const file = event.target.files[0];  // 获取文件（图片）
        if (file) {
            var formData = new FormData();
            formData.append("file", fileInput.files[0]);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/upload", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert('檔案上傳成功！');  // 彈出成功提示框
                        
                    } else {
                        alert('上傳失敗: ' + response.message);  // 彈出失敗提示框，顯示錯誤訊息
                    }
                }
            };
            xhr.send(formData);
                }
            });
}