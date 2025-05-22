export class Usuario {
  id?: number;
  nombre: string;
  apellidos: string;
  contrasena: string;
  email: string;
  tel: string;
  role: number;
  cargo: number;


  // se valida aca el tipo de dato que se recibe para evitar un undefind
    // y se le asigna un valor por defecto
  constructor(data: Partial<Usuario>) {
    this.id = data.id;
    this.nombre = data.nombre ?? '';
    this.apellidos = data.apellidos ?? '';
    this.contrasena = data.contrasena ?? '';
    this.email = data.email ?? '';
    this.tel = data.tel ?? '';
    this.role = data.role ?? 0;
    this.cargo = data.cargo ?? 0;
  }


    // Método para guardar el usuario en la base de datos esto crea un nuevo usuario y lo devuele como un objeto
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      tel: this.tel,
      cargo: this.cargo,
      role: this.role
    };
  }
}
