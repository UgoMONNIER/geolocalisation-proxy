import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireAdresseComponent } from './formulaire-adresse.component';

describe('FormulaireAdresseComponent', () => {
  let component: FormulaireAdresseComponent;
  let fixture: ComponentFixture<FormulaireAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireAdresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
