const authenticationMiddleware = (resolverFunction) => {
    return async (parent, args, context, info) => {
      if (!context.isAuthenticated) {
        throw new Error('Authentication required');
      }
  
      return resolverFunction(parent, args, context, info);
    };
  };
  
  module.exports = { authenticationMiddleware };
  