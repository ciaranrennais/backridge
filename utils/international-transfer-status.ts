export default function (activity) {
    let status = { warnings: [] };
    for (const org of activity.otherOrganizations ) {
        if ( org.country === 'USA' ) 
            status.warnings.push("International transfer to USA as " + org.name + " resides there.")
    }
    return status;
}
