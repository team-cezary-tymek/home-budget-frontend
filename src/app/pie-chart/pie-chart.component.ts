import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EXPENSES } from '../expense_data';
import { FormsModule, NgModel } from '@angular/forms';
import { ECharts, EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit {
  @ViewChild('chart') chart: any;
  expenses: Expense[];
  pieChartOptions: any = {};
  pieChartData: any[] = [];
  pieChartLoading = true;
  selectedMonthAndYear: any;
  availableMonthsAndYears: any;
  chartData: any;
  text = '';
  chartRef: ElementRef;
  constructor(chartRef: ElementRef, private expenseService: ExpenseService) {
    this.chartRef = chartRef;
  }
  ngOnInit(): void {
    
    console.log(this.chart)
    const expensesByCategory = new Map();
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      for (const expense of this.expenses) {
      const categoryObj = JSON.parse(JSON.stringify(expense.category));
      // const startIndex = categoryObj.indexOf("name") + 8;
      // const endIndex = categoryObj.indexOf("'", startIndex);
      // const category = categoryObj.substring(startIndex, endIndex);
      const category = categoryObj.name;
      console.log(category);
      if (!expensesByCategory.has(category)) {
        expensesByCategory.set(category, {
          category,
          value: 0
        });
      }
      expensesByCategory.get(category).value += expense.value;
    }
    const chartData = [...expensesByCategory.values()]
    console.log("Chartdata");
    console.log(chartData);
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
    })
  }
}
