import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class VaccinationByGender extends Component {
  renderGraph = () => {
    const {item} = this.props
    const DataFormatter = number => {
      if (number === 0) {
        return number
      }
      return `${number * 1500}k`
    }
    return (
      <div className="vaccine-container">
        <PieChart width={1000} height={300}>
          <Pie
            cx="70%"
            cy="40%"
            data={item}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#fecba6" />
            <Cell name="Female" fill="#b3d23f" />
            <Cell name="Others" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </div>
    )
  }

  render() {
    return <>{this.renderGraph()}</>
  }
}

export default VaccinationByGender
