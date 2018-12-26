/*
-----------------------------------------------------------------

  _____       _
 |_   _|     | |
   | |  _ __ | |_ _ __ ___
   | | | '_ \| __| '__/ _ \
  _| |_| | | | |_| | | (_) |
 |_____|_| |_|\__|_|  \___/

Redux + React Native Animated

- Minimal Example
- All code in one file
- Redux
- React Native Animated
- Fetch

-----------------------------------------------------------------
*/
import React from 'react';

/*
-----------------------------------------------------------------
   _____ _
  / ____| |
 | (___ | |_ ___  _ __ ___
  \___ \| __/ _ \| '__/ _ \
  ____) | || (_) | | |  __/
 |_____/ \__\___/|_|  \___|

-----------------------------------------------------------------
*/
import { createStore } from 'redux';

const INITIAL_STATE = {
  btc: 0,
  ltc: 0,
  euro: 0,
  eth: 0,
  isAvailable: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.state };
  }
};

const store = createStore(reducer, {});

/*
-----------------------------------------------------------------

   _____                                             _
  / ____|                                           | |
 | |     ___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_ ___
 | |    / _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ '_ \| __/ __|
 | |___| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_\__ \
  \_____\___/|_| |_| |_| .__/ \___/|_| |_|\___|_| |_|\__|___/
                       | |
                       |_|

-----------------------------------------------------------------
*/
import { Animated, StatusBar, StyleSheet, Text, View, Slider } from 'react-native';
import { Provider, connect } from 'react-redux';

const mapStateToProps = state => {
  return { ...state };
};

const numberWithCommas = x => {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const fetchPrice = async source => {
  const response = await fetch(source);
  const json = await response.json();

  return json.result.price;
};

class PriceSectionComponent extends React.Component {
  state = {
    display: new Animated.Value(this.props.top),
    value: this.props.top
  };

  componentWillReceiveProps(nextProps) {
    const { display } = this.state;

    Animated.timing(display, {
      duration: 600,
      toValue: nextProps.top
    }).start();
  }

  componentDidMount() {
    const { display } = this.state;

    display.addListener(({ value }) => {
      this.setState({ value });
    });
  }

  render() {
    const { bottom, fixed, symbol } = this.props;
    const { value } = this.state;

    const valueToRender = numberWithCommas(value.toFixed(fixed));

    return (
      <View style={styles.priceSection}>
        <Text style={[styles.priceSectionTop]}>
          {symbol ? `${symbol} ` : undefined}
          {valueToRender}
        </Text>
        <Text style={[styles.priceSectionBottom]}>{bottom}</Text>
      </View>
    );
  }
}

class AppScreen extends React.Component {
  state = {
    value: 1
  };

  async componentDidMount() {
    const baseURL = 'https://api.cryptowat.ch/markets/';
    const btc = await fetchPrice(`${baseURL}gdax/btcusd/price`);
    const ltc = await fetchPrice(`${baseURL}gdax/ethusd/price`);
    const eth = await fetchPrice(`${baseURL}gdax/ltcusd/price`);
    const euro = await fetchPrice(`${baseURL}bitstamp/eurusd/price`);

    this.props.dispatch({
      type: 'UPDATE_STATE',
      state: { btc, ltc, eth, euro, isAvailable: true }
    });
  }

  render() {
    const { btc, eth, euro, isAvailable, ltc } = this.props;
    const { value } = this.state;

    if (!isAvailable) {
      return null;
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />

        <PriceSectionComponent
          bottom="United States Dollar"
          fixed={2}
          symbol="$"
          top={value}
        />
        <PriceSectionComponent
          bottom="Euro"
          fixed={2}
          symbol="€"
          top={Number(value / euro)}
        />

        <Slider
          style={styles.slider}
          maximumValue={1000000}
          minimumValue={1}
          step={1}
          value={value}
          onSlidingComplete={val => this.setState({ value: val })}
        />

        <PriceSectionComponent
          bottom="Litecoin"
          fixed={3}
          symbol="LTC"
          top={Number(value / ltc)}
        />

        <PriceSectionComponent
          bottom="Ethereum"
          fixed={4}
          symbol="ETH"
          top={Number(value / eth)}
        />

        <PriceSectionComponent
          bottom="Bitcoin"
          fixed={5}
          symbol="BTC"
          top={Number(value / btc)}
        />
      </View>
    );
  }
}

const ConnectedAppScreen = connect(mapStateToProps)(AppScreen);

/*
-----------------------------------------------------------------

  _____             _
 |  __ \           | |
 | |__) |___   ___ | |_
 |  _  // _ \ / _ \| __|
 | | \ \ (_) | (_) | |_
 |_|  \_\___/ \___/ \__|

-----------------------------------------------------------------
*/

export default RootComponent = () => (
  <Provider store={store}>
    <ConnectedAppScreen />
  </Provider>
);

/*
-----------------------------------------------------------------

   _____ _         _
  / ____| |       | |
 | (___ | |_ _   _| | ___  ___
  \___ \| __| | | | |/ _ \/ __|
  ____) | |_| |_| | |  __/\__ \
 |_____/ \__|\__, |_|\___||___/
              __/ |
             |___/

-----------------------------------------------------------------
*/
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center'
  },
  slider: {
    width: '100%',
  },
  priceSection: {
    padding: 16,
    width: '100%'
  },
  priceSectionTop: {
    color: '#fff',
    fontSize: 32
  },
  priceSectionBottom: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2
  },
});
