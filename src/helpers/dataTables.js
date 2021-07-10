
// Clientes
export const clientesColumn = [
  {
    Header: 'Nombre',
    accessor: 'nombre', // accessor is the "key" in the data
  },
  {
    Header: 'RFC',
    accessor: 'rfc',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Teléfono',
    accessor: 'telefono',
  },
  {
    Header: 'Contácto',
    accessor: 'contacto',
  },
  {
    Header: 'Dirección',
    accessor: 'direccion',
  },
  {
    Header: 'Telefono Contacto',
    accessor: 'telefono_contacto',
  },
  {
    Header: 'Descuento',
    accessor: 'descuento',
  },
]

export const clientesDataModal = {
  nombre: '',
  rfc: '',
  email: '',
  telefono: '',
  contacto: '',
  direccion: '',
  telefono_contacto: '',
  descuento: 0,
}

// Artículos

export const articulosColumns = [
  {
    Header: 'Nombre',
    accessor: 'nombre', // accessor is the "key" in the data
  },
  {
    Header: 'Descripción',
    accessor: 'descripcion', // accessor is the "key" in the data
  },
  {
    Header: 'Unidad de venta',
    accessor: 'unidad_venta',
  },
  {
    Header: 'Tipo de Atículo',
    accessor: 'tipo_articulo',
  },
  {
    Header: 'Precio unitario',
    accessor: 'precio_unitario',
  },
  {
    Header: 'Costo',
    accessor: 'costo',
  },
]

export const articulosDataModal = {
  
  nombre: '',
  descripcion: '',
  unidad_venta: '',
  tipo_articulo: '',
  precio_unitario: 0,
  costo: 0,
}

// Cotizaciones

export const cotizacionesColumns = [
  {
    Header: 'Folio',
    accessor: 'folio', // accessor is the "key" in the data
  },
  {
    Header: 'Cliente',
    accessor: `cliente_id`, // accessor is the "key" in the data
  },
  {
    Header: 'Descripción',
    accessor: 'descripcion', // accessor is the "key" in the data
  },
  {
    Header: 'Fecha validez',
    accessor: 'fecha_validez', // accessor is the "key" in the data
  },
]

export const cotizacionesDataModal = {
  id: 0,
  folio: 0,
  cliente_id: '',
  cliente_nombre: '',
  descripcion: '',
  fecha_validez: '',
}

// Detalles

export const detalleColumns = [
  {
    Header: 'Descripción',
    accessor: 'descripcion', // accessor is the "key" in the data
  },
  {
    Header: 'Fecha validez',
    accessor: 'fecha_validez', // accessor is the "key" in the data
  },
]

export const detalleDataModal = {
  id: 1,
  cotizacion_id: 1,
  articulo_id: 0,
  cantidad: 0,
  precio_unitario: 0,
  importe: 0,
}