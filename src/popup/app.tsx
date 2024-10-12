import React, { useEffect, useState } from 'react';
import { Footer } from './footer';
import { getLocaleText } from 'src/common/getLocaleText';
import { Refresh } from './refreshBlock';
import { useDispatch } from 'react-redux';
import { CTabs } from 'src/common';
import '../css/common.scss';
import '../css/product.scss';
import { TimeInfo } from './timeInfo';
import { storeSyncList } from './store/storeData';
import { message, pageInfo } from './message';
import { setDate } from './store/refreshSlice';

/** 根元素 */
export function App() {
  const dispatch = useDispatch();
  const [ShowOther, setShowOther] = useState(true); /// 用于判定页面是否支持刷新

  /** 通过向其嵌入脚本发送消息检测当前是否可刷新 */
  function testCanRefresh() {
    if (!pageInfo.id) {
      setShowOther(!1);
      return;
    }
    // 设置当前页面是否展示可刷新信息
    message.areYouThere((result: unknown) =>
      setShowOther(result !== undefined),
    );
  }

  /** 设定 h1 文本 */
  const [h1Text, setH1Text] = useState('');
  useEffect(() => {
    /** 重置数据
     *
     * 在新日期在 store 中自动管理新的数据
     */
    dispatch(setDate());

    CTabs?.getCurrentPage(tabs => {
      const page = tabs[0];
      dispatch({
        type: storeSyncList.init_tab_info,
        payload: { id: page.id, url: page.url },
      });
      pageInfo.id = page.id || 0; // 给页面信息赋值
      testCanRefresh();
    });
    setH1Text(getLocaleText('popup_h1')); // 设置标题
  }, []);

  return (
    <>
      <h1 className="textInOneLineHide">{h1Text}</h1>
      {(ShowOther && <Refresh></Refresh>) || <TimeInfo />}
      <Footer></Footer>
    </>
  );
}
