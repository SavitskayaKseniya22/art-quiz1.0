import './styles.scss'
import {
    makeCat,
    getImgs
} from './category.js';
import {
    images
} from './images.js';

getImgs().then(value => {
    makeCat(value, "Artists")
    makeCat(value, "Paintings")
}, reason => {
    // отклонение
});

//console.log(images)