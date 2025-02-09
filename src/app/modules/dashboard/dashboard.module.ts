import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsModule } from './pages/students/students.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HelpersModule } from '../../helpers/helpers.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    NavMenuComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule, // Para diálogos
    MatFormFieldModule, // Para mat-form-field
    MatInputModule, // Para matInput
    StudentsModule,
    HelpersModule
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
