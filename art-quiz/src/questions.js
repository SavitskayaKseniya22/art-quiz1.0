import {
    images
} from './images.js';




class Picture {
    constructor(pic, desc) {
        this.pic = pic;
        this.desc = desc;

    }
    get author() {
        return this.desc.author
    }
    get name() {
        return this.desc.name
    }
    get year() {
        return this.desc.year
    }

}
class QuestionArtist {
    constructor(obj) {
        this.obj = obj;
        this.desc = desc;

    }
}

function makeAllImages(arrPic, arrDesc) {
    let allImages = [];
    for (let i = 0; i < arrPic.length; i++) {
        allImages.push(new Picture(arrPic[i], arrDesc[i]))
    }
    return allImages;

}
export function getAllAuthors(arrDesc) {
    let authors = [];
    console.log(arrDesc)
    for (let i = 0; i < arrDesc.length; i++) {
        authors.push(arrDesc[i].author)
    }
    console.log(authors)
    return authors

}
export function makeArtistsQuestion(arrPic, arrDesc) {
    //console.log(arrPic)
    //console.log(arrDesc)
    //console.log(makeAllImages(arrPic, arrDesc))

    let arr = makeAllImages(arrPic, arrDesc);
    console.log(arr[0].name)


}