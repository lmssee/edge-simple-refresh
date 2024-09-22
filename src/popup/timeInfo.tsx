/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName timeInfo.tsx
 * @CreateDate  周日  09/22/2024
 * @Description 当页面处于不可见页面
 ****************************************************************************/

import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './app.module.scss';
import { getLocaleText } from 'src/common/getLocaleText';
/*** 页面不允许展示定时刷新时展示的块 */
export function TimeInfo() {
  /// 设定定时器的值
  const [timeoutId, setTimeoutId] = useState(setTimeout(() => 0));
  /// 展示的时间
  const [timeShow, setTimeShow] = useState({
    time: '',
    day: '',
  });

  function setTime() {
    const now = new Date();
    setTimeShow({
      time: now.toLocaleString(),
      day: `周${['天', '一', '二', '三', '四', '五', '六'][now.getDay()]}`,
    });
  }
  /// 初始化仅当未给值的时候进行第一次调用，后续直接在副总用器中产生值
  if (timeShow.day === '') setTime();

  useLayoutEffect(() => {
    setTimeoutId(
      setTimeout(() => {
        setTime();
      }, 1000),
    );
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeShow]);

  return (
    <div className={styles.timeShow}>
      <div> {timeShow.time}</div>
      <div> {timeShow.day}</div>
      <NotRefreshInfo />
    </div>
  );
}

/** 页面不可刷新时展示文本信息 */
function NotRefreshInfo() {
  /** 展示的文本 */
  const [text, setText] = useState('');
  useEffect(() => {
    /// 获取本地化文本
    setText(getLocaleText('no_refresh_node'));
    return () => {};
  }, []);
  return <div>{text}</div>;
}
