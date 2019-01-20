import React, { Component } from "react";
import PropTypes from "prop-types";
import { login, logout } from "../utils/firebase";

class Header extends Component {
  onLogin = async () => {
    const { updateUserToken } = this.props;
    const loginResponse = await login();

    try {
      const { token } = loginResponse.data;

      if (updateUserToken && token) updateUserToken(token);
    } catch {
      updateUserToken(null);
    }
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        {user ? (
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <button type="button" onClick={this.onLogin}>
            Login
          </button>
        )}

        {user && ` ${user.displayName}`}

        <hr />
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({}),
  updateUserToken: PropTypes.func
};

Header.defaultProps = {
  user: null,
  updateUserToken: null
};

export default Header;
