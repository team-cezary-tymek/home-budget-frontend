import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { EXPENSES } from '../expense_data';
import { INCOMES } from '../income_data';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import { Income } from '../income';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  options: any;
  options2: any;
  expenses: Expense[];
  incomes: Income[];
  constructor(private expenseService: ExpenseService,
    private incomeService: IncomeService) { }

  ngOnInit(): void {
    const expensesByYearAndMonth = new Map();
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      for (const expense of this.expenses) {
        console.log(expense);
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
      this.incomeService.getIncomes().subscribe(incomes => {
        this.incomes = incomes;
        const incomesByYearAndMonth = new Map();
        for (const incomes of this.incomes) {
          const date = new Date(incomes.date);
          const year = date.getFullYear();
          const month = date.getMonth();
          const key = `${year}.${month}`;
          if (!incomesByYearAndMonth.has(key)) {
            incomesByYearAndMonth.set(key, {
              year,
              month,
              value: 0
            });
          }
          incomesByYearAndMonth.get(key).value += incomes.value;
        }
        const chartData2 = Array.from(incomesByYearAndMonth.values());
        this.options = {
          legend: {
            data: ['Expense', 'Income'],
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
            nameTextStyle: {
              color: 'white',
              fontSize: 16
            },
            axisLabel: {
              fontSize: 16,
              color: '#ffffff'
            }
          },
          yAxis: {
            name: 'Cost',
            axisLabel: {
              fontSize: 14,
              color: 'ffffff'
            },
            nameTextStyle: {
              color: 'white',
              fontSize: 16
            }
          },
          series: [
            {
              name: 'Expense',
              type: 'bar',
              data: chartData.map(d => d.value),
              animationDelay: (idx: number) => idx * 10,
            },
            {
              name: 'Income',
              type: 'bar',
              data: chartData2.map(d => d.value),
              animationDelay: (idx: number) => idx * 10,
            }
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx: number) => idx * 5,
        };

        const incomes_expensesByYearAndMonth = [];

        for (let i = 0; i < chartData2.length; i++) {
          incomes_expensesByYearAndMonth.push(chartData2[i].value - chartData[i].value);
        }

        const chartData3 = Array.from(incomes_expensesByYearAndMonth.values());
        this.options2 = {
                legend: {
                  data: ['Income - expense'],
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
                  nameTextStyle: {
                    color: 'white',
                    fontSize: 16,
                  },
                  axisLabel: {
                    color: 'ffffff',
                    fontSize: 16
                  }
                },
                yAxis: {
                  name: 'Cost',
                  axisLabel: {
                    color: 'ffffff',
                    fontSize: 14
                  },
                  nameTextStyle: {
                    color: 'white',
                    fontSize: 16
                  }
                },
                series: [
                  {
                    name: 'Income - expense',
                    type: 'bar',
                    data: chartData3,
                    animationDelay: (idx: number) => idx * 10,
                  },
                ],
                animationEasing: 'elasticOut',
                animationDelayUpdate: (idx: number) => idx * 5,
              };
      });
    }); 
  }
}
