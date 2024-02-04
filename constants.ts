export enum CurrencyCodes {
    AED = "AED",
    AFN = "AFN",
    ALL = "ALL",
    AMD = "AMD",
    ANG = "ANG",
    AOA = "AOA",
    ARS = "ARS",
    AUD = "AUD",
    AWG = "AWG",
    AZN = "AZN",
    BAM = "BAM",
    BBD = "BBD",
    BCH = "BCH",
    BDT = "BDT",
    BGN = "BGN",
    BHD = "BHD",
    BIF = "BIF",
    BMD = "BMD",
    BND = "BND",
    BOB = "BOB",
    BRL = "BRL",
    BSD = "BSD",
    BTC = "BTC",
    BTG = "BTG",
    BWP = "BWP",
    BZD = "BZD",
    CAD = "CAD",
    CDF = "CDF",
    CHF = "CHF",
    CLP = "CLP",
    CNH = "CNH",
    CNY = "CNY",
    COP = "COP",
    CRC = "CRC",
    CUC = "CUC",
    CUP = "CUP",
    CVE = "CVE",
    CZK = "CZK",
    DASH = "DASH",
    DJF = "DJF",
    DKK = "DKK",
    DOP = "DOP",
    DZD = "DZD",
    EGP = "EGP",
    EOS = "EOS",
    ETB = "ETB",
    ETH = "ETH",
    EUR = "EUR",
    FJD = "FJD",
    GBP = "GBP",
    GEL = "GEL",
    GHS = "GHS",
    GIP = "GIP",
    GMD = "GMD",
    GNF = "GNF",
    GTQ = "GTQ",
    GYD = "GYD",
    HKD = "HKD",
    HNL = "HNL",
    HRK = "HRK",
    HTG = "HTG",
    HUF = "HUF",
    IDR = "IDR",
    ILS = "ILS",
    INR = "INR",
    IQD = "IQD",
    IRR = "IRR",
    ISK = "ISK",
    JMD = "JMD",
    JOD = "JOD",
    JPY = "JPY",
    KES = "KES",
    KGS = "KGS",
    KHR = "KHR",
    KMF = "KMF",
    KRW = "KRW",
    KWD = "KWD",
    KYD = "KYD",
    KZT = "KZT",
    LAK = "LAK",
    LBP = "LBP",
    LKR = "LKR",
    LRD = "LRD",
    LSL = "LSL",
    LTC = "LTC",
    LYD = "LYD",
    MAD = "MAD",
    MDL = "MDL",
    MKD = "MKD",
    MMK = "MMK",
    MOP = "MOP",
    MUR = "MUR",
    MVR = "MVR",
    MWK = "MWK",
    MXN = "MXN",
    MYR = "MYR",
    MZN = "MZN",
    NAD = "NAD",
    NGN = "NGN",
    NIO = "NIO",
    NOK = "NOK",
    NPR = "NPR",
    NZD = "NZD",
    OMR = "OMR",
    PAB = "PAB",
    PEN = "PEN",
    PGK = "PGK",
    PHP = "PHP",
    PKR = "PKR",
    PLN = "PLN",
    PYG = "PYG",
    QAR = "QAR",
    RON = "RON",
    RSD = "RSD",
    RUB = "RUB",
    RWF = "RWF",
    SAR = "SAR",
    SBD = "SBD",
    SCR = "SCR",
    SDG = "SDG",
    SEK = "SEK",
    SGD = "SGD",
    SLL = "SLL",
    SOS = "SOS",
    SRD = "SRD",
    SVC = "SVC",
    SZL = "SZL",
    THB = "THB",
    TJS = "TJS",
    TMT = "TMT",
    TND = "TND",
    TOP = "TOP",
    TRY = "TRY",
    TTD = "TTD",
    TWD = "TWD",
    TZS = "TZS",
    UAH = "UAH",
    UGX = "UGX",
    USD = "USD",
    UYU = "UYU",
    UZS = "UZS",
    VND = "VND",
    XAF = "XAF",
    XAG = "XAG",
    XAU = "XAU",
    XCD = "XCD",
    XLM = "XLM",
    XOF = "XOF",
    XRP = "XRP",
    YER = "YER",
    ZAR = "ZAR",
    ZMW = "ZMW"
}

