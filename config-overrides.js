module.exports = function override(config, env) {
  // Completely disable source-map-loader for problematic packages
  if (config.module && config.module.rules) {
    config.module.rules = config.module.rules.map(rule => {
      // Handle oneOf rules (used by react-scripts)
      if (rule.oneOf) {
        return {
          ...rule,
          oneOf: rule.oneOf.map(oneOfRule => {
            if (oneOfRule.enforce === 'pre' && oneOfRule.use) {
              const uses = Array.isArray(oneOfRule.use) ? oneOfRule.use : [oneOfRule.use];
              const hasSourceMapLoader = uses.some(use => {
                const loader = typeof use === 'string' ? use : (use.loader || '');
                return loader.includes('source-map-loader');
              });
              
              if (hasSourceMapLoader) {
                // Exclude all @reown and problematic packages
                const existingExclude = Array.isArray(oneOfRule.exclude) 
                  ? oneOfRule.exclude 
                  : oneOfRule.exclude 
                    ? [oneOfRule.exclude] 
                    : [];
                
                return {
                  ...oneOfRule,
                  exclude: [
                    ...existingExclude,
                    /node_modules\/@reown/,
                    /node_modules\/@wagmi\/connectors/,
                    /node_modules\/.*\/node_modules\/viem\/_esm/,
                  ],
                };
              }
            }
            return oneOfRule;
          }),
        };
      }
      
      // Handle regular rules
      if (rule.enforce === 'pre' && rule.use) {
        const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
        const hasSourceMapLoader = uses.some(use => {
          const loader = typeof use === 'string' ? use : (use.loader || '');
          return loader.includes('source-map-loader');
        });
        
        if (hasSourceMapLoader) {
          const existingExclude = Array.isArray(rule.exclude) 
            ? rule.exclude 
            : rule.exclude 
              ? [rule.exclude] 
              : [];
          
          return {
            ...rule,
            exclude: [
              ...existingExclude,
              /node_modules\/@reown/,
              /node_modules\/@wagmi\/connectors/,
              /node_modules\/.*\/node_modules\/viem\/_esm/,
            ],
          };
        }
      }
      
      return rule;
    });
  }

  // Make optional peer dependencies optional
  config.resolve = config.resolve || {};
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    '@gemini-wallet/core': false,
    '@metamask/sdk': false,
  };

  // Ignore all source map related warnings and errors
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Failed to parse source map/,
    /ENOENT/,
    /@reown/,
    /source-map-loader/,
    /viem.*_esm/,
    /node_modules\/.*\/node_modules\/viem/,
  ];

  return config;
};

