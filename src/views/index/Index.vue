<template>
  <div class="login-box">
      <div class="glass">
          <div class="friend-list">

          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.login-box{
    background: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

    .glass{
        width: 1080px;
        height: 720px;
        border-radius: 20px;
        -webkit-backdrop-filter:blur(20px);
        backdrop-filter: blur(20px) ;
        box-shadow: 0 0 5px 0 ;
    }
    .friend-list{
        width:320px;
        height:100%;
        border-radius:20px;
        border:solid 1px;
        overflow:auto;
    }

}

</style>