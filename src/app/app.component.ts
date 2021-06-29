import { Component } from '@angular/core';
import { NoteComponent } from './note/note.component';
import { NotedataService } from './notedata.service';
import { NoteData } from './data/note-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tasknote';
  myNotesMap = NotedataService.allNotesMap;
  searchResultMap = new Map();
  textdata: string;
  searchString: string;
  timeout: any = null;

  constructor(public dataService: NotedataService) {
    console.log('Constructor AppComponent');
  }

  ngOnInit() {
    console.log('Init AppComponent');
  }

  // When + button is clicked calls data services new note function
  new() {
    console.log('Component NEW');
    this.dataService.newNote('Hit Enter to Save...');
  }

  // An event is triggered when the user is done typing
  // Function then creates a new searchResultMap of only the note objects
  // that contain the matching searchStr.
  // Finally sets display results as searchResultMap to update screen
  search(searchStr: string, event: any) {
    console.log('searching for: ', this.searchString);
    let newSearchString = this.searchString.toLowerCase();
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      $this.searchResultMap = new Map();
      if (newSearchString && newSearchString !== '') {
        for (let [key, value] of NotedataService.allNotesMap) {
          if (value['textData'].toLowerCase().includes(newSearchString)) {
            $this.searchResultMap.set(key, value);
          }
        }
        console.log('searched for: ', newSearchString);
        console.log($this.searchResultMap);
        $this.myNotesMap = $this.searchResultMap;
      } else {
        $this.searchResultMap = new Map();
        $this.myNotesMap = NotedataService.allNotesMap;
      }
    }, 300);
  }

}
