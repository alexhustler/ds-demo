export default Object.freeze({
  nodeEnv: process.env.NODE_ENV || "",
  features: {
    mockupFeatureFlag: {
      isEnabled: process.env.REACT_APP_MOCKUP_FEATURE_ENABLED === "1" || false,
    },
  },
});
