const { createApp } = Vue;

const ctx = new AudioContext();
const gainNode = ctx.createGain();
gainNode.gain.value = 0.3;

const app = createApp({
    data(){
        return{
            isPlaying: false, //演奏中の判定
            oscillator: null, 
            downScale: false, //オクターブ調整
            prep: false, //key bool
            nowkey: "",
            button_state: "start", //button text
        }
    },
    methods:{
        PlayAudio(scale){
            this.oscillator = ctx.createOscillator(); //instance
            this.oscillator.type = "square"; //矩形波
            this.oscillator.frequency.setValueAtTime(scale, ctx.currentTime); //scaleで音の高さ
            this.oscillator.connect(gainNode).connect(ctx.destination); //音量調整
            this.oscillator.start(); //oscillator 動かす
            this.isPlaying = true; //演奏フラグ
        },
        StopAudio(){
            this.oscillator?.stop(); //oscillator 止める
            this.isPlaying = false;
        },
        keydown_audio(event){ //keyが押されたときに実行
            if(this.isPlaying && this.nowkey != event.key){
                this.StopAudio();
            }else if(this.isPlaying && this.nowkey == event.key){
                return;
            }
            key_audio(event.key, this.PlayAudio, this.downScale);
            this.nowkey = event.key
        },
        keyup_audio(event){
            if(this.isPlaying && event.key == this.nowkey){ //keyが離れた時に実行
                this.StopAudio();
            }
        },
        toggle_audio(){
            if(!this.prep){
                document.addEventListener("keydown", this.keydown_audio, false);
                document.addEventListener("keyup", this.keyup_audio, false);
                this.prep = true;
                this.button_state = "stop";
                console.log("準備が完了しました")
            }else{
                document.removeEventListener("keydown", this.keydown_audio, false);
                document.removeEventListener("keyup", this.keyup_audio, false);
                this.prep = false;
                this.button_state = "start";
                console.log("演奏準備を取り消しました")
            }
        }
    }
})

app.mount('#main_div')