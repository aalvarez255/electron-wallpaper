import React, { FunctionComponent } from 'react'
import { Image } from '../../../../models/Image'
import './ImageList.scss'

export type Props = {
  images: Image[]
}

export const ImageList: FunctionComponent<Props> = ({ images }) =>
  <div className='images'>
    {
      images.map((x: Image, i: number) =>
        <div
          key={i}
          className={'image ' + (x.playing ? 'active' : '')}
          style={{
            backgroundImage: "url(" + x.data + ")",
          }}
        />
      )
    }
  </div>

