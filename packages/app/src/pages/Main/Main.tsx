import React, { Component } from "react"
import { Header } from "./components/Header/Header"
import ImageSelector from "./components/ImageSelector/ImageSelector"
import { ImageList } from "./components/ImageList/ImageList"
import { Image } from '../../models/Image'
import Environment from '../../helpers/environment'
import { AppButton, ButtonType } from "../../components/AppButton/AppButton"

export type State = {
  images: Image[]
}

export default class Main extends Component<{}, State> {

  interval: number = 0

  state = {
    images: []
  }

  render() {
    return (
      <div>
        <Header title='Wallpaper Electron' />
        <ImageSelector
          onImageLoaded={this.onImageLoaded} />
        <ImageList
          images={this.state.images} />
        {
          Environment.isElectron() && this.state.images.length ?
            <AppButton
              text={this.isPlaying() ? 'STOP' : 'PLAY'}
              type={ButtonType.Switch}
              isActive={this.isPlaying()}
              onClick={this.toggleWallpapers} /> :
            null
        }
      </div>
    )
  }

  onImageLoaded = (images: Image[]) => {
    this.setState({
      images: [...images]
    })
  }

  toggleWallpapers = () => {
    if (this.isPlaying()) {
      clearInterval(this.interval)
      this.setState((current: State) => ({
        images: current.images.map((x: Image) => {
          x.playing = false
          return x
        })
      }))
    } else {
      this.setWallpaper()
      this.interval = window.setInterval(() => this.setWallpaper(), 3500)
    }
  }

  setWallpaper = async () => {
    const auxIndex = this.state.images.findIndex((x: Image) => x.playing)
    const index = auxIndex !== -1 ? (auxIndex + 1) % this.state.images.length : 0
    await (window as any).wallpaper.set(this.state.images[index]['path'])

    this.setState({
      images: this.state.images.map((x: Image, i: number) => {
        x.playing = i === index
        return x
      })
    })
  }

  isPlaying = (): boolean => this.state.images.some((x: Image) => x.playing)
}