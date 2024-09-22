/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName element.ts
 * @CreateDate  周六  09/14/2024
 * @Description 元素的自定义
 ****************************************************************************/
/** # 为节点元素设置标准样式
 *
 */
export function setStyle(
  node: HTMLElement | HTMLInputElement,
  style: { [x: string]: string | number },
) {
  let styleString: string = '';
  const oldStyle = node.style;
  if (oldStyle.length !== 0) {
    /** 由于直接使用 oldStyle 会将所有的属性带出，设置临时储存 */
    const templateStyle: { [x: string]: string } = {};
    for (let i = oldStyle.length; i--; ) {
      if (oldStyle[i].startsWith('--')) {
        templateStyle[oldStyle[i]] = window
          .getComputedStyle(node)
          .getPropertyValue(oldStyle[i]);
      } else {
        /**  @ts-expect-error: 油盐不进  */
        templateStyle[oldStyle[i]] = oldStyle[oldStyle[i]];
      }
    }
    style = Object.assign(templateStyle, style);
  }
  for (const cssRule in style) {
    if (Object.prototype.hasOwnProperty.call(style, cssRule)) {
      /// 这里做了一个转换
      styleString += `${
        cssRule.startsWith('--')
          ? cssRule
          : cssRule.replace(/([A-Z])/gm, '-$1').toLowerCase()
      }: ${style[cssRule]};`;
    }
  }
  node.setAttribute('style', styleString.replaceAll(/;;/gm, ';'));
}
