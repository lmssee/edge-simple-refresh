/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName rest-new-tab
 * @FileName chromeRuntime.ts
 * @CreateDate  周六  09/14/2024
 * @Description chrome.runtime 相关逻辑
 ****************************************************************************/

import { CmRuntimeSender } from 'a-edge-extends-types/runtime';

const chromeRuntime = chrome.runtime;

/** # `chrome.runtime`
 * - messageAddlistener 注册消息监听机制
 * - sendMessage        发送消息机制
 */
export const CRuntime = {
  /** 注册消息监听机制，一般由嵌入脚本（content.js）或内置页面 (background.js) 触发
   *
   */
  messageAddListener(
    callback: (def: unknown, sender: CmRuntimeSender) => undefined,
  ): undefined {
    chromeRuntime.onMessage.addListener(callback);
  },
  /** 发送消息，一般由嵌入脚本或内置页面触发 */
  sendMessage(
    msg: { [x: string]: unknown },
    callback?: (result: unknown) => undefined,
  ) {
    if (typeof callback == 'function')
      chrome.runtime.sendMessage({ ...msg, from: 'contentJS' }, callback);
    else chrome.runtime.sendMessage({ ...msg, from: 'contentJS' });
  },
};
