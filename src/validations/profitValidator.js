import * as yup from "yup"

export const profitValidator = yup.object({
    cust: yup.number(),
    gain: yup.number(),
    expected_profit: yup.number(),
    real_gain: yup.number(),
    real_profit: yup.number(),
    type_diary: yup.bool().required(),
    worked_days: yup.number().required(),
    type_market: yup.string().required()
})