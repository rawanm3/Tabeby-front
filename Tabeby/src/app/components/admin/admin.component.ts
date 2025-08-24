import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService, User } from 'src/app/services/dashboard.service';
declare var bootstrap: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  users: User[] = [];
  pendingDoctors: any[] = [];
  pendingNurses: any[] = [];
  selectedRole: string = '';
  loading = false;
  loadingPending = false;
  roleCounts: any = {};
  selectedUser: User | null = null;
  verificationData = {
    userId: '',
    role: '',
    status: 'approved',
    rejectionReason: ''
  };
  router: any;

  constructor(private dashboardService: DashboardService , private authService:AuthService) {}

  ngOnInit() {
    this.fetchUsers();
    this.fetchRoleCounts();
  }
  
  logout() {
    this.authService.logout();
     this.router.navigate(['/contact-us']);
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

  fetchPendingUsers() {
    this.loadingPending = true;
    this.dashboardService.getPendingUsers().subscribe({
      next: (res) => {
        this.pendingDoctors = res.pendingDoctors || [];
        this.pendingNurses = res.pendingNurses || [];
        this.loadingPending = false;
      },
      error: () => {
        this.loadingPending = false;
      }
    });
  }

  fetchRoleCounts() {
    this.dashboardService.getUserCountsByRole().subscribe({
      next: (res) => {
        this.roleCounts = res;
      },
      error: (error) => {
        console.error('Error fetching role counts:', error);
      }
    });
  }

  viewUserDetails(userId: string) {
    this.dashboardService.getUserDetails(userId).subscribe({
      next: (res) => {
        this.selectedUser = res.user;
        const modal = new bootstrap.Modal(document.getElementById('userDetailsModal'));
        modal.show();
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  openVerificationModal(userId: string, role: string) {
    this.verificationData = {
      userId,
      role,
      status: 'approved',
      rejectionReason: ''
    };
    const modal = new bootstrap.Modal(document.getElementById('verificationModal'));
    modal.show();
  }

  onVerificationStatusChange() {
    // This method is called when the verification status changes
    // We don't need to do anything special here as the template handles visibility
  }

  saveVerification() {
    const data: any = { status: this.verificationData.status };
    if (this.verificationData.status === 'rejected') {
      data.rejectionReason = this.verificationData.rejectionReason;
    }

    this.dashboardService.updateVerificationStatus(
      this.verificationData.userId, 
      this.verificationData.role, 
      data
    ).subscribe({
      next: () => {
        alert(`User verification status updated to ${this.verificationData.status}`);
        this.fetchPendingUsers();
        this.fetchUsers();
        const modal = bootstrap.Modal.getInstance(document.getElementById('verificationModal'));
        modal.hide();
      },
      error: (error) => {
        console.error('Error updating verification status:', error);
        alert('Error updating verification status');
      }
    });
  }

  toggleActivation(user: User) {
    this.dashboardService.toggleUserActivation(user._id).subscribe({
      next: () => {
        user.isActive = !user.isActive;
      },
      error: (error) => {
        console.error('Error toggling user activation:', error);
        alert('Error toggling user activation');
      }
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dashboardService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(u => u._id !== userId);
          this.fetchRoleCounts();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Error deleting user');
        }
      });
    }
  }
}
