window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
gainNode.gain.value = 0.3;
let oscillator;
let isPlaying = false;

// document.getElementById("playA4").addEventListener("click", {scale: 440, handleEvent: PlayAudio});
// document.getElementById("playA#4").addEventListener("click", {scale: 466, handleEvent: PlayAudio});
// document.getElementById("playB4").addEventListener("click", {scale: 494, handleEvent: PlayAudio});
// document.getElementById("playC5").addEventListener("click", {scale: 523, handleEvent: PlayAudio});
// document.getElementById("playC#5").addEventListener("click", {scale: 554, handleEvent: PlayAudio});
// document.getElementById("playD5").addEventListener("click", {scale: 587, handleEvent: PlayAudio});
// document.getElementById("playD#5").addEventListener("click", {scale: 622, handleEvent: PlayAudio});
// document.getElementById("playE5").addEventListener("click", {scale: 659, handleEvent: PlayAudio});
// document.getElementById("playF5").addEventListener("click", {scale: 698, handleEvent: PlayAudio});
// document.getElementById("playF#5").addEventListener("click", {scale: 740, handleEvent: PlayAudio});
// document.getElementById("playG5").addEventListener("click", {scale: 784, handleEvent: PlayAudio});
// document.getElementById("playG#5").addEventListener("click", {scale: 830, handleEvent: PlayAudio});
// document.getElementById("playA5").addEventListener("click", {scale: 880, handleEvent: PlayAudio});
// document.getElementById("playA#5").addEventListener("click", {scale: 932, handleEvent: PlayAudio});

function PlayAudio(scale){
    if(isPlaying){
        return;
    }

    oscillator = ctx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(scale, ctx.currentTime);
    oscillator.connect(gainNode).connect(ctx.destination);
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

document.addEventListener("keypress",keypress_audio);

function keypress_audio(e){
    if(isPlaying){
        StopAudio();
    }
    switch(e.key){
        case "q":
            PlayAudio(440);
            break;
        case "2":
            PlayAudio(466);
            break;
        case "w":
            PlayAudio(494);
            break;
        case "e":
            PlayAudio(523);
            break;
        case "4":
            PlayAudio(554);
            break;
        case "r":
            PlayAudio(587);
            break;
        case "5":
            PlayAudio(622);
            break;
        case "t":
            PlayAudio(659);
            break;
        case "y":
            PlayAudio(698);
            break;
        case "7":
            PlayAudio(740);
            break;
        case "u":
            PlayAudio(784);
            break;
        case "8":
            PlayAudio(830);
            break;
        case "i":
            PlayAudio(880);
            break;
        case "9":
            PlayAudio(932);
            break;
        case "o":
            PlayAudio(988);
            break;
        case "p":
            PlayAudio(1046);
            break;
        case "-":
            PlayAudio(1109);
            break;
        case "@":
            PlayAudio(1174);
            break;
        case "^":
            PlayAudio(1244);
            break;
        case "[":
            PlayAudio(1318);
            break;
        default:
            console.log("無効な入力です")
    }
}