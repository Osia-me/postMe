import {http} from './http';
import {ui} from './ui';

//Get ports on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post event
document.querySelector('.post-submit').addEventListener('click', createPost);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPost(data))
  .catch(err => console.log(err));
}

function createPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const data = {
    title,
    body
  }

  //Create Post
  http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.ShowAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
}
