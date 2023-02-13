class AudioObject{
    time;
    boardstate; //オクターブ情報
    key;

    constructor(time, state, key){
        this.time = time; //演奏時間
        this.boardstate = state;
        this.key = key;
    }

}