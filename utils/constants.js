//Account Types enum
const AccountTypesEnum = {
    ADMIN : 'a',
    SALES_REPRESENTATIVE : 's',
    MANAGEMENT : 'm',
    CREW_SCHEDULE_COORDINATOR: 'c',
    REGISTERED_USER: 'user',
    GUEST: 'guest',
    USERS: ['user', 'guest']
}

Object.freeze(AccountTypesEnum);

module.exports = {
    AccountTypesEnum
}