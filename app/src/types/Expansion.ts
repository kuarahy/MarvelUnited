export type ExpansionType = 'core' | 'expansion' | 'promo'

export interface Expansion {
  id: string
  name: string
  type: ExpansionType
}
