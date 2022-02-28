import React, {forwardRef} from 'react';
import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import type {WebViewProps} from 'react-native-webview';
import type {Ref} from 'react';

interface WebChartProps
  extends Omit<WebViewProps, 'javaScriptEnabled' | 'scrollEnabled'> {}

const RNWebChart = (props: WebChartProps, ref?: Ref<WebView>) => {
  let source = Platform.select({
    android: {uri: 'file:///android_asset/chart.html'},
    ios: require('./chart.html'),
  });
  return (
    <WebView
      {...props}
      ref={ref}
      javaScriptEnabled
      scrollEnabled={false}
      source={source}
    />
  );
};
export default forwardRef(RNWebChart);
