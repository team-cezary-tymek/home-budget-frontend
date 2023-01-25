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
    
    // const monthlyExpenses = EXPENSES.reduce((acc, expense) => {
    //   const month = expense.date.getMonth();
    //   const year = expense.date.getFullYear();
    //   const monthYear = '${month}-${year}';
    //   if (!acc[monthYear]) {
    //     acc[monthYear] = {
    //       month: month,
    //       year: year,
    //       total: 0
    //     };
    //   }
    //   acc[monthYear].total += expense.value;
    //   return acc;
    // })
    const expensesByYearAndMonth = new Map();

for (const expense of EXPENSES) {
  const date = new Date(expense.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const key = `${year}.${month}`;
  if (!expensesByYearAndMonth.has(key)) {
    expensesByYearAndMonth.set(key, {
      year,
      month,
      value: 0
    });
  }
  expensesByYearAndMonth.get(key).value += expense.value;
}

const chartData = Array.from(expensesByYearAndMonth.values());

    this.options = {
      legend: {
        data: ['Expense'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        name: 'Year and month',
        data: chartData.map(d => d.year + "." + (d.month + 1).toString().padStart(2, '0')),
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
          data: chartData.map(d => d.value),
          animationDelay: (idx: number) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }
}
