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

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class VaccinationCoverage extends Component {
  state = {
    covidData: {},
    last7DaysVaccination: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAGe: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({
        covidData: updatedData,
        last7DaysVaccination: updatedData.last7DaysVaccination,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderGraph = () => {
    const {last7DaysVaccination} = this.state
    const DataFormatter = number => {
      if (number === 0) {
        return number
      }
      return number * 1500 + 'k'
    }
    return (
      <div>
        <ResponsiveContainer width="80%" height={500}>
          <BarChart
            data={last7DaysVaccination}
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

  renderFailureCase = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="f-hed">Something went wrong</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let value

    switch (apiStatus) {
      case apiStatusConstants.success:
        value = this.renderGraph()
        break
      case apiStatusConstants.inProgress:
        value = this.renderLoading()
        break
      case apiStatusConstants.failure:
        value = this.renderFailureCase()
        break
      default:
        value = null
    }

    return <>{value}</>
  }
}

export default VaccinationCoverage
