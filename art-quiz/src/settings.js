export class Settings {

    constructor() {
        this.soundEffects = false;
        this.volumeSoundEffects = 0;

        this._volumeMusic = false;

        this._timer = false;
        this.timerStep = 15;

        this._language = "en";



        let music = document.querySelector("input[id='toggle-button-music']")
        music.onchange = function () {
            this.volumeMusic = music.checked;
            //alert(this.volumeMusic)

        }

        let timer = document.querySelector("input[id='toggle-button-timer']")
        timer.onchange = function () {
            this.timer = timer.checked;
            // alert(this.timer)

        }

        let languages = document.querySelectorAll("input[name='radioButtonLang']")
        for (let item of languages) {
            item.onchange = function () {
                this.language = item.value;
                alert(this.language)

            }
        }




    }
    set volumeMusic(value) {
        this._volumeMusic = value;
    }
    get volumeMusic() {
        return this._volumeMusic
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


    method2() {}
    method3() {}

}