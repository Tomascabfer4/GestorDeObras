import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarParteDeObraComponent } from './modificar-parte-de-obra.component';

describe('ModificarParteDeObraComponent', () => {
  let component: ModificarParteDeObraComponent;
  let fixture: ComponentFixture<ModificarParteDeObraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarParteDeObraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarParteDeObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
