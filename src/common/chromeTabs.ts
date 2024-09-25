/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName chromeTabs.ts
 * @CreateDate  周六  09/14/2024
 * @Description `chrome.tabs` 相关的逻辑
 ****************************************************************************/

import { CmTabsTab } from 'a-edge-extends-types/tab';

const chromeTabs = chrome.tabs;
/** # 当前的页面的信息及向页面发送消息
 * - value                          `chrome.tabs`
 * - get(data, callback)             获取标签数据
 * - getCurrentPage(callback)        获取当前页面数据
 */
export const CTabs = {
  /** 获取页签数据 */
  get(
    data: {
      [x: string]: unknown;
      active?: boolean | undefined;
      currentWindow?: boolean | undefined;
    },
    callback: (tabs: CmTabsTab[]) => undefined,
  ) {
    chromeTabs.query(data, callback);
  },
  /** 取当前页面
   * @param {@link Function} callBack  回调函数，其第一个形参为 `tabs` 数组
   */
  getCurrentPage(callBack: (tabs: CmTabsTab[]) => undefined) {
    this.get({ active: true, currentWindow: true }, callBack);
  },
  /** 发送消息  */
  sendMessage(
    id: number,
    msg: unknown,
    callback?: (response: { [key: string]: unknown }) => void,
  ) {
    if (typeof callback === 'function')
      chrome.tabs.sendMessage(id, msg, {}, callback);
    else chrome.tabs.sendMessage(id, msg);
  },
};
