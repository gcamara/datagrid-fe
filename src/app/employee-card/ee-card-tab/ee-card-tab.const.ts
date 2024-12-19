export enum EmployeeCardTab {
    OVERVIEW = 'Overview',
    EARNINGS = 'Earnings',
    DEDUCTIONS = 'Deductions',
    BENEFITS = 'Benefits',
    TAXES = 'Taxes',
}

export type EmployeeCardTabType = `${EmployeeCardTab}`;

export type EmployeeCardPeriod = {
    from: Date;
    to: Date;
}