# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


### demo要做的功能
    video.vue 调用摄像头，麦克风（√）通过ws传输
    ├─api
    │  │  service.ts
    │  │
    │  └─modules
    │          index.api.ts
    │
    ├─assets
    │      back-2.webp
    │      background.jpg
    │      bk-3.jpg
    │      logo.png
    │      weather.png
    │
    ├─components
    │  │  chatBubbles.vue
    │  │  DialougeList.vue
    │  │  FriendChat.vue
    │  │  FriendGroups.vue
    │  │  hashCode.ts
    │  │  HelloWorld.vue
    │  │
    │  └─ribbon
    │          MusicPlayer.vue
    │          Ribbon.vue
    │          WeatherCard.vue
    │
    ├─directives
    │      globIndex.ts
    │
    ├─router
    │      globIndex.ts
    │
    ├─store
    │  │  globIndex.ts
    │  │
    │  └─modules
    │          user.ts
    │
    └─views
    │  Test.vue
    │  Video.vue
    │
    ├─chat
    │      Chat.vue
    │
    ├─index
    │      Index.vue
    │
    ├─login
    │      Login.vue
    │
    └─management
