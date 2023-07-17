const submitLogin = document.querySelector('.login-submit')
const url = 'http://localhost:3500'

function login(e) {

  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  const API = url + '/api/auth/login'
  const statusLogin = document.querySelector('.status-logins')

  const xhttp = new XMLHttpRequest()
  xhttp.open('POST', API)
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhttp.send(JSON.stringify({
    'email': email,
    'password': password
  }))
  xhttp.onreadystatechange = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)
      window.location.href = '/index.html'
    } else if (this.status === 404) {
      console.log('Compte introuvable !');
      statusLogin.innerHTML = 'Compte introuvable !'
      statusLogin.style.color = 'red'
      statusLogin.style.marginTop = '10px'
    } else if (this.status === 403) {
      console.log('Mot de passe incorrect !');
      statusLogin.innerHTML = 'Mot de passe incorrect !'
      statusLogin.style.color = 'orange'
      statusLogin.style.marginTop = '10px'
    }
  }
  return false
}