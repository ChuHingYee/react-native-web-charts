English | [简体中文](https://github.com/ChuHingYee/react-native-web-charts/blob/master/packages/webview/README_zh-CN.md)

# @react-native-web-charts/webview

the charts react-native's component base on react-native-webview

## Installation

### First:

```javascript
npm i react-native-webview @react-native-web-charts/webview --save
```

### Second

#### Android

if you use xxx.html for charts,you need to copy that to android/app/src/main/assets

## Example

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

## Options

[check out the API Reference](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md)

## Questions

if you meet some errors when has multiple chart,you can set opacity: 0.99 in webStyle

## Thanks

Thanks 
[react-native-webview](https://github.com/react-native-webview/react-native-webview)
[native-echarts](https://github.com/somonus/react-native-echarts)

## Meta

[LICENSE (MIT)](../../LICENSE)
