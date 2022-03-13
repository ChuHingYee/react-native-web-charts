import React, {memo, forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import {WebView} from 'react-native-webview';
import type {WebViewProps} from 'react-native-webview';
import type {Ref} from 'react';

interface WebChartProps
  extends Omit<WebViewProps, 'javaScriptEnabled' | 'style'> {
  children?: JSX.Element | JSX.Element[] | string | any;
  containerStyle?: StyleProp<ViewStyle>;
  emptyText?: string;
  isEmpty?: boolean;
  webStyle?: StyleProp<ViewStyle>;
}

const RNWebChart = (props: WebChartProps, ref?: Ref<WebView>) => {
  const {
    containerStyle,
    webStyle,
    children,
    isEmpty,
    emptyText,
    source,
    ...rest
  } = props;
  return (
    <View style={styles.container} {...containerStyle}>
      <WebView
        originWhitelist={['*']}
        ref={ref}
        style={webStyle}
        javaScriptEnabled
        scrollEnabled={false}
        source={source}
        {...rest}
      />
      {isEmpty && (
        <View style={styles.empty}>
          {children ? (
            children
          ) : (
            <Text>{emptyText ? emptyText : '暂无数据'}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  empty: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(forwardRef(RNWebChart));
