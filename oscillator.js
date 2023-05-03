const VOLUME = 0.1
const ctx = new AudioContext();
const gainNode = ctx.createGain(); //音量調節
const delayNode = ctx.createDelay(); //ディレイノード
const invNode = ctx.createGain();
const dutycycle = 0.5; //デューティ比
gainNode.gain.value = VOLUME;
invNode.gain.value = -VOLUME;

class Oscillator{
    oscillator; //オシレーター
    isPlaying; //演奏フラグ
    isDuty; //Duty比判定
    scale; //音階
    ispausing;

    constructor(scale, duty){
        this.isPlaying = false;
        this.isDuty = duty;
        this.scale = scale;
        this.ispausing = false;

        this.init(scale);
    }

    init(scale){
        this.oscillator = ctx.createOscillator();
        if(!this.isDuty){
            this.oscillator.type = "square"; //矩形波
            this.oscillator.frequency.setValueAtTime(scale, ctx.currentTime); //scaleで音の高さ
            this.oscillator.connect(gainNode).connect(ctx.destination); //音量調整
        }else{
            this.oscillator.type = "sawtooth";
            this.oscillator.frequency.setValueAtTime(scale, ctx.currentTime);
            if(scale == 0){
                delayNode.delayTime.value = 0;
            }else{
                
                delayNode.delayTime.value = (1.0 - dutycycle) / scale;
            }
            this.oscillator.connect(gainNode);
            this.oscillator.connect(invNode);
            invNode.connect(delayNode);
            delayNode.connect(gainNode);
            gainNode.connect(ctx.destination);
        }
    }

    playAudio(){
        this.oscillator.start(); //oscillator 動かす
        this.isPlaying = true; //演奏フラグ
    }

    stopAudio(){
        this.oscillator?.stop(ctx.currentTime);
        this.isPlaying = false;
        this.init(this.scale);
    }
}