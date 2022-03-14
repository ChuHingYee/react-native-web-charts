import React, {useState, memo, forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import {WebView} from 'react-native-webview';
import type {WebViewProps} from 'react-native-webview';
import type {Ref} from 'react';

interface WebChartProps
  extends Omit<WebViewProps, 'javaScriptEnabled' | 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
  webStyle?: StyleProp<ViewStyle>;
  emptyText?: string;
  isEmpty?: boolean;
  emptyComponent?: JSX.Element | JSX.Element[] | string | any;
  hasLoadingComponent?: boolean;
  loadingText?: string;
  loadingComponent?: JSX.Element | JSX.Element[] | string | any;
}

const RNWebChart = (props: WebChartProps, ref?: Ref<WebView>) => {
  const {
    containerStyle,
    webStyle,
    emptyComponent,
    isEmpty,
    emptyText,
    loadingComponent,
    loadingText,
    hasLoadingComponent,
    source,
    onLoad,
    ...rest
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const handleOnLoad: WebViewProps['onLoad'] = event => {
    setIsLoading(false);
    onLoad && onLoad(event);
  };
  return (
    <View style={styles.container} {...containerStyle}>
      <WebView
        originWhitelist={['*']}
        ref={ref}
        style={webStyle}
        javaScriptEnabled
        scrollEnabled={false}
        source={source}
        onLoad={handleOnLoad}
        {...rest}
      />
      {isEmpty && (
        <View style={styles.wrap}>
          {emptyComponent ? (
            emptyComponent
          ) : (
            <Text>{emptyText ? emptyText : '暂无数据'}</Text>
          )}
        </View>
      )}
      {isLoading && hasLoadingComponent && (
        <View style={styles.wrap}>
          {loadingComponent ? (
            loadingComponent
          ) : (
            <Text>{loadingText ? loadingText : '正在加载'}</Text>
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
  wrap: {
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
