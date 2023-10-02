import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { loadScript } from './loadScript';
import pkg from './source.json';

declare module unlayer {
  function init(object);
  function createEditor(object);
  function loadDesign(object);
  function saveDesign(Function);
  function exportHtml(Function);
}

export interface UnlayerOptions {
  projectId?: number;
  tools?: object;
  appearance?: object;
  locale?: string;
  fonts?: object
}

let lastEditorId = 0;

@Component({
  selector: 'email-editor',
  template: `
    <div [id]="id" class="unlayer-editor" [style.min-height]="minHeight"></div>
  `,
  styleUrls: ['./email-editor.component.css'],
})
export class EmailEditorComponent implements OnInit, AfterViewInit {

  @Input() editorId: string;
  @Input() options: UnlayerOptions = {};
  @Input() projectId: number;
  @Input() tools: object;
  @Input() appearance: object;
  @Input() locale: string;
  @Input() id: string;

  @Input() minHeight = '500px';

  @Output() loaded = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() imageUpload = new EventEmitter();

  editor: any;

  constructor() {
    this.id = this.editorId || `editor-${++lastEditorId}`;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    loadScript(this.loadEditor.bind(this));
  }

  protected loadEditor() {
    const options: UnlayerOptions = this.options || {};

    if (this.projectId) {
      options.projectId = this.projectId;
    }

    if (this.tools) {
      options.tools = this.tools;
    }

    if (this.appearance) {
      options.appearance = this.appearance;
    }

    if (this.locale) {
      options.locale = this.locale;
    }

    this.editor = unlayer.createEditor({
      ...options,
      id: this.id,
      displayMode: 'email',
      source: {
        name: pkg.name,
        version: pkg.version,
      },
    });

    this.loaded.emit({});

    this.editor.addEventListener('editor:ready', () => {
      this.ready.emit({});
    });

    this.editor.addEventListener('design:updated', (data) => {
      var type = data.type; // body, row, content
      var item = data.item;
      var changes = data.changes;
      this.updated.emit({ type, item, changes });
    });

    this.editor.addEventListener('image:uploaded', (data) => {
      var image = data.image;
      var url = image.url;
      var width = image.width;
      var height = image.height;
      this.imageUpload.emit({ image, url, width, height });
    });

  }

  public loadDesign(data: object) {
    this.editor.loadDesign(data);
  }

  public saveDesign(cb: (data: object) => void) {
    this.editor.saveDesign(cb);
  }

  public exportHtml(cb: (data: object) => void) {
    this.editor.exportHtml(cb);
  }

}
