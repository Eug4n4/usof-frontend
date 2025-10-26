# Documentation

Here you can find information about steps completed during the development process.

## Project Overview

This project is the **frontend part** of the [**USOF backend API**](https://github.com/Eug4n4/usof-backend).  
Here, you can find a **visual representation** of the API and its features.  
The API itself provides **CRUD operations** for the main models: **users**, **posts**, **categories**, **comments**, and **reactions**. Besides, it also uses an external AdminJS API to provide admin panel. You can access the admin panel using /admin path

---

## Implemented Functionality

### **Main Page**

- Accessible to all users  
- Displays a list of posts  
- Each post includes a preview containing its title, part of the content, the author’s name, avatar, and post creation date  
- Allows users to **filter** and **sort** posts  
- Allows users to **add a post to favorites**  
- Supports **customizable pagination** (change page size and current page number)  

---

### **Post Page**

- Accessible to everyone  
- Displays the full content of the post  
- Shows the number of likes and dislikes under the post  
- Allows users to **like** or **dislike** the post  
- Displays a list of comments  
- Supports **customizable pagination** for comments (similar to the main page)  
- Allows users to **sort comments** by the number of reactions or by the date they were added  

---

### **Profile Page**

- Accessible only to **authorized users**  
- Displays information about the current user: avatar, username, name, and role  
- Allows users to **edit their name**  
- Allows users to **view their own posts**  
- Allows users to **view their favorite posts**  
- Allows users to **edit or delete** their posts  
- Allows users to **remove posts from favorites**  
- Includes **pagination**, **sorting**, and **filtering** for each list  

---

### **Categories Page**

- Accessible to all users  
- Displays a list of all available categories  
- Supports **customizable pagination** (change page size and current page number)  

---

### **Authentication Pages**

- Contain login and registration forms  
- After registration, the user is redirected to the **login page**  
- After registration, the user receives an **email with a confirmation link**  
- After login, the user is redirected to the **main page**  
- The user can **request a password reset**  

---

## Program Algorithm

### **1. Authentication**

1. The user submits a completed registration/login form  
2. A button click event triggers the corresponding method of the `AuthService` class, sending a **POST request** to the server  
3. On success, the user receives a pair of **access** and **refresh tokens**, which are stored in cookies.  
   - After login → redirected to the **main page**  
   - After registration → redirected to the **login page**  
4. In case of errors, a message is displayed  
5. After login, user information is stored in the global `AuthContext`  
6. On logout, the corresponding `AuthService` method is called, and the user information is removed from `AuthContext`

---

### **2. Post Sorting and Filtering**

1. The user clicks a sort button or submits a filter form.  
2. The React `Sorting` component, which is responsible for rendering the sorting UI, triggers an **asynchronous thunk** connected to the `postSlice` state, where post data for the main page is stored.
3. The asynchronous thunk sends a **GET request** to the API with sorting parameters.  
4. After receiving the response, the list of posts is updated, and the component re-renders accordingly  

---

### **3. Displaying Posts and Comments**

1. The user clicks on a post title  
2. The `Post` component uses a custom hook `usePagination` to manage pagination state and subscribes to the `postComments` state, where information about the current post and its comments is stored  
3. A `useEffect` hook initializes pagination state and sends a request to the API to fetch comments  
4. The `CommentCard` component renders each comment, while the `CommentForm` component renders the form for creating new comments  
