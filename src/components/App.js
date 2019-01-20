import React, { Component } from "react";
import { auth } from "../utils/firebase";
import { getDoc } from "../utils/firebase/helpers/read";
import Header from "./Header";
import ApiTests from "./ApiTests";

class App extends Component {
  state = {
    user: null,
    token: null,
    unsubscribeOnAuthStateChanged: null
  };

  componentDidMount() {
    const authAction = async user => {
      if (user) {
        const userData = await getDoc({ path: `users/${user.uid}` });
        const token = userData && userData.token;

        this.setState({ token, user });
      } else {
        this.setState({ token: null, user: null });
      }
    };

    const unsubscribeOnAuthStateChanged = auth.onAuthStateChanged(authAction);

    this.setState({ unsubscribeOnAuthStateChanged });
  }

  componentWillUnmount() {
    // not needed on the root component
    const { unsubscribeOnAuthStateChanged } = this.state;
    if (unsubscribeOnAuthStateChanged) unsubscribeOnAuthStateChanged();
  }

  updateUserToken = token => {
    this.setState({ token });
  };

  render() {
    const { user, token } = this.state;

    return (
      <div>
        <Header user={user} updateUserToken={this.updateUserToken} />
        <ApiTests token={token} />
      </div>
    );
  }
}

export default App;
