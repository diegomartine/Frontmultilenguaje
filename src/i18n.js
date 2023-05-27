import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      Productos: 'Productos',
      Producto: 'Productos',
      Pedidos:'Pedidos',
      Newpedidos: 'Crear pedido',      
      Volver:'Retornar',
      Newproducto: 'Crear articulo',
      Createprodu: 'Crear producto',
      referencia: 'Referencia',
      nombre: 'Nombre',      
      descripción:'Descripción',
      precioi:'Precio sin impuesto',
      impuestoa:'Impuesto aplicable',
      enviar: 'Enviar',
      Createpedi: 'Crear pedido',
      add:'Añadir Producto',
      select: 'Seleccione',
      delet:'Eliminar',
      canti:'Cantidad',      
      total: 'Total',
      pre: 'precio',
      totalcon: 'Precio total con impuestos',
      info: 'Detalle',
      edit: 'Editar',
      guardar: 'Guardar Cambios',
      close: 'Cerrar',
      totalpedido: 'Total Pedido'
    },
  },
  en: {
    translation: {    
      Productos: 'Product',
      Producto: 'Product',
      Pedidos:'orders',
      Newpedidos: 'create order',
      Volver:'Return',
      Newproducto: 'Create Article',
      Createprodu: 'Create Product',
      referencia: 'Reference',
      nombre: 'Name',
      descripción:'Description',
      precioi:'Price without tax',
      impuestoa:'Applicable tax',
      enviar: 'Send',
      Createpedi: 'Create order',
      canti:'Amount',
      total: 'Total',
      pre: 'price',
      add:'Add Product',
      delet:'Delete',
      select: 'Select',      
      totalcon: 'Total price with taxes',
      info: 'Detail',
      edit: 'Edit',
      guardar: 'Save Changes',
      close: 'Close',
      totalpedido: 'total order',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;