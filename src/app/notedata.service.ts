import { Injectable } from '@angular/core';
import { NoteData } from './data/note-data';

@Injectable({
  providedIn: 'root',
})
export class NotedataService {
  public static allNotesMap = new Map();

  // At the start of the service, load data from local storage and parse it into allNotesMap
  // Re cast note objects after reading from local storage
  constructor() {
    console.log('Constructor NotedataService');

    let savedDataMap = new Map(JSON.parse(localStorage.getItem('noteDataMap')));
    console.log('Saved DATA:  ', savedDataMap);

    for (let [key, value] of savedDataMap) {
      console.log('Key val from saved', key, value);
      NotedataService.allNotesMap.set(
        key,
        new NoteData(
          value['id'],
          new Date(value['saveDate']),
          value['textData'],
          value['bgcolor']
        )
      );
    }

    console.log('ALL LOADED DATA:  ', NotedataService.allNotesMap);
  }

  // Saves the noteObj within the service and to local storage
  public saveNote(noteObj: NoteData) {
    console.log(
      'NotedataService saveNote',
      noteObj.textData,
      noteObj.id,
      noteObj.saveDate,
      noteObj.bgcolor
    );
    this.saveToLocalStorate();
  }

  // Converts the map into an array
  // in order to save to local storage
  private saveToLocalStorate() {
    let saveStr: string = JSON.stringify(
      Array.from(NotedataService.allNotesMap)
    );
    console.log('SAVING...', saveStr);
    localStorage.setItem('noteDataMap', saveStr);
  }

  // Creates new NoteData object when the user clicks the new note button on the front end
  // Adds new note to the allNotesMap
  public newNote(noteData: string) {
    var noteObj = new NoteData();
    console.log('NotedataService newNote - ', noteData);
    NotedataService.allNotesMap.set(noteObj.id, noteObj);
  }

  // Deletes the specified note from the map and local storage
  public delete(noteId: number) {
    console.log('Deleting note id:', noteId);
    NotedataService.allNotesMap.delete(noteId);
    this.saveToLocalStorate();
  }
}
