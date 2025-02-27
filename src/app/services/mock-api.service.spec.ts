import { TestBed } from '@angular/core/testing';
import { MockApiService } from './mock-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MockApiService', () => {
  let service: MockApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Use testing module instead of HttpClientModule
      providers: [MockApiService]
    });

    service = TestBed.inject(MockApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch mock user data', () => {
    const dummyUser = { id: 1, name: 'John Doe' };

    service.getMockUser().subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('assets/mock-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
