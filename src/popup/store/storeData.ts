/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName storeData.ts
 * @CreateDate  周一  09/23/2024
 * @Description 数据池公用数据
 ****************************************************************************/

import { refreshDelayT } from 'src/common/chromeLStorage';

/** useSelector 使用 state 数据类型 */
export type StoreState = {
  /** 当前标签页信息 */
  tab: {
    /** 标签的 id */
    id: number;
    /** 标签的 url */
    url: string;
  };
  /*** 定时刷新相关 */
  refresh: {
    /** 定时延迟 */
    info: { [x: number]: refreshDelayT };
  };
};
/** store 异步想关参数列  */
export const storeSyncList = {
  /**
   *  # REFRESH_SET_DELAY
   *  用于 `refreshSlice` 异步，设定当下的值\
   * 使用方法：
   * ```ts
   *  dispatch({
   *     type:storeSyncList.REFRESH_SET_DELAY,
   *     payload: { id: number,delay: number },
   *   });
   * ```
   *
   */
  refresh_set_delay: 'REFRESH_SET_DELAY',
  /**
   * # INIT_TAB_INFO
   * 用于 `tabSlice` 异步，获取页面的信息
   * 使用方法：
   * ```ts
   *      dispatch({
   *     type: storeSyncList.init_tab_info,
   *    payload: { id: page.id, url: page.url },
   *   });
   * ```
   */
  init_tab_info: 'INIT_TAB_INFO',
};
