import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CACHE_KEY = 'app.tenant';

const restoreTenantConfigFromCache = () => {
  let value = null;
  try {
    const restored = window.localStorage.getItem(CACHE_KEY);
    if (restored) {
      value = JSON.parse(restored);
    }
  } catch (err) {
    console.error(err);
  }
  return value;
};

export const TenantContext = createContext({});

export const TenantProvider = ({ children }) => {
  const [tenantConfig, setTenantConfig] = useState({});
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const restored = restoreTenantConfigFromCache();
    if (restored) {
      setTenantConfig(restored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(tenantConfig));
    if (tenantConfig.favicon) {
      let link = document.getElementById("favicon");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      } 
      link.href = tenantConfig.favicon;
    }
  }, [tenantConfig]);

  return (
    <TenantContext.Provider
      value={{
        pageTitle,
        tenantConfig,
        setPageTitle,
        setTenantConfig
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

TenantProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const TenantConsumer = TenantContext.Consumer;

export const useTenantContext = () => useContext(TenantContext);
