import React, { useEffect, useState } from 'react';
import { Footer } from './footer';
import { getLocaleText } from 'src/common/getLocaleText';
import { Refresh } from './refreshBlock';
import { useDispatch } from 'react-redux';
import { CTabs } from 'src/common';
import '../css/common.scss';
import '../css/product.scss';
import { TimeInfo } from './timeInfo';

/** 根元素 */
export function App() {
  const dispatch = useDispatch();
  const [ShowOther, setShowOther] = useState(true);

  /** 设定 h1 文本 */
  const [h1Text, setH1Text] = useState('');
  useEffect(() => {
    CTabs?.getCurrentPage(tabs => {
      const page = tabs[0];
      dispatch({
        type: 'init_tab_info',
        payload: { id: page.id, url: page.url },
      });
      const url = page!.url;
      setShowOther(/(^https?)|(^file)/i.test(url || '')); // 设置当前页面是否展示可刷新信息
    });
    setH1Text(getLocaleText('popup_h1')); // 设置标题
    return () => {};
  }, []);

  return (
    <>
      <h1 className="textInOneLineHide">{h1Text}</h1>
      {(ShowOther && <Refresh></Refresh>) || <TimeInfo />}
      <Footer></Footer>
    </>
  );
}
