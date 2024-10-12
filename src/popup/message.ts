/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple-refresh
 * @FileName message.ts
 * @CreateDate  周六  10/12/2024
 * @Description 消息机制
 ****************************************************************************/

import { CTabs } from 'src/common';

/** 页面 id */
export const pageInfo = {
  id: 0,
};

/**
 * ##  消息
 *
 *  */
export const message = {
  /**  发送消息 */
  send(msg: { [key: string]: unknown }, callback?: (result: unknown) => void) {
    CTabs.sendMessage(pageInfo.id, msg, callback);
  },
  /** 问询该页面是否存在 */
  areYouThere(callback: (arg: unknown) => void) {
    this.send(
      {
        type: 'areYouThere',
        from: 'popup',
        to: 'contentJS',
      },
      callback,
    );
  },
  /**  向嵌入脚本发送消息 */
  changeState(state: string | undefined, delay: number) {
    this.send({
      type: 'refresh',
      state,
      from: 'popup',
      to: 'contentJS',
      delay,
      visibilityState: true,
    });
  },
};
