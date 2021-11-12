import './styles.scss'
import {
    makeCat,
    getImgs,
    mainBlock

} from './category.js';
import {
    images
} from './images.js';
import {

    fillArtistsCat,

} from './questions.js';

getImgs().then(value => {
    makeCat(value, "Artists")
    makeCat(value, "Paintings")
    fillArtistsCat(value, images, mainBlock)



}, reason => {
    // отклонение
});

//console.log(images)