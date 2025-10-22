modelo DER:

**************************
Usuario

id (PK)
nombre
email
contraseña
ciudad
teléfono
fecha_nacimiento
direccion
rol (admin, usuario)
***************************
Obra

id (PK)
titulo
descripcion
fecha
imagen_url
estado (activa/inactiva)
categoria_id (FK)
***************************
Donacion

id (PK)
monto
fecha
usuario_id (FK)
obra_id (FK)
metodo_pago
***************************
Categoria

id (PK)
nombre
***************************
Archivo

id (PK)
url
tipo (foto, video, documento)
obra_id (FK, opcional)
usuario_id (FK, opcional)
***************************

Relaciones:

Un usuario puede tener muchas donaciones.
Una donación pertenece a un usuario y a una obra.
Una obra puede tener muchos archivos.
Una obra pertenece a una categoría.
