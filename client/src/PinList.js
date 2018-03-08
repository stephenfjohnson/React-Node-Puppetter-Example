import React, { Component, Fragment } from 'react';
import ListPins from './ListPins';

class PinList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    // this.addPin = this.addPin.bind(this);
  }

  //   callPin = async () => {
  //     const response = await fetch(
  //       'https://api.pinterest.com/v1/pins/303078249913866812/?access_token=AQ2XcEzwFAc-Xzjw66sqW9pfyushFRlvIyjMrVxEwTPTD0A4ygAAAAA&fields=id%2Curl%2Ccounts%2Cimage%2Clink%2Cnote'
  //     );
  //     const body = await response.json();

  //     await console.log(body);

  //     if (response.status !== 200) throw Error(body.message);
  //     return body;
  //   };

  addPin = async e => {
    await e.preventDefault();

    await console.log(`LOG PIN ID ⛰`);

    const addedURL = await this.target.value;
    await console.log(addedURL);

    const splitURL = await addedURL.split('/');
    await console.log(splitURL);
    const pinID = await splitURL[4];

    await console.log(`PIN ID 🤘`);

    await console.log(pinID);

    const response = await fetch(`https://api.pinterest.com/v1/pins/${pinID}/?access_token=AQ2XcEzwFAc-Xzjw66sqW9pfyushFRlvIyjMrVxEwTPTD0A4ygAAAAA&fields=id%2Curl%2Ccounts%2Cimage%2Clink%2Cnote`);
    const body = await response.json();

    await console.log(body);
    await console.log(body.data);

    // if (response.status !== 200) throw Error(body.message);
    // return body;

    if (this.target.value !== '') {
      let newItem = await {
        text: this.target.value,
        id: body.data.id,
        url: body.data.url,
        saves: body.data.counts.saves,
        key: Date.now()
      };

      console.log(newItem);

      this.setState(prevState => {
        console.log(prevState);

        return {
          items: prevState.items.concat(newItem)
        };
      });

      this.target.value = '';
    }

    console.log(this.state);
  };
  render() {
    return (
      <Fragment>
        <form onSubmit={this.addPin.bind(this)}>
          <input ref={a => (this.target = a)} type="text" placeholder="Add Pin" />
          <button type="submit">Add Item</button>
        </form>
        <ListPins entries={this.state.items} />
      </Fragment>
    );
  }
}

export default PinList;
