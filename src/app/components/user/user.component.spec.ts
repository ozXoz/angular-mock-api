import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { MockApiService } from '../../services/mock-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ Import HTTP testing module
import { of, throwError } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockApiService: MockApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientTestingModule], // ✅ Provide HttpClientTestingModule
      providers: [MockApiService] // ✅ Provide the MockApiService
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(MockApiService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set user data correctly', () => {
    const mockUsers = [
      { user_type: 'standard', name: 'John Doe', email: 'john@example.com', permissions: ['read'] },
      { user_type: 'admin', name: 'Alice Johnson', email: 'alice@example.com', permissions: ['read', 'write'] }
    ];

    spyOn(mockApiService, 'getMockUser').and.returnValue(of(mockUsers));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.userData.length).toBe(2);
    expect(component.filteredUsers.length).toBe(2);
    expect(component.userData[0].name).toBe('John Doe');
  });

  it('should filter users correctly', () => {
    component.userData = [
      { user_type: 'standard', name: 'John Doe', email: 'john@example.com', permissions: ['read'] },
      { user_type: 'admin', name: 'Alice Johnson', email: 'alice@example.com', permissions: ['read', 'write'] }
    ];

    // Filter admin users
    component.filterUsers({ target: { value: 'admin' } } as unknown as Event);
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Alice Johnson');

    // Filter standard users
    component.filterUsers({ target: { value: 'standard' } } as unknown as Event);
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');

    // Show all users
    component.filterUsers({ target: { value: 'all' } } as unknown as Event);
    expect(component.filteredUsers.length).toBe(2);
  });

  it('should toggle user menu visibility', () => {
    expect(component.showUserMenu).toBeFalse();
    component.toggleUserMenu();
    expect(component.showUserMenu).toBeTrue();
    component.toggleUserMenu();
    expect(component.showUserMenu).toBeFalse();
  });

  it('should handle empty user data gracefully', () => {
    spyOn(mockApiService, 'getMockUser').and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.userData.length).toBe(0);
    expect(component.filteredUsers.length).toBe(0);
  });

  it('should log an error when the API fails', () => {
    spyOn(mockApiService, 'getMockUser').and.returnValue(throwError(() => new Error('API Error')));
    spyOn(console, 'error');

    component.ngOnInit();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('API Fetch Error:', jasmine.any(Error));
  });
});
// test