const { body, param } = require('express-validator/check');

exports.validate = method => {
    switch (method) {
        case 'validateUser': {
            return [
                body('id')
                    .exists().withMessage('id is required')
                    .isLength({ min: 9, max: 9 }).withMessage('id is invalid'),
                body('name', 'Name is required').exists(),
                body('email', 'Invalid email').exists().isEmail(),
                body('phone', 'Invalid phone').optional().custom(val => {
                    return (val.length > 9);
                })
            ];
        }
        case 'checkUserId': {
            return [
                param('userId')
                    .exists().withMessage('id is required')
                    .isLength({ min: 9, max: 9 }).withMessage('id is invalid')
            ];
        }
    }
};

exports.validationHandler = next => result => {
    if (result.isEmpty()) return;

    if (!next) {
        throw new Error(
            result.array().map(i => `${i.msg}`).join('\n')
        );
    }
    else {
        return next(
            new Error(
                result.array().map(i => `${i.msg}`).join('\n')
            )
        );
    }
};