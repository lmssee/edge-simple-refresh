/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName refreshSlice.ts
 * @CreateDate  周日  09/22/2024
 * @Description 定时数据
 ****************************************************************************/

import { createSlice } from '@reduxjs/toolkit';
import { storeSyncList } from './storeData';
import { refreshDelayT } from 'src/common/chromeLStorage';

/** 初始化值，这么写方便类型注释 */
const initialState: { info: { [x: number]: refreshDelayT } } = { info: {} };

/** 关于刷新的本地数据 */
export const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    /** 同步设置时间值 */
    setDelay: (state, actions) => {
      state.info = { ...state.info, ...actions.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      storeSyncList.refresh_set_delay,
      (state, actions: unknown) => {
        const payload = (
          actions as { payload: { id: number; delay: refreshDelayT } }
        ).payload;

        state.info[payload.id] = payload.delay;
      },
    );
  },
});

export const { setDelay } = refreshSlice.actions;

export default refreshSlice.reducer;
