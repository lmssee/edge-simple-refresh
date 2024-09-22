/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple
 * @FileName app.tsx
 * @CreateDate  周日  09/22/2024
 * @Description 嵌入脚本的主页面逻辑
 ****************************************************************************/

import React, { useEffect } from 'react';
import { CRuntime } from 'src/common';

export function App() {

  /** 初始化监听数据变化 */
  useEffect(() => {
    CRuntime.messageAddListener((r: unknown) => {
      const request = r as { type: string; state: string; delay: number };
      switch (request.type) {
        case 'refresh': {
          console.log('====================================');
          console.log(request);
          console.log('====================================');
          // if( request.state ==  'suspend') {
          // }
          break;
        }
        default: {
          break;
        }
      }
    });

    return () => {};
  }, []);

  return <>133</>;
}
