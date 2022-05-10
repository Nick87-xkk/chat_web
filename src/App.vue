<template>
  <router-view style="width: 100%; height: 100%"></router-view>
</template>

<script setup lang="ts">

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50 !important;
  width: 100vw;
  height: 100vh;
  background: url('./assets/back-2.webp') no-repeat;
 /* background: #FFEFBA;  !* fallback for old browsers *!
  background: -webkit-linear-gradient(to top, #FFFFFF, #FFEFBA);  !* Chrome 10-25, Safari 5.1-6 *!
  background: linear-gradient(to top, #FFFFFF, #FFEFBA); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
  /*
  background: #12c2e9;  !* fallback for old browsers *!
  background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  !* Chrome 10-25, Safari 5.1-6 *!
  background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!
  */

  background-size: cover;
  user-select: none;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: #989b9d;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  background: rgba(0, 0, 0, 0.2) !important;
  scrollbar-arrow-color: #98bfed;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1) !important;
}
</style>
