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
            aaa: 0,
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
            if(this.isPlaying && this.nowkey != event.key){ 
                //事前に演奏している音の処理
                //演奏時間の計測
                let endTime = performance.now(); 
                let time = Math.floor((endTime - this.time)*10)/10;

                //演奏記録を登録
                this.audioarray.push(new AudioObject(time, this.downScale, this.nowkey));
                this.len = this.audioarray.length;

                //事前の演奏を停止
                this.StopAudio();

                //現在keyでの演奏開始
                scale = give_scale(event.key, this.downScale);
                this.PlayAudio(scale); //音を鳴らす
                this.nowkey = event.key;
                this.time = performance.now();
                return;
            }else if(this.isPlaying && this.nowkey == event.key){
                //キーの連続入力時の処理
                return;
            }

            //空の演奏記録を登録
            let time = Math.floor((performance.now() - this.time)*10)/10;
            this.audioarray.push(new AudioObject(time, false, " "));

            //現在keyでの演奏開始
            scale = give_scale(event.key, this.downScale);
            this.PlayAudio(scale); //音を鳴らす
            this.nowkey = event.key;
            this.time = performance.now();
        },
        keyup_audio(event){
            if(this.isPlaying && event.key == this.nowkey){ 
                //keyが離れた時に実行
                //演奏時間の計測
                let endTime = Math.floor((performance.now() - this.time)*10)/10;

                //演奏記録を登録
                this.audioarray.push(new AudioObject(endTime, this.downScale, this.nowkey));
                this.len = this.audioarray.length;

                //バーの長さ演奏時間を表示(プロトタイプ)
                audioUI("A4", endTime / 60);

                //演奏を停止
                this.StopAudio();

                //空の演奏記録の計測開始
                this.time = performance.now();
            }
        },
        toggle_audio(){
            if(!this.prep){
                document.addEventListener("keydown", this.keydown_audio, false);
                document.addEventListener("keyup", this.keyup_audio, false);
                this.prep = true;
                this.button_state = "stop";

                //格納された演奏履歴の初期化
                this.audioarray = [];
                this.index = 0;

                //計測開始
                this.time = performance.now();
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
            },this.audioarray[i].time);
            // if(this.index == audioarray.length) this.index = 0;
        },
        Reset(){
            this.allkeyinput = "";
            console.log(this.audioarray.length)
            this.index = 0;
        },
/////////////////////////reactive playaudio
        plusscale(){ 
            console.log("plus scale");
            this.aaa = this.aaa + 100;
        },
        minusscale(){
            console.log("minus scale");
            if(this.aaa <= 0) return;
            this.aaa = this.aaa - 100;
        }
    },
    computed:{
        // onbutton(){
        //     console.log("Start")
        //     if(this.isPlaying == true){
        //         this.StopAudio();
        //     }
        //     this.PlayAudio(this.aaa);
        // },
    /////////////////////////////
    }
})

app.mount('#main_div')