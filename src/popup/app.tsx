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

/** 根元素 */
export function App() {
  const dispatch = useDispatch();
  const [ShowOther, setShowOther] = useState(true); /// 用于判定页面是否支持刷新

  /** 通过向其嵌入脚本发送消息检测当前是否可刷新 */
  function testCanRefresh(id: number | undefined) {
    if (!id) {
      setShowOther(!1);
      return;
    } // 设置当前页面是否展示可刷新信息

    CTabs.sendMessage(
      id,
      {
        type: 'areYouThere',
        from: 'popup',
        to: 'contentJS',
      },
      result => setShowOther(result !== undefined),
    );
  }

  /** 设定 h1 文本 */
  const [h1Text, setH1Text] = useState('');
  useEffect(() => {
    CTabs?.getCurrentPage(tabs => {
      const page = tabs[0];
      dispatch({
        type: storeSyncList.init_tab_info,
        payload: { id: page.id, url: page.url },
      });
      testCanRefresh(page.id);
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
