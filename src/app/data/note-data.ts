import { createOfflineCompileUrlResolver } from "@angular/compiler";

// Data type for holding note data
export class NoteData {
  id: number;
  saveDate: Date;
  textData: string;
  bgcolor: string;
  // Optional paramteres for id, saveDate, textData
  constructor(id?: number, saveDate?: Date, textData?: string, bgcolor?: string) {
    console.log("Note Data Constructor", id, saveDate, textData);
    if (!saveDate) {
      saveDate = new Date();
    }
    if (!id){
      id = saveDate.getTime();
    }
    if (!textData) {
      textData = 'Type Something!';
    }
    if (!bgcolor) {
      bgcolor = '#ffffff';
    }
    this.id = id;
    this.saveDate = saveDate;
    this.textData = textData;
    this.bgcolor = bgcolor;
  }

  // Returns Human readable date format
  dateString(): string {
    return this.saveDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
