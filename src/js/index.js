import {http} from './http';
import {ui} from './ui';

//Get ports on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post event
document.querySelector('.post-submit').addEventListener('click', createPost);
//Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);
//Listen for edit data
document.querySelector('#posts').addEventListener('click', enableEdit);
//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }
  //Validate input
  if(title === '' || body === ''){
    ui.ShowAlert('Please add some thoughs :)', 'alert alert-danger');
  } else {

    //Check for id
    if(id === ''){
      //Create Post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.ShowAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));

    } else {
      //Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.ShowAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));

    }
  }
}




//Delete Post
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
//Enable Edit Data
function enableEdit(e){
  if(e.target.parentElement.classList.contains("edit")){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }

    //Fill form with current post
    ui.fillForm(data);

  }
  e.preventDefault();
}

//Cancel edit
function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}
