<template>
  <div class="login">
      <div class="login-box"></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: inherit;
        .login-box{
            width: 500px;
            height: 400px;
            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);
        }
    }
</style>