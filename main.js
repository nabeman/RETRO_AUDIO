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
            time: 0,
            audioarray: [],
            index: 0,
            len : 0,
            allkeyinput: "",
            lenarray: [], //test
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
        keydown_audio(event){ //keyが押されたときに実行 音を鳴らす
            if(event.key == " ") this.downScale = !this.downScale;
            if(this.isPlaying && this.nowkey != event.key){ //事前に演奏している音の処理
                let endTime = performance.now(); //演奏時間
                let time = Math.floor((endTime - this.time)*10)/10;
                this.audioarray.push(new AudioObject(time, this.downScale, this.nowkey));
                console.log(this.audioarray);
                //this.ShowAudioObject();
                this.len = this.audioarray.length; 
                this.StopAudio();
            }else if(this.isPlaying && this.nowkey == event.key){
                return;
            }
            scale = give_scale(event.key, this.downScale);
            this.PlayAudio(scale); //音を鳴らす
            this.nowkey = event.key;
            this.time = performance.now();
        },
        keyup_audio(event){
            if(this.isPlaying && event.key == this.nowkey){ //keyが離れた時に実行
                let endTime = Math.floor((performance.now() - this.time)*10)/10; //演奏時間
                this.audioarray.push(new AudioObject(endTime, this.downScale, this.nowkey));
                console.log(this.audioarray);
                //this.ShowAudioObject();
                this.len = this.audioarray.length;
                audioUI("A4", endTime / 60);
                this.StopAudio();
            }
        },
        toggle_audio(){
            if(!this.prep){
                document.addEventListener("keydown", this.keydown_audio, false);
                document.addEventListener("keyup", this.keyup_audio, false);
                this.prep = true;
                this.button_state = "stop";
                this.audioarray = [];
                this.index = 0;
                console.log("準備が完了しました")
            }else{
                document.removeEventListener("keydown", this.keydown_audio, false);
                document.removeEventListener("keyup", this.keyup_audio, false);
                this.prep = false;
                this.button_state = "start";
                console.log("演奏準備を取り消しました")
            }
        },
        PlayBack(){
            let i = this.index;
            let l = this.len;
            this.index++;
            let SA = this.StopAudio;
            let PB = this.PlayBack;
            let scale = give_scale(this.audioarray[i].key, this.audioarray[i].boardstate);
            this.PlayAudio(scale)
            setTimeout(function(){
                SA();
                if(i < l-1){
                    PB();
                }
            },this.audioarray[i].time+50);
            // if(this.index == audioarray.length) this.index = 0;
        },
        Reset(){
            this.allkeyinput = "";
            console.log(this.audioarray.length)
            this.index = 0;
        },
    },
})

app.mount('#main_div')