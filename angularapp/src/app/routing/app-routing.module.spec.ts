import { ComponentFixture, TestBed, async, inject, TestBedStatic } from "@angular/core/testing";
import { Router } from "@angular/router";

import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "../app.component";
import { HomeComponent } from "../home/home.component";
import { Location } from "@angular/common";
import { AdminComponent } from "../admin/admin.component";
import { OrganizerComponent } from "../organizer/organizer.component";
import { LoginComponent } from "../login/login.component";
import { RegistrationComponent } from "../registration/registration.component";
import { ErrorComponent } from "../error/error.component";
// import { } from "./navbar/navbar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarComponent } from "../navbar/navbar.component";

describe("App Routing",() => {
    let router: Router;
    let fixture: ComponentFixture<AppComponent>;
    let location: Location

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(
                [
                  { path: '', component: HomeComponent },
                  { path: 'admin', component: AdminComponent },
                  { path: 'organizer', component: OrganizerComponent },
                  { path: 'login', component: LoginComponent },
                  { path: 'register', component: RegistrationComponent },
                  { path: 'error', component: ErrorComponent, data: { message: 'Oops! Something went wrong.' } },
                  { path: '**', redirectTo: '/error', pathMatch: 'full' },
                ]), HttpClientTestingModule
            ],
            declarations:[
                NavbarComponent,
                AppComponent,
                HomeComponent,
                AdminComponent,
                OrganizerComponent,
                LoginComponent,
                RegistrationComponent,
                ErrorComponent
            ]

        }).compileComponents();
    }));

    beforeEach(() => {
        router=TestBed.get(Router);
        location = TestBed.get(Location);
        router.initialNavigation();
        fixture = TestBed.createComponent(AppComponent)
    });

    // it('should navigate to home page by default', waitForAsync(()=>{
    //     fixture.detectChanges();
    //     fixture.whenStable().then(() => {
    //         expect(location.path()).toBe('/')
    //     })
    // }))

    fit('Week5_Day1_should route to home page by default', async () => {
      await router.initialNavigation();
      expect(location.path()).toBe('/');
    });

    fit('Week5_Day1_should route to admin page', async () => {
      await router.navigate(['/admin']);
      expect(location.path()).toBe('/admin');
    });

    fit('Week5_Day2_should route to organizer page', async () => {
      await router.navigate(['/organizer']);
      expect(location.path()).toBe('/organizer');
    });

    fit('Week5_Day1_should route to login page', async () => {
      await router.navigate(['/login']);
      expect(location.path()).toBe('/login');
    });

    fit('Week5_Day1_should route to register page', async () => {
      await router.navigate(['/register']);
      expect(location.path()).toBe('/register');
    });

    fit('Week5_Day2_should route to default path for invalid paths', async () => {
        await router.navigate(['/invalid']);
        fixture.detectChanges();
        expect(location.path()).toBe('/error');
      });

})
