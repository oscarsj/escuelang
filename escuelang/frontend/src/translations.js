const allTranslations = {
    es_ES: {
        child: {
            name: 'Nombre', 
            surname: 'Apellidos',
            birthdate: 'Fecha de nacimiento',
            age: 'Edad',
            address: 'Dirección',
            town: 'Ciudad',
            postcode: 'Código postal',
            school: 'Colegio',
            dni: 'DNI',
            email: 'Correo',
            notes: 'Notas'
        },
        register: {
            monitor: 'Monitor',
            days: 'Días',
            price_month: 'Precio al mes',
            competition: 'Compite'
        },
        days:{
            Monday: 'Lunes',
            Tuesday: 'Martes',
            Wednesday: 'Miércoles',
            Thursday: 'Jueves',
            Friday: 'Viernes'
        },
        season: {
            name: "Nombre",
            course: "Curso",
            start_date: "Fecha de inicio",
            end_date: "Fecha de fin",
            default_price: "Precio base",
            active: "Temporada actual"
        }
    },
    en_US: {
        child: {
            name: 'Name', 
            surname: 'Surname',
            birthdate: 'Birthdate',
            age: 'Age',
            address: 'Address',
            town: 'Town',
            postcode: 'Postcode',
            school: 'School',
            dni: 'ID',
            email: 'Email',
            notes: 'Misc'
        },
        register: {
            monitor: 'Monitor',
            days: 'Days',
            price_month: 'Price month',
            competition: 'Competition?'
        },
        days:{
            Monday: 'Monday',
            Tuesday: 'Tuesday',
            Wednesday: 'Wednesday',
            Thursday: 'Thursday',
            Friday: 'Friday'
        },
        season: {
            name: 'Name',
            course: 'Course',
            start_date: 'Start date',
            end_date: 'End date',
            default_price: 'Base price',
            active: 'Active season'
        }
    }
}
const seasonTranslations = {
    'es_ES': {
        confirmDeleteRegisterTitle: 'Borrar registro',
        confirmDeleteRegister: '¿Estás seguro de querer borrar el registro? Esto cancelará el registro del alumno a la temporada actual, pero no borrará los datos personales del alumno de la base de datos.'
    },
    'en_US': {
        confirmDeleteRegisterTitle: 'Delete register?',
        confirmDeleteRegister: 'Are you sure you want to delete the register? this will unsubscribe child from current season, But will not remove child personal data from database.'
    }
}
const oldChildrenTranslations = {
    'es_ES': {
        confirmDeleteChildTitle: 'Borrar alumno',
        confirmDeleteChild: '¿Estás seguro de querer borrar el alumno? ¡Esto eliminará totalmente al alumno de la base de datos!',
        accept_button: 'Aceptar',
        cancel_button: 'Cancelar',
        delete_button: 'Borrar',
    },
    'en_US': {
        confirmDeleteChildTitle: 'Delete child?',
        confirmDeleteChild: 'Are you sure you want to fully delete child from database? This cannot be undone',
        accept_button: 'OK',
        cancel_button: 'Cancel',
        delete_button: 'Delete',   
    }
}
const visibleFieldsTranslations = {
    es_ES: {
        show_button: 'Campos visibles',
        title: 'Selecciona campos visibles'
    },
    en_US: {
        show_button: 'Show fields',
        title: 'Select fields to show'
    }
}
const addRegisterTranslations = {
    es_ES: {
        add_register_button: 'Añadir alumno',
        add_register_title: 'Añadir nuevo alumno a esta temporada',
        save_button: 'Guardar',
        save_and_add_button: 'Guardar y seguir añadiendo',
        cancel_button: 'Cancelar',
        delete_button: 'Borrar'
    },
    en_US: {
        add_register_button: 'Add child',
        add_register_title: 'Add new child to this season',
        save_button: 'Save',
        save_and_add_button: 'Save and keep adding',
        cancel_button: 'Cancel'
    }
}

const addAPITranslations = {
    es_ES: {
        child_already_registered: "¡El alumno ya está registrado en esta temporada!",
        child_data_error: "Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos"
    },
    en_US: {
        child_already_registered: "Child already registered",
        child_data_error: "Error in child data"
    }
}

export { 
    allTranslations,
    seasonTranslations,
    oldChildrenTranslations,
    addRegisterTranslations,
    visibleFieldsTranslations,
    addAPITranslations
};