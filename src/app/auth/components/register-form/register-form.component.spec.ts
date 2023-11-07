// import {
//   ComponentFixture,
//   fakeAsync,
//   TestBed,
//   tick,
// } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';

// import { RegisterFormComponent } from './register-form.component';
// import { UsersService } from './../../../services/user.service';
// import { generateOneUser } from './../../../models/user.mock';
// import {
//   asyncData,
//   getText,
//   mockObservable,
//   query,
//   queryById,
//   setInputValue,
//   setCheckboxValue,
//   clickEvent,
//   clickElement,
//   asyncError,
// } from 'src/testing';

// fdescribe('RegisterFormComponent', () => {
//   let component: RegisterFormComponent;
//   let fixture: ComponentFixture<RegisterFormComponent>;
//   let userService: jest.SpyObj<UsersService>;
//   const userServiceJest: Partial<UsersService> = {
//     create: jest.fn(),
//     isAvailableByEmail: jest.fn(),
//   };

//   beforeEach(async () => {
//     const spy = jest.createSpyObj('UsersService', [
//       'create',
//       'isAvailableByEmail',
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [RegisterFormComponent],
//       imports: [ReactiveFormsModule],
//       providers: [{ provide: UsersService, useValue: spy }],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(RegisterFormComponent);
//     userService = TestBed.inject(UsersService) as jest.SpyObj<UsersService>;
//     component = fixture.componentInstance;
//     userService.isAvailableByEmail.and.returnValue(
//       mockObservable({ isAvailable: true })
//     );
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should the emailField be invalid', () => {
//     component.emailField?.setValue('esto no es un correo');
//     expect(component.emailField?.invalid)
//       .withContext('wrong email')
//       .toBeTruthy();

//     component.emailField?.setValue('');
//     expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
//   });

//   it('should the passwordField be invalid', () => {
//     component.passwordField?.setValue('');
//     expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

//     component.passwordField?.setValue('12345');
//     expect(component.passwordField?.invalid).withContext('12345').toBeTruthy();

//     component.passwordField?.setValue('asasaasasdsdsd');
//     expect(component.passwordField?.invalid)
//       .withContext('without number')
//       .toBeTruthy();

//     component.passwordField?.setValue('asas1aasasdsdsd');
//     expect(component.passwordField?.valid).withContext('rigth').toBeTruthy();
//   });

//   it('should the form be invalid', () => {
//     component.form.patchValue({
//       name: 'Nico',
//       email: 'nico@gmil.com',
//       password: '12121212',
//       confirPassword: '12121212',
//       checkTerms: false,
//     });
//     expect(component.form.invalid).toBeTruthy();
//   });

//   it('should the emailField be invalid from UI', () => {
//     const inputDe = query(fixture, 'input#email');
//     const inputEl: HTMLInputElement = inputDe.nativeElement;

//     inputEl.value = 'esto no es un correo';
//     inputEl.dispatchEvent(new Event('input'));
//     inputEl.dispatchEvent(new Event('blur'));
//     fixture.detectChanges();
//     expect(component.emailField?.invalid)
//       .withContext('wrong email')
//       .toBeTruthy();

//     const textError = getText(fixture, 'emailField-email');
//     expect(textError).toContain("It's not a email");
//   });

//   it('should the emailField be invalid from UI with setInputValue', () => {
//     setInputValue(fixture, 'input#email', 'esto no es un correo');
//     fixture.detectChanges();
//     expect(component.emailField?.invalid)
//       .withContext('wrong email')
//       .toBeTruthy();

//     const textError = getText(fixture, 'emailField-email');
//     expect(textError).toContain("It's not a email");
//   });

//   fit('should send the form successfully', () => {
//     component.form.patchValue({
//       name: 'Nico',
//       email: 'nico@gmil.com',
//       password: '12121212',
//       confirmPassword: '12121212',
//       checkTerms: true,
//     });
//     const mockUser = generateOneUser();
//     //userService.create.and.returnValue(mockObservable(mockUser));
//     //userServiceJest.create.mockImplementation(mockObservable(mockUser));
//     userService.create
//     // Act
//     component.register(new Event('submit'));
//     expect(component.form.valid).toBeTruthy();
//     expect(userService.create).toHaveBeenCalled();
//   });

