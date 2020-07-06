import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from "rich-markdown-editor";
import { debounce } from "lodash";
import ReactDOM from "react-dom";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const element = document.getElementById("main");
const savedText = localStorage.getItem("saved");
const exampleText = `
# Welcome

This is example content. It is persisted between reloads in localStorage.
`;
const defaultValue = savedText || exampleText;


class Example extends React.Component {

  state = {
    readOnly: false,
    dark: localStorage.getItem("dark") === "enabled",
    value: undefined
  };

  handleEditable = () => {
    this.setState({ readOnly: !this.state.readOnly });
  }

  handleToggleDark = () => {
    const dark = !this.state.dark;
    this.setState({ dark });
    localStorage.setItem("dark", dark ? "enabled" : "disabled");
  }

  handleUpdateValue = () => {
    const existing = localStorage.getItem("saved") || "";
    const value = `${existing}\n\nedit!`;
    localStorage.setItem("saved", value);
    this.setState({ value });
  }

  handleChange = debounce(value => {
    const text = value();
    console.log(text);
    localStorage.setItem("saved", text);
  }, 250);

  render() {

    const { body } = document;
    if (body) body.style.backgroundColor = this.state.dark ? "#181A1B" : "#FFF";

    return (
      <div className="container">
        <div class="row">

        <div className="col-md-2">hihi</div>
        <div className="col-md-10">
          <div>
            <button type="button" onClick={this.handleEditable}>
              {this.state.readOnly ? "Editable" : "Read only"}
            </button> {" "}
            <Editor
              id="example"
              readOnly={this.state.readOnly}
              value={this.state.value}
              defaultValue={defaultValue}
              handleDOMEvents={{
                focus: () => console.log("FOCUS"),
                blur: () => console.log("BLUR"),
                paste: () => console.log("PASTE"),
                touchstart: () => console.log("TOUCH START"),
              }}
              onChange={this.handleChange}
              onCreateLink={title => {
                // Delay to simulate time taken for remote API request to complete
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (title !== "error") {
                      return resolve(
                        `/doc/${encodeURIComponent(title.toLowerCase())}`
                      );
                    } else {
                      reject("500 error");
                    }
                  }, 1500);
                });
              }}
              dark={this.state.dark}
              autoFocus
            />
          </div>
        </div>

        </div>
        </div>
    )
  }



}
if (element) {
  ReactDOM.render(<Example />, element);
}

export default Example;
