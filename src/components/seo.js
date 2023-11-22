import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useTenantContext } from 'src/contexts/tenant-context';

export const Seo = (props) => {
  const { title } = props;
  const { tenantConfig } = useTenantContext();

  const fullTitle = title
    ? title + tenantConfig.name?tenantConfig.name:' | E-Management'
    : tenantConfig.name?tenantConfig.name:'E-Management';

  return (
    <Helmet>
      <title>
        {fullTitle}
      </title>
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string
};
