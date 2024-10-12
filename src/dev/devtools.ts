/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName devtools.ts
 * @CreateDate  周三  10/09/2024
 * @Description 控制台面板管理员（仅用于控制创建面板）
 ****************************************************************************/
chrome.devtools.panels.create(
  chrome.i18n.getMessage('name'),
  './icons/simple-refresh@128x128.png',
  './dev_panel/index.html',
  function () {
    console.log('simple refresh dev tools page');
  },
);
