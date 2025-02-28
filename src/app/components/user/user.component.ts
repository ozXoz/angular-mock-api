import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../../services/mock-api.service';

interface User {
  name: string;
  email: string;
  user_type: string;
  permissions: string[];
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: User[] = [];
  filteredUsers: User[] = [];
  showUserMenu = false;

  constructor(private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.mockApiService.getMockUser().subscribe({
      next: (data: User[]) => {
        if (Array.isArray(data) && data.length > 0) {
          this.userData = data;
          this.filteredUsers = data;
        } else {
          this.userData = [];
        }
      },
      error: (err) => {
        console.error("API Fetch Error:", err);
      }
    });
  }

  filterUsers(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)?.value;
    this.filteredUsers = selectedValue === 'all' ? this.userData : this.userData.filter(user => user.user_type === selectedValue);
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }


  
}

