import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimal zone.js configuration
    provideZoneChangeDetection({ 
      eventCoalescing: true,
      runCoalescing: true
    }),
    
    // Router configuration
    provideRouter(routes, 
      withPreloading(PreloadAllModules)
    ),
    
    // HTTP client configuration
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        errorInterceptor
      ])
    ),
    
    // Animations support
    provideAnimations(),
    provideAnimationsAsync(),
  ]
};