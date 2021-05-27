const getters = {
    access_token: state => state.user.access_token,
    refresh_token: state => state.user.refresh_token,
};
export default getters;