
'use strict'

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let storage = window.localStorage;
let buttonAddNews = document.getElementById("btnAdd");
buttonAddNews.onclick = onClick;


checkLocalStorage();
window.addEventListener('online', sendDataToServer);

function isOnline() {
    return window.navigator.onLine;
}


function onClick() {

    let newsInput = document.getElementById("news-text");
    let titleInput = document.getElementById("-");

    if (newsInput.value == "" || titleInput.value == "") {
        alert("Наявні пусті поля!")
    } else if (titleInput.value.length > 50) {
        alert("Занадто довгий заголовок!");
    } else {

        let newsJSON = JSON.stringify({ titleInput: titleInput.value, newsInput: newsInput.value });

        if (isOnline()) {
            sendDataToServer(newsJSON);
        } else {

            let newsList = storage.getObj("news");
            

            newsList.push(newsJSON);

            storage.setObj("news", newsList);

        }

        newsInput.value = "";
        titleInput.value = "";
    }
}

function sendDataToServer(news) {
    storage.setObj("comments", new Array());
}



function checkLocalStorage() {
    let news = storage.getObj("news");

    if (news == null) {
        storage.setObj("news", new Array());
    }
}
