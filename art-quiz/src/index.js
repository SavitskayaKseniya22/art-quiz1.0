import './styles.scss'
import {
    makeCat,
    getImgs,
    makeCatQuestion,
    mainBlock

} from './category.js';
import {
    images
} from './images.js';
import {
    makeArtistsQuestions,
    getAllAuthors
} from './questions.js';

getImgs().then(value => {
    makeCat(value, "Artists")
    makeCat(value, "Paintings")
    makeArtistsQuestions(value, images, mainBlock)
    makeCatQuestion()
    getAllAuthors(images)
}, reason => {
    // отклонение
});

//console.log(images)