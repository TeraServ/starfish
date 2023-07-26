import { Injectable } from '@angular/core';
import { read, utils, writeFile } from 'xlsx';

@Injectable()
export class CSVHandlerService {
  private datasFromCSV: any[] = [];


  public importCSVData($event: any):any[] {
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;
            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                this.datasFromCSV = rows;
                console.log("From Service1",this.datasFromCSV);
            }
        }
        return this.datasFromCSV
        reader.readAsArrayBuffer(file);
    }
    return this.datasFromCSV;
  }
    public exportCSV(csvHeaders:string[][], dataFromCSV:any[], fileName:string){
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, csvHeaders);
      utils.sheet_add_json(ws, this.datasFromCSV, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Report');
      writeFile(wb, fileName+'.csv');
}
}


