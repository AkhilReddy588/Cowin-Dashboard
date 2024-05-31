import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

class VaccinationByAge extends Component {
  renderGraph = () => {
    const {item} = this.props
    return (
      <div className="vaccine-container">
        <PieChart width={1000} height={300}>
          <Pie
            cx="70%"
            cy="40%"
            data={item} // Correct prop name
            startAngle={0}
            endAngle={360}
            dataKey="count"
          >
            <Cell name="18-44" fill="#fecba6" />
            <Cell name="45-60" fill="#b3d23f" />
            <Cell name="Above 60" fill="#a44c9e" />
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

export default VaccinationByAge
