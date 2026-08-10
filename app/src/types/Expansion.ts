export type ExpansionType = 'core' | 'expansion' | 'promo'

export interface Expansion {
  id: string
  name: string
  type: ExpansionType
  /** ID of the base expansion this KS variant supplements */
  parentId?: string
}
