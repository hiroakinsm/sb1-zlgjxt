// チャートの共通設定
export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          size: 11
        },
        padding: 15
      }
    },
    datalabels: {
      color: '#666',
      font: {
        weight: 'bold'
      },
      formatter: (value) => value.toLocaleString()
    }
  }
}

// レーダーチャートの共通設定
export const radarChartOptions = {
  ...commonChartOptions,
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20
      },
      pointLabels: {
        font: {
          size: 11
        }
      }
    }
  }
}

// 棒グラフの共通設定
export const barChartOptions = {
  ...commonChartOptions,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20
      }
    }
  }
}

// 円グラフの共通設定
export const pieChartOptions = {
  ...commonChartOptions,
  cutout: '30%'
}

// チャートの共通カラーパレット
export const chartColors = {
  primary: [
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)'
  ],
  secondary: [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)'
  ]
}

// チャートのデータセットの共通スタイル
export const commonDatasetStyle = {
  borderWidth: 1,
  fill: true
}

// チャートの種類ごとのデフォルト設定
export const chartDefaults = {
  radar: {
    options: radarChartOptions,
    dataset: {
      ...commonDatasetStyle,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)'
    }
  },
  bar: {
    options: barChartOptions,
    dataset: {
      ...commonDatasetStyle,
      backgroundColor: chartColors.primary[0],
      borderColor: chartColors.secondary[0]
    }
  },
  pie: {
    options: pieChartOptions,
    dataset: {
      ...commonDatasetStyle,
      backgroundColor: chartColors.primary
    }
  },
  doughnut: {
    options: {
      ...pieChartOptions,
      cutout: '50%'
    },
    dataset: {
      ...commonDatasetStyle,
      backgroundColor: chartColors.primary
    }
  }
}