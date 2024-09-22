/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName tabSlice.ts
 * @CreateDate  周六  09/21/2024
 * @Description 窗口数据中心
 ****************************************************************************/

import { createSlice } from '@reduxjs/toolkit';
import { storeSyncList } from './storeData';

// export const fetchTabInfo = createAsyncThunk();

/** # 标签信息
 *
 *
 */
export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    id: 0,
    url: '',
  },
  reducers: {
    saveTabId: (state, action) => {
      state.id = action.payload;
    },
    saveTabUrl: (state, action) => {
      state.url = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(storeSyncList.init_tab_info, (state, action: unknown) => {
      const payload = (
        action as {
          payload: {
            id: number;
            url: string;
          };
        }
      ).payload;
      state.id = payload.id;
      state.url = payload.url;
    });
  },
});

/** 导出动作 */
export const { saveTabId, saveTabUrl } = tabSlice.actions;

export default tabSlice.reducer;
