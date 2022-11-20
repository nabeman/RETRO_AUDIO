window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
let oscillator;
let isPlaying = false;

document.getElementById("playA4").addEventListener("click", {scale: 440, handleEvent: PlayAudio});
document.getElementById("playA#4").addEventListener("click", {scale: 466, handleEvent: PlayAudio});
document.getElementById("playB4").addEventListener("click", {scale: 494, handleEvent: PlayAudio});
document.getElementById("playC5").addEventListener("click", {scale: 523, handleEvent: PlayAudio});
document.getElementById("playC#5").addEventListener("click", {scale: 554, handleEvent: PlayAudio});
document.getElementById("playD5").addEventListener("click", {scale: 587, handleEvent: PlayAudio});
document.getElementById("playD#5").addEventListener("click", {scale: 622, handleEvent: PlayAudio});
document.getElementById("playE5").addEventListener("click", {scale: 659, handleEvent: PlayAudio});
document.getElementById("playF5").addEventListener("click", {scale: 698, handleEvent: PlayAudio});
document.getElementById("playF#5").addEventListener("click", {scale: 740, handleEvent: PlayAudio});
document.getElementById("playG5").addEventListener("click", {scale: 784, handleEvent: PlayAudio});
document.getElementById("playG#5").addEventListener("click", {scale: 830, handleEvent: PlayAudio});
document.getElementById("playA5").addEventListener("click", {scale: 880, handleEvent: PlayAudio});
document.getElementById("playA#5").addEventListener("click", {scale: 932, handleEvent: PlayAudio});

function PlayAudio(e){
    if(isPlaying){
        return;
    }

    oscillator = ctx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(this.scale, ctx.currentTime);
    oscillator.connect(ctx.destination);
    oscillator.start();
    isPlaying = true;
    console.log("再生ボタンが推されました");
}

document.getElementById("stop").addEventListener("click", () => {
    document.addEventListener("keypress", StopAudio);
    console.log("再生を止められます")
});

function StopAudio(){
    oscillator?.stop();
    isPlaying = false;
    console.log("再生を止めました");
}