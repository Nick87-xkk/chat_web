<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :modal="false"
      draggable
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="videoChatBox"
    >
      <!--      本地视频-->
      <video id="localVideo1" class="localVideo" muted autoplay></video>
      <!--      接收的视频-->
      <video id="remoteVideo1" class="remoteVideo" muted autoplay></video>
      <el-row style="justify-content: center">
        <!--        挂断-->
        <el-button type="primary" @click="sponsorHangup"
          >挂断
        </el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { inject, defineProps, onMounted, ref, onBeforeUnmount } from "vue";
import { useRoute } from 'vue-router';
import socketIO from 'socket.io-client';
import { Location } from '@element-plus/icons-vue';
import { app } from '../../main';
import { videoChat } from "./video";
import { postAddMessage } from "../../api/modules/message.api";
// 与信令服务器的WebSocket连接
let socket: any;
if (!inject('socket')) {
  socket = socketIO(
    `${process.env.BASE_API}/?account=${sessionStorage.getItem('account')}`
  );
  app.provide('socket', socket);
} else {
  socket = inject('socket');
}

const prop = defineProps<{ receiveAccount: any }>();

const dialogVisible = ref(true);
//用于关闭视屏
let mediaStreamTrack: MediaStream | any;
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

navigator.mediaDevices.getUserMedia =
  navigator.mediaDevices.getUserMedia ||
  (navigator as any).webkitGetUserMedia ||
  (navigator as any).mozGetUserMedia ||
  (navigator as any).msGetUserMedia;


// 创建PeerConnection实例 (参数为null则没有iceserver，即使没有stunserver和turnserver，仍可在局域网下通讯)
const pc: any = new RTCPeerConnection();
onMounted(()=>{
// 发送ICE候选到其他客户端
  pc.onicecandidate = function (event: any) {
    if (event.candidate !== null) {
      socket.emit(
        'ice_candidate',
        JSON.stringify({
          account: prop.receiveAccount,
          event: 'ice_candidate',
          data: {
            candidate: event.candidate
          }
        })
      );
    }
  };
// 如果检测到媒体流连接到本地，将其绑定到一个video标签上输出
  pc.onaddstream = async function (event: any) {
    (document as any).getElementById('remoteVideo1').srcObject = event.stream;
  };
// 发送offer和answer的函数，发送本地session描述
  const sendOfferFn = function (desc: any) {
    pc.setLocalDescription(desc);
    socket.emit(
      'ice_candidate',
      JSON.stringify({
        account: prop.receiveAccount,
        event: '_offer',
        data: {
          sdp: desc
        }
      })
    );
  };
  const sendAnswerFn = function (desc: any) {
    pc.setLocalDescription(desc);
    socket.emit(
      'ice_candidate',
      JSON.stringify({
        account: prop.receiveAccount,
        event: '_answer',
        data: {
          sdp: desc
        }
      })
    );
  };
// 获取本地音频和视频流
  navigator.mediaDevices
    .getUserMedia({
      // 视屏设置
      video: {
        width: 300,
        height: 400,
        facingMode: 'user'
      }
    })
    .then((stream: any) => {
      //绑定本地媒体流到video标签用于输出
      (document as any).getElementById('localVideo1').srcObject = stream;
      //向PeerConnection中加入需要发送的流
      pc.addStream(stream);
      mediaStreamTrack = stream;
      //发送一个offer信令
      pc.createOffer(sendOfferFn, function (error: any) {
        console.log('Failure callback: ' + error);
      });
    })
    .catch((error) => {
      //处理媒体流创建失败错误
      alert('getUserMedia error: ' + error);
    });
  socket.on('_ice_candidate', (event: any) => {
    let json = JSON.parse(event);
    //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
    if (json.event == 'ice_candidate') {
      pc.addIceCandidate(new RTCIceCandidate(json.data.candidate));
    } else {
      pc.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
      // 如果是一个offer，那么需要回复一个answer
      if (json.event == '_offer') {
        pc.createAnswer(sendAnswerFn, function (error: any) {
          console.log('Failure callback: ' + error);
        });
      }
    }
  });
})

onBeforeUnmount(() => {
  // 组件销毁停止获取媒体流数据
  mediaStreamTrack.getTracks()[0].stop();
});
// 发送发挂断电话
const sponsorHangup = () =>{
  postAddMessage({
    "account": prop.receiveAccount,
    "receive_account": sessionStorage.getItem("account"),
    "content_type": 1,
    "content": "通话结束"
  }).then(()=>{
    socket.emit("hangup videoCall",{"account":prop.receiveAccount});
    videoChat.value = false;
  })
}

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
