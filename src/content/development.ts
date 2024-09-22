/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName development.ts
 * @CreateDate  周六  09/14/2024
 * @Description 开发相关逻辑
 *
 * - 向页面添加一个悬浮钮
 ****************************************************************************/
import { setStyle } from '../common/element';
// import { message } from './message';

/** 执行一个页面重新加载组建 */
(() => {
  const pageReload = () => setTimeout(() => window.location.reload(), 250);
  const element = document.createElement('simple-refresh');
  setStyle(element, {
    position: 'fixed',
    bottom: '84px',
    right: '48px',
    backgroundColor: '#000',
    color: '#0ff',
    margin: '0px',
    padding: '5px 6.5px 5px 3.5px',
    borderRadius: '22px',
    width: '22px',
    height: '22px',
    lineHeight: '8px',
    fontSize: '20px',
    textAlign: 'center',
    zIndex: '10000',
    boxShadow: '1px 1px 6px #f0f9,-1px -1px 6px #0f0e',
    boxSizing: 'border-box',
  });
  element.innerHTML = '⟲';
  element.title = '重加载扩展 reset new tab';
  element.addEventListener('click', () => {
    setStyle(element, { visibility: 'hidden' });
    createACover();
    pageReload();
    // message.reloadExtend();
  });
  element.addEventListener('contextmenu', () => pageReload());
  document.body.appendChild(element);

  /// 一个友好的遮盖层
  function createACover() {
    const cover = document.createElement('reload-cover-page');
    setStyle(cover, {
      position: 'fixed',
      top: '0',
      left: '0',
      textAlign: 'center',
      lineHeight: '100vh',
      fontSize: '24px',
      width: '100vw',
      height: '100vh',
      background: '#363a',
      color: '#fff',
      borderRadius: '48px',
      textShadow: 'rgba(0,255,55,0.69) 1px  1px 6px',
      zIndex: '10001',
    });
    cover.innerHTML = '请稍等，正在加载';
    document.body.appendChild(cover);
  }
})();
