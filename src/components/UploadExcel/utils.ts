import * as XLSX from 'xlsx'
import type { WorkSheet } from 'xlsx'

export const getHeaderRow = (sheet: WorkSheet) => {
  const sheetRef = sheet['!ref']
  if (!sheetRef) return []

  const headers: string[] = []
  const range = XLSX.utils.decode_range(sheetRef)
  const rowIndex = range.s.r

  for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex += 1) {
    const cell = sheet[XLSX.utils.encode_cell({ c: colIndex, r: rowIndex })]
    const header =
      cell && cell.t ? XLSX.utils.format_cell(cell) : `UNKNOWN ${colIndex}`
    headers.push(header)
  }

  return headers
}

export const isExcel = (file: File) => {
  return /\.(xlsx|xls|csv)$/i.test(file.name)
}
