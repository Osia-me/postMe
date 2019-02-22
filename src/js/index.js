import {http} from './http';
import {ui} from './ui';

//Get ports on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post event
document.querySelector('.post-submit').addEventListener('click', createPost);
//Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);


//Get posts
function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPost(data))
  .catch(err => console.log(err));
}
//Create posts
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

function deletePost(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
      if(confirm('Are you sure?')){
        http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.ShowAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
      }
  }
}
