window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
gainNode.gain.value = 0.3;
let oscillator;
let isPlaying = false;
let downScale = false;

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
}

function StopAudio(){
    oscillator?.stop();
    isPlaying = false;
}

document.addEventListener("keypress",keypress_audio);


function keypress_audio(e){
    if(isPlaying && e.key != " "){
        StopAudio();
    }

    if(!downScale){
        switch(e.key){
            case "1":
                PlayAudio(415);
                break;
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
                PlayAudio(523.2); //ド5 C5
                console.log("ド5");
                break;
            case "4":
                PlayAudio(554.3);
                break;
            case "r":
                PlayAudio(587.3);
                break;
            case "5":
                PlayAudio(622.2);
                break;
            case "t":
                PlayAudio(659.2);
                break;
            case "y":
                PlayAudio(698.5);
                break;
            case "7":
                PlayAudio(740);
                break;
            case "u":
                PlayAudio(784);
                break;
            case "8":
                PlayAudio(830.6);
                break;
            case "i":
                PlayAudio(880);
                break;
            case "9":
                PlayAudio(932.3);
                break;
            case "o":
                PlayAudio(987.8);
                break;
            case "p":
                PlayAudio(1046.5); //ド6 C6
                console.log("ド6");
                break;
            case "-":
                PlayAudio(1108.7); 
                break;
            case "@":
                PlayAudio(1174.6);
                break;
            case "^":
                PlayAudio(1244.5);
                break;
            case "[":
                PlayAudio(1318.5); //ミ6 E6
                break;
            case " ":
                downScale = !downScale;
                break;
            default:
                console.log("無効な入力です")
        }
    }
    else{
        switch(e.key){
            case "q":
                PlayAudio(130.8); //ド3 C3
                console.log("ド3");
                break;
            case "2":
                PlayAudio(138.6);
                break;
            case "w":
                PlayAudio(146.8);
                break;
            case "3":
                PlayAudio(155.5);
                break;
            case "e":
                PlayAudio(164.8);
                break;
            case "r":
                PlayAudio(174.6);
                break;
            case "5":
                PlayAudio(185);
                break;
            case "t":
                PlayAudio(196);
                break;
            case "6":    
                PlayAudio(207.6);
                break;
            case "y":
                PlayAudio(220);
                break;
            case "7":
                PlayAudio(233);
                break;
            case "u":
                PlayAudio(247);
                break;
            case "i":
                PlayAudio(261.6); //ド4 C4
                console.log("ド4");
                break;
            case "9":
                PlayAudio(277);
                break;
            case "o":
                PlayAudio(293.6);
                break;
            case "0":
                PlayAudio(311);
                break;
            case "p":
                PlayAudio(329.6);
                break;
            case "@":
                PlayAudio(349);
                break;
            case "^":
                PlayAudio(370);
                break;
            case "[":
                PlayAudio(392);
                break;
            case " ":
                downScale = !downScale;
                break;
            default:
                console.log("無効な入力です")
        }
    }
}