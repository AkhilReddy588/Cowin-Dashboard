import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

class CowinDashboard extends Component {
  render() {
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
        <VaccinationCoverage />
        <h1 className="heading">Vaccination by gender</h1>
        <VaccinationByGender />
        <h1 className="heading">Vaccination by Age</h1>
        <VaccinationByAge />
      </div>
    )
  }
}

export default CowinDashboard
