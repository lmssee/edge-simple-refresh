/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName contents.js
 * @CreateDate  周日  09/01/2024
 * @Description 嵌入页面的逻辑代码
 * 嵌入行为由 {@link ../../manifest.json} 决定
 *
 *
 * ## 嵌入逻辑
 *
 * ### 定时刷新
 * - 以 js 向页面嵌入一个按钮（在 popup 窗口点击本页面定时刷新后）
 * - 由属性记录时间，开启刷新
 * - 当刷新被暂停，记录当下剩余时间
 * - 恢复时赋值给该页面，并重复记录开始时间
 * - 页面刷新后回去后台问询当前刷新的原本时常间隔，所以不记录
 *
 ****************************************************************************/

/** 开发打开一键重启扩展按钮 */
import createRootElement from 'src/common/createRootElement';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import React from 'react';
import { App } from './app';
import { setStyle } from 'src/common/element';

/** 当前根元素 */
const rootElement = createRootElement(true);
const height = '30px';

/** 给根原属设定行内样式 */
setStyle(rootElement, {
  position: 'fixed',
  zIndex: 10000,
  right: '20px',
  top: '10%',
  width: '150px',
  height,
  lineHeight: height,
  borderRadius: height,
  display: 'var(--custom-float-button-visibility)',
});

createRoot(rootElement).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
);

/** 切换底部移动背景的动画状态
 * @param {boolean} [pause=true]  默认为让动画停止（true）
 */

export function changeAnimationState(pause: boolean = true) {
  const styles = document.styleSheets;
  const styleLength = styles.length - 1;
  for (let i = styleLength; i > -1; i--) {
    const ip = (styles[i].ownerNode as HTMLElement)!.dataset['ip'];
    if (ip && ip === 'id') {
      (
        (styles[i].cssRules[0] as CSSStyleRule).cssRules[0] as CSSStyleRule
      ).style.animationPlayState = pause ? 'paused' : 'running';
      break;
    }
  }
}
