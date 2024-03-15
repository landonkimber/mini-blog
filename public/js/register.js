console.log("register.js linked");

document.addEventListener('DOMContentLoaded', () => {
  const registerFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#register-username-field').value.trim();
    const password = document.querySelector('#register-password-field').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the login page
        document.location.replace('/login');

        console.log("User Registered Successfully");
      } else {
        document.querySelector('#register-alert-text').textContent = 'Failed to register user. Please try again!';
      }
    } else {
      document.querySelector('#register-alert-text').textContent = 'Fields cannot be blank! Please try again!';
    }
  };

  document.querySelector('#register-btn').addEventListener('click', registerFormHandler);
});