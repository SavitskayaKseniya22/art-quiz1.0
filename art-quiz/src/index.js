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
  Settings
} from "./settings.js";
import {

  fillCat,
  getAllImages,
  QuestionArtist,
  QuestionPaintings
} from "./questions.js";


getImgs().then((value) => {
  makeCat(value, "Artists");
  makeCat(value, "Paintings");
  getAllImages(value, images).then((res) => {
    fillCat(mainBlock, res, QuestionArtist, "textContent", 0);
    fillCat(mainBlock, res, QuestionPaintings, "src", 120);

  })

});
new Settings;