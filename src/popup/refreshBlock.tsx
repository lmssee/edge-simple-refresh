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

/** 导出主模块  */
export function Refresh(): React.JSX.Element {
  /** 标签页的 id ，用于发送消息给指定的标签页 */
  const id = useSelector((state: StoreState) => state.tab.id);
  const refreshInfo = useSelector((state: StoreState) => state.refresh.info);
  const [stateText, setStateText] = useState('');
  const [stateValueText, setStateValueText] = useState('正查询');
  const [StateNow, setStateNow] = useState(false);

  /** 改变当前状态 */
  function changeState() {
    const newStateNow = !StateNow;
    setStateNow(newStateNow);
    manageData(newStateNow);
  }

  /** 发送消息 */
  function sendMessage(en: boolean) {
    CTabs.sendMessage(id, {
      type: 'refresh',
      state: 'refresh',
      from: 'popup',
      to: 'contentJS',
      delay: en ? refreshInfo[id] || 1.2 : 0,
      visibilityState: true,
    });
  }

  /** 管理数据 */
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
  /** 根据现有的数据管理 */
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
      CLStorage.set({ refreshPageList }, () => {
        /** 值储存到本地后再进行更改 */
        sendMessage(en);
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
