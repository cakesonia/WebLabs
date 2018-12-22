'use strict'

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}


window.addEventListener('online', checkStorage);

let storage = window.localStorage;
// let buttonAddComment = document.getElementById("adding-request");
var commentsRow = document.getElementById("feedback-container");
let commentInput = document.getElementById("feedback-text");

//buttonAddComment.onClick = onClick;



checkStorage();

function isOnline() {
    return window.navigator.onLine;
}


function onClick() {
    commentsRow = document.getElementById("feedback-container");
    let commentInput = document.getElementById("feedback-text");
    if (commentInput.value == "" || commentInput.value == " " || commentInput.value.length == 0) {
        alert("Чистий комментар")
    } else {
        if (isOnline()) {
            console.log("IS Online");
            unloadData();
        } else {
           
                    let date = new Date();
           
            let commentJSON = JSON.stringify({
                commentInput: commentInput.value,
                date: date
            });
            let comments = storage.getObj("comments");
            comments.push(commentJSON)

            storage.setObj("comments", comments);


        }
        commentInput.value = "";
    }
}


function checkStorage() {
    let comments = storage.getObj("comments");

    if (comments == null) {
        storage.setObj("comments", new Array());
    }

    if (comments.length > 0 && isOnline()) {
        
        comments.forEach(commentValue => {
            let commentsRow = document.getElementById("feedback-container");
            commentValue = JSON.parse(commentValue);
            let comment = document.createElement('div');
            let date = new Date();

            comment.className = "col-12 fan-comment";
            comment.innerHTML = `<div class="request"><p>${commentValue.commentInput}</p>
                    <div class="req-footer">
                        <div class="date">${date}</div>
                        <div class="nickname">someone</div>
                    </div>
                </div>`;

            commentsRow.appendChild(comment);
        });
        storage.setObj("comments", new Array());
    }
}

function sendDataToServer(comment) {
    storage.setObj("comments", new Array());
}

function unloadData() {
    console.log("Online");
    let comments = storage.getObj("comments");

    if (comments.length > 0) {
        sendDataToServer(comments);
        storage.setObj("comments", new Array());
    }
}
