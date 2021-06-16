import { API } from "../../backend";

export const newpost = (post) => {
  return fetch(`${API}/publish`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all categories

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//get all posts
export const getPosts = () => {
  return fetch(`${API}/posts`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a post
export const getApost = (postId) => {
  return fetch(`${API}/post/${postId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update a post
export const updatePost = (postId, post) => {
  return fetch(`${API}/post/${postId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
     
      
    },
    body: JSON.stringify(post)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


// export const updateProduct = (productId, userId, token, product) => {
//   return fetch(`${API}/product/${productId}/${userId}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: product
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

//delete a post

export const deletePost = (postId) => {
  return fetch(`${API}/post/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
     
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
