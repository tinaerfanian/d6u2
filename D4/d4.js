
const API_KEY = 'yr7h7nY8NE2f3y4NZNOxmI7czZN8WvgvB3y992uNQQ6wyx2GNdgoeGsy';
const BASE_URL = 'https://api.pexels.com/v1/search';
const gallery = document.getElementById('image-gallery');
const searchInput = document.getElementById('search-input');
const loadImagesBtn = document.getElementById('load-images');
const loadSecondaryImagesBtn = document.getElementById('load-secondary-images');
const modalImage = document.getElementById('modal-image');


function createImageCard(photo) {
  const card = document.createElement('div');
  card.className = 'col-md-4';

  card.innerHTML = `
    <div class="card">
      <img src="${photo.src.medium}" class="card-img-top" style="height: 200px; width: auto; object-fit: fill;" alt="${photo.photographer}" data-id="${photo.id}">
      <div class="card-body">
        <h5 class="card-title">${photo.photographer}</h5>
        <p class="card-text">ID: ${photo.id}</p>
        <button class="btn btn-danger hide-btn">Hide</button>
      </div>
    </div>
  `;

  
  card.querySelector('.card-img-top').addEventListener('click', () => {
    openImageModal(photo.src.large);
  });

  card.querySelector('.hide-btn').addEventListener('click', () => {
    card.style.display = 'none';
  });

  gallery.appendChild(card);
}


async function fetchImages(query) {
  gallery.innerHTML = ''; 
  const response = await fetch(`${BASE_URL}?query=${query}`, {
    headers: {
      Authorization: API_KEY
    }
  });
  const data = await response.json();
  data.photos.forEach(photo => createImageCard(photo));
}


function openImageModal(imageSrc) {
  modalImage.src = imageSrc;
  $('#imageModal').modal('show');
}


loadImagesBtn.addEventListener('click', () => fetchImages(searchInput.value || 'nature'));
loadSecondaryImagesBtn.addEventListener('click', () => fetchImages('city'));


searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    fetchImages(searchInput.value);
  }
});
