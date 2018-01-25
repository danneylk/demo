/*
 方法：接收Form消息
 参数： key         消息键值，消息名称（类名），如TestMsg
        content     消息内容，标准结构 {"MsgCode":0,"MsgData":""}
返回值：无
*/
function ReciveFormMsgs(key, content) {
    if (typeof ReciveFormMsg == "function") {
        ReciveFormMsg(key, content);
    }
}
/*
 方法：发送Form消息
 参数： key         消息键值
        content     消息内容
返回值：无
*/
function SendFormMsg(key, content) {
    winformObj.sendFormMsg(key, content);
}


