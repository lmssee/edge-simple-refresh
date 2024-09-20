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
 * 创建后已经将元素追加到 body 下
 */
export default function (): HTMLElement {
  const div = document.createElement('div');
  div.id = 'lmssee';
  div.innerHTML = 'hello lmssee';
  document.body.appendChild(div);
  return div;
}
