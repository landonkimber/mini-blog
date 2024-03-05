console.log('delete.js linked');

document.addEventListener('DOMContentLoaded', () => {

    const deleteHandle = async (event) => {
        event.preventDefault();
        const id = parseInt(event.target.id.split("-")[1]);
        console.log(id);
        try {
            const response = await fetch(`/api/posts/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.replace('/profile/username');
            } else {
                throw new Error('Delete request failed');
            }
        } catch (error) {
            console.error(error);
            document.querySelector('#alert-text').textContent = 'Delete failed! Try again';
        }
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteHandle);
        });
    } else {
        console.error('No delete buttons found.');
    }
});