
enum CustomerType {
    Standard,
    Premium,
    VIP
}

function welcome(customer : string, ct : CustomerType) : string {
    if (ct = CustomerType.Standard) {}
    if (ct = CustomerType.Premium) {}
    if (ct = CustomerType.VIP) {}
    return `Welcome ${customer}`;
}