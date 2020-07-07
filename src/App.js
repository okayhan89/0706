import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from "rich-markdown-editor";
import { debounce } from "lodash";
import ReactDOM from "react-dom";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import jQuery  from 'jquery';

//import './js/scripts.js';


const element = document.getElementById("main");
const savedText = localStorage.getItem("saved");
const exampleText = `
# Welcome

This is example content. It is persisted between reloads in localStorage.
`;
const defaultValue = savedText || exampleText;


class Example extends React.Component {

  componentDidMount() {
    // Jquery here $(...)...
    window.$ = window.jQuery = jQuery;
    /*!
    * Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */
  }
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
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">
                <span class="d-block d-lg-none">Clarence Taylor</span>
                <span class="d-none d-lg-block"><img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="assets/img/profile.jpg" alt="" /></span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#experience">Experience</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#education">Education</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#skills">Skills</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#interests">Interests</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#awards">Awards</a></li>
                </ul>
            </div>
        </nav>        
        
        <div class="row">

        <div className="col-md-2">hihi</div>
        <div className="col-md-10">
          <form>
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
          </form>
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
