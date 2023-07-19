const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('userId');
const logoutButton = document.querySelector('.logout')

if (!isLoggedIn) {
    // Utilisateur non connecté
    window.location.href = '../client/login.html'
}

logoutButton.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = '../client/login.html'
})