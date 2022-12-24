// Create charts
const duplexChart = new Chart(document.querySelector("#duplex-chart").getContext("2d"), {
  type: "bar",
  data: {
    labels: [2, 3, 4, 5, 6, 7],
    datasets: [{
      label: "Duplex",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1
    }]
  },
  options: {
    title: {
      display: true,
      text: "Duplex"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          callback(value) { return `${ value }%` }
        }
      }]
    }
  }
})

const triplexChart = new Chart(document.querySelector("#triplex-chart").getContext("2d"), {
  type: "bar",
  data: {
    labels: [3, 4, 5, 6, 7],
    datasets: [{
      label: "Triplex",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)"
      ],
      borderWidth: 1
    }]
  },
  options: {
    title: {
      display: true,
      text: "Triplex"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          callback(value) { return `${ value }%` }
        }
      }]
    }
  }
})
