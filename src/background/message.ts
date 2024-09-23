/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName message.ts
 * @CreateDate  周一  09/23/2024
 * @Description 消息机制
 ****************************************************************************/

import { CTabs } from 'src/common';

export /** 消息处理机制
 * - id       页面的 id
 * - send     发送消息的方法
 *
 */
const message = {
  /** 向发送消息
   * @param  {number}  id            要发给的 id
   * @param  {any}  msg           要发送的消息
   * @param  {function|undefined} callback      回调方法
   */
  send(id: number, msg: unknown, callback?: (response: unknown) => undefined) {
    CTabs.sendMessage(
      id,
      {
        ...(msg as { [x: string]: string }),
        time: Date.now(),
        from: 'backgroundJS',
      },
      callback,
    );
  },
  /** 刷新页面 */
  refresh(data: { id: number; [key: string]: unknown }) {
    this.send(data.id, {
      ...data,
      type: 'refresh',
      to: 'contentJS',
    });
  },
  reloadPage(id: number) {
    this.send(id, {
      type: 'reloadPage',
      to: 'contentJS',
    });
  },
};
