import {Component} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class VaccinationCoverage extends Component {
  renderGraph = () => {
    const {item} = this.props
    const DataFormatter = number => {
      if (number === 0) {
        return number
      }
      return `${number * 1500}k`
    }
    return (
      <div>
        <ResponsiveContainer width="80%" height={500}>
          <BarChart
            data={item}
            width={1000}
            height={300}
            margin={{
              top: 5,
            }}
          >
            <XAxis
              dataKey="vaccine_date"
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />
            <Legend
              wrapperStyle={{
                padding: 30,
              }}
            />
            <Bar dataKey="dose_1" name="Dose1" fill="#5a8dee" barSize="20%" />
            <Bar dataKey="dose_2" name="Dose2" fill="#f54394" barSize="20%" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  render() {
    return <>{this.renderGraph()}</>
  }
}

export default VaccinationCoverage
