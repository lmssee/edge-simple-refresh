/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName common.js
 * @CreateDate  周日  09/01/2024
 * @Description 公共的逻辑
 ****************************************************************************/

export { CLStorage } from './chromeLStorage';
export { CTabs } from './chromeTabs';
export { CSStorage } from './chromeSStorage';
export { CRuntime } from './chromeRuntime';
/** 监听 storage 数据变化 */

export function CLChanged(
  callback: (
    pref: {
      [key: string]: {
        oldValue: unknown;
        newValue: unknown;
      };
    },
    areaName: 'local' | 'sync',
  ) => undefined,
) {
  chrome.storage.onChanged.addListener(callback);
}
