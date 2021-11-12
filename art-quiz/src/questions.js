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
    constructor(obj, block, arr) {
        this.pic = obj.pic;
        this.desc = obj.desc;
        this.block = block
        this.arr = arr

        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = this.pic;
        div.appendChild(img)
        let ul = document.createElement("ul");
        div.appendChild(ul)
        let liArr = [];

        let li = document.createElement("li");
        li.textContent = this.desc.author;
        liArr.push(li)

        for (let i = 0; i < 3; i++) {
            let li = document.createElement("li");
            li.textContent = this.arr[random(240)]
            liArr.push(li)
        }
        shuffle(liArr)
        for (let i = 0; i < liArr.length; i++) {
            ul.appendChild(liArr[i])
        }
        this.block.appendChild(div)

    }
}

function getAllImages(arrPic, arrDesc) {
    let allImages = [];
    for (let i = 0; i < arrPic.length; i++) {
        allImages.push(new Picture(arrPic[i], arrDesc[i]))
    }
    return allImages;

}
export function getAllAuthors(arrDesc) {
    let authors = [];
    for (let i = 0; i < arrDesc.length; i++) {
        authors.push(arrDesc[i].author)
    }
    return authors

}
export function makeArtistsQuestions(arrPic, arrDesc, block) {


    let arrImgs = getAllImages(arrPic, arrDesc);
    let arrAuthors = getAllAuthors(arrDesc)
    return (new QuestionArtist(arrImgs[0], block, arrAuthors))


}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

function random(max) {
    let arr = [];
    let i = 0;
    while (i < max) {
        arr.push(i)
        i++;
    }
    shuffle(arr)
    return arr[0]

}