import {es_ES as baseCoreLocale} from "../core/locales/es_ES";
import {Locale as CoreLocale} from "../core/locales/Locale";
import {CoreHelper} from "../core/utils/CoreHelper";
import {Locale} from "./Locale";

const uiLocale: Omit<Locale, keyof CoreLocale> = {
  "About-contactUs": "Contactanos",
  "About-privacyPolicy": "Política de privacidad",
  "About-termsAndConditions": "Terminos y condiciones",
  "Common-cancel": "Cancelar",
  "Common-loadingText": "Cargando...",
  "Common-name": "Nombre",
  "Common-saveChanges": "Guardar cambios",
  "Common-success": "Éxito",
  "DrawerContent-about": "Acerca de",
  "DrawerContent-home": "Inicio",
  "DrawerContent-profile": "Perfil",
  "DrawerContent-settings": "Ajustes",
  "ForgotPassword-description": "Ingresá tu email debajo. Te enviaremos un link para reiniciar la contraseña",
  "ForgotPassword-emailInputLabel": "Email",
  "ForgotPassword-send": "Enviar",
  "ForgotPassword-successfulResponseAlertMessage": "Si el email ingresado esta asociado a una cuenta, recibiras los pasos a seguir para reiniciar tu contraseña.",
  "ForgotPassword-successfulResponseAlertTitle": "Revisa tu email",
  "ForgotPassword-unsuccessfulResponseAlertMessage": "Ocurrió un error inesperado. Por favor intentelo nuevamente",
  "ForgotPassword-unsuccessfulResponseAlertTitle": "Lo sentimos",
  "Home-title": "Inicio",
  "Input-hide": "ocultar",
  "Input-show": "mostrar",
  "Profile-firstName": "Nombre",
  "Profile-lastName": "Apellido",
  "Profile-success": "Información personal actualizada",
  "Profile-title": "Información personal",
  "Settings-enableBiometrics": "Habilitar Biometría",
  "Settings-enableBiometricsSettingsError": "Para habilitar biometría, por favor dirígase a los ajustes, de permisos a la aplicación e intentelo nuevamente.",
  "Settings-goToSettings": "Ir a ajustes",
  "Settings-title": "Ajustes",
  "SignIn-emailInputLabel": "Email",
  "SignIn-passwordInputLabel": "Contraseña",
  "SignIn-submitButtonLabel": "Iniciar sesión",
  "SignIn-unsuccessfulSignInMessage": "Inicio de sesión fallido",
  "SignUp-emailInputLabel": "Email",
  "SignUp-firstNameInputLabel": "Nombre",
  "SignUp-lastNameInputLabel": "Apellido",
  "SignUp-passwordInputLabel": "Contraseña",
  "SignUp-submitButtonLabel": "Registrarse",
  "SignUp-successfulSignUpAlertMessage": "Por favor siga las instrucciones enviadas a su email para activar su cuenta.",
  "SignUp-successfulSignUpAlertTitle": "Éxito",
  "SignUp-title": "Registrarse",
  "SignUp-unsuccessfulSignUpAlertMessage": "Lo sentimos, algo salió mal.",
  "SignUp-unsuccessfulSignUpAlertTitle": "Error",
  "Welcome-forgotPassword": "Olvidé la contraseña",
  "Welcome-signIn": "Iniciar sesión",
  "Welcome-signInHeading": "Ya tenés una cuenta?",
  "Welcome-signUp": "Registrarse",
  "Welcome-title": "Bienvenido!",
  "Welcome-welcomeMessage": "Bienvenido {name}!",
};

const coreLocale: Partial<CoreLocale> = {};

CoreHelper.mergeWith(baseCoreLocale, CoreHelper.mergeWith(coreLocale, uiLocale));
