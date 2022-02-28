import type * as echarts from 'echarts/core'
declare global {
  interface Window {
    rnChart: {
      chart: echarts.ECharts
      onClick: (ev: any) => void
    }
    ReactNativeWebView: {
      postMessage: (ev: string) => void
    }
  }
}
