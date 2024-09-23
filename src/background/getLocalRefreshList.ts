/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName getLocalRefreshList.ts
 * @CreateDate  周一  09/23/2024
 * @Description 获取本读储存的数据
 ****************************************************************************/

import { CLStorage, CmStorageLocalValueT } from 'src/common/chromeLStorage';

export function getLocalRefreshList(
  callBack: (result: CmStorageLocalValueT) => undefined,
) {
  CLStorage.get(['refreshPageList'], callBack);
}
