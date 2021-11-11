class Category {
    constructor(value, type, insertBlock) {
        this.value = value;
        this.type = type;
        this.insertBlock = type;
    }
    method1() {}
    method2() {}
    method3() {}

}
let choosenCats = document.querySelectorAll(".quiz-type h2")

for (const elem of choosenCats) {
    elem.addEventListener("click", function (event) {


    })
}



export function makeCat(arr, catName) {
    let ul = document.createElement("ul")
    ul.classList.add("cat-list")
    for (let i = 1; i <= 12; i++) {
        let li = document.createElement("li");
        li.classList.add("cat");
        li.classList.add(`cat${i}`);

        let h3 = document.createElement("h3");
        h3.textContent = `Category ${i}`
        li.appendChild(h3);

        let img = document.createElement("img");
        console.log(arr)
        if (catName == "artists") {
            img.src = arr[i]
        } else {
            img.src = arr[i + 12]
        }

        li.appendChild(img);

        ul.appendChild(li)
    }
    let mainBlock = document.querySelector("main")
    mainBlock.appendChild(ul)
}

export async function getImgs() {
    let arrImgs = [];
    for (let i = 1; i <= 240; i++) {
        arrImgs.push(`https://raw.githubusercontent.com/irinainina/image-data/dadea6e2555841b3f136d8ab07ce6474391f1a3f/img/${i}.jpg`)
    }
    return arrImgs
}