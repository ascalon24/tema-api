const form = document.querySelector('#post-form');

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const list = document.querySelector('#post-list');
const listStatus = document.querySelector('#list-status');

function showListStatus(text){
    listStatus.textContent = text;
}

function renderPost(post){
    const li = document.createElement('li');
    li.dataset.id = post.id;

    const title = document.createElement('h3');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.textContent = post.body;

    const deleteButton= document.createElement('button');
    deleteButton.type='button';
    deleteButton.textContent='Sterge';
    deleteButton.dataset.action='delete';

    li.append(title,body,deleteButton);
    return li;
}

async function loadPosts() {
    showListStatus('Incarcare...');
    try{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error('Serverul a raspuns cu ' + response.status);
        }
        const posts = await response.json();

        if(posts.length === 0) {
            showListStatus('Nu exista postari');
            return;
        }

        for(const post of posts.slice(0,10)){
            list.append(renderPost(post));
        }
        showListStatus('');
    }catch (error){
        showListStatus('Eroare: ' + error.message);
    }
    }

const formMessage = document.querySelector('#form-message');

function showFormMessage(text){
    formMessage.textContent = text;
}

form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    try{
        const response = await fetch(API_URL, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data),
        });
    if(response.status === 201){
        const newPost = await response.json();
        list.prepend(renderPost(newPost));
        form.reset();
        showFormMessage('Postarea a fost adaugata');

    }
    else if(response.status >= 400 && response.status < 500){
        const serverError = await response.json().catch(() => ({}));
        showFormMessage(serverError.message||'Cererea a fost respinsa('+response.status+').');
    }
    else{
        showFormMessage('Eroare de server('+response.status+').');
    }
    }catch(error){
        showFormMessage('Nu s-a putut contacta serverul. Verifica conexiunea la internet');
    }
});

list.addEventListener('click',async (event) => {
    const button = event.target.closest('[data-action="delete"]');
    if (!button){
        return;
    }

    const li = button.closest('li');
    const id = li.dataset.id;

    try{
        const response = await fetch(API_URL + '/' + id, {method:'DELETE'});
    if (!response.ok){
        showListStatus('Nu s-a putut sterge ('+response.status+').');
        return;
    }
    li.remove();
    }catch (error) {
        showListStatus('Nu s-a putut contacta serverul.');
    }
});

loadPosts();

