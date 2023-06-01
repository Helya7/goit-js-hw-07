import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryListEl = document.querySelector('.gallery');

const photos = galleryItems.map((photo) => 
  `
  <li class="gallery__item">
    <a class="gallery__link" href="${photo.original}">
      <img class="gallery__image" src="${photo.preview}" alt="${photo.description}" />
    </a>
  </li>
  `
).join("");

galleryListEl.insertAdjacentHTML("afterbegin", photos);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250
});

galleryListEl.addEventListener('click', onPreviewImage);

function onPreviewImage(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  lightbox.open({ startIndex: event.target.parentNode.parentNode.dataset.index });
}
