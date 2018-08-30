function renderCommentForm() {
    const el = document.createElement('div');
    el.classList.add('comment-form');
    el.innerHTML = '<form action=# method="post" name="commentForm">' +
        '<fieldset><legend>Your comment</legend>' +
        '<div><label for="name">Имя</label><input id="name" type="text"></div>' +
        '<div><label for="birth">Дата рождения</label><input id="birth" type="text"></div>' +
        '<div><label for="comment">Текст</label><textarea id="comment"></textarea></div>' +
        '<div><input id="call-us-submit" type="button" onClick="validate()" value="Send!"></div>' +
        '</fieldset></form>';
    return el;
}

function validate() {
    const maskName = /^[A-Za-zА-Яа-я]+$/g;
    const maskBirth = /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/g;

    const name = document.querySelector('#name');
    const birth = document.querySelector('#birth');
    const comment = document.querySelector('#comment');
	
	const isName = maskName.test(name.value);
	const isBirth = maskBirth.test(birth.value)
	const isComment = comment.value.length > 0;
	
    if (isName && isBirth && isComment) {
        const data = {
            id_comment: name.value,
            text: comment.value
        };
        name.value = '';
        birth.value = '';
        comment.value = '';
        sendComment(data);
    } else {
        let errorMessageData = '';
        if (!isName) {
            $("#name").effect('bounce', {
                times: 3
            }, "slow");
            errorMessageData += 'Something wrong in name!<br>';
        }

        if (!isBirth) {
            $("#birth").effect('bounce', {
                times: 3
            }, "slow");
            errorMessageData += 'Something wrong in birth!<br>';
        }

        if (!isComment) {
            $("#comment").effect('bounce', {
                times: 3
            }, "slow");
            errorMessageData += 'You can\' send nothing!<br>';
        }

        errorMessage(errorMessageData);
    }
}

function sendComment(data) {
    const form = new FormData();
    form.append('json', JSON.stringify(data));

    fetch('http://localhost:3000/review.add', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
    });
}

function submitComment(id) {
    const data = {
        id_comment: id
    };
    sendSubmition(data);
}

function sendSubmition(data) {
    const form = new FormData();
    form.append('json', JSON.stringify(data));

    fetch('http://localhost:3000/review.submit', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
    });
}

function deleteComment(id) {
    const data = {
        id_comment: id
    };
    sendDeleteRequest(data);
}

function sendDeleteRequest(data) {
    const form = new FormData();
    form.append('json', JSON.stringify(data));

    fetch('http://localhost:3000/review.delete', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
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
                ')">+1?</button></div>' +
                '<div><button class="btm-delete" onClick="deleteComment(' +
                comment.id_comment +
                ')">Delete?</button></div>';
            section.appendChild(el);
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