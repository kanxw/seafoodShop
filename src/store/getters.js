const getters = {
    access_token: state => state.user.access_token,
    refresh_token: state => state.user.refresh_token,
    menuActive: state => state.menu.active,
    menuOpeneds: state => state.menu.menuOpeneds,
    topTabsData: state => state.menu.tabsData,
};
export default getters;