import { LoaderService } from "@core/services/common/loader.service";
import { Component, inject } from "@angular/core";
import { AsyncPipe, NgIf } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatProgressSpinner],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
})
export class GlobalLoaderComponent {
  loaderService = inject(LoaderService);
}