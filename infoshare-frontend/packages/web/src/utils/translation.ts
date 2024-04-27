const DEFAULT_TRANSLATIONS = {
  quotation: 'generic.offer',
  quotationDetails: 'generic.offerDetails',
  quotationList: 'generic.offerList',
  quotationSent: 'generic.offerSent',
  quotations: 'generic.offers',
  quotationId: 'generic.offerId',
};

const TRANSLATION_MAP: { [type: string]: { [key: string]: string } } = {
  PRODUCT_OWNER: DEFAULT_TRANSLATIONS,
  POLICY_HOLDER: DEFAULT_TRANSLATIONS,
  BROKER: DEFAULT_TRANSLATIONS,
  REINSURANCE: {
    ...DEFAULT_TRANSLATIONS,
    ...{
      quotation: 'generic.quotation',
      quotationDetails: 'quotation.details',
      quotationList: 'quotation.quotationList',
      quotationSent: 'status.quotationSent',
      quotations: 'generic.quotations',
      quotationId: 'quotation.quotationID',
    },
  },
  INSURANCE: DEFAULT_TRANSLATIONS,
};

export function getTranslationKeyByOrganizationType({
  key,
  type,
}: {
  key: string;
  type: any | undefined;
}) {
  return type ? (TRANSLATION_MAP[type][key] ? TRANSLATION_MAP[type][key] : '') : '';
}
