import React, { FunctionComponent } from "react"
import './Header.scss'

export type Props = {
  title: string
}

export const Header: FunctionComponent<Props> = ({title}) =>
  <div className='header'>
    <h1>{title}</h1>
  </div>
