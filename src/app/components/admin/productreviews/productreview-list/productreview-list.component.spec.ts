import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewListComponent } from './productreview-list.component';

describe('ProductreviewListComponent', () => {
  let component: ProductreviewListComponent;
  let fixture: ComponentFixture<ProductreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductreviewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
