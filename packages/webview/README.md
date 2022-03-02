English | [简体中文](./README_zh-CN.md)

# @react-native-web-charts/webview

the charts react-native's component base on react-native-webview(support Echarts or F2)

## Installation

### First:

```javascript
npm i react-native-webview @react-native-web-charts/webview --save
```

### Second

#### Android

find the chart.html in to your node_modules/@react-native-web-charts/**/dist and copy that to android/app/src/main/assets

## Example

```javascript
import React, {useEffect, useState, useRef} from 'react';
import {RNWebChart} from '@react-native-web-charts/webview';
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
    />
  );
};
export default Example;
```

## Change Chart Dependency

### Android

find the chart.html in to your node_modules/@react-native-web-charts/**/dist and copy that to android/app/src/main/assets


### IOS

find the chart.html in to your node_modules/@react-native-web-charts/**/dist and copy that to node_modules/@react-native-web-charts/webview/dist


## Options

[check out the API Reference](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md)

## Thanks

Thanks for [react-native-webview](https://github.com/react-native-webview/react-native-webview)

## Meta

[LICENSE (MIT)](../../LICENSE)
