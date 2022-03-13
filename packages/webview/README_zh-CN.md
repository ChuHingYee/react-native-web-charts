[English](https://github.com/ChuHingYee/react-native-web-charts/blob/master/packages/webview/README.md) | 简体中文

# @react-native-web-charts/webview

基于 react-native-webview 的可视化图表组件。原理为利用 webview 组件的 injectedJavaScript 和 injectJavaScript 属性加载本地 html 文件。

## 安装

### 第一步:

```javascript
npm i react-native-webview @react-native-web-charts/webview --save
```

### 第二步:

#### Android

如果你是用xxx.html这种方式提供source的话，你需要将页面复制到 android/app/src/main/assets

## 示例

```javascript
import React, {useEffect, useState, useRef} from 'react';
import {RNWebChart} from '@react-native-web-charts/webview';
import {html} from '@react-native-web-charts/echarts';
import {WebView} from 'react-native-webview';
import type {WebViewMessageEvent} from 'react-native-webview';

const Example = () => {
  const ref = useRef<WebView | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
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
    setTimeout(() => {
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
        setTimeout(() => {
          setIsEmpty(true);
        }, 3000);
      }
    }, 3000);
  }, []);
  return (
    <RNWebChart
      containerStyle={{
        height: 300,
      }}
      ref={ref}
      isEmpty={isEmpty}
      emptyText="no data"
      onLoad={webviewOnLoad}
      onMessage={handleWebViewMessage}
      source={
        html:html
      }
    />
  );
};
export default Example;
```

## 参数

[API 指引](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md)

## 问题

如果存在多个图表退出页面是发生闪退，请在webStyle加入opacity: 0.99

## 感谢

🙏 感谢
[react-native-webview](https://github.com/react-native-webview/react-native-webview)
[native-echarts](https://github.com/somonus/react-native-echarts)


## 其他

[LICENSE (MIT)](../../LICENSE)
