export default ({ router, store }) => {
    router.beforeEach((to, from, next) => {
        var stylecons = 'background: #bada55; color: #222; font-weight: bold; font-size:24px;';    
        var stylemsg = 'background: #222; color: #bada55; font-size:20px;';
        var fcolor = 'color: #55efc4;background: #111;font-size:20px; font-weight: bold;';
                
        if(to.matched.some(record => record.meta.reqAuth)) {

            if (!store.state.auth.authenticate==false) {
                console.log('%cTOKEN: '+store.state.auth.jwt, stylecons);

                next();
            }else{
                console.log('%cTOKEN: ISNULL',stylecons);
                next('/')
                return
            }
        } else {
            console.log('%cTOKEN: ISNULL',stylecons);
            // console.log('%cNo hay pagina que mostrar: '+store.state.Auth.account_token,stylecons);
            next();
        }
    });
}