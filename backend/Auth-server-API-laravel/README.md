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

## Voici quelques commandes utiles :
1. Mise à jour du cache des routes :
   Utilisez la commande suivante pour effacer et réexécuter la mise en cache des routes :
```bash
php artisan route:cache
```
2. Mise à jour du cache des configurations :
   Pour effacer le cache des configurations, utilisez la commande suivante
```bash
php artisan config:cache
```
3. Effacer le cache des vues :
   Utilisez la commande suivante pour effacer le cache des vues compilées :
```bash
php artisan view:clear
```
Si votre application utilise la mise en cache des vues, vous pouvez également utiliser la commande suivante pour la mettre à jour :
```bash
php artisan view:cache
```
4. Mise à jour du cache de l'application entière :
   Vous pouvez utiliser la commande suivante pour effacer tous les caches de votre application :
```bash
php artisan cache:clear
```
5. Mise à jour du cache des classes :
   Laravel utilise également un cache des classes pour améliorer les performances. Pour effacer ce cache, utilisez la commande :
```bash
php artisan clear-compiled
```
Après avoir effacé le cache des classes, vous pouvez le reconstruire en utilisant la commande :
```bash
php artisan optimize
```

Install websocket in laravel 10
```bash
composer require beyondcode/laravel-websockets -w
```
if not working
1. Effacer le cache de Composer :
```bash
composer clearcache
```
2. Réinitialiser les permissions des fichiers 
```bash
git config --global --add safe.directory 'C:/{chemin_vers_votre_projet_laravel}/vendor/psr/http-message'
# -- Assurez-vous de remplacer le chemin par le chemin réel de votre projet Laravel.
```
3. and reinstall websocket
```bash
composer require beyondcode/laravel-websockets -w
```
