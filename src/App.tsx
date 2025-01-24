import React, { useState } from 'react'
import { ArrowRight, Ruler, Scale, Thermometer, Droplet, Clock, Zap, Database, Cloud } from 'lucide-react'
import { SpeedInsights } from "@vercel/speed-insights/react"

// ... [Keep all your existing conversion functions and categories array here] ...

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [fromUnit, setFromUnit] = useState(selectedCategory.units[0])
  const [toUnit, setToUnit] = useState(selectedCategory.units[1])
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState('')

  const convertUnits = () => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) {
      setResult('Invalid input')
      return
    }

    try {
      const convertedValue = selectedCategory.converter(value, fromUnit, toUnit)
      setResult(convertedValue.toFixed(4).replace(/\.?0+$/, ''))
    } catch (error) {
      setResult('Conversion error')
    }
  }

  const SelectedIcon = selectedCategory.Icon

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden p-6 space-y-6 border border-gray-100">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedCategory.bgColor} p-6 rounded-lg text-center`}>
          <h1 className="text-4xl font-bold text-white mb-2">HowManyIn</h1>
          <p className="text-white/90 text-sm">Quick and Accurate Unit Conversions</p>
        </div>

        {/* Category Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const CategoryIcon = category.Icon
            return (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category)
                  setFromUnit(category.units[0])
                  setToUnit(category.units[1])
                  setInputValue('')
                  setResult('')
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200
                  bg-gradient-to-br ${category.bgColor} hover:brightness-95
                  ${
                    selectedCategory.name === category.name
                      ? 'ring-1 ring-gray-300 ring-offset-2'
                      : 'opacity-90 hover:opacity-100'
                  }`}
              >
                <CategoryIcon className={`w-6 h-6 mb-1 ${category.textColor}`} />
                <span className={`text-sm font-medium ${category.textColor}`}>{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Conversion Section */}
        <div className="space-y-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {selectedCategory.units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => setFromUnit(unit)}
                  className={`flex-1 min-w-[100px] p-2 text-sm rounded-lg transition-all duration-200
                    ${selectedCategory.textColor}
                    ${
                      fromUnit === unit
                        ? `${selectedCategory.activeColor} border ${selectedCategory.borderColor}`
                        : `bg-white hover:${selectedCategory.hoverColor} border ${selectedCategory.borderColor}`
                    }`}
                >
                  {unit}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className={`w-full p-3 bg-white rounded-lg focus:ring-1 focus:ring-${selectedCategory.color}-300 border ${selectedCategory.borderColor} font-medium`}
            />
          </div>

          {/* Arrow Icon */}
          <div className="flex justify-center">
            <ArrowRight className={`text-${selectedCategory.color}-400`} size={24} />
          </div>

          {/* Output Section */}
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {selectedCategory.units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => setToUnit(unit)}
                  className={`flex-1 min-w-[100px] p-2 text-sm rounded-lg transition-all duration-200
                    ${selectedCategory.textColor}
                    ${
                      toUnit === unit
                        ? `${selectedCategory.activeColor} border ${selectedCategory.borderColor}`
                        : `bg-white hover:${selectedCategory.hoverColor} border ${selectedCategory.borderColor}`
                    }`}
                >
                  {unit}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={result}
              readOnly
              className={`w-full p-3 bg-white rounded-lg border ${selectedCategory.borderColor} font-medium`}
            />
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={convertUnits}
          className={`w-full p-3 bg-gradient-to-r ${selectedCategory.bgColor} ${selectedCategory.textColor} rounded-lg 
            hover:brightness-95 focus:ring-1 focus:ring-${selectedCategory.color}-300 
            transition-all duration-200 flex items-center justify-center gap-2 border ${selectedCategory.borderColor} font-medium`}
        >
          <SelectedIcon className="w-5 h-5" />
          <span>Convert</span>
        </button>
      </div>
      
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  )
}

export default App
