import { API } from "../../backend";

export const contact = contact => {
  return fetch(`${API}/contact`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
