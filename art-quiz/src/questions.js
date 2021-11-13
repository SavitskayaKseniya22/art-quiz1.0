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

    let mainLi = document.createElement("li");

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
      mainLi.appendChild(elem);
    }
    if (this.block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")
    }
    this.block.appendChild(mainLi);
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

    block.appendChild(ul);
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
    let img = document.createElement("img");
    img.src = this.pic;
    mainLi.appendChild(img);
    let ul = document.createElement("ul");
    ul.classList.add("possibleAnswer");
    mainLi.appendChild(ul);
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
      ul.appendChild(elem);
    }
    if (this.block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")
    }


    this.block.appendChild(mainLi);

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

    block.appendChild(ul);
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

    this.pic = obj.pic;
    this.author = obj.desc.author;
    this.name = obj.desc.name;
    this.year = obj.desc.year;
    this.result = result
    this.func = func

    let div = document.createElement("div");
    div.classList.add("tempDiv")
    let img = document.createElement("img");
    img.src = this.pic;

    let h2 = document.createElement("h2");
    h2.textContent = `"${this.name}"`
    let h3 = document.createElement("h3");
    h3.textContent = this.author

    let span = document.createElement("span");
    span.textContent = this.year;

    div.appendChild(img)
    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(span)

    let imgResult = document.createElement("img");
    if (result == "true") {

      imgResult.src = "./images/check-mark.svg"
    } else {
      imgResult.src = "./images/x-mark.svg"
    }
    let button = document.createElement("button");
    button.addEventListener("click", this.func)
    button.value = "Next question";
    button.textContent = "Next question"
    button.classList.add("nextQButton")
    div.appendChild(button)
    div.appendChild(imgResult)

    block.appendChild(div)
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