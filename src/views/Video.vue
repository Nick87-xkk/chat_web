<template>
  <div>
    <video autoplay id="video1"></video>
    <video autoplay id="video2"></video>
    <canvas id="output"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue';
import {socket} from "../main";

(window as any).AudioContext =
  window.AudioContext ||
  (window as any).webkitAudioContext ||
  (window as any).mozAudioContext;

const media: any =
  navigator.mediaDevices.getUserMedia ||
  (navigator as any).webkitGetUserMedia ||
  (navigator as any).mozGetUserMedia ||
  (navigator as any).msGetUserMedia;

let mediaStreamTrack: MediaStream | any;

if (media) {
  navigator.mediaDevices
    .getUserMedia({
      // 视屏设置
      video: {
        width:300,
        height: 400,
        facingMode: 'user'
      }
    })
    .then((stream) => {
      console.log(stream);
      // socket.emit('video message',stream)
      // mediaStreamTrack = stream;
      let video1: any = document.querySelector('#video1');
      if (video1) {
        video1.srcObject = stream;
        video1.play();
       /* console.log(mediaStreamTrack);
        console.log(mediaStreamTrack.getTracks());*/
      } else {
        throw 'error';
      }
    });

/*  socket.on('video message',(videoMsg)=>{
    let video2:any = document.querySelector('#video2');
    if (video2){
      video2.scrObject = videoMsg;
      video2.play();
    }else{
      throw 'error'
    }
  })*/
}

onBeforeUnmount(() => {
  console.log('onUnmounted');
  mediaStreamTrack.getTracks()[0].stop();
  // mediaStreamTrack.getTracks()[1].stop();
});
</script>
