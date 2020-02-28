import React, { PureComponent } from "react"
import Header from "./components/Header/Header"
import ImageSelector from "./components/ImageSelector/ImageSelector"

export default class Main extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <ImageSelector />
      </div>
    )
  }
}