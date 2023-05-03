function give_scale(key, downScale){
    if(!downScale){
        switch(key){
            case "1":
                return [415, "ソ4#"];
            case "q":
                return [440, "ラ4"];
            case "2":
                return [466, "ラ4#"];
            case "w":
                return [494, "シ4"];
            case "e":
                console.log("ド5");
                return [523.2, "ド5"]; //ド5 C5
            case "4":
                return [554.3, "ド5#"];
            case "r":
                return [587.3, "レ5"];
            case "5":
                return [622.2, "レ5#"];
            case "t":
                return [659.2, "ミ5"];
            case "y":
                return [698.5, "ファ5"];
            case "7":
                return [740, "ファ5#"];
            case "u":
                return [784, "ソ5"];
            case "8":
                return [830.6, "ソ5#"];
            case "i":
                return [880, "ラ5"];
            case "9":
                return [932.3, "ラ5#"];
            case "o":
                return [987.8, "シ5"];
            case "p":                 
                console.log("ド6");//ド6 C6
                return [1046.5, "ド6"];
            case "-":
                return [1108.7, "ド6#"];
            case "@":
                return [1174.6, "レ6"];
            case "^":
                return [1244.5, "レ6#"];
            case "[":
                return [1318.5, "ミ6"];
            case " ":
                return [0, ""];
            default:
                console.log("無効な入力です")
                return [0, ""];
        }
    }
    else{
        switch(key){
            case "q":
                console.log("ド3");//ド3 C3
                return [130.8, "ド3"];
            case "2":
                return [138.6, "ド3#"];
            case "w":
                return [146.8, "レ3"];
            case "3":
                return [155.5, "レ3#"];
            case "e":
                return [164.8, "ミ3"];
            case "r":
                return [174.6, "ファ3"];
            case "5":
                return [185, "ファ3#"];
            case "t":
                return [196, "ソ3"];
            case "6":    
                return [207.6, "ソ3#"];
            case "y":
                return [220, "ラ3"];
            case "7":
                return [233, "ラ3#"];
            case "u":
                return [247, "シ3"];
            case "i":
                console.log("ド4");//ド4 C4
                return [261.6, "ド4"];
            case "9":
                return [277, "ド4#"];
            case "o":
                return [293.6, "レ4"];
            case "0":
                return [311, "レ4#"];
            case "p":
                return [329.6, "ミ4"];
            case "@":
                return [349, "ファ4"];
            case "^":
                return [370, "ファ4#"];
            case "[":
                return [392, "ソ4"];
            case " ":
                return [0, ""];
            default:
                console.log("無効な入力です");
                return [0, ""];
        }
    }
}
