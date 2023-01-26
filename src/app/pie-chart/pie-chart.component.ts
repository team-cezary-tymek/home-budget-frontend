import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EXPENSES } from '../expense_data';
import { FormsModule, NgModel } from '@angular/forms';
import { ECharts, EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit {
  @ViewChild('chart') chart: any;
  expenses = EXPENSES;
  pieChartOptions: any = {};
  pieChartData: any[] = [];
  pieChartLoading = true;
  selectedMonthAndYear: any;
  availableMonthsAndYears: any;
  chartData: any;
  text = '';
  chartRef: ElementRef;
  constructor(chartRef: ElementRef) {
    this.chartRef = chartRef;
  }
  ngOnInit() {
    
    console.log(this.chart)
    const expensesByCategory = new Map();
    for (const expense of EXPENSES) {
      const category = expense.category;
      if (!expensesByCategory.has(category)) {
        expensesByCategory.set(category, {
          category,
          value: 0
        });
      }
      expensesByCategory.get(category).value += expense.value;
    }
    const chartData = Array.from(expensesByCategory.values()) 

    this.pieChartData = EXPENSES.map((expense) => {
      return {
        value: expense.value,
        name: expense.category
      }
    });
    this.availableMonthsAndYears = Array.from(new Set(EXPENSES.map(expense => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      return `${year}.${(month+1).toString().padStart(2, '0')}`;
    })));
    console.log(this.pieChartData);
    console.log(this.availableMonthsAndYears);

    this.selectedMonthAndYear = '';

    this.pieChartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
      },
      series: [
        {
          name: 'Expenses',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: chartData.map(d => {
            return {
              name: d.category,
              value: d.value
            }
          })
        }
      ]
    };
    this.pieChartLoading = false;
  }

  updateChartData() {
    const accumulatedValues = new Map;
    this.pieChartData = this.expenses.filter(d => {
        if (!this.selectedMonthAndYear) {
          return true;
        }
        const date = new Date(d.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthAndYear = `${year}.${(month+1).toString().padStart(2, '0')}`;
        return monthAndYear === this.selectedMonthAndYear;
      })
      .map(d => {
        if (!accumulatedValues.has(d.category)) {
          accumulatedValues.set(d.category, 0);
        }
        accumulatedValues.set(d.category, accumulatedValues.get(d.category) + d.value);
      ;
        return {
          name: d.category,
          value: accumulatedValues.get(d.category)
        }
      });
      this.text = 'aaaa';
      console.log(this.chart);
      console.log(this.pieChartData);
      this.pieChartOptions.series[0].data = this.pieChartData;
      this.pieChartLoading = false;
      //this.chart.setOption(this.pieChartOptions);
      this.chartData = this.pieChartData;
      this.pieChartLoading = false;
      console.log(this.pieChartOptions.series[0].data);
      this.chart.setOption(this.pieChartOptions, true);
  }
  
}
