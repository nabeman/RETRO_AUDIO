const { createApp } = Vue;

const piano = createApp({
    data(){
        return{

        }
    },
    methods:{
        PushWhite(key){
            console.log(`${key}が押されました`);
        },
        PushBlack(key){
            console.log(`${key}が押されました`);
        }
    }
})

piano.component('WhiteKey', {
    data(){
        return{
            keyis: this.pianokey,
        }
    },
    props:[
        'pianokey',
    ]
    ,
    template:`
        <div class="whitekey" @click="EmitKey">
            
        </div>
    `,
    methods:{
        EmitKey(){
            this.$emit('PushWhiteKey', this.pianokey);
            console.log(`プロパティは${this.pianokey}です`)
        }
    }
})

piano.component('BlackKey',{
    data(){
        return{
            keyis: this.pianokey,
        }
    },
    props: [
        'pianokey',
    ],
    template:`
    <div class="blackkey" @click="EmitKey">
            
    </div>
    `,
    methods:{
        EmitKey(){
            this.$emit('PushBlackKey', this.pianokey);
            console.log(`プロパティは${this.pianokey}です`)
        }
    }

}

)

piano.mount('#piano')