'use strict'

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let storage = window.localStorage;
let newsList = document.getElementById("content_wrapper_news");
window.addEventListener('online', checkLocalStorage);

loadData()
checkLocalStorage();

function loadData() {
    //loadDataFromServer
}

function isOnline() {
    return window.navigator.onLine;
}

function checkLocalStorage() {

    if (isOnline()) {
        let localNews = storage.getObj("news");

        if (localNews == null) {
            storage.setObj("news", new Array());
        }

        if (localNews.length > 0) {
            localNews.forEach(newsValue => {


                newsValue = JSON.parse(newsValue);
                let news = document.createElement('a');

                news.className = "news_table";
                news.innerHTML = `
                
				<img src="maxresdefault.jpg" alt="second news">
				<h1>${newsValue.newsInput}</h1>
			`
                newsList.appendChild(news);



            });

            storage.setObj("news", new Array());
        }

    }
}
