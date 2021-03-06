import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import nv from 'nvd3'
import { StyledSvg } from '../styled'
import {
  GRAPH_TYPE_LINE_CHART,
  GRAPH_TYPE_BAR_CHART,
  NO_GRAPH_DATA_MESSAGE
} from '../constants'

const Chart = ({ chartType, datum, chartHeight }) => {
  const chart_id =
    'custom_chart_' +
    Math.random()
      .toString(36)
      .substr(2, 9)

  nv.addGraph(() => {
    let chart = {}
    if (chartType === GRAPH_TYPE_BAR_CHART) {
      chart = nv.models.multiBarChart()
      chart.reduceXTicks(true)
      chart.rotateLabels(0)
      chart.showControls(false)
      chart.showLegend(false)
      chart.groupSpacing(0.1)
    } else if (chartType === GRAPH_TYPE_LINE_CHART) {
      chart = nv.models.lineChart()
      chart.margin({ left: 100 })
      chart.useInteractiveGuideline(true)
      chart.showLegend(false)
      chart.showYAxis(true)
      chart.showXAxis(true)
    }

    chart.xAxis.tickFormat(function(d) {
      return d3.time.format('%x')(new Date(d))
    })
    chart.yAxis.tickFormat(d3.format(',f'))
    chart.noData(NO_GRAPH_DATA_MESSAGE)

    d3.select('#' + chart_id + ' > svg')
      .datum(datum)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })

  return (
    <div id={chart_id}>
      <StyledSvg height={chartHeight} />
    </div>
  )
}

Chart.propTypes = {
  chartType: PropTypes.number,
  datum: PropTypes.array,
  chartHeight: PropTypes.number
}

export default Chart
