import { createContext } from "react"
import type { SlowConnectionType } from "./SlowConnectionType"

export const SlowConnectionContext = createContext<SlowConnectionType | undefined>(undefined)