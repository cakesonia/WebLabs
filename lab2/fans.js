'use strict'

let buttonAddComment = document.getElementById("adding-request");

buttonAddComment.onClick = onClick;

function onClick() {
    let commentsRow = document.getElementById("feedback-container");
    let commentInput = document.getElementById("feedback-text");
    if (commentInput.value == "" || commentInput.value == " " || commentInput.value.length == 0) {
        alert("Чистий комментар")
    } else {
        let comment = document.createElement('div');
        let date = new Date();

        comment.className = "col-12 fan-comment";
        comment.innerHTML = `<div class="request"><p>${commentInput.value}</p>
                    <div class="req-footer">
                        <div class="date">${date}</div>
                        <div class="nickname">someone</div>
                    </div>
                </div>`;

        commentsRow.appendChild(comment);
        commentInput.value = "";
        alert("Додано!");
    }
}
