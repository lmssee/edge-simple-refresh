/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName createRoot.ts
 * @CreateDate  周六  09/21/2024
 * @Description 创建根元素
 ****************************************************************************/
/** 创建根元素并返回
 *
 * 创建后已经将元素追加到 `body` 下并成为该元素的第一子元素
 */
export default function (append: boolean = false): HTMLElement {
  const div = document.createElement('div');
  div.id = 'lmssee';
  if (append) {
    document.body.appendChild(div);
  } else {
    document.body.prepend(div);
  }
  return div;
}
