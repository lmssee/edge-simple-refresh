/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName refreshBlock.tsx
 * @CreateDate  周六  09/21/2024
 * @Description 刷新页面
 ****************************************************************************/

import React, { useEffect, useState } from 'react';
import { getLocaleText } from 'src/common/getLocaleText';
import styles from './app.module.scss';
import { CLStorage, CTabs } from 'src/common';
import { useSelector } from 'react-redux';
import { RadioBlock } from './refreshRadio';
import { refreshPageListT } from 'src/common/chromeLStorage';
import { StoreState } from './store/storeData';
import { message } from './message';

/** 导出主模块  */
export function Refresh(): React.JSX.Element {
  /** 标签页的 id ，用于发送消息给指定的标签页 */
  const id = useSelector((state: StoreState) => state.tab.id);
  /** 刷新的数据 */
  const refreshInfo = useSelector((state: StoreState) => state.refresh.info);
  /** 文本：“状态” */
  const [stateText, setStateText] = useState('');
  /** 文本：“关闭/开启” */
  const [stateValueText, setStateValueText] = useState('正查询');
  /** 当前状态 */
  const [StateNow, setStateNow] = useState(false);

  /** 改变当前状态
   *
   *
   * 触发器：
   *
   * - 由页面按钮点击事件触发
   */
  function changeState() {
    const newStateNow = !StateNow;
    setStateNow(newStateNow); /// 更改页面的状态
    manageData(newStateNow); /// 更改储存数据状态
  }

  /** 管理数据
   *
   * 根据动作管理该页面的数据
   *
   * 触发器：
   *
   * - 页面点击事件触发
   * - refreshInfo 数据变化
   *
   */
  function manageData(en: boolean) {
    CLStorage.get(['refreshPageList'], result => {
      const refreshPageList = result.refreshPageList || {};
      if (!en) delete refreshPageList[id]; // 取消定时
      else
        refreshPageList[id] = {
          id,
          time: Date.now(),
          state:
            (refreshPageList[id] && refreshPageList[id].state) || 'refresh', // 防止覆盖旧状态
          delay: refreshInfo[id] || 1.2,
        };
      /** 整理 */
      manageTabs(en, refreshPageList);
    });
  }
  /** 根据现有的数据管理
   *
   * 依据现有标签页的数据对就数据进行处理
   *
   * 清理旧的标签遗留数据
   */
  function manageTabs(en: boolean, refreshPageList: refreshPageListT) {
    CTabs.get({}, tabs => {
      const ids: number[] = [];
      tabs.forEach(el => el.id && ids.push(el.id));
      for (const key in refreshPageList) {
        if (Object.prototype.hasOwnProperty.call(refreshPageList, key)) {
          const element = refreshPageList[key];
          if (ids.indexOf(element.id) === -1)
            delete refreshPageList[element.id];
        }
      }
      /// 值储存到本地后再进行更改
      CLStorage.set({ refreshPageList }, () => {
        /** 发送消息
         *
         * 向页面发送当前动作
         *
         * 根据动作且人发送的延迟时间
         */
        message.changeState(
          refreshPageList[id].state,
          en ? refreshInfo[id] || 1.2 : 0,
        );
      });
    });
  }

  /** 仅初始化时需要设定 */
  useEffect(() => {
    setStateText(getLocaleText('state')); /// 设置状态文本
    CLStorage.get(['refreshPageList'], result => {
      // 获取值
      const a =
        result.refreshPageList && result.refreshPageList[id]
          ? result.refreshPageList[id].delay || 1.2
          : 0;
      /** 根据储存的值进行状态初始化，在 StateNow 的 useEffect 中会自动管理文本 */
      setStateNow(a > 0);
    });
  }, [id]);

  /** 当当前的值发生改变时触发的 (初始化和点击后会触发) */
  useEffect(() => {
    setStateValueText(getLocaleText(StateNow ? 'open' : 'close')); /// 设置状态值文本
  }, [StateNow]);

  /** 当选择的值发生变化  */
  useEffect(() => {
    /** 倘若当前不展示 */
    if (!StateNow || !refreshInfo || !refreshInfo[id]) return;
    manageData(StateNow);
  }, [refreshInfo]);

  return (
    <div className={styles.timeRefresh}>
      <div>
        {stateText}:
        <input
          type="button"
          style={{
            backgroundColor: StateNow ? '#000' : '#1003',
            color: StateNow ? '#0dd' : '#000',
          }}
          value={stateValueText}
          onClick={() => changeState()}
        />
      </div>
      {StateNow && <RadioBlock></RadioBlock>}
    </div>
  );
}
