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
    $__mi: {
      getState(): void;
    };
  }
}
export {};
