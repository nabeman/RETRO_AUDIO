window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
let oscillator;
let isPlaying = false;

document.getElementById("playA4").addEventListener("click", PlayAudio(440));
//document.getElementById("playA#4").addEventListener("click", PlayAudio(466));

function PlayAudio(scale){
    if(isPlaying){
        return;
    }

    oscillator = ctx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(scale, ctx.currentTime);
    oscillator.connect(ctx.destination);
    oscillator.start();
    isPlaying = true;
    console.log("再生ボタンが推されました");
}

document.getElementById("stop").addEventListener("click", () => {
    oscillator?.stop();
    isPlaying = false;
    console.log("再生を止めました");
});