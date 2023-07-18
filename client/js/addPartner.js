const urlAPIPartner = 'https://ip104.ip-149-202-87.eu:5000/api/'
const addPartner = document.querySelector('.addPartner')

const token = localStorage.getItem('token')
if(token === null) {
  window.location.href = '../client/connect.html'
}

addPartner.addEventListener('click', () => {
  const pseudoInput = document.querySelector('.pseudoInput')
  const twitchInput = document.querySelector('.twitchInput')
  const imgInput = document.querySelector('.imgInput')

  const header = { header: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }}

  const payload = {
    partner_pseudo: pseudoInput.value,
    partner_twitch: twitchInput.value,
    partner_picture: imgInput.value
  }

  axios.post(urlAPIPartner + 'partner', payload, header)
    .then(() => {
      window.location.href = '/'
    })
    .catch((err) => {
      alert('Une erreur est survenue')
      console.log(err);
    })
})