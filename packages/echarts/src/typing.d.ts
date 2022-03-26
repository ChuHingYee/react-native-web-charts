import type * as echarts from 'echarts/core'
declare global {
  interface Window {
    rnChart: {
      chart: echarts.ECharts
      onClick: (ev: any) => void
      init: (theme: string | object, opts?: any) => void
      registerTheme: (name: string, theme: object) => void
    }
    ReactNativeWebView: {
      postMessage: (ev: string) => void
    }
  }
}
