create with 
```cmd
lambo my-project-name
```

```php
app/Providers/AppServiceProvider

use App\Models\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
 
/**
 * Bootstrap any application services.
 */
public function boot(): void
{
    Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
}
```

to see the mail template directory go to ``resources/views/vendor/mail`` directory or run the following 
command and check the below directory.
```php
php artisan vendor:publish --tag=laravel-notifications
php artisan vendor:publish --tag=laravel-mail
```

to send the email verification 
Install via composer
```php
composer require ichtrojan/laravel-otp
```
Run Migrations

```php
php artisan migrate
```

then go to ``config/app.php`` and add this
```php
```

let create the EmailVerificationNotification and activate the laravel/Otp library
```php
php artisan make:notification EmailVerificationNotification
```
create EmailVerificationController
```php
php artisan make:controller Auth/EmailVerificationController
```
and create the EmailVerificationRequest
```php
php artisan make:request Auth/EmailVerificationRequest
```

create the ResetPasswordVerificationNotification
```php
php artisan make:notification ResetPasswordVerificationNotification
```

create the ResetPasswordController and the ForgotPasswordController
then we will reset the password with the otp code

```php
php artisan make:controller Auth/ResetPasswordController
php artisan make:controller Auth/ForgetPasswordController
```

ForgotPasswordController will send the reset email then the
ResetPasswordController will reset the password (update the user password)

**Image manipulation with php**
https://image.intervention.io/v3

Installation
```php
composer require intervention/image
```
