class Picture {
  constructor(pic, desc) {
    this.pic = pic;
    this.desc = desc;
  }
  get author() {
    return this.desc.author;
  }
  get name() {
    return this.desc.name;
  }
  get year() {
    return this.desc.year;
  }
}

function getAllImages(arrPic, arrDesc) {
  let allImages = [];
  for (let i = 0; i < arrPic.length; i++) {
    allImages.push(new Picture(arrPic[i], arrDesc[i]));
  }
  return allImages;
}

function getAllAuthors(arrDesc) {
  let authors = [];
  for (let i = 0; i < arrDesc.length; i++) {
    authors.push(arrDesc[i].author);
  }
  return authors;
}












class QuestionPaintings {
  constructor(obj, block, arr) {
    this._pic = obj.pic;
    this.desc = obj.desc;
    this.block = block;
    this.arr = arr;
    this.author = obj.desc.author;

    console.log(this.author)

    let mainLi = document.createElement("li");
    mainLi.classList.add("questionCard");

    let h2 = document.createElement("h2")
    h2.textContent = `Which of these paintings did ${this.author} paint?`

    mainLi.append(h2);


    this._liArr = [];
    let img = document.createElement("img");
    img.src = this._pic;

    this._liArr.push(img);

    for (let i = 0; i < 3; i++) {
      let img = document.createElement("img");
      img.src = this.arr[random(240)];
      this._liArr.push(img);
    }
    shuffle(this._liArr);

    for (let elem of this._liArr) {
      mainLi.append(elem);
    }
    if (this.block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")
    }

    this.block.append(mainLi);
  }
  get pic() {
    return this._pic
  }
  get liArr() {
    return this._liArr
  }
}

function makePaintingsQuestion(arrPic, arrDesc, block, i) {
  let arrImgs = getAllImages(arrPic, arrDesc);
  return new QuestionPaintings(arrImgs[i], block, arrPic);
}


export function fillPaintingsCat(arrPic, arrDesc, block) {
  let k = 120;
  for (let j = 1; j <= 12; j++) {
    let ul = document.createElement("ul");
    ul.classList.add(`catContent${j}`);
    ul.classList.add("cat");
    ul.classList.add("cat2");
    ul.classList.add("displayNone");
    for (let i = 0; i < 10; i++) {
      let obj = makePaintingsQuestion(arrPic, arrDesc, ul, k);
      for (let elem of obj.liArr) {
        elem.addEventListener("click", function () {

          if (elem.src == obj.pic) {

            printCard(elem, obj, "true", getNext)
          } else {

            printCard(elem, obj, "false", getNext)
          }
        })
      }
      k++;
    }

    block.append(ul);
  }
}














class QuestionArtist {
  constructor(obj, block, arr) {
    this.pic = obj.pic;
    this.desc = obj.desc;
    this.block = block;
    this.arr = arr;
    this._rightAnswer = this.desc.author;

    let mainLi = document.createElement("li");
    mainLi.classList.add("questionCard")

    let h2 = document.createElement("h2")
    h2.textContent = "Who is the author of the painting?";


    let img = document.createElement("img");
    img.src = this.pic;


    let ul = document.createElement("ul");
    ul.classList.add("possibleAnswers");
    mainLi.append(h2, img, ul);



    this._liArr = [];
    let li = document.createElement("li");
    li.textContent = this.desc.author;
    this._liArr.push(li);

    for (let i = 0; i < 3; i++) {
      let li = document.createElement("li");
      li.textContent = this.arr[random(240)];
      this._liArr.push(li);
    }
    shuffle(this._liArr);
    for (let elem of this._liArr) {
      elem.classList.add("possibleAnswerElem");
      ul.append(elem);
    }
    if (this.block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")

    }


    this.block.append(mainLi);

  }
  get rightAnswer() {
    return this._rightAnswer
  }
  get liArr() {
    return this._liArr
  }

}

