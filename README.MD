# Prueba Técnica BAGUER - SAS.

## Sentencias SQL iniciales

INSERT INTO pruebatecnicabaguer.roles (Id, Nombre, Descripcion) VALUES(20, 'Usuario', 'Persona que hace uso del sistema');
INSERT INTO pruebatecnicabaguer.roles (Id, Nombre, Descripcion) VALUES(10, 'Administrador', 'Rango de control maximo en el sistema');

## Ejecucion BackEnd

- Se puede crear una base de datos previa, o el sistema la crea. los ajustes se encuentran en:  API\appsettings.json

- Importante antes de ejecutar la migracion: dotnet tool install --global dotnet-ef

- Comando de migracion: dotnet ef migrations add InitialCreate --project persistencia/ --startup-project ./API/ --output-dir ./Data/Migrations

- Ejcucion de la migracion: dotnet ef database update --project persistencia/ --startup-project ./API/

- Ejecucion del backend: dotnet run --project API/

## Ejecucion FrontEnd

- Entrar al archivo index, encontrado en: FrontEnd/index.html, luego desplegar usando la extension LiveServer o cualquier otro servidor local.