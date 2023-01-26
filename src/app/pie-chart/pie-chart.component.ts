import { Component, OnInit } from '@angular/core';
import { EXPENSES } from '../expense_data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  expenses = EXPENSES;
  pieChartOptions: any = {};
  pieChartData: any[] = [];
  pieChartLoading = true;
  ngOnInit() {
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
        name: expense.name
      }
    });
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
}
