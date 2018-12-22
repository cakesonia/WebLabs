
'use strict'

let buttonAddNews = document.getElementById("btnAdd");
buttonAddNews.onclick = onClick;

function onClick() {

    let newsInput = document.getElementById("news-text");
    let titleInput = document.getElementById("-");

    if (newsInput.value == "" || titleInput.value == "") {
        alert("Наявні пусті поля!")
    } else if (titleInput.value.length > 50) {
        alert("Занадто довгий заголовок!");
    } else {

        newsInput.value = "";
        titleInput.value = "";
        alert("Додано новину!");
    }
}
