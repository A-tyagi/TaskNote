import {Component, OnInit, Input, ApplicationRef} from '@angular/core';
import {NotedataService} from '../notedata.service';
import {NoteData} from '../data/note-data';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})

export class NoteComponent implements OnInit {
  @Input() noteObj: NoteData;
  @Input() id: number;
  timeout: any = null;
  data: string;
  color: string;

  constructor(private dataService: NotedataService) {
  }

  // Initialize card with its text data
  ngOnInit(): void {
    console.log('Init NOTE COMPONENT', this.noteObj.textData, this.noteObj.id, this.noteObj.bgcolor);
    this.data = this.noteObj.textData;
    this.color = this.noteObj.bgcolor;
  }

  // An event is triggered when the user is done typing
  // Function then saves the new time and text data within the note object
  // and backs up to local storage
  save(note: any, event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function() {
      if (event.keyCode != 13) {
        $this.noteObj.textData = note;
      }
      $this.noteObj.textData = note;
      $this.noteObj.saveDate = new Date();
      $this.noteObj.bgcolor = $this.color;
      $this.dataService.saveNote($this.noteObj);
    }, 1300);
  }

  clearInput() {
    this.data = '';
  }
  changeColor(colorValue: any) {
    this.color = colorValue;
    this.noteObj.bgcolor = colorValue;
    this.dataService.saveNote(this.noteObj);
    // this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }
  // Calls delete within data service by passing the id to it.
  deleteNote() {
    console.log('CLOSING NOTE: ', this.id);
    this.dataService.delete(this.id);
  }

}
