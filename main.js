//value[0]は音階のHz
//value[1]は音階の文字列

const { createApp } = Vue;

const app = createApp({
    data(){
        return{
            //オシレーター
            oscillators: {"高": new Oscillator(0, false), "低": new Oscillator(0, true)},

            //演奏ステータス
            prep: false, //key bool
            nowkey: "",
            downScale: false,
            button_state: "start", //button text
            time: 0,
            dutystate: "高",
            isDuty: false,

            //AudioObject
            audioarray: [],
            dutyaudioarray: [],
            index: 0,
            len : 0,
        }
    },
    methods:{
        keydown_audio(event){ 
            //keyが押されたときに実行 音を鳴らす

            //音階と名前を取り出す
            let value = give_scale(event.key, this.downScale)

            //oscilatorが登録されているかチェック
            if(!((value[1] + this.dutystate) in this.oscillators)){
                this.oscillators[value[1] + this.dutystate] = new Oscillator(value[0], this.isDuty);
            }

            //オクターブを1段階変更する
            if(event.key == " ") {
                this.downScale = !this.downScale;
                return
            }

            //演奏処理
            if((value[1] + this.dutystate) != this.nowkey){
                if(this.oscillators[this.nowkey]?.isPlaying){
                    //演奏記録の登録
                    this.registerAudio();

                    this.oscillators[this.nowkey].stopAudio();
                }else{
                    this.registerAudio(true);
                }
            }
            else if(this.oscillators[value[1] + this.dutystate].isPlaying){ 
                console.log("あ")
                return
            }else{
                this.registerAudio(true);
            }
            
            //現在keyでの演奏開始
            this.nowkey = value[1] + this.dutystate;
            this.time = performance.now();
            this.oscillators[value[1] + this.dutystate].playAudio();
            return;            
        },
        keyup_audio(event){
            let value = give_scale(event.key, this.downScale)

            if(this.oscillators[value[1] + this.dutystate].isPlaying){

                //演奏記録の登録
                this.registerAudio();

                this.oscillators[value[1] + this.dutystate].stopAudio();

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
        toggle_duty(){
            if(this.prep) this.registerAudio(true);

            if(!this.isDuty){ 
                this.dutystate = "低";
                this.isDuty = true;
            }else{
                this.dutystate = "高";
                this.isDuty = false;
            }

            if(this.prep) this.time = performance.now();
        },
        registerAudio(emp = false){
            let regkey = this.nowkey;
            if(emp) regkey = this.dutystate;

            //演奏時間の計測
            let time = Math.floor((performance.now() - this.time)*10) / 10;                

            //演奏記録を登録
            this.audioarray.push([time, regkey])                
        },
        PlayBack(){
            (async () => {
                for await(obj of this.audioarray){
                    let key = obj[1]
                    let ms = obj[0];
                    await this.play_async(key, ms);
                }
                }
            )();
        },
        play_async(key, ms){
            return new Promise((resolve) => {
                this.oscillators[key].playAudio();
                setTimeout(() => {
                    resolve();
                }, ms);
            }).then(() => {
                this.oscillators[key].stopAudio();
            });
        },
    }
})

app.mount('#main_div')