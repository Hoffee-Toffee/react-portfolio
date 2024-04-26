export interface SneezeData {
  count: number
  updated: string
  calendar: { [key: string]: CalendarEntry }
}

export interface CalendarEntry {
  count: number
  confirmed: boolean
}
