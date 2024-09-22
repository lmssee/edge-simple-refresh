/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName refreshSlice.ts
 * @CreateDate  周日  09/22/2024
 * @Description 定时数据
 ****************************************************************************/

import { createSlice } from '@reduxjs/toolkit';
/** 关于刷新的本地数据 */
export const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    info: {},
  },
  reducers: {
    /** 同步设置时间值 */
    setDelay: (state, actions) => {
      state.info = { ...state.info, ...actions.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase('refresh_set_delay', (state, actions: unknown) => {
      state.info = {
        ...state.info,
        ...(actions as { payload: {  id: number } }).payload,
      };
    });
  },
});

export const { setDelay } = refreshSlice.actions;

export default refreshSlice.reducer;
