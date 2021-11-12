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
    constructor(obj, block) {
        this.pic = obj.pic;
        this.desc = obj.desc;
        this.block = block

        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = this.pic;
        div.appendChild(img)
        let ul = document.createElement("ul");
        div.appendChild(ul)

        let li = document.createElement("li");
        li.textContent = this.desc.author

        ul.appendChild(li)
        this.block.appendChild(div)

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
    //console.log(arrDesc)
    for (let i = 0; i < arrDesc.length; i++) {
        authors.push(arrDesc[i].author)
    }
    //console.log(authors)
    return authors

}
export function makeArtistsQuestions(arrPic, arrDesc, block) {
    //console.log(arrPic)
    //console.log(arrDesc)
    //console.log(makeAllImages(arrPic, arrDesc))

    let arr = makeAllImages(arrPic, arrDesc);

    return (new QuestionArtist(arr[0], block))


}