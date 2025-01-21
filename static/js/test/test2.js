var cameraInput = document.getElementById('file');
if (cameraInput.files && cameraInput.files[0]) {
    var formData = new FormData();
    formData.append('file', cameraInput.files[0]);

    // 發送 POST 請求到 /upload
    fetch('/upload', {
        method: 'POST',
        body: formData
    })

    // window.location.href = "/phone_result.html?result="+{result} +'&filename='+ data.filename;

    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('圖片上傳成功！');
        } else {
            alert('上傳失敗，請再試一次。');
            
        }
    })
    .catch(error => {
        var result = '/phone_result.html?result='+'{{result}}'+'&filename='+'{{filename}}';
        // window.location.href = result;
        // ?result="+{result} +'&filename='+ data.filename
        // console.error('上傳錯誤:', error);
        // phone_result.html?result=一般垃圾&filename=bg-garbage.jpg
        alert('發生錯誤'+result);
    });
}
