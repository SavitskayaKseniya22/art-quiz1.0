class Category {
    constructor(question, type, insertBlock) {
        this.question = question;
        this.type = type;
        this.insertBlock = type;
    }
    method1() {}
    method2() {}
    method3() {}

}
let choosenCats = document.querySelectorAll(".quiz-type h2")
let quizType = document.querySelector(".quiz-type")
export let mainBlock = document.querySelector("main")
let backHomeButton = document.querySelector(".back-home-button")
for (const elem of choosenCats) {
    elem.addEventListener("click", function (event) {
        quizType.classList.add("displayNone")
        mainBlock.classList.add("main-not-centered")
        let list = document.querySelector(`.${event.target.textContent}`)
        list.classList.remove("displayNone")
        backHomeButton.classList.remove("displayNone")

    })
}
backHomeButton.addEventListener("click", function () {
    quizType.classList.remove("displayNone")
    mainBlock.classList.remove("main-not-centered")
    let list = document.querySelectorAll(".cat-list")
    for (const elem of list) {
        elem.classList.add("displayNone")
    }
    backHomeButton.classList.add("displayNone")

})



export function makeCat(arr, catName) {
    let ul = document.createElement("ul")
    ul.classList.add("cat-list")
    ul.classList.add(catName)
    ul.classList.add("displayNone")
    for (let i = 0; i < 12; i++) {
        let li = document.createElement("li");
        li.classList.add("cat");
        li.classList.add(`cat${i}`);

        let h3 = document.createElement("h3");
        h3.textContent = `Round ${i+1}`
        li.appendChild(h3);

        let img = document.createElement("img");

        if (catName == "Artists") {
            img.src = arr[i]
        } else {
            img.src = arr[i + 12]
        }

        li.appendChild(img);

        ul.appendChild(li)
    }

    mainBlock.appendChild(ul)
}

export async function getImgs() {
    let arrImgs = [];
    for (let i = 0; i <= 240; i++) {
        arrImgs.push(`https://raw.githubusercontent.com/irinainina/image-data/dadea6e2555841b3f136d8ab07ce6474391f1a3f/img/${i}.jpg`)
    }
    return arrImgs
}

export function makeCatQuestion(arr, catName) {
    for (let j = 0; j < 12; j++) {
        let ul = document.createElement("ul")

        for (let i = 1; i <= 10; i++) {
            let li = document.createElement("li");
            ul.appendChild(li)
        }

        mainBlock.appendChild(ul)
    }

}