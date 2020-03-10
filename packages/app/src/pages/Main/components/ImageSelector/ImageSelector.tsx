import React, { Component, ChangeEvent } from "react"
import './ImageSelector.scss'
import { Image } from '../../../../models/Image'
import { AppButton, ButtonType } from '../../../../components/AppButton/AppButton'

export type Props = {
  onImageLoaded: (images: Image[]) => void
}

export default class ImageSelector extends Component<Props> {

  fileInput: HTMLInputElement | null = null

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
          <AppButton
            text='SELECT'
            type={ButtonType.Default}
            onClick={() => this.fileInput?.click()} />
        </div>
      </div>
    )
  }

  onImageSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files as any
    let images: Image[] = []

    for (let file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = _ => {
        images.push({
          data: reader.result as string,
          path: file.path as string,
          playing: false
        })
        this.props.onImageLoaded(images)
      }
    }
  }
}