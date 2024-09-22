/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName refreshRadio.tsx
 * @CreateDate  周日  09/22/2024
 * @Description 按钮组
 ****************************************************************************/

import React, { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from './store/store';
import { useDispatch } from 'react-redux';
import { setDelay } from './store/refreshSlice';
import { refreshDelayT } from 'src/common/chromeLStorage';

/** 下部的单选框
 *
 * 初始化的时候会更具当前的
 */
export function RadioBlock(): React.JSX.Element {
  const refreshInfo = useSelector((state: StoreState) => state.refresh.info);
  const id = useSelector((state: StoreState) => state.tab.id);
  // 获取按钮组
  const radio = useRef(null);
  const dataList: refreshDelayT[] = [1.2, 2.4, 3.6];

  const dispatch = useDispatch();
  /** 设定选中状态 */
  function setChecked(en: refreshDelayT) {
    if (!radio.current) return;
    const element = document.querySelector(
      `input[value='${en}']`,
    ) as HTMLInputElement;
    if (!element) return;
    element.checked = true;
  }

  /** 改变当前的值 */
  function changeState(delay: refreshDelayT) {
    console.log('====================================');
    console.log(delay);
    console.log('====================================');
    const data: { [x: number]: number } = {};
    data[id] = delay;
    /** 上报数据 */
    dispatch(setDelay(data));
  }

  /** 初始化数据 */
  useLayoutEffect(() => {
    /** 没有值的时候重置值 */
    if (!refreshInfo || !refreshInfo[id]) {
      dispatch(setDelay({ id: dataList[0] }));
      setChecked(dataList[0]);
    } else setChecked(refreshInfo[id]);
    return () => {};
  }, []);

  return (
    <div ref={radio}>
      {dataList.map(ele => (
        <div key={ele}>
          <input
            type="radio"
            name="timedRefreshTime"
            value={ele}
            id={'radio' + ele}
          />
          <label htmlFor={'radio' + ele} onClick={() => changeState(ele)}>
            {ele}s
          </label>
        </div>
      ))}
    </div>
  );
}
