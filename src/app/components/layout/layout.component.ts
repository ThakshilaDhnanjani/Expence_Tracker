import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,  FormsModule, RouterOutlet ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
  searchQuery: string = '';

  constructor(private router: Router) {}

  // Function to handle search button click
  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Example: Redirect to a search results page with query as a parameter
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  // Navigate to specific route
  navigateTo(path: string): void {
    console.log(`Navigating to: ${path}`);
    this.router.navigateByUrl(path);
  }
}
