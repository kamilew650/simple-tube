
class DomainAddressesLocal {
    static readonly AUTH_API_DOMAIN = `http://${process.env['DOCKERHOST']}:8101`
    static readonly GAMES_API_DOMAIN = `http://${process.env['DOCKERHOST']}:8104/teddy-eddie`
}

class DomainAddressesDev {
    static readonly AUTH_API_DOMAIN = 'https://api.auth.te.gorrion.kylos.pl'
    static readonly GAMES_API_DOMAIN = 'https://api.games.te.gorrion.kylos.pl/teddy-eddie'
}

class DomainAddressesProd {
    static readonly AUTH_API_DOMAIN = 'https://auth.bs.edubears.pl'
    static readonly GAMES_API_DOMAIN = 'https://games.bs.edubears.pl/teddy-eddie'
}

type DomainAddresses = typeof DomainAddressesLocal | typeof DomainAddressesDev | typeof DomainAddressesProd;

let addresses: DomainAddresses

switch (process.env["mode"]) {
    default:
    case 'local':
        addresses = DomainAddressesLocal
        break
    case 'dev':
        addresses = DomainAddressesDev
        break
    case 'prod':
        addresses = DomainAddressesProd
        break
}

export const DomainAddresses = addresses