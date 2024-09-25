/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName background.js
 * @CreateDate  周一  09/02/2024
 * @Description 设定背景逻辑
 ****************************************************************************/

/** 将右键的执行代码放进来 */
import { CRuntime } from 'src/common/chromeRuntime';
import './getState';
import { managementRefresh } from './refreshManage';
import { CTabs } from 'src/common';

/// 获取当前刷新状态
/**
 * 作为背景逻辑，获取正在刷新的页面发送的消息。然后判断是否出发再次刷新
 *
 * 在页面被隐藏时，即  `tab` 的 `active` 为 `false` 时，发送
 *  */
CRuntime.messageAddListener((_r, sender) => {
  const response = _r as { [x: string]: number | string };
  /// 非礼勿视
  if (response['to'] !== 'backgroundJS') return;
  const { type } = response;
  if (type === 'reloadExtend') {
    chrome.runtime.reload(); /// 请求重新加载插件
    return;
  } else if (type === 'pageHidden') {
    CTabs.getCurrentPage(tabs => {
      if (tabs[0] !== sender.tab && sender.tab && sender.tab.active == !1)
        managementRefresh('suspendRefresh', sender.tab); // 如果抓取的当前页面为发送消息页面则执行
    });
    return;
  }
  /// 正在活动的页面发送来问询刷新页面的请求
  else if (
    type === 'askRefresh' ||
    type === 'cancelRefresh' ||
    type === 'suspendRefresh' ||
    type === 'restoreRefresh' ||
    type === 'refreshState'
  ) {
    if (sender.tab) managementRefresh(type, sender.tab);
  }
  return;
});
