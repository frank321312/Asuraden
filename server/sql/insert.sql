-- UsuarioNoValidado
CALL altaUsuarioNoValidado("Pepe", "pepe@gmail.com", "123456", NULL);
CALL altaUsuarioNoValidado("Usuario", "user@gmail.com", "123456", NULL);
CALL altaUsuarioNoValidado("Anonimo", "anonimo@gmail.com", "123456", NULL);
CALL altaUsuarioNoValidado("User", "usuario@gmail.com", "123456", 12345678);
CALL altaUsuarioNoValidado("Alguien", "davidbzkalgo95@gmail.com", "12345678", 12345678);
-- Usuario
CALL `altaUsuario`("Alan", "alan@gmail.com", "321323", 32571245);
CALL `altaUsuario`("Pepito", "pepito@gmail.com", "321323", NULL);
CALL `altaUsuario`("be", "be@gmail.com", "321323", NULL);
CALL `altaUsuario`("date", "date@gmail.com", "321323", 3628676);