class Calculator {

  sliders
  count



  constructor(count, sliders) {
    this.count = count
    this.sliders = sliders
  }



  calculate(numbersToGenerate) {

    // Results
    const data = this.generateData(numbersToGenerate)
    const results = []

    // Test each case with i columns
    for (let i = this.count; i <= this.sliders.length; i++) {

      let total = 0 // Count total that pass

      loop: for (let j = 0; j < numbersToGenerate; j++) {

        let count = 0 // Count how may in this row are true
        for (let index = 0, x = 0; x < i; index++ , x++) {

          // Skip sliders that are on 0
          while (index < this.sliders.length && parseFloat(this.sliders[index].slider.value) === 0) index++
          if (index >= this.sliders.length) break loop

          // Increment count
          if (data[index][j]) count++

        }

        // If greater than the count, it counts towards the total
        if (count >= this.count) total++

      }

      // Add result to final list
      results.push(total / numbersToGenerate * 100)

    }

    return results

  }

  generateData(numbersToGenerate) {

    // Get data for each slider
    const data = []

    for (const slider of this.sliders) {
      const chance = slider.slider.value
      const numbers = []

      // Generate numbers
      for (let i = 0; i < numbersToGenerate; i++) numbers[i] = Math.random() < chance
      data.push(numbers)

    }

    return data

  }

}