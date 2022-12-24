class App {

  numbersToGenerateInput
  sliders = []



  constructor() {

    this.numbersToGenerateInput = document.querySelector("#numbers-to-generate")
    this.numbersToGenerateInput.addEventListener("change", this.onChange.bind(this))

    // Create sliders
    for (const label of ["A", "B"])
      this.sliders.push(new Slider(label, 0.8, 0, 1, 0.01, this.onChange.bind(this)))

    for (const label of ["C", "D", "E", "F", "G"])
      this.sliders.push(new Slider(label, 0, 0, 1, 0.01, this.onChange.bind(this)))

    // Calculate values
    this.onChange()

  }



  // When a value changes
  onChange() {

    // Create calculators
    const duplexCalculator = new Calculator(2, this.sliders)
    const triplexCalculator = new Calculator(3, this.sliders)

    // Calculate data
    const numbersToGenerate = parseInt(this.numbersToGenerateInput.value)

    duplexChart.data.datasets[0].data = duplexCalculator.calculate(numbersToGenerate)
    triplexChart.data.datasets[0].data = triplexCalculator.calculate(numbersToGenerate)

    // Update charts
    duplexChart.update()
    triplexChart.update()

  }

}

new App()
