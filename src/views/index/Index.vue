<template>
    <div class="login-box">
        <div class="glass">
            <div class="index-left">
                <div class="status-bar"></div>
                <div class="friend-list"></div>
            </div>

            <div class="index-right">
                
            </div>
        </div> 
    </div>
</template>

<script lang="ts" setup>
   
</script>

<style lang="scss" scoped>
.login-box {
    background: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

    .glass {
        width: 1080px;
        height: 720px;
        border-radius: 20px;
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 5px 0 rgb(136, 165, 33);
        overflow:hidden;
    }
    .index-left {
        width: 320px;
        height: 100%;
        box-shadow: 0 0 5px 0 rgb(136, 165, 33);
        overflow: auto;

        .status-bar {
            width: 100%;
            height: 80px;
            box-shadow: 0 0 5px 0 rgb(136, 165, 33);
        }
        .friend-list {
            
        }
    }
}
</style>