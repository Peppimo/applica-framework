let language = "en"

let strings = {}
strings["en"] = {
    registering: "Registering...",
    ooops: "Ooops...",
    badLogin: "Cannot login! Please check your email address or password!",
    welcome: "Welcome",
    congratulations: "Congratulations",
    welcomeMessage: "Hi {0}, your registration is complete.\nA confirmation link was sent to {1}.\nPlease confirm before login",
    continue: "Continue",
    register: "Register",
    forgotPassword: "Forgot password",
    signIn: "Sign in",
    mailAddress: "Mail Address",
    name: "Name",
    password: "Password",
    accountConfirmText: "Insert activation code that we sent to your mailbox to confirm your account",
    accountConfirmed: "Your account is confirmed. You can login now",
    mailAndPasswordRequired: "Email and password are required",
    nameMailAndPasswordRequired: "Name, email and password are required",
    mailRequired: "Email is required",
    activationCodeRequired: "Activation code required",
    accountRecoverText: "Please insert your email address to recover password. We will send a new password in your mailbox!",
    problemOccoured: "There is a problem",
    accountRecovered: "A new password was sent to {0}",
    pleaseSpecifyId: "Please specify an ID",
    pleaseSpecifyQuery: "Please specify a query",
    pleaseSpecifyEntity: "Please specify the entity",
    search: "Search",
    close: "Close",
    selectFilterType: "Select filter type",
    typeValueToSearch: "Type value to search",
    value: "Value",
    filters: "Filters",
    pagination: "Showing {0} to {1} of {2}",
    noResults: "there are no results with the specified criteria",
    selectAll: "Select all",
    delete: "Delete",
    create: "Create",
    refresh: "Refresh",
    confirm: "Confirm",
    entityDeleteConfirm: "Are you sure to delete {0} entities?",
    submit: "Submit",
    cancel: "Cancel",
    add: "Add",
    pleaseSpecifyData: "Please specify data",
    ok: "OK",
    security: "Security",
    users: "Users",
    roles: "Roles",
    setup: "Setup",
    categories: "Categories",
    nElementsSelected: "{0} elements selected",
    oneElementSelected: "1 element selected",
    nothingSelected: "Nothing selected",
    usersList: "Users list",
    usersListDescription: "Create, edit or delete system users",
    mail: "Email",
    active: "Active",
    editUser: "Edit user",
    editUserDescription: "Use this form to edit user informations",
    generalInformations: "General informations",
    rolesList: "Roles list",
    rolesListDescription: "A role is an entity that gives to user authorization to do something",
    nameOfRole: "Name of role",
    role: "Role",
    permissions: "Permissions",
    selectPermissions: "Select permissions for role",
    back: "Back",
    save: "Save",
    image: "Image",
    cover: "Cover",
    saveComplete: "Save complete"
}

export function setLanguage(language_) {
    language = language_
}

export default function M(key) {
    if (strings[language] && strings[language][key]) {
        return strings[language][key]
    } else {
        logger.w("String not found for language " + language + ":", key)
        return key
    }
}