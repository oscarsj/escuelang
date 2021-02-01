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
    }
}
const seasonTranslations = {
    'es_ES': {
        confirmDeleteRegisterTitle: 'Borrar registro',
        confirmDeleteRegister: '¿Estás seguro de querer borrar el registro? Esto cancelará el registro del alumno a la temporada actual, pero no borrará los datos personales del alumno de la base de datos.'
    }
}
const oldChildrenTranslations = {
    'es_ES': {
        confirmDeleteChildTitle: 'Borrar alumno',
        confirmDeleteChild: '¿Estás seguro de querer borrar el alumno? ¡Esto eliminará totalmente al alumno de la base de datos!'
    }
}

const addRegisterTranslations = {
    es_ES: {
        add_register_button: 'Añadir alumno',
        add_register_title: 'Añadir nuevo alumno a esta temporada',
        save_button: 'Guardar',
        save_and_add_button: 'Guardar y seguir añadiendo',
        cancel_button: 'Cancel',
    }

}

export { 
    allTranslations,
    seasonTranslations,
    oldChildrenTranslations,
    addRegisterTranslations
};