/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName message.ts
 * @CreateDate  周六  09/14/2024
 * @Description 嵌入页面脚本的消息机制
 ****************************************************************************/

import { CRuntime } from '../common';

/** # 消息区
 *  由嵌入的脚本发送消息到后台脚本（原则上不直接发消息给弹出窗口）
 * - send            发送消息机制
 * - askRefresh      问询当前页面是否需要
 * - cancelRefresh   取消当前的消息
 * - suspendRefresh  暂停当前定时刷新
 * - restoreRefresh  恢复已暂停
 */
export const message = {
  /**  发送消息 */
  send(
    msg: { [key: string]: unknown },
    callback?: (result: unknown) => undefined,
  ) {
    CRuntime.sendMessage({ ...msg, from: 'contentJS' }, callback);
  },
  /** 发现消息问询是否刷新 */
  askRefresh() {
    this.send({
      type: 'askRefresh',
      to: 'backgroundJS',
    });
  },
  /** 取消定时刷新 */
  cancelRefresh() {
    this.send({
      type: 'cancelRefresh',
      to: 'backgroundJS',
    });
  },
  /** 暂停当前定时刷新 */
  suspendRefresh() {
    this.send({
      type: 'suspendRefresh',
      to: 'backgroundJS',
    });
  },
  /** 页面被隐藏，为了区分主动隐藏和重加载 */
  pageHidden() {
    this.send({
      type: 'pageHidden',
      to: 'backgroundJS',
    });
  },
  /** 恢复已暂停的刷新 */
  restoreRefresh() {
    this.send({
      type: 'restoreRefresh',
      to: 'backgroundJS',
    });
  },
  /** 刷新状态 */
  refreshState() {
    this.send({
      type: 'refreshState',
      to: 'backgroundJS',
    });
  },
  /** 重新加载扩展
   *
   * 用在 `development.ts` 开发环境
   */
  reloadExtend() {
    this.send({
      type: 'reloadExtend',
      to: 'backgroundJS',
    });
  },
};
