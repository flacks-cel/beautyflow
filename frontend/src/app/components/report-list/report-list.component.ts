import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule], // Se necessário
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {}
