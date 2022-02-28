<template>
    <div class="box">
        <div class="app" id="messages">
            <div
                v-for="item of messageList"
                :class="{ right: item.type === 'send', left: item.type !== 'send' || null }"
            >
                <span>{{ item.data }}</span>
            </div>
        </div>
        <div>
            <form action="javascript:;">
                <input id="m" v-model="message" autocomplete="off" />
                <button @click="sendMessage">Send</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import socketIO from 'socket.io-client';
import { reactive, ref } from 'vue';
const socket = socketIO('ws://127.0.0.1:9892')

let message = ref('')

// 消息列表
const messageList: { type: string; user_name: string; data: string; options: {}; }[] = reactive([])

// 发送消息
const sendMessage = () => {
    if (message.value) {
        socket.emit('chat message', message.value)
        messageList.push({
            type: 'send',
            user_name: 'nick',
            data: message.value,
            options: {
            }
        })
    }
}

const returnMessage = ref('');
// 接收消息
socket.on('chat message', (msg) => {
    returnMessage.value = msg
    if (returnMessage.value) {
        messageList.push({
            type: 'receive',
            user_name: 'Tom',
            data: returnMessage.value,
            options: {
            }
        })
    }
})



</script>

<style>
form {
    display: flex;
    flex-flow: row;
    background: #000;
    padding: 3px;
    flex-grow: 2;
    bottom: 0;

    width: 100%;
}

form input {
    border: 0;
    padding: 10px;
    width: 90%;
    margin-right: 0.5%;
}

form button {
    width: 9%;
    background: rgb(130, 224, 255);
    border: none;
    padding: 10px;
}

#messages {
    list-style-type: none;
    flex-grow: 8;
    margin: 0;
    padding: 0;
    overflow: auto;
}

#messages li {
    padding: 5px 10px;
}

.left {
    display: flex;
    justify-content: start;
    margin-left: 20px;
}

.left > span {
    margin-top: 5px;
    padding: 15px;
    max-width: 50%;
    background-color: aquamarine;
    white-space: normal;

    word-wrap: break-word;

    word-break: break-all;
}

.right {
    display: flex;
    justify-content: end;
    margin-right: 20px;
}

.right > span {
    margin-top: 5px;
    padding: 15px;
    max-width: 50%;
    white-space: normal;
    background-color: yellow;
    word-wrap: break-word;

    word-break: break-all;
}

.box {
    display: flex;
    background: beige;
    margin: 50px auto 0;
    flex-flow: column;
    width: 40vw;
    height: 80vh;
}
</style>
