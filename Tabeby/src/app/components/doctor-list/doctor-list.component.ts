import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent {
  @Input() doctors: any[] = [];
  sortType: string = 'best';

  get sortedDoctors() {
    let docs = [...this.doctors];
    switch (this.sortType) {
      case 'top':
        return docs.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'low':
        return docs.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'high':
        return docs.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'wait':
        return docs.sort((a, b) => {
          // محاولة استخراج الدقائق من waitingTime
          const getMinutes = (w: any) => {
            if (!w) return 0;
            if (typeof w === 'number') return w;
            let m = 0;
            const match = w.match(/(\d+)\s*Hour/);
            if (match) m += parseInt(match[1], 10) * 60;
            const minMatch = w.match(/(\d+)\s*Minute/);
            if (minMatch) m += parseInt(minMatch[1], 10);
            return m;
          };
          return getMinutes(a.waitingTime) - getMinutes(b.waitingTime);
        });
      default:
        return docs;
    }
  }

  onSortChange(type: string) {
    this.sortType = type;
  }
}
