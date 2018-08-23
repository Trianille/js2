window.onload = () => {
    commentSection();
}

function renderCommentForm() {
    const el = document.createElement('div');
    el.classList.add('comment-form');
    el.innerHTML = '<form action=# method="post" name="commentForm">' +
        '<fieldset><legend>Your comment</legend>' +
        '<label for="name">Имя</label><input id="name" type="text">' +
        '<label for="comment">Текст</label><textarea id="comment"></textarea>' +
        '<input id="call-us-submit" type="button" onClick="validate()" value="Send!">' +
        '</fieldset></form>';
    return el;
}

function validate() {
    const maskName = /^[A-Za-z]+$/g;
    const name = document.querySelector('#name');
    const comment = document.querySelector('#comment');
    if (maskName.test(name.value) && comment.value.length > 0) {
        const data = {
            id_comment: name.value,
            text: comment.value
        };
        name.value = '';
        comment.value = '';
        sendComment(data);
    } else {
        console.log('error');
    }
}

function sendComment(data) {
    console.log(data);
    const form = new FormData();
    form.append('json', JSON.stringify(data));
    
    fetch('http://localhost:3000/review.add', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        console.log(obj);
    });
}

function submitComment(id) {
    const data = {id_comment: id};
    sendSubmition(data);
}

function sendSubmition(data) {
    console.log(data);
    const form = new FormData();
    form.append('json', JSON.stringify(data));
    
    fetch('http://localhost:3000/review.submit', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        console.log(obj);
    });
}

function deleteComment(id) {
    const data = {id_comment: id};
    sendDeleteRequest(data);
}

function sendDeleteRequest(data) {
    console.log(data);
    const form = new FormData();
    form.append('json', JSON.stringify(data));
    
    fetch('http://localhost:3000/review.delete', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        console.log(obj);
    });
}

function renderCommentBody() {
    const el = document.createElement('div');
    el.classList.add('comments-body');
    return el;
}

function getComments() {
    fetch('http://localhost:3000/review.list', {
        method: 'POST'
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        console.log(obj);
        const section = document.querySelector('.comments-body');
        for (let comment of obj.comments) {
            const el = document.createElement('div');
            el.classList.add('comment');
            el.innerHTML = '<div class="comment-name">' +
                comment.id_comment +
                '</div><div class="comment-body">' +
                comment.text +
                '</div><div><button class="btm-submit" onClick="submitComment(' + 
                comment.id_comment + 
                ')">Submit?</button></div>' +
                '<div><button class="btm-delete" onClick="deleteComment(' + 
                comment.id_comment + 
                ')">Delete?</button></div>';
            section.appendChild(el);
            console.log(comment);
        }
    });
}

function commentSection() {
    const el = document.createElement('div');
    el.classList.add('comment-section');
    const form = renderCommentForm();
    const body = renderCommentBody();
    el.appendChild(form);
    el.appendChild(body);
    document.querySelector('.container').appendChild(el);

    getComments();
}
