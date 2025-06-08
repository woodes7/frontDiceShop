import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewFormComponent } from './productreview-form.component';

describe('ProductreviewFormComponent', () => {
  let component: ProductreviewFormComponent;
  let fixture: ComponentFixture<ProductreviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductreviewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductreviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
