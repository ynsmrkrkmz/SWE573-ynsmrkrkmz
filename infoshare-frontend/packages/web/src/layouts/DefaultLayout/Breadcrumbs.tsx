import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useAppContext } from 'contexts/AppContext';
import camelCase from 'lodash/camelCase';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { getTranslationKeyByOrganizationType } from 'utils/translation';

const UUID_REGEX_PATTERN = /^\w{8}\s\w{4}\s\w{4}\s\w{4}\s\w{12}$/;

const BreadcrumbsComponent = () => {
  const intl = useIntl();
  const { refNumbers } = useAppContext();
  const breadcrumbs = useBreadcrumbs(/* [], { excludePaths: ['/'] } */);

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        /**
         * Get the text from the breadcrumb
         *
         * @description
         * (breadcrumb is a ReactElement has a children that default text for the link)
         *
         * @example:
         * URL '/policy-review/' -> Breadcrumb 'Policy review'
         */
        const defaultLinkText: string = (breadcrumb as ReactElement).props.children;

        let linkText;

        /**
         * If defaultLinkText is UUID
         *
         * @example
         * Breadcrumb 'E76b8d7c 37f5 4b2d 9c97 df555604043'
         */
        if (UUID_REGEX_PATTERN.test(defaultLinkText)) {
          // Convert to real uuid format. ex. 'e76b8d7c-37f5-4b2d-9c97-df555604043'
          const uuid = defaultLinkText.toLowerCase().replaceAll(' ', '-');

          // Search from reference numbers. ex. 'ENQ-000001'
          linkText = refNumbers ? refNumbers[uuid] ?? '...' : '...';
        } else {
          // Check if the route translation changes according to organization type
          const text = getTranslationKeyByOrganizationType({
            key: camelCase(defaultLinkText),
            type: '',
          });

          if (text) {
            linkText = intl.formatMessage({
              id: text,
            });
          } else {
            // Otherwise search from 'generic' translations
            // URL '/policy-review/' -> Breadcrumb 'Policy review' -> Translation Key 'policyReview'
            linkText = intl.formatMessage({
              id: `generic.${camelCase(defaultLinkText)}`,
            });
          }
        }

        const home = breadcrumbs.length === 1;
        const last = index === breadcrumbs.length - 1;

        if (home) {
          return null;
        }

        return last ? (
          <Typography key={match.pathname} color="text.primary">
            {linkText}
          </Typography>
        ) : (
          <Link
            key={match.pathname}
            component={RouterLink}
            to={match.pathname}
            underline="hover"
            color="inherit"
          >
            {linkText}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
