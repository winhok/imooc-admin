import request from '@/utils/request'

export interface TrendPoint {
  time: string
  amount: number
}

export interface ChartTrend {
  allAmount: number
  tadayAdded: number
  tadaySub: number
  tadayAmount: number
  monthAmountList: TrendPoint[]
  dailyCurve: TrendPoint[]
}

export interface CalendarAmount {
  date: string
  amount: number
}

export interface TimeAmount {
  timeStr: string
  income: number
  expense: number
  balance: number
}

export interface NamedValue {
  name: string
  value: number
}

export interface ChartMap {
  data: NamedValue[]
  geoCoordMap: Record<string, [number, number]>
}

export interface ChartRegion {
  id: number | string
  title: string
  receivable: number
  balance: number
}

export interface ChartSheetRow {
  [key: string]: string | number
  province: string
  city: string
  coverage: number | string
  receivable: number
  actual: number
  balance: number
}

interface ListEnvelope<T> {
  result: T[]
}

interface RegionsEnvelope {
  regions: ChartRegion[]
}

const normalizeList = <T>(data: T[] | ListEnvelope<T>) =>
  Array.isArray(data) ? data : data.result

export const getChartTrend = () =>
  request<ChartTrend>({
    url: '/chart/trend'
  })

export const getChartCalendar = async () =>
  normalizeList(
    await request<CalendarAmount[] | ListEnvelope<CalendarAmount>>({
      url: '/chart/calendar'
    })
  )

export const getChartTimeAmount = async (date: string) =>
  normalizeList(
    await request<TimeAmount[] | ListEnvelope<TimeAmount>>({
      url: '/chart/time/amount',
      params: { date }
    })
  )

export const getChartPie = () =>
  request<NamedValue[]>({
    url: '/chart/pie'
  })

export const getChartWordCloud = () =>
  request<NamedValue[]>({
    url: '/chart/wordcloud'
  })

export const getChartMap = () =>
  request<ChartMap>({
    url: '/chart/bmap'
  })

export const getChartRegions = async () => {
  const data = await request<ChartRegion[] | RegionsEnvelope>({
    url: '/chart/regions'
  })
  return Array.isArray(data) ? data : data.regions
}

export const getChartSheet = (regionId: ChartRegion['id']) =>
  request<ChartSheetRow[]>({
    url: '/chart/sheets',
    params: { regionId }
  })
