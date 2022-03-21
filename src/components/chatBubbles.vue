<!-- <template>
    <div>
        <div class="app" id="messages">
            <div
                v-for="item of props.messageList"
                :class="{ right: item.type === 'send', left: item.type !== 'send' || null }"
            >
                <span>{{ item.data }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

interface messageType {
    type?:string,
    username?:string,
    data?:string,
    headPortrait?: string,
    messageTiem?:string
}

const props: { messageList:messageType; }  = defineProps({
    messageList:Object,
})
</script>

<style lang="scss" scoped>
</style> -->