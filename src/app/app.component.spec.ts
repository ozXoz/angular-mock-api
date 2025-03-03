import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ Use for testing HttpClient requests
import { MockApiService } from './services/mock-api.service'; // ✅ Import service

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ], // ✅ Use HttpClientTestingModule
      declarations: [ AppComponent, UserComponent ],
      providers: [ MockApiService ] // ✅ Provide MockApiService
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mock-api-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mock-api-project');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('3D Model Viewer');
  });
});
