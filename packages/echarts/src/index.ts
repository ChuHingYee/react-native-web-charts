import * as echarts from 'echarts/core'
import {
  DataZoomComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import './styles/index.css'

interface EventParams {
  componentType: string
  seriesType: string
  seriesIndex: number
  seriesName: string
  name: string
  dataIndex: number
  data: Object
  dataType: string
  value: number | Array<any>
  color: string
}

type EventParamsWithAny = EventParams & Record<string, unknown>

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  DatasetComponent,
  LegendComponent,
  VisualMapComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  BarChart,
  PieChart,
  SVGRenderer,
  UniversalTransition,
  LabelLayout,
])

window.onload = () => {
  const dom = document.getElementById('main')
  const rnChart = echarts.init(dom)
  window.rnChart = {
    chart: rnChart,
    onClick: (ev: EventParamsWithAny) => {
      const {
        componentType,
        seriesType,
        seriesIndex,
        seriesName,
        name,
        dataIndex,
        data,
        dataType,
        value,
        color,
      } = ev
      const vm = window.ReactNativeWebView ? window.ReactNativeWebView : window
      vm.postMessage(
        JSON.stringify({
          componentType,
          seriesType,
          seriesIndex,
          seriesName,
          name,
          dataIndex,
          data,
          dataType,
          value,
          color,
        }),
      )
    },
    init: (theme: string|object, opts?: any) => {
      window.rnChart.chart = echarts.init(dom, theme, opts)
    },
    registerTheme: (name: string, theme: object) => {
      echarts.registerTheme(name, theme)
    },
  }
}
