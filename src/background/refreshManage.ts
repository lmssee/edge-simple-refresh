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

export function managementRefresh(type: string, tab: CmTabsTab) {
  const id = tab.id!;
  getLocalRefreshList(result => {
    // 收到页面的问询消息后从本地获取数据
    if (result.refreshPageList && result.refreshPageList[id]) {
      const localValue = result.refreshPageList[id];
      switch (type) {
        /// 页面初始化后查询刷新状态
        case 'askRefresh': {
          if (refreshList[id]) clearTimeout(refreshList[id].timeId); /// 清理完成的定时器
          const state = localValue.state == 'refresh';
          message.refresh(localValue);
          refreshList[id] = {
            timeId: state
              ? setTimeout(() => {
                  message.reloadPage(id);
                }, localValue.delay * 1000)
              : setTimeout(() => 1),
            delay: localValue.delay,
            id,
            state: state ? 1 : 0,
            startTime: Date.now(),
            remainderTime: localValue.delay * 1000,
          };
          break;
        }
        /// 页面发送取消当前页面刷新记录
        case 'cancelRefresh': {
          clearTimeout(refreshList[id].timeId); /// 清理完成的定时器
          delete result.refreshPageList[id]; /// 移除本地储存的数据
          CLStorage.set(
            {
              refreshPageList: result.refreshPageList,
            },
            () => {
              delete refreshList[id]; /// 移除内存中储存的数据
            },
          );
          break;
        }
        /// 状态刷新
        case 'refreshState': {
          if (!localValue) {
            clearTimeout(refreshList[id].timeId); /// 清理完成的定时器
            /// 状态被清理
            delete refreshList[id]; /// 移除内存中储存的数据
          }
          /// 尚没有值，即开始阶段
          else if (!refreshList[id]) {
            refreshList[id] = {
              timeId: setTimeout(() => {
                message.reloadPage(id);
              }, localValue.delay * 1000),
              delay: localValue.delay,
              id,
              state: 1,
              startTime: Date.now(),
              remainderTime: localValue.delay * 1000,
            };
          } else {
            const _r = refreshList[id];
            clearTimeout(_r.timeId); /// 清理完成的定时器
            /** 下面的赋值是有序的 */
            _r.remainderTime = Math.floor(
              localValue.delay * (1 - (Date.now() - _r.startTime) / _r.delay),
            );
            _r.startTime = Date.now();
            _r.delay = localValue.delay;
            _r.timeId = setTimeout(() => {
              message.reloadPage(id);
            }, _r.remainderTime);
          }

          break;
        }
        /// 页面发送来的切换页面刷新 （暂停 ⇔⇔ 恢复）
        default: {
          const _r = refreshList[id];
          if (type == 'suspendRefresh') {
            console.log('====================================');
            console.log(_r, _r.timeId);
            console.log('====================================');
            clearTimeout(_r.timeId); /// 清理完成的定时器
            _r.remainderTime = Math.round(
              _r.remainderTime - (Date.now() - _r.startTime),
            );
            _r.state = 0;
          } else {
            _r.state = 1;
            _r.startTime = Date.now();
            _r.timeId = setTimeout(() => {
              message.reloadPage(id);
            }, _r.remainderTime);
          }
          CLStorage.set({
            refreshPageList:
              ((result.refreshPageList[id].state =
                (type === 'suspendRefresh' && 'suspend') || 'refresh'),
              result.refreshPageList),
          });
          break;
        }
      }
    }
    return;
  });
}
