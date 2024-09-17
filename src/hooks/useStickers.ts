import { useContext } from "react"
import { StickersContext } from "../contexts/StickersContext"

export function useStickers(){
  const context = useContext(StickersContext)
  return context
}
