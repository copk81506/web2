function confirmUpload() {
    // 顯示確認框
    var userConfirmed = confirm("Are you sure you want to upload this image?");
    
    if (userConfirmed) {
        // 確認後提交表單
        document.getElementById("uploadForm").submit();
    } else {
        alert("You canceled the upload.");
    }
}