import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chart as ChartModel } from '../../models/chart.model';
import { Chart } from 'chart.js';
import '../../chart.piecelabel.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @Input() chartModel: ChartModel;
  @Input() isLoaded: boolean;
  
  chart = null;
  id = "";
  config = null;
  options = null;
  
  constructor() { }

  ngOnInit() {

    this.id = "Chart_" + this.chartModel.id;
    var that = this;

    if (this.chart !== null) {
      this.chart.clear()
    }
    
    //Configuration charts
      Chart.defaults.global.defaultFontFamily = "Avenir Next Medium";
      Chart.defaults.global.defaultFontColor = "#dedede";

    //myDoughnut
      Chart.defaults.myDoughnut = Chart.defaults.doughnut;
      var custom = Chart.controllers.doughnut.extend({
        draw: function (ease) {
          Chart.controllers.doughnut.prototype.draw.call(this, ease);
          var ctx = this.chart.ctx;
          var centerConfig = this.chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'bold';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#dedede';
          var sidePadding = centerConfig.sidePadding || 10;
          var sidePaddingCalculated = (sidePadding / 100) * (this.chart.innerRadius * 2)
          ctx.font = "50px " + fontStyle;
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (this.chart.innerRadius * 2) - sidePaddingCalculated;
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(50 * widthRatio);
          var elementHeight = (this.chart.innerRadius * 2);
          var fontSizeToUse = Math.min(newFontSize, elementHeight);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((this.chart.chartArea.left + this.chart.chartArea.right) / 2);
          var centerY = ((this.chart.chartArea.top + this.chart.chartArea.bottom) / 2) - 10;
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;
          var lineheight = 30;
          var lines = txt.split('\n');
          for (var i = 0; i < lines.length; i++)
            ctx.fillText(lines[i], centerX, centerY + (i * lineheight));
        }
    });
    
    Chart.controllers.myDoughnut = custom;

    var getOptions = function (id) {
      if (id === 0) {
        var options = this.options;
      }
      return options;
    };
  }

  ngAfterViewInit(): void {
    
    var canvas = <HTMLCanvasElement>document.getElementById(this.id);
    var ctx = canvas.getContext("2d");

    var barChartData = {
      labels: ['2014', '2015', '2016', '2017', '2018', '2019'],
      datasets: [{
        label: 'Projets',
        backgroundColor: '#514155',
        data: [1, 1, 2, 2, 4, 3]
      }, {
        label: 'Formations',
          backgroundColor: '#73264d',
        data: [0, 0, 1, 1, 2, 1]
      }]
    };

    var dataPie = {
      datasets: [
      {
          backgroundColor: ['#514155', '#73264d', '#d5bfc2', '#3e3141'],
        data: [25,25,25,25]
      }
      ],
      labels: [
        'Web',
        'RH',
        'Technologies \nMicrosoft',
        'Applications \nspécifiques \nde gestion'
      ]
    }

    var data = {
        labels: this.chartModel.labels,
      datasets: [{
          label: this.chartModel.labels,
          data: this.chartModel.data,
          backgroundColor: this.chartModel.backgroundColours
        }]
    }

    var getData = function (type) {
      var result = null;
      if (type === "bar") {
        result = barChartData;
      }
      else if (type === "pie") {
        result = dataPie;
      }
      else {
        result = data;
      }
      return result;
    };

    var options = {
      title: {
        display: true,
        text: this.chartModel.title,
        fontSize: 22
      },
      maintainAspectRatio: false,
      responsive: true,
      elements: {
        arc: {
          borderWidth: 0
        },
        center: {
          txt: '',
          color: '#dedede',
          fontFamily: 'Avenir Next Regular',
          fontStyle: 'Avenir Next Regular',
          sidePadding: 10
        }
      },
      scales: this.chartModel.scales,
      legend: {
        display: this.chartModel.displayLegend
      },
      tooltips: this.chartModel.tooltips,
      plugins: this.chartModel.legend
      };

    this.chart = new Chart(ctx, {
      type: this.chartModel.type,
      data: getData(this.chartModel.type),
      options: options
    });

    this.chart.render({
      duration: 1500,
      lazy: true,
      easing: 'easeInOutExpo'
    });

    this.isLoaded = true;
  }
}


