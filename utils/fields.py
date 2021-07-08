class MainRegionMixin:
    APAC = 'APAC'
    EMEA = 'EMEA'
    LATAM = 'LATAM'
    NOAM = 'NOAM'
    MAIN_REGION_CHOICES = [
        (APAC, 'APAC'),
        (EMEA, 'EMEA'),
        (LATAM, 'LATAM'),
        (NOAM, 'NOAM'),
    ]

class SubRegionMixin:
    ANZ = 'ANZ'
    N_ASIA = 'N_ASIA'
    ISA = 'ISA'
    ASEAN = 'ASEAN'
    S_ASIA = 'S_ASIA'
    APAC = 'APAC'
    EMEA = 'EMEA'
    SOUTH = 'South'
    MEA = 'MEA'
    DACH = 'DACH'
    CEE = 'CEE'
    NORTH = 'North'
    UK_IE = 'UK_IE'
    CAR = 'CAR'
    GLA = 'GLA'
    NLA = 'NLA'
    SLA = 'SLA'
    BRAZIL = 'BRAZIL'
    MEXICO = 'MEXICO'
    NOAM = 'NOAM'
    SUB_REGION_CHOICES = [
        # APAC
        (ANZ, 'ANZ'),
        (APAC, 'APAC'),
        (ASEAN, 'ASEAN'),
        (ISA, 'ISA'),
        (N_ASIA, 'North Asia'),
        (S_ASIA, 'South Asia'),
        # EMEA
        (CEE, 'CEE'),
        (DACH, 'DACH'),
        (EMEA, 'EMEA'),
        (GLA, 'GLA'),
        (MEXICO, 'Mexico'),
        (NLA, 'NLA'),
        (SLA, 'SLA'),
        # NOAM
        (APAC, 'APAC'),
        (NOAM, 'NOAM'),
    ]


class OwnershipTypeMixin:
    LEASED = 'LEASED'
    OWNED = 'OWNED'
    OWNERSHIP_TYPE_CHOICES = [
        (LEASED, 'Leased'),
        (OWNED, 'Owned'),
    ]

class LeaseTypeMixin:
    FULL_SERVICE_GROSS = "FULL_SERVICE_GROSS"
    MODIFIED_GROSS = "MODIFIED_GROSS"
    ABSOLUTE_NET = "ABSOLUTE_NET"
    NETNETNET = "NETNETNET"
    LEASE_TYPE_CHOICES = [
        (FULL_SERVICE_GROSS, "Full Service Gross"),
        (MODIFIED_GROSS, "Modified Gross"),
        (ABSOLUTE_NET, "Absolute Net"),
        (NETNETNET, "NetNetNet"),
    ]

class ServiceLevelMixin:
    PLATINUM = "PLATINUM"
    GOLD = "GOLD"
    SILVER = "SILVER"
    BRONZE = "BRONZE"
    SERVICE_LEVEL_CHOICES = [
        (PLATINUM, "Platinum"),
        (GOLD, "Gold"),
        (SILVER, "Silver"),
        (BRONZE, "Bronze"),
    ]
    
class SourceMixin:
    DEFAULT = "DEFAULT"
    CLIENT = "CLIENT"
    SUPPLIER = "SUPPLIER"
    FORMULA = "FORMULA"
    SOURCE_CHOICES = [
        (DEFAULT, "Default"),
        (CLIENT, "Client source"),
        (SUPPLIER, "Supplier"),
        (FORMULA, "Formula"),
    ]