export const CURRENCIES: { [key in CurrencyCodes]: string } = {
    [CurrencyCodes.AED]: "United Arab Emirates Dirham",
    [CurrencyCodes.AFN]: "Afghan Afghani",
    [CurrencyCodes.ALL]: "Albanian Lek",
    [CurrencyCodes.AMD]: "Armenian Dram",
    [CurrencyCodes.ANG]: "Netherlands Antillean Guilder",
    [CurrencyCodes.AOA]: "Angolan Kwanza",
    [CurrencyCodes.ARS]: "Argentine Peso",
    [CurrencyCodes.AUD]: "Australian Dollar",
    [CurrencyCodes.AWG]: "Aruban Florin",
    [CurrencyCodes.AZN]: "Azerbaijani Manat",
    [CurrencyCodes.BAM]: "Bosnia-Herzegovina Convertible Mark",
    [CurrencyCodes.BBD]: "Barbadian Dollar",
    [CurrencyCodes.BCH]: "Bitcoin Cash",
    [CurrencyCodes.BDT]: "Bangladeshi Taka",
    [CurrencyCodes.BGN]: "Bulgarian Lev",
    [CurrencyCodes.BHD]: "Bahraini Dinar",
    [CurrencyCodes.BIF]: "Burundian Franc",
    [CurrencyCodes.BMD]: "Bermudan Dollar",
    [CurrencyCodes.BND]: "Brunei Dollar",
    [CurrencyCodes.BOB]: "Bolivian Boliviano",
    [CurrencyCodes.BRL]: "Brazilian Real",
    [CurrencyCodes.BSD]: "Bahamian Dollar",
    [CurrencyCodes.BTC]: "Bitcoin",
    [CurrencyCodes.BTG]: "Bitcoin Gold",
    [CurrencyCodes.BWP]: "Botswanan Pula",
    [CurrencyCodes.BZD]: "Belize Dollar",
    [CurrencyCodes.CAD]: "Canadian Dollar",
    [CurrencyCodes.CDF]: "Congolese Franc",
    [CurrencyCodes.CHF]: "Swiss Franc",
    [CurrencyCodes.CLP]: "Chilean Peso",
    [CurrencyCodes.CNH]: "Chinese Yuan (offshore)",
    [CurrencyCodes.CNY]: "Chinese Yuan",
    [CurrencyCodes.COP]: "Colombian Peso",
    [CurrencyCodes.CRC]: "Costa Rican Colón",
    [CurrencyCodes.CUC]: "Cuban Convertible Peso",
    [CurrencyCodes.CUP]: "Cuban Peso",
    [CurrencyCodes.CVE]: "Cape Verdean Escudo",
    [CurrencyCodes.CZK]: "Czech Republic Koruna",
    [CurrencyCodes.DASH]: "DASH",
    [CurrencyCodes.DJF]: "Djiboutian Franc",
    [CurrencyCodes.DKK]: "Danish Krone",
    [CurrencyCodes.DOP]: "Dominican Peso",
    [CurrencyCodes.DZD]: "Algerian Dinar",
    [CurrencyCodes.EGP]: "Egyptian Pound",
    [CurrencyCodes.EOS]: "EOS",
    [CurrencyCodes.ETB]: "Ethiopian Birr",
    [CurrencyCodes.ETH]: "Ethereum",
    [CurrencyCodes.EUR]: "Euro",
    [CurrencyCodes.FJD]: "Fijian Dollar",
    [CurrencyCodes.GBP]: "British Pound Sterling",
    [CurrencyCodes.GEL]: "Georgian Lari",
    [CurrencyCodes.GHS]: "Ghanaian Cedi",
    [CurrencyCodes.GIP]: "Gibraltar Pound",
    [CurrencyCodes.GMD]: "Gambian Dalasi",
    [CurrencyCodes.GNF]: "Guinean Franc",
    [CurrencyCodes.GTQ]: "Guatemalan Quetzal",
    [CurrencyCodes.GYD]: "Guyanaese Dollar",
    [CurrencyCodes.HKD]: "Hong Kong Dollar",
    [CurrencyCodes.HNL]: "Honduran Lempira",
    [CurrencyCodes.HRK]: "Croatian Kuna",
    [CurrencyCodes.HTG]: "Haitian Gourde",
    [CurrencyCodes.HUF]: "Hungarian Forint",
    [CurrencyCodes.IDR]: "Indonesian Rupiah",
    [CurrencyCodes.ILS]: "Israeli New Sheqel",
    [CurrencyCodes.INR]: "Indian Rupee",
    [CurrencyCodes.IQD]: "Iraqi Dinar",
    [CurrencyCodes.IRR]: "Iranian Rial",
    [CurrencyCodes.ISK]: "Icelandic Króna",
    [CurrencyCodes.JMD]: "Jamaican Dollar",
    [CurrencyCodes.JOD]: "Jordanian Dinar",
    [CurrencyCodes.JPY]: "Japanese Yen",
    [CurrencyCodes.KES]: "Kenyan Shilling",
    [CurrencyCodes.KGS]: "Kyrgystani Som",
    [CurrencyCodes.KHR]: "Cambodian Riel",
    [CurrencyCodes.KMF]: "Comorian Franc",
    [CurrencyCodes.KRW]: "South Korean Won",
    [CurrencyCodes.KWD]: "Kuwaiti Dinar",
    [CurrencyCodes.KYD]: "Cayman Islands Dollar",
    [CurrencyCodes.KZT]: "Kazakhstani Tenge",
    [CurrencyCodes.LAK]: "Laotian Kip",
    [CurrencyCodes.LBP]: "Lebanese Pound",
    [CurrencyCodes.LKR]: "Sri Lankan Rupee",
    [CurrencyCodes.LRD]: "Liberian Dollar",
    [CurrencyCodes.LSL]: "Lesotho Loti",
    [CurrencyCodes.LTC]: "Litecoin",
    [CurrencyCodes.LYD]: "Libyan Dinar",
    [CurrencyCodes.MAD]: "Moroccan Dirham",
    [CurrencyCodes.MDL]: "Moldovan Leu",
    [CurrencyCodes.MKD]: "Macedonian Denar",
    [CurrencyCodes.MMK]: "Myanma Kyat",
    [CurrencyCodes.MOP]: "Macanese Pataca",
    [CurrencyCodes.MUR]: "Mauritian Rupee",
    [CurrencyCodes.MVR]: "Maldivian Rufiyaa",
    [CurrencyCodes.MWK]: "Malawian Kwacha",
    [CurrencyCodes.MXN]: "Mexican Peso",
    [CurrencyCodes.MYR]: "Malaysian Ringgit",
    [CurrencyCodes.MZN]: "Mozambican Metical",
    [CurrencyCodes.NAD]: "Namibian Dollar",
    [CurrencyCodes.NGN]: "Nigerian Naira",
    [CurrencyCodes.NIO]: "Nicaraguan Córdoba",
    [CurrencyCodes.NOK]: "Norwegian Krone",
    [CurrencyCodes.NPR]: "Nepalese Rupee",
    [CurrencyCodes.NZD]: "New Zealand Dollar",
    [CurrencyCodes.OMR]: "Omani Rial",
    [CurrencyCodes.PAB]: "Panamanian Balboa",
    [CurrencyCodes.PEN]: "Peruvian Nuevo Sol",
    [CurrencyCodes.PGK]: "Papua New Guinean Kina",
    [CurrencyCodes.PHP]: "Philippine Peso",
    [CurrencyCodes.PKR]: "Pakistani Rupee",
    [CurrencyCodes.PLN]: "Polish Zloty",
    [CurrencyCodes.PYG]: "Paraguayan Guarani",
    [CurrencyCodes.QAR]: "Qatari Rial",
    [CurrencyCodes.RON]: "Romanian Leu",
    [CurrencyCodes.RSD]: "Serbian Dinar",
    [CurrencyCodes.RUB]: "Russian Ruble",
    [CurrencyCodes.RWF]: "Rwandan Franc",
    [CurrencyCodes.SAR]: "Saudi Riyal",
    [CurrencyCodes.SBD]: "Solomon Islands Dollar",
    [CurrencyCodes.SCR]: "Seychellois Rupee",
    [CurrencyCodes.SDG]: "Sudanese Pound",
    [CurrencyCodes.SEK]: "Swedish Krona",
    [CurrencyCodes.SGD]: "Singapore Dollar",
    [CurrencyCodes.SLL]: "Sierra Leonean Leone",
    [CurrencyCodes.SOS]: "Somali Shilling",
    [CurrencyCodes.SRD]: "Surinamese Dollar",
    [CurrencyCodes.SVC]: "Salvadoran Colón",
    [CurrencyCodes.SZL]: "Swazi Lilangeni",
    [CurrencyCodes.THB]: "Thai Baht",
    [CurrencyCodes.TJS]: "Tajikistani Somoni",
    [CurrencyCodes.TMT]: "Turkmenistani Manat",
    [CurrencyCodes.TND]: "Tunisian Dinar",
    [CurrencyCodes.TOP]: "Tongan Paʻanga",
    [CurrencyCodes.TRY]: "Turkish Lira",
    [CurrencyCodes.TTD]: "Trinidad and Tobago Dollar",
    [CurrencyCodes.TWD]: "New Taiwan Dollar",
    [CurrencyCodes.TZS]: "Tanzanian Shilling",
    [CurrencyCodes.UAH]: "Ukrainian Hryvnia",
    [CurrencyCodes.UGX]: "Ugandan Shilling",
    [CurrencyCodes.USD]: "United States Dollar",
    [CurrencyCodes.UYU]: "Uruguayan Peso",
    [CurrencyCodes.UZS]: "Uzbekistan Som",
    [CurrencyCodes.VND]: "Vietnamese Dong",
    [CurrencyCodes.XAF]: "CFA Franc BEAC",
    [CurrencyCodes.XAG]: "Silver (troy ounce)",
    [CurrencyCodes.XAU]: "Gold (troy ounce)",
    [CurrencyCodes.XCD]: "East Caribbean Dollar",
    [CurrencyCodes.XLM]: "Stellar Lumens",
    [CurrencyCodes.XOF]: "CFA Franc BCEAO",
    [CurrencyCodes.XRP]: "Ripple",
    [CurrencyCodes.YER]: "Yemeni Rial",
    [CurrencyCodes.ZAR]: "South African Rand",
    [CurrencyCodes.ZMW]: "Zambian Kwacha"
}