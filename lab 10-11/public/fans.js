

//-----------------------
'use strict'

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

window.addEventListener('online', unloadData);

let storage = window.localStorage;
let buttonAddComment = document.getElementById("adding-request");
var commentsRow = document.getElementById("feedback-container");
buttonAddComment.onclick = onClick;


checkStorage();



function isOnline() {
    return window.navigator.onLine;
}


function onClick() {
    let commentInput = document.getElementById("feedback-text");

    if (commentInput.value == "" || commentInput.value == " " || commentInput.value.length == 0) {
        alert("Чистий комментар")
    } else {
        let date = new Date();
        let commentJSON = JSON.stringify({message: commentInput.value, date: date});

        if (isOnline()) {
            sendDataToServer(commentJSON);
        } else {

            let comments = storage.getObj("comments");
            comments.push(commentJSON)

            storage.setObj("comments", comments);


        }
        commentInput.value = "";
    }
}

function sendDataToServer(comment) {


        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let initConfig = {
            method: "POST",
            mode: 'cors',
            headers: myHeaders,
            body: comment
        };

        fetch('http://localhost:1428/api/comments', initConfig)
            .then(function(response) {
                

                return response.json();
            })
            .then(function(resp) {
                
            })
            .catch( alert );


}

function checkStorage() {
    if(isOnline()) {

        let initConfig = {
            method: "GET",
            mode: 'cors'
        };

        fetch('http://localhost:1428/api/comments', initConfig)
            .then(function(response) {

                return response.json();
            })
            .then(function(comments) {
                comments.forEach((commentValue) => {
                     
                    

            let comment = document.createElement('div');

            comment.className = "col-12 fan-comment";
            comment.innerHTML = `<div class="request"><p>${commentValue.message}</p>
                    <div class="req-footer">
                        <div class="date">${commentValue.date}</div>
                        <div class="nickname">someone</div>
                    </div>
                </div>`;

            commentsRow.appendChild(comment);

                })
            })
            .catch( alert );
    } else {
        let comments = storage.getObj("comments");

        if (comments == null) {
            storage.setObj("comments", new Array());
        }

        if (comments.length > 0 && isOnline()) {
            comments.forEach(commentValue => {
                commentValue = JSON.parse(commentValue);
            let comment = document.createElement('div');

                       comment.className = "col-12 fan-comment";
            comment.innerHTML = `<div class="request"><p>${commentValue.message}</p>
                    <div class="req-footer">
                        <div class="date">${commentValue.date}</div>
                        <div class="nickname">someone</div>
                    </div>
                </div>`;

            commentsRow.appendChild(comment);
            });
    }

        storage.setObj("comments", new Array());
    }
}

function unloadData() {
    console.log("Online");
    let comments = storage.getObj("comments");

    if (comments.length > 0) {
        sendDataToServer(comments);
        storage.setObj("comments", new Array());
    }
}

