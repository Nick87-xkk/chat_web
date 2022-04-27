<template>
  <div>
    <video autoplay id="video1"></video>
    <video autoplay id="video2"></video>
    <canvas id="output"></canvas>
    <el-row>
      <el-button>call</el-button>
      <el-button>end</el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue';
import socketIO from "socket.io-client";
import { useRoute } from "vue-router";
const route = useRoute()
const socket = socketIO(`ws://127.0.0.1:9892?account=${route.query.account}`)

// const pc = window.RTCPeerConnection = window.RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection;
const ice = window.RTCIceCandidate = window.RTCIceCandidate || (window as any).mozRTCIceCandidate || (window as any).webkitRTCIceCandidate;
const rtcSess = window.RTCSessionDescription = window.RTCSessionDescription || (window as any).mozRTCSessionDescription || (window as any).webkitRTCSessionDescription;

(window as any).AudioContext =
  window.AudioContext ||
  (window as any).webkitAudioContext ||
  (window as any).mozAudioContext;

navigator.mediaDevices.getUserMedia =
  navigator.mediaDevices.getUserMedia ||
  (navigator as any).webkitGetUserMedia ||
  (navigator as any).mozGetUserMedia ||
  (navigator as any).msGetUserMedia;

let mediaStreamTrack: MediaStream | any;

let pc:any = new RTCPeerConnection();
pc.onaddstream = (obj: any)=>{
  let vid:any = document.getElementById('video1');
  vid.srcObject = obj.stream;
}
/*
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
      // pc.create
      console.log(stream);
      let partName = new RTCPeerConnection();
      stream.getTracks().forEach((track:any)=>{
        partName.addTrack(track,stream)
      })
      socket.emit('video message',stream)
      // mediaStreamTrack = stream;
      let video1: any = document.querySelector('#video1');
      if (video1) {
        video1.srcObject = stream;
        video1.play();
       /!* console.log(mediaStreamTrack);
        console.log(mediaStreamTrack.getTracks());*!/
      } else {
        throw 'error';
      }
    });


  socket.on('video message',(videoMsg)=>{
    let video2:any = document.querySelector('#video2');
    if (video2){
      video2.scrObject = videoMsg;
      video2.play();
    }else{
      throw 'error'
    }
  })
*/
if (route.query.account == '5678'){
 navigator.mediaDevices.getUserMedia({video:true}).then((stream)=>{
   pc.onaddstream({stream: stream});
   pc.setRemoteDescription(new RTCSessionDescription(offer),()=>{
     pc.createAnswer((answer:any)=>{
       pc.setLocalDescription(new RTCSessionDescription(answer))
     })
   })
 })

}


if (route.query.account == '1234'){
  navigator.mediaDevices.getUserMedia({video:true}).then((stream)=>{
    pc.onaddstream({stream:stream});
    pc.createOffer((offer:any)=>{
      pc.setLocalDescription(new RTCSessionDescription(offer),()=>{

      })
    })
  })
}
onBeforeUnmount(() => {
  console.log('onUnmounted');
  mediaStreamTrack.getTracks()[0].stop();
  // mediaStreamTrack.getTracks()[1].stop();
});
</script>
