import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { MockProvider } from 'ng-mocks';




describe('AuthService', () => {//agrupa casos de prueba por caracteristicas
  let authService : AuthService;
  let router: Router;

  beforeEach( () => {
     TestBed.configureTestingModule({
      providers:[AuthService, MockProvider(Router)],
    }).compileComponents();
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)

  });

    it('Auth service se debe instaciar',()=>{
        expect(authService).toBeTruthy()
    })

    it('se debe establecer el usuario autenticado, debe establecer el access token en localStorage, debe redirigir al home', () => {
        const spyOnNavigate = spyOn(router, 'navigate');
    
        authService.login({
          email: 'admin@email.com',
          password: '123456',
        });
    
        authService.authUser$.subscribe({
          next: (authUser) => {
            expect(authUser).toBeTruthy();
            expect(localStorage.getItem('access_token')).toBeTruthy();
            expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
          },
        });
      });

})