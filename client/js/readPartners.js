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

      const deleteIcon = document.createElement('i')
      deleteIcon.classList.add('fa-solid')
      deleteIcon.classList.add('fa-xmark')
      deleteIcon.dataset.id = partners.data[i].id
      divPartner.appendChild(deleteIcon)

      deleteIcon.addEventListener('click', (event) => {
        const id = event.target.dataset.id
        console.log('id du partenaire', id)

        if(window.confirm('Êtes-vous sûr de vouloir supprimer ce partenaire?')) {
          axios.delete(urlAPIpartner + 'partner/' + id, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
              console.log('Partenaire supprimé:', response);
              window.location.reload()
            })
            .catch(err => {
              console.error('Erreur lors de la suppression du partenaire:', err);
            });
        }        
      })

      const editIcon = document.createElement('i');
      editIcon.classList.add('fa-solid');
      editIcon.classList.add('fa-edit');
      editIcon.dataset.id = partners.data[i].id;
      divPartner.appendChild(editIcon);

      editIcon.addEventListener('click', (event) => {
        const id = event.target.dataset.id
        console.log('id du partenaire', id);

        // Récupérer les informations actuelles du partenaire
        const currentPartner = partners.data.find(partner => partner.id == id);

        // Remplir les champs d'entrée avec les informations actuelles
        document.getElementById('partner-picture').value = currentPartner.partner_picture;
        document.getElementById('partner-pseudo').value = currentPartner.partner_pseudo;
        document.getElementById('partner-twitch').value = currentPartner.partner_twitch;

        // Afficher la modale
        document.getElementById('editModal').style.display = 'block';
        document.querySelector('.closeEdit').addEventListener('click', () => {
          document.getElementById('editModal').style.display = 'none';
        })

        document.getElementById('editForm').addEventListener('submit', (event) => {
          event.preventDefault();
        
          // Récupérer les nouvelles valeurs du formulaire
          let newPartnerData = {
            partner_picture: document.getElementById('partner-picture').value,
            partner_pseudo: document.getElementById('partner-pseudo').value,
            partner_twitch: document.getElementById('partner-twitch').value,
          };
        
          // Si un champ est vide, le remplacer par l'information actuelle
          if (!newPartnerData.partner_picture) newPartnerData.partner_picture = currentPartner.partner_picture;
          if (!newPartnerData.partner_pseudo) newPartnerData.partner_pseudo = currentPartner.partner_pseudo;
          if (!newPartnerData.partner_twitch) newPartnerData.partner_twitch = currentPartner.partner_twitch;
        
          // Envoie une requête PUT ou PATCH à l'API pour mettre à jour le partenaire
          axios.put(urlAPIpartner + 'partner/' + id, newPartnerData, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
              console.log('Partenaire modifié:', response);
        
              // Fermer la modale et recharger la page
              document.getElementById('editModal').style.display = 'none';
              window.location.reload();
            })
            .catch(err => {
              console.error('Erreur lors de la modification du partenaire:', err);
            });
        });        
      })
    }
  })
  .catch(err => {
    console.log(err);
  })
