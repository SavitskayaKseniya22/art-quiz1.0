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
class QuestionPaintings {
    constructor(obj, block, arr) {
        this.pic = obj.pic;
        this.block = block
        this.arr = arr


        let mainLi = document.createElement("li");

        let liArr = [];
        let img = document.createElement("img");
        img.src = this.pic;

        liArr.push(img)

        for (let i = 0; i < 3; i++) {
            let img = document.createElement("img");
            img.src = this.arr[random(240)]
            liArr.push(img)
        }
        shuffle(liArr)

        for (let i = 0; i < liArr.length; i++) {
            mainLi.appendChild(liArr[i])
        }
        this.block.appendChild(mainLi)
    }
}

function makePaintingsQuestion(arrPic, arrDesc, block, i) {

    let arrImgs = getAllImages(arrPic, arrDesc);
    let arrAuthors = getAllAuthors(arrDesc)
    return (new QuestionPaintings(arrImgs[i], block, arrPic))


}

export function fillPaintingsCat(arrPic, arrDesc, block) {
    let k = 120;
    for (let j = 0; j < 12; j++) {
        let ul1 = document.createElement("ul")

        for (let i = 0; i < 10; i++) {
            makePaintingsQuestion(arrPic, arrDesc, ul1, k)
            k++;
        }

        block.appendChild(ul1)
    }

}


class QuestionArtist {
    constructor(obj, block, arr) {
        this.pic = obj.pic;
        this.desc = obj.desc;
        this.block = block
        this.arr = arr

        let mainLi = document.createElement("li");
        let img = document.createElement("img");
        img.src = this.pic;
        mainLi.appendChild(img)
        let ul = document.createElement("ul");
        ul.classList.add("catSingle")
        mainLi.appendChild(ul)
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
            liArr[i].classList.add("catSingleElem")
            ul.appendChild(liArr[i])
        }
        this.block.appendChild(mainLi)
    }
}

function getAllImages(arrPic, arrDesc) {
    let allImages = [];
    for (let i = 0; i < arrPic.length; i++) {
        allImages.push(new Picture(arrPic[i], arrDesc[i]))
    }
    return allImages;
}

function getAllAuthors(arrDesc) {
    let authors = [];
    for (let i = 0; i < arrDesc.length; i++) {
        authors.push(arrDesc[i].author)
    }
    return authors

}

function makeArtistsQuestion(arrPic, arrDesc, block, i) {

    let arrImgs = getAllImages(arrPic, arrDesc);
    let arrAuthors = getAllAuthors(arrDesc)
    return (new QuestionArtist(arrImgs[i], block, arrAuthors))


}

export function fillArtistsCat(arrPic, arrDesc, block) {
    let k = 0;
    for (let j = 0; j < 12; j++) {
        let ul1 = document.createElement("ul")

        for (let i = 0; i < 10; i++) {
            makeArtistsQuestion(arrPic, arrDesc, ul1, k)
            k++;
        }

        block.appendChild(ul1)
    }

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