class CountryMixin:
    pass
    # Australia, 
    # China, 
    # Hong Kong, 
    # India, 
    # Indonesia, 
    # Korea, 
    # Malaysia, 
    # New Zealand, 
    # Philippines, 
    # Singapore, 
    # Sri Lanka, 
    # Taiwan, 
    # Thailand, 
    # Vietnam, 
    # Brunei, 
    # Myanmar, 
    # Cambodia, 
    # Laos, 
    # Bangladesh, 
    # Nepal, 
    # Macau, 
    # Mongolia, 
    # Bhutan, 
    # Fiji, 
    # Japan, 
    # Kiribati, 
    # Kyrgyzstan, 
    # Maldives, 
    # Nauru, 
    # Papua New Guinea, 
    # Solomon Islands, 
    # Tajikistan, 
    # Timor-Leste, 
    # Tonga, 
    # Turkmenistan, 
    # Tuvalu, 
    # Vanuatu, 
    # Aland Islands, 
    # Albania, 
    # Algeria, 
    # Andorra, 
    # Angola, 
    # Armenia, 
    # Austria, 
    # Bahrain, 
    # Belarus, 
    # Belgium, 
    # Benin, 
    # Bosnia and Herzegovina, 
    # Botswana, 
    # Bulgaria, 
    # Burkina Faso, 
    # Burundi, 
    # Cameroon, 
    # Cape Verde, 
    # Central African Republic, 
    # Chad, 
    # Comoros, 
    # Congo, 
    # Croatia, 
    # Cyprus, 
    # Czech Republic, 
    # Denmark, 
    # Djibouti, 
    # Egypt, 
    # Equatorial Guinea, 
    # Eritrea, 
    # Estonia, 
    # Ethiopia, 
    # Faroe Islands, 
    # Finland, 
    # France, 
    # Gabon, 
    # Gambia, 
    # Georgia, 
    # Germany, 
    # Ghana, Gibraltar, Greece, Greenland, Guernsey, Guinea, Guinea-Bissau, Vatican City, Hungary, Iceland, Iran, Iraq, Ireland, Isle of Man, Israel, Italy, Ivory Coast, Jersey, Jordan, Kazakhstan, Kenya, Kuwait, Latvia, Lebanon, Lesotho, Liberia, Libya, Liechtenstein, Lithuania, Luxembourg, Macedonia, Madagascar, Malawi, Mali, Malta, Mauritania, Mauritius, Mayotte, Moldova, Monaco, Montenegro, Morocco, Mozambique, Namibia, Netherlands, Niger, Nigeria, Norway, Oman, Pakistan, Palestine, Poland, Portugal, Qatar, Romania, Russia, Rwanda, Saint Helena, San Marino, Sao Tome and Principe, Saudi Arabia, Senegal, Serbia, Seychelles, Sierra Leone, Slovakia, Slovenia, Somalia, South Africa, South Sudan, Spain, Sudan, Svalbard and Jan Mayen, Swaziland, Sweden, Switzerland, Syria, Tanzania, Togo, Tunisia, Turkey, Uganda, Ukraine, United Arab Emirates, United Kingdom, Uzbekistan, Western Sahara, Yemen, Zambia, Zimbabwe, Afghanistan, Azerbaijan, Cabo Verde, Cote d'Ivoire, Eswatini, Kosovo, Anguilla, Antigua and Barbuda, Argentina, Aruba, Bahamas, Barbados, Belize, Bolivia, Bouvet Island, Brazil, Cayman Islands, Chile, Colombia, Costa Rica, Cuba, Dominica, Dominican Republic, Ecuador, El Salvador, Falkland Islands, French Guiana, Grenada, Guadeloupe, Guatemala, Guyana, Haiti, Honduras, Jamaica, Martinique, Mexico, Montserrat, Netherlands Antilles, Nicaragua, Panama, Paraguay, Peru, Puerto Rico, Saint Barthelemy, Saint Kitts and Nevis, Saint Lucia, Saint Martin, Saint Vincent and the Grenadines, South Georgia and the South Sandwich Islands, Suriname, Trinidad and Tobago, Turks and Caicos Islands, Uruguay, Venezuela, Virgin Islands, British, Virgin Islands, U.S., Caribbean Countries, Bermuda, Canada, Saint Pierre and Miquelon, United States, Marshall Islands, Micronesia, Palau, Samoa)