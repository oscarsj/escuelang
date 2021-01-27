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
    confirmDeleteRegister: '¿Estás seguro de querer borrar el registro? Esto cancelará el registro del alumno a la temporada actual'
}

export default { allTranslations, seasonTranslations };