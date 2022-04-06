// 发送信息
export interface SendMessageType {
    // 发送人id
    user_id: string,
    // 发送时间
    create_time: string,
    // 发送内容
    content: string,
    // 发送图片地址
    image_path: string|null,
    // 会话id
    conversation_id: string,
    // 已读
    read: boolean
}