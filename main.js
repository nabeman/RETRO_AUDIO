// const input_button = document.getElementById("start_key");
// input_button.addEventListener("click", start_input);
// let state = false;

// function start_input(e){
//     if(!state){
//         document.addEventListener("keypress", keypress, false);
//         state = true;
//         console.log("入力を受け付けています");
//     }else{
//         document.removeEventListener("keypress", keypress, false);
//         state = false;
//         console.log("入力を停止しました");
//     }
// }

// function keypress(e){
//     switch(e.key){
//         case "w":
//             console.log("前に進む");
//             break;
//         case "a":
//             console.log("左に進む");
//             break;
//         case "d":
//             console.log("右に進む");
//             break;
//         case "s":
//             console.log("後ろに進む");
//             break;
//         default:
//             console.log("進めないよ!");
//     }
//     return 0
// }