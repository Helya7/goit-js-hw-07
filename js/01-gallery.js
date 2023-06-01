import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryListEl = document.querySelector('.gallery');

const photos = galleryItems.map((photo) => 
  `
  <li class="gallery__item">
    <a class="gallery__link" href="${photo.original}">
      <img class="gallery__image" src="${photo.preview}" data-source="${photo.original}" alt="${photo.description}">
    </a>
  </li>
  `
).join("");

galleryListEl.insertAdjacentHTML("afterbegin", photos);

galleryListEl.addEventListener('click', onPreviewImage);

function onPreviewImage(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const originalPhoto = galleryItems.find((photo) => photo.original === event.target.dataset.source);

  const instance = basicLightbox.create(
    `<img src="${originalPhoto.original}" width="800" height="600">`,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', onEscapeKey);
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscapeKey);
      }
    }
  );

  instance.show();

  function onEscapeKey(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}

