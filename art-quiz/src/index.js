import './styles.scss'
import {
    makeCat,
    getImgs
} from './category.js';
import {
    images
} from './images.js';

getImgs().then(value => {
    makeCat(value, "artists")
    makeCat(value, "paintings")
}, reason => {
    // отклонение
});

console.log(images)