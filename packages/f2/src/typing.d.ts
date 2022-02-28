import type * as F2 from '@antv/f2'
declare global {
  interface Window {
    rnChart: {
      chart: F2.Chart
      onClick: (ev: any) => void
    }
    ReactNativeWebView: {
      postMessage: (ev: string) => void
    }
  }
}
