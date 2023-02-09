import axios, { formToJSON } from "axios";
export function getAllUsers() {
  return axios.get("https://dummyjson.com/users").then((res) => {
    return res.data;
  });
}

export function authenticateUser(user: { username: string; password: string }) {
  return axios
    .post("https://dummyjson.com/auth/login", {
      username: user.username,
      password: user.password,
    })
    .then((res) => {
      return res.data;
    });
}
export function getSavedUser() {
  return JSON.parse(localStorage.getItem("user") || "{}");
}
export function saveUser(user: { username: string; password: string }) {
  localStorage.setItem("user", JSON.stringify(user));
}

export async function getData(Resource: string) {
  return await axios
    .get(`https://dummyjson.com/auth/${Resource}/user/${getSavedUser().id}`, {
      headers: {
        Authorization: getSavedUser().token,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data[Resource];
    })
    .catch((err) => {
      console.log(err);
    });
}
export function deleteSavedUser() {
  localStorage.removeItem("user");
}
export async function getComments(postId: any) {
  // return await axios.get(`https://dummyjson.com/comments/post/${postId}`).then((res) => {
  //   res.data.comments.map((comment: any) => {
  //     getFullName(comment.user.id).then((res) => {
  //       comment.user.firstName = res.firstName;
  //       comment.user.image = res.image;
  //       comment.user.lastName = res.lastName;
  //       comment.user.username = res.username;
  //     });
  //   });
  //   console.log(res.data);
  //   return res.data;
  // });
  let axiosResponse = await axios.get(
    `https://dummyjson.com/comments/post/${postId}`
  );
  let omar = axiosResponse.data.comments.map(async (comment: any) => {
    let FullName = await getFullName(comment.user.id);
    // console.log("FullName", FullName);
    return {
      ...comment,
      user: {
        ...comment.user,
        ...FullName,
      },
    };
  });
  const omar2 = await Promise.all(omar);
  // console.log("Sex");
  // console.log( omar2);
  return omar2;
}
export async function getPostByid(postId: any) {
  return await axios
    .get(`https://dummyjson.com/posts/${postId}`)
    .then((res) => {
      return res.data;
    });
}
export async function getFullName(userId: any) {
  let response = await axios.get(
    `https://dummyjson.com/users/${userId}?select=firstName,lastName,image,username`
  );
  return response.data;
}

export async function updateTodo(todo: any) {
  return await axios
    .put(`https://dummyjson.com/todos/${todo.id}`, {
      Headers: {
        "content-type": "application/json",
        body: JSON.stringify({
          completed: false,
        }),
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    });
}
export async function getPostsBytag(tag: any) {
  return await axios
    .get(`https://dummyjson.com/posts/search?q=${tag}`)
    .then((res) => {
      return res.data;
    });
}