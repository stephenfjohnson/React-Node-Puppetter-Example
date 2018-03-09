import React, { Component } from 'react';

class ListPins extends Component {
  createPins(item) {
    return (
      <li key={item.key}>
        {item.url} {item.saves}
      </li>
    );
  }

  render() {
    let pinEntries = this.props.entries;

    let listItemsSorted = pinEntries.sort(function(obj1, obj2) {
      // Ascending: first age less than the previous
      return obj2.saves - obj1.saves;
    });

    console.log(`Memes`);

    let listItems = listItemsSorted.map(this.createPins);
    console.log(listItems);

    return <ul>{listItems}</ul>;
  }
}

export default ListPins;
