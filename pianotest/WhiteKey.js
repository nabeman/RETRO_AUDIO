export default {
    props:[
        'pianoKey',
    ]
    ,
    template:`
        <div class="whitekey" @click="$emit('push-white-key')">
            
        </div>
    `
}