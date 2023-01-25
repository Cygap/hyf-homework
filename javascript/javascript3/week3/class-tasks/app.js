// configuration variables
const BASE_URI = `https://crudcrud.com/api/${API_KEY}`;

// DOM Elements

const createNewPostForm = document.getElementById("create-new-post-form");
const addPostTitleInput = document.getElementById("add-post-title");
const addPostImgInput = document.getElementById("add-post-img");
const addPostContentTextarea = document.getElementById("add-post-content");
const blogContainerElement = document.getElementById("blog-container");
// App variables
let blogPosts = [];

// Update DOM function/s

const getBlogPosts = async () => {
  // show loading?

  const response = await fetch(`${BASE_URI}/blog`);

  const data = await response.json();

  blogPosts.push(...data);

  blogPosts.forEach((blogPost) => {
    const blogPostDiv = createBlogPostElement(blogPost);

    blogContainerElement.innerHTML += blogPostDiv;
  });
};

const handleCreatePost = async (event) => {
  event.preventDefault();

  const body = {
    title: addPostTitleInput.value,
    imageUrl: addPostImgInput.value,
    content: addPostContentTextarea.value
  };

  const response = await fetch(`${BASE_URI}/blog`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  });
  const data = await response.json();
  blogContainerElement.innerHTML += createBlogPostElement(body);
};
getBlogPosts();

const createBlogPostElement = (blogPost) => {
  return `<div class="blog-post" id="${blogPost._id}">
  <h3 class="blog-post-heading">${blogPost.title}</h3>
  <img src="${blogPost.imageUrl}"class="blog-post-img">
  <p class="blog-post-body">${blogPost.content}</p>
  <button class="button delete" onclick="handleDeletePost('${blogPost._id}')">Delete post</button>
  <button class="button update">Update post</button>
  </div>`;
};

const handleDeletePost = async (blogPostId) => {
  const response = await fetch(`${BASE_URI}/blog/${blogPostId}`, {
    method: "DELETE"
  });
  //   const data = await response.json();
  console.log(blogPostId);
  document.getElementById(blogPostId).remove();
};

const handleUpdateBlog = async (blogPostId) => {
  const body = {
    title: addPostTitleInput.value,
    imageUrl: addPostImgInput.value,
    content: addPostContentTextarea.value
  };
  const response = await fetch(`${BASE_URI}/blog/${blogPostId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
  //   const data = await response.json();
};
// event listeners
createNewPostForm.addEventListener("submit", handleCreatePost);
