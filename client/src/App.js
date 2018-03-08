import React, { Component } from 'react';
import { Image } from 'cloudinary-react';

import PinList from './PinList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    listPins: [],
    response: '',
    notes: [],
    domainTitle: '',
    publicId: '',
    pinAmount: 0
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

    // this.callDomain()
    //   .then(res =>
    //     this.setState({
    //       domainTitle: res.title,
    //       publicId: res.publicId
    //     })
    //   )
    //   .catch(err => console.log(err));

    fetch('/api/notes')
      .then(res => res.json())
      .then(notes => this.setState({ notes }));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  callDomain = async () => {
    const response = await fetch('/api/screenshot');
    const body = await response.json();

    await this.setState({
      domainTitle: body.title,
      publicId: body.publicId
    });

    console.log(`Fire Memes 🔥`);

    await console.log(this.state.domainTitle);

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  callPin = async () => {
    const response = await fetch(
      'https://api.pinterest.com/v1/pins/303078249913866812/?access_token=AQ2XcEzwFAc-Xzjw66sqW9pfyushFRlvIyjMrVxEwTPTD0A4ygAAAAA&fields=id%2Curl%2Ccounts%2Cimage%2Clink%2Cnote'
    );
    const body = await response.json();

    await console.log(body);

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  callPinAmount = async () => {
    // const response = await fetch('https://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=');
    const response = await fetch('https://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=https://paleoglutenfree.com/recipes/grilled-garlic-lime-chicken-fajita-salad/');
    console.log(response);

    const body = await response.json();

    await console.log(body);

    // await this.setState({
    //   pinAmount: body.count
    // });

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pin Tester</h1>
        </header>
        <button onClick={this.callDomain.bind(this)}>Screenshot</button>
        <button onClick={this.callPin.bind(this)}>Pin Info</button>
        <button onClick={this.callPinAmount.bind(this)}>Call Pin Amount</button>
        <p className="App-intro">{this.state.response}</p>
        <p className="App-intro">{this.state.domainTitle}</p>
        <p className="App-intro">{this.state.pinAmount}</p>
        <Image cloudName="createpin" publicId={this.state.publicId} width="300" crop="scale" />
        {this.state.notes.map(note => (
          <div key={note.id}>
            <span>{note.title}</span>- <span>{note.text}</span>
          </div>
        ))}

        <PinList />
      </div>
    );
  }
}

export default App;
