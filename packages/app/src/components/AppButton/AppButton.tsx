import React, { FunctionComponent } from 'react'
import './AppButton.scss'

export enum ButtonType {
  Default = 'default',
  Switch = 'switch'
}

export type Props = {
  text: string,
  type: ButtonType,
  isActive?: boolean,
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const AppButton: FunctionComponent<Props> = ({ text, type, isActive, onClick }) =>
  <div 
    className={'btn ' + type.toString() + (isActive ? ' active' : '')} 
    onClick={onClick}>
      <span>{text}</span>
  </div>
