import React from 'react'
import classname from '../../utils/classname'
import { StyleNamespace } from '../../variables'

import './Divider.css'

export type DividerProps = Omit<React.HTMLProps<HTMLDivElement>, 'size'> & {
  line?: boolean
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive'
}

export default function Divider({ line, size, ...props }: DividerProps) {
  return <div {...props} className={classname([
    StyleNamespace,
    'Divider',
    line && 'Divider--line',
    size && 'Divider--' + size,
    props.className
  ])} />
}