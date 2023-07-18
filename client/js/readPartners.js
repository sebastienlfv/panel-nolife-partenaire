const urlAPIpartner = 'https://ip104.ip-149-202-87.eu:5000/api/'
// const urlAPIpanel = 'http://localhost:3500/api/'

const noPartners = document.querySelector('.no-partners')
const listPartners = document.querySelector('.list-partners')

const token = localStorage.getItem('token')
if(token === null) {
  window.location.href = '../client/connect.html'
}

axios.get(urlAPIpartner + 'partner')
  .then(partners => {
    console.log('API partenaires', partners);

    if(partners.data.length === 0) {
      noPartners.style.display = 'flex'
      listPartners.style.display = 'none'
    }

    const listPartners = document.querySelector('.list-partners')

    for (var i =0; i < partners.data.length; i++) {
      console.log('count');

      const partnerContainer = document.createElement('div')
      partnerContainer.classList.add('partner-container')
      listPartners.appendChild(partnerContainer)

      const imgPartner = document.createElement('img')
      imgPartner.src = partners.data[i].partner_picture 
      partnerContainer.appendChild(imgPartner)


      const divPartner = document.createElement('div')
      listPartners.appendChild(divPartner)
      partnerContainer.appendChild(divPartner)

      const pseudoPartner = document.createElement('p')
      pseudoPartner.innerHTML = partners.data[i].partner_pseudo 
      divPartner.appendChild(pseudoPartner)

      const twitchLink = document.createElement('a')
      twitchLink.href = partners.data[i].partner_twitch 
      twitchLink.target = 'blank'
      divPartner.appendChild(twitchLink)

      const twitchIcon = document.createElement('i')
      twitchIcon.classList.add('fa-brands')
      twitchIcon.classList.add('fa-twitch')
      twitchLink.appendChild(twitchIcon)

    }
  })
  .catch(err => {
    console.log(err);
  })
