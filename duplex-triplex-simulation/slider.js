const $sliders = document.querySelector(".sliders")

const sliderTemplate = document.querySelector("#slider-template").innerHTML



class Slider {

  slider
  output



  constructor(label, value, min, max, step, onChange) {

    const labelId = label.toLowerCase().replace(/ /g, "-")
    const sliderId = `slider-${ labelId }`
    const outputId = `output-${ labelId }`

    // Create template
    const html = Mustache.render(sliderTemplate, {
      label,

      value,
      min, max, step,

      sliderId,
      outputId
    })
    $sliders.insertAdjacentHTML("beforeend", html)

    // Find slider
    this.slider = $sliders.querySelector(`#${ sliderId }`)
    this.output = $sliders.querySelector(`#${ outputId }`)

    this.slider.addEventListener("change", onChange)
    this.slider.addEventListener("input", () => this.output.innerHTML = this.slider.value)

  }

}
