[English](./README.md) | 简体中文

# @react-native-web-charts/webview

基于 react-native-webview 的可视化图表组件（支持 ECharts/f2 等前端可视化图表）。原理为利用 webview 组件的 injectedJavaScript 和 injectJavaScript 属性加载本地 html 文件。

## 安装

### 第一步:

```javascript
npm i react-native-webview @react-native-web-charts/webview --save
```

### 第二步:

#### Android

在 node_modules/@react-native-web-charts/\*\*/dist 目录找到 chart.html 文件并复制到 android/app/src/main/assets

## 示例

```javascript
import React, {useEffect, useRef} from 'react';
import {RNWebChart} from '@react-native-web-charts/webview';
import {WebView} from 'react-native-webview';
import type {WebViewMessageEvent} from 'react-native-webview';

const Example = () => {
  const ref = useRef<WebView | null>(null);
  const handleWebViewMessage = (ev: WebViewMessageEvent) => {
    console.log(ev);
  };
  const webviewOnLoad = () => {
    if (ref.current) {
      ref.current.injectJavaScript(`(function() {
        window.rnChart.chart.setOption({
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        });
        window.rnChart.chart.on('click', function (params) {
          window.rnChart.onClick(params);
        });
      })();`);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (ref.current) {
        ref.current.injectJavaScript(`(function() {
          window.rnChart.chart.setOption({series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, ${Math.random() * 50}, ${Math.random() * 50}, ${
          Math.random() * 50
        }, ${Math.random() * 50}, ${Math.random() * 50}]
            }
          ]})
        })();`);
      }
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <RNWebChart
      style={{
        height: 300,
      }}
      ref={ref}
      onLoad={webviewOnLoad}
      onMessage={handleWebViewMessage}
    />
  );
};
export default Example;
```

## 切换可视化库

### Android

在 node_modules/@react-native-web-charts/\*\*/dist 找到 chart.html 并将其复制到项目根目录下 android/app/src/main/assets

### IOS

在 node_modules/@react-native-web-charts/\*\*/dist 找到 chart.html 并将其复制到项目根目录下 node_modules/@react-native-web-charts/webview/dist

## 参数

[API 指引](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md)

## 感谢

🙏 感谢[react-native-webview](https://github.com/react-native-webview/react-native-webview)

## 其他

[LICENSE (MIT)](../../LICENSE)
