/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple-refresh
 * @FileName root.tsx
 * @CreateDate  周三  10/09/2024
 * @Description 调试窗口的根目录
 ****************************************************************************/

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import createRootElement from 'src/common/createRootElement';
import { setStyle } from 'src/common/element';
import { App } from './app';

/** 抓取到根元素 */
const root = createRootElement();
for (const key of ['html', 'body']) {
  (document.querySelector(key) as HTMLElement)!.addEventListener(
    'contextmenu',
    e => {
      e.stopPropagation();
      e.preventDefault();
      return false;
    },
  );
}
/// 为了能够复用，在抓到根元素后才赋值
setStyle(root, {
  width: '100%',
  height: '100%',
  position: 'relative',
  '--my-height': '100px',
});
setStyle(root, {
  '--my-color': '#f0f',
});

const html = document.querySelector('html');
html!.lang = chrome.i18n.getUILanguage().toLocaleLowerCase().startsWith('zh')
  ? 'zh_cn'
  : 'en';
html!.dir = chrome.i18n.getMessage('@@bidi_dir');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
