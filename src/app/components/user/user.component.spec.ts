import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { MockApiService } from '../../services/mock-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ Import HTTP testing module

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockApiService: MockApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientTestingModule], // ✅ Provide HttpClientModule for MockApiService
      providers: [MockApiService] // ✅ Provide the service
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(MockApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users correctly', () => {
    component.userData = [
      { user_type: 'standard', name: 'John Doe', email: 'john@example.com', permissions: ['read'] },
      { user_type: 'admin', name: 'Alice Johnson', email: 'alice@example.com', permissions: ['read', 'write'] }
    ];

    component.filterUsers({ target: { value: 'admin' } } as unknown as Event);
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Alice Johnson');

    component.filterUsers({ target: { value: 'standard' } } as unknown as Event);
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');

    component.filterUsers({ target: { value: 'all' } } as unknown as Event);
    expect(component.filteredUsers.length).toBe(2);
  });

  it('should toggle user menu', () => {
    expect(component.showUserMenu).toBeFalse();
    component.toggleUserMenu();
    expect(component.showUserMenu).toBeTrue();
    component.toggleUserMenu();
    expect(component.showUserMenu).toBeFalse();
  });
});
