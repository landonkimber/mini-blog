
document.addEventListener('DOMContentLoaded', () => {
const logout = async () => {

    console.log('testme');
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
 
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };

  const logoutButton = document.querySelector('#logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  } else {
    console.error('Logout button not found.');
  }
});
