import { Component, OnInit, ViewChild } from '@angular/core';

import sample from './sample.json';
import {
  EmailEditorComponent,
  UnlayerOptions
} from 'projects/email-editor/src/public-api';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent implements OnInit {
  options: UnlayerOptions = {
    locale: 'es-ES',
    appearance: {
      theme: 'dark',
      panels: {
        tools: {
          dock: 'left',
          collapsible: true
        }
      },
    },
    fonts: {
      showDefaultFonts: false,
      customFonts: [
        {
          label: "Andale Mono",
          value: "andale mono,times"
        },
        {
          label: "Arial",
          value: "arial,helvetica,sans-serif"
        },
        {
          label: "Arial Black",
          value: "arial black,avant garde,arial"
        },
        {
          label: "Book Antiqua",
          value: "book antiqua,palatino"
        },
        {
          label: "Comic Sans MS",
          value: "comic sans ms,sans-serif"
        },
        {
          label: "Courier New",
          value: "courier new,courier"
        },
        {
          label: "Georgia",
          value: "georgia,palatino"
        },
        {
          label: "Helvetica",
          value: "helvetica,sans-serif"
        },
        {
          label: "Impact",
          value: "impact,chicago"
        },
        {
          label: "Symbol",
          value: "symbol"
        },
        {
          label: "Tahoma",
          value: "tahoma,arial,helvetica,sans-serif"
        },
        {
          label: "Terminal",
          value: "terminal,monaco"
        },
        {
          label: "Times New Roman",
          value: "times new roman,times"
        },
        {
          label: "Trebuchet MS",
          value: "trebuchet ms,geneva"
        },
        {
          label: "Verdana",
          value: "verdana,geneva"
        },
        {
          label: "Lobster Two",
          value: "'Lobster Two',cursive",
          url: "https://fonts.googleapis.com/css?family=Lobster+Two:400,700"
        },
        {
          label: "Playfair Display",
          value: "'Playfair Display',serif",
          url: "https://fonts.googleapis.com/css?family=Playfair+Display:400,700"
        },
        {
          label: "Rubik",
          value: "'Rubik',sans-serif",
          url: "https://fonts.googleapis.com/css?family=Rubik:400,700"
        },
        {
          label: "Source Sans Pro",
          value: "'Source Sans Pro',sans-serif",
          url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
        },
        {
          label: "Open Sans",
          value: "'Open Sans',sans-serif",
          url: "https://fonts.googleapis.com/css?family=Open+Sans:400,700"
        },
        {
          label: "Crimson Text",
          value: "'Crimson Text',serif",
          url: "https://fonts.googleapis.com/css?family=Crimson+Text:400,700"
        },
        {
          label: "Montserrat",
          value: "'Montserrat',sans-serif",
          url: "https://fonts.googleapis.com/css?family=Montserrat:400,700"
        },
        {
          label: "Old Standard TT",
          value: "'Old Standard TT',serif",
          url: "https://fonts.googleapis.com/css?family=Old+Standard+TT:400,700"
        },
        {
          label: "Lato",
          value: "'Lato',sans-serif",
          url: "https://fonts.googleapis.com/css?family=Lato:400,700"
        },
        {
          label: "Raleway",
          value: "'Raleway',sans-serif",
          url: "https://fonts.googleapis.com/css?family=Raleway:400,700"
        },
        {
          label: "Cabin",
          value: "'Cabin',sans-serif",
          url: "https://fonts.googleapis.com/css?family=Cabin:400,700"
        },
        {
          label: "Pacifico",
          value: "'Pacifico',cursive",
          url: "https://fonts.googleapis.com/css?family=Pacifico"
        }
      ]
    }
  };

  isLoaded: boolean = false;
  currentJson: any;
  currentHTML: any;

  constructor() { }

  ngOnInit() { }

  @ViewChild('editor')
  private emailEditor: EmailEditorComponent;

  editorLoaded(event) {
    console.log('editorLoaded');
    this.isLoaded = true;
  }

  editorReady(event) {
    console.log('editorReady');
  }

  saveDesign() {
    this.emailEditor.editor.saveDesign(this.saveJsonFile);
  }

  setCurrentConfig = (data: any): void => {
    this.currentJson = data;
    this.currentHTML = data.html;
  }

  exportHtml() {
    this.emailEditor.editor.exportHtml(this.saveHtmlFile);
  }

  saveJsonFile = (data: any) => {
    var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = `${new Date().getTime()}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  saveHtmlFile = (data: any) => {
    var blob = new Blob([data.html], { type: 'text/html' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = `${new Date().getTime()}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  loadDesign() {
    this.emailEditor.editor.loadDesign(sample);
  }

  updated(data: any) {
    this.emailEditor.editor.saveDesign(this.setCurrentConfig);
  }

  imageUpload(data: any) {
    console.log(data);
  }
  fileToUpload: File | null = null;

  handleFileInput(event: any) {
    const files = event.target.files
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = (result: any) => {
      this.emailEditor.editor.loadDesign(JSON.parse(result.target.result));
    };

    // Read in the image file as a data URL.
    reader.readAsText(this.fileToUpload);
  }

}
