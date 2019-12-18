import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainPageComponent } from './main-page/main-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [AppComponent, MainPageComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    bootstrap: [AppComponent],
    exports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AppModule {}
