/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName getLocaleText.ts
 * @CreateDate  周六  09/21/2024
 * @Description 获取本地化的数据数据
 ****************************************************************************/

/** 返回一个获取语言的，若是没有返回参数 */
export function getLocaleText(tag: string): string {
  if (chrome && chrome.i18n) {
    return chrome.i18n.getMessage(tag);
  } else return tag;
}
