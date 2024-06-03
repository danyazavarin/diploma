import React from 'react';
import ReactDOM from 'react-dom/client';
import { appRouter } from './app/appRouter.tsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/appStore.ts';
import './main.scss';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        wave={{ disabled: true }}
        theme={{
          components: {
            Button: {
              defaultActiveBorderColor: '#fff',
              defaultActiveColor: '#144d14',
              defaultColor: '#449342',
              defaultBorderColor: '#fff',
              defaultHoverBorderColor: '#fff',
              defaultHoverColor: '#144d14',
              defaultShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              borderRadius: 8,
            },
            Select: {
              controlOutline: 'none',
              optionSelectedBg: '#faf6ed',
              colorTextPlaceholder: 'rgb(68, 147, 66, 0.7)',
              colorTextQuaternary: 'rgb(68, 147, 66, 0.7)',
              colorText: '#449342',
              colorBorder: '#fff',
              colorPrimary: '#fff',
              colorPrimaryHover: '#fff',
              borderRadius: 8,
            },
            Menu: {
              itemSelectedBg: 'white',
              itemSelectedColor: '#449342',
              itemColor: '#144d14',
              itemActiveBg: 'rgba(0, 0, 0, 0.06)',
            },
          },
        }}
      >
        <RouterProvider router={appRouter} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
