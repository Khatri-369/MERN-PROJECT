import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      manageAdmins: "Manage Admins",
      addAdmin: "Add Admin",
      photo: "PHOTO",
      fullName: "FULL NAME",
      username: "USERNAME",
      email: "EMAIL",
      mobile: "MOBILE",
      status: "STATUS",
      createdDate: "CREATED DATE",
      action: "ACTION",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      noAdminFound: "No Admin Found",
      active: "Active",
      inactive: "Inactive",
      deleteConfirm: "Are you sure you want to delete this admin?",
      adminDeletedSuccess: "Admin Deleted Successfully",
      deleteFailed: "Delete Failed",
      failedFetchAdmins: "Failed to fetch admins",
      english: "English (EN)",
      spanish: "Español (ES)"
    }
  },
  es: {
    translation: {
      manageAdmins: "Administrar Administradores",
      addAdmin: "Agregar Administrador",
      photo: "FOTO",
      fullName: "NOMBRE COMPLETO",
      username: "NOMBRE DE USUARIO",
      email: "CORREO ELECTRÓNICO",
      mobile: "MÓVIL",
      status: "ESTADO",
      createdDate: "FECHA DE CREACIÓN",
      action: "ACCIÓN",
      view: "Ver",
      edit: "Editar",
      delete: "Eliminar",
      noAdminFound: "No se encontró ningún administrador",
      active: "Activo",
      inactive: "Inactivo",
      deleteConfirm: "¿Está seguro de que desea eliminar a este administrador?",
      adminDeletedSuccess: "Administrador eliminado con éxito",
      deleteFailed: "Error al eliminar",
      failedFetchAdmins: "Error al obtener administradores",
      english: "English (EN)",
      spanish: "Español (ES)"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
