export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
  }
//Mensajes de errores de validación
export const FormErrorMessage = [
  new ErrorMessage('nombre', 'required', 'El Nombre es requerido'),
  new ErrorMessage('nombre', 'minlength', 'El nombre debe tener 3 carácteres mínimo'),
  new ErrorMessage('descripcion', 'required', 'La descripción es requerida'),
  new ErrorMessage('tarifa', 'required', 'La tarifa es requerida'),
  new ErrorMessage('tarifa', 'pattern', 'La tarifa solo acepta números'),
  new ErrorMessage('nivelDificultad', 'required', 'Es requerido que seleccione el nivel de Dificultad'),
  new ErrorMessage('equipamientoNecesario', 'required', 'El equipamiento necesario es requerido'),
  new ErrorMessage('tiempo', 'required', 'El tiempo de duración es requerido'),
  new ErrorMessage('tiempo', 'pattern', 'El tiempo solo acepta números'),
  new ErrorMessage('tiempo', 'maxlength', 'El tiempo debe tener 3 carácteres máximo'),
  new ErrorMessage('email', 'required', 'El email es requerido'),
  new ErrorMessage('password', 'required', 'Es password es requerido'),
  new ErrorMessage('rol', 'required', 'El rol es requerido'),
];