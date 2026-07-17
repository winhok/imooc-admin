import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface ExportJsonToExcelOptions {
  header: string[]
  data: Array<Array<unknown>>
  filename?: string
  autoWidth?: boolean
  bookType?: XLSX.BookType
}

function getCellTextLength(value: unknown) {
  if (value === null || value === undefined) return 10
  return String(value).length
}

function applyAutoWidth(
  worksheet: XLSX.WorkSheet,
  rows: Array<Array<unknown>>
) {
  const columnCount = rows[0]?.length ?? 0
  worksheet['!cols'] = Array.from({ length: columnCount }, (_, columnIndex) => {
    const maxLength = rows.reduce((max, row) => {
      return Math.max(max, getCellTextLength(row[columnIndex]))
    }, 10)

    return {
      wch: maxLength + 2
    }
  })
}

export function export_json_to_excel({
  header,
  data,
  filename = 'excel-list',
  autoWidth = true,
  bookType = 'xlsx'
}: ExportJsonToExcelOptions) {
  const worksheetRows = [header, ...data]
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetRows)

  if (autoWidth) {
    applyAutoWidth(worksheet, worksheetRows)
  }

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  const excelBuffer = XLSX.write(workbook, {
    bookType,
    bookSST: false,
    type: 'array'
  }) as ArrayBuffer

  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  })

  saveAs(blob, `${filename}.${bookType}`)
}
