import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  standalone: false,
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent {
 @Input() form!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() onSubmit: () => void = () => {};
}
