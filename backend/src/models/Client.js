class Client {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.birth_date = data.birth_date;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static validate(data) {
        const errors = [];
        
        if (!data.name) {
            errors.push('Nome é obrigatório');
        }
        
        if (data.email && !data.email.includes('@')) {
            errors.push('Email inválido');
        }
        
        if (data.phone && data.phone.length < 10) {
            errors.push('Telefone inválido');
        }
        
        return errors;
    }
}

module.exports = Client;