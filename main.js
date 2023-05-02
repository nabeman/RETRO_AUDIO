const { createApp } = Vue;

const app = createApp({
    data(){
        return{
            //オシレーター
            oscillators: {},

            //演奏ステータス
            prep: false, //key bool
            nowkey: "",
            downScale: false,
            button_state: "start", //button text
            time: 0,
            dutystate: 1.0,
            isDuty: false,

            //AudioObject
            audioarray: [],
            dutyaudioarray: [],
            index: 0,
            len : 0,
        }
    },
    methods:{
        keydown_audio(event){ //keyが押されたときに実行 音を鳴らす
            let value = give_scale(event.key, this.downScale)

            //oscilatorが登録されているかチェック
            if(!(value[1] in this.oscillators)){
                this.oscillators[value[1]] = new Oscillator(value[0], this.isDuty);
            }

            if(event.key == " ") {
                this.downScale = !this.downScale;
                return
            }

            if(this.oscillators[value[1]].isPlaying){ 
                return
            }

            // //空の演奏記録を登録
            // let time = Math.floor((performance.now() - this.time)*10)/10;
            // this.dutyaudioarray.push(new AudioObject(time, false, " "));

            // //現在keyでの演奏開始
            // this.nowkey = event.key;
            // this.time = performance.now();

            // //演奏時間の計測
            // let endTime = performance.now(); 
            // let time = Math.floor((endTime - this.time)*10)/10;
            
            // //演奏記録を登録
            // this.audioarray.push(new AudioObject(time, this.downScale, this.nowkey));
            // this.len = this.audioarray.length;
            
            // //現在keyでの演奏開始
            // this.nowkey = event.key;
            // this.time = performance.now();

            this.oscillators[value[1]].playAudio();
            return;            
        },
        keyup_audio(event){
            let value = give_scale(event.key, this.downScale)

            if(this.oscillators[value[1]].isPlaying){
                this.oscillators[value[1]].stopAudio();
            }
            
            // if(this.isPlaying && event.key == this.nowkey){ 
            //     //keyが離れた時に実行
            //     //演奏時間の計測
            //     let endTime = Math.floor((performance.now() - this.time)*10)/10;

            //     //演奏記録を登録
            //     if(!this.isDuty){
            //         this.audioarray.push(new AudioObject(endTime, this.downScale, this.nowkey));
            //     }else{
            //         this.dutyaudioarray.push(new AudioObject(endTime, this.downScale, this.nowkey));
            //     }
            //     this.len = this.audioarray.length;

            //     //バーの長さ演奏時間を表示(プロトタイプ)
            //     audioUI("A4", endTime / 60);

            //     //演奏を停止
            //     this.StopAudio();

            //     //空の演奏記録の計測開始
            //     this.time = performance.now();
            // }
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
                this.dutystate = 0.5;
                this.isDuty = true;
            }else{
                this.dutystate = 1.0;
                this.isDuty = false;
            }
        },
        play_async(scale, ms){
            return new Promise((resolve) => {
                this.PlayAudio(scale);
                this.PlayDutyAudio(scale);
                setTimeout(() => {
                    resolve();
                }, ms);
            }).then(() => {
                this.StopAudio();
            });
        },
    }
})

app.mount('#main_div')