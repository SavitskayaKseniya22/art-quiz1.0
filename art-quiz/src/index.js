import "./styles.scss";
import {
  makeCat,
  getImgs,
  mainBlock
} from "./category.js";
import {
  images
} from "./images.js";
import {
  fillPaintingsCat,
  fillArtistsCat
} from "./questions.js";

getImgs().then((value) => {
  makeCat(value, "Artists");
  makeCat(value, "Paintings");
  fillArtistsCat(value, images, mainBlock);
  fillPaintingsCat(value, images, mainBlock);
});

//console.log(images)