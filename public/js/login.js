console.log("LoginJS")

document.addEventListener('DOMContentLoaded', () => {
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-field').value.trim();
    const password = document.querySelector('#password-field').value.trim();

    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/profile/${username}`);

        console.log("Logged In");
        console
    } else {
        document.querySelector('#alert-text').textContent = 'The username or password is incorrect. Please try again!';
      }
    } else {
      document.querySelector('#alert-text').textContent = 'Fields cannot be blank! Please try again!';
    }
  };

  document.querySelector('#login-btn').addEventListener('click', loginFormHandler);
});

//   const signupFormHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#name-signup').value.trim();
//     const username = document.querySelector('#username-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
  
//     if (name && username && password) {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({ name, username, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert(response.statusText);
//       }
//     }
//   };
  
  // document.querySelector('#login-btn').addEventListener('click', loginFormHandler);
//   document
//     .querySelector('.signup-form')
//     .addEventListener('submit', signupFormHandler);
  