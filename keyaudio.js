function give_scale(key, downScale){
    if(!downScale){
        switch(key){
            case "1":
                return 415;
            case "q":
                return 440;
            case "2":
                return 466;
            case "w":
                return 494;
            case "e":
                console.log("ド5");
                return 523.2; //ド5 C5
            case "4":
                return 554.3;
            case "r":
                return 587.3;
            case "5":
                return 622.2;
            case "t":
                return 659.2;
            case "y":
                return 698.5;
            case "7":
                return 740;
            case "u":
                return 784;
            case "8":
                return 830.6;
            case "i":
                return 880;
            case "9":
                return 932.3;
            case "o":
                return 987.8;
            case "p":                 
                console.log("ド6");//ド6 C6
                return 1046.5;
            case "-":
                return 1108.7;
            case "@":
                return 1174.6;
            case "^":
                return 1244.5;
            case "[":
                return 1318.5;
            case " ":
                return 0;
            case "a":
                return 415; //for dual
            default:
                console.log("無効な入力です")
                return 0;
        }
    }
    else{
        switch(key){
            case "q":
                console.log("ド3");//ド3 C3
                return 130.8;
            case "2":
                return 138.6;
            case "w":
                return 146.8;
            case "3":
                return 155.5;
            case "e":
                return 164.8;
            case "r":
                return 174.6;
            case "5":
                return 185;
            case "t":
                return 196;
            case "6":    
                return 207.6;
            case "y":
                return 220;
            case "7":
                return 233;
            case "u":
                return 247;
            case "i":
                console.log("ド4");//ド4 C4
                return 261.6;
            case "9":
                return 277;
            case "o":
                return 293.6;
            case "0":
                return 311;
            case "p":
                return 329.6;
            case "@":
                return 349;
            case "^":
                return 370;
            case "[":
                return 392;
            case " ":
                return 0;
            default:
                console.log("無効な入力です");
                return 0;
        }
    }
}
