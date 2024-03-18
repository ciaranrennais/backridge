export interface IActivity {
    _id?: string;
    title: string;
    creationDate: Date;
    responsiblePerson: IPerson;
    organization: IOrganization;
    objectives: string;
    duration: Date;
    legality: LegalityOfProcessing;
    internationTransfers: IInternationalTransfer[];
    dataSources: IDataSources[];
}

enum LegalityOfProcessing {
    UserConsent = "User Consent",
    LegalObligation = "Legal Obligation",
    OverridingInterest = "Overriding Interest",
    Illegal = "No Legal Basis"
}

export interface IInternationalTransfer {
    _id?: string;
    countryISOCode: String;
}

export interface IDataSource {
    _id?: string;
    fileLocation: string;
    protectionMeasures: string;
}

export interface IPerson {
    _id?: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface IOrganization {
    _id?: string;
    name: string;
    contactPerson: IPerson;
    countryISOCode: string;
}
