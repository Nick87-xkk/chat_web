<template>
  <div class="weather-card">
    <div id="he-plugin-standard"></div>
  </div>
</template>

<script setup lang="ts">
// 和风天气
import {onMounted} from "vue";

window.WIDGET = {
  "CONFIG": {
    "layout": "1",
    "width": 700,
    "height": 300,
    "background": "5",
    "dataColor": "1e1212",
    "key": "2bee78c5a0034885bf513acfe4645e2a"
  }
}
onMounted(() => {
  (function (d) {
    let c = d.createElement('link')
    c.rel = 'stylesheet'
    c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0'
    let s = d.createElement('script')
    s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0'
    let sn = d.getElementsByTagName('script')[0]
    sn.parentNode!.insertBefore(c, sn)
    sn.parentNode!.insertBefore(s, sn)
  })(document)
})
</script>

<style scoped>
</style>
