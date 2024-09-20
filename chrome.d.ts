import { Chrome } from 'a-edge-extends-types';
/**
 *  将 `chrome `加入全局
 *  
 *  可使用 `window.chrome` 访问
 *   
 *  亦可直接使用 `chrome` 直接使用
 * 
 */
declare global {
  interface Window {
  /**
   * # Chrome
   *    
   *  - storage       本地（local）、云端（sync）、会话（session）储存相关
   *  - tabs          标签页管理，可获取标签页及丢弃、新建、复制... 
   *  - i18n          国际化相关的
   *  - tts           语音相关 
   *  - runtime       执行中
   *  - contextMenus  上下文菜单键（俗称右键）管理
   * 
  */
 chrome: Chrome;
 }
 
 /**
  * # Chrome
  *    
  *  - storage       本地（local）、云端（sync）、会话（session）储存相关
  *  - tabs          标签页管理，可获取标签页及丢弃、新建、复制... 
  *  - i18n          国际化相关的
  *  - tts           语音相关 
  *  - runtime       执行中
  *  - contextMenus  上下文菜单键（俗称右键）管理
  * 
 */
 const chrome: Chrome;
}
