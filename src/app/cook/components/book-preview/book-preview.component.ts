import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookPreviewComponent implements OnInit {
  @Input() innerHtml: string;

  constructor() { }

  ngOnInit(): void {

  }

}
