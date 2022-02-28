import F2 from '@antv/f2'
import './styles/index.css'

window.onload = () => {
  const rnChart = new F2.Chart({
    id: 'main',
    pixelRatio: window.devicePixelRatio, // 指定分辨率
  })
  window.rnChart = {
    chart: rnChart,
    onClick: (ev: any) => {
      const vm = window.ReactNativeWebView ? window.ReactNativeWebView : window
      vm.postMessage(JSON.stringify(ev))
    },
  }
}
