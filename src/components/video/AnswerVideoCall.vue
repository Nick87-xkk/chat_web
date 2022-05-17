<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      draggable
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="videoChatBox"
    >
      <!--      本地视频-->
      <video id="localVideo" class="localVideo" muted autoplay></video>
      <!--      接收的视频-->
      <video id="remoteVideo" class="remoteVideo" muted autoplay></video>
      <el-row style="justify-content: center">
        <!--        接通-->
        <el-button @click="dialogVisible = false">接听</el-button>
        <!--        挂断-->
        <el-button type="primary" @click="dialogVisible = false"
        >挂断
        </el-button
        >
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import socketIO from "socket.io-client";
import { app } from "../../main";

let socket:any;
if (!inject("socket")){
  socket = socketIO(`ws://127.0.0.1:9892/?account=${sessionStorage.getItem('account')}`);
  app.provide("socket",socket)
}else{
  socket = inject("socket")
}
const dialogVisible = ref(true);
const RTCPeerConnection =
  window.RTCPeerConnection ||
  (window as any).mozRTCPeerConnection ||
  (window as any).webkitRTCPeerConnection;
const RTCIceCandidate =
  window.RTCIceCandidate ||
  (window as any).mozRTCIceCandidate ||
  (window as any).webkitRTCIceCandidate;
const RTCSessionDescription =
  window.RTCSessionDescription ||
  (window as any).mozRTCSessionDescription ||
  (window as any).webkitRTCSessionDescription;

const AudioContext =
  window.AudioContext ||
  (window as any).webkitAudioContext ||
  (window as any).mozAudioContext;

navigator.mediaDevices.getUserMedia =
  navigator.mediaDevices.getUserMedia ||
  (navigator as any).webkitGetUserMedia ||
  (navigator as any).mozGetUserMedia ||
  (navigator as any).msGetUserMedia;

// import socketIO from "socket.io-client";
// import { useRoute } from "vue-router";
// 仅仅用于控制哪一端的浏览器发起offer，#号后面有值的一方发起
// true 接受通话方

// 与信令服务器的WebSocket连接

// stun和turn服务器
/*
const iceServer = {
  iceServers: [
    {
      url: "stun:stun.l.google.com:19302"
    },
    {
      url: "turn:numb.viagenie.ca",
      username: "webrtc@live.com",
      credential: "muazkh"
    }
  ]
};
*/

// 创建PeerConnection实例 (参数为null则没有iceserver，即使没有stunserver和turnserver，仍可在局域网下通讯)
const pc: any = new RTCPeerConnection();

// 发送ICE候选到其他客户端
pc.onicecandidate = function(event: any) {
  console.log('onicecandidate',event);
  if (event.candidate !== null) {
    socket.emit(
      "ice_candidate",
      JSON.stringify({
        event: "ice_candidate",
        data: {
          candidate: event.candidate
        }
      })
    );
  }
};


// 发送offer和answer的函数，发送本地session描述
const sendOfferFn = function(desc: any) {
  pc.setLocalDescription(desc);
  socket.emit(
    "ice_candidate",
    JSON.stringify({
      event: "_offer",
      data: {
        sdp: desc
      }
    })
  );
};
const sendAnswerFn = function(desc: any) {
  pc.setLocalDescription(desc);
  socket.emit(
    "ice_candidate",
    JSON.stringify({
      event: "_answer",
      data: {
        sdp: desc
      }
    })
  );
};

// 获取本地音频和视频流
navigator.mediaDevices.getUserMedia({
    // 视屏设置
    video: {
      width: 300,
      height: 400,
      facingMode: "user"
    }
  })
  .then((stream: any) => {
    //绑定本地媒体流到video标签用于输出
    (document as any).getElementById("localVideo").srcObject = stream;
    //向PeerConnection中加入需要发送的流
    pc.addStream(stream);
    //如果是发起方则发送一个offer信令

  })
  .catch((error) => {
    //处理媒体流创建失败错误
    console.log("getUserMedia error: " + error);
  });

//处理到来的信令
socket.on("_ice_candidate", (event: any) => {
  let json = JSON.parse(event);
  // console.log("onmessage: ", json);
  // console.log(json.event);
  //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
  if (json.event == "ice_candidate" && json.data.candidate) {
    pc.addIceCandidate(new RTCIceCandidate(json.data.candidate));
  } else {
    pc.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
    // 如果是一个offer，那么需要回复一个answer
    if (json.event == "_offer") {
      pc.createAnswer(sendAnswerFn, function(error: any) {
        console.log("Failure callback: " + error);
      });
    }
  }
});
// 如果检测到媒体流连接到本地，将其绑定到一个video标签上输出
  pc.onaddstream = (event: any) => {
    (document as any).getElementById("remoteVideo").srcObject = event.stream;
  };
</script>

<style lang="scss" scoped>
.localVideo {
  width: 90px;
  height: 120px;
}

.remoteVideo {
  width: 300px;
  height: 400px;
}
</style>