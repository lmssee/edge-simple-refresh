/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName refresh simple
 * @FileName getState.ts
 * @CreateDate  周一  09/23/2024
 * @Description  获取当前的状态
 ****************************************************************************/

import { CTabs } from 'src/common';
import { getLocalRefreshList } from './getLocalRefreshList';

/**  @ts-expect-error:  en */
chrome.getState = getState;

/**
 * 获取当前刷新页面的状态
 */
function getState() {
  /**  在弹出窗口不打印该信息  */
  if (!location.pathname.endsWith('background.js')) return;

  getLocalRefreshList(result => {
    const refreshPageList = result['refreshPageList'] || {};
    CTabs.get({}, response => {
      console.log(
        `\n\n当前共打开${response.length}个窗口，正在刷新的有${
          Object.keys(refreshPageList).length
        }个窗口`,
      );
      for (const key in refreshPageList) {
        for (const element of response) {
          if (element.id === Number(key)) {
            const t = (r: string, n: number) => `\u001B[${n}m${r}\u001B[m`;
            if (element.active) {
              console.log(`      ${t(`页面：${element.title}`, 34)}`);
            } else
              console.log(`      ${t(`页面（隐藏）：${element.title}`, 37)}`);
            break;
          }
        }
      }
      console.log('================================');
      console.log('当前窗口信息', response);
      console.log('刷新页面的信息', refreshPageList);
      console.log('====================================\n\n');
    });
  });
}
