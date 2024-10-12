/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple-refresh
 * @FileName app.tsx
 * @CreateDate  周三  10/09/2024
 * @Description 调试页面的主页面
 ****************************************************************************/

import React, { useEffect, useState } from 'react';
import { getLocalRefreshList } from 'src/background/getLocalRefreshList';
import { CLChanged, CTabs } from 'src/common';
import styles from './index.module.scss';

export type Data = {
  title?: string;
  id?: number;
  active: boolean;
  favIconUrl?: string;
  delay?: number;
};

export function App() {
  // const time = new Date().toLocaleString();

  /** 当前状态 */
  const [State, setState] = useState('');

  /*** 数据中心 */
  const [dataList, setDataList] = useState<Data[]>([]);

  function getData() {
    getLocalRefreshList(result => {
      const refreshPageList = result['refreshPageList'] || {};
      CTabs.get({}, response => {
        setState(
          `\n\n当前共打开${response.length}个窗口，正在刷新的有${
            Object.keys(refreshPageList).length
          }个窗口`,
        );
        const data: Data[] = [];
        for (const key in refreshPageList) {
          for (const element of response) {
            if (element.id === Number(key)) {
              // element.favIconUrl
              const { title, id, active, favIconUrl } = element;
              const { delay } = refreshPageList[key];
              data.push({
                title,
                id,
                active,
                favIconUrl,
                delay,
              });
              continue;
            }
          }
        }
        setState(
          `\n\n当前共打开${response.length}个窗口，正在刷新的有${data.length}个窗口`,
        );
        setDataList(data);
      });
    });
  }

  /** 初始化 */
  useEffect(() => {
    CLChanged(() => {
      getData();
    });
    getData();
  }, []);

  return (
    <div className={styles.dev}>
      <div>{new Date().toLocaleString()}</div>
      <div>
        {State} <input type="button" value="刷新" onClick={getData} />
      </div>
      {(dataList.length > 0 && (
        <table>
          <tr>
            {['网站', '标题', '状态', '时间'].map(e => (
              <th key={e}>{e}</th>
            ))}
          </tr>
          {dataList.length > 0 &&
            dataList.map(ele => (
              <tr key={ele.title}>
                <td>
                  <img src={ele.favIconUrl} alt="图" />
                </td>
                <td>{ele.title}</td>
                <td style={{ color: ele.active ? '#f00' : '#0f0' }}>
                  {ele.active ? '活跃' : '不活跃'}
                </td>
                <td>{ele.delay}</td>
              </tr>
            ))}
        </table>
      )) || <mark>暂时未查询到使用该扩展刷新的页面</mark>}
    </div>
  );
}
