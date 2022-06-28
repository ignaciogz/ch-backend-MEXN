const getUsuario = async (ctx, next) => {
    if(ctx.session.user) {
        ctx.body = { ...ctx.session.user, facebookLogin: false };
    } else if(ctx.state.user) {
        ctx.body = { ...ctx.state.user, facebookLogin: true };
    }
};

module.exports = { getUsuario }