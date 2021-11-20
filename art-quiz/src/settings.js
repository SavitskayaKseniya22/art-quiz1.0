export class Settings {

    constructor() {
        this._soundEffects = false;
        this._music = false;

        this._timer = false;

        this._timerValue = 15;
        this._timerStep = 5;

        this._language = "en";


        //кнопка отключить\включить звук
        let music = document.querySelector("input[id='toggle-button-music']")
        let audioMusic = document.querySelector("audio.music");
        let volumeMusic = document.querySelector(".volumeMusic")
        audioMusic.volume = 0.2;
        volumeMusic.value = audioMusic.volume;
        let tempVol;

        //кнопка сделать активным инпут рендж

        volumeMusic.addEventListener("input", function () {
            audioMusic.volume = volumeMusic.value
            tempVol = audioMusic.volume;
            if (audioMusic.volume == 0) {
                audioMusic.muted = true;
                musicMuteBut.style.backgroundImage = 'url("./images/volumeOfActive.svg")';
                musicLoudBut.style.backgroundImage = "url('./images/volumeOn.svg')";

            } else if (audioMusic.volume == 1) {

                musicLoudBut.style.backgroundImage = 'url("./images/volumeOnActive.svg")';
                musicMuteBut.style.backgroundImage = "url('./images/volumeOf.svg')";

            } else {
                audioMusic.muted = false;
                musicMuteBut.style.backgroundImage = "url('./images/volumeOf.svg')";
                musicLoudBut.style.backgroundImage = "url('./images/volumeOn.svg')";
            }
        })
        //кнопка сделать громкость минимальной
        let musicMuteBut = document.querySelector(".musicSet .but-volume-off ")
        musicMuteBut.addEventListener("click", function () {
            if (audioMusic.muted && audioMusic.volume > 0) {
                musicMuteBut.style.backgroundImage = 'url("./images/volumeOf.svg")'
                audioMusic.muted = false;
                volumeMusic.value = audioMusic.volume;
            } else {

                musicMuteBut.style.backgroundImage = 'url("./images/volumeOfActive.svg")';
                musicLoudBut.style.backgroundImage = 'url("./images/volumeOn.svg")';
                audioMusic.muted = true;
                volumeMusic.value = 0;
            }
        })


        //кнопка сделать громкость максимальной
        let musicLoudBut = document.querySelector(".musicSet .but-volume-on")
        musicLoudBut.addEventListener("click", function () {
            volumeMusic.classList.toggle("loud")
            if (volumeMusic.classList.contains("loud")) {
                musicLoudBut.style.backgroundImage = 'url("./images/volumeOnActive.svg")';
                if (audioMusic.muted) {
                    audioMusic.muted = false;
                    musicMuteBut.style.backgroundImage = 'url("./images/volumeOf.svg")';
                }
                tempVol = audioMusic.volume;
                audioMusic.volume = 1;
                volumeMusic.value = audioMusic.volume;
            } else {
                audioMusic.volume = tempVol;
                musicLoudBut.style.backgroundImage = 'url("./images/volumeOn.svg")';

            }
            volumeMusic.value = audioMusic.volume;
        })





        //отключить музыку\включить музыку
        let musicSet = document.querySelector(".musicSet")

        music.onchange = function () {
            this.music = music.checked;
            if (this.music == false) {
                audioMusic.pause()
                volumeMusic.setAttribute("disabled", "true");
                musicSet.style.opacity = "0.5"
            } else {
                audioMusic.play()
                volumeMusic.removeAttribute("disabled");
                musicSet.style.opacity = "1"
            }
        }














        let soundEffects = document.querySelector("input[id='toggle-button-soundEffects']")
        soundEffects.onchange = function () {
            this.soundEffects = soundEffects.checked;
            alert(this.soundEffects)

        }














        let timerSet = document.querySelector(".timerSet")
        let timer = document.querySelector("input[id='toggle-button-timer']")
        let timeToAnswer = document.querySelector(".timeToAnswer")
        timeToAnswer.value = this.timerValue
        timer.onchange = function () {
            this.timer = timer.checked;



            if (this.timer == false) {

                timeToAnswer.setAttribute("disabled", "true");
                timerSet.style.opacity = "0.5"
            } else {

                timeToAnswer.removeAttribute("disabled");
                timerSet.style.opacity = "1"
            }

        }

        let timerSetDown = document.querySelector(".timerSet .but-time-down")
        let timerSetUp = document.querySelector(".timerSet .but-time-up")




        timerSetDown.onclick = function () {

            if (this.timerValue >= 10 && this.timerValue <= 35)
                this.timerValue -= this.timerStep;

            timeToAnswer.value = this.timerValue
        }
        timerSetUp.onclick = function () {

            if (this.timerValue >= 0 && this.timerValue <= 25)
                this.timerValue += this.timerStep;

            timeToAnswer.value = this.timerValue
        }




















        let languages = document.querySelectorAll("input[name='radioButtonLang']")
        for (let item of languages) {
            item.onchange = function () {
                this.language = item.value;
                //alert(this.language)

            }
        }




    }
    set music(value) {
        this._music = value;
    }
    get music() {
        return this._music
    }

    set soundEffects(value) {
        this._soundEffects = value;
    }
    get soundEffects() {
        return this._soundEffects
    }

    set timer(value) {
        this._timer = value;
    }
    get timer() {
        return this._timer
    }

    set language(value) {
        this._language = value;
    }
    get language() {
        return this._language
    }

    set timerValue(value) {
        this._timerValue = value;
    }
    get timerValue() {
        return this._timerValue
    }

    set timerStep(value) {
        this._timerStep = value;
    }
    get timerStep() {
        return this._timerStep
    }


    method2() {}
    method3() {}

}