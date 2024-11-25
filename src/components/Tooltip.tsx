import { FocusEvent, ReactNode, useState } from "react"

interface TooltipProps {
  text: string
  children: ReactNode
}

export default function Tooltip(props: TooltipProps) {
  const { children, text } = props
  const [isHovered, setHovered] = useState(false)
  function onMouseOver(){
    setHovered(true)
  }
  function onBlur(event: FocusEvent<HTMLDivElement>){
    event.stopPropagation()
    setHovered(false)
  }
  function onMouseLeave(){
    setHovered(false)
  }
  return (
    <div 
    className="tooltip"
    onBlur={onBlur}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
    >
      {isHovered && <div className="tooltip__content">
        {text}
      </div>}
      {children}
    </div>
  )
}
