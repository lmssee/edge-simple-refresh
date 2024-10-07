/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName refreshManage.ts
 * @CreateDate  周一  09/23/2024
 * @Description 刷新页面状态管理
 ****************************************************************************/

import { CLStorage } from 'src/common';
import { message } from './message';
import { getLocalRefreshList } from './getLocalRefreshList';
import { CmTabsTab } from 'a-edge-extends-types/tab';
import { refreshList } from './refreshList';
import { CmStorageLocalValueT, refreshItemT } from 'src/common/chromeLStorage';

export function managementRefresh(type: string, tab: CmTabsTab) {
  const id = tab.id!;
  getLocalRefreshList(result => {
    // 收到页面的问询消息后从本地获取数据
    if (result.refreshPageList && result.refreshPageList[id]) {
      /** 本地储存的数据 */
      const localValue = result.refreshPageList[id]!;
      switch (type) {
        /// 页面初始化后查询刷新状态
        case 'askRefresh': {
          askRefresh(id, localValue);
          break;
        }
        /// 页面发送取消当前页面刷新记录
        case 'cancelRefresh': {
          cancelRefresh(id, result);
          break;
        }
        /// 状态刷新
        case 'refreshState': {
          refreshState(id, localValue);
          break;
        }
        /// 页面发送来的切换页面刷新 （暂停 ⇔⇔ 恢复）
        default: {
          otherState(id, type, result);
          break;
        }
      }
    } else if (refreshList[id]) {
      /// 在 popup 点击关闭状态后将触发该状态（此时在本地储存的数据已经清理）这时候清理内存中的数据
      clearTimeout(refreshList[id].timeId); /// 清理完成的定时器
      delete refreshList[id]; /// 移除内存中储存的数据
    }
    return;
  });
}

/** 页面问询当前是否可刷新 */
function askRefresh(id: number, localValue: refreshItemT) {
  if (refreshList[id]) clearTimeout(refreshList[id].timeId); /// 清理完成的定时器
  const state = localValue.state == 'refresh';
  message.refresh(localValue); /// 将本地数据直接发给嵌入脚本
  refreshList[id] = {
    timeId: state
      ? setTimeout(() => {
          chrome.tabs.reload(id);
        }, localValue.delay * 1000)
      : setTimeout(() => 1),
    delay: localValue.delay,
    id,
    state: state ? 1 : 0,
    startTime: Date.now(),
    remainderTime: localValue.delay * 1000,
  };
}

/** 关闭页面刷新 */
function cancelRefresh(id: number, result: CmStorageLocalValueT) {
  clearTimeout(refreshList[id].timeId); /// 清理完成的定时器
  delete result.refreshPageList![id]; /// 移除本地储存的数据
  CLStorage.set(
    {
      refreshPageList: result.refreshPageList,
    },
    () => {
      delete refreshList[id]; /// 移除内存中储存的数据
    },
  );
}
/** 页面请求刷新状态，多由于在 popup 页面更改了当前的状态 */
function refreshState(id: number, localValue: refreshItemT) {
  if (localValue.delay === 0) {
    clearTimeout(refreshList[id].timeId); /// 清理完成的定时器
    /// 状态被清理
    delete refreshList[id]; /// 移除内存中储存的数据
    return;
  }
  /// 尚没有值，即开始阶段
  else if (!refreshList[id]) {
    refreshList[id] = {
      timeId: setTimeout(() => {
        chrome.tabs.reload(id);
      }, localValue.delay * 1000),
      delay: localValue.delay,
      id,
      state: 1,
      startTime: Date.now(),
      remainderTime: localValue.delay * 1000,
    };
  } else {
    /// 延迟时间改变
    const _r = refreshList[id];
    clearTimeout(_r.timeId); /// 清理完成的定时器
    /** 下面的赋值是有序的 */
    _r.remainderTime = Math.floor(
      localValue.delay * (1 - (Date.now() - _r.startTime) / _r.delay),
    );
    _r.startTime = Date.now();
    _r.delay = localValue.delay;
    _r.timeId =
      localValue.state === 'suspend'
        ? setTimeout(() => 1)
        : setTimeout(() => {
            chrome.tabs.reload(id);
          }, _r.remainderTime);
  }
}

/** 页面请求切换刷新和暂停的状态 */
function otherState(id: number, type: string, result: CmStorageLocalValueT) {
  const _r = refreshList[id];
  if (type == 'suspendRefresh') {
    clearTimeout(_r.timeId); /// 清理完成的定时器
    _r.remainderTime = Math.round(
      _r.remainderTime - (Date.now() - _r.startTime),
    );
    _r.state = 0;
  } else {
    _r.state = 1;
    _r.startTime = Date.now();
    _r.timeId = setTimeout(() => {
      chrome.tabs.reload(id);
    }, _r.remainderTime);
  }
  CLStorage.set({
    refreshPageList:
      ((result.refreshPageList![id].state =
        (type === 'suspendRefresh' && 'suspend') || 'refresh'),
      result.refreshPageList),
  });
}
