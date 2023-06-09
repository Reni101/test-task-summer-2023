import { instance } from 'common/instance/instance'

export const catalogsApi = {
  getCatalogs() {
    return instance.get<CatalogType[]>('catalogues')
  }
}

export type CatalogType = {
  title: string
  title_trimmed: string
  key: number
}
