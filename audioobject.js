export class AudioObject{
    time;
    boardstate; //オクターブ情報
    key;

    constructor(time, state, key){
        this.time = time;
        this.boardstate = state;
        this.key = key;
    }

}