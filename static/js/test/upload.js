document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 防止表单默认提交，改用 JavaScript 发送请求

    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    // 如果用户没有选择文件，则提示
    if (!file) {
        document.getElementById("message").textContent = "Please select a file.";
        return;
    }

    // 弹出确认框，用户确认后上传文件
    const userConfirmed = window.confirm("Do you want to upload this image?");
    if (userConfirmed) {
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append("file", file); // 将文件添加到 FormData 对象

        // 使用 fetch 发送 POST 请求，将文件上传到 Flask 后端
        fetch("/upload", {
            method: "POST",
            body: formData,  // 发送 FormData 对象
        
        })

        window.location.href = "/mobileresult.html";
    }
    // 
});