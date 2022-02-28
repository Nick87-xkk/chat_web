<script setup lang="ts">
import { computed, ref } from 'vue';
import store from '../store';

const num = ref(0);

// 测试store
const state = computed(() => store.state.count);

function changeCount(): void {
  store.commit('commitCount', 1);
}
</script>
<template>
  <h1 @click="num++">{{ num }}</h1>
  <h1>store-count:{{ state }}</h1>
  <button @click="changeCount">state-count</button>
</template>
