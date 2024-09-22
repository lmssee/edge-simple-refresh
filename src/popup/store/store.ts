/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName store.ts
 * @CreateDate  周六  09/21/2024
 * @Description redux store
 ****************************************************************************/
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tabReducer from './tabSlice';
import refreshReducer from './refreshSlice';

/**  创建储存到本的的配置信息 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tab', 'refresh'],
};

/** 创建需要储存到本地的数据 */
const rootReducer = persistReducer(
  persistConfig,
  combineReducers({ tab: tabReducer, refresh: refreshReducer }),
);

/** 构建数据池
 *
 * 使用示例
 * ```tsx
 *   <StrictMode>
 *    \{\/*  我被用在这里  *\/}
 *    <Provider store={store}>
 *      <PersistGate loading={null} persistor={persistor}>
 *        <App />
 *      </PersistGate>
 *    </Provider>
 *  </StrictMode>,
 * ```
 */
const store = configureStore({
  reducer: rootReducer,
});

/** 导出构建本地存储的数据
 *
 * 使用示例：
 * ```tsx
 *   <StrictMode>
 *    <Provider store={store}>
 *       \{\/*  我被用在这里  *\/}
 *      <PersistGate loading={null} persistor={persistor}>
 *        <App />
 *      </PersistGate>
 *    </Provider>
 *  </StrictMode>,
 * ```
 *
 */
export const persistor = persistStore(store);

export default store;
