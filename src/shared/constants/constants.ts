export const constants = {
  CURRENT_TOKEN: 'AUTH_TOKEN',
};

const apiUrl = 'http://192.168.0.82:8080/smart-customs';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiUrl}/login.jsp`,
    logout: `${apiUrl}/logout`,
  },

};
