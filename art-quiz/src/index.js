import "./styles.scss";
import {
  makeCat,
  getImgs,
  mainBlock,

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
    fillArtistsCat(mainBlock, res);
    fillPaintingsCat(mainBlock, res);
  })

});

//console.log(images)