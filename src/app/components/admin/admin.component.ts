import { Component } from '@angular/core';
import { DashboardService, User } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
users: User[] = [];
  selectedRole: string = '';
  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.dashboardService.getAllUsers(this.selectedRole).subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleActivation(user: User) {
    this.dashboardService.toggleUserActivation(user._id).subscribe(() => {
      user.isActive = !user.isActive;
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dashboardService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(u => u._id !== userId);
      });
    }
  }
}
