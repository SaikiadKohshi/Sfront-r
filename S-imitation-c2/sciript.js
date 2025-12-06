document.getElementById("contactForm").addEventListener("submit", function (e) {
    const name = document.querySelector("input[name='name']").value;

    if (name.length < 2) {
        alert("名前は2文字以上にしてください。");
        e.preventDefault(); // PHPへの送信を止める
    }
});
