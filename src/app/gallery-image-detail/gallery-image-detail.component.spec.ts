import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryImageDetailComponent } from './gallery-image-detail.component';

describe('GalleryImageDetailComponent', () => {
  let component: GalleryImageDetailComponent;
  let fixture: ComponentFixture<GalleryImageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryImageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
