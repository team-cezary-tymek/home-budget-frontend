import { Component, OnInit } from '@angular/core';
import { EXPENSES } from '../expense_data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  options: any;
  constructor() { }
  expenses = EXPENSES;

  ngOnInit(): void {
    const xAxisData = this.expenses.map(x => x.name);
    const data1 = this.expenses.map(x => x.value);
    // const data2 = [];

    // for (let i = 0; i < 100; i++) {
    //   xAxisData.push('category' + i);
    //   data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    //   data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    // }

    this.options = {
      legend: {
        data: ['Expense'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        name: 'Name',
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        name: 'Cost'
      },
      series: [
        {
          name: 'Expense',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }
}
