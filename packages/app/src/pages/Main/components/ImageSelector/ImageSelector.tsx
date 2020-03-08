import React, { Component, ChangeEvent } from "react"
import './ImageSelector.scss'
import { State, Image } from './types'
import Environment from '../../../../helpers/environment'

export default class ImageSelector extends Component<{}, State> {

    fileInput: HTMLInputElement | null = null

    interval: number = 0
    state = {
        images: []
    }

    render() {
        return (
            <div className='selector'>
                <div>
                    <label>Choose some images from disk:</label>
                </div>
                <div>
                    <input
                        ref={fileInput => this.fileInput = fileInput}
                        type='file'
                        accept="image/x-png,image/gif,image/jpeg"
                        multiple
                        onChange={this.onImageSelected} />

                    <div className='btn btn-one' onClick={this.triggerInputFile}>
                        <span>SELECT</span>
                    </div>

                    <div className='images'>
                        {
                            this.state.images.map((x: Image, i: number) =>
                                <div key={i} className={'image ' + (x.playing ? 'active' : '')} style={{
                                    backgroundImage: "url(" + x.data + ")",
                                }}>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    Environment.isElectron() && this.state.images.length ?
                        <div className={'btn btn-two ' + (this.isPlaying() ? 'active' : '')} onClick={this.toggleWallpapers}>
                            <span>{this.isPlaying() ? 'STOP' : 'PLAY'}</span>
                        </div> : null
                }
            </div>
        )
    }

    onImageSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files as any
        this.setState({
            images: []
        })

        for (let file of files) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = _ => this.setState((current: State) => ({
                ...current,
                images: [
                    ...this.state.images,
                    {
                        data: reader.result as string,
                        path: file.path as string,
                        playing: false
                    }
                ]
            }))
        }
    }

    triggerInputFile = () => this.fileInput?.click()

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
        const index = auxIndex != -1 ? (auxIndex + 1) % this.state.images.length : 0
        await (window as any).wallpaper.set(this.state.images[index]['path'])

        this.setState({
            images: this.state.images.map((x: Image, i: number) => {
                x.playing = i == index
                return x
            }) 
        })
    }

    isPlaying = (): boolean => this.state.images.some((x: Image) => x.playing)
}