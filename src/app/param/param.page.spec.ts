import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParamPage } from './param.page';

describe('ParamPage', () => {
  let component: ParamPage;
  let fixture: ComponentFixture<ParamPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ParamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
