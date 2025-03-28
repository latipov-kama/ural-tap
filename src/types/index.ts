export type IdType = string | number

export interface Image {
  id: number
  url: string
  mdUrl?: string
  xsUrl?: string
  filename?: string
}

export interface SheetItem {
  title: string
  description: string
  image: Image
  reward?: number
  cost?: number
  price?: number
}