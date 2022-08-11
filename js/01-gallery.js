import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);
galleryRef.addEventListener("click", onClickShowLargeImg);

const instance = basicLightbox.create(
  `
     <img src="">
  `,
  {
    onShow: () => {
      window.addEventListener("keydown", onClosePressEsc);
    },
    onClose: () => {
      window.removeEventListener("keydown", onClosePressEsc);
    },
  }
);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
		<div class="gallery__item">
  	 <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onClickShowLargeImg(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  instance.element().querySelector("img").src = e.target.dataset.source;
  instance.show();
}

function onClosePressEsc(e) {
  if (e.code === "Escape") {
    instance.close();
    console.log(e);
  }
}
