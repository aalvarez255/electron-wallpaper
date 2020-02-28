import React, { Component, ChangeEvent } from "react"
import './ImageSelector.scss'

export default class ImageSelector extends Component {
  fileInput: HTMLInputElement | null = null

  state = {
    images: []
  }

  render() {
    return (
      <div className='selector'>
        <div>
          <label>1. Choose some images from disk:</label>
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
                <div className='image'>
                  <img src={x} alt='img' />
                </div>                
              )
            }
          </div>
        </div>
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
      reader.onloadend = _ =>  this.setState({
        images: [...this.state.images, reader.result]
      })
    }
  }

  triggerInputFile = () => this.fileInput?.click()

}