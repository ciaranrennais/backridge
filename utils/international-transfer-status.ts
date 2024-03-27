export default function (activity) {
    let status = { warnings: [] };
    for (const org of activity.otherOrganizations ) {
        if ( org.country === 'USA' ) 
            status.warnings.push("International transfer to USA as " + org.name + " resides there. The USA is not on the list of countries with sufficient data protection laws for the EU.")
    }
    return status;
}
