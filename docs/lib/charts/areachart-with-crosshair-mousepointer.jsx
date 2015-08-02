'use strict';

var React = require('react');
var d3 = require('d3');

var ReStock = require('src/');

var ChartCanvas = ReStock.ChartCanvas
	, XAxis = ReStock.axes.XAxis
	, YAxis = ReStock.axes.YAxis
	, AreaSeries = ReStock.AreaSeries
	, Translate = ReStock.Translate
	, Chart = ReStock.Chart
	, DataSeries = ReStock.DataSeries
	, EventCapture = ReStock.EventCapture
	, MouseCoordinates = ReStock.MouseCoordinates
	, CrossHair = ReStock.CrossHair
;

module.exports = {
	init(data) {
		var AreaChartWithCrossHairMousePointer = React.createClass({
			getInitialState() {
				return {
					width: 500,
					height: 400
				};
			},
			render() {
				var parseDate = d3.time.format("%Y-%m-%d").parse
				var dateRange = { from: parseDate("2012-06-01"), to: parseDate("2012-12-31")}
				var dateFormat = d3.time.format("%Y-%m-%d");

				return (
					<ChartCanvas data={data} width={this.state.width} height={this.state.height} margin={{left: 5, right: 90, top:10, bottom: 30}}>
						<Chart id={3}>
							<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
							<YAxis axisAt="right" orient="right" />
							<DataSeries yAccessor={(d) => d.close} xAccessor={(d) => d.date}>
								<AreaSeries />
							</DataSeries>
						</Chart>
						<MouseCoordinates forChart={3} xDisplayFormat={dateFormat} yDisplayFormat={(y) => y.toFixed(2)}>
							<CrossHair />
						</MouseCoordinates>
						<EventCapture mouseMove={true} mainChart={3}/>
					</ChartCanvas>
				);
			}
		});

		return AreaChartWithCrossHairMousePointer;
	}
}

/*
	changeWidth() {
		this.setState({
			width: this.state.width + 10
		});
	},
		<rect width={100} height={100} onClick={this.changeWidth}/>
*/
