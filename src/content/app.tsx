/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple
 * @FileName app.tsx
 * @CreateDate  周日  09/22/2024
 * @Description 嵌入脚本的主页面逻辑
 ****************************************************************************/

import React, { useEffect, useState } from 'react';
import { CRuntime } from 'src/common';
import { message } from './message';
import styles from './app.module.scss';
import { data } from './data';
import { getLocaleText } from 'src/common/getLocaleText';
import { setStyle } from 'src/common/element';

export function App() {
  const [state, setState] = useState(-1);
  const [delay, setDelay] = useState(0);

  /** 页面效果 */
  const visibilitychange = () => {
    const visibility = document.visibilityState;
    console.log('====================================');
    console.log(visibility, data);
    console.log('====================================');
    if (visibility === 'visible' && data.state === 0 && !data.positiveStop) {
      data.state = 1;
      message.restoreRefresh();
      setState(1);
    } else if (document.hidden && data.state === 1 && !data.positiveStop) {
      setState(0);
      data.state = 0;
      message.pageHidden();
    }
  };
  /** 该按钮被点击触发  */
  function clickIt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { target } = e,
      position =
        target &&
        (target as HTMLElement).dataset &&
        (target as HTMLElement).dataset['position'];
    if (!position) return;
    else if (position === 'left') {
      message.cancelRefresh(); /// 发送消息
      setState(-1); /// 设置新状态
    } else if (position === 'right') {
      const isSuspend = state == 1;
      message[isSuspend ? 'suspendRefresh' : 'restoreRefresh'](); /// 发送消息
      setState(isSuspend ? 0 : 1); /// 设置新状态
      data.positiveStop = isSuspend;
    }
  }
  /** 初始化监听数据变化 */
  useEffect(() => {
    CRuntime.messageAddListener((r: unknown) => {
      const request = r as {
        type: string;
        state: string;
        delay: number;
        from: 'backgroundJS' | 'popup';
        to: 'contentJS' | '';
      };
      switch (request.type) {
        /// 收到刷新页面相关的消息
        case 'refresh': {
          if (request.from == 'popup') message.refreshState();
          setDelay(request.delay);
          if ((data.delay = request.delay) === 0) setState(-1);
          else if (request.state === 'suspend') {
            setState(0);
            data.positiveStop = true;
          } else {
            setState(1);
            data.positiveStop = false;
          }
          break;
        }
        case 'reloadPage': {
          window.location.reload();
          break;
        }
      }
    });

    /** 问询当前页面是否要运行 */
    message.askRefresh();
    /// 放一个监听者，当页面被隐藏时触发
    document.addEventListener('visibilitychange', visibilitychange);
    return () => {
      document.removeEventListener('visibilitychange', visibilitychange);
    };
  }, []);

  useEffect(() => {
    data.state = state;
    const body = document.body;
    setStyle(body, {
      '--refresh-animation-delay': `${delay}s`,
      '--custom-float-button-visibility': state > -1 ? 'block' : 'none',
    });
  }, [state, delay]);

  return (
    <div
      className={styles.floatButton}
      style={{ animationPlayState: state == 1 ? 'running' : 'paused' }}
      onContextMenu={e => e.preventDefault()}
      onClick={e => {
        clickIt(e);
      }}
    >
      <SpanList state={state} />
      {/* {state > -1 && <SpanList state={state} />} */}
    </div>
  );
}

function SpanList(props: { state: number }) {
  const [StopText, setStopText] = useState('');
  const [rightText, setRightText] = useState('');
  const setRightTextFn = () =>
    setRightText(
      getLocaleText(props.state === 1 ? 'right_suspend' : 'right_restore'),
    );

  useEffect(() => {
    setStopText(getLocaleText('float_left'));
    setRightTextFn();
  }, []);
  useEffect(() => {
    setRightTextFn();
  }, [props.state]);

  return (
    <>
      <span data-position="left">{StopText}</span>
      <span data-position="right">{rightText}</span>
    </>
  );
}
