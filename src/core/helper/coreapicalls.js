import {API} from "../../backend"

export const getPosts = () => {
    return fetch(`${API}/posts`,{method:"GET"})
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//http://localhost:8000/api/blog/posts



export const getPostById= (postId) => {

    return fetch(`${API}/post/${postId}`,{method:"GET"})
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
    
}

//
