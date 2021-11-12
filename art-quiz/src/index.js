import './styles.scss'
import {
    makeCat,
    getImgs,
    makeCatQuestion

} from './category.js';
import {
    images
} from './images.js';
import {
    makeArtistsQuestion,
    getAllAuthors
} from './questions.js';

getImgs().then(value => {
    makeCat(value, "Artists")
    makeCat(value, "Paintings")
    makeArtistsQuestion(value, images)
    makeCatQuestion()
    getAllAuthors(images)
}, reason => {
    // отклонение
});

//console.log(images)