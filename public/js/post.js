 
console.log('post.js linked');

document.addEventListener('DOMContentLoaded', () => {

    const postHandle = async (event) => {
        event.preventDefault();
        
        const subject = document.querySelector('#subject-field').value.trim();
        const content = document.querySelector('#content-field').value.trim();
        console.log(subject, content);
        if (subject && content) {
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/posts/`, {
                method: 'POST',
                body: JSON.stringify({ subject, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If successful, redirect the browser to the profile page
                console.log(response);
                document.location.replace('/');

            } else {
                document.querySelector('#alert-text').textContent = 'Post failed! Try again';
            }
        } else {
            document.querySelector('#alert-text').textContent = 'Fields cannot be blank! Please try again!';
        }
    };

    const postButton = document.querySelector('#post-btn');
    if (postButton) {
        postButton.addEventListener('click', postHandle);
    } else {
      console.error('Logout button not found.');
    }
});