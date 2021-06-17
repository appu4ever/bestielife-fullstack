/*eslint-disable*/
import { Box } from '@chakra-ui/react';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { months } from '../constants';
import { formatData } from '../utils/formatData';

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};

interface ExpenseBarChartProps {
  totalBudgets: Record<string, number>;
  totalExpenses: Record<string, number>;
}

const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({
  totalBudgets,
  totalExpenses,
}) => {
  const [data, setData] = React.useState({
    labels: months,
    datasets: [
      {
        label: 'Budget',
        data: [] as number[],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Expense',
        data: [] as number[],
        ackgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  });
  // console.log(totalBudgets);
  // console.log(totalExpenses);
  React.useEffect(() => {
    setData({
      ...data,
      datasets: [
        { ...data.datasets[0], data: formatData(totalBudgets) },
        { ...data.datasets[1], data: formatData(totalExpenses) },
      ],
    });
  }, [totalBudgets, totalExpenses]);
  return (
    <Box w={'100%'}>
      <Bar data={data} options={options} type="bar" />
    </Box>
  );
};
export default ExpenseBarChart;
