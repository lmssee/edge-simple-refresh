/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName refreshList.ts
 * @CreateDate  周一  09/23/2024
 * @Description   储存当前刷新的状态
 ****************************************************************************/

/** # 刷新列表的数据列
 *
 */
export const refreshList: {
  [x: number]: {
    /** 定时器时间 id  */
    timeId: NodeJS.Timeout;
    /** 原定时时间 */
    delay: number;
    /** 页面的 id */
    id: number;
    /** 当前状态
     * - -1 页面关闭
     * -  0 暂停刷新
     * -  1 即将刷新
     */
    state: number;
    /** 开始的时间 */
    startTime: number;
    /** 剩余的时间 */
    remainderTime: number;
  };
} = {};
