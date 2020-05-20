import React, { Component } from "react";

import Spinner from "../spinner";
import SwapiService from "../../services/swapi-service";
import ErrorComponent from "../error-component";

import "./random-planet.css";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  constructor() {
    super();
  }

  componentDidMount(){
    this.interval = setInterval(this.updatePlanet, 2000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 18) + 2;

    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    console.log("render");
    const { planet, loading, error } = this.state;
    const errorMessage = error ? <ErrorComponent /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt={name}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
