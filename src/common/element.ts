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
  style: { [x: string]: string },
) {
  let styleString: string = '';
  /**  @ts-expect-error: 油盐不进  */
  style = { ...node.style, ...style };
  for (const cssRule in style) {
    if (Object.prototype.hasOwnProperty.call(style, cssRule)) {
      /// 这里做了一个转换
      styleString += `${cssRule.startsWith('--') ? cssRule : cssRule.replace(/([A-Z])/gm, '-$1').toLowerCase()}: ${style[cssRule]};`;
    }
  }
  /**  @ts-expect-error: 油盐不进  */
  node.style = styleString.replaceAll(/;;/gm, ';');
}
