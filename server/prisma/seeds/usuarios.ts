import { Role } from "@prisma/client";

export const usuarios = [
  // Usuario 1
  {
    id: 1,
    nombre: "Ana Martínez",
    telefono: "555-1111",
    email: "ana.martinez@prueba.com",
    direccion: "Avenida Siempre Viva 742",
    fechaNacimiento: new Date("1988-05-14T00:00:00.000Z"),
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.ENCARGADO,
    sucursalId: 2
  },
  // Usuario 2
  {
    id: 2,
    nombre: "Carlos Pérez",
    telefono: "555-2222",
    email: "carlos.perez@prueba.com",
    direccion: "Calle Falsa 123",
    fechaNacimiento: new Date("1975-08-22T00:00:00.000Z"),
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.ENCARGADO,
    sucursalId: 5
  },

  {
    id: 6,
    nombre: "Jeydan Mitchell",
    telefono: "555-2222",
    email: "jeydan.mitchell@prueba.com",
    direccion: "Calle Falsa 123",
    fechaNacimiento: new Date("1975-08-22T00:00:00.000Z"),
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.ENCARGADO,
    sucursalId: 1
  },

  {
    id: 7,
    nombre: "Manfred Ugalde",
    telefono: "555-2222",
    email: "manfred.ugalde@prueba.com",
    direccion: "Calle Falsa 123",
    fechaNacimiento: new Date("1975-08-22T00:00:00.000Z"),
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.ENCARGADO,
  },

  // Usuario 3
  {
    id: 3,
    nombre: "Lucía Gómez",
    telefono: "555-3333",
    email: "lucia.gomez@prueba.com",
    direccion: "Boulevard de los Sueños 456",
    fechaNacimiento: new Date("1992-03-10T00:00:00.000Z"),
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.CLIENTE,
  },
  // Usuario 4
  {
    id: 4,
    nombre: "Mario López",
    telefono: "555-4444",
    email: "mario.lopez@prueba.com",
    direccion: "Calle Luna 789",
    fechaNacimiento: new Date("1985-11-02T00:00:00.000Z"),
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.CLIENTE,
  },
  // Usuario 5
  {
    id: 5,
    nombre: "Laura Fernández",
    telefono: "555-5555",
    email: "mdsantamaria02@gmail.com",
    direccion: "Calle Estrella 123",
    fechaNacimiento: new Date("1990-09-09T00:00:00.000Z"),
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.ADMINISTRADOR,
  }
];