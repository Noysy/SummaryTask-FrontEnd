import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  he: {
    translation: {
        group: {
            removeParent: "Byebye",
            delete: "ez",
            update: "damn.. it worked",
        }
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "he",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
