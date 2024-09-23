/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName data.ts
 * @CreateDate  周六  09/14/2024
 * @Description 嵌入脚本的数据区
 ****************************************************************************/

/**
 *  其他数据
 * - delay        定时器的延迟时间
 * - AC           控制器（并未使用）
 * - showTime     按钮展示的初始时间
 * - remainder    剩余的时间
 * - positiveStop 主动停止，用于在主动停止后又切换页面导致的页面恢复后自动直接恢复状态
 */

export const data: {
  state: 'close' | 'cancel' | 'suspend' | 'stop';
  delay: number;
  timeId: NodeJS.Timeout;
  showTime: number;
  remainder: number;
  positiveStop: boolean;
} = {
  state: 'close',
  /** 定时器的延迟时间 */
  delay: 1.2,
  /** 定时器 id */
  timeId: setTimeout(() => 1),
  /** 按钮展示的初始时间 */
  showTime: 0,
  /** 剩余的时间 */
  remainder: 0,
  /** 主动停止 */
  positiveStop: false,
};
