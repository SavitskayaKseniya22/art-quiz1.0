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
  fillArtistsCat,
  getAllImages
} from "./questions.js";

getImgs().then((value) => {
  makeCat(value, "Artists");
  makeCat(value, "Paintings");
  getAllImages(value, images).then((res) => {
    fillArtistsCat(images, mainBlock, res);
    fillPaintingsCat(value, mainBlock, res);
  })

});

//console.log(images)