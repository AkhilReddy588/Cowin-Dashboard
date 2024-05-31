import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class VaccinationByAge extends Component {
  state = {
    covidData: {},
    vaccinationByAGe: [],
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
      console.log(updatedData.vaccinationByAGe)
      this.setState({
        covidData: updatedData,
        vaccinationByAGe: updatedData.vaccinationByAGe,
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
    const {vaccinationByAGe} = this.state
    const DataFormatter = number => {
      if (number === 0) {
        return number
      }
      return `${number * 1500}k`
    }
    return (
      <div>
        <PieChart width="100%" height={300}>
          <Pie
            cx="70%"
            cy="40%"
            data={vaccinationByAGe}
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

export default VaccinationByAge
