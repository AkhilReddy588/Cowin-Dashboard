import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    covidData: {},
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
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      console.log(updatedData.vaccinationByAGe)
      this.setState({
        covidData: updatedData,
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

  renderData = () => {
    const {covidData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = covidData

    return (
      <div className="bg-container">
        <div className="logo-section">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="logo"
          />
          <p className="logo-txt">Co-WIN</p>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <h1 className="heading">Vaccination Coverage</h1>
        <VaccinationCoverage item={last7DaysVaccination} />
        <h1 className="heading">Vaccination by gender</h1>
        <VaccinationByGender item={vaccinationByGender} />
        <h1 className="heading">Vaccination by Age</h1>
        <VaccinationByAge item={vaccinationByAge} />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    let value

    switch (apiStatus) {
      case apiStatusConstants.success:
        value = this.renderData()
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

export default CowinDashboard
