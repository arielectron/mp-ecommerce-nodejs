const mercadopago = require("mercadopago");

const getBaseUrl = (req) => {
    return req.protocol + '://' + req.get('host');
}

module.exports = async function (req) {
    // Agrega credenciales
    // Test user: test_user_63274575@testuser.com
    // Public key: APP_USR-ee70a80f-0848-4b7f-991d-497696acbdcd
    mercadopago.configure({
        access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
        integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
    });

    // Crea un objeto de preferencia
    let preference = {
        items: [
            {
                id: req.query.id,
                title: req.query.title,
                description: "Dispositivo móvil de Tienda e-commerce",
                picture_url: req.query.img.replace('./', getBaseUrl(req) + '/'),
                unit_price: Number(req.query.price),
                quantity: 1,
            },
        ],
        payer: {
            name: "Lalo",
            surname: "Landa",
            email: "test_user_63274575@testuser.com",
            phone: {
                area_code: "11",
                number: 51525458
            },
            address: {
                zip_code: "1824",
                street_name: "Falsa",
                street_number: 123
            }
        },
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "visa"
                }
            ],
            installments: 6
        },
        back_urls: {
            success: `${getBaseUrl(req)}/mp-success`,
            failure: `${getBaseUrl(req)}/mp-failure`,
            pending: `${getBaseUrl(req)}/mp-pending`
        },
        auto_return: "approved",
        notification_url: `${getBaseUrl(req)}/mp-notifications`,
        external_reference: "arielectron@gmail.com",
        statement_descriptor: "Tienda e-commerce"
    };

    return await mercadopago.preferences.create(preference);
};