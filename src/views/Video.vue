<template>
  <div>
    <video autoplay id="video"></video>
    <canvas id="output"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue';

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
        width: 900,
        height: 1600,
        facingMode: 'user'
      }
    })
    .then((stream) => {
      console.log(stream);
      mediaStreamTrack = stream;
      let video: any = document.querySelector('#video');
      if (video) {
        video.srcObject = stream;
        video.play();
        console.log(mediaStreamTrack);
        console.log(mediaStreamTrack.getTracks());
      } else {
        throw 'error';
      }
    });
}

onBeforeUnmount(() => {
  console.log('onUnmounted');
  mediaStreamTrack.getTracks()[0].stop();
});
</script>