//   it('should send the form successfully from UI', fakeAsync(() => {
//     setInputValue(fixture, 'input#name', 'Nico');
//     setInputValue(fixture, 'input#email', 'nico@gmil.com');
//     setInputValue(fixture, 'input#password', '12121212');
//     setInputValue(fixture, 'input#confirmPassword', '12121212');
//     setCheckboxValue(fixture, 'input#terms', true);
//     const mockUser = generateOneUser();
//     userService.create.and.returnValue(asyncData(mockUser));
//     // Act
//     // component.register(new Event('submit'));
//     clickElement(fixture, 'btn-submit', true);
//     // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
//     fixture.detectChanges();
//     expect(component.status).toEqual('loading');

//     tick(); // exec pending tasks
//     fixture.detectChanges();
//     expect(component.status).toEqual('success');
//     expect(component.form.valid).toBeTruthy();
//     expect(userService.create).toHaveBeenCalled();
//   }));

//   it('should send the form successfully and "loading" => "success"', fakeAsync(() => {
//     component.form.patchValue({
//       name: 'Nico',
//       email: 'nico@gmil.com',
//       password: '12121212',
//       confirmPassword: '12121212',
//       checkTerms: true,
//     });
//     const mockUser = generateOneUser();
//     userService.create.and.returnValue(asyncData(mockUser));
//     // Act
//     component.register(new Event('submit'));
//     expect(component.status).toEqual('loading');

//     tick(); // exec pending tasks
//     fixture.detectChanges();
//     expect(component.status).toEqual('success');
//     expect(component.form.valid).toBeTruthy();
//     expect(userService.create).toHaveBeenCalled();
//   }));

//   it('should send the form from UI but with error in the service', fakeAsync(() => {
//     setInputValue(fixture, 'input#name', 'Nico');
//     setInputValue(fixture, 'input#email', 'nico@gmil.com');
//     setInputValue(fixture, 'input#password', '12121212');
//     setInputValue(fixture, 'input#confirmPassword', '12121212');
//     setCheckboxValue(fixture, 'input#terms', true);
//     const mockUser = generateOneUser();
//     userService.create.and.returnValue(asyncError(mockUser));
//     // Act
//     // component.register(new Event('submit'));
//     clickElement(fixture, 'btn-submit', true);
//     // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
//     fixture.detectChanges();
//     expect(component.status).toEqual('loading');

//     tick(); // exec pending tasks
//     fixture.detectChanges();
//     expect(component.status).toEqual('error');
//     expect(component.form.valid).toBeTruthy();
//     expect(userService.create).toHaveBeenCalled();
//   }));

//   it('should show error with an email invalid', () => {
//     // Arrange
//     userService.isAvailableByEmail.and.returnValue(
//       mockObservable({ isAvailable: false })
//     );
//     setInputValue(fixture, 'input#email', 'nico@mail.com');
//     // Act
//     fixture.detectChanges();
//     // Assert
//     expect(component.emailField?.invalid).toBeTrue();
//     expect(userService.isAvailableByEmail).toHaveBeenCalledWith(
//       'nico@mail.com'
//     );
//     // reto
//     const errorMsg = getText(fixture, 'emailField-not-available');
//     expect(errorMsg).toContain('The email is already registered');
//   });
// });

import { UsersService } from './../../../services/user.service';
import { of } from 'rxjs';
import { CreateUserDTO } from 'src/app/models/user.model';

fdescribe('UsersService', () => {
  let userService: UsersService;
  let httpClient: { post: jest.Mock };

  beforeEach(() => {
    httpClient = {
      post: jest.fn(), // Mock the HttpClient's post method
    };

    userService = new UsersService(httpClient as any); // Cast httpClient to any
  });

  it('should create a user', () => {
    const dto: CreateUserDTO = {
      name: 'Nico',
      email: 'nico@gmil.com',
      password: '12121212',
      role: 'customer',
    };
    const response = {
      /* your expected response data */
    };

    // Mock the post method to return an observable with the response
    httpClient.post.mockReturnValue(of(response));

    userService.create(dto).subscribe((data) => {
      expect(data).toEqual(response); // Check if the response matches what you expect
    });

    // Verify that the post method was called with the correct URL and data
    expect(httpClient.post).toHaveBeenCalledWith(userService.apiUrl, dto);
  });
});
