import React, { Component } from "react";

import SwapiService from "../../services/swapi-service"

import "./item-list.css";

class ItemList extends Component {
  swapiService = new SwapiService();
  state = {
    items: [],
  }

  componentDidMount(){
    this.swapiService.getAllPeople().then((data)=>{
      this.setState(({items})=>{
        return{
          items:data,
        }
      });
    })
  }

  render() {
    const {items} = this.state;
    const {onSelectedItem} = this.props;

    return (
      <ul className="item-list list-group">
        {
          this.state.items.map((item) => {
            return(
              <li
              className="list-group-item"
              key={item.id}
              onClick={()=>{onSelectedItem(item.id)}}
              >
                {item.name}
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default ItemList;
