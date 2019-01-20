import React, { Component } from "react";
import { searchBooks } from "../utils/google-books";

class ApiTests extends Component {
  state = {
    output: {}
  };

  test = async () => {
    const { token } = this.props;

    const output = await searchBooks({
      query: "charlie and the chocolate factory",
      token
    });

    this.setState({ output });
  };

  render() {
    const { output } = this.state;

    return (
      <div>
        <button type="button" onClick={this.test}>
          Test
        </button>

        <pre>{JSON.stringify(output, null, 2)}</pre>
      </div>
    );
  }
}

export default ApiTests;
