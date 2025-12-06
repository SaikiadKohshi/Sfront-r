document.addEventListener("DOMContentLoaded", () => {
    console.log("Theme loaded!");

    const btn = document.getElementById("helloBtn");
    btn.addEventListener("click", () => {
        alert("ボタンがクリックされました！");
    });
});