function makeArtistsQuestion(arrPic, arrDesc, block, i) {
  let arrImgs = getAllImages(arrPic, arrDesc);
  let arrAuthors = getAllAuthors(arrDesc);
  return new QuestionArtist(arrImgs[i], block, arrAuthors);
}

export function fillArtistsCat(arrPic, arrDesc, block) {
  let k = 0;
  for (let j = 1; j <= 12; j++) {
    let ul = document.createElement("ul");
    ul.classList.add(`catContent${j}`);
    ul.classList.add("cat1");
    ul.classList.add("cat");
    ul.classList.add("displayNone");

    for (let i = 0; i < 10; i++) {
      let obj = makeArtistsQuestion(arrPic, arrDesc, ul, k);

      for (let elem of obj.liArr) {
        elem.addEventListener("click", function () {


          if (elem.textContent == obj.rightAnswer) {

            printCard(elem.parentNode, obj, "true", getNext)

          } else {
            printCard(elem.parentNode, obj, "false", getNext)
          }
        })
      }
      k++;
    }

    block.append(ul);
  }
}

function printCard(elem, obj, result, func) {
  for (let item of elem.parentNode.childNodes) {
    item.classList.add("displayNone")
  }
  new Card(obj, elem.parentNode, result, func)
}

function getNext() {
  let tempDiv = document.querySelector(".tempDiv")
  tempDiv.classList.remove("tempDiv")
  tempDiv.parentNode.classList.add("displayNone")
  tempDiv.parentNode.classList.add("complete")
  if (tempDiv.parentNode.nextSibling) {
    tempDiv.parentNode.nextSibling.classList.remove("displayNone")
  }

}









function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function random(max) {
  let arr = [];
  let i = 0;
  while (i < max) {
    arr.push(i);
    i++;
  }
  shuffle(arr);
  return arr[0];
}

class Card {
  constructor(obj, block, result, func) {

    //this.obj = obj;
    this.pic = obj.pic;
    this.author = obj.desc.author;
    this.name = obj.desc.name;
    this.year = obj.desc.year;
    this.result = result
    this.func = func;
    this.imageNum = obj.desc.imageNum;

    console.log(this.imageNum)
    let div = document.createElement("div");
    div.classList.add("tempDiv")
    let img = document.createElement("img");
    img.src = this.pic;
    //img.src = `https://raw.githubusercontent.com/irinainina/image-data/dadea6e2555841b3f136d8ab07ce6474391f1a3f/full/${this.imageNum}full.jpg`
    let divCont = document.createElement("div");
    divCont.classList.add("tempDivCont")

    let h2 = document.createElement("h2");
    h2.textContent = `"${this.name}"`
    let h3 = document.createElement("h3");
    h3.textContent = this.author

    let span = document.createElement("span");
    span.textContent = this.year;





    let imgResult = document.createElement("img");
    imgResult.classList.add("imgResult")
    if (result == "true") {

      setTimeout(() => {
        imgResult.style.backgroundColor = "GREEN";
        imgResult.style.transform = "scale(2)"
      }, 100);
      imgResult.src = "./images/correct-right-arrow-direction-left-down-up-svgrepo-com.svg"
    } else {

      setTimeout(() => {
        imgResult.style.backgroundColor = "RED";
        imgResult.style.transform = "scale(2)"
      }, 100);
      imgResult.src = "./images/wrong-delete-remove-trash-minus-cancel-close-svgrepo-com.svg"
    }
    let nextQButton = document.createElement("button");
    nextQButton.addEventListener("click", this.func)
    nextQButton.classList.add("nextQButton")
    setTimeout(() => {
      nextQButton.style.transform = "translateX(20px)"
      setTimeout(() => {
        nextQButton.style.transform = "scale(2)"
      }, 200);
    }, 400);


    divCont.append(h2, h3, span, nextQButton, imgResult)
    div.append(img, divCont)
    block.append(div)
  }
  /*
  get author() {
    return this.obj.desc.author;
  }
  get name() {
    return this.obj.desc.name;
  }
  get year() {
    return this.obj.desc.year;
  }*/
}