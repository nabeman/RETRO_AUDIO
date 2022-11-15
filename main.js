const input_button = document.getElementById("start_key");
input_button.addEventListener("click", start_input);
let state = false;

function start_input(e){
    if(!state){
        document.addEventListener("keypress", keypress, false);
        state = true;
    }else{
        document.removeEventListener("keypress", keypress, false);
        state = false;
        console.log("入力を停止しました")
    }
}

function keypress(e){
    console.log(e.key);
    return 0
}