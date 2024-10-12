/****************************************************************************
* @Author lmssee
* @Email lmssee@outlook.com
* @FileName a-edge-extends-types.d.ts
* @CreateDate  周六  9/12/2024 10:6:56
* @Description 显式向项目添加 ‘chrome’ 的类型
*
* *请注意以下两几点：*
* 
* - If all you want is the chrome type (english version), you can remove this package and install `@types/chrome`, use `npm uninstall a-edge-extends-types && npm install --save-dev @types/chrome` 
* - 保证安装了 a-edge-extends-types npm 包
* - 请勿向本文件写入其他内容（本文件可能在 install 和 update 时重写该文件，手动添加入文件的内容可能被抹除）
****************************************************************************/


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
    *  - contextMenus  上下文菜单键（俗称右键）管理
    *  - [devtools](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools?hl=zh-cn)       开发者工具控制台相关
    *  - i18n          国际化相关的
    *  - storage       本地（local）、云端（sync）、会话（session）储存相关
    *  - runtime       执行中
    *  - tabs          标签页管理，可获取标签页及丢弃、新建、复制... 
    *  - tts           语音相关 
    * 
    * 
    * _尽管可能显示 chrome.action 的提示，但并没有完善它_
    * 
    */

    chrome: Chrome;
  }
  
 
    /**
    * # Chrome
    *    
    *  - contextMenus  上下文菜单键（俗称右键）管理
    *  - [devtools](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools?hl=zh-cn)       开发者工具控制台相关
    *  - i18n          国际化相关的
    *  - storage       本地（local）、云端（sync）、会话（session）储存相关
    *  - runtime       执行中
    *  - tabs          标签页管理，可获取标签页及丢弃、新建、复制... 
    *  - tts           语音相关 
    * 
    * 
    * _尽管可能显示 chrome.action 的提示，但并没有完善它_
    * 
    */

  const chrome: Chrome;
}