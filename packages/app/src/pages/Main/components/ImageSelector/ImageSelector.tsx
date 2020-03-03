import React, { Component, ChangeEvent } from "react"
import './ImageSelector.scss'

export default class ImageSelector extends Component {
    fileInput: HTMLInputElement | null = null

    interval: number = 0
    state = {
        playing: false,
        images: [],
        selectedIndex: null
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
                            this.state.images.map(x =>
                                <div className='image' style={{
                                    backgroundImage: "url(" + x + ")",
                                }}>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    this.state.images.length ?
                        <div className={'btn btn-two ' + (this.state.playing ? 'active' : '')} onClick={this.toggleWallpapers}>
                            <span>{this.state.playing ? 'STOP' : 'PLAY'}</span>
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
            reader.onloadend = _ => this.setState({
                images: [...this.state.images, reader.result]
            })
        }
    }

    triggerInputFile = () => this.fileInput?.click()
    toggleWallpapers = () => {
        this.setState((state: any) => ({
            playing: !state.playing
        }), () => {
            if (this.state.playing) {
                this.interval = window.setInterval(() => this.setWallpaper(), 3000)
            }
            else {
                clearInterval(this.interval)
            }
        })

    }

    setWallpaper = () => {
        console.log('ss')
    }
}