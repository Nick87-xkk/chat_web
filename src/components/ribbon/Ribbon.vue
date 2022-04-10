<template>
    <div>
        <div class="card-box">
            <div class="card">
                <weather-card></weather-card>
            </div>

<!--            <div class="card"></div>-->
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.card-box {
    height: inherit;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    //align-content: space-around;
    color: black;

    .card {
        width: 98%;
        height: 300px;

        border-radius: 10px;
        //box-shadow: 0 0 5px 0;
    }

    /*.weather-card {
    border-radius: 10px;
    box-shadow: 0 0 5px 0;
    color: black;
  }*/
}
</style>