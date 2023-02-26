const { createApp } = Vue;

const VOLUME = 0.2
const ctx = new AudioContext();
const gainNode = ctx.createGain(); //音量調節
const delayNode = ctx.createDelay(); //ディレイノード
const invNode = ctx.createGain();
const dutycycle = 0.5; //デューティ比
gainNode.gain.value = VOLUME;
invNode.gain.value = -VOLUME;

const app = createApp({
    data(){
        return{
            //duty
            isDuty: false,
            duty_state: 1.0,

            //オシレーター
            oscillator: null, 
            dutyoscillator: null,

            //演奏ステータス
            isPlaying: false, //演奏中の判定
            downScale: false, //オクターブ調整
            prep: false, //key bool
            nowkey: "",
            button_state: "start", //button text
            time: 0,

            //AudioObject
            audioarray: [],
            dutyaudioarray: [],
            index: 0,
            len : 0,
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
        PlayDutyAudio(scale){
            this.dutyoscillator = ctx.createOscillator();
            this.dutyoscillator.type = "sawtooth";
            this.dutyoscillator.frequency.setValueAtTime(scale, ctx.currentTime);
            delayNode.delayTime.value = (1.0 - dutycycle) / scale;
            this.dutyoscillator.connect(gainNode);
            this.dutyoscillator.connect(invNode);
            invNode.connect(delayNode);
            delayNode.connect(gainNode);
            gainNode.connect(ctx.destination);
            this.dutyoscillator.start();
            this.isPlaying = true;
        },
        StopAudio(){
            this.oscillator?.stop(); //oscillator 止める
            this.dutyoscillator?.stop();
            this.isPlaying = false;
        },
        keydown_audio(event){ //keyが押されたときに実行 音を鳴らす
            if(event.key == " ") this.downScale = !this.downScale;
            if(this.isPlaying && this.nowkey != event.key){ 
                //事前に演奏している音の処理
                if(!this.isDuty){
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
                }
                else{
                    //演奏時間の計測
                    let endTime = performance.now(); 
                    let time = Math.floor((endTime - this.time)*10)/10;

                    //演奏記録を登録
                    this.dutyaudioarray.push(new AudioObject(time, this.downScale, this.nowkey));
                    this.len = this.audioarray.length;

                    //事前の演奏を停止
                    this.StopAudio();

                    //現在keyでの演奏開始
                    scale = give_scale(event.key, this.downScale);
                    this.PlayDutyAudio(scale);
                    this.nowkey = event.key;
                    this.time = performance.now();
                    return;
                }
            }else if(this.isPlaying && this.nowkey == event.key){
                //キーの連続入力時の処理
                return;
            }

            if(!this.isDuty){
                //空の演奏記録を登録
                let time = Math.floor((performance.now() - this.time)*10)/10;
                this.audioarray.push(new AudioObject(time, false, " "));

                //現在keyでの演奏開始
                scale = give_scale(event.key, this.downScale);
                this.PlayAudio(scale); //音を鳴らす
                this.nowkey = event.key;
                this.time = performance.now();
            }else{
                //空の演奏記録を登録
                let time = Math.floor((performance.now() - this.time)*10)/10;
                this.dutyaudioarray.push(new AudioObject(time, false, " "));

                //現在keyでの演奏開始
                scale = give_scale(event.key, this.downScale);
                this.PlayDutyAudio(scale);
                this.nowkey = event.key;
                this.time = performance.now();
            }
        },
        keyup_audio(event){
            if(this.isPlaying && event.key == this.nowkey){ 
                //keyが離れた時に実行
                //演奏時間の計測
                let endTime = Math.floor((performance.now() - this.time)*10)/10;

                //演奏記録を登録
                if(!this.isDuty){
                    this.audioarray.push(new AudioObject(endTime, this.downScale, this.nowkey));
                }else{
                    this.dutyaudioarray.push(new AudioObject(endTime, this.downScale, this.nowkey));
                }
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
                this.dutyaudioarray = [];
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
            (async () => {
                for await(obj of this.audioarray){
                    let scale = give_scale(obj.key, obj.boardstate);
                    let ms = obj.time;
                    await this.play_async(scale, ms);
                }
                }
            )();
        },
        toggle_duty(){
            if(!this.isDuty){
                this.duty_state = 0.5;
                this.isDuty = true;
            }else{
                this.duty_state = 1.0;
                this.isDuty = false;
            }
        },
        play_async(scale, ms){
            return new Promise((resolve) => {
                this.PlayAudio(scale);
                setTimeout(() => {
                    resolve();
                }, ms);
            }).then(() => {
                this.StopAudio();
            });
        },
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