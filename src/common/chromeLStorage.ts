/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName chromeLStorage.ts
 * @CreateDate  周六  09/14/2024
 * @Description `chrome.storage.local` 相关逻辑
 ****************************************************************************/

/** chrome 本地储存数据  */
const chromeStorageLocal = chrome.storage.local;

/** # 本地储存数据 chrome.storage.local
 * - get(attributeList, callback) 获取本地储存的数据
 * - set(data)                    设置本地储存数据

 */
export const CLStorage = {
  /**  获取本地储存的值
   *  @param {string[]} attributeList 字符串数组
   * @param  {()=>null} call  Back 回调函数
   */
  get(
    attributeList: 'refreshPageList'[],
    callBack?: ((result: CmStorageLocalValueT) => undefined) | undefined,
  ) {
    chromeStorageLocal.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage`
   *  ```ts
   * type CmStorageLocalValueT = {
   *         refreshPageList?: {
   *             [x: number]: {
   *                 state?: "refresh" | "suspend";
   *                 id: number;
   *             };
   *         };
   *     }
   *
   * ````
   */
  set(data: CmStorageLocalValueT, callback?: (result?: unknown) => undefined) {
    chromeStorageLocal.set(data, callback);
  },
};

/** 刷新的时间延迟 */
export type refreshDelayT = 1.2 | 2.4 | 3.6 | 0;

/** 刷新列表项  */

export type refreshItemT = {
  /** 刷新的状态
   *  - refresh 正在刷新
   *  - suspend 暂停刷新
   */
  state?: 'refresh' | 'suspend';
  /** 窗口的 id */
  id: number;
  /** 延迟时间，可选值： 0、1.2、2.4、3.6 */
  delay: refreshDelayT;
  /** 当前的时间的毫秒表示 */
  time: number;
};

/** 刷新列表的本地储存
 * ```ts
 * type refreshItemT = {
 *    state?: "refresh" | "suspend";
 *    id: number;
 *    delay: refreshDelayT;
 *}
 *    ```
 */
export type refreshPageListT = {
  [x: number]: refreshItemT;
};

/** `chrome.storage.local` 本地储存值的数据类型
 *
 * - refreshPageList 储存在本地的数据
 */
export type CmStorageLocalValueT = {
  /** 储存在本地的数据
   * ```ts
   * type refreshPageListT = {
   *       [x: number]: {
   *           state?: "refresh" | "suspend";
   *           id: number;
   *           delay: 1.2 | 2.4 | 3.6 | 0;
   *       };
   *   }
   * ```
   */
  refreshPageList?: refreshPageListT;
};
