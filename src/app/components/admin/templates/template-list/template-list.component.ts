import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-list',
  standalone: false,
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css'
})
export class TemplateListComponent {
@Input() title: string = '';
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() onAdd: () => void = () => {};
  @Input() onEdit: (id: number) => void = () => {};
  @Input() onDelete: (id: number) => void = () => {};
}
