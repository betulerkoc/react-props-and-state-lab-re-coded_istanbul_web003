import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
// import data from '../data/pets'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    console.log(e.target.value)
    this.setState({
      filters: {
        type: e.target.value
      }
    })
    //console.log(this.state.filters.type)
  }



  onFindPetsClick = () => {
    const fetchUrl = (this.state.filters.type === "all" ? `/api/pets` : `/api/pets?type=${this.state.filters.type}`)

    fetch(fetchUrl)
    .then(response => response.json())
    .then(data => this.setState({ pets: data}))

   // console.log(this.state.pets) 
  }

  onAdoptPet = (id) => {
    console.log("hello")
    const adopted = this.state.pets.map(pet => {
      if(pet.id === id) {
        return {
          ...pet,
          isAdopted: true
        }
      } else {
        return pet;
      }
    })
    this.setState({
      pets: adopted
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = {this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
