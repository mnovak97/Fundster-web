import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'cro',
        resources: {
            en: {
                translation: {
                    selectLanguage: "Selected language",
                    newProject: "Create new project",
                    projectName: "Project name:",
                    description: "Description:",
                    moneyGoal: "Money goal:",
                    deadline: "Deadline:",
                    projectImage: "Project Image:",
                    funded: "Funded",
                    backers: "Backers",
                    daysLeft: "Days left",
                    projects: "Projects",
                    myProjects: "My projects",
                    profile: "Profile",
                    logOut: "Log Out",
                    emailPlaceholder: "Enter email",
                    password: "Password",
                    passwordPlaceholder: "Enter password",
                    login: "Login",
                    account: "Dont have an account?",
                    signUp: "Sign Up",
                    name: "Name",
                    namePlaceholder: "Enter name",
                    telephone: "Phone Number",
                    telPlaceholder: "Enter telephone",
                    updateUser: "Update data",
                    backProject: "Back This Project",
                    deleteProject: "Delete",
                    register: "Register",
                    nameRegister:"Name:",
                    emailRegister: "Email:",
                    telRegister: "Phone number:",
                    passwordRegister: "Password:",
                    registerQuestion: "Already registred?",
                    confirmBack: "Back",
                    cancel: "Cancel",
                    enterBackAmount: "Enter back amount"
                    
                }
            },
            cro: {
                translation: {
                    selectLanguage:"Odabran jezik",
                    newProject: "Napravi novi projekt",
                    projectName: "Ime projekta:",
                    description: "Opis:",
                    moneyGoal: "Novčani cilj:",
                    deadline: "Rok:",
                    projectImage: "Slika projekta:",
                    funded: "Financirano",
                    backers: "Podupiratelji",
                    daysLeft: "Dana preostalo",
                    projects: "Projekti",
                    myProjects: "Moji projekti",
                    profile: "Profil",
                    logOut: "Odjavi se",
                    emailPlaceholder: "Unesite email",
                    password: "Lozinka",
                    passwordPlaceholder: "Unseite lozinku",
                    login: "Prijava",
                    account: "Nemate korisnički račun?",
                    signUp: "Registrirajte se",
                    name: "Ime",
                    namePlaceholder: "Unesite ime",
                    telephone: "Broj mobitela",
                    telPlaceholder: "Unseite broj mobitela",
                    updateUser: "Ažuriraj podatke",
                    backProject: "Podupri projekt",
                    deleteProject: "Obriši",
                    register: "Registrijaj se",
                    nameRegister: "Ime:",
                    emailRegister: "Email:",
                    telRegister: "Broj mobitela:",
                    passwordRegister: "Lozinka:",
                    registerQuestion: "Već ste registrirani?",
                    confirmBack:"Podupri",
                    cancel: "Poništi",
                    enterBackAmount: "Unesite iznos"

                }
            }
        }
    })