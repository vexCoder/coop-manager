
    import { Member, CivilStatus, Gender, HighestEducation, Religion } from '../../../dist/generated';
    import { SeedSchema } from '../../types';

    const schema: SeedSchema<Member> = {
        model: 'member',
        env: 'dev',
        count: 10,
        seed: {
            email: (f) => f.internet.email(),
            acct_num: (f) => f.finance.account(7),
            first_name: (f) => f.name.firstName(),
            last_name: (f) => f.name.lastName(),
            address: (f) => f.address.streetAddress(),
            age: (f) => parseInt(f.random.numeric(2)),
            civil_status: (f) => f.helpers.arrayElement([
                CivilStatus.SINGLE,
                CivilStatus.MARRIED,
                CivilStatus.WIDOWED,
                CivilStatus.DIVORCED,
            ]),
            contact_num: (f) => f.phone.number("+63##########"),
            gender: (f) => f.helpers.arrayElement([
                Gender.MALE,
                Gender.FEMALE
            ]),
            highest_education: (f) => f.helpers.arrayElement([
                HighestEducation.ELEMENTARY,
                HighestEducation.SECONDARY,
                HighestEducation.COLLEGE,
                HighestEducation.POST_GRADUATE,
                HighestEducation.OTHER,
            ]),
            tin: (f) => f.finance.account(10),
            occupation: (f) => f.name.jobTitle(),
            religion: (f) => f.helpers.arrayElement([
                Religion.CATHOLIC,
                Religion.CHRISTIAN,
            ]),
        },
    }
    export default schema;
