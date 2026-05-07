import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      marketTitle: "Market",
      loginTitle: "Login",
      signupTitle: "Sign Up",
      username: "Username",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginButton: "Login",
      signupButton: "Sign Up",
      errorTitle: "Error",
      close: "Close",
      passwordsMustMatch: "Passwords must match",
      myCollection: "My Collection",
      users: "Users",
      pull: "PULL",
      settings: "Settings",
      account: "Account",
    },
  },
  fr: {
    translation: {
      marketTitle: "Marché",
      loginTitle: "Connexion",
      signupTitle: "Inscription",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      confirmPassword: "Confirmez le mot de passe",
      loginButton: "Se connecter",
      signupButton: "S'inscrire",
      errorTitle: "Erreur",
      close: "Fermer",
      passwordsMustMatch: "Les mots de passe doivent correspondre",
      myCollection: "Ma collection",
      users: "Utilisateurs",
      pull: "PULL",
      settings: "Paramètres",
      account: "Compte",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "localStorage", "cookie", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
