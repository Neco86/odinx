import {createProxyMiddleware} from 'http-proxy-middleware';

const INTERNAL_DOMAIN = 'internal.odinx.top';

const DOMAIN_MAP = {
    'ddns.odinx.top': '9876'
};

export default (req, res) => {
    const targetPort = DOMAIN_MAP[req.headers.host];

    if (!targetPort) {
        res.status(404);
        return;
    }

    const proxy = createProxyMiddleware({
        target: `http://${INTERNAL_DOMAIN}:${targetPort}`,
        changeOrigin: true
    });

    proxy(req, res);
};
