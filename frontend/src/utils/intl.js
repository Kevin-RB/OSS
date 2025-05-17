export const formatCurrency = (value) => {
    if (value === null || value === undefined) {
        return '';
    }
    const options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat('en-US', options).format(value);
